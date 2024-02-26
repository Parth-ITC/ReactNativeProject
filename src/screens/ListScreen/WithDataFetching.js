import React from 'react';
import usePostData from '../../hooks/usePostData';

const WithDataFetching = () => WrappedComponent => {
  return props => {
    const {postData, error, loading} = usePostData();


    return (
      <WrappedComponent
        {...props}
        postData={postData}
        loading={loading}
        error={error}
      />
    );
  };
};

export default WithDataFetching;
