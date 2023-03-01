//Form events
import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      formSubmitted: false,
      formErrors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.validateForm() === true) {
      this.setState({ formSubmitted: true });
      console.log("Вас було успішно зареєстровано");
    } else {
      console.error("Щось пішло не так");
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFocus = (event) => {
    this.setState({ formSubmitted: false });
    const formErrors = { ...this.state.formErrors };
    const { name } = event.target;
    delete formErrors[name];
    this.setState({ formErrors });
  };

  handleBlur = (event) => {
    const formErrors = { ...this.state.formErrors };
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 2 ? "Імʼя не може бути менше 2 символів" : "";
        break;
      case "email":
        formErrors.email =
          value.length === 0
            ? "Email є обовʼязковим"
            : !this.validateEmail(value)
            ? "Невірний формат поштової адреси"
            : "";
        break;
      case "password":
        formErrors.password =
          value.length < 8
            ? "Пароль має містити не менше 8 символів"
            : "";
        break;
      case "confirmPassword":
        formErrors.confirmPassword =
          value !== this.state.password
            ? "Паролі не співпадають"
            : "";
        break;
    }
    this.setState({ formErrors });
  };

  validateForm = () => {
    const formErrors = { ...this.state.formErrors };
    const state = {...this.state};
    const errors = Object.values(formErrors).every((item) => item.length === 0);
    const states = Object.values(state).every((item) => item !== '');
    
    if (errors === true && states === true) {
        return true;
    } else {
      return false;
    }
  };

  validateEmail = (value) => {
    const EMAIL_REGEXP =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return EMAIL_REGEXP.test(value);
  };

  render() {
    const { firstName, formErrors } = this.state;
    const styleForm = {
      display: "flex",
      flexDirection: "column",
      textAlign: 'left',
      gap: "10px",
    };

    return (
      <div className="wrap-form">
        <form onSubmit={this.handleSubmit} style={styleForm}>
          <h1>Реєстрація:</h1>
          <div className="forms-input">
            <label htmlFor="">Імʼя:</label>
            <input
              type="text"
              name="firstName"
              placeholder={"Імʼя"}
              value={firstName}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {formErrors.firstName && <span>{formErrors.firstName}</span>}
          </div>
          <div className="forms-input">
            <label htmlFor="">Email: </label>
            <input
              type="text"
              name="email"
              placeholder={"Email"}
              value={this.email}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {formErrors.email && <span>{formErrors.email}</span>}
          </div>
          <div className="forms-input">
            <label htmlFor="">Пароль:</label>
            <input
              type="password"
              name="password"
              placeholder={"Пароль"}
              value={this.password}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              autoComplete="on"
            />
            {formErrors.password && <span>{formErrors.password}</span>}
          </div>
          <div className="forms-input">
            <label htmlFor="confirmPassword">Підтвердження паролю: </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder={"Пароль"}
              value={this.confirmPassword}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              autoComplete="on"
            />
            {formErrors.confirmPassword && (
              <span>{formErrors.confirmPassword}</span>
            )}
          </div>
          <button type="submit" className="btn">Зареєструватись</button>
          {this.formSubmitted && <p>Вас було успішно зареєстровано</p>}
        </form>
      </div>
    );
  }
}

export default Form;