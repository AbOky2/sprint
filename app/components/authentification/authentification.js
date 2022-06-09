import React, { useState } from 'react';
import { SignIn } from './signIn';
import { Information } from './information';
import { Confirm } from './confirm';
import useStyles from './style';
import { connect } from 'react-redux';
import { getUserByEmail } from '../../lib/api/public';
import { cleanAlert, Buyer } from '../../helpers';
import { userActions } from '../../../app/redux/_actions';
import withAuth from '../../lib/withAuth';

const compList = [SignIn, Information, Confirm];

export const Authentification = ({
  setChangeName,
  login,
  register,
  authSocialMedia,
  redirect,
}) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    role: Buyer,
  });
  const [step, setStep] = useState(0);
  const [cgtChecked, setCgtChecked] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleCheck = (checked) => setChecked(checked);
  const handleCgtCheck = (checked) => setCgtChecked(checked);
  const [invokePasswordInput, setInvokePasswordInput] = useState(false);

  const onChange =
    (name) =>
    ({ target: { value } }) =>
      setState({ ...state, [name]: value });

  const handleSignup = () => {
    let data = { ...state };
    if (
      ((!data.email ||
        !data.firstName ||
        !data.lastName ||
        !data.role ||
        !data.phone) &&
        step == 1) ||
      ((!data.email ||
        !data.firstName ||
        !data.lastName ||
        !data.password ||
        !data.role ||
        !data.phone) &&
        step == 2)
    ) {
      cleanAlert('Veuillez remplir les champs obligatoires');
      return;
    }

    if (step == 2 && !cgtChecked) {
      cleanAlert('Veuillez accepter les conditions générales');
      return;
    }
    step == 1 ? handleNextStep() : console.log('signup');
    if (step == 2) {
      register(data);
    }
  };
  const handleSignIn = () => {
    console.log('signIn');
    delete state.role;
    login(state, redirect);
  };
  const handleNextStep = () => {
    if (step < compList.length) {
      setStep(step + 1);
      setChangeName(true);
    } else handleSignup();
    // newStep < compList.length  ? setStep(step + 1) : handleSignup();
  };

  const handleLogin = async (socialData) => {
    var provider = 'google';
    var token;
    if (socialData.graphDomain && socialData.graphDomain === 'facebook') {
      provider = 'facebook';
      token = socialData.accessToken;
    } else token = socialData.tokenId;

    authSocialMedia({ provider: provider, token: token }, redirect);
  };

  const handleCheckEmailExist = () => {
    let data = { ...state };
    if (!data.email)
      return cleanAlert('Veuillez remplir les champs obligatoires');
    getUserByEmail(data)
      .then((response) =>
        response.userExist ? setInvokePasswordInput(true) : handleNextStep()
      )
      .catch((err) => console.log(err));
  };
  const onKeyPress = (e) => e.key === 'Enter' && console.log('enter');

  const Component = compList[step];
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Component
        state={state}
        classes={classes}
        onKeyPress={onKeyPress}
        onChange={onChange}
        handleSignup={handleSignup}
        handleSignIn={handleSignIn}
        handleCheck={handleCheck}
        handleCgtCheck={handleCgtCheck}
        handleCheckEmailExist={handleCheckEmailExist}
        handleNextStep={handleNextStep}
        handleLogin={handleLogin}
        invokePasswordInput={invokePasswordInput}
      />
    </div>
  );
};
