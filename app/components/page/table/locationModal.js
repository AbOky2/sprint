import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Input,  Modal } from 'components/form';
import {ucfirst, pick} from 'helpers/convertAndCheck'
import {requestNewLocation} from 'lib/api/customer'


const ReserveLocation = ({ user, curr, residenceName, handleClose }) => {
  const [state, setState] = useState(pick(user, ["lastName", "firstName", "email", "phone"]));
  const handleChange = (name) => ({ target: { value } }) => setState({ ...state, [name]: value });

  const placeholder = `Bonjour,

Je me permets de vous contacter car je suis intéressé(e) par la location de la chambre étudiante dont la référence est ${curr?.ref}, au sein de la résidence ${ucfirst(residenceName)}.

Je reste à votre entière disposition pour échanger avec vous et vous transmettre les éléments nécessaires à mon dossier, 
Vous pouvez me joindre sur mon portable au ${state.phone},

Bien cordialement,
${ucfirst(state.firstName)}
  `

  // eslint-disable-next-line no-return-assign
  const handleSumbit = async () => {
    const {message = placeholder, ...updateUser} = state;
    await requestNewLocation({message, updateUser})
  };

  return (
    <div>
      <Modal
        openModal={curr}
        onClose={handleClose}
        onClick={handleSumbit}
        title="Votre demande pour une location"
        confirmText="Envoyer"
      >
        <Grid container item justify="center" className="form-container">
          <Grid container item>
            <Input
              value={state.lastName}
              label="Nom*"
              onChange={handleChange}
              name="lastName"
              position="left"
            />
            <Input
              value={state.firstName}
              label="Prénom*"
              onChange={handleChange}
              name="firstName"
              position="right"
            />
            <Input
              value={state.email}
              label="E-mail*"
              onChange={handleChange}
              name="email"
              type="email"
              position="left"
            />
            <Input
              value={state.phone}
              label="Téléphone"
              onChange={handleChange}
              name="phone"
              type="phone"
              position="right"
            />
            <Input
              value={state.message}
              label="Message"
              onChange={handleChange}
              name="message"
              type="textarea"
              placeholder={placeholder}
            />
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};
export default ReserveLocation;
