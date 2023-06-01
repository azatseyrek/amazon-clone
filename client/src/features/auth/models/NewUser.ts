import { RegisterFormFields } from './RegisterFormFields.interface';

export type NewUser = Omit<RegisterFormFields, 'confirmPassword'>;
