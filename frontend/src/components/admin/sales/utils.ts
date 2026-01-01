// frontend/src/components/admin/sales/utils.ts

export const CHART_COLORS = {
  primary: 'var(--color-info)',
  secondary: 'var(--color-success)',
  accent: 'var(--color-warning)',
  danger: 'var(--color-error)',
  purple: 'var(--color-purple)'
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

