import { Grid, Typography } from '@material-ui/core';
import { Btn, Input, Checkbox } from 'components';
import { Icon } from 'components/form';

export const SignIn = ({
  state = {},
  classes,
  onKeyPress,
  handleCheck,
  onChange,
  handleSignup,
  handleNextStep,
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
        value={state.email}
        onChange={onChange}
        onKeyPress={onKeyPress}
        label="Adresse e-mail"
        placeholder="Votre e-mail"
        name="email"
        type="email"
      />
    </Grid>
    <Grid container justify="center" className={classes.btnContainer}>
      <Grid item>
        <Btn text="Connexion / Inscription" onClick={handleNextStep} />
      </Grid>
    </Grid>
    <Grid container alignItems="center" className={classes.socialAuth}>
      <Icon type="facebook" />
      <Typography variant="body1">continuer avec Facebook</Typography>
    </Grid>
    <Grid container alignItems="center" className={classes.socialAuth}>
      <Icon type="instagram" />
      <Typography variant="body1">continuer avec Instagram</Typography>
    </Grid>
    <Grid container alignItems="center" className={classes.socialAuth}>
      <Icon type="google" />
      <Typography variant="body1">continuer avec Google</Typography>
    </Grid>
    <Grid container alignItems="center" className={classes.socialAuth}>
      <Icon type="apple" />
      <Typography variant="body1">continuer avec Apple</Typography>
    </Grid>
  </>
);
