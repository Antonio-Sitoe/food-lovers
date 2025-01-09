import { Title } from '../../styles/styles';
import { SumaryStyle } from './styles';

type ISmary = {
  title: string;
  description: string;
};
const Sumary = ({ title, description }: ISmary) => {
  return (
    <SumaryStyle>
      <Title>{title}</Title>
      <p>{description}</p>
    </SumaryStyle>
  );
};

export default Sumary;
