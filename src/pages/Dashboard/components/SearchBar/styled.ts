import styled, { css } from 'styled-components';
import searchBg from '../../../../assets/search-bg.png';

interface ClearSearchProps {
  show: boolean;
}

export const SearchBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vw / 5.5);
  min-height: 9.375rem;
  background-image: url(${searchBg});
  background-size: cover;
  background-position: center;
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.75rem;
  width: 100%;
  max-width: var(--max-width-content);
  background-color: var(--white);
  border-radius: 0.5rem;
  margin: 0 var(--margin-content);
  height: 4.6875rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 90%;
  border: none;
  font-family: 'Muli';
  font-size: 1.5rem;

  &::placeholder {
    font-weight: 300;
  }
`;

export const SearchIcon = styled.div`
  cursor: pointer;
  width: 3.0625rem;
  height: 3.0625rem;
`;

export const ClearSearch = styled.div<ClearSearchProps>`
  font-size: 0.8rem;
  margin: 0 0.5rem;
  cursor: pointer;
  display: none;
  width: 2rem;
  height: 2rem;
  display: flex;
  transition: 0.2s all ease-in-out;
  opacity: 0;
  pointer-events: none;

  ${props =>
    props.show &&
    css`
      opacity: 1;
      pointer-events: all;
    `}
`;
