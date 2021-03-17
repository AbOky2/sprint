import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { addPartnerApiMethod, updatePartnerApiMethod } from '../../../lib/api/admin';

import First from './first';
import Second from './second';
import Third from './third';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relatve',
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  closeModal: {
    position: 'sticky',
    cursor: 'pointer',
    padding: 10,
    zIndex: 10,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#bbd0ff',
      color: 'white',
    },
  },
}));

const getSteps = () => ['Information', 'Autre', 'Contenu'];

export default function HorizontalLabelPositionBelowStepper({
  current = {},
  handleSubmit,
  handleClose,
  handleCustomSelectCreate,
  selectDefaultOptions,
}) {
  const classes = useStyles();
  const [state, setState] = useState(current);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleReset = () => setActiveStep(0);
  const handleChange = useCallback((name) => (value) => setState({ ...state, [name]: value }), [
    state,
    setState,
  ]);
  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      let data;
      if (state?._id) {
        const { _id, ...form } = state;
        data = await updatePartnerApiMethod(_id, form);
      } else data = await addPartnerApiMethod(state);
      handleSubmit(data.list);
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <First onChange={handleChange} values={state} />;
      case 1:
        return (
          <Second
            onChange={handleChange}
            values={state}
            selectDefaultOptions={selectDefaultOptions}
            handleCustomSelectCreate={handleCustomSelectCreate}
          />
        );
      case 2:
        return <Third onChange={handleChange} values={state} />;
      default:
        return 'Unknown stepIndex';
    }
  };
  useEffect(() => {
    setState(current);
  }, [current]);

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div className="text-center">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Precedent
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Fin' : 'Suivant'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
