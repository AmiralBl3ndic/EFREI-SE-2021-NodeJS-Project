import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { render } from '@testing-library/react';
import store from '../store/app.store';

// eslint-disable-next-line react/prop-types
const StoreProviderWrapper = ({ children }) => (
	<StoreProvider store={store}>{children}</StoreProvider>
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (ui, options) =>
	render(ui, { wrapper: StoreProviderWrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
