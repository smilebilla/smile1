/**
 * Corp Astro UI Library - Cards Index
 * 
 * Card system components for Corp Astro applications.
 * Essential components for displaying astrology content.
 * 
 * @module Cards
 * @version 1.0.0
 * @since 2024
 */

// Card components
export { Card } from './Card';
export type { CardProps, CardVariant, CardSize, CardPressType } from './Card';

export { CardHeader } from './CardHeader';
export type { CardHeaderProps } from './CardHeader';

export { CardContent } from './CardContent';
export type { CardContentProps } from './CardContent';

export { CardFooter } from './CardFooter';
export type { CardFooterProps, CardFooterAlignment } from './CardFooter';

export { CardImage } from './CardImage';
export type { CardImageProps, CardImageAspectRatio } from './CardImage';

export { CardStack } from './CardStack';
export type { CardStackProps, CardStackItem } from './CardStack';

// Import for default export
import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { CardImage } from './CardImage';
import { CardStack } from './CardStack';

// Re-export all card components as default
export default {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardImage,
  CardStack,
};
