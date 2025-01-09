import { Label, Wrapper } from "./styles";


interface InputProps {
  label: string;
  name: string;
  id: string;
  value: string;
  type: string;
  error: null | string;
  placeholder?: string;
  onBlur: () => void;
  onChange: () => void;
}

const Input = (
  {
    placeholder,
    type,
    value,
    label,
    name,
    onChange,
    onBlur,
    error,
  }: InputProps,
  key
) => {
  return (
    <Wrapper key={key}>
      <Label htmlFor={name}>{label}</Label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
      />
      {error && <p>{error}</p>}
    </Wrapper>
  );
};

export default Input;
