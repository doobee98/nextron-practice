import React from 'react';
import Head from 'next/head';
import Logout from 'renderer/components/Logout';

function UserAll() {
  return (
    <React.Fragment>
      <Head>
        <title>All Users</title>
      </Head>
      <div>모든 유저</div>
      <Logout />
    </React.Fragment>
  );
}

export default UserAll;
