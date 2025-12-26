// frontend/src/components/ui/Grid.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Grid, GridItem } from './Grid';

describe('Grid Component', () => {
  it('renders children correctly', () => {
    render(<Grid><div data-testid="child">Grid Content</div></Grid>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('grid-container')).toBeInTheDocument();
  });

  it('applies default grid classes', () => {
    render(<Grid><div /></Grid>);
    const grid = screen.getByTestId('grid-container');
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-[repeat(auto-fit,minmax(280px,1fr))]'); // Default cols='auto' responsive
    expect(grid).toHaveClass('gap-4'); // Default gap='md'
  });

  it('applies custom cols class', () => {
    render(<Grid cols={2}><div /></Grid>);
    const grid = screen.getByTestId('grid-container');
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2'); // Responsive default for cols=2
  });

  it('applies non-responsive cols class', () => {
    render(<Grid cols={3} responsive={false}><div /></Grid>);
    const grid = screen.getByTestId('grid-container');
    expect(grid).toHaveClass('grid-cols-3');
    expect(grid).not.toHaveClass('sm:grid-cols-2');
  });

  it('applies custom gap class', () => {
    render(<Grid gap="xl"><div /></Grid>);
    const grid = screen.getByTestId('grid-container');
    expect(grid).toHaveClass('gap-8');
  });

  it('applies align styles', () => {
    render(<Grid align="center"><div /></Grid>);
    const grid = screen.getByTestId('grid-container');
    expect(grid).toHaveClass('items-center');
  });

  it('applies justify styles', () => {
    render(<Grid justify="center"><div /></Grid>);
    const grid = screen.getByTestId('grid-container');
    expect(grid).toHaveClass('justify-items-center');
  });

  it('applies custom className', () => {
    render(<Grid className="custom-grid-class"><div /></Grid>);
    const grid = screen.getByTestId('grid-container');
    expect(grid).toHaveClass('custom-grid-class');
  });
});

describe('GridItem Component', () => {
  it('renders children correctly', () => {
    render(<GridItem><p data-testid="item-child">Item Content</p></GridItem>);
    expect(screen.getByTestId('item-child')).toBeInTheDocument();
    expect(screen.getByTestId('grid-item')).toBeInTheDocument();
  });

  it('applies colSpan class', () => {
    render(<GridItem colSpan={6}><div /></GridItem>);
    const item = screen.getByTestId('grid-item');
    expect(item).toHaveClass('col-span-6');
  });

  it('applies rowSpan class', () => {
    render(<GridItem rowSpan={2}><div /></GridItem>);
    const item = screen.getByTestId('grid-item');
    expect(item).toHaveClass('row-span-2');
  });

  it('applies colStart class', () => {
    render(<GridItem colStart={3}><div /></GridItem>);
    const item = screen.getByTestId('grid-item');
    expect(item).toHaveClass('col-start-3');
  });

  it('applies rowStart class', () => {
    render(<GridItem rowStart={1}><div /></GridItem>);
    const item = screen.getByTestId('grid-item');
    expect(item).toHaveClass('row-start-1');
  });

  it('applies custom className', () => {
    render(<GridItem className="custom-item-class"><div /></GridItem>);
    const item = screen.getByTestId('grid-item');
    expect(item).toHaveClass('custom-item-class');
  });
});
