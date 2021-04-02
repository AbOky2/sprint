import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AdminContentWrapper } from '../../components/wrapper';
import { ucfirst } from '../../helpers/convertAndCheck';
import withAuth from '../../lib/withAuth';
import FirstDivider from '../../static/img/first_divider.svg';
import SecondDivider from '../../static/img/second_divider.svg';
import { Btn, Input, Icon } from '../../components/form';
import { addSponsorshipApiMethod } from '../../lib/api/customer';

const useStyles = makeStyles((theme) => ({
  tutorialConainer: {
    background: '#F0F3F9',
    boxShadow: '0px 4px 20px rgba(24, 55, 50, 0.04)',
    borderRadius: '25px',
    marginTop: '3.2rem',
    padding: '4rem',
    '& > div > div > div': {
      height: '100px',
      width: '100px',
      borderRadius: '100%',
      margin: 'auto',
      background: '#f4f5f7',
      boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
    },
    '& > p': {
      margin: '.8rem 0 4.2rem',
    },
    '& h3': {
      margin: '2.4rem 0 .8rem',
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
    '& > h3': {
      marginBottom: '2rem',
    },
    '& > div:last-of-type': {
      marginTop: '1.6rem',
      '& > div': {
        [theme.breakpoints.down('sm')]: {
          margin: 'auto',
        },
      },
    },
  },
}));
const PartnershipPrice = 400;
const PartnerPage = ({ user }) => {
  const [state, setState] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const handleChange = (name) => ({ target: { value } }) =>
    setState({ ...state, [name]: value });
  const handleSubmit = async () => {
    // if (!state.email || !state.firstName || !state.lastName || !state.phone)
    //   return;
    try {
      await addSponsorshipApiMethod(state);
      toast.success('Envoyé');
    } catch (err) {}
  };
  const classes = useStyles();

  return (
    <AdminContentWrapper noRedirect>
      <Typography variant="h1">Parrainer l’un de vos proches</Typography>
      <div className={classes.tutorialConainer}>
        <Typography variant="h2">
          {`Faites découvrir Kit le nid à vos proches et recevez
          ${PartnershipPrice}€`}
        </Typography>
        <Typography>
          Aidez vos proches à concrétiser leur projet immobilier. Votre code
          parrain : <strong>{user?.slug}</strong>
        </Typography>
        <Grid container item justify="center">
          <Grid item md={2} className="text-center">
            <Grid container justify="center" alignItems="center">
              <Icon type="addUser" color="iconBlue" size="large" />
            </Grid>
            <Typography variant="h3">Etape 1</Typography>
            <Typography>
              Renseignez les coordonnées de votre contact ci-dessous.
            </Typography>
          </Grid>
          <Grid item md={2}>
            <FirstDivider />
          </Grid>
          <Grid item md={2} className="text-center">
            <Grid container justify="center" alignItems="center">
              <Icon type="phone" color="iconBlue" size="large" />
            </Grid>
            <Typography variant="h3">Etape 2</Typography>
            <Typography>
              Nous prenons contact avec lui pour lui présenter nos offres.
            </Typography>
          </Grid>
          <Grid item md={2}>
            <SecondDivider />
          </Grid>
          <Grid item md={2} className="text-center">
            <Grid container justify="center" alignItems="center">
              <Icon type="pen" color="iconBlue" size="big" />
            </Grid>
            <Typography variant="h3">Etape 3</Typography>
            <Typography>
              {`Dès sa signature chez le notaire, vous percevrez
              ${PartnershipPrice}€ par virement.`}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className={classes.formContainer}>
        <Typography variant="h3">
          Invitez vos proches dès maintenant :
        </Typography>
        <Grid container item justify="center">
          <Input
            label="Prénom*"
            onChange={handleChange}
            name="firstName"
            position="left"
          />
          <Input
            label="Nom*"
            onChange={handleChange}
            name="lastName"
            position="right"
          />
          <Input
            label="E-mail*"
            onChange={handleChange}
            name="email"
            type="email"
            position="left"
          />
          <Input
            label="Téléphone"
            onChange={handleChange}
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
