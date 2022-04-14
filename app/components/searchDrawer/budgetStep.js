import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect, useRef } from 'react';
import Slide from '@mui/material/Slide';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';

export const BudgetStep = withStyles()(
  ({
    classes,
    setStep,
    handleBudget,
    handleChange,
    handleNextStep,
    ...inputProps
  }) => {
    const [checked, setChecked] = useState(true);
    const [value, setValue] = useState(inputProps.value);
    const [state, setState] = useState({
      salary: '',
      contributtion: '',
    });
    const containerRef = useRef(null);
    const calc = (value) => {
      const s = state.salary.split(' ').join('');
      const c = state.contributtion.split(' ').join('');
      const v = value ? parseInt(value.split(' ').join(''), 10) : value;
      let val = v || parseInt(s, 10) * 83.33 + parseInt(c, 10);
      val = Math.trunc(val);
      setValue(val);
    };
    const onChange = ({ target: { value } }) => {
      calc(value);
      console.log({ value });
    };
    const handleSubmit = () => {
      const _value = parseFloat(value);
      // console.log({ value, handleChange, handleNextStep });
      if (!isNaN(_value) && handleChange && handleNextStep) {
        handleChange({ name: 'maxPrice', value: _value });
        handleNextStep();
      }
    };
    const onKeyPress = (e) => {
      if (e.key === 'Enter') handleSubmit();
    };
    const handleChange1 =
      (name) =>
      ({ target: { value } }) =>
        setState({ ...state, [name]: value });

    useEffect(() => {
      const { salary, contributtion } = state;

      if (salary && contributtion) calc();
      else setValue('');
    }, [state]);
    useEffect(() => setValue(inputProps.value), [inputProps.value]);

    return (
      <Slide direction="up" in={checked} container={containerRef.current}>
        <div
          style={{
            background:
              'linear-gradient(219.21deg, #C399DB -0.38%, #5882F7 106.68%)',
            paddingTop: '230px',
            borderRadius: '5px',
            width: '375px',
            alignContent: 'center',
          }}
        >
          <Box
            sx={{
              height: '524px',
              display: 'flex',
              flexDirection: 'column',
              top: '48px',
              padding: '24px',
              color: 'black',
              backgroundColor: 'white',
              borderTopLeftRadius: '22px',
              borderTopRightRadius: '22px',
            }}
          >
            <Box tabIndex={-1} sx={{ mt: 1, p: 1 }}>
              <div style={{ marginBottom: '20px', display: 'inline-flex' }}>
                {' '}
                Budget
                <button
                  style={{
                    marginBottom: '10px',
                    marginLeft: '216px',
                    background: 'white',
                    border: 'transparent',
                  }}
                  type="button"
                  onClick={() => setStep(1)}
                >
                  X
                </button>
              </div>
              <br />
              Votre Budget
              <NumberFormat
                style={{
                  border: '2px solid #EFF4FF',
                  width: '327px',
                  height: '42px',
                  borderRadius: '12px',
                  marginTop: '8px',
                }}
                thousandSeparator=" "
                suffix=" €"
                prefix="  "
                {...inputProps}
                value={value}
                placeholder="  Budget maximal"
                onChange={onChange}
                className={classes.container}
                onKeyPress={onKeyPress}
                autoComplete="off"
              />
              <br />
              <br />
              Votre salaire mensuel net (avant impôt)
              <br />
              <NumberFormat
                style={{
                  border: '2px solid #EFF4FF',
                  width: '327px',
                  height: '42px',
                  borderRadius: '12px',
                  marginTop: '8px',
                }}
                thousandSeparator=" "
                suffix=" €"
                prefix="   "
                value={state.salary}
                onChange={handleChange1('salary')}
                placeholder="  Votre salaire net mensuel"
              />
              <br />
              <br />
              Votre apport
              <br />
              <NumberFormat
                style={{
                  border: '2px solid #EFF4FF',
                  width: '327px',
                  height: '42px',
                  borderRadius: '12px',
                  marginTop: '8px',
                }}
                thousandSeparator=" "
                suffix=" €"
                prefix="    "
                value={state.contributtion}
                placeholder="  Votre apport personnel"
                onChange={handleChange1('contributtion')}
              />
              <button
                onClick={handleSubmit}
                className={classes.submit}
                type="submit"
                style={{
                  background:
                    'linear-gradient(180deg, #81A3F9 -0.06%, #3462D8 108.09%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  color: 'white',
                  fontWeight: 'bold',
                  width: '120px',
                  height: '2px',
                  borderRadius: '12px',
                  border: 'transparent',
                  flexDirection: 'row',
                  margin: '12px',
                  marginLeft: '210px',
                  placeItems: 'center',
                  position: 'static',
                  padding: '22px',
                }}
              >
                Valider
              </button>
            </Box>
          </Box>
        </div>
      </Slide>
    );
  }
);
