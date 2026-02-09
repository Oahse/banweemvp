import React from 'react';
import { 
  Text, 
  Display, 
  Heading, 
  Body, 
  Caption, 
  Label, 
  Code, 
  Quote 
} from './Text';

/**
 * Text Component Demo
 * 
 * This is a practical demonstration of how to use the Text component
 * in a real application context. Copy and adapt these patterns for your components.
 */
export const TextDemo = () => {
  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <Display tone="primary">
          Welcome to Your App
        </Display>
        <Body variant="body-lg" tone="secondary" align="center">
          A comprehensive text component system for consistent typography
        </Body>
      </section>

      {/* Product Card Example */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-lg shadow-md">
          <Heading level={3} className="mb-2">
            Premium Product
          </Heading>
          <Body variant="body-sm" tone="secondary" className="mb-4">
            High-quality product with amazing features and benefits that will enhance your experience.
          </Body>
          <div className="flex justify-between items-center mb-4">
            <Text variant="body-lg" weight="semibold" tone="primary">
              $99.99
            </Text>
            <Caption tone="success">In Stock</Caption>
          </div>
          <div className="space-y-2">
            <Caption>SKU: PRD-001</Caption>
            <Caption>Category: Electronics</Caption>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg shadow-md">
          <Heading level={3} className="mb-2">
            Standard Product
          </Heading>
          <Body variant="body-sm" tone="secondary" className="mb-4">
            Reliable product with essential features for everyday use.
          </Body>
          <div className="flex justify-between items-center mb-4">
            <Text variant="body-lg" weight="semibold" tone="primary">
              $49.99
            </Text>
            <Caption tone="warning">Limited Stock</Caption>
          </div>
          <div className="space-y-2">
            <Caption>SKU: PRD-002</Caption>
            <Caption>Category: Accessories</Caption>
          </div>
        </div>
      </section>

      {/* Form Example */}
      <section className="bg-surface p-6 rounded-lg shadow-md">
        <Heading level={2} className="mb-6">
          Contact Form
        </Heading>
        <form className="space-y-4 max-w-md">
          <div>
          <Label htmlFor="name" className="block mb-1">
            Full Name
          </Label>
            <Caption tone="secondary" className="mb-2">
              Enter your first and last name
            </Caption>
            {/* Input field would go here */}
          </div>

          <div>
          <Label htmlFor="email" className="block mb-1">
            Email Address
          </Label>
            <Caption tone="secondary" className="mb-2">
              We'll use this to contact you
            </Caption>
            {/* Input field would go here */}
          </div>

          <div>
          <Label htmlFor="message" className="block mb-1">
            Message
          </Label>
            <Caption tone="secondary" className="mb-2">
              Tell us what you're thinking
            </Caption>
            {/* Textarea would go here */}
          </div>

          {/* Status Messages */}
          <div className="space-y-2">
            <Text variant="body-sm" tone="success" weight="medium">
              ✓ Form submitted successfully!
            </Text>
            <Text variant="body-sm" tone="danger" weight="medium">
              ⚠ Please fill out all required fields
            </Text>
            <Text variant="body-sm" tone="warning" weight="medium">
              ⚡ Email already exists
            </Text>
          </div>
        </form>
      </section>

      {/* Dashboard Example */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-lg shadow-md text-center">
          <Heading level={3} tone="primary" className="mb-2">
            1,234
          </Heading>
          <Body variant="body-sm" tone="secondary">
            Total Users
          </Body>
        </div>

        <div className="bg-surface p-6 rounded-lg shadow-md text-center">
          <Heading level={3} tone="success" className="mb-2">
            $45,678
          </Heading>
          <Body variant="body-sm" tone="secondary">
            Revenue
          </Body>
        </div>

        <div className="bg-surface p-6 rounded-lg shadow-md text-center">
          <Heading level={3} tone="warning" className="mb-2">
            89%
          </Heading>
          <Body variant="body-sm" tone="secondary">
            Conversion Rate
          </Body>
        </div>
      </section>

      {/* Navigation Example */}
      <section>
        <Heading level={2} className="mb-4">
          Navigation Menu
        </Heading>
        <nav className="flex flex-col space-y-2">
          <Text variant="body" weight="medium" tone="primary" className="cursor-pointer">
            📊 Dashboard
          </Text>
          <Text variant="body" weight="medium" tone="default" className="cursor-pointer">
            🛍️ Products
          </Text>
          <Text variant="body" weight="medium" tone="default" className="cursor-pointer">
            📦 Orders
          </Text>
          <Text variant="body" weight="medium" tone="default" className="cursor-pointer">
            👥 Customers
          </Text>
          <Text variant="body" weight="medium" tone="default" className="cursor-pointer">
            ⚙️ Settings
          </Text>
        </nav>
      </section>

      {/* Code Examples */}
      <section>
        <Heading level={2} className="mb-4">
          Code Examples
        </Heading>
        <div className="space-y-4">
          <div>
          <Label>JavaScript Example</Label>
            <Code className="block p-4 bg-surface rounded">
              {`const greeting = "Hello, World!";
console.log(greeting);`}
            </Code>
          </div>

          <div>
          <Label>TypeScript Example</Label>
            <Code className="block p-4 bg-surface rounded">
              {`interface User {
  name: string;
  email: string;
}

const user: User = {
  name: "John Doe",
  email: "john@example.com"
};`}
            </Code>
          </div>
        </div>
      </section>

      {/* Typography Showcase */}
      <section>
        <Heading level={2} className="mb-4">
          Typography Showcase
        </Heading>
        <div className="space-y-4">
          <Display>Display Text</Display>
          <Display variant="display-sm">Display Small</Display>
          <Heading level={1}>Heading 1</Heading>
          <Heading level={2}>Heading 2</Heading>
          <Heading level={3}>Heading 3</Heading>
          <Heading level={4}>Heading 4</Heading>
          <Heading level={5}>Heading 5</Heading>
          <Heading level={6}>Heading 6</Heading>
          <Body variant="body-lg">Large Body Text</Body>
          <Body variant="body">Regular Body Text</Body>
          <Body variant="body-sm">Small Body Text</Body>
          <Label>Form Label</Label>
          <Caption>Caption Text</Caption>
          <Quote>
            "The best way to predict the future is to invent it."
          </Quote>
        </div>
      </section>

      {/* Color Variations */}
      <section>
        <Heading level={2} className="mb-4">
          Color Variations
        </Heading>
        <div className="space-y-2">
          <Text tone="default">Default text color</Text>
          <Text tone="primary">Primary color</Text>
          <Text tone="secondary">Secondary/muted text</Text>
          <Text tone="success">Success message</Text>
          <Text tone="warning">Warning message</Text>
          <Text tone="danger">Error message</Text>
          <Text tone="info">Information message</Text>
          <Text tone="inverse" className="bg-copy p-2 rounded">
            Inverse text (dark background)
          </Text>
        </div>
      </section>

      {/* Text Styling Options */}
      <section>
        <Heading level={2} className="mb-4">
          Text Styling Options
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Font Weights</Label>
            <Text weight="thin">Thin (100)</Text>
            <Text weight="light">Light (300)</Text>
            <Text weight="normal">Normal (400)</Text>
            <Text weight="medium">Medium (500)</Text>
            <Text weight="semibold">Semibold (600)</Text>
            <Text weight="bold">Bold (700)</Text>
            <Text weight="extrabold">Extra Bold (800)</Text>
          </div>

          <div className="space-y-2">
            <Label>Text Transformations</Label>
            <Text transform="none">Normal case</Text>
            <Text transform="uppercase">UPPERCASE</Text>
            <Text transform="lowercase">lowercase</Text>
            <Text transform="capitalize">Capitalized</Text>
          </div>
        </div>
      </section>

      {/* Text Truncation */}
      <section>
        <Heading level={2} className="mb-4">
          Text Truncation
        </Heading>
        <div className="space-y-4 max-w-md">
          <div>
            <Label>No Truncation</Label>
            <Text truncate="none">
              This text will wrap normally and display in full without any truncation applied.
            </Text>
          </div>

          <div>
            <Label>Single Line Truncation</Label>
            <Text truncate="single" className="w-64">
              This text will be truncated with an ellipsis if it's too long for the container.
            </Text>
          </div>

          <div>
            <Label>Multi-line Clamping (3 lines)</Label>
            <Text truncate="3-lines" className="w-64">
              This text will be truncated after 3 lines with an ellipsis. It's perfect for card descriptions and other UI elements where you want to limit the vertical space while still providing plenty of content.
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TextDemo;
