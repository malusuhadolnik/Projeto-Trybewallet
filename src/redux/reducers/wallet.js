// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE_DATA } from '../actions/actionTypes';

const initialState = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

// modelo para editar
const wallet = (state = initialState, action) => {
  switch (action.type) {
  case ADD_EXPENSE_DATA:
    return { ...state, wallet: { ...action.payload } };

  default:
    return state;
  }
};

export default wallet;
