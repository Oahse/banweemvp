// frontend/src/components/order/OrderNotes.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import OrderNotes from './OrderNotes'; // Default export
import * as dateFns from 'date-fns'; // Mocked

// Mock date-fns format
vitest.mock('date-fns', () => ({
  format: vitest.fn((date, formatStr) => `mocked-date-${formatStr}`),
}));

describe('OrderNotes Component', () => {
  const mockNotes = [
    {
      id: 'note-1',
      user_id: 'user-abc-123',
      created_at: new Date('2024-01-15T10:00:00Z').toISOString(),
      note: 'This is the first note.',
      attachments: [],
    },
    {
      id: 'note-2',
      user_id: 'user-xyz-456',
      created_at: new Date('2024-01-15T11:00:00Z').toISOString(),
      note: 'Another note with an attachment.',
      attachments: ['http://example.com/attachment1.pdf'],
    },
  ];

  const mockOnAddNote = vitest.fn();

  beforeEach(() => {
    vitest.clearAllMocks();
  });

  it('renders order notes and count', () => {
    render(<OrderNotes notes={mockNotes} editable={true} onAddNote={mockOnAddNote} />);
    expect(screen.getByText('Order Notes')).toBeInTheDocument();
    expect(screen.getByText('2 notes')).toBeInTheDocument();
    expect(screen.getByText('This is the first note.')).toBeInTheDocument();
    expect(screen.getByText('User ...-123')).toBeInTheDocument();
    expect(screen.getByText('Another note with an attachment.')).toBeInTheDocument();
  });

  it('renders "No notes added yet" when notes array is empty', () => {
    render(<OrderNotes notes={[]} editable={true} onAddNote={mockOnAddNote} />);
    expect(screen.getByText('No notes added yet')).toBeInTheDocument();
  });

  it('shows add note form when editable is true', () => {
    render(<OrderNotes notes={mockNotes} editable={true} onAddNote={mockOnAddNote} />);
    expect(screen.getByLabelText('Add a note')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your note here...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Note' })).toBeInTheDocument();
  });

  it('hides add note form when editable is false', () => {
    render(<OrderNotes notes={mockNotes} editable={false} onAddNote={mockOnAddNote} />);
    expect(screen.queryByLabelText('Add a note')).not.toBeInTheDocument();
  });

  it('updates newNote state on textarea change', () => {
    render(<OrderNotes notes={mockNotes} editable={true} onAddNote={mockOnAddNote} />);
    const textarea = screen.getByPlaceholderText('Enter your note here...') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'New test note' } });
    expect(textarea.value).toBe('New test note');
  });

  it('enables "Add Note" button when new note is not empty', () => {
    render(<OrderNotes notes={mockNotes} editable={true} onAddNote={mockOnAddNote} />);
    const addButton = screen.getByRole('button', { name: 'Add Note' }) as HTMLButtonElement;
    expect(addButton).toBeDisabled();
    fireEvent.change(screen.getByPlaceholderText('Enter your note here...'), { target: { value: 'New test note' } });
    expect(addButton).not.toBeDisabled();
  });

  it('calls onAddNote and resets form on successful submission', async () => {
    mockOnAddNote.mockResolvedValueOnce(true);
    render(<OrderNotes notes={mockNotes} editable={true} onAddNote={mockOnAddNote} />);
    const textarea = screen.getByPlaceholderText('Enter your note here...') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'A fresh note' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Note' }));

    await waitFor(() => {
      expect(mockOnAddNote).toHaveBeenCalledWith('A fresh note', undefined); // No attachments
      expect(textarea.value).toBe('');
      expect(screen.queryByText('A fresh note')).not.toBeInTheDocument(); // Cleared from form
    });
  });

  it('handles attachments for a new note', async () => {
    mockOnAddNote.mockResolvedValueOnce(true);
    render(<OrderNotes notes={mockNotes} editable={true} onAddNote={mockOnAddNote} />);
    const textarea = screen.getByPlaceholderText('Enter your note here...') as HTMLTextAreaElement;
    const fileInput = screen.getByLabelText('Attachments (optional)') as HTMLInputElement;

    const file1 = new File(['content1'], 'test1.txt', { type: 'text/plain' });
    const file2 = new File(['content2'], 'test2.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file1, file2] } });

    expect(screen.getByText('test1.txt')).toBeInTheDocument();
    expect(screen.getByText('test2.pdf')).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: 'Note with files' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Note' }));

    await waitFor(() => {
      expect(mockOnAddNote).toHaveBeenCalledWith('Note with files', [file1, file2]);
      expect(screen.queryByText('test1.txt')).not.toBeInTheDocument(); // Attachments cleared
    });
  });

  it('removes an attachment from preview', () => {
    render(<OrderNotes notes={mockNotes} editable={true} onAddNote={mockOnAddNote} />);
    const fileInput = screen.getByLabelText('Attachments (optional)') as HTMLInputElement;

    const file1 = new File(['content1'], 'test1.txt', { type: 'text/plain' });
    const file2 = new File(['content2'], 'test2.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file1, file2] } });

    expect(screen.getByText('test1.txt')).toBeInTheDocument();
    fireEvent.click(screen.getByText('test1.txt').nextElementSibling!); // Click '✕' next to test1.txt
    expect(screen.queryByText('test1.txt')).not.toBeInTheDocument();
    expect(screen.getByText('test2.pdf')).toBeInTheDocument();
  });

  it('disables form elements during submission', async () => {
    mockOnAddNote.mockImplementationOnce(() => new Promise(() => {})); // Never resolve
    render(<OrderNotes notes={mockNotes} editable={true} onAddNote={mockOnAddNote} />);
    const textarea = screen.getByPlaceholderText('Enter your note here...') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'Long note' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add Note' }));

    expect(textarea).toBeDisabled();
    expect(screen.getByLabelText('Attachments (optional)')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Adding...' })).toBeDisabled();
  });

  it('displays attachments for existing notes', () => {
    render(<OrderNotes notes={mockNotes} editable={true} onAddNote={mockOnAddNote} />);
    expect(screen.getByText('Another note with an attachment.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '📎 attachment1.pdf' })).toHaveAttribute('href', 'http://example.com/attachment1.pdf');
  });
});
