# Table Component System

A production-ready, accessible, and flexible table component system for React applications.

## Features

- ✅ **Compound Component Pattern** - Flexible composition with Table.Head, Table.Body, Table.Row, etc.
- ✅ **Data-Driven Tables** - DataTable component for automatic rendering from data
- ✅ **Sorting** - Client-side and server-side sorting support
- ✅ **Row Selection** - Single and multiple row selection with checkboxes
- ✅ **Pagination** - Built-in pagination integration
- ✅ **Responsive** - Three responsive modes: scroll, cards, and stack
- ✅ **Accessibility** - Full WCAG 2.1 AA compliance with semantic HTML and ARIA
- ✅ **Variants** - Default, striped, and bordered styles
- ✅ **Density** - Compact and comfortable spacing options
- ✅ **Sticky Headers** - Fixed headers for scrollable tables
- ✅ **Loading States** - Built-in skeleton loading
- ✅ **Empty States** - Customizable empty state messages
- ✅ **Dark Mode** - Full dark mode support with theme integration
- ✅ **TypeScript** - Full type safety with generics

## Installation

The Table component is part of the UI component library. Import from:

```tsx
import { Table, DataTable } from '@/components/ui/Table';
```

## Basic Usage

### Manual Table (Compound Components)

```tsx
<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
      <Table.HeaderCell>Role</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {users.map((user, index) => (
      <Table.Row key={user.id} index={index}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.role}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

### DataTable (Data-Driven)

```tsx
const columns: TableColumn<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessor: 'name',
    sortable: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessor: 'email',
  },
  {
    id: 'role',
    header: 'Role',
    accessor: 'role',
    cell: (user) => <Badge>{user.role}</Badge>,
  },
];

<DataTable
  columns={columns}
  data={users}
  hoverable
  variant="striped"
/>
```

## Component API

### Table

Main table container component.

**Props:**
- `variant?: 'default' | 'striped' | 'bordered'` - Visual style variant
- `density?: 'compact' | 'comfortable'` - Row spacing density
- `hoverable?: boolean` - Enable row hover effects
- `stickyHeader?: boolean` - Make header sticky on scroll
- `maxHeight?: string` - Maximum height for scrollable table
- `caption?: ReactNode` - Table caption for accessibility
- `captionSide?: 'top' | 'bottom' | 'hidden'` - Caption position
- `className?: string` - Custom CSS classes

### Table.Head

Table header section.

**Props:**
- `sticky?: boolean` - Make header sticky (overrides table-level setting)

### Table.Body

Table body section.

### Table.Footer

Table footer section for totals/summaries.

### Table.Row

Table row component.

**Props:**
- `selected?: boolean` - Whether row is selected
- `index?: number` - Row index for striping
- `onClick?: () => void` - Click handler (makes row clickable)

### Table.HeaderCell

Table header cell.

**Props:**
- `align?: 'left' | 'center' | 'right'` - Text alignment
- `sortable?: boolean` - Enable sorting
- `sortDirection?: 'asc' | 'desc' | null` - Current sort direction
- `onSort?: () => void` - Sort handler
- `sticky?: boolean` - Make column sticky
- `width?: string` - Column width (CSS value)

### Table.Cell

Table data cell.

**Props:**
- `align?: 'left' | 'center' | 'right'` - Text alignment
- `sticky?: boolean` - Make column sticky

### Table.Empty

Empty state component.

**Props:**
- `message?: ReactNode` - Empty state message
- `colSpan?: number` - Number of columns to span

### Table.Loading

Loading skeleton component.

**Props:**
- `rows?: number` - Number of skeleton rows (default: 5)
- `columns?: number` - Number of skeleton columns (default: 3)

### DataTable

Data-driven table with built-in features.

**Props:**
- All Table props, plus:
- `columns: TableColumn<T>[]` - Column definitions
- `data: T[]` - Table data
- `getRowKey?: (row: T, index: number) => string | number` - Unique key extractor
- `selectable?: boolean` - Enable row selection
- `selectedRows?: Set<string | number>` - Selected row keys
- `onRowSelect?: (keys: Set<string | number>) => void` - Selection handler
- `sortBy?: string` - Current sort column (controlled)
- `sortDirection?: 'asc' | 'desc' | null` - Current sort direction (controlled)
- `onSort?: (columnId: string, direction: SortDirection) => void` - Sort handler
- `onRowClick?: (row: T, index: number) => void` - Row click handler
- `emptyMessage?: ReactNode` - Custom empty state
- `loading?: boolean` - Loading state
- `loadingRows?: number` - Number of loading skeleton rows
- `getRowProps?: (row: T, index: number) => HTMLAttributes` - Custom row props
- `pagination?: object` - Pagination configuration
  - `currentPage: number` - Current page number
  - `totalItems: number` - Total number of items
  - `itemsPerPage: number` - Items per page
  - `onPageChange: (page: number) => void` - Page change handler
  - `showPagination?: boolean` - Whether to show pagination (default: true)
- `responsive?: 'scroll' | 'stack' | 'cards'` - Responsive behavior mode
  - `scroll` - Horizontal scroll on mobile (default)
  - `stack` - Stack fields vertically on mobile
  - `cards` - Display as cards on mobile
- `mobileBreakpoint?: number` - Mobile breakpoint in pixels (default: 768)

## Column Definition

```tsx
interface TableColumn<T> {
  id: string;                              // Unique column ID
  header: ReactNode;                       // Column header
  accessor?: keyof T | ((row: T) => any); // Data accessor
  cell?: (row: T, index: number) => ReactNode; // Custom cell renderer
  align?: 'left' | 'center' | 'right';    // Alignment
  width?: string;                          // Column width
  sortable?: boolean;                      // Enable sorting
  sortFn?: (a: T, b: T) => number;        // Custom sort function
  sticky?: boolean;                        // Sticky column
  headerProps?: ThHTMLAttributes;          // Custom header props
  cellProps?: TdHTMLAttributes;            // Custom cell props
}
```

## Examples

### Sortable Table

```tsx
<DataTable
  columns={[
    { id: 'name', header: 'Name', accessor: 'name', sortable: true },
    { id: 'email', header: 'Email', accessor: 'email', sortable: true },
  ]}
  data={users}
