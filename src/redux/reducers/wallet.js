// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_EXPENSE_DATA,
  GET_EXPENSE_DATA_SUCCESS,
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  ADD_AN_EXPENSE,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada

};

// modelo para editar
const wallet = (state = initialState, action) => {
  switch (action.type) {
  case GET_EXPENSE_DATA:
    return { ...state };

  case GET_EXPENSE_DATA_SUCCESS:
    return { ...state };

  case ADD_AN_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] }; // só o payload não funcioa, a nova info é sobrescrita. precisa fazer ...state.expenses

  case GET_CURRENCIES:
    return { ...state, isLoading: true };

  case GET_CURRENCIES_SUCCESS:
    return { ...state, currencies: action.payload, isLoading: false };

  default:
    return state;
  }
};

export default wallet;
