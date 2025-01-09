import styled from 'styled-components';
import { AnimeIntro } from '../../styles/styles';
interface IntroOnPageStyleProps {
  bg: string
}
export const IntroOnPageStyle = styled.section<IntroOnPageStyleProps>`
  background: url(${(props) => props.bg}) no-repeat;
  background-position: center center;
  background-size: cover;
  height: 15rem;
  animation: 0.3s ${AnimeIntro};

  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  margin-bottom: 1rem;
  text-align: center;
  h1 {
    &::after {
      content: '';
      margin: 1rem auto;
      display: block;
      background: #c4c4c4;
      width: 8rem;
      height: 0.1rem;
      border-radius: 4px;
    }
  }
`;