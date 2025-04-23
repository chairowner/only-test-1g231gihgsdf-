import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../lib/hooks';
import { DateCircle, DateSelector, DateYears, YearBlockList } from '../components';
import { DateYearsInfo, YearInfo } from '../types';
import { Heading } from '../ui';

const SContainer = styled.div<{ $borderColor: string }>`
  position: relative;
  height: 1080px;
  border-left: 1px solid ${(props) => props.$borderColor};
  border-right: 1px solid ${(props) => props.$borderColor};
  margin: 0 160px 0 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;
const SDateCircle = styled.div<{ $primary: string }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  top: 215px;

  &::after,
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
    width: 120vw;
  }
`;
const SDateCircleWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SDateSelectorWrapper = styled.div`
  margin: 31px 80px;
  width: fit-content;
`;

const SDates = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
`;

const STop = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  padding-top: 170px;
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
      <SDateCircleWrapper>
        <SDateCircle $primary={primary10}>
          <DateYears style={{ position: 'absolute' }} years={years} />
          <DateCircle dateYears={dateYears} changeDate={changeDate} />
        </SDateCircle>
      </SDateCircleWrapper>
      <STop>
        <Heading title="Исторические даты" />
      </STop>
      <SDates>
        <SDateSelectorWrapper>
          <DateSelector dateYears={dateYears} changeDate={changeDate} />
        </SDateSelectorWrapper>
        <YearBlockList years={years} />
      </SDates>
    </SContainer>
  );
};
