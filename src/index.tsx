import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';

import { store } from '@/app/store';

import bg1 from './assets/images/bg.png';
import bg2 from './assets/images/bg2.png';

let curIndex = 0;
const bgList = [bg1, bg2];

const rootEle = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootEle);

document.body.addEventListener('keyup', (e) => {
  const len = bgList.length;
  
  if (e.key === 'ArrowLeft') {
    curIndex = curIndex === 0 ? (len - 1) : (curIndex - 1);
  } else if (e.key === 'ArrowRight') {
    curIndex = curIndex === len - 1 ? 0 : (curIndex + 1);
  }

  rootEle.style.backgroundImage = `url(${bgList[curIndex]})`;
});

root.render(
  <React.Suspense>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Suspense>
);
