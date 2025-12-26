// frontend/src/components/ui/Pagination.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';
import { Pagination, CompactPagination, SimplePagination } from './Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = vitest.fn();
  const mockOnPageSizeChange = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders without crashing with minimal props', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('calls onPageChange with correct page number when "Next" is clicked', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByLabelText(/next page/i));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with correct page number when "Previous" is clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByLabelText(/previous page/i));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with correct page number when a page number is clicked', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByLabelText(/page 3/i));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('disables "Previous" and "First page" buttons on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} showFirstLast />);
    expect(screen.getByLabelText(/previous page/i)).toBeDisabled();
    expect(screen.getByLabelText(/first page/i)).toBeDisabled();
    expect(screen.getByLabelText(/next page/i)).not.toBeDisabled();
  });

  it('disables "Next" and "Last page" buttons on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} showFirstLast />);
    expect(screen.getByLabelText(/next page/i)).toBeDisabled();
    expect(screen.getByLabelText(/last page/i)).toBeDisabled();
    expect(screen.getByLabelText(/previous page/i)).not.toBeDisabled();
  });

  it('shows correct page numbers and ellipses for many pages', () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} showPageNumbers />);
    expect(screen.getByLabelText(/page 1/i)).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument(); // first ellipsis
    expect(screen.getByLabelText(/page 4/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/page 5/i)).toBeInTheDocument(); // current page
    expect(screen.getByLabelText(/page 6/i)).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBeGreaterThanOrEqual(1); // second ellipsis or just one
    expect(screen.getByLabelText(/page 10/i)).toBeInTheDocument();
  });

  it('displays page size selector when showPageSizeSelector is true', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
        showPageSizeSelector
        onPageSizeChange={mockOnPageSizeChange}
      />
    );
    expect(screen.getByLabelText(/show:/i)).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    fireEvent.change(select, { target: { value: '25' } });
    expect(mockOnPageSizeChange).toHaveBeenCalledWith(25);
  });

  it('displays items info when showItemsInfo is true', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        totalItems={50}
        pageSize={10}
        onPageChange={mockOnPageChange}
        showItemsInfo
      />
    );
    expect(screen.getByText(/showing 11 to 20 of 50 results/i)).toBeInTheDocument();
  });

  it('disables all interactive elements when loading is true', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} loading showPageSizeSelector onPageSizeChange={mockOnPageSizeChange} />);
    expect(screen.getByLabelText(/previous page/i)).toBeDisabled();
    expect(screen.getByLabelText(/next page/i)).toBeDisabled();
    expect(screen.getByLabelText(/page 1/i)).toBeDisabled();
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  describe('SimplePagination', () => {
    it('renders only previous/next buttons and items info', () => {
      render(<SimplePagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} totalItems={50} />);
      expect(screen.getByLabelText(/previous page/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/next page/i)).toBeInTheDocument();
      expect(screen.getByText(/showing 1 to 10 of 50 results/i)).toBeInTheDocument();
      expect(screen.queryByLabelText(/page 2/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/first page/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/show:/i)).not.toBeInTheDocument();
    });
  });

  describe('CompactPagination', () => {
    it('renders a compact set of page numbers', () => {
      render(<CompactPagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />);
      expect(screen.getByLabelText(/page 1/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/page 2/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/page 3/i)).toBeInTheDocument();
      expect(screen.queryByLabelText(/page 4/i)).not.toBeInTheDocument(); // Max 3 visible
      expect(screen.getByLabelText(/next page/i)).toBeInTheDocument();
      expect(screen.queryByLabelText(/first page/i)).not.toBeInTheDocument(); // showFirstLast is false
      expect(screen.queryByLabelText(/show:/i)).not.toBeInTheDocument(); // showPageSizeSelector is false
    });
  });
});
