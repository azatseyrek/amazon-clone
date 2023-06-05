import { ChangeEvent, useReducer } from 'react';

import { Action } from '../../shared/models/action.interface';
import { ValidatorFn } from '../../shared/utils/validation/models/validatorFn';
import * as types from './models/InputAction';
import { InputState } from './models/InputState.interface';

const initialInputState: InputState = {
  text: '',
  hasBeenTouched: false,
};

const inputReducer = (
  state: InputState,
  action: Action<types.InputActionType>, //action : type, payload(value)
) => {
  const { type, value = '' } = action;
  switch (type) {
    case types.INPUT_ACTION_CHANGE:
      return {
        hasBeenTouched: state.hasBeenTouched,
        text: value,
      };
    case types.INPUT_ACTION_BLUR:
      return {
        text: state.text,
        hasBeenTouched: true,
      };
    case types.INPUT_ACTION_CLEAR:
      return {
        text: '',
        hasBeenTouched: false,
      };
    default:
      return state;
  }
};

export const useInput = (validatorFn?: ValidatorFn) => {
  const [state, dispatch] = useReducer(inputReducer, initialInputState);
  const { text, hasBeenTouched } = state;

  let shouldDisplayError;

  if (validatorFn) {
    const isValid = validatorFn(text);
    shouldDisplayError = !isValid && hasBeenTouched;
  }

  const textChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: types.INPUT_ACTION_CHANGE, value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: types.INPUT_ACTION_BLUR });
  };

  const clearHandler = () => {
    dispatch({ type: types.INPUT_ACTION_CLEAR });
  };

  return {
    state,
    text,
    shouldDisplayError,
    textChangeHandler,
    inputBlurHandler,
    clearHandler,
  };
};

export default useInput;
