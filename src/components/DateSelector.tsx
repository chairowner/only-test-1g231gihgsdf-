import { FC } from 'react';
import styled from 'styled-components';
import { DateYearsInfo } from '../types';
import { Arrow } from '../ui';
import { useAppSelector } from '../lib/hooks';

const SArrows = styled.div<{ $mobile: string }>`
  display: flex;
  gap: 20px;
  height: 50px;
  margin-top: 25px;

  @media (max-width: ${({ $mobile }) => $mobile}) {
    gap: 8px;
  }
`;
const SContainer = styled.div<{ $mobile: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${({ $mobile }) => $mobile}) {
    gap: 5px;
  }
`;
const SDateText = styled.span`
  font-size: 14px;
`;

interface DateSelectorProps {
  dateYears: DateYearsInfo[];
  changeDate: (props: Pick<DateYearsInfo, 'day'>) => void;
}

const printZeros = (num: number): string => num.toString().padStart(2, '0');

export const DateSelector: FC<DateSelectorProps> = ({ dateYears, changeDate }) => {
  const adaptive = useAppSelector((state) => state.adaptive);

  if (!dateYears.length) return;

  const dateYear = dateYears.find((date) => date.selected)!;
  if (!dateYear) return;

  const firstDate: DateYearsInfo = dateYears[0];
  const lastDate: DateYearsInfo = dateYears[dateYears.length - 1];

  const change = (action: 'left' | 'right'): void => {
    const currentIndex: number = dateYears.indexOf(dateYear);
    if (currentIndex === -1) return;
    const newIndex: number = action === 'right' ? currentIndex + 1 : currentIndex - 1;
    const nextDate: DateYearsInfo = dateYears.find((_, index) => index === newIndex)!;
    if (!nextDate) return;
    changeDate({ day: nextDate.day });
  };

  return (
    <SContainer $mobile={adaptive.$mobile}>
      <SDateText>
        {printZeros(dateYear.day)}/{printZeros(dateYear.month)}
      </SDateText>
      <SArrows $mobile={adaptive.$mobile}>
        <Arrow
          side="left"
          disabled={firstDate.day === dateYear.day}
          onClick={() => change('left')}
        />
        <Arrow
          side="right"
          disabled={lastDate.day === dateYear.day}
          onClick={() => change('right')}
        />
      </SArrows>
    </SContainer>
  );
};
