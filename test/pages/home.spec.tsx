import { render } from '../test-utils';
import Home from '../../pages/home';

describe('pages/<Home />', () => {
	describe('Layout structure', () => {
		const { getByRole } = render(<Home />);

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
