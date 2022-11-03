import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { actionThunkGetAPI } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionThunkGetAPI(), console.log('fez o dispatch da actionThunkGetAPI')); // reducer modifica o estado global de acordo com a action
  }

  render() {
    // return <div>TrybeWallet</div>;
    const { isLoading } = this.props;
    return (
      <div className="wallet-page">
        <Header />
        {isLoading ? 'Loading...' : <WalletForm />}
        <br />
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  isLoading: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  isLoading: state.wallet.isLoading,
});
export default connect(mapStateToProps)(Wallet);
