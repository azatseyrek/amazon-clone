import '@testing-library/jest-dom/extend-expect';

import { reducer, screen } from '../../../shared/utils/test-utils';
import SigninFormComponent from './SigninForm.component';

describe('Sign-in Form', () => {
  let signInButton = null;

  beforeEach(() => {
    reducer(<SigninFormComponent />);
    signInButton = screen.getByRole('button', { name: /Sign-In/i });
  });

  test('The login button should be in the document', () => {
    expect(signInButton).toBeInTheDocument();
  });
  test('The login button should be disabled', () => {
    expect(signInButton).toBeDisabled();
  });
});
