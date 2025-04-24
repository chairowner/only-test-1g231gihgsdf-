import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { useAppSelector } from '../lib/hooks';

const SYear = styled.span<{
  $color: string;
  $tablet: string;
  $mobile: string;
}>`
  font-size: 200px;
  font-weight: bold;
  color: ${({ $color }) => $color};

  @media (max-width: ${({ $tablet }) => $tablet}) {
    font-size: 120px;
  }

  @media (max-width: ${({ $mobile }) => $mobile}) {
    font-size: 56px;
  }
`;

interface BigYearProps {
  color: string;
  year?: number;
}

export const BigYear: FC<BigYearProps> = ({ color, year }) => {
  const adaptive = useAppSelector((state) => state.adaptive);

  const [displayedYear, setDisplayedYear] = useState(year ?? 0);
  const yearRef = useRef<number | undefined>(year ?? 0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (year === undefined) return;

    const animateObj = { value: yearRef.current ?? 0 };

    gsap.to(animateObj, {
      value: year,
      duration: 1,
      ease: 'power1.out',
      onUpdate: () => {
        setDisplayedYear(Math.floor(animateObj.value));
      },
      onComplete: () => {
        yearRef.current = year;
        ref.current.style.display = ref.current != undefined && year === 0 ? 'none' : 'block';
      },
      onStart: () => {
        if (ref.current != undefined && ref.current.style.display === 'none') {
          ref.current.style.display = 'block';
        }
      },
    });
  }, [year]);

  return (
    <SYear
      ref={ref}
      $color={color}
      $tablet={adaptive.$tablet}
      $mobile={adaptive.$mobile}
      style={{ display: 'none' }}
    >
      {displayedYear}
    </SYear>
  );
};
