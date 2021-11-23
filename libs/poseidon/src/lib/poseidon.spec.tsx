import { render } from '@testing-library/react';

import Poseidon from './poseidon';

describe('Poseidon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Poseidon />);
    expect(baseElement).toBeTruthy();
  });
});
