import React from "react";
import Form from "react-bootstrap/Form";
import FormComp from "./common/FormComp";
import Joi from "joi";
import withRouter from "../hoc/withRouter";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends FormComp {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().min(5).required().label("Name"),
  });

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Username", "formBasicEmail", "email")}
          {this.renderInput(
            "password",
            "Password",
            "formBasicPassword",
            "password"
          )}
          {this.renderInput("name", "Name", "formBasicName", "text")}
          {this.renderButton("Register")}
        </Form>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
