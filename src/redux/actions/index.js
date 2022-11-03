import {
  SAVE_EMAIL,
  GET_EXPENSE_DATA,
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  GET_EXPENSE_DATA_SUCCESS,
  ADD_AN_EXPENSE,
} from './actionTypes';

export const saveEmail = (userEmail) => ({ // este argumento é uma array que vem do estado local da aplicação!
  type: SAVE_EMAIL,
  payload: userEmail,
});

const getCurrencies = () => ({ // ação para requisitar a API
  type: GET_CURRENCIES,
});

const getCurrenciesSuccess = (theCurrencies) => ({ // ação que pega as moedas após requisição da API
  type: GET_CURRENCIES_SUCCESS,
  payload: theCurrencies,
});

// Questão 3 desenvolvida com a ajuda de meus amigos Lígia Bicalho e Mateus Ramos, 25B.
const thunkGetAPI = async (dispatch) => { // a action vai ser chamada quando a página Wallet carregar
  try {
    dispatch(getCurrencies()); // o redux-thunk captura a action
    const response = await fetch('https://economia.awesomeapi.com.br/json/all'); // o redux-thunk comunica-se com a API
    // const data0 = await response.json(); // é um objeto de objetos, cujas chaves do primeiro objeto são iguais à chave code, que é o que queremos
    // console.log(data0); // ex:{ {ARS {code: 'ARS'....
    const data = Object.keys(await response.json());
    // console.log(data); cont
    const filteredData = data.filter((currency) => currency !== 'USDT'); // remove o USDT
    dispatch(getCurrenciesSuccess(filteredData)); // envia a resposta para o reducer
  } catch (error) {
    console.log(error);
  }
};

const getExpenseData = () => ({
  type: GET_EXPENSE_DATA,
});

const getExpenseDataSuccess = () => ({
  type: GET_EXPENSE_DATA_SUCCESS,
});

const thunkGetRates = async (dispatch) => { // só chama a API, o resultado será armazenado em uma variável no WalletForm
  try {
    dispatch(getExpenseData());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    dispatch(getExpenseDataSuccess());
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addAnExpense = (expenseData) => ({ // esta sim armazena o resultado da api e do estado local no
  type: ADD_AN_EXPENSE,
  payload: expenseData,
});

export const actionThunkGetAPI = () => thunkGetAPI;
export const actionThunkGetRates = () => thunkGetRates;

// export { saveEmail, addExpenseData };
