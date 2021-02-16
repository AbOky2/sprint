import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Icon } from './form';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
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

function SwipeableTextMobileStepper({ list = [] }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = list.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {list.map((path, index) => (
          <div key={path}>
            {Math.abs(activeStep - index) <= 2 ? (
              <div
                className={classes.img}
                style={{
                  backgroundImage: `url(${path})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'black',
                }}
                alt=""
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            {theme.direction === 'rtl' ? (
              <Icon type="carrouselArrow" color="white" />
            ) : (
              <Icon type="carrouselArrow" color="white" />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <Icon type="carrouselArrow" color="white" />
            ) : (
              <Icon type="carrouselArrow" color="white" />
            )}
          </Button>
        }
      />
    </div>
  );
}

export default SwipeableTextMobileStepper;
