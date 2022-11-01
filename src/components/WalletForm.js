import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      expenseValue: '',
      expenseDescription: '',
      paymentMethod: 'Dinheiro',
      categoryTag: 'Alimentação',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { expenseValue, expenseDescription, paymentMethod, categoryTag } = this.state;
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
            name="expenseValue"
            value={ expenseValue }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <p>Descrição da despesa:</p>
          <input
            data-testid="description-input"
            id="expenseDescription"
            type="text"
            name="expenseDescription"
            value={ expenseDescription }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          <p>Moeda:</p>
          <select
            id="currency"
            data-testid="currency-input"
            name="currencies"
            value={ currencies }
            onChange={ this.handleChange }
          >
            {
              currencies.map((currency, index) => (
                <option key={ index }>{ currency }</option>
              ))
            }
          </select>
        </div>
        <div>
          <p>Método de pagamento:</p>
          <select
            id="paymentMethod"
            data-testid="method-input"
            name="paymentMethod"
            value={ paymentMethod }
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
            name="categoryTag"
            value={ categoryTag }
            onChange={ this.handleChange }
          >
            <option id="food" value="food">Alimentação</option>
            <option id="leisure" value="leisure">Lazer</option>
            <option id="work" value="work">Trabalho</option>
            <option id="transport" value="transport">Transporte</option>
            <option id="health" value="health">Saúde</option>
          </select>
        </div>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ // state é o objeto do estado global
  currencies: state.wallet.currencies, // estrutura -> chave: state.meuReducer.chaveQueEuQuero
});

export default connect(mapStateToProps)(WalletForm);
