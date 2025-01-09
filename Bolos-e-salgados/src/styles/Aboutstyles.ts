import styled, { keyframes } from 'styled-components';
import { AnimeIntro } from './styles';
import { theme } from './theme';

export const AboutStyle = styled.section`
  animation: 0.3s ${AnimeIntro};
  display: grid;
  gap: 2rem;
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  

  div {
    @media (max-width: 800px) {
      order: 1;
    }
  }
  img {
    max-width: 10rem;
    /* margin: 1rem auto;  */
    @media (max-width: 800px) {
      order: 0;
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;

    .About img {
      order: 0;
      height: 20rem;
    }
  }
`;
export const Content = styled.div`
  p {
    margin: 1rem 0;
    line-height: 1.5;
  }
`;

export const animeLeft = keyframes`  
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
 `;

export const AnimeLeft = styled.p`
  margin: 1rem 0;
  animation: ${animeLeft} 0.3s;
`;

export const Faqs = styled.section`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: white;
  border-radius: 4px;

  div {
    padding: 1rem 2rem;
    line-height: 1.5;
    @media (max-width: 320px) {
      padding: 0;
      margin: 0;
    }
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    padding: 0;
    margin: 0;
  }
`;

export const Answer = styled.div`
  background: #a86b3c;
  display: grid;
  gap: 0.6rem;
  border-radius: 4px 0 0 4px;
`;

interface Props {
  active: Boolean
}

export const AnswerChild = styled.div<Props>`
  border-radius: 4px;
  padding: 0.8rem;
  cursor: pointer;
  color: white;
  background: ${(props) => (props.active ? theme.colors.baseSmooth : 'none')};
  color: ${(props) => (props.active ? theme.colors.black : 'white')};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 500px) {
    padding: 0;
    margin: 0;
  }

  &:hover {
    background: ${theme.colors.baseSmooth};
    color: ${theme.colors.black};
  }
`;
export const Respo = styled.div`
  background: #fae9de;
  color: #252525;
  border-radius: 0 4px 4px 0;
`;
