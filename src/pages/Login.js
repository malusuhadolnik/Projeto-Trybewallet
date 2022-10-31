import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.enableSubmitButton());
  };

  handleSubmit = () => { // faz 2 coisas: add estado local ao global através do dispatch e faz a mudança de página com o history.push
    const { dispatch, history } = this.props; // dispatch é uma função da store que recebe uma action e envia para o reducer
    const { email } = this.state;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  enableSubmitButton = () => {
    const { email, password } = this.state;
    const six = 6;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    if (email.match(regex) && password.length >= six) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="name-input">
            <input
              data-testid="email-input"
              type="text"
              value={ email }
              name="email"
              placeholder="E-mail"
              onChange={ this.handleChange }
            />
            <input
              data-testid="password-input"
              type="text"
              value={ password }
              name="password"
              placeholder="Senha"
              onChange={ this.handleChange }
            />
            <button
              data-testid="login-submit-button"
              type="button"
              name="submit"
              disabled={ isButtonDisabled }
              onClick={ this.handleSubmit }
            >
              Entrar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
