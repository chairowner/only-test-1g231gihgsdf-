import { FC } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Keyboard, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { YearBlock } from '../ui';
import { YearInfo } from '../types';
import { useAppSelector } from '../lib/hooks';

interface YearBlockListProps {
  years: YearInfo[];
}

const SWrapper = styled.div<{ $accent: string; $accent10: string; $light: string }>`
  text-rendering: auto;
  position: relative;
  cursor: grab;
  height: 135px;

  &:active {
    cursor: grabbing;
  }

  .swiper {
    margin: 0 80px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    background-color: ${({ $light }) => $light};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0px 0px 10px ${({ $accent10 }) => $accent10};

    &.swiper-button-disabled {
      display: none;
    }

    &::after {
      color: ${({ $accent }) => $accent};
      font-size: 12px;
      font-weight: bold;
    }
  }
  .swiper-button-prev {
    left: 40px;
  }
  .swiper-button-next {
    right: 40px;
  }
`;

export const YearBlockList: FC<YearBlockListProps> = ({ years }) => {
  const { accent, accent10, light } = useAppSelector((state) => state.theme);

  return (
    <SWrapper $accent={accent} $accent10={accent10} $light={light}>
      <button className="swiper-button-prev" id="sl1-sbp" />
      <Swiper
        spaceBetween={80}
        slidesPerView={3}
        freeMode={true}
        mousewheel={true}
        keyboard={{ enabled: true }}
        navigation={{
          prevEl: '#sl1-sbp',
          nextEl: '#sl1-sbn',
        }}
        modules={[FreeMode, Mousewheel, Keyboard, Navigation]}
      >
        {years.map((year) => (
          <SwiperSlide key={`year-${year.year}`}>
            <YearBlock {...year} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-button-next" id="sl1-sbn" />
    </SWrapper>
  );
};
