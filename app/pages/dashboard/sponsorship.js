import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AdminContentWrapper } from 'components/wrapper';
import { ucfirst, cleanAlert } from 'helpers';
import withAuth from 'lib/withAuth';
import { Btn, Input, Icon } from 'components';
import { addSponsorshipApiMethod } from 'lib/api/customer';
import FirstDivider from '../../static/img/first_divider.svg';
import SecondDivider from '../../static/img/second_divider.svg';

const useStyles = makeStyles((theme) => ({
  tutorialConainer: {
    background: '#F0F3F9',
    borderRadius: '25px',
    marginTop: '2.3rem',
    padding: '2.2rem 4rem 4rem',
    '& > div > div > div': {
      height: '100px',
      width: '100px',
      borderRadius: '100%',
      margin: 'auto',
      background: theme.palette.hoverGray,
      boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
    },
    '& > p': {
      margin: '.8rem 0 5rem',
    },
    '& h3': {
      margin: '2.4rem 0 2.2rem',
      textAlign: 'center',
    },
    '& > div > div > svg': {
      display: 'block',
      width: '100%',
      marginTop: '5rem',
      transform: 'translateY(-75%)',
      [theme.breakpoints.down('sm')]: {
        opacity: 0,
        marginTop: '3rem',
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: '2rem',
    },
  },
  formContainer: {
    marginTop: '3.8rem',
    padding: '4rem',
    backgroundColor: 'white',
    boxShadow:
      '0px 4px 13px rgb(0 0 0 / 10%), inset 0px -3px 10px rgb(149 149 149 / 20%)',
    borderRadius: 15,
    '& > div': {
      '& > div': {
        marginTop: '.5rem',
      },
      '&:last-of-type': {
        marginTop: '3.2rem',
        '& > div': {
          [theme.breakpoints.down('sm')]: {
            margin: 'auto',
          },
        },
      },
    },
  },
  subtitle: {
    color: theme.palette.newGray,
  },
}));
const PartnershipPrice = 800;
const PartnerPage = ({ user }) => {
  const [state, setState] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const handleChange = (name) => ({ target: { value } }) =>
    setState({ ...state, [name]: value });
  const onKeyPress = (e) => e.key === 'Enter' && handleSubmit();
  const handleSubmit = async () => {
    try {
      const res = await addSponsorshipApiMethod(state);
      if (res?.user) cleanAlert('Envoyé', 'success');
    } catch (err) {}
  };

  const classes = useStyles();

  return (
    <AdminContentWrapper noRedirect mobilePadding>
      <Typography variant="h1">Parrainez l’un de vos proches</Typography>
      <div className={classes.tutorialConainer}>
        <Typography variant="h2">
          {`Recevez ${PartnershipPrice}€ dès qu’ils effectuent leur achat`}
        </Typography>
        <Typography>
          Aidez vos proches à concrétiser leur projet immobilier à l’aide de
          votre code parrain : <strong>{user?.slug}</strong>
          <br />
          Ils pourront l’utiliser au moment de leur inscription sur Kit le nid.
        </Typography>
        <Grid container item justify="center">
          <Grid item sm={12} md={2} className="text-center">
            <Grid container justify="center" alignItems="center">
              <Icon type="addUser" color="iconBlue" size="large" />
            </Grid>
            <Typography variant="h3">Etape 1</Typography>
            <Typography className={classes.subtitle}>
              Renseignez les coordonnées de votre contact ci-dessous.
            </Typography>
          </Grid>
          <Grid item sm={12} md={2}>
            <FirstDivider />
          </Grid>
          <Grid item sm={12} md={2} className="text-center">
            <Grid container justify="center" alignItems="center">
              <Icon type="phone" color="iconBlue" size="large" />
            </Grid>
            <Typography variant="h3">Etape 2</Typography>
            <Typography className={classes.subtitle}>
              Nous prenons contact avec lui par téléphone pour lui présenter nos
              offres.
            </Typography>
          </Grid>
          <Grid item sm={12} md={2}>
            <SecondDivider />
          </Grid>
          <Grid item sm={12} md={2} className="text-center">
            <Grid container justify="center" alignItems="center">
              <Icon type="pen" color="iconBlue" size="big" />
            </Grid>
            <Typography variant="h3">Etape 3</Typography>
            <Typography className={classes.subtitle}>
              {`Dès sa signature chez le notaire, vous percevrez
              ${PartnershipPrice}€ par virement.`}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className={classes.formContainer}>
        <Typography variant="h2">Invitez vos proches</Typography>
        <Grid container item justify="center">
          <Input
            label="Nom"
            placeholder="Son nom"
            onChange={handleChange}
            onKeyPress={onKeyPress}
            name="lastName"
            position="left"
          />
          <Input
            label="Prénom"
            placeholder="Son prénom"
            onChange={handleChange}
            onKeyPress={onKeyPress}
            name="firstName"
            position="right"
          />
          <Input
            label="E-mail"
            placeholder="Son e-mail"
            onChange={handleChange}
            onKeyPress={onKeyPress}
            name="email"
            type="email"
            position="left"
          />
          <Input
            label="Téléphone"
            placeholder="Son numéro de téléphone"
            onChange={handleChange}
            onKeyPress={onKeyPress}
            name="phone"
            type="phone"
            position="right"
          />
        </Grid>
        <div>
          <Btn
            text={`Parrainer ${ucfirst(state.firstName)}`}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </AdminContentWrapper>
  );
};

export default withAuth(PartnerPage);
