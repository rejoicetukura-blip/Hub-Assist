import { IsOptional, IsObject } from 'class-validator';

export class ClockInDto {
  @IsOptional()
  @IsObject()
  details?: Record<string, any>;
}

export class ClockOutDto {
  @IsOptional()
  @IsObject()
  details?: Record<string, any>;
}
