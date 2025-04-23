import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../lib/hooks';
import { DateCircle } from '../components';
import { DateYearsInfo } from '../types';
import { Heading } from '../ui';

const StyledDiv = styled.div<{ $borderColor: string }>`
  height: 100vh;
  border-left: 1px solid ${(props) => props.$borderColor};
  border-right: 1px solid ${(props) => props.$borderColor};
  margin: 0 320px 0 160px;
  padding: 170px 80px 0 80px;
  position: relative;
  overflow: hidden;
`;

interface YearDateBlockProps {
  initialState: DateYearsInfo[];
}

export const YearDateBlock: FC<YearDateBlockProps> = ({ initialState }) => {
  const { primary10 } = useAppSelector((state) => state.theme);
  const [dateYears, setDateYears] = useState<DateYearsInfo[]>(initialState);

  const changeDate = ({ day }: Pick<DateYearsInfo, 'day'>) => {
    setDateYears((dateYears) =>
      [...dateYears].map((date) => ({
        ...date,
        selected: date.day === day,
      }))
    );
  };

  useEffect(() => {
    setDateYears((dateYears) =>
      [...dateYears].map((date) => ({ ...date, selected: date.day === 3 }))
    );
  }, []);

  return (
    <StyledDiv $borderColor={primary10}>
      <Heading title="Исторические даты" style={{ position: 'absolute', left: 0, top: '20%' }} />
      <DateCircle dateYears={dateYears} changeDate={changeDate} />
    </StyledDiv>
  );
};
