import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const CardStyle = styled.div`
  background: ${theme.colors.baseSmooth};
  border-radius: 4px;
  display: grid;
  gap: 1rem;

  img {
    width: 100%;
  }

  h3 {
    text-align: center;
    text-transform: uppercase;
  }

  p {
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
  }

  a {
    padding: 0.8rem 0;
    width: 100%;
    max-width: 10rem;
    margin: 0 auto 1rem auto;

    &:hover {
      background: #252525 !important;
      color: whitesmoke;
    }
  }
`;
