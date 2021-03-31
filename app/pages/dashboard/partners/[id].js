import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getPartnerApiMethod } from '../../../lib/api/customer';
import { AdminContentWrapper } from '../../../components/wrapper';
import { Btn } from '../../../components/form';
import withAuth from '../../../lib/withAuth';

const useStyles = makeStyles((theme) => ({
  coverContainer: {
    position: 'relative',
    '& div': {
      position: 'absolute',
      width: 150,
      height: 150,
      left: '50%',
      bottom: 0,
      transform: 'translate(-50%, 50%)',
      backgroundColor: 'white',
      borderRadius: 25,
      padding: 24,
      boxSizing: 'border-box',
      [theme.breakpoints.down('sm')]: {
        width: 125,
        height: 125,
      },
    },
    '& div img': {
      width: '100%',
    },
  },
  cover: {
    display: 'block',
    width: '100%',
  },
  partnerInfo: {
    paddingTop: '10rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '9rem',
    },
  },
  subtitle1: {
    margin: '10px 0 16px',
    color: '#594F70',
  },
  partnerContainer: {
    maxWidth: '600px',
    margin: 'auto',
    wordBreak: 'break-all',
    '& > div:first-of-type': {
      marginBottom: '40px',
      padding: '3.2rem',
      borderRadius: '2.5rem',
      color: 'white',
      background: 'white',
      margin: '4.8rem 0 5.6rem',
      boxShadow: '0px 4px 20px rgba(24, 55, 50, 0.04)',
    },
    '& > div p:last-child': {
      marginBottom: 0,
    },
    '& h1': {
      ...theme.typography.h1,
      marginTop: 0,
      marginBottom: 8,
    },
    '& h2': {
      ...theme.typography.h2,
      marginTop: 0,
      marginBottom: 8,
    },
    '& h3': {
      ...theme.typography.h3,
      marginTop: 0,
      marginBottom: 8,
    },
    '& ul': {
      paddingLeft: '4rem',
    },
    '& ul li': {
      ...theme.typography.body1,
      marginTop: 0,
      marginBottom: 8,
    },
    '& h4': {
      ...theme.typography.h4,
      marginTop: 0,
      marginBottom: 8,
    },
    '& p': {
      ...theme.typography.body1,
      marginTop: 0,
      marginBottom: 8,
    },
  },
  content: {
    marginBottom: '5.6rem',
  },
  btnContainer: {
    '& > div': {
      margin: 'auto',
      '& a': {
        fontWeight: 600,
      },
    },
  },
}));
const PartnerPage = ({ partner = {} }) => {
  const classes = useStyles();

  return (
    <AdminContentWrapper redirectDashboard>
      <div>
        <div>
          <div className={classes.coverContainer}>
            <img src={partner.cover} alt="" className={classes.cover} />
            <Grid container justify="center" alignItems="center">
              <img src={partner.picture} alt="" />
            </Grid>
          </div>
          <div className={classes.partnerInfo}>
            <div className="text-center">
              <Typography variant="h2">{partner?.name}</Typography>
              <Typography variant="subtitle1" className={classes.subtitle1}>
                {partner?.description}
              </Typography>
            </div>
            <div className={classes.btnContainer}>
              <Btn text="Accéder à l’offre partenaire" href={partner.link} />
            </div>
          </div>
        </div>
        <div className={classes.partnerContainer}>
          <div className={classes.intro}>
            <ReactMarkdown>{partner.why}</ReactMarkdown>
          </div>
          <div className={classes.content}>
            <ReactMarkdown>{partner.content}</ReactMarkdown>
          </div>
        </div>
        <div className={classes.btnContainer}>
          <Btn text="Accéder à l’offre partenaire" href={partner.link} />
        </div>
      </div>
    </AdminContentWrapper>
  );
};
PartnerPage.propTypes = {
  partner: PropTypes.object.isRequired,
};
PartnerPage.getInitialProps = async ({ req, query }) => {
  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }
  const partner = await getPartnerApiMethod(query.id, { headers });
  return { partner };
};

export default withAuth(PartnerPage);
