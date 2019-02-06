import React from 'react';
import './index.css';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import Root from './pages/root/root.component';
import { HashRouter as Router } from 'react-router-dom';

const App = () => (
	<Router>
		<Root />
	</Router>
);

ReactDOM.render(
	
	<App />
	, document.getElementById('root'));
//registerServiceWorker();
