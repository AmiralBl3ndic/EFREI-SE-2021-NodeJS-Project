import { render } from '../test-utils';
import AppPage from '../../pages/app';

describe('pages/<AppPage />', () => {
	describe('Layout structure', () => {
		const { getByRole } = render(<AppPage />);

		it('has a notes explorer with navigation ARIA role', () => {
			getByRole('navigation');
		});

		it('has an editor with main ARIA role', () => {
			getByRole('main');
		});

		it('has a revisions explorer with list ARIA role', () => {
			getByRole('list');
		});
	});
});
