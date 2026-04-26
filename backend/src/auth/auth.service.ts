import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UsersService } from '../users/users.service';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  private generateOtp(): string {
    return randomBytes(3).readUIntBE(0, 3).toString().slice(-6).padStart(6, '0');
  }

  private async hashOtp(otp: string): Promise<string> {
    return bcrypt.hash(otp, 10);
  }

  private async verifyOtp(otp: string, hash: string): Promise<boolean> {
    return bcrypt.compare(otp, hash);
  }

  async register(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    const otp = this.generateOtp();
    const otpHash = await this.hashOtp(otp);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await this.usersService.create({
      email,
      passwordHash,
      otp: otpHash,
      otpExpiry,
    });

    // Send OTP email (non-blocking)
    this.emailService.sendVerificationOtp(email, otp).catch(err => {
      console.error('Failed to send OTP email:', err);
    });

    return { message: 'User registered. Check your email for OTP.' };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!user.otp || !user.otpExpiry) {
      throw new BadRequestException('No OTP found for this user');
    }

    if (new Date() > user.otpExpiry) {
      throw new BadRequestException('OTP has expired');
    }

    const isValid = await this.verifyOtp(otp, user.otp);
    if (!isValid) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.usersService.update(user.id, {
      isVerified: true,
      otp: null,
      otpExpiry: null,
    });

    return { message: 'Email verified successfully' };
  }

  async resendOtp(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Rate limit: only resend if previous OTP is expired or doesn't exist
    if (user.otp && user.otpExpiry && new Date() < user.otpExpiry) {
      throw new BadRequestException('OTP already sent. Please wait before requesting a new one.');
    }

    const otp = this.generateOtp();
    const otpHash = await this.hashOtp(otp);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await this.usersService.update(user.id, {
      otp: otpHash,
      otpExpiry,
    });

    this.emailService.sendVerificationOtp(email, otp).catch(err => {
      console.error('Failed to send OTP email:', err);
    });

    return { message: 'OTP resent to your email' };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    return this.signToken(user.id, user.email, user.role);
  }

  private signToken(id: string, email: string, role: string) {
    return { access_token: this.jwtService.sign({ sub: id, email, role }) };
  }
}
