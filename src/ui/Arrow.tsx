import { FC } from 'react';
import styled from 'styled-components';
import 'swiper/css/navigation';
import { useAppSelector } from '../lib/hooks';

interface ArrowProps {
  side: 'left' | 'right';
  disabled?: boolean;
  onClick?: () => void;
}

const SArrow = styled.button<{
  $primary: string;
  $primary50: string;
  $light: string;
  $mobile: string;
}>`
  z-index: auto;
  position: relative;
  right: auto;
  left: auto;
  top: auto;
  bottom: auto;
  text-rendering: auto;
  color: ${({ $primary }) => $primary};
  width: 50px;
  height: 50px;
  border: 1px solid ${({ $primary50 }) => $primary50};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: ${({ $light }) => $light};
  }

  &::after {
    font-size: 14px;
    font-weight: bold;
  }

  @media (max-width: ${({ $mobile }) => $mobile}) {
    width: 25px;
    height: 25px;

    &::after {
      font-size: 8px;
    }
  }
`;

const getClassName = ({ side, disabled }: ArrowProps): string => {
  let className = side === 'right' ? 'swiper-button-next' : 'swiper-button-prev';
  if (disabled) className += ' swiper-button-disabled';
  return className;
};

export const Arrow: FC<ArrowProps> = (props) => {
  const { primary, primary50, light } = useAppSelector((state) => state.theme);
  const adaptive = useAppSelector((state) => state.adaptive);
  return (
    <SArrow
      className={getClassName(props)}
      $mobile={adaptive.$mobile}
      $primary={primary}
      $primary50={primary50}
      $light={light}
      disabled={props.disabled}
      onClick={() => props.onClick()}
    />
  );
};