/>
```

### Selectable Rows

```tsx
const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

<DataTable
  columns={columns}
  data={users}
  selectable
  selectedRows={selectedRows}
  onRowSelect={setSelectedRows}
/>
```

### Custom Cell Rendering

```tsx
const columns: TableColumn<User>[] = [
  {
    id: 'status',
    header: 'Status',
    cell: (user) => (
      <Badge variant={user.active ? 'success' : 'secondary'}>
        {user.active ? 'Active' : 'Inactive'}
      </Badge>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    align: 'right',
    cell: (user) => (
      <Button size="sm" onClick={() => handleEdit(user)}>
        Edit
      </Button>
    ),
  },
];
```

### Server-Side Sorting

```tsx
const [sortBy, setSortBy] = useState<string>('name');
const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

const handleSort = (columnId: string, direction: SortDirection) => {
  setSortBy(columnId);
  setSortDirection(direction);
  // Fetch sorted data from server
  fetchData({ sortBy: columnId, sortDirection: direction });
};

<DataTable
  columns={columns}
  data={users}
  sortBy={sortBy}
  sortDirection={sortDirection}
  onSort={handleSort}
/>
```

### Sticky Header with Scrolling

```tsx
<DataTable
  columns={columns}
  data={largeDataset}
  stickyHeader
  maxHeight="500px"
/>
```

### Loading State

```tsx
<DataTable
  columns={columns}
  data={users}
  loading={isLoading}
  loadingRows={10}
/>
```

### Empty State

```tsx
<DataTable
  columns={columns}
  data={[]}
  emptyMessage={
    <div>
      <Text>No results found</Text>
      <Button onClick={handleReset}>Reset Filters</Button>
    </div>
  }
/>
```

### Table with Footer

```tsx
<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Product</Table.HeaderCell>
      <Table.HeaderCell align="right">Price</Table.HeaderCell>
      <Table.HeaderCell align="right">Quantity</Table.HeaderCell>
      <Table.HeaderCell align="right">Total</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {items.map((item, index) => (
      <Table.Row key={item.id} index={index}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell align="right">${item.price}</Table.Cell>
        <Table.Cell align="right">{item.quantity}</Table.Cell>
        <Table.Cell align="right">${item.price * item.quantity}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
  <Table.Footer>
    <Table.Row>
      <Table.Cell colSpan={3}>Total</Table.Cell>
      <Table.Cell align="right">${total}</Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table>
```

### Clickable Rows

```tsx
<DataTable
  columns={columns}
  data={users}
  onRowClick={(user) => navigate(`/users/${user.id}`)}
  hoverable
/>
```

## Accessibility

The Table component follows WCAG 2.1 AA guidelines:

- ✅ Semantic HTML (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`)
- ✅ Proper `scope` attributes on header cells
- ✅ `aria-sort` attributes for sortable columns
- ✅ Keyboard navigation for interactive elements
- ✅ Screen reader announcements for sorting and selection
- ✅ Focus management for clickable rows
- ✅ Accessible empty and loading states

## Styling

The Table component uses Tailwind CSS and supports:

- Light and dark modes
- Custom color schemes via CSS variables
- Responsive behavior (horizontal scroll on mobile)
- Hover and active states
- Smooth transitions

## Performance

- Optimized rendering with React.memo where appropriate
- Efficient sorting algorithms
- Virtual scrolling support (can be added for large datasets)
- Minimal re-renders with proper key management

## Best Practices

1. **Always provide a caption** for accessibility (can be hidden visually)
2. **Use getRowKey** for stable row identification
3. **Prefer DataTable** for data-driven tables
4. **Use Manual Table** for complex custom layouts
5. **Enable hoverable** for better UX on clickable rows
6. **Use sticky headers** for long tables
7. **Provide meaningful empty states**
8. **Show loading states** during data fetching
9. **Use proper alignment** (numbers right-aligned, text left-aligned)
10. **Keep columns sortable** when possible

## Integration with Pagination

The DataTable component has built-in pagination support:

```tsx
import { useState } from 'react';

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

<DataTable
  columns={columns}
  data={allData}
  pagination={{
    currentPage,
    totalItems: allData.length,
    itemsPerPage,
    onPageChange: setCurrentPage,
  }}
/>
```

For server-side pagination:

```tsx
const [currentPage, setCurrentPage] = useState(1);
const [data, setData] = useState([]);
const [totalItems, setTotalItems] = useState(0);
const itemsPerPage = 10;

useEffect(() => {
  fetchData(currentPage, itemsPerPage).then(response => {
    setData(response.data);
    setTotalItems(response.total);
  });
}, [currentPage]);

<DataTable
  columns={columns}
  data={data}
  pagination={{
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange: setCurrentPage,
  }}
/>
```

## Responsive Behavior

The DataTable supports three responsive modes:

### 1. Scroll (Default)
Horizontal scroll on mobile devices:
```tsx
<DataTable
  columns={columns}
  data={data}
  responsive="scroll"
/>
```

### 2. Cards
Transform into cards on mobile:
```tsx
<DataTable
  columns={columns}
  data={data}
  responsive="cards"
/>
```

### 3. Stack
Stack fields vertically on mobile:
```tsx
<DataTable
  columns={columns}
  data={data}
  responsive="stack"
/>
```

### Custom Breakpoint
```tsx
<DataTable
  columns={columns}
  data={data}
  responsive="cards"
  mobileBreakpoint={640} // Custom breakpoint in pixels
/>
```

## Theme Support

The Table component fully supports dark mode and uses CSS variables for theming:

```css
/* Light mode colors */
--color-surface: ...
--color-surface-elevated: ...
--color-border-light: ...
--color-copy: ...

/* Dark mode colors */
--color-surface-dark: ...
--color-surface-elevated-dark: ...
--color-border-dark: ...
--color-copy-dark: ...
```

All table elements automatically adapt to the current theme using Tailwind's `dark:` variants.

## TypeScript

The Table component is fully typed with generics:

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

const columns: TableColumn<User>[] = [
  // TypeScript will infer correct types
  { id: 'name', accessor: 'name' }, // ✅ Valid
  { id: 'invalid', accessor: 'invalid' }, // ❌ Type error
];

<DataTable<User>
  columns={columns}
  data={users}
  onRowClick={(user) => {
    // user is typed as User
    console.log(user.name);
  }}
/>
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- [Pagination](../Pagination/README.md) - For paginated tables
- [Card](../Card/README.md) - For wrapping tables
- [Button](../Button/README.md) - For table actions
- [Badge](../Badge/README.md) - For status indicators
- [Checkbox](../Form/README.md) - For row selection

## License

Part of the internal UI component library.
