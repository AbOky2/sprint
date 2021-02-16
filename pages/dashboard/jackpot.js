import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { userActions } from '../../redux/_actions';
import { AdminContentWrapper } from '../../components/wrapper';
import { addBookmarkApiMethod } from '../../lib/api/customer';
import Card from '../../components/card';
import { Btn } from '../../components/form';
import withAuth from '../../lib/withAuth';

const useStyles = makeStyles((theme) => ({
  notFound: {
    '& > div:first-of-type': {
      marginBottom: '40px',
      padding: '3.2rem',
      borderRadius: '2.5rem',
      color: 'white',
      background: 'white',
      margin: '2.8rem 0 5.6rem',
      boxShadow: '0px 4px 20px rgba(24, 55, 50, 0.04)',
    },
    '& > div:first-of-type h3': {
      marginBottom: 16,
      '& span': {
        marginRight: 5,
      },
    },
  },
  card: {
    width: 'calc(100% - 14px)',
  },
  btnContainer: {
    textAlign: 'center',
    '& > div': {
      display: 'inline-block',
      padding: '1.8rem 3rem',
      background: '#4f80ff',
      borderRadius: '10px',
      marginBottom: '1rem',
      '&:first-of-type': {
        marginRight: 12,
      },
      '&:last-of-type': {
        marginLeft: 12,
        background: 'white',
        border: `1px solid ${theme.palette.newBlue}`,
        '& a': {
          color: '#4f80ff',
        },
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: '2rem',
        padding: '1.8rem 1rem',
        width: '100%',
        '&:first-of-type': {
          marginRight: 0,
        },
        '&:last-of-type': {
          marginLeft: 0,
          marginBottom: 0,
        },
      },
    },
    '& a': {
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '18px',
      lineHeight: '28px',
      display: 'flex',
      alignItems: 'center',
      color: '#ffffff',
    },
  },
  listContainer: {
    width: 'calc(33% - 11px)',
    marginBottom: '2rem',
    '&:nth-child(3n+2)': {
      margin: '0 2.1rem 2rem',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      '&:nth-child(3n+2)': {
        margin: '0 0 2rem',
      },
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
}));
const JackpotPage = () => (
  <AdminContentWrapper noRedirect>
    <iframe src="https://cagnotte-immobiliere.nexity.fr/" />
  </AdminContentWrapper>
);

export default withAuth(JackpotPage);
