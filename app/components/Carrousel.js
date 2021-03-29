import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { NEXT_PUBLIC_UPLOAD_URL } from '../config';
import { Icon } from './form';

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: '2.5rem',
    overflow: 'hidden',
    width: '100%',
  },
  mapsContainer: {
    borderRadius: 0,
  },
  root: {
    '& > div': {
      borderRadius: '2.5rem',
    },
    '& > div:last-of-type': {
      transform: 'translateY(-50%)',
      position: 'absolute',
      width: '100%',
      top: '50%',
      color: 'transparent',
      backgroundColor: 'transparent',
    },
    '& > div:last-of-type > button:first-of-type': {
      transform: 'rotate(180deg)',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: 50,
    paddingLeft: theme.spacing(4),
  },
  img: {
    height: 450,
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 200,
    },
  },
}));
const SampleNextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      display: 'block',
      position: 'absolute',
      top: '50%',
      cursor: 'pointer',
      transform: 'translateY(-50%)',
      right: '1.6rem',
      zIndex: 3,
    }}
    onClick={onClick}
  >
    <Icon type="carrouselArrow" color="white" />
  </div>
);

const SamplePrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      display: 'block',
      position: 'absolute',
      top: '50%',
      cursor: 'pointer',
      transform: 'translateY(-50%) rotate(180deg)',
      left: '1.6rem',
      zIndex: 3,
    }}
    onClick={onClick}
  >
    <Icon type="carrouselArrow" color="white" />
  </div>
);

const settings = {
  infinite: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
const SingleCarousel = ({ list = [] }) => {
  const classes = useStyles();

  return (
    <Slider {...settings} className={classes.container}>
      {list.map((path) => (
        <div key={path}>
          <div
            className={classes.img}
            style={{
              backgroundImage: `url(${NEXT_PUBLIC_UPLOAD_URL + path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'black',
            }}
            alt=""
          />
        </div>
      ))}
    </Slider>
  );
};

const MapsCarousel = ({ index = 0, handleChange, children }) => {
  const classes = useStyles();
  const node = useRef();

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '15px',
    slidesToShow: 1,
    speed: 500,
    arrows: false,
    slickGoTo: index,
    afterChange: handleChange,
  };
  useEffect(() => node?.current?.slickGoTo(index), [index]);

  return (
    <Slider
      ref={node}
      {...settings}
      className={clsx(classes.container, classes.mapsContainer)}
    >
      {children}
    </Slider>
  );
};
export { MapsCarousel };
export default SingleCarousel;
