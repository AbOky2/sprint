import { Grid, Typography } from '@material-ui/core';
import { Btn, Input, Checkbox } from 'components';

export const Confirm = ({
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
        onChange={onChange}
        onKeyPress={onKeyPress}
        label="Mot de passe*"
        value={values.password}
        name="password"
        type="password"
        placeholder="Mot de passe"
        position="right"
      />
    </Grid>
    <Grid container alignItems="center" className={classes.checkBoxContainer}>
      <Checkbox
        bordered
        cornered
        label="J'accepte les conditions générales"
        onChange={handleCgtCheck}
      />
      <Checkbox
        bordered
        cornered
        label="En envoyant ma demande, j'accepte que le groupe Nexity exploite mes données personnelles dans le cadre de ma demande de contact et de la relation commerciale qui pourrait en découler."
        onChange={handleCheck}
      />
      <Typography>
        Vous avez la possibilité de modifier votre consentement, d'exercer vos
        droits pour accéder, rectifier, effacer vos données, limiter leurs
        traitements, vous y opposer et demander la portabilité de celle-ci. Pour
        cela vous pouvez consulter sur ce lien notre{' '}
        <a href="" target="_blank">
          Charte de protection des données à caractère personnel.
        </a>
      </Typography>
    </Grid>
    <Grid container justify="center" className={classes.btnContainer}>
      <Grid item>
        <Btn text="Continuer" onClick={handleSignup} />
      </Grid>
    </Grid>
  </>
);
