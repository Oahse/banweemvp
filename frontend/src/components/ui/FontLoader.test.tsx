// frontend/src/components/ui/FontLoader.test.tsx
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { describe, it, expect, vitest, beforeEach, afterEach } from 'vitest';
import { FontLoader } from './FontLoader';

describe('FontLoader Component', () => {
  let container: HTMLDivElement | null = null;
  let createElementSpy: vitest.SpiedFunction<typeof document.createElement>;
  let appendChildSpy: vitest.SpiedFunction<typeof document.head.appendChild>;
  let removeChildSpy: vitest.SpiedFunction<typeof document.head.removeChild>;

  beforeEach(() => {
    // Setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);

    // Mock DOM manipulation methods
    createElementSpy = vitest.spyOn(document, 'createElement');
    appendChildSpy = vitest.spyOn(document.head, 'appendChild');
    removeChildSpy = vitest.spyOn(document.head, 'removeChild');
  });

  afterEach(() => {
    // Cleanup on exiting
    if (container) {
      unmountComponentAtNode(container);
      document.body.removeChild(container);
      container = null;
    }
    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  it('loads the font stylesheet on mount', () => {
    let linkElement: HTMLLinkElement | null = null;
    createElementSpy.mockImplementation((tagName) => {
      if (tagName === 'link') {
        linkElement = document.createElement(tagName) as HTMLLinkElement;
        return linkElement;
      }
      return document.createElement(tagName);
    });

    act(() => {
      render(<FontLoader />, container);
    });

    expect(createElementSpy).toHaveBeenCalledWith('link');
    expect(linkElement).not.toBeNull();
    expect(linkElement?.href).toBe('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
    expect(linkElement?.rel).toBe('stylesheet');
    expect(appendChildSpy).toHaveBeenCalledWith(linkElement);
  });

  it('removes the font stylesheet on unmount', () => {
    let linkElement: HTMLLinkElement | null = null;
    createElementSpy.mockImplementation((tagName) => {
      if (tagName === 'link') {
        linkElement = document.createElement(tagName) as HTMLLinkElement;
        return linkElement;
      }
      return document.createElement(tagName);
    });

    act(() => {
      render(<FontLoader />, container);
    });

    // Ensure the link was added
    expect(appendChildSpy).toHaveBeenCalledTimes(1);

    act(() => {
      unmountComponentAtNode(container!); // Unmount the component
    });

    // Ensure the link was removed
    expect(removeChildSpy).toHaveBeenCalledWith(linkElement);
    expect(removeChildSpy).toHaveBeenCalledTimes(1);
  });

  it('renders null', () => {
    const { container } = render(<FontLoader />);
    expect(container).toBeEmptyDOMElement();
  });
});
