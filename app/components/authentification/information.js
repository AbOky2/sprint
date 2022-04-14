import { Grid, Typography } from '@material-ui/core';
import { Btn, Input, Checkbox } from 'components';
import { Icon } from 'components/form';

export const Information = ({
  values = {},
  classes,
  onKeyPress,
  handleCheck,
  onChange,
  handleSignup,
  handleCgtCheck,
}) => (
  <>
    <Grid
      container
      item
      justify="center"
      alignItems="center"
      className={classes.formContainer}
    >
      <Input
        label="Nom*"
        placeholder="Nom*"
        values={values.lastName}
        name="lastName"
        onChange={onChange}
      />
      <Input
        label="Prénom*"
        placeholder="Prénom*"
        values={values.firstName}
        name="firstName"
        onChange={onChange}
      />
      <Input
        label="Téléphone*"
        placeholder="Téléphone"
        values={values.phone}
        name="phone"
        type="phone"
        onChange={onChange}
      />
    </Grid>
    <Grid container justify="center" className={classes.btnContainer}>
      <Grid item>
        <Btn text="Continuer" onClick={handleSignup} />
      </Grid>
    </Grid>
  </>
);
