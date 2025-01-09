import { AnimeIntro } from '../../styles/styles';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface IBannerBackgorundProps {
  backgroundUrl: string
}

export const BannerStyle = styled.div`
  display: grid;
  animation: 0.3s ${AnimeIntro};

    main {
      grid-area: 1/1;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h1 {
        color: ${theme.colors.white};
        max-width: 600px;
        margin: 2rem;
        line-height: 1;
        text-align: center;
        font-size: 2rem;
        font-family: ${theme.fonts.Lobster};
      }
      a {
        padding: 1rem;
        margin: 1rem 0;
        svg {
          margin-right: 1rem;
        }
      }
    }
`;

export const BannerBackgroundImage = styled.div<IBannerBackgorundProps>`
   grid-area: 1/1;
   background: url(${props => props.backgroundUrl}) no-repeat center center;
   background-size:cover ;
   height: 20rem;
    @media (max-width: 500px) {
      height: 15rem;
    }

    @media (min-width: 1200px) {
      height: 35rem;
    }
`
