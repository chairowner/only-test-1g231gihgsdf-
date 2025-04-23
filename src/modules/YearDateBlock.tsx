import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../lib/hooks';
import { DateCircle, DateYears, YearBlockList } from '../components';
import { DateYearsInfo, YearInfo } from '../types';
import { Heading } from '../ui';

const SContainer = styled.div<{ $borderColor: string }>`
  height: 100%;
  border-left: 1px solid ${(props) => props.$borderColor};
  border-right: 1px solid ${(props) => props.$borderColor};
  margin: 0 160px 0 320px;
  padding-top: 170px;
  position: relative;
`;
const SDateCircleWrapper = styled.div<{ $primary: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  /* &::after,
  &::before {
    content: '';
    display: block;
    position: absolute;
    border: 1px solid ${({ $primary }) => $primary};
  }

  &::before {
    height: 150vh;
  }

  &::after {
    width: 100%;
  } */
`;

interface YearDateBlockProps {
  initialState: DateYearsInfo[];
}

export const YearDateBlock: FC<YearDateBlockProps> = ({ initialState }) => {
  const { primary10 } = useAppSelector((state) => state.theme);
  const [dateYears, setDateYears] = useState<DateYearsInfo[]>(initialState);

  const years: YearInfo[] = dateYears.find((date) => date.selected)?.years || [];

  const changeDate = ({ day }: Pick<DateYearsInfo, 'day'>): void => {
    setDateYears((dateYears) =>
      [...dateYears].map((date) => ({
        ...date,
        selected: date.day === day,
      }))
    );
  };

  useEffect(() => {
    changeDate({ day: 3 });
  }, []);

  return (
    <SContainer $borderColor={primary10}>
      <Heading title="Исторические даты" style={{ position: 'absolute', left: 0, top: '130px' }} />
      <SDateCircleWrapper $primary={primary10}>
        <DateYears style={{ position: 'absolute' }} years={years} />
        <DateCircle dateYears={dateYears} changeDate={changeDate} />
      </SDateCircleWrapper>
      <YearBlockList years={years} />
    </SContainer>
  );
};
