// !STARTERCONF You should delete this page

import { render } from '@testing-library/react';

import HomePage from '@/app/page';

describe('Homepage', () => {
  it('renders the Components', () => {
    render(<HomePage />);

    // const heading = screen.getByText(/A personal project to recreate the Spotify experience with modern web technologies./i);

    // expect(heading).toBeInTheDocument();
  });
});
