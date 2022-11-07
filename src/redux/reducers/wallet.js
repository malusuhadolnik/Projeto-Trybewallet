// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_EXPENSE_DATA,
  GET_EXPENSE_DATA_SUCCESS,
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  ADD_AN_EXPENSE,
  REMOVE_AN_EXPENSE,
  ENABLE_EDITION,
  EDIT_AN_EXPENSE,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada

};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case GET_EXPENSE_DATA:
    return { ...state };

  case GET_EXPENSE_DATA_SUCCESS:
    return { ...state };

  case ADD_AN_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] }; // só o payload não funciona, a nova info é sobrescrita. precisa fazer ...state.expenses

  case REMOVE_AN_EXPENSE: // inspirado no tutorial: https://stackoverflow.com/questions/57519905/how-delete-item-from-redux-state
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };

  case ENABLE_EDITION:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };

  case GET_CURRENCIES:
    return { ...state, isLoading: true };

  case GET_CURRENCIES_SUCCESS:
    return { ...state, currencies: action.payload, isLoading: false };

  case EDIT_AN_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload].sort((a, b) => a.id - b.id),
      editor: false,
    };

  default:
    return state;
  }
};

export default wallet;
