import { CSSProperties, FC } from 'react';
import styled from 'styled-components';

interface HeadingProps {
  title: string;
  style?: CSSProperties;
}

const SContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 78px;

  &::before {
    content: '';
    display: block;
    height: 120px;
    width: 5px;
    background: linear-gradient(#3877ee, #ef5da8);
  }
`;

const SH1 = styled.h1`
  position: relative;
  top: -3px;
  width: 353px;
  font-size: 56px;
  font-weight: bold;
  line-height: 120%;
`;

export const Heading: FC<HeadingProps> = ({ title, style }) => {
  return (
    <SContainer style={style}>
      <SH1>{title}</SH1>
    </SContainer>
  );
};
