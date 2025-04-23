import { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../lib/hooks';

interface YearBlockProps {
  year: number;
  description: string;
}

const SContainer = styled.div<{ $accent: string; $primary: string }>`
  display: flex;
  flex-direction: column;
  gap: 15px;

  strong {
    font-family: 'Bebas Neue', cursive;
    font-weight: normal;
    font-size: 25px;
    line-height: 120%;
    color: ${({ $accent }) => $accent};
  }

  span {
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 0;
    color: ${({ $primary }) => $primary};
  }
`;

export const YearBlock: FC<YearBlockProps> = ({ year, description }) => {
  const { primary, accent } = useAppSelector((state) => state.theme);

  return (
    <SContainer $accent={accent} $primary={primary}>
      <strong>{year}</strong>
      <span>{description}</span>
    </SContainer>
  );
};
