/**
 * Migration Helper for Text Component
 * 
 * This file provides utilities and patterns for migrating existing text elements
 * to the new Text component system.
 */

// Common text element mappings
export const TEXT_MIGRATIONS = {
  // Headings
  'h1': { component: 'Heading', props: { level: 1 } },
  'h2': { component: 'Heading', props: { level: 2 } },
  'h3': { component: 'Heading', props: { level: 3 } },
  'h4': { component: 'Heading', props: { level: 4 } },
  'h5': { component: 'Heading', props: { level: 5 } },
  'h6': { component: 'Heading', props: { level: 6 } },
  
  // Body text
  'p': { component: 'Text', props: { variant: 'body' } },
  
  // Labels
  'label': { component: 'Label', props: {} },
  
  // Small text
  'small': { component: 'Caption', props: {} },
  
  // Spans (context-dependent)
  'span': { component: 'Text', props: {} },
  
  // Code
  'code': { component: 'Code', props: {} },
  
  // Blockquotes
  'blockquote': { component: 'Quote', props: {} },
} as const;

// Common Tailwind class mappings
export const TAILWIND_MIGRATIONS = {
  // Font sizes
  'text-xs': { variant: 'caption' },
  'text-sm': { variant: 'body-sm' },
  'text-base': { variant: 'body' },
  'text-lg': { variant: 'body-lg' },
  'text-xl': { variant: 'h4' },
  'text-2xl': { variant: 'h3' },
  'text-3xl': { variant: 'h2' },
  'text-4xl': { variant: 'h1' },
  'text-5xl': { variant: 'display-sm' },
  'text-6xl': { variant: 'display' },
  
  // Font weights
  'font-thin': { weight: 'thin' },
  'font-extralight': { weight: 'extralight' },
  'font-light': { weight: 'light' },
  'font-normal': { weight: 'normal' },
  'font-medium': { weight: 'medium' },
  'font-semibold': { weight: 'semibold' },
  'font-bold': { weight: 'bold' },
  'font-extrabold': { weight: 'extrabold' },
  'font-black': { weight: 'black' },
  
  // Text alignment
  'text-left': { align: 'left' },
  'text-center': { align: 'center' },
  'text-right': { align: 'right' },
  'text-justify': { align: 'justify' },
  
  // Text colors (mapping to tones)
  'text-main': { tone: 'default' },
  'text-primary': { tone: 'primary' },
  'text-gray-500': { tone: 'secondary' },
  'text-gray-600': { tone: 'secondary' },
  'text-copy-muted': { tone: 'secondary' },
  'text-green-600': { tone: 'success' },
  'text-yellow-600': { tone: 'warning' },
  'text-red-600': { tone: 'danger' },
  'text-blue-600': { tone: 'info' },
  
  // Text transformations
  'uppercase': { transform: 'uppercase' },
  'lowercase': { transform: 'lowercase' },
  'capitalize': { transform: 'capitalize' },
  'normal-case': { transform: 'none' },
  
  // Text decorations
  'underline': { decoration: 'underline' },
  'line-through': { decoration: 'line-through' },
  'no-underline': { decoration: 'none' },
} as const;

// Function to generate replacement patterns
export const generateReplacement = (element: string, className: string) => {
  const migration = TEXT_MIGRATIONS[element as keyof typeof TEXT_MIGRATIONS];
  if (!migration) return null;
  
  const props: any = { ...migration.props };
  
  // Parse Tailwind classes
  const classes = className.split(' ');
  classes.forEach(cls => {
    const tailwindMigration = TAILWIND_MIGRATIONS[cls as keyof typeof TAILWIND_MIGRATIONS];
    if (tailwindMigration) {
      Object.assign(props, tailwindMigration);
    }
  });
  
  return {
    component: migration.component,
    props,
  };
};

// Common replacement patterns
export const REPLACEMENT_PATTERNS = [
  // Basic headings
  {
    from: /<h1([^>]*)className="([^"]*)"([^>]*)>(.*?)<\/h1>/g,
    to: (match: string, attrs1: string, className: string, attrs2: string, content: string) => {
      return `<Heading level={1}${attrs1}${attrs2} className="${className}">${content}</Heading>`;
    }
  },
  {
    from: /<h2([^>]*)className="([^"]*)"([^>]*)>(.*?)<\/h2>/g,
    to: (match: string, attrs1: string, className: string, attrs2: string, content: string) => {
      return `<Heading level={2}${attrs1}${attrs2} className="${className}">${content}</Heading>`;
    }
  },
  {
    from: /<h3([^>]*)className="([^"]*)"([^>]*)>(.*?)<\/h3>/g,
    to: (match: string, attrs1: string, className: string, attrs2: string, content: string) => {
      return `<Heading level={3}${attrs1}${attrs2} className="${className}">${content}</Heading>`;
    }
  },
  {
    from: /<p([^>]*)className="([^"]*)"([^>]*)>(.*?)<\/p>/g,
    to: (match: string, attrs1: string, className: string, attrs2: string, content: string) => {
      return `<Text${attrs1}${attrs2} className="${className}">${content}</Text>`;
    }
  },
  {
    from: /<label([^>]*)className="([^"]*)"([^>]*)>(.*?)<\/label>/g,
    to: (match: string, attrs1: string, className: string, attrs2: string, content: string) => {
      return `<Label${attrs1}${attrs2} className="${className}">${content}</Label>`;
    }
  },
  {
    from: /<small([^>]*)className="([^"]*)"([^>]*)>(.*?)<\/small>/g,
    to: (match: string, attrs1: string, className: string, attrs2: string, content: string) => {
      return `<Caption${attrs1}${attrs2} className="${className}">${content}</Caption>`;
    }
  },
] as const;

// Migration checklist
export const MIGRATION_CHECKLIST = [
  '✅ Replace all h1-h6 elements with Heading component',
  '✅ Replace all p elements with Text component',
  '✅ Replace all label elements with Label component',
  '✅ Replace all small elements with Caption component',
  '✅ Replace all code elements with Code component',
  '✅ Replace all blockquote elements with Quote component',
  '✅ Update imports to include Text components',
  '✅ Test semantic HTML structure',
  '✅ Verify accessibility compliance',
  '✅ Check responsive typography',
] as const;
