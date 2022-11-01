import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h2 data-testid="total-field">0</h2>
        <h2 data-testid="header-currency-field">BRL</h2>
        <h2 data-testid="email-field">{ email }</h2>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ // state é o objeto do estado global
  email: state.user.email, // estrutura -> chave: state.meuReducer.chaveQueEuQuero
});

export default connect(mapStateToProps)(Header);
