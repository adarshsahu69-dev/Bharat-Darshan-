export const colors = {
  teal: '#00A896',
  tealDark: '#00827A',
  coral: '#FF6B4A',
  beige: '#FBF9F5',
  cream: '#FFFFFF',
  sand: '#F5EFE9',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
  black: '#000000',
  red: '#EF4444',
  green: '#10B981',
} as const;

export type ColorName = keyof typeof colors;
export const RADIUS = 16;
export const CARD_BG = colors.beige;
