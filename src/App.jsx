import React from 'react';
import { ConfigProvider, App as AntApp } from 'antd';

import Home from './pages/Home';

const App = () => {
	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: 'Roboto, sans-serif',
					borderRadius: 5,
					colorTextPlaceholder: '#797a7c',
				},
			}}
		>
			<AntApp>
				<Home />
			</AntApp>
		</ConfigProvider>
	);
};

export default App;
