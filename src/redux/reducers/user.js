// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_EMAIL } from '../actions/actionTypes';

const initialState = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return { email: action.payload };

  default:
    return state;
  }
};

export default user;
