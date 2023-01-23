import React from "react";
import Form from "react-bootstrap/Form";
import FormComp from "./common/FormComp";
import Joi from "joi";

class RegisterForm extends FormComp {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  });

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "username",
            "Username",
            "formBasicUsername",
            "text"
          )}
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

export default RegisterForm;
