import React, { useState } from 'react';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import {
  getAddress,
  getNbPieces,
  getCardImg,
  spaceCurrency,
  singlePath,
} from 'helpers';

import { Icon } from 'components';
import useStyles from './styles';

export const Card = ({
  _id,
  title,
  src,
  address,
  description,
  dimensions,
  price,
  onClick,
  liked,
  showLikes = true,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <div style={{ backgroundImage: `url(${src})` }}>
          {showLikes && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClick(_id);
              }}
              className="pointer"
            >
              <Icon
                type="heart"
                size="medium"
                strokeColor={liked ? 'red' : 'newBlue'}
                color={liked ? 'red' : 'white'}
              />
            </span>
          )}
        </div>
      </div>
      <div>
        <Typography variant="h3">{title}</Typography>
        <Typography
          variant="body1"
          style={{ display: address ? 'block' : 'none' }}
        >
          {address}
        </Typography>
        <Typography variant="body1">{description}</Typography>
        <Typography variant="body1">{dimensions}</Typography>
        <Typography variant="body1">
          <span>à partir de</span>
          {` ${spaceCurrency(price)}€`}
        </Typography>
      </div>
    </div>
  );
};

export const MapsCard = ({
  _id,
  heading,
  city,
  postal,
  minPieces,
  maxPieces,
  pictures = [],
  typeOfAnnonce,
  ...mapsProps
}) => {
  const [state, setState] = useState(0);
  const classes = useStyles();
  const handleDoubleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setState(state < pictures.length - 1 ? state + 1 : 0);
  };
  const handlePrev = (e) => {
    e.stopPropagation();
    setState(state === 0 ? pictures.length - 1 : state - 1);
  };

  return (
    <div className={classes.mapsContainer}>
      <Link href={singlePath({ typeOfAnnonce, _id })}>
        <a>
          <Card
            {...mapsProps}
            title={heading}
            src={getCardImg(pictures[state])}
            address={getAddress({ city, postal })}
            description={getNbPieces(minPieces, maxPieces)}
            typeOfAnnonce={typeOfAnnonce}
          />
        </a>
      </Link>
      {pictures.length > 1 && (
        <>
          <span onClick={handlePrev} onDoubleClick={handleDoubleClick}>
            <Icon
              type="sliderArrow"
              size="small"
              color="iconBlue"
              rotate="180deg"
            />
          </span>
          <span onClick={handleNext} onDoubleClick={handleDoubleClick}>
            <Icon type="sliderArrow" size="small" color="iconBlue" />
          </span>
        </>
      )}
    </div>
  );
};
