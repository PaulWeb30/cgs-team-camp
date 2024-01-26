import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ISwiper from 'swiper';
import { useSearchParams } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import { TodoCard } from '../todo-card';

import { useGetTodosInfiniteQuery } from '../../../../hooks/useInfinityTodo';

export const TodoSlider = () => {
  const [searchParams] = useSearchParams();
  const searchFilter = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'all';
  const pageFilter = searchParams.get('page') || '1';

  const { data, hasNextPage, fetchNextPage } = useGetTodosInfiniteQuery({
    page: pageFilter,
    status: statusFilter,
    search: searchFilter
  });

  const handleChange = (swiper: ISwiper) => {
    if (swiper.isEnd && hasNextPage) {
      return fetchNextPage();
    }
  };

  const todosDynamic = data?.pages.map((page) => page.todos).flat() || [];
  return (
    <div>
      {todosDynamic?.length ? (
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          onSlideChange={handleChange}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }}
          pagination
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {todosDynamic?.map((todo) => (
            <SwiperSlide key={todo.id}>
              <TodoCard todo={todo} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <h2>No todos found</h2>
      )}
    </div>
  );
};
