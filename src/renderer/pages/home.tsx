import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AuthApi from 'renderer/apis/AuthApi';

function Home() {
  const router = useRouter();

  React.useEffect(() => {
    if (!AuthApi.instance.authrization) {
      router.push('/login');
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div>홈페이지</div>
    </React.Fragment>
  );
}

export default Home;
