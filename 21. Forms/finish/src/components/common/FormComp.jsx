import { Component } from "react";
import Button from "react-bootstrap/Button";
import Joi from "joi";
import Input from "./Input";
import Select from "./Select";

class FormComp extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    console.log("input: ", input);
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = this.schema.validate(this.state.data, options);
    console.log("validate result: ", result);

    if (!result.error) return null;

    console.log("aaa");

    const errors = {};

    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const propertySchema = Joi.object({ [name]: this.schema.extract(name) });
    const { error } = propertySchema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log("errors: ", errors);
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  renderButton(label) {
    return (
      <Button disabled={this.validate()} variant="primary" type="submit">
        {label}
      </Button>
    );
  }

  renderInput(name, label, controlId, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        controlId={controlId}
        label={label}
        value={data[name]}
        type={type}
        name={name}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, controlId, options) {
    const { data, errors } = this.state;

    return (
      <Select
        controlId={controlId}
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default FormComp;
