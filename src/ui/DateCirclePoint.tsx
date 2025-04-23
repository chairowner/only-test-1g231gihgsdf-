import { CSSProperties, FC, forwardRef, use, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppSelector } from '../lib/hooks';
import { DateYearsInfo } from '../types';

const SDay = styled.span`
  font-weight: bold;
`;
const STitle = styled.strong<{ $visible: boolean }>`
  text-align: start;
  position: absolute;
  top: 25%;
  left: calc(100% + 20px);
  font-weight: bold;
  font-size: 20px;
  transform: scale(${({ $visible }) => ($visible ? 1 : 0.5)});
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition:
    transform 0.1s ease,
    opacity 1s ease;
`;
const SPoint = styled.div<{ $p: string }>`
  width: 6px;
  height: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ $p }) => $p};
  border-radius: 50%;
  background-color: ${({ $p }) => $p};
  cursor: pointer;
  transition:
    background-color 0.4s ease-out,
    width 0.3s ease-in-out,
    height 0.3s ease-in-out;

  ${SDay} {
    opacity: 0;
    transition: opacity 0.6s ease;
  }
`;
const hoverStyles = css<{ $bg: string }>`
  ${SPoint} {
    width: 56px;
    height: 56px;
    background-color: ${({ $bg }) => $bg};

    ${SDay} {
      opacity: 1;
    }
  }
`;
const SHoverPoint = styled.div<{ $bg: string; $selected?: boolean }>`
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    ${hoverStyles}
  }

  ${({ $selected }) => $selected && hoverStyles}
`;

type DateCirclePointProps = Pick<DateYearsInfo, 'day' | 'title'> & {
  selected?: boolean;
  style?: CSSProperties;
  onClick: () => void;
  children?: React.ReactNode;
};

export const DateCirclePoint = forwardRef<HTMLDivElement, DateCirclePointProps>(
  ({ day, title, selected, style, onClick }, ref) => {
    const theme = useAppSelector((state) => state.theme);
    const [titleVisible, setTitleVisible] = useState(false);

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (selected) {
        timer = setTimeout(() => setTitleVisible(true), 1000);
      } else {
        setTitleVisible(false);
      }
      return () => clearTimeout(timer);
    }, [selected]);

    return (
      <SHoverPoint
        ref={ref}
        $bg={theme.background}
        $selected={selected}
        style={style}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <SPoint $p={theme.primary}>
          <SDay>{day}</SDay>
        </SPoint>
        {selected && <STitle $visible={titleVisible}>{title}</STitle>}
      </SHoverPoint>
    );
  }
);
