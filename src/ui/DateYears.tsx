import { CSSProperties, FC } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../lib/hooks';

interface DateYearsProps {
  first?: number;
  last?: number;
  style?: CSSProperties;
}

interface SYearProps {
  $color: string;
}

const SYear = styled.span<SYearProps>`
  font-size: 200px;
  font-weight: bold;
  color: ${({ $color }) => $color};
`;
const SDateYears = styled.div`
  display: flex;
  gap: 60px;
`;

export const DateYears: FC<DateYearsProps> = ({ first, last, style }) => {
  const { accent, secondary } = useAppSelector((state) => state.theme);

  return (
    <SDateYears style={style}>
      <SYear $color={accent}>{first}</SYear>
      <SYear $color={secondary}>{last}</SYear>
    </SDateYears>
  );
};
