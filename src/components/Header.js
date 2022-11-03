import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    const values = expenses.map((expense) => {
      const coin = expense.currency;
      const arrayOfCurrencies = Object.values(expense.exchangeRates);
      const targetCoin = arrayOfCurrencies.filter((currency) => currency.code === coin);
      // console.log(targetCoin);
      // console.log(targetCoin[0].ask);
      // console.log(expense.value);
      return expense.value * targetCoin[0].ask;
    });
    console.log(values);
    const sum = values.reduce((accumulator, value) => accumulator + value, 0);
    return Math.round(sum * 100) / 100;
  };

  render() {
    const { email } = this.props;

    return (
      <div>
        <h2 data-testid="total-field">{ this.totalExpenses() }</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
        <h2 data-testid="email-field">{ email }</h2>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf,
}.isRequired;

const mapStateToProps = (state) => ({ // state é o objeto do estado global
  email: state.user.email, // estrutura -> chave: state.meuReducer.chaveQueEuQuero
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
