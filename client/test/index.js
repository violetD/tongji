import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker'
import LogoIcon from './svg/logo.svg';

console.log(LogoIcon);

document.addEventListener('DOMContentLoaded', () => {
  render(
    <div>
      <LogoIcon width="100" />
    </div>,
    document.getElementById('root')
  );
});

registerServiceWorker();
