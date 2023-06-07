// import { ValidatorFn } from './models/validatorFn';
import { validateEmail } from './email';

describe('Email Validation', () => {
  let emptyInput = ' ';

  test('should return false for empty input', () => {
    expect(validateEmail(emptyInput)).toBe(false);
  });

  let invalidEmails = [
    'plainaddress',
    'abc.example.com',
    '@example.com',
    'email.example.com',
    'email@',
  ];

  test('should return false for invalid emails', () => {
    invalidEmails.forEach((email) => {
      expect(validateEmail(email)).toBe(false);
    });
  });

  let validEmails = ['azatseyrek@hotmail.com', 'azat@seyrek.com', 'Azat.Seyrek@adesso.com.tr'];
  test('should return true for valid emails', () => {
    validEmails.forEach((email) => {
      expect(validateEmail(email)).toBe(true);
    });
  });

  test('should have @ symbol', () => {
    expect(validateEmail('azatseyrekhotmail.com')).toBe(false);
  });
});
