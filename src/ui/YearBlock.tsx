import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../lib/hooks';

interface YearBlockProps {
  year: number;
  description: string;
}

const SContainer = styled.div<{
  $accent: string;
  $primary: string;
  $mobile: string;
  $visible: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0px' : '10px')});
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;

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
    }
  }
`;

export const YearBlock: FC<YearBlockProps> = ({ year, description }) => {
  const { primary, accent } = useAppSelector((state) => state.theme);
  const adaptive = useAppSelector((state) => state.adaptive);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 50); // задержка нужна для корректной анимации
    return () => {
      setVisible(false);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <SContainer $accent={accent} $primary={primary} $mobile={adaptive.$mobile} $visible={visible}>
      <strong>{year}</strong>
      <span>{description}</span>
    </SContainer>
  );
};
