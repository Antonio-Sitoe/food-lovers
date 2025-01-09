import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
html {
  font-size: 62.5%;
}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,

sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
* {
  box-sizing: border-box;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
  font-family: 'Lato', sans-serif;
  font-size:.8rem;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
}
a {
  text-decoration: none;
  color:${theme.colors.black}
}
ul {
  list-style: none;
}
  img {
    width: 100%;
    display: block;
  }
  p {
    line-height: 1.5;
    font-size: 1rem;
   }

h1,h2,h3 {        font-weight: bold;
      }
  h1 {
    font-size: 1.5rem;
   } 
  h2 {
       font-size: 1.2rem;
   }
 h3 {
    font-size: 1rem;
  } 
    @media (max-width: 500px) {
      p {
    font-size: .8rem;
   }
    h1 {
    font-size: 1rem;
   } 
  h2 {
  font-size: 1rem;   }
 h3 {
  font-size: 1rem;
  } 
  }

  li {
    font-size: .9rem;
  }
`;
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 0.6rem;
`;
interface ILinksProps {
  user?: Boolean;
  point?: string;
}
export const Links = styled.a<ILinksProps>`
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  background: ${(props) =>
    props.user ? theme.colors.baseSmooth : theme.colors.base};
  color: ${(props) => (props.user ? theme.colors.black : theme.colors.white)};
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${theme.colors.baseSmooth} !important;
    color: ${theme.colors.black};
  }

  &::after {
    content: '';
    position: absolute;
    width: 4px;
    width: 10px;
    height: 10px;
    display: block;

    background: ${(props) => props.point};
    border-radius: 8px;
    top: -3px;
    right: -2px;
  }
`;
export const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-weight: bold;
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;
export const AnimeIntro = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
