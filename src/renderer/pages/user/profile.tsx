import React from 'react';
import Head from 'next/head';
import Logout from 'renderer/components/Logout';

function UserProfile() {
  return (
    <React.Fragment>
      <Head>
        <title>User Profile</title>
      </Head>
      <div>특정 유저</div>
      <Logout />
    </React.Fragment>
  );
}

export default UserProfile;
