import { validateNameLength, validatePasswordLength } from './length';

describe('Field length validation', () => {
  test('should return false for empty input', () => {
    expect(validatePasswordLength(' ')).toBe(false);
  });

  test('should return false for invalid password length', () => {
    expect(validatePasswordLength('12345')).toBe(false);
  });

  test('should return true for valid password length', () => {
    expect(validatePasswordLength('123456')).toBe(true);
  });

  test('should return false for invalid name length', () => {
    expect(validateNameLength('a')).toBe(false);
  });

  test('should return true for valid name length', () => {
    expect(validateNameLength('Azat')).toBe(true);
  });
});
