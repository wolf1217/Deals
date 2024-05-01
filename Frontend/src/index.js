import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import '@fontsource/roboto/700.css';

import ALLtest from './Home/Index/ALLtest'
import AnimationHint from './Home/Index/animation/AnimationHint'

// 控制台
// import {Homepage} from './Home/Usercontrol/Pages'

const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.style.backgroundColor = '#F8F4F5';
// document.body.style.background = 'linear-gradient(to bottom, #FFFFFF, #333333)';

root.render(
  <React.StrictMode>
    <ALLtest />
  </React.StrictMode>
);

reportWebVitals();
