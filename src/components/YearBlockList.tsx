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
import { useAppSelector, useMediaQuery } from '../lib/hooks';

interface YearBlockListProps {
  years: YearInfo[];
}

const SWrapper = styled.div<{
  $primary: string;
  $accent: string;
  $accent10: string;
  $light: string;
  $mobile: string;
}>`
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

  .swiper-pagination-bullet {
    background-color: ${({ $primary }) => $primary};
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

  @media (max-width: ${({ $mobile }) => $mobile}) {
    .swiper {
      margin: initial;
    }

    .swiper-slide {
      width: 166px !important;
      height: 105px !important;
    }

    .swiper-pagination {
      bottom: -94px !important;
    }
  }
`;

export const YearBlockList: FC<YearBlockListProps> = ({ years }) => {
  const { primary, accent, accent10, light } = useAppSelector((state) => state.theme);
  const adaptive = useAppSelector((state) => state.adaptive);
  const isMobile: boolean = useMediaQuery(`(max-width: ${adaptive.$mobile})`);
  let modules = [FreeMode, Mousewheel, Keyboard];
  if (isMobile) {
    modules.push(Pagination);
  } else {
    modules.push(Navigation);
  }

  return (
    <SWrapper
      $primary={primary}
      $accent={accent}
      $accent10={accent10}
      $light={light}
      $mobile={adaptive.$mobile}
    >
      {!isMobile && <button className="swiper-button-prev" id="sl1-sbp" />}
      <Swiper
        spaceBetween={isMobile ? 25 : 80}
        slidesPerView={3}
        freeMode={true}
        mousewheel={true}
        keyboard={{ enabled: true }}
        pagination={isMobile && { clickable: true, el: '.swiper-pagination' }}
        navigation={
          !isMobile && {
            prevEl: '#sl1-sbp',
            nextEl: '#sl1-sbn',
          }
        }
        modules={modules}
      >
        {years.map((year) => (
          <SwiperSlide key={`year-${year.year}`}>
            <YearBlock {...year} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination"></div>
      {!isMobile && <button className="swiper-button-next" id="sl1-sbn" />}
    </SWrapper>
  );
};
