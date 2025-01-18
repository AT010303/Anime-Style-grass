import './index.css';

import { Leva } from 'leva';
import React from 'react';
import ReactDOM from 'react-dom/client';

import Experience from './Experience/Experience.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Experience />
        <Leva collapsed />
    </React.StrictMode>
);
