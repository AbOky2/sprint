import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { spaceCurrency } from '../helpers/convertAndCheck';
import { Icon } from './form';

const useStyles = makeStyles({
  container: {
    boxShadow: '0px 4.15441px 16.6176px rgba(0, 0, 0, 0.1)',
    borderRadius: 15,
    '& > div:last-of-type': {
      padding: 16,
    },
  },
  title: {
    color: '#4F80FF',
    height: '2.7rem',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  address: {
    marginBottom: 9,
    height: '2.4rem',
    lineHeight: '2.6rem',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: 'rgba(26, 46, 108, 0.5)',
  },
  description: {
    fontSize: '1.6rem',
    lineHeight: '2.6rem',
    color: 'rgba(26, 46, 108, 0.75)',
  },
  price: {
    color: '#1A2E6C',
    '& span': {
      fontSize: '1.6rem',
      lineHeight: '2.2rem',
      color: 'rgba(26, 46, 108, 0.5)',
    },
  },
  img: {
    position: 'relative',
    backgroundSize: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 200,
    '& span': {
      position: 'absolute',
      top: 24,
      left: 24,
      zIndex: 2,
    },
  },
});
const Card = ({ _id, title, src, address, description, dimensions, price, onClick, liked }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.img} style={{ backgroundImage: `url(${src})` }}>
        <span
          onClick={(e) => {
            e.preventDefault();
            onClick(_id);
          }}
          className="pointer"
        >
          <Icon type="heart" size="medium" color={liked ? 'red' : 'white'} />
        </span>
      </div>
      <div>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body1" className={classes.address}>
          {address}
        </Typography>
        <Typography variant="body1" className={classes.description}>
          {description}
        </Typography>
        <Typography variant="body1" className={classes.description}>
          {dimensions}
        </Typography>
        <Typography variant="body1" align="right" className={classes.price}>
          <span>à partir de</span>
          {` ${spaceCurrency(price)}€`}
        </Typography>
      </div>
    </div>
  );
};

export default Card;
