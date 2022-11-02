import {
  SAVE_EMAIL,
  ADD_EXPENSE_DATA,
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
} from './actionTypes';

const saveEmail = (userEmail) => ({ // este argumento é uma array que vem do estado local da aplicação!
  type: SAVE_EMAIL,
  payload: userEmail,
});

const addExpenseData = (expenseData) => ({ // este argumento é uma array que vem do estado local da aplicação!
  type: ADD_EXPENSE_DATA,
  payload: expenseData,
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
    const data = Object.keys(await response.json()); // é um objeto de objetos
    const filteredData = data.filter((currency) => currency !== 'USDT'); // remove o USDT
    dispatch(getCurrenciesSuccess(filteredData)); // envia a resposta para o reducer
  } catch (error) {
    console.log(error);
  }
};

export const actionThunkGetAPI = () => thunkGetAPI;

export { saveEmail, addExpenseData };
