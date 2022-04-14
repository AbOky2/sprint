import { useState } from 'react';
import { SignIn } from './signIn';
import { Information } from './information';
import { Confirm } from './confirm';
import useStyles from './style';

const compList = [SignIn, Information, Confirm];
export const Authentification = ({ setChangeName }) => {
  const [state, setState] = useState({});
  const [step, setStep] = useState(0);

  const onChange =
    (name) =>
    ({ target: { value } }) =>
      setState({ ...state, [name]: value });
  const handleSignup = () => {
    console.log('signup');
  };
  const handleNextStep = () => {
    if (step < compList.length) {
      setStep(step + 1);
      setChangeName(true);
    } else handleSignup();
    // newStep < compList.length  ? setStep(step + 1) : handleSignup();
  };
  const onKeyPress = (e) => e.key === 'Enter' && console.log('enter');

  const Component = compList[step];
  const classes = useStyles();
  console.log(state);
  return (
    <div className={classes.wrapper}>
      <Component
        state={state}
        classes={classes}
        onKeyPress={onKeyPress}
        onChange={onChange}
        handleSignup={handleSignup}
        handleNextStep={handleNextStep}
      />
    </div>
  );
};
