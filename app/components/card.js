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
    border: '1px solid #E2E2E2',
    borderRadius: 15,
    '& > div': {
      '&:first-of-type > div': {
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
      '&:last-of-type': {
        padding: 16,
        '& > h4': {
          color: theme.palette.newBlue,
          height: '2.7rem',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
        '& > p': {
          fontSize: '1.6rem',
          lineHeight: '2.6rem',
          color: 'rgba(26, 46, 108, 0.75)',
          '&:nth-child(2)': {
            marginBottom: 9,
            height: '2.4rem',
            lineHeight: '2.6rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            color: theme.palette.lighterGray,
          },
          '&:last-of-type': {
            color: theme.palette.primary,
            '& span': {
              fontSize: '1.6rem',
              lineHeight: '2.2rem',
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
          padding: '.8rem',
          '& > div': {
            height: 150,
            borderRadius: '.8rem',
          },
        },
        '&:last-of-type': {
          paddingTop: 0,
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
                e.preventDefault();
                onClick(_id);
              }}
              className="pointer"
            >
              <Icon
                type="heart"
                size="medium"
                color={liked ? 'red' : 'white'}
              />
            </span>
          )}
        </div>
      </div>
      <div>
        <Typography variant="h4">{title}</Typography>
        <Typography
          variant="body1"
          style={{ display: address ? 'block' : 'none' }}
        >
          {address}
        </Typography>
        <Typography variant="body1">{description}</Typography>
        <Typography variant="body1">{dimensions}</Typography>
        <Typography variant="body1" align="right">
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
  const handleNext = () => {
    setState(state < pictures.length - 1 ? state + 1 : 0);
  };
  const handlePrev = () => {
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
            showLikes={false}
            description={getNbPieces(minPieces, maxPieces)}
            typeOfAnnonce={typeOfAnnonce}
          />
        </a>
      </Link>
      {pictures.length > 1 && (
        <>
          <span onClick={() => handlePrev(_id)}>
            <Icon
              type="sliderArrow"
              size="small"
              color="iconBlue"
              rotate="180deg"
            />
          </span>
          <span onClick={() => handleNext(_id)}>
            <Icon type="sliderArrow" size="small" color="iconBlue" />
          </span>
        </>
      )}
    </div>
  );
};
export { MapsCard };

export default Card;
