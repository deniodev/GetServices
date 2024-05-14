import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServiceItem from '../components/ServiceItem';
import './setup';

describe('ServiceItem', () => {
  it('should render No service available when service object is null or undefined', () => {
    const service = null;
    render(<ServiceItem service={service} />);

    const defaultMessage = screen.getByText('No service available');
    expect(defaultMessage).toBeInTheDocument();
  });
});
