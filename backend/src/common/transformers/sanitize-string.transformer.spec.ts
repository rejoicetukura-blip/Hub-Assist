import { plainToInstance } from 'class-transformer';
import { IsString } from 'class-validator';
import { SanitizeString } from './sanitize-string.transformer';

class TestDto {
  @SanitizeString()
  @IsString()
  text!: string;
}

describe('SanitizeString Transformer', () => {
  it('should strip HTML tags', () => {
    const input = { text: '<script>alert("xss")</script>Hello' };
    const result = plainToInstance(TestDto, input);
    expect(result.text).toBe('alert("xss")Hello');
  });

  it('should trim whitespace', () => {
    const input = { text: '  Hello World  ' };
    const result = plainToInstance(TestDto, input);
    expect(result.text).toBe('Hello World');
  });

  it('should handle combined HTML and whitespace', () => {
    const input = { text: '  <div>  Test  </div>  ' };
    const result = plainToInstance(TestDto, input);
    expect(result.text).toBe('Test');
  });

  it('should return non-string values unchanged', () => {
    const input = { text: 123 };
    const result = plainToInstance(TestDto, input);
    expect(result.text).toBe(123);
  });
});
