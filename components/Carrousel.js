import React from 'react';
import Slider from 'react-slick';
import { Icon } from './form';

const Arrow = ({ className, style, onClick }) => (
  <div className={className} style={{ ...style }} onClick={onClick}>
    <Icon type="carrouselArrow" />
  </div>
);

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  nextArrow: <Arrow />,
  prevArrow: <Arrow />,
};
const Croussel = ({ list = [] }) => (
  <div>
    <Slider {...settings}>
      {list?.map((elem) => (
        <img key={elem} src={elem} />
      ))}
    </Slider>
  </div>
);
export default Croussel;
