/**
 * Layout Primitives Index
 * 
 * Central export point for all layout primitive components
 * Layout Primitive System - Starting with Module 82
 */

// Layout Components
export { Container, getContainerSize, getContainerPadding, createResponsiveContainer, containerPresets } from './Container';
export type { ContainerProps, ContainerSize, ContainerBackground, ContainerAlignment, ContainerPadding } from './Container';

export { Stack, stackUtils } from './Stack';
export type { StackProps, StackSpacing, StackAlignment, StackDistribution, DividerPosition } from './Stack';

export { HStack, hstackUtils } from './HStack';
export type { HStackProps, HStackSpacing, HStackAlignment, HStackDistribution, HStackWrap, HStackPreset } from './HStack';

export { default as Grid, gridUtils } from './Grid';
export type { GridProps, GridSpacing, GridAlignment, GridJustification, GridBreakpoint, GridAuto, GridPreset, ResponsiveGridConfig } from './Grid';

export { default as GridItem, gridItemUtils } from './GridItem';
export type { GridItemProps, GridItemAlignment, GridItemJustification, GridItemOverflow, GridItemPreset, GridItemBreakpoint, ResponsiveGridItemConfig } from './GridItem';

export { default as Spacer } from './Spacer';
export type { SpacerProps } from './Spacer';

// export { Divider } from './Divider';
// export type { DividerProps } from './Divider';

export { Flex, flexUtils } from './Flex';
export type { FlexProps, FlexDirection, FlexWrap, FlexAlignment, FlexJustification, FlexSpacing, FlexSize, FlexPreset, ResponsiveFlexConfig } from './Flex';

// Test Components
// Test components are excluded from production exports
// They are available for testing purposes but not bundled in production builds
// export { ContainerTest } from './__tests__/ContainerTest';
// export { StackTest } from './__tests__/StackTest';
// export { HStackTest } from './__tests__/HStackTest';
// export { default as GridTest } from './__tests__/GridTest';
// export { default as GridItemTest } from './__tests__/GridItemTest';
// export { default as SpacerTest } from './__tests__/SpacerTest';
// export { default as DividerTest } from './__tests__/DividerTest';
// export { default as FlexTest } from './__tests__/FlexTest';
