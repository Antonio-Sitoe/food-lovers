import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { Links } from '../../styles/styles';
import { Searching } from './Searching';
import { Wrapper } from './styles';

const Search = () => {
  const [search, setSearch] = React.useState(false);

  return (
    <>
      <Wrapper onClick={() => setSearch(true)}>
        <input type='search' disabled placeholder='O que deseja hoje ?' />
        <Links href='' onClick={(e) => e.preventDefault()}>
          <BiSearchAlt />
        </Links>
      </Wrapper>
      {search && <Searching setSearch={setSearch} />}
    </>
  );
};

export default Search;
