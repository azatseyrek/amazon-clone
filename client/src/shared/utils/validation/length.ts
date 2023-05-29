import { LengthOptions } from './models/options/length';
import { ValidatorFn } from './models/validatorFn';

export const _validateLength: ValidatorFn = (text: string, options?: LengthOptions): boolean => {
  const textLength = text.trim().length;

  if (options?.minLength && options?.maxLength) {
    return textLength >= options.minLength && textLength <= options.maxLength;
  } else if (options?.minLength) {
    return textLength >= options.minLength;
  } else if (options?.maxLength) {
    return textLength <= options.maxLength;
  }

  return true;
};

export const validatePasswordLength: ValidatorFn = (password: string): boolean => {
  return _validateLength(password, { minLength: 6, maxLength: 20 });
};

export const validateNameLength: ValidatorFn = (name: string): boolean => {
  return _validateLength(name, { minLength: 2, maxLength: 30 });
};
