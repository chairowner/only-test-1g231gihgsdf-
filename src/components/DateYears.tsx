import { CSSProperties, FC } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../lib/hooks';
import { BigYear } from '../ui';
import { YearInfo } from '../types';

const SDateYears = styled.div<{ $mobile: string }>`
  display: flex;
  gap: 60px;

  @media (max-width: ${({ $mobile }) => $mobile}) {
    justify-content: space-between;
    gap: 5px;
    width: 100%;
  }
`;

interface DateYearsProps {
  years: YearInfo[];
  style?: CSSProperties;
}

export const DateYears: FC<DateYearsProps> = ({ years, style }) => {
  const { accent, secondary } = useAppSelector((state) => state.theme);
  const adaptive = useAppSelector((state) => state.adaptive);

  const first: number = years[0]?.year ?? 0;
  const last: number = years[years.length - 1]?.year ?? 0;

  return (
    <SDateYears style={style} $mobile={adaptive.$mobile}>
      <BigYear color={accent} year={first} />
      <BigYear color={secondary} year={last} />
    </SDateYears>
  );
};
