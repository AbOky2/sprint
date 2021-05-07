import React, { useState } from 'react';
import Link from 'next/link';
import { singlePath } from 'helpers/query';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { spaceCurrency } from 'helpers/convertAndCheck';
import { getAddress, getNbPieces, getCardImg } from 'helpers/property';

import { Icon } from './form';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#FFFFFF',
    padding: '.8rem .85rem',
    border: '1px solid #E2E2E2',
    borderRadius: 15,
    '& > div': {
      '&:first-of-type > div': {
        position: 'relative',
        backgroundSize: 'cover',
        borderRadius: 10,
        height: 200,
        '& span': {
          position: 'absolute',
          top: '.8rem',
          right: '.8rem',
          zIndex: 2,
        },
      },
      '&:last-of-type': {
        padding: '.8rem 0 2.3rem',
        '& > h3': {
          fontWeight: 800,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
        '& > p': {
          color: 'rgba(26, 46, 108, 0.75)',
          '&:nth-child(2)': {
            marginBottom: '.9rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            color: theme.palette.lighterGray,
          },
          '&:nth-child(3)': {
            color: theme.palette.blue,
          },
          '&:last-of-type': {
            color: theme.palette.blue,
            '& span': {
              color: theme.palette.lighterGray,
            },
          },
        },
      },
    },
  },
  mapsContainer: {
    position: 'absolute',
    width: 200,
    zIndex: 7,
    top: 0,
    left: 0,
    transform: 'translate(-40%, calc(-100% - 1rem))',
    '& > a > div': {
      border: `1px solid ${theme.palette.lightGray}`,
      '& > div': {
        '&:first-of-type': {
          '& > div': {
            height: 150,
            borderRadius: '.8rem',
          },
        },
        '&:last-of-type': {
          '& p:last-of-type': {
            textAlign: 'left',
          },
        },
      },
    },
    '& > span': {
      position: 'absolute',
      top: 75,
      backgroundColor: 'white',
      borderRadius: '100%',
      padding: 5,
      '&:first-of-type': {
        left: 15,
      },
      '&:last-of-type': {
        right: 15,
      },
    },
  },
  mapsContainerBottomCard: {
    transform: 'translate(-40%, calc(15% - 1rem))',
  },
}));

const Card = ({
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

const MapsCard = ({
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
export { MapsCard };

export default Card;
