import { SAVE_EMAIL, ADD_EXPENSE_DATA } from './actionTypes';

const saveEmail = (userEmail) => ({ // este argumento é uma array que vem do estado local da aplicação!
  type: SAVE_EMAIL,
  payload: userEmail,
});

const addExpenseData = (expenseData) => ({ // este argumento é uma array que vem do estado local da aplicação!
  type: ADD_EXPENSE_DATA,
  payload: expenseData,
});

export { saveEmail, addExpenseData };
