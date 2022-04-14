import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Slide from '@mui/material/Slide';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { propertyPiecesSelectMap } from 'helpers';
import { DropdownSelect } from 'components/form/Select';
import { toggleArray, isArray } from 'helpers';
import { Icon } from 'components';

export const PieceStep = withStyles()(
  ({
    list,
    value,
    classes,
    setStep,
    position,
    onChange,
    queryData,
    showSearch,
    placeholder,
    handleChange,
    handleSelect,
    handleNextStep,
  }) => {
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const containerRef = React.useRef(null);

    const [selected, setSelected] = useState(
      (isArray(value) ? value : [value]).filter((e) => e?.length)
    );
    const handleSubmit = () => {
      const _value = parseFloat(checked);
      // console.log({ value, handleChange, handleNextStep });
      if (handleChange && handleNextStep) {
        handleChange({ name: 'pieces', value: _value });
        handleNextStep();
      }
    };

    const handleSelected = (value) => {
      const values = toggleArray(selected, value);

      setSelected(values);
      onChange(values);
    };

    return (
      <Slide direction="up" in={showSearch} container={containerRef.current}>
        <div
          style={{
            background:
              'linear-gradient(219.21deg, #C399DB -0.38%, #5882F7 106.68%)',
            paddingTop: '50px',
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
              <Grid item md={position ? 6 : 12} xs={12}>
                <input
                  value={selected.join(' - ')}
                  placeholder={placeholder}
                  disabled
                />
                <span />
                <Icon type="sliderArrow" size="tiny" color="newGray" />
                <Grid container>
                  {list?.map((elem) => (
                    <Grid
                      container
                      item
                      key={elem.name}
                      md={6}
                      alignItems="center"
                      className="pointer"
                      onClick={() => handleSelected(elem.value + '')}
                    >
                      <Checkbox
                        color="primary"
                        checked={selected.includes(elem.value + '')}
                      />
                      <Typography variant="body2">{elem.name}</Typography>
                    </Grid>
                  ))}
                </Grid>

                <Grid item md={4}>
                  <DropdownSelect
                    name="typeOfAnnonce"
                    placeholder="Nombre de pièces"
                    list={propertyPiecesSelectMap}
                    value={queryData}
                    onChange={handleSelect}
                  />
                </Grid>
              </Grid>
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

PieceStep.PropTypes = {
  classes: PropTypes.object,
  isLocation: PropTypes.bool.isRequired,
  isMapsView: PropTypes.bool.isRequired,
  isMdView: PropTypes.bool.isRequired,
  queryData: PropTypes.object.isRequired,
  toggleView: PropTypes.func.isRequired,
  handleMapSearch: PropTypes.func.isRequired,
  handleBudget: PropTypes.func.isRequired,
  handleSumit: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};
