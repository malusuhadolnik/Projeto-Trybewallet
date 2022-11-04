import { screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { legacy_createStore as createStore } from 'redux';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import myGlobalStateOne from './helpers/myGlobalStateOne';
// import rootReducer from '../redux/store';

const TEST_ID_EMAILINPUT = 'email-input';
const EMAIL_FOR_TESTS = 'email@email.com';

describe('Aplicação Trybewallet', () => {
  test('se existe um botão Entrar na página inicial', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
  test('se exite um input de email', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(TEST_ID_EMAILINPUT);
    expect(emailInput).toBeInTheDocument();
  });

  test('se pode ser digitado um e-mail no input de email', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(TEST_ID_EMAILINPUT);
    // const email = 'email@email.com';
    userEvent.type(emailInput, EMAIL_FOR_TESTS);
    expect(emailInput).toHaveValue(EMAIL_FOR_TESTS);
  });

  test('se o botão é habilitado ao preencher os dados corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(TEST_ID_EMAILINPUT);
    const passwordInput = screen.getByTestId('password-input');

    // const email = 'email@email.com';
    const password = '123456';

    userEvent.type(passwordInput, password);
    userEvent.type(emailInput, EMAIL_FOR_TESTS);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  test('se a pessoa usuária é redirecionada para a página da carteira ao preencher os dados corretamente e clicar entrar', () => {
    const { history } = renderWithRouterAndRedux(<App />); // o que muda com o Redux é só o "tipo" do renderWith

    const emailInput = screen.getByTestId(TEST_ID_EMAILINPUT);
    const passwordInput = screen.getByTestId('password-input');

    // const email = 'email@email.com';
    const password = '123456';

    userEvent.type(passwordInput, password);
    userEvent.type(emailInput, EMAIL_FOR_TESTS);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
  test('se o cabeçalho possui o valor total, e se incialmente este é 0.00', () => {
    renderWithRouterAndRedux(<Wallet />);

    const totalValue = screen.getByTestId('total-field');
    expect(totalValue).toBeInTheDocument();
    expect(totalValue).toHaveTextContent('0.00');
  });

  test('se o valor total muda quando for adicionada uma despesa, e se este valor é corresponde à conversão do valor adicionado', () => {
    renderWithRouterAndRedux(
      <Wallet />,
      { initialState: myGlobalStateOne }, // segui modelo da aula 7.5 (script do prof)
    );
    const totalValue = screen.getByTestId('total-field');
    expect(totalValue).toHaveTextContent('1.90');
  });
});
// https://www.cluemediator.com/test-an-input-field-using-the-react-testing-library
// // elementos a serem obervados/manipulados:
// const totalValue = screen.getByTestId('total-field');
// const expenseValueInput = screen.getByTestId('value-input');
// const expenseDescriptionInput = screen.getByTestId('description-input');
// const currencyInput = screen.getByTestId('currency-input');
// const methodInput = screen.getByTestId('method-input');
// const categoryTag = screen.getByTestId('tag-input');
