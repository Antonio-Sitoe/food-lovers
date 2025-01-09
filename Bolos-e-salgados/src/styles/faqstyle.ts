import styled from "styled-components";

export const Faqs = styled.section`
  margin: 3rem;

`;

export const Faq = styled.main`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  margin: 3rem 0;
  padding: 1rem 0;
  border-bottom: 1px solid #eeee;
    @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const FaqImage = styled.div`
  width: 100%;
  img {
    margin: 0 auto;
    max-width: 20rem;
  }
  @media (max-width: 500px) {
    order: 2;
  }
`;
export const FaqContent = styled.div`
  h1 {
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 1rem;
  }
`;
