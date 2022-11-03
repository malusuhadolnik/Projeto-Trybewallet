import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      // <div>Table</div>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => {
              const coin = expense.currency;
              const arrayOfCoin = Object.values(expense.exchangeRates);
              const targetCoin = arrayOfCoin.filter((currency) => currency.code === coin);
              const câmbioUtilizado = targetCoin[0].ask;
              const nomeDaMoeda = targetCoin[0].name;
              const valorCovertido = expense.value * câmbioUtilizado;
              return (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ Number(expense.value).toFixed(2) }</td>
                  <td>{ nomeDaMoeda }</td>
                  <td>{ Number(câmbioUtilizado).toFixed(2) }</td>
                  <td>{ Number(valorCovertido).toFixed(2) }</td>
                  <td>Real</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
