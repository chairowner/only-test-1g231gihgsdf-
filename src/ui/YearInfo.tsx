import { FC } from 'react';
import styled from 'styled-components';

interface YearInfoProps {
  year: number;
  description: string;
}

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  strong {
    color: #3877ee;
  }
`;

export const YearInfo: FC<YearInfoProps> = ({ year, description }) => {
  return (
    <SContainer>
      <strong>{year}</strong>
      <span>{description}</span>
    </SContainer>
  );
};
