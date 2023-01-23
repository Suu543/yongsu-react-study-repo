import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Select = ({
  controlId,
  label,
  value,
  error,
  onChange,
  name,
  options,
}) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Select name={name} onChange={onChange} value={value}>
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </Form.Select>
      {error && <Alert variant="danger">{error}</Alert>}
    </Form.Group>
  );
};

export default Select;
