import { IsString, IsNotEmpty } from 'class-validator';

export class BiometricRegisterOptionsDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;
}

export class BiometricRegisterVerifyDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  attestationResponse!: string;
}

export class BiometricLoginOptionsDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;
}

export class BiometricLoginVerifyDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  assertionResponse!: string;
}
