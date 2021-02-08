import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AdminContentWrapper } from '../../components/wrapper';
import { ucfirst } from '../../helpers/convertAndCheck';
import withAuth from '../../lib/withAuth';
import FirstDivider from '../../static/img/first_divider.svg';
import SecondDivider from '../../static/img/second_divider.svg';
import { Btn, Input, Icon } from '../../components/form';

const useStyles = makeStyles({
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
      marginTop: '50px',
      transform: 'translateY(-75%)',
    },
  },
  formContainer: {
    marginTop: '3.8rem',
    padding: '4rem',
    backgroundColor: 'white',
    boxShadow: '0px 4px 13px rgb(0 0 0 / 10%), inset 0px -3px 10px rgb(149 149 149 / 20%)',
    borderRadius: 15,
    '& > h3': {
      marginBottom: '2rem',
    },
    '& > div:last-of-type': {
      marginTop: '1.6rem',
    },
  },
});

const PartnerPage = () => {
  const [state, setState] = useState({ email: '', firstName: '', lastName: '' });
  const handleChange = (name) => ({ target: { value } }) => setState({ ...state, [name]: value });

  const classes = useStyles();

  return (
    <AdminContentWrapper>
      <Typography variant="h1">Parrainer l’un de vos proches</Typography>
      <div className={classes.tutorialConainer}>
        <Typography variant="h2">
          Faites découvrir Kit le nid à vos proches et recevez 800€
        </Typography>
        <Typography>
          Aidez vos proches à concrétiser leur projet immobilier. Votre code parrain :
          <strong>FD32DJ</strong>
        </Typography>
        <Grid container item justify="center">
          <Grid item md={2} className="text-center">
            <Grid container justify="center" alignItems="center">
              <Icon type="addUser" color="lightBlue" size="large" />
            </Grid>
            <Typography variant="h3">Etapes 01</Typography>
            <Typography>Renseigner les coordonés de votre contact ci-dessous.</Typography>
          </Grid>
          <Grid item md={2}>
            <FirstDivider />
          </Grid>
          <Grid item md={2} className="text-center">
            <Grid container justify="center" alignItems="center">
              <Icon type="phone" color="lightBlue" size="large" />
            </Grid>
            <Typography variant="h3">Etapes 02</Typography>
            <Typography>Nous prenons contact avec lui pour lui présenter nos offres.</Typography>
          </Grid>
          <Grid item md={2}>
            <SecondDivider />
          </Grid>
          <Grid item md={2} className="text-center">
            <Grid container justify="center" alignItems="center">
              <Icon type="pen" color="lightBlue" size="big" />
            </Grid>
            <Typography variant="h3">Etapes 03</Typography>
            <Typography>
              Dès sa signature chez le notaire, vous percevrez 800€ par virement.
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className={classes.formContainer}>
        <Typography variant="h3">Inviter vos proches</Typography>
        <Grid container item justify="center">
          <Input label="Prénom*" onChange={handleChange} name="firstName" position="left" />
          <Input label="Nom*" onChange={handleChange} name="lastName" position="right" />
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
          <Btn text={`Parrainer ${ucfirst(state.firstName)}`} />
        </div>
      </div>
    </AdminContentWrapper>
  );
};

export default withAuth(PartnerPage);
