import { FC } from 'react';
import styled from 'styled-components';
import 'swiper/css/navigation';
import { useAppSelector } from '../lib/hooks';

interface ArrowProps {
  side: 'left' | 'right';
}

const SArrow = styled.div<{ $primary: string; $primary50: string; $right?: boolean }>`
  text-rendering: auto;
  color: ${({ $primary }) => $primary};
  width: 50px;
  height: 50px;
  border: 1px solid ${({ $primary50 }) => $primary50};
  border-radius: 50%;
  cursor: pointer;
  &::after {
    font-size: 14px;
    font-weight: bold;
  }
`;

export const Arrow: FC<ArrowProps> = ({ side }) => {
  const { primary, primary50 } = useAppSelector((state) => state.theme);
  return (
    <SArrow
      className="swiper-button-next"
      $primary={primary}
      $primary50={primary50}
      $right={side === 'right'}
    />
  );
};
