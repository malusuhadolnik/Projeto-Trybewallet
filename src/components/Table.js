import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeAnExpense, enableEditButton } from '../redux/actions';

class Table extends Component { // precisamos identificar o target do clique, para remover apenas ele
  handleRemove = ({ target }) => {
    const { dispatch } = this.props;
    const id = Number(target.name); // dica de OURO do Mateus Ramos (25B)! converter para número!
    // console.log(`id do target: ${id}`); // funciona OK
    dispatch(removeAnExpense(id), console.log('fez dispatch do removeAnExpense')); // funciona oK
  };

  enableEdition = ({ target }) => {
    const { dispatch } = this.props;
    const id = Number(target.name);
    dispatch(enableEditButton(id), console.log('fez dispatch do enableEditButton')); // funciona oK
  };

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
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      name={ expense.id }
                      onClick={ this.handleRemove }
                    >
                      Remover
                    </button>
                    <button
                      data-testid="edit-btn"
                      type="button"
                      name={ expense.id }
                      onClick={ this.enableEdition }
                    >
                      Editar
                    </button>
                  </td>
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
