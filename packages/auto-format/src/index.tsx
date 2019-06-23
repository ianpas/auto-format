import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/app/App';
import * as serviceWorker from './serviceWorker';
import { initializeIcons } from '@uifabric/icons';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

initializeIcons();

const reducer = (state: any, action: any) =>
{
    if (action.type === "navigation")
    {
        return { link_key: action.link_key };
    }
    return { link_key: "format" };
};

const store = createStore(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
