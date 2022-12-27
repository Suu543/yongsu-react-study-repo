import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Input = ({ controlId, label, value, error, onChange, name, type }) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        onChange={onChange}
        value={value}
        autoFocus
        type={type}
        name={name}
        placeholder="Enter Username"
      />
      {error && <Alert variant="danger">{error}</Alert>}
    </Form.Group>
  );
};

// const Input = ({ controlId, label, error, ...rest }) => {
//   return (
//     <Form.Group className="mb-3" controlId={controlId}>
//       <Form.Label>{label}</Form.Label>
//       <Form.Control {...rest} autoFocus placeholder="Enter Username" />
//       {error && <Alert variant="danger">{error}</Alert>}
//     </Form.Group>
//   );
// };

export default Input;
