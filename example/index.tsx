import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import usePWAInstall from '../src';

const App = () => {
  const { isInstalled, install } = usePWAInstall();

  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(
        new URL('service-worker.js', import.meta.url),
        { type: 'module' }
      );
    }
  }, []);

  return (
    <div>
      <h1>This is PWA</h1>
      {isInstalled ? (
        <p>App is installed</p>
      ) : (
        <button onClick={install}>Install</button>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
