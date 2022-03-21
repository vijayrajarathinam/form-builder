const validate = (values, rest) => {
  const inputs = [];
  const errors = {};

  rest.inputs.struct?.sections?.forEach((section) =>
    section.rows.forEach((row) => row.columns.forEach((props) => inputs.push(props)))
  );
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (inputs.length > 0)
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];

      if (input.isRequired) {
        if (!values[input.label]) errors[input.label] = "This Field cannot be empty";

        if (input.type == "email" && !values[input.label]?.toLowerCase().match(re))
          errors[input.label] = "Not a valid email";

        if (input.type == "number" && input.minValue <= values[input.label].length)
          errors[input.label] = `Value must be greater than ${input.minValue}`;
      }
    }
  return errors;
};

export default validate;
