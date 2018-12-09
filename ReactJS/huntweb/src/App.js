import React from 'react';

import "./styles.css";
import Header from "./components/Header/index";
import Routes from "./routes";

export default class App extends React.Component {
	render() {
		return (
			<div>
    			<Header />
				<Routes />
			</div>
		)
	}
}