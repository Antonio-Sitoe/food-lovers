import styled from "styled-components";
import { theme } from "./theme";
import { animeLeft, AnimeLeft } from "./Aboutstyles";

export const UserAcountEditStyle = styled.form`
  display: grid;
  gap: 1rem;
  max-width: 450px;
  padding: 1rem;
  width: 100%;
  animation: ${animeLeft} 0.3s;

  select {
    background: ${theme.colors.white};
    border: 3px solid ${theme.colors.grey};
    box-sizing: border-box;
    border-radius: 4px;
    padding: 1rem;
    width: 100%;
    outline: none;
    &:hover,
    &:focus {
      border: 3px solid ${theme.colors.blackHover};
    }
  }

  h1 {
    margin-bottom: 2rem;
  }

  a {
    padding: 0.6rem 0;
    color: ${theme.colors.link};
  }
  p {
    a {
      color: ${theme.colors.tomato};
    }
  }
`;
export const UserContent = styled.section`
  /* padding: 0 3rem; */

  @media (max-width: 800px) {
    padding: 0;
  }
`;
export const Subtitle = styled.h2`
  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 1rem;

  &::after {
    content: "";
    width: 2rem;
    height: 2px;
    display: block;
    margin: 0.4rem 0;
    background: ${theme.colors.blackHover};
  }
`;
export const Order = styled.main`
  animation: ${AnimeLeft} 0.3s;
  div {
    width: 100%;
    display: flex;
    position: relative;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    table {
      border: 1px solid whitesmoke;
      border-radius: 4px;
      width: 100%;
      thead {
        background: ${theme.colors.baseSmooth};
        tr {
          th {
            font-weight: bold;
          }
        }
      }
      th,
      td {
        padding: 1rem;
        border: 1px solid whitesmoke;
        text-align: center;
      }
      tbody {
        p {
          padding: 0.6rem;
          text-align: center;
        }
        tr {
          td {
            a {
              width: 100%;
              padding: 1rem;
              display: flex;
              align-items: center;
              justify-content: center;
              background: ${theme.colors.base};
              color: ${theme.colors.baseSmooth};
              &:hover {
                background: ${theme.colors.baseSmooth};
                color: ${theme.colors.base};
              }
            }
            &:last-child {
              padding: 0;
            }
          }
        }
      }
    }

    @media (max-width: 80rem) {
      table {
        flex: 1 0 700px;
        th,
        td {
          padding: 1rem 0;
          border: 1px solid whitesmoke;
          text-align: center;
        }
        tbody {
          tr {
            td {
              a {
                padding: 1rem 0;
              }
            }
          }
        }
      }
    }
  }
`;
