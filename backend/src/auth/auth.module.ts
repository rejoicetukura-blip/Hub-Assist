import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BiometricController } from './biometric.controller';
import { BiometricService } from './biometric.service';
import { JwtStrategy } from './jwt.strategy';
import { EmailService } from './email.service';
import { RefreshToken } from './refresh-token.entity';
import { WebAuthnCredential } from './webauthn-credential.entity';
import { RefreshTokenRepository } from './refresh-token.repository';
import { ForgotPasswordProvider } from '../users/providers/forgot-password.provider';
import { ResetPasswordProvider } from '../users/providers/reset-password.provider';
import { User } from '../users/user.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([RefreshToken, WebAuthnCredential, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'hubassist-secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    BiometricService,
    JwtStrategy,
    EmailService,
    RefreshTokenRepository,
    ForgotPasswordProvider,
    ResetPasswordProvider,
  ],
  controllers: [AuthController, BiometricController],
})
export class AuthModule {}
