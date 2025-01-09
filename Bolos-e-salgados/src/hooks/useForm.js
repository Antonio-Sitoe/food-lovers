import React from 'react';

const Types = {
  name: {
    regex: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
    message: 'Digite um nome valido',
  },
  email: {
    regex:
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
    message: 'Preencha um email valido',
  },
  password: {
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: 'Minimum eight characters, at least one letter and one number',
  },
};

const useForm = (type, initial) => {
  const [value, setValue] = React.useState(initial || '');
  const [error, setError] = React.useState('');

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }
  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha um valor');
      return false;
    } else if (Types[type] && !Types[type].regex.test(value)) {
      setError(Types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
