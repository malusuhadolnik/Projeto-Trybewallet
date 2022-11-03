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
            <option id="cash" value="cash">Dinheiro</option>
            <option id="credit" value="credit">Cartão de crédito</option>
            <option id="debit" value="debit">Cartão de débito</option>
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
            <option id="food" value="food">Alimentação</option>
            <option id="leisure" value="leisure">Lazer</option>
            <option id="work" value="work">Trabalho</option>
            <option id="transport" value="transport">Transporte</option>
            <option id="health" value="health">Saúde</option>
          </select>
        </div>
        <br />
        <br />
        <div>
          <button
            data-testid="login-submit-button"
            type="button"
            name="submit"
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
