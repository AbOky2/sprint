/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback, useEffect } from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreatableSelect from 'react-select/creatable';
import { AdminContentWrapper } from '../../components/wrapper';
import { Modal, Icon } from '../../components/form';

// import { ReactComponent as LotsIcon } from 'assets/img/svg/partners.svg';
// import { ReactComponent as AddIcon } from 'assets/img/svg/add.svg';
import {
  getPartnersApiMethod,
  getPartnerTypesApiMethod,
  deletePartnerApiMethod,
  addPartnerTypeMethod,
} from '../../lib/api/admin';
import withAuth from '../../lib/withAuth';
import { partnerTypeListKeys, partnerTypes } from '../../helpers/partner';
import PartnerModal from '../../components/admin/partnerModal';

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

function ListCard({ data }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <img className={classes.media} src={data?.picture} title="Contemplative Reptile" alt="" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className="auto">{partnerTypes[data.type]}</div>
      </CardActions>
    </Card>
  );
}
const defaultAddNew = {
  _id: null,
  picture: null,
  name: 'aaaa-',
  description: 'bbbb',
  link: 'cccc',
  position: 5,
};
const noFilter = null;
const PartnersDashboard = () => {
  const [filter, setFilter] = useState(noFilter);
  const [partners, setPartners] = useState([]);
  const [partnerTypesList, setPartnerTypesList] = useState([]);
  const [state, setState] = useState({
    openModal: false,
    editElement: {},
  });

  const handleChange = useCallback((name, value) => setState({ ...state, [name]: value }), [
    state,
    setState,
  ]);
  const toggleState = (name) => handleChange(name, !state[name]);
  const resetState = useCallback(
    () =>
      setState({ ...state, openModal: false, filter: noFilter, ...defaultAddNew, editElement: {} }),
    [state, setState],
  );
  const handleClose = () => resetState();
  const handleActiveFilter = useCallback((name) => setFilter(name), [setFilter]);
  const onClick = () => toggleState('openModal');
  const reloadPartners = useCallback(async () => {
    const { list } = await getPartnersApiMethod();
    setPartners(list);
    const tmp = await getPartnerTypesApiMethod();
    setPartnerTypesList(tmp?.list.map(({ name }) => ({ name, label: name })));

    resetState();
  }, [resetState, setPartners]);
  const handleEditSelect = (id) => {
    setState({ openModal: true, editElement: partners.find((e) => e._id === id) });
  };
  const handleDelete = async (id) => {
    await deletePartnerApiMethod(id);
    reloadPartners();
  };
  useEffect(() => {
    reloadPartners();
  }, []);
  const filteredList = filter
    ? partners.filter((elem) => {
        return elem.type === filter;
      })
    : partners;
  const classes = useStyles();
  const handleCustomSelectCreate = async (value) => {
    // eslint-disable-next-line no-underscore-dangle
    if (value?.__isNew__) {
      const { list } = await addPartnerTypeMethod(value.value);
      if (list?.length) {
        setPartnerTypesList(list.map(({ name }) => ({ name, label: name })));
      }
    }
  };
  return (
    <>
      <Modal
        openModal={state.openModal}
        onClose={handleClose}
        onClick={onClick}
        showActions={false}
      >
        <Grid container item xs={12} justify="flex-start">
          <PartnerModal
            current={state.editElement}
            handleSubmit={reloadPartners}
            handleClose={handleClose}
            handleCustomSelectCreate={handleCustomSelectCreate}
            selectDefaultOptions={partnerTypesList}
          />
        </Grid>
      </Modal>
      <Grid container alignItems="center" justify="flex-end">
        <Grid
          container
          item
          onClick={onClick}
          alignItems="center"
          justify="flex-end"
          className="submit pointer partner-add fitwidth"
        >
          <span className="header-icon">
            <Icon type="plus" size="small" />
          </span>
          <p>Ajouter</p>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container justify="center">
          <div onClick={() => handleActiveFilter(noFilter)} className="partner-filter">
            Tout
          </div>
          {partnerTypesList.map((elem) => (
            <div
              key={elem.name}
              onClick={() => handleActiveFilter(elem.name)}
              className={`partner-filter ${elem.name === filter ? 'active' : ''}`}
            >
              {elem.name}
            </div>
          ))}
        </Grid>
        <Grid container className="partner-card-list-container" justify="space-arround">
          {filteredList.map((elem) => (
            <Grid
              item
              key={elem._id}
              alignItems="center"
              md={4}
              onClick={() => handleEditSelect(elem._id)}
              className="partner-card-list relative"
            >
              <span
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(elem._id);
                }}
                className={classes.closeModal}
              >
                x
              </span>
              <ListCard data={elem} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* <ListMaker {...props} /> */}
    </>
  );
};
export default withAuth(PartnersDashboard, { adminRequired: true });
