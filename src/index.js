import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { RoomProvider } from './context';

const root = createRoot(document.getElementById('root'));
root.render(
    <RoomProvider>
        <Router>
            <App />
        </Router>
    </RoomProvider>
);

serviceWorker.unregister();
