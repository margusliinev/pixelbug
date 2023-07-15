import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';
import { ToastNotification } from './components';
import { store } from './store';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ToastNotification>
                <App />
            </ToastNotification>
        </Provider>
    </React.StrictMode>
);
