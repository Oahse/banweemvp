// frontend/src/components/ui/Container.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container, Section } from './Container';

describe('Container Component', () => {
  it('renders children correctly', () => {
    render(<Container><div data-testid="child">Hello</div></Container>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies default size (xl) and padding (md) classes', () => {
    render(<Container><div /></Container>);
    const container = screen.getByRole('generic', { name: undefined }); // 'div' has no specific role by default
    expect(container).toHaveClass('max-w-6xl');
    expect(container).toHaveClass('px-4', 'sm:px-6');
  });

  it('applies custom size class', () => {
    render(<Container size="lg"><div /></Container>);
    const container = screen.getByRole('generic', { name: undefined });
    expect(container).toHaveClass('max-w-4xl');
  });

  it('applies custom padding class', () => {
    render(<Container padding="lg"><div /></Container>);
    const container = screen.getByRole('generic', { name: undefined });
    expect(container).toHaveClass('px-6', 'sm:px-8');
  });

  it('centers the container by default', () => {
    render(<Container><div /></Container>);
    const container = screen.getByRole('generic', { name: undefined });
    expect(container).toHaveClass('mx-auto');
  });

  it('does not center the container when center is false', () => {
    render(<Container center={false}><div /></Container>);
    const container = screen.getByRole('generic', { name: undefined });
    expect(container).not.toHaveClass('mx-auto');
  });

  it('applies custom className', () => {
    render(<Container className="custom-class"><div /></Container>);
    const container = screen.getByRole('generic', { name: undefined });
    expect(container).toHaveClass('custom-class');
  });
});

describe('Section Component', () => {
  it('renders children correctly', () => {
    render(<Section><p data-testid="section-child">Section Content</p></Section>);
    expect(screen.getByTestId('section-child')).toBeInTheDocument();
  });

  it('applies default padding (lg) and background (default) classes', () => {
    render(<Section><div /></Section>);
    const section = screen.getByRole('region', { name: undefined }); // 'section' has a region role
    expect(section).toHaveClass('py-12', 'md:py-16', 'lg:py-20');
    expect(section).toHaveClass('bg-background');
  });

  it('applies custom padding class', () => {
    render(<Section padding="sm"><div /></Section>);
    const section = screen.getByRole('region', { name: undefined });
    expect(section).toHaveClass('py-6');
  });

  it('applies custom background class', () => {
    render(<Section background="surface"><div /></Section>);
    const section = screen.getByRole('region', { name: undefined });
    expect(section).toHaveClass('bg-surface');
  });

  it('applies custom className', () => {
    render(<Section className="section-custom"><div /></Section>);
    const section = screen.getByRole('region', { name: undefined });
    expect(section).toHaveClass('section-custom');
  });
});
