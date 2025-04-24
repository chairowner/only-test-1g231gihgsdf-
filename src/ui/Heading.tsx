import { CSSProperties, FC } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../lib/hooks';

interface HeadingProps {
  title: string;
  style?: CSSProperties;
}

const SH1 = styled.h1<{ $mobile: string }>`
  position: relative;
  top: -3px;
  width: 353px;
  font-size: 56px;
  font-weight: bold;
  line-height: 120%;

  @media (max-width: ${({ $mobile }) => $mobile}) {
    font-size: 20px;
    width: 123px;
  }
`;

const SContainer = styled.div<{ $accent: string; $secondary: string; $mobile: string }>`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 78px;

  @media (min-width: ${({ $mobile }) => $mobile}) {
    &::before {
      content: '';
      display: block;
      height: 120px;
      width: 5px;
      background: linear-gradient(${({ $accent }) => $accent}, ${({ $secondary }) => $secondary});
    }
  }
`;

export const Heading: FC<HeadingProps> = ({ title, style }) => {
  const { accent, secondary } = useAppSelector((state) => state.theme);
  const adaptive = useAppSelector((state) => state.adaptive);

  return (
    <SContainer $accent={accent} $secondary={secondary} $mobile={adaptive.$mobile} style={style}>
      <SH1 $mobile={adaptive.$mobile}>{title}</SH1>
    </SContainer>
  );
};
