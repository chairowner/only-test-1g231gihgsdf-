import { FC } from 'react';
import styled from 'styled-components';
import { YearDateBlock } from './modules';
import { initialDataYears } from './initial';

const StyledDiv = styled.div``;

export const App: FC = () => {
  return (
    <StyledDiv>
      <YearDateBlock initialState={[...initialDataYears]} />
    </StyledDiv>
  );
};
