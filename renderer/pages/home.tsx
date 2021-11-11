import React from 'react';
import { ipcRenderer } from 'electron';
import Head from 'next/head';
import Link from 'next/link';

function Home() {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    ipcRenderer.send('test');

    ipcRenderer.on('test', (event, data) => {
      console.log(data);
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      ipcRenderer.removeAllListeners('test');
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <img src="/images/logo.png" />
        {messages.map(message => <div key={message}>{message}</div>)}
      </div>
    </React.Fragment>
  );
};

export default Home;
