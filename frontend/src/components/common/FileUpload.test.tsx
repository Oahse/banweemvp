// frontend/src/components/common/FileUpload.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import FileUpload from './FileUpload';
import { useFileUpload } from '../../hooks/useFileUpload';
import { toast } from 'react-hot-toast';
import * as fileUploadUtils from '../../hooks/useFileUpload'; // Import utility functions

// Mock custom hook and other dependencies
vitest.mock('../../hooks/useFileUpload', async (importOriginal) => {
  const actual = await importOriginal(); // Get actual implementations for some utilities
  return {
    useFileUpload: vitest.fn(),
    formatFileSize: actual.formatFileSize, // Keep original formatFileSize
    isImageFile: actual.isImageFile,     // Keep original isImageFile
    createFilePreview: vitest.fn(() => 'blob:mock-preview-url'), // Mock create and cleanup
    cleanupFilePreview: vitest.fn(),
  };
});

vitest.mock('react-hot-toast', () => ({
  toast: {
    error: vitest.fn(),
  },
}));

// Mock react-icons/fi to avoid SVG rendering issues in tests
vitest.mock('react-icons/fi', () => ({
  FiUpload: vitest.fn(() => <svg data-testid="icon-upload" />),
  FiX: vitest.fn(() => <svg data-testid="icon-x" />),
  FiFile: vitest.fn(() => <svg data-testid="icon-file" />),
  FiTrash2: vitest.fn(() => <svg data-testid="icon-trash" />),
  FiCheck: vitest.fn(() => <svg data-testid="icon-check" />),
}));

