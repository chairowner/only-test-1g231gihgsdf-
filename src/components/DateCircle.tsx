import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { useAppSelector } from '../lib/hooks';
import { Theme } from '../lib/features';
import { DateYearsInfo } from '../types';
import { DateCirclePoint } from '../ui';

const CIRCLE_SIZE: number = 530;

const SMainCircle = styled.div<{ $borderColor: string }>`
  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.$borderColor};
  position: relative;
  transform: rotate(0deg);
`;

export type DateCircleProps = {
  dateYears: DateYearsInfo[];
  changeDate: (props: Pick<DateYearsInfo, 'day'>) => void;
};

const getAngle = (index: number, total: number): number => {
  return (index / total) * 360;
};

const getPosition = (index: number, total: number, radius: number) => {
  const angle = (index / total) * 2 * Math.PI;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return { x, y };
};

export const DateCircle: FC<DateCircleProps> = ({ dateYears, changeDate }) => {
  const indexToPosition: number = dateYears.length - 1;

  const { primary20 }: Theme = useAppSelector((state) => state.theme);
  const circleRef = useRef<HTMLDivElement>(null);
  const pointRefs = useRef<HTMLDivElement[]>([]);

  const rotateToIndex = (clickedIndex: number) => {
    const clickedAngle: number = getAngle(clickedIndex, dateYears.length);
    const targetAngle: number = getAngle(indexToPosition, dateYears.length);
    const rotationDelta: number = targetAngle - clickedAngle;

    gsap.to(circleRef.current, {
      rotate: rotationDelta,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => {
        pointRefs.current.forEach((elem) => {
          if (elem) {
            elem.style.transform = `rotate(${-rotationDelta}deg)`;
          }
        });
      },
    });
  };

  useEffect(() => {
    dateYears.map((dateYearInfo: DateYearsInfo, index) => {
      if (!dateYearInfo.selected) return;
      rotateToIndex(index);
    });
  }, [dateYears]);

  return (
    <SMainCircle $borderColor={primary20} ref={circleRef}>
      {dateYears.map((dateYearInfo: DateYearsInfo, index) => {
        const { x, y } = getPosition(index, dateYears.length, CIRCLE_SIZE / 2);
        return (
          <DateCirclePoint
            key={index}
            day={dateYearInfo.day}
            title={dateYearInfo.title}
            selected={dateYearInfo.selected}
            ref={(e) => {
              pointRefs.current[index] = e;
            }}
            onClick={() => {
              changeDate({ day: dateYearInfo.day });
            }}
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px - 28px)`,
              top: `calc(50% + ${y}px - 28px)`,
            }}
          />
        );
      })}
    </SMainCircle>
  );
};
