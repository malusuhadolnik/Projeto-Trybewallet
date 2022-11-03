import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionThunkGetRates, addAnExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  // No handleSubmit: chamar a API
  // fazer lógica do incremento da id: id é o index do elemento da array
  // pegar o estado local e armazenar no global

  handleSubmit = async () => {
    const { expenses, dispatch } = this.props;
    const exchangeRates = await dispatch(actionThunkGetRates());

    const currentID = expenses.length;
    const expenseData = { id: currentID, ...this.state, exchangeRates };
    console.log(expenseData); // OK
    dispatch(addAnExpense(expenseData));

    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      // <div>WalletForm</div>
      <form>
        <div>
          <p>Valor da despesa:</p>
          <input
            data-testid="value-input"
            id="expenseValue"
            type="text"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <p>Descrição da despesa:</p>
          <input
            data-testid="description-input"
            id="expenseDescription"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <p>Moeda:</p>
          <select
            id="currency"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              currencies.map((coin, index) => (
                <option key={ index }>{ coin }</option>
              ))
            }
          </select>
        </div>
        <div>
          <p>Método de pagamento:</p>
          <select
            id="paymentMethod"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option id="Dinheiro" value="Dinheiro">Dinheiro</option>
            <option id="Crédito" value="Cartão de crédito">Cartão de crédito</option>
            <option id="Débito" value="Cartão de débito">Cartão de débito</option>
          </select>
        </div>
        <div>
          <p>Categoria:</p>
          <select
            id="categoryTag"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option id="Alimentação" value="Alimentação">Alimentação</option>
            <option id="Lazer" value="Lazer">Lazer</option>
            <option id="Trabalho" value="Trabalho">Trabalho</option>
            <option id="Transporte" value="Transporte">Transporte</option>
            <option id="Saúde" value="Saúde">Saúde</option>
          </select>
        </div>
        <br />
        <br />
        <div>
          <button
            data-testid="login-submit-button"
            type="button"
            name="button"
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </div>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf,
  expenses: PropTypes.arrayOf,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({ // state é o objeto do estado global
  currencies: state.wallet.currencies, // estrutura -> chave: state.meuReducer.chaveQueEuQuero
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
