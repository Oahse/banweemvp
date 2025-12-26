// frontend/src/components/ui/Card.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(<Card><p>Test Content</p></Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default variant styles', () => {
    render(<Card><p>Test</p></Card>);
    const card = screen.getByText('Test').closest('div');
    expect(card).toHaveClass('bg-surface');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('border-border');
  });

  it('applies elevated variant styles', () => {
    render(<Card variant="elevated"><p>Test</p></Card>);
    const card = screen.getByText('Test').closest('div');
    expect(card).toHaveClass('bg-surface-elevated');
  });

  it('applies outlined variant styles', () => {
    render(<Card variant="outlined"><p>Test</p></Card>);
    const card = screen.getByText('Test').closest('div');
    expect(card).toHaveClass('bg-surface');
    expect(card).toHaveClass('border-2');
    expect(card).toHaveClass('border-border-strong');
  });

  it('applies filled variant styles', () => {
    render(<Card variant="filled"><p>Test</p></Card>);
    const card = screen.getByText('Test').closest('div');
    expect(card).toHaveClass('bg-surface-hover');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('border-border-light');
  });

  it('applies padding styles', () => {
    render(<Card padding="lg"><p>Test</p></Card>);
    const card = screen.getByText('Test').closest('div');
    expect(card).toHaveClass('p-6');
  });

  it('applies rounded styles', () => {
    render(<Card rounded="xl"><p>Test</p></Card>);
    const card = screen.getByText('Test').closest('div');
    expect(card).toHaveClass('rounded-xl');
  });

  it('applies shadow styles', () => {
    render(<Card shadow="lg"><p>Test</p></Card>);
    const card = screen.getByText('Test').closest('div');
    expect(card).toHaveClass('shadow-lg');
  });

  it('applies interactive styles when interactive is true', () => {
    render(<Card interactive><p>Test</p></Card>);
    const card = screen.getByText('Test').closest('div');
    expect(card).toHaveClass('cursor-pointer');
    expect(card).toHaveClass('hover:shadow-lg');
  });

  it('applies hover styles when hover is true', () => {
    render(<Card hover><p>Test</p></Card>);
    const card = screen.getByText('Test').closest('div');
    expect(card).toHaveClass('hover:shadow-md');
  });
});

describe('Card Sub-components', () => {
  it('CardHeader renders children', () => {
    render(<CardHeader>Header Content</CardHeader>);
    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Header Content').tagName).toBe('DIV');
  });

  it('CardTitle renders children as h3', () => {
    render(<CardTitle>Card Title</CardTitle>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Title').tagName).toBe('H3');
  });

  it('CardDescription renders children as p', () => {
    render(<CardDescription>Card Description</CardDescription>);
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Description').tagName).toBe('P');
  });

  it('CardContent renders children', () => {
    render(<CardContent>Main Content</CardContent>);
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Main Content').tagName).toBe('DIV');
  });

  it('CardFooter renders children', () => {
    render(<CardFooter>Footer Content</CardFooter>);
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content').tagName).toBe('DIV');
  });
});
