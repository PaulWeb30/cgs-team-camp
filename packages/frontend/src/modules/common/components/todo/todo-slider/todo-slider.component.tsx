import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import { TodoCard } from '../todo-card';
import { ITodo } from '../../../types/todo.types';

type ITodoSliderProps = {
  todos: ITodo[] | undefined;
};

export const TodoSlider = ({ todos }: ITodoSliderProps) => (
  <Swiper
    effect="coverflow"
    grabCursor
    centeredSlides
    slidesPerView="auto"
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
    {todos?.map((todo) => (
      <SwiperSlide key={todo.id}>
        <TodoCard todo={todo} />
      </SwiperSlide>
    ))}
  </Swiper>
);
