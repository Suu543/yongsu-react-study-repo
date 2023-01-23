import React from "react";
import Form from "react-bootstrap/Form";
import Joi from "joi";
import FormComp from "./common/FormComp";
import { Navigate } from "react-router-dom";
import withRouter from "../hoc/withRouter";
import auth from "../services/authService";

class LoginForm extends FormComp {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Navigate replace to="/" />;

    return (
      <div className="container">
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "formBasicEmail", "email")}
          {this.renderInput(
            "password",
            "Password",
            "formBasicPassword",
            "password"
          )}
          {this.renderButton("Login")}
        </Form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
