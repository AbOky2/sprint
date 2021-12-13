import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { FullStory } from 'react-fullstory';


const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: null,
};

// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {
  render() {
    return (
    
      <div style={{ padding: '10px 45px' }}>
        <Head>
          <title>Settings</title>
          <meta name="description" content="List of purchased books." />
          <FullStory orgId = '177V3Z'/>
        </Head>
        <p>Bienvenue sur kit le nid</p>
      </div>
    );
  }
}

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default Index;
