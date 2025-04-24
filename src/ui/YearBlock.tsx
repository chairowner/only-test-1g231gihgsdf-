import { FC } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../lib/hooks';

interface YearBlockProps {
  year: number;
  description: string;
}

const SContainer = styled.div<{ $accent: string; $primary: string; $mobile: string }>`
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

  @media (max-width: ${({ $mobile }) => $mobile}) {
    gap: 5px;

    strong {
      font-size: 16px;
      line-height: 120%;
    }

    span {
      font-size: 14px;
      line-height: 145%;
      /* height: 80px; */
    }
  }
`;

export const YearBlock: FC<YearBlockProps> = ({ year, description }) => {
  const { primary, accent } = useAppSelector((state) => state.theme);
  const adaptive = useAppSelector((state) => state.adaptive);

  return (
    <SContainer $accent={accent} $primary={primary} $mobile={adaptive.$mobile}>
      <strong>{year}</strong>
      <span>{description}</span>
    </SContainer>
  );
};
