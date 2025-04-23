import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';

interface SYearProps {
  $color: string;
}

const SYear = styled.span<SYearProps>`
  font-size: 200px;
  font-weight: bold;
  color: ${({ $color }) => $color};
`;

interface BigYearProps {
  color: string;
  year?: number;
}

export const BigYear: FC<BigYearProps> = ({ color, year }) => {
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
    <SYear ref={ref} $color={color} style={{ display: 'none' }}>
      {displayedYear}
    </SYear>
  );
};
