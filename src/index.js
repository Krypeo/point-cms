import React from 'react';
import './index.css';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import Root from './pages/root/root.component';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';

import stores from './stores';

const App = () => (
	<Router>
		<Provider {...stores}>
			<Root />
		</Provider>
	</Router>
);

ReactDOM.render(

	<App />
	, document.getElementById('root'));
//registerServiceWorker();
