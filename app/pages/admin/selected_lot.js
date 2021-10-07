/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { GoogleMaps } from 'components/form/Input';
import Card from 'components/card';
import {
  getPartnersApiMethod,
  getPartnerTypesApiMethod,
  deletePartnerApiMethod,
  addPartnerTypeMethod,
  deletePartnerTypekApiMethod,
} from 'lib/api/admin';
import { getPublicPropertiesApiMethod } from 'lib/api/customer';
import withAuth from 'lib/withAuth';
import {
  getAddress,
  getNbPieces,
  sortBySelectMap,
  getCardImg,
} from 'helpers/property';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
  closeModal: {
    position: 'absolute',
    top: 10,
    right: 10,
    cursor: 'pointer',
    padding: 10,
    zIndex: 10,
    '&:hover': {
      backgroundColor: '#bbd0ff',
      color: 'white',
    },
  },
}));

const PartnersDashboard = () => {
  const [state, setState] = useState([]);
  const [searchValue, setSearchValue] = useState('Île-de-France');

  const handleSelected = (id) => {
    console.log(id);
  };
  const reloadPartners = async ({ label } = {}) => {
    const loc = label ?? searchValue;
    const { list = {} } = await getPublicPropertiesApiMethod({
      loc,
      typeOfAnnonce: 'Vente',
    });
    if (list?.docs) setState(list.docs);
    setSearchValue(loc);
  };

  useEffect(() => {
    reloadPartners();
  }, []);
  console.log(state);
  return (
    <>
      <GoogleMaps
        name="loc"
        value={searchValue}
        onChange={reloadPartners}
        placeholder="Où cherchez-vous ?"
      />
      {state?.map(
        ({
          _id,
          pictures = [],
          city,
          price,
          postal,
          minPieces,
          maxPieces,
          dimensions,
        }) => (
          <Card
            key={_id}
            _id={_id}
            src={getCardImg(pictures?.[0])}
            address={getAddress({ city, postal })}
            description={getNbPieces(minPieces, maxPieces)}
            dimensions={dimensions}
            price={price}
            onClick={handleSelected}
          />
        )
      )}
    </>
  );
};
export default withAuth(PartnersDashboard, { adminRequired: true });