describe('FileUpload Component', () => {
  const mockUploadFiles = vitest.fn();
  const mockDeleteFiles = vitest.fn();
  const mockValidateFiles = vitest.fn();
  const mockReset = vitest.fn();
  const mockOnUploadSuccess = vitest.fn();
  const mockOnUploadError = vitest.fn();

  // Mock a File object
  const createMockFile = (name = 'test.png', size = 1000, type = 'image/png') =>
    new File(['hello'], name, { type, size });

  beforeEach(() => {
    vitest.clearAllMocks();
    // Default mock for useFileUpload
    (useFileUpload as vitest.Mock).mockReturnValue({
      loading: false,
      progress: 0,
      error: null,
      uploadedFiles: [],
      uploadFiles: mockUploadFiles,
      deleteFiles: mockDeleteFiles,
      validateFiles: mockValidateFiles,
      reset: mockReset,
    });
    // Default validation passes
    mockValidateFiles.mockReturnValue({ valid: [], errors: [] });
  });

  afterEach(() => {
    (fileUploadUtils.createFilePreview as vitest.Mock).mockClear();
    (fileUploadUtils.cleanupFilePreview as vitest.Mock).mockClear();
  });

  it('renders correctly initially', () => {
    render(<FileUpload onUploadSuccess={mockOnUploadSuccess} />);
    expect(screen.getByText('Upload files')).toBeInTheDocument();
    expect(screen.getByText('Drag and drop files here, or click to select')).toBeInTheDocument();
    expect(screen.getByTestId('icon-upload')).toBeInTheDocument();
  });

  it('handles file selection via input', async () => {
    const file = createMockFile();
    mockValidateFiles.mockReturnValue({ valid: [file], errors: [] });

    render(<FileUpload onUploadSuccess={mockOnUploadSuccess} showPreview />);
    const input = screen.getByLabelText('Upload files').closest('div')?.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockValidateFiles).toHaveBeenCalledWith([file]);
      expect(fileUploadUtils.createFilePreview).toHaveBeenCalledWith(file);
      expect(screen.getByText('Files to upload (1)')).toBeInTheDocument();
      expect(screen.getByText(file.name)).toBeInTheDocument();
    });
  });

  it('handles file drop', async () => {
    const file = createMockFile();
    mockValidateFiles.mockReturnValue({ valid: [file], errors: [] });

    render(<FileUpload onUploadSuccess={mockOnUploadSuccess} showPreview />);
    const dropzone = screen.getByText('Upload files').closest('div')!;

    fireEvent.dragEnter(dropzone);
    expect(dropzone).toHaveClass('border-blue-500');

    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } });

    await waitFor(() => {
      expect(dropzone).not.toHaveClass('border-blue-500'); // Drag active should be false after drop
      expect(mockValidateFiles).toHaveBeenCalledWith([file]);
      expect(screen.getByText(file.name)).toBeInTheDocument();
    });
  });

  it('shows validation errors', async () => {
    const file = createMockFile('large.txt', 200 * 1024, 'text/plain'); // 200KB > 100KB max
    mockValidateFiles.mockReturnValue({ valid: [], errors: ['File size exceeds limit'] });

    render(<FileUpload onUploadSuccess={mockOnUploadSuccess} />);
    const input = screen.getByLabelText('Upload files').closest('div')?.querySelector('input[type="file"]') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(expect.stringContaining('File validation failed:'));
      expect(screen.queryByText(file.name)).not.toBeInTheDocument(); // No preview shown
    });
  });

  it('uploads files successfully', async () => {
    const file = createMockFile();
    mockValidateFiles.mockReturnValue({ valid: [file], errors: [] });
    mockUploadFiles.mockResolvedValueOnce([{ name: file.name, url: 'http://cdn.example.com/uploaded.png' }]);

    render(<FileUpload onUploadSuccess={mockOnUploadSuccess} showPreview />);
    const input = screen.getByLabelText('Upload files').closest('div')?.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByRole('button', { name: /upload/i }));

    await waitFor(() => {
      expect(mockUploadFiles).toHaveBeenCalledWith([file]);
      expect(mockOnUploadSuccess).toHaveBeenCalledWith([expect.objectContaining({ name: file.name })]);
      expect(fileUploadUtils.cleanupFilePreview).toHaveBeenCalled(); // Preview cleaned
      expect(screen.queryByText('Files to upload')).not.toBeInTheDocument(); // Previews cleared
    });
  });

  it('removes a file preview', async () => {
    const file1 = createMockFile('file1.png');
    const file2 = createMockFile('file2.jpg');
    mockValidateFiles.mockReturnValue({ valid: [file1, file2], errors: [] });

    render(<FileUpload onUploadSuccess={mockOnUploadSuccess} showPreview />);
    const input = screen.getByLabelText('Upload files').closest('div')?.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file1, file2] } });

    await waitFor(() => expect(screen.getAllByTestId('icon-x').length).toBe(2));
    
    // Click remove for file1
    const removeButton = screen.getAllByTestId('icon-x')[0].closest('button')!;
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByText(file1.name)).not.toBeInTheDocument();
      expect(screen.getByText(file2.name)).toBeInTheDocument();
      expect(fileUploadUtils.cleanupFilePreview).toHaveBeenCalled();
    });
  });

  it('clears all previews and resets useFileUpload state', async () => {
    const file = createMockFile();
    mockValidateFiles.mockReturnValue({ valid: [file], errors: [] });

    render(<FileUpload onUploadSuccess={mockOnUploadSuccess} showPreview />);
    const input = screen.getByLabelText('Upload files').closest('div')?.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(screen.getByText(file.name)).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    await waitFor(() => {
      expect(screen.queryByText(file.name)).not.toBeInTheDocument();
      expect(fileUploadUtils.cleanupFilePreview).toHaveBeenCalled();
      expect(mockReset).toHaveBeenCalledTimes(1);
    });
  });

  it('displays uploaded files', () => {
    const uploadedFiles = [
      { name: 'uploaded.png', url: 'http://cdn.example.com/uploaded.png', size: 5000, type: 'image/png', githubPath: 'path/to/uploaded.png' },
    ];
    (useFileUpload as vitest.Mock).mockReturnValue({
      loading: false,
      progress: 0,
      error: null,
      uploadedFiles: uploadedFiles,
      uploadFiles: mockUploadFiles,
      deleteFiles: mockDeleteFiles,
      validateFiles: mockValidateFiles,
      reset: mockReset,
    });

    render(<FileUpload onUploadSuccess={mockOnUploadSuccess} showPreview />);
    expect(screen.getByText('Uploaded files (1)')).toBeInTheDocument();
    expect(screen.getByText('uploaded.png')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View file' })).toHaveAttribute('href', 'http://cdn.example.com/uploaded.png');
  });

  it('deletes an uploaded file', async () => {
    const uploadedFiles = [
      { name: 'uploaded.png', url: 'http://cdn.example.com/uploaded.png', size: 5000, type: 'image/png', githubPath: 'path/to/uploaded.png' },
    ];
    (useFileUpload as vitest.Mock).mockReturnValue({
      loading: false,
      progress: 0,
      error: null,
      uploadedFiles: uploadedFiles,
      uploadFiles: mockUploadFiles,
      deleteFiles: mockDeleteFiles,
      validateFiles: mockValidateFiles,
      reset: mockReset,
    });

    render(<FileUpload onUploadSuccess={mockOnUploadSuccess} showPreview />);
    expect(screen.getByText('uploaded.png')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('icon-trash').closest('button')!);

    await waitFor(() => {
      expect(mockDeleteFiles).toHaveBeenCalledWith([{ githubPath: 'path/to/uploaded.png' }]);
    });
  });

  it('shows loading indicator during upload', () => {
    (useFileUpload as vitest.Mock).mockReturnValue({
      loading: true,
      progress: 50,
      error: null,
      uploadedFiles: [],
      uploadFiles: mockUploadFiles,
      deleteFiles: mockDeleteFiles,
      validateFiles: mockValidateFiles,
      reset: mockReset,
    });

    render(<FileUpload onUploadSuccess={mockOnUploadSuccess} />);
    expect(screen.getByText('Uploading... 50%')).toBeInTheDocument();
    expect(screen.getByText('Upload files').closest('div')).toHaveClass('opacity-50'); // Disabled styles
  });

  it('disables interaction when disabled prop is true', () => {
    render(<FileUpload onUploadSuccess={mockOnUploadSuccess} disabled />);
    const input = screen.getByLabelText('Upload files').closest('div')?.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeDisabled();
    expect(screen.getByText('Upload files').closest('div')).toHaveClass('opacity-50', 'cursor-not-allowed');

    // Attempting to drop files should not trigger handleFiles
    const dropzone = screen.getByText('Upload files').closest('div')!;
    fireEvent.drop(dropzone, { dataTransfer: { files: [createMockFile()] } });
    expect(mockValidateFiles).not.toHaveBeenCalled();
  });
});
