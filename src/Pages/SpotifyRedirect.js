import React, { useEffect } from 'react';
import _ from 'lodash';
import { getParamValues } from '../utils/functions';
import { setTokens } from '../actions';
import { connect } from 'react-redux';

const RedirectPage = (props) => {
  //run this only when the page loads
  //props is embedded from the ROUTE
  useEffect(() => {
    const { history, location } = props;

    try {
      if (_.isEmpty(location.hash)) {
        history.push('/yourmood');
      } else {
        const access_token = getParamValues(location.hash);
        props.setTokens(access_token);
        history.push('/yourmood');
      }
    } catch (error) {
      history.push('/');
    }
  }, []);

  return <></>;
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  setTokens,
})(RedirectPage);
