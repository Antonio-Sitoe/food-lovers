import styled, { keyframes } from 'styled-components';

const animeleft = keyframes`
  
  from {
opacity: 0;
transform: translate3d(0, -30px,0);
  }

  to {
opacity: 1;
transform: translate3d(0, 0,0);
  }
`;
export const ProdutoStyle = styled.div`
  margin: 2rem 0;
  animation: ${animeleft} 0.3s;
`;
export const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: start;
  padding: 6rem 0;
`;




