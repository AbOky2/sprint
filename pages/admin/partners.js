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
import { AdminContentWrapper } from '../../components/wrapper';
import { Modal, Icon } from '../../components/form';
// import { ReactComponent as LotsIcon } from 'assets/img/svg/partners.svg';
// import { ReactComponent as AddIcon } from 'assets/img/svg/add.svg';
import { getPartnersApiMethod, deletePartnerApiMethod } from '../../lib/api/admin';
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
        <CardMedia className={classes.media} image={data?.picture} title="Contemplative Reptile" />
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
const Header = ({ onClick }) => (
  <Grid container justify="space-between" alignItems="center">
    <Grid item>
      <Grid>
        <span className="header-icon">
          <Icon type="sponsorship" size="small" />
        </span>
        <h1>Offres partenaires</h1>
      </Grid>
    </Grid>
    <Grid item>
      <Grid onClick={onClick} className="submit pointer partner-add">
        <span className="header-icon">
          <Icon type="plus" size="small" />
        </span>
        <p>Ajouter</p>
      </Grid>
    </Grid>
  </Grid>
);

const noFilter = null;
const PartnersDashboard = () => {
  const [filter, setFilter] = useState(noFilter);
  const [partners, setPartners] = useState([]);
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
  const filteredList = filter ? partners.filter((elem) => elem.type === filter) : partners;
  const classes = useStyles();

  return (
    <>
      <AdminContentWrapper>
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
            />
            {/* <Input /> */}
          </Grid>
        </Modal>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className="spacing header"
        >
          <Grid item container xs={12} justify="flex-start">
            <Grid item container alignItems="center">
              <Header onClick={onClick} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid container justify="center">
            <div onClick={() => handleActiveFilter(noFilter)} className="partner-filter">
              Tout
            </div>
            {partnerTypeListKeys.map((elem) => (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <div
                key={elem}
                onClick={() => handleActiveFilter(elem)}
                className={`partner-filter ${elem === filter ? 'active' : ''}`}
              >
                {partnerTypes[elem]}
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
      </AdminContentWrapper>
      {/* <ListMaker {...props} /> */}
    </>
  );
};
export default withAuth(PartnersDashboard, { adminRequired: true });
