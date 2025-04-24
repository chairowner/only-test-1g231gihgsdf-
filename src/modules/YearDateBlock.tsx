import { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppSelector, useMediaQuery } from '../lib/hooks';
import { DateCircle, DateSelector, DateYears, YearBlockList } from '../components';
import { DateYearsInfo, YearInfo } from '../types';
import { Heading } from '../ui';

const SContainer = styled.div<{ $borderColor: string; $tablet: string; $mobile: string }>`
  position: relative;
  height: 1080px;
  border-left: 1px solid ${(props) => props.$borderColor};
  border-right: 1px solid ${(props) => props.$borderColor};
  margin: 0 160px 0 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  @media (max-width: ${({ $tablet }) => $tablet}) {
    margin: 0 40px 0 80px;
  }

  @media (max-width: ${({ $mobile }) => $mobile}) {
    height: 100vh;
    margin: 0 20px;
    border: none;
  }
`;
const SCircleCss = css<{ $primary: string }>`
  &::after,
  &::before {
    content: '';
    display: block;
    position: absolute;
    border: 1px solid ${({ $primary }) => $primary};
  }

  &::before {
    height: 250vh;
  }

  &::after {
    width: 250vw;
  }
`;
const SDateCircle = styled.div<{ $primary: string; $isDesktop: boolean }>`
  position: ${({ $isDesktop }) => ($isDesktop ? 'absolute' : 'initial')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $isDesktop }) => ($isDesktop ? 'fit-content' : '100%')};
  height: fit-content;
  top: 215px;

  ${({ $isDesktop }) => $isDesktop && SCircleCss}
`;
const SDateCircleWrapper = styled.div<{ $isMobile: boolean }>`
  position: ${({ $isMobile }) => ($isMobile ? 'initial' : 'absolute')};
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: ${({ $isMobile }) => ($isMobile ? 'space-between' : 'center')};
  align-items: center;
`;

const SDateSelectorWrapper = styled.div<{ $isMobile: boolean }>`
  margin: ${({ $isMobile }) => ($isMobile ? ' 0' : '31px 80px')};
  width: fit-content;
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      position: relative;
      top: 50px;
      order: 1;
    `};
`;

const SDates = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  padding-bottom: ${({ $isMobile }) => ($isMobile ? '13px' : '100px')};
`;

const STop = styled.div<{ $isMobile: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          padding-top: 59px;
          order: -1;
        `
      : css`
          padding-top: 170px;
        `}
`;

const SHR = styled.div<{ $primary: string }>`
  width: 100%;
  height: 1px;
  background-color: ${({ $primary }) => $primary};
  margin-bottom: 20px;
`;

const SFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  b {
    font-size: 18px;
    font-weight: bold;
  }
`;

const SAnimatedTitle = styled.b<{ $visible: boolean }>`
  display: block;
  font-size: 18px;
  font-weight: bold;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '10px')});
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
`;

interface YearDateBlockProps {
  initialState: DateYearsInfo[];
}

export const YearDateBlock: FC<YearDateBlockProps> = ({ initialState }) => {
  const { primary10, primary20 } = useAppSelector((state) => state.theme);
  const adaptive = useAppSelector((state) => state.adaptive);

  const [dateYears, setDateYears] = useState<DateYearsInfo[]>(initialState);

  const years: YearInfo[] = dateYears.find((date) => date.selected)?.years || [];
  const isMobile: boolean = useMediaQuery(`(max-width: ${adaptive.$mobile})`);

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
    <SContainer $borderColor={primary10} $mobile={adaptive.$mobile} $tablet={adaptive.$tablet}>
      <SDateCircleWrapper $isMobile={isMobile}>
        <SDateCircle $primary={primary10} $isDesktop={!isMobile}>
          <DateYears style={{ position: isMobile ? 'relative' : 'absolute' }} years={years} />
          {!isMobile && <DateCircle dateYears={dateYears} changeDate={changeDate} />}
        </SDateCircle>
      </SDateCircleWrapper>
      <STop $isMobile={isMobile}>
        <Heading title="Исторические даты" />
      </STop>
      <SDates $isMobile={isMobile}>
        {isMobile && (
          <SFlexColumn>
            <b>{dateYears.find((date) => date.selected)?.title}</b>
            <SHR $primary={primary20} />
          </SFlexColumn>
        )}
        <SDateSelectorWrapper $isMobile={isMobile}>
          <DateSelector dateYears={dateYears} changeDate={changeDate} />
        </SDateSelectorWrapper>
        <YearBlockList years={years} />
      </SDates>
    </SContainer>
  );
};
