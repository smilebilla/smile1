import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Theme
import { useTheme } from '../../components/foundations/themes/useTheme';

// Navigation Components
import {
  BottomNavContainer,
  // Bottom Navigation Components
  BottomNavigation,
  BottomNavItem,
  BottomNavOrb,
  FloatingFAB,
  HeaderBase,
  HeaderOverlay,
  // Floating Navigation Components
  FloatingOrb as NavigationFloatingOrb,
  // Header Components
  PrimaryHeader,
  SearchHeader,
  SectionHeader,
  StatusBarBlur,
  // Status Bar Components
  StatusBarComponent,
  StatusBarOverlay,
  // Tab Components
  TabNavigation,
} from '../../components/composite/navigation';

// Buttons
import ButtonBase from '../../components/buttons/ButtonBase';
import ButtonFloating from '../../components/buttons/ButtonFloating';
import ButtonGhost from '../../components/buttons/ButtonGhost';
import ButtonGroup from '../../components/buttons/ButtonGroup';
import ButtonIcon from '../../components/buttons/ButtonIcon';
import ButtonLink from '../../components/buttons/ButtonLink';
import ButtonPrimary from '../../components/buttons/ButtonPrimary';
import ButtonSecondary from '../../components/buttons/ButtonSecondary';
import ButtonToggle from '../../components/buttons/ButtonToggle';

// Cards
import Card from '../../components/cards/Card';
import CardContent from '../../components/cards/CardContent';
import CardFooter from '../../components/cards/CardFooter';
import CardHeader from '../../components/cards/CardHeader';
import CardImage from '../../components/cards/CardImage';
import { CardStack } from '../../components/cards/CardStack';

// Inputs
import CodeInput from '../../components/inputs/CodeInput';
import DateInput from '../../components/inputs/DateInput';
import EmailInput from '../../components/inputs/EmailInput';
import { FileInput } from '../../components/inputs/FileInput';
import NumberInput from '../../components/inputs/NumberInput';
import PasswordInput from '../../components/inputs/PasswordInput';
import PhoneInput from '../../components/inputs/PhoneInput';
import SearchInput from '../../components/inputs/SearchInput';
import SelectInput from '../../components/inputs/SelectInput';
import SliderInput from '../../components/inputs/SliderInput';
import TextArea from '../../components/inputs/TextArea';
import TextInput from '../../components/inputs/TextInput';
import TimeInput from '../../components/inputs/TimeInput';
import URLInput from '../../components/inputs/URLInput';

// Foundations (example: show color swatches, font samples, spacing)
import { deepSpaceColors } from '../../components/foundations/tokens/colors/DeepSpaceColors';
import { LuxuryGolds } from '../../components/foundations/tokens/colors/LuxuryGolds';
import { ProfessionalGrays } from '../../components/foundations/tokens/colors/ProfessionalGrays';
import { RoyalPurples } from '../../components/foundations/tokens/colors/RoyalPurples';
import { SignatureBlues } from '../../components/foundations/tokens/colors/SignatureBlues';

// Typography Tokens
import { fontFamilies } from '../../components/foundations/tokens/typography/FontFamilies';
import { fontSizes } from '../../components/foundations/tokens/typography/FontSizes';
import { fontWeights } from '../../components/foundations/tokens/typography/FontWeights';
import { letterSpacings } from '../../components/foundations/tokens/typography/LetterSpacing';
import { lineHeights } from '../../components/foundations/tokens/typography/LineHeights';

// Spacing Tokens
import { semanticSpacing, spacing } from '../../components/foundations/tokens/spacing/SpacingScale';

// Gradient Tokens
import {
  buttonFloatingGradient,
  destructiveButtonGradient,
  // Floating Gradients
  floatingElementGradient,
  floatingGlowGradient,
  floatingTrailGradient,
  ghostButtonGradient,
  heroCardGradient,
  heroGradient,
  heroSectionGradient,
  // Navigation Gradients
  navigationGradients,
  primaryButtonGradient,
  secondaryButtonGradient,
  successButtonGradient
} from '../../components/foundations/tokens/gradients';

// Typography
import BodyText from '../../components/typography/BodyText';
import Caption from '../../components/typography/Caption';
import Code from '../../components/typography/Code';
import DisplayText from '../../components/typography/DisplayText';
import Heading from '../../components/typography/Heading';
import Label from '../../components/typography/Label';
import Link from '../../components/typography/Link';

// Layout
import {
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Spacer,
  Stack
} from '../../components/layout';

// Feedback Components
import {
  Alert,
  Badge,
  CircularProgressBar,
  CosmicProgressBar,
  LinearProgressBar,
  LoadingSpinner
} from '../../components/feedback';

// Controls

// Advanced Components

import SegmentedTabs, { SegmentedTabsAnimation, SegmentedTabsSize, SegmentedTabsVariant } from '../../components/composite/navigation/tab/SegmentedTabs';

const DemoHomePage: React.FC = () => {
  // Theme hook
  const { borderRadius, colors } = useTheme();
  
  // State for feedback components
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [alertVariant, setAlertVariant] = React.useState<'info' | 'success' | 'warning' | 'error'>('info');
  
  // State for progress bars
  const [progressValue, setProgressValue] = React.useState(25);
  const [indeterminateProgress, setIndeterminateProgress] = React.useState(false);
  
  // State for loading spinner
  const [showLoadingSpinner, setShowLoadingSpinner] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState('Loading...');
  
  // State for controls
  const [toggleValue, setToggleValue] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('option1');
  const [sliderValue, setSliderValue] = React.useState(50);
  const [rangeValue, setRangeValue] = React.useState([25, 75]);
  const [ratingValue, setRatingValue] = React.useState(3);
  const [stepperValue, setStepperValue] = React.useState(1);
  const [switchValue, setSwitchValue] = React.useState(false);
  const [segmentedValue, setSegmentedValue] = React.useState('option1');
  const [colorValue, setColorValue] = React.useState('#2E86DE');
  
  // State for navigation components
  const [activeTab, setActiveTab] = React.useState('home');
  const [activeBottomTab, setActiveBottomTab] = React.useState('home');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSearchHeader, setShowSearchHeader] = React.useState(false);
  const [showFloatingOrb, setShowFloatingOrb] = React.useState(false);
  const [showFloatingFAB, setShowFloatingFAB] = React.useState(false);
  
  // State for advanced components
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(false);
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  const [popoverVisible, setPopoverVisible] = React.useState(false);
  const [accordionOpen, setAccordionOpen] = React.useState(false);
  const [skeletonLoading, setSkeletonLoading] = React.useState(true);
  const [toastVisible, setToastVisible] = React.useState(false);
  const [constellationVisible, setConstellationVisible] = React.useState(false);
  const [orbitalVisible, setOrbitalVisible] = React.useState(false);
  const [particlesVisible, setParticlesVisible] = React.useState(false);
  const [floatingVisible, setFloatingVisible] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [tabNavIndex, setTabNavIndex] = React.useState(0);
  const tabNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Search' },
    { id: 'profile', label: 'Profile' },
  ];
  
  // Alert handlers
  const showAlert = (variant: 'info' | 'success' | 'warning' | 'error') => {
    console.log('Showing alert:', variant);
    setAlertVariant(variant);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  // Auto-hide alert after 5 seconds
  React.useEffect(() => {
    if (alertVisible) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertVisible]);

  // DEBUG: Log major component imports to check for undefined
  console.log('ButtonPrimary:', ButtonPrimary);
  console.log('ButtonSecondary:', ButtonSecondary);
  console.log('ButtonGhost:', ButtonGhost);
  console.log('ButtonFloating:', ButtonFloating);
  console.log('ButtonToggle:', ButtonToggle);
  console.log('ButtonLink:', ButtonLink);
  console.log('ButtonIcon:', ButtonIcon);
  console.log('ButtonGroup:', ButtonGroup);
  console.log('ButtonBase:', ButtonBase);
  console.log('Card:', Card);
  console.log('CardHeader:', CardHeader);
  console.log('CardContent:', CardContent);
  console.log('CardFooter:', CardFooter);
  console.log('CardImage:', CardImage);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 24 }}>


      {/* Step 1: Buttons */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: '#000' }}>Step 1: Buttons</Text>
      
      {/* Primary button - All variants */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>ButtonPrimary - All Variants</Text>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 8, marginBottom: 4, color: '#000' }}>Sizes:</Text>
      <ButtonPrimary onPress={() => {}} config={{ size: 'small' }}>Small Primary</ButtonPrimary>
      <ButtonPrimary onPress={() => {}} config={{ size: 'medium' }}>Medium Primary</ButtonPrimary>
      <ButtonPrimary onPress={() => {}} config={{ size: 'large' }}>Large Primary</ButtonPrimary>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Variants:</Text>
      <ButtonPrimary onPress={() => {}} config={{ variant: 'default' }}>Default Primary</ButtonPrimary>
      <ButtonPrimary onPress={() => {}} config={{ variant: 'wide' }}>Wide Primary</ButtonPrimary>
      <ButtonPrimary onPress={() => {}} config={{ variant: 'compact' }}>Compact Primary</ButtonPrimary>
      
      {/* Secondary button - All variants */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>ButtonSecondary - All Variants</Text>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 8, marginBottom: 4, color: '#000' }}>Sizes:</Text>
      <ButtonSecondary onPress={() => {}} config={{ size: 'small' }}>Small Secondary</ButtonSecondary>
      <ButtonSecondary onPress={() => {}} config={{ size: 'medium' }}>Medium Secondary</ButtonSecondary>
      <ButtonSecondary onPress={() => {}} config={{ size: 'large' }}>Large Secondary</ButtonSecondary>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Variants:</Text>
      <ButtonSecondary onPress={() => {}} config={{ variant: 'default' }}>Default Secondary</ButtonSecondary>
      <ButtonSecondary onPress={() => {}} config={{ variant: 'outlined' }}>Outlined Secondary</ButtonSecondary>
      <ButtonSecondary onPress={() => {}} config={{ variant: 'glass' }}>Glass Secondary</ButtonSecondary>
      
      {/* Ghost button */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>ButtonGhost</Text>
      <ButtonGhost onPress={() => {}}>Ghost Button</ButtonGhost>
      
      {/* Floating button */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>ButtonFloating</Text>
      <ButtonFloating onPress={() => {}}><Text>+</Text></ButtonFloating>
      
      {/* Toggle button */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>ButtonToggle</Text>
      <ButtonToggle active={true} onPress={() => {}}>Toggle</ButtonToggle>
      
      {/* Link button */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>ButtonLink</Text>
      <ButtonLink onPress={() => {}}>Link</ButtonLink>
      
      {/* Icon button */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>ButtonIcon</Text>
      <ButtonIcon onPress={() => {}}><Text>★</Text></ButtonIcon>
      
      {/* Button group */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>ButtonGroup</Text>
              <ButtonGroup>
          <ButtonBase onPress={() => {}}>Base 1</ButtonBase>
          <ButtonBase onPress={() => {}}>Base 2</ButtonBase>
        </ButtonGroup>
        
        {/* Buttons with Theme Border Radius */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Buttons with Theme Border Radius</Text>
        
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Small Border Radius ({borderRadius.sm}px)</Text>
        <View style={{ 
          backgroundColor: colors.brand.primary, 
          borderRadius: borderRadius.sm, 
          padding: 12, 
          marginBottom: 8,
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Small Radius Button</Text>
        </View>
        
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Medium Border Radius ({borderRadius.md}px)</Text>
        <View style={{ 
          backgroundColor: colors.brand.primary, 
          borderRadius: borderRadius.md, 
          padding: 12, 
          marginBottom: 8,
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Medium Radius Button</Text>
        </View>
        
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Large Border Radius ({borderRadius.lg}px)</Text>
        <View style={{ 
          backgroundColor: colors.brand.primary, 
          borderRadius: borderRadius.lg, 
          padding: 12, 
          marginBottom: 8,
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Large Radius Button</Text>
        </View>
        
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Extra Large Border Radius ({borderRadius.xl}px)</Text>
        <View style={{ 
          backgroundColor: colors.brand.primary, 
          borderRadius: borderRadius.xl, 
          padding: 12, 
          marginBottom: 8,
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Extra Large Radius Button</Text>
        </View>
        
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Full Border Radius (Circular)</Text>
        <View style={{ 
          backgroundColor: colors.brand.primary, 
          borderRadius: borderRadius.full, 
          width: 80, 
          height: 80, 
          marginBottom: 8,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>Circular</Text>
        </View>

      {/* Underline after Buttons */}
      <View style={{ height: 2, backgroundColor: '#E5E7EB', marginVertical: 24 }} />

      {/* Step 2: Cards */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24 }}>Step 2: Cards</Text>
      
      {/* Standard card */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>Card</Text>
      <Card>
        <CardHeader title="Card Header" />
        <CardImage source={{ uri: 'https://placekitten.com/200/200' }} />
        <CardContent>
          <Text>This is card content.</Text>
        </CardContent>
        <CardFooter>
          <Text>Card Footer</Text>
        </CardFooter>
      </Card>
      
      {/* Card stack */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>CardStack</Text>
      <CardStack
        items={[
          { id: '1', content: <Card><CardContent><Text>Stacked Card 1</Text></CardContent></Card> },
          { id: '2', content: <Card><CardContent><Text>Stacked Card 2</Text></CardContent></Card> },
        ]}
      />

      {/* Underline after Cards */}
      <View style={{ height: 2, backgroundColor: '#E5E7EB', marginVertical: 24 }} />

      {/* Step 3: Foundations */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24 }}>Step 3: Foundations</Text>
      
      {/* Color swatches */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>SignatureBlues</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12, flexWrap: 'wrap' }}>
        <View style={{ width: 40, height: 40, backgroundColor: SignatureBlues.primary, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: SignatureBlues.light, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: SignatureBlues.glow, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: SignatureBlues.accent, marginRight: 8, marginBottom: 8 }} />
      </View>
      
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>ProfessionalGrays</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12, flexWrap: 'wrap' }}>
        <View style={{ width: 40, height: 40, backgroundColor: ProfessionalGrays.white, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: ProfessionalGrays.light, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: ProfessionalGrays.medium, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: ProfessionalGrays.text, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: ProfessionalGrays.muted, marginRight: 8, marginBottom: 8 }} />
      </View>
      
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>RoyalPurples</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12, flexWrap: 'wrap' }}>
        <View style={{ width: 40, height: 40, backgroundColor: RoyalPurples.deep, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: RoyalPurples.royal, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: RoyalPurples.light, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: RoyalPurples.glow, marginRight: 8, marginBottom: 8 }} />
      </View>
      
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>LuxuryGolds</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12, flexWrap: 'wrap' }}>
        <View style={{ width: 40, height: 40, backgroundColor: LuxuryGolds.pure, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: LuxuryGolds.champagne, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: LuxuryGolds.bronze, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: LuxuryGolds.shimmer, marginRight: 8, marginBottom: 8 }} />
      </View>
      
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>DeepSpaceColors</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12, flexWrap: 'wrap' }}>
        <View style={{ width: 40, height: 40, backgroundColor: deepSpaceColors.void, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: deepSpaceColors.deep, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: deepSpaceColors.dark, marginRight: 8, marginBottom: 8 }} />
        <View style={{ width: 40, height: 40, backgroundColor: deepSpaceColors.medium, marginRight: 8, marginBottom: 8 }} />
      </View>
      
      {/* Typography */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>Typography</Text>
      
      {/* Font Families */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4 }}>Font Families</Text>
      <Text style={{ fontFamily: fontFamilies.display.family, fontSize: 16 }}>Display: {fontFamilies.display.family}</Text>
      <Text style={{ fontFamily: fontFamilies.heading.family, fontSize: 16 }}>Heading: {fontFamilies.heading.family}</Text>
      <Text style={{ fontFamily: fontFamilies.body.family, fontSize: 16 }}>Body: {fontFamilies.body.family}</Text>
      <Text style={{ fontFamily: fontFamilies.accent.family, fontSize: 16 }}>Accent: {fontFamilies.accent.family}</Text>
      <Text style={{ fontFamily: fontFamilies.monospace.family, fontSize: 16 }}>Monospace: {fontFamilies.monospace.family}</Text>
      
      {/* Font Sizes */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4 }}>Font Sizes</Text>
      <Text style={{ fontSize: fontSizes.hero.size }}>Hero: {fontSizes.hero.size}px</Text>
      <Text style={{ fontSize: fontSizes.h1.size }}>H1: {fontSizes.h1.size}px</Text>
      <Text style={{ fontSize: fontSizes.h2.size }}>H2: {fontSizes.h2.size}px</Text>
      <Text style={{ fontSize: fontSizes.h3.size }}>H3: {fontSizes.h3.size}px</Text>
      <Text style={{ fontSize: fontSizes.body.size }}>Body: {fontSizes.body.size}px</Text>
      <Text style={{ fontSize: fontSizes.small.size }}>Small: {fontSizes.small.size}px</Text>
      <Text style={{ fontSize: fontSizes.caption.size }}>Caption: {fontSizes.caption.size}px</Text>
      <Text style={{ fontSize: fontSizes.micro.size }}>Micro: {fontSizes.micro.size}px</Text>
      
      {/* Font Weights */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4 }}>Font Weights</Text>
      <Text style={{ fontWeight: fontWeights.light.weight as any }}>Light: {fontWeights.light.weight}</Text>
      <Text style={{ fontWeight: fontWeights.regular.weight as any }}>Regular: {fontWeights.regular.weight}</Text>
      <Text style={{ fontWeight: fontWeights.medium.weight as any }}>Medium: {fontWeights.medium.weight}</Text>
      <Text style={{ fontWeight: fontWeights.semiBold.weight as any }}>SemiBold: {fontWeights.semiBold.weight}</Text>
      <Text style={{ fontWeight: fontWeights.bold.weight as any }}>Bold: {fontWeights.bold.weight}</Text>
      
      {/* Line Heights */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4 }}>Line Heights</Text>
      <Text style={{ lineHeight: lineHeights.tight.value }}>Tight: {lineHeights.tight.value}</Text>
      <Text style={{ lineHeight: lineHeights.normal.value }}>Normal: {lineHeights.normal.value}</Text>
      <Text style={{ lineHeight: lineHeights.relaxed.value }}>Relaxed: {lineHeights.relaxed.value}</Text>
      <Text style={{ lineHeight: lineHeights.loose.value }}>Loose: {lineHeights.loose.value}</Text>
      
      {/* Letter Spacing */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4 }}>Letter Spacing</Text>
      <Text style={{ letterSpacing: letterSpacings.tight.value }}>Tight: {letterSpacings.tight.value}px</Text>
      <Text style={{ letterSpacing: letterSpacings.normal.value }}>Normal: {letterSpacings.normal.value}px</Text>
      <Text style={{ letterSpacing: letterSpacings.wide.value }}>Wide: {letterSpacings.wide.value}px</Text>
      
      {/* Spacing */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Spacing</Text>
      
      {/* Spacing Scale */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Spacing Scale</Text>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>XXS: {spacing.xxs}px</Text>
        <View style={{ height: spacing.xxs, backgroundColor: '#E5E7EB', marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>XS: {spacing.xs}px</Text>
        <View style={{ height: spacing.xs, backgroundColor: '#E5E7EB', marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>SM: {spacing.sm}px</Text>
        <View style={{ height: spacing.sm, backgroundColor: '#E5E7EB', marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>MD: {spacing.md}px</Text>
        <View style={{ height: spacing.md, backgroundColor: '#E5E7EB', marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>LG: {spacing.lg}px</Text>
        <View style={{ height: spacing.lg, backgroundColor: '#E5E7EB', marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>XL: {spacing.xl}px</Text>
        <View style={{ height: spacing.xl, backgroundColor: '#E5E7EB', marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>XXL: {spacing.xxl}px</Text>
        <View style={{ height: spacing.xxl, backgroundColor: '#E5E7EB', marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>XXXL: {spacing.xxxl}px</Text>
        <View style={{ height: spacing.xxxl, backgroundColor: '#E5E7EB', marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>Huge: {spacing.huge}px</Text>
        <View style={{ height: spacing.huge, backgroundColor: '#E5E7EB', marginVertical: 4 }} />
      </View>
      
      {/* Semantic Spacing */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Semantic Spacing</Text>
      <Text style={{ color: '#000' }}>Content Tight: {semanticSpacing.content.tight}px</Text>
      <Text style={{ color: '#000' }}>Content Normal: {semanticSpacing.content.normal}px</Text>
      <Text style={{ color: '#000' }}>Content Relaxed: {semanticSpacing.content.relaxed}px</Text>
      <Text style={{ color: '#000' }}>Content Loose: {semanticSpacing.content.loose}px</Text>
      <Text style={{ color: '#000' }}>Component Padding: {semanticSpacing.component.padding}px</Text>
      <Text style={{ color: '#000' }}>Component Margin: {semanticSpacing.component.margin}px</Text>
      <Text style={{ color: '#000' }}>Component Gap: {semanticSpacing.component.gap}px</Text>
      <Text style={{ color: '#000' }}>Layout Section: {semanticSpacing.layout.section}px</Text>
      <Text style={{ color: '#000' }}>Layout Container: {semanticSpacing.layout.container}px</Text>
      <Text style={{ color: '#000' }}>Layout Page: {semanticSpacing.layout.page}px</Text>
      <Text style={{ color: '#000' }}>Interactive Touch: {semanticSpacing.interactive.touch}px</Text>
      <Text style={{ color: '#000' }}>Interactive Hover: {semanticSpacing.interactive.hover}px</Text>
      <Text style={{ color: '#000' }}>Interactive Focus: {semanticSpacing.interactive.focus}px</Text>
      
      {/* Border Radius */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Border Radius</Text>
      
      {/* Border Radius Scale */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Border Radius Scale</Text>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>XS: {borderRadius.xs}px</Text>
        <View style={{ height: 40, backgroundColor: '#E5E7EB', borderRadius: borderRadius.xs, marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>SM: {borderRadius.sm}px</Text>
        <View style={{ height: 40, backgroundColor: '#E5E7EB', borderRadius: borderRadius.sm, marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>MD: {borderRadius.md}px</Text>
        <View style={{ height: 40, backgroundColor: '#E5E7EB', borderRadius: borderRadius.md, marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>LG: {borderRadius.lg}px</Text>
        <View style={{ height: 40, backgroundColor: '#E5E7EB', borderRadius: borderRadius.lg, marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>XL: {borderRadius.xl}px</Text>
        <View style={{ height: 40, backgroundColor: '#E5E7EB', borderRadius: borderRadius.xl, marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>XXL: {borderRadius.xxl}px</Text>
        <View style={{ height: 40, backgroundColor: '#E5E7EB', borderRadius: borderRadius.xxl, marginVertical: 4 }} />
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#000' }}>Full: {borderRadius.full}px (Circular)</Text>
        <View style={{ width: 40, height: 40, backgroundColor: '#E5E7EB', borderRadius: borderRadius.full, marginVertical: 4 }} />
      </View>
      
      {/* Border Radius Usage Examples */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Border Radius Usage Examples</Text>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 8, marginBottom: 4, color: '#000' }}>Cards with Different Border Radius</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        <View style={{ 
          width: 80, 
          height: 60, 
          backgroundColor: colors.mystical.deep, 
          borderRadius: borderRadius.xs,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 10, textAlign: 'center' }}>XS</Text>
        </View>
        <View style={{ 
          width: 80, 
          height: 60, 
          backgroundColor: colors.mystical.royal, 
          borderRadius: borderRadius.sm,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 10, textAlign: 'center' }}>SM</Text>
        </View>
        <View style={{ 
          width: 80, 
          height: 60, 
          backgroundColor: colors.mystical.light, 
          borderRadius: borderRadius.md,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 10, textAlign: 'center' }}>MD</Text>
        </View>
        <View style={{ 
          width: 80, 
          height: 60, 
          backgroundColor: colors.mystical.glow, 
          borderRadius: borderRadius.lg,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 10, textAlign: 'center' }}>LG</Text>
        </View>
      </View>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 8, marginBottom: 4, color: '#000' }}>Input Fields with Border Radius</Text>
      <View style={{ gap: 8, marginBottom: 12 }}>
        <View style={{ 
          height: 40, 
          backgroundColor: 'white', 
          borderRadius: borderRadius.sm,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          paddingHorizontal: 12,
          justifyContent: 'center'
        }}>
          <Text style={{ color: '#000' }}>Input with SM radius</Text>
        </View>
        <View style={{ 
          height: 40, 
          backgroundColor: 'white', 
          borderRadius: borderRadius.md,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          paddingHorizontal: 12,
          justifyContent: 'center'
        }}>
          <Text style={{ color: '#000' }}>Input with MD radius</Text>
        </View>
        <View style={{ 
          height: 40, 
          backgroundColor: 'white', 
          borderRadius: borderRadius.lg,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          paddingHorizontal: 12,
          justifyContent: 'center'
        }}>
          <Text style={{ color: '#000' }}>Input with LG radius</Text>
        </View>
      </View>

      {/* Underline after Foundations */}
      <View style={{ height: 2, backgroundColor: '#E5E7EB', marginVertical: 24 }} />

      {/* Step 4: Gradients */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: '#000' }}>Step 4: Gradients</Text>
      
      {/* Button Gradients */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Button Gradients</Text>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Primary Button Gradient</Text>
      <View style={{ height: 60, marginBottom: 12, borderRadius: 8, overflow: 'hidden' }}>
        <LinearGradient
          colors={primaryButtonGradient.colors as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Secondary Button Gradient</Text>
      <View style={{ height: 60, marginBottom: 12, borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(46,134,222,0.3)' }}>
        <LinearGradient
          colors={secondaryButtonGradient.colors as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Ghost Button Gradient</Text>
      <View style={{ height: 60, marginBottom: 12, borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#E5E7EB' }}>
        <LinearGradient
          colors={ghostButtonGradient.colors as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Floating Action Button Gradient</Text>
      <View style={{ height: 60, marginBottom: 12, borderRadius: 30, overflow: 'hidden' }}>
        <LinearGradient
          colors={buttonFloatingGradient.colors as any}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Destructive Button Gradient</Text>
      <View style={{ height: 60, marginBottom: 12, borderRadius: 8, overflow: 'hidden' }}>
        <LinearGradient
          colors={destructiveButtonGradient.colors as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Success Button Gradient</Text>
      <View style={{ height: 60, marginBottom: 12, borderRadius: 8, overflow: 'hidden' }}>
        <LinearGradient
          colors={successButtonGradient.colors as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      
      {/* Hero Gradients */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Hero Gradients</Text>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Primary Hero Gradient</Text>
      <View style={{ height: 80, marginBottom: 12, borderRadius: 8, overflow: 'hidden' }}>
        <LinearGradient
          colors={heroGradient.colors as any}
          locations={heroGradient.locations as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Hero Card Gradient</Text>
      <View style={{ height: 80, marginBottom: 12, borderRadius: 8, overflow: 'hidden' }}>
        <LinearGradient
          colors={heroCardGradient.colors as any}
          locations={heroCardGradient.locations as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Hero Section Gradient</Text>
      <View style={{ height: 80, marginBottom: 12, borderRadius: 8, overflow: 'hidden' }}>
        <LinearGradient
          colors={heroSectionGradient.colors as any}
          locations={heroSectionGradient.locations as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      
      {/* Floating Gradients */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Floating Gradients</Text>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Floating Element Gradient</Text>
      <View style={{ height: 60, marginBottom: 12, borderRadius: 30, overflow: 'hidden' }}>
        <LinearGradient
          colors={floatingElementGradient.colors as any}
          locations={floatingElementGradient.locations as any}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Floating Trail Gradient</Text>
      <View style={{ height: 60, marginBottom: 12, borderRadius: 8, overflow: 'hidden' }}>
        <LinearGradient
          colors={floatingTrailGradient.colors as any}
          locations={floatingTrailGradient.locations as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </View>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Floating Glow Gradient</Text>
      <View style={{ height: 60, marginBottom: 12, borderRadius: 30, overflow: 'hidden' }}>
        <LinearGradient
          colors={floatingGlowGradient.colors as any}
          locations={floatingGlowGradient.locations as any}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      
      {/* Navigation Gradients */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Navigation Gradients</Text>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Bottom Navigation Gradient</Text>
      <View style={{ height: 60, marginBottom: 12, borderRadius: 8, overflow: 'hidden' }}>
        <LinearGradient
          colors={navigationGradients.bottomNavigation.background.colors as any}
          locations={navigationGradients.bottomNavigation.background.locations as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Header Gradient</Text>
      <View style={{ height: 60, marginBottom: 12, borderRadius: 8, overflow: 'hidden' }}>
        <LinearGradient
          colors={navigationGradients.header.primary.colors as any}
          locations={navigationGradients.header.primary.locations as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Tab Indicator Gradient</Text>
      <View style={{ height: 60, marginBottom: 12, borderRadius: 8, overflow: 'hidden' }}>
        <LinearGradient
          colors={navigationGradients.tabs.indicator.colors as any}
          locations={navigationGradients.tabs.indicator.locations as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>

      {/* Underline after Gradients */}
      <View style={{ height: 2, backgroundColor: '#E5E7EB', marginVertical: 24 }} />

      {/* Step 5: Typography */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: '#000' }}>Step 5: Typography</Text>
      
      {/* Display text */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>DisplayText</Text>
      <DisplayText>Display Text Component</DisplayText>
      
      {/* Heading - All levels */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Heading (All Levels)</Text>
      <Heading level="h1" customColor="#000">Heading H1</Heading>
      <Heading level="h2" customColor="#000">Heading H2</Heading>
      <Heading level="h3" customColor="#000">Heading H3</Heading>
      <Heading level="h4" customColor="#000">Heading H4</Heading>
      <Heading level="h5" customColor="#000">Heading H5</Heading>
      <Heading level="h6" customColor="#000">Heading H6</Heading>
      
      {/* Heading - Different weights */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Heading Weights</Text>
      <Heading level="h3" weight="light" customColor="#000">Light Heading</Heading>
      <Heading level="h3" weight="regular" customColor="#000">Regular Heading</Heading>
      <Heading level="h3" weight="medium" customColor="#000">Medium Heading</Heading>
      <Heading level="h3" weight="semibold" customColor="#000">Semibold Heading</Heading>
      <Heading level="h3" weight="bold" customColor="#000">Bold Heading</Heading>
      
      {/* Heading - Different colors */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Heading Colors</Text>
      <Heading level="h3" color="primary" customColor="#000">Primary Heading</Heading>
      <Heading level="h3" color="secondary" customColor="#6C757D">Secondary Heading</Heading>
      <Heading level="h3" color="accent" customColor="#2E86DE">Accent Heading</Heading>
      <Heading level="h3" color="error" customColor="#DC3545">Error Heading</Heading>
      
      {/* Body text - All variants */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>BodyText Variants</Text>
      <BodyText variant="body1" customColor="#000">Body1: Standard body text for paragraphs and general content.</BodyText>
      <BodyText variant="body2" customColor="#000">Body2: Smaller body text for secondary content.</BodyText>
      <BodyText variant="paragraph" customColor="#000">Paragraph: Formatted paragraph text with proper spacing.</BodyText>
      <BodyText variant="caption" customColor="#000">Caption: Small descriptive text for captions.</BodyText>
      <BodyText variant="overline" customColor="#000">Overline: Small text with increased letter spacing.</BodyText>
      
      {/* Body text - Different sizes */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>BodyText Sizes</Text>
      <BodyText size="small" customColor="#000">Small body text</BodyText>
      <BodyText size="medium" customColor="#000">Medium body text</BodyText>
      <BodyText size="large" customColor="#000">Large body text</BodyText>
      <BodyText size="xlarge" customColor="#000">Extra large body text</BodyText>
      
      {/* Body text - Different weights */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>BodyText Weights</Text>
      <BodyText weight="light" customColor="#000">Light body text</BodyText>
      <BodyText weight="regular" customColor="#000">Regular body text</BodyText>
      <BodyText weight="medium" customColor="#000">Medium body text</BodyText>
      <BodyText weight="semibold" customColor="#000">Semibold body text</BodyText>
      <BodyText weight="bold" customColor="#000">Bold body text</BodyText>
      
      {/* Body text - Different colors */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>BodyText Colors</Text>
      <BodyText color="primary" customColor="#000">Primary body text</BodyText>
      <BodyText color="secondary" customColor="#6C757D">Secondary body text</BodyText>
      <BodyText color="accent" customColor="#2E86DE">Accent body text</BodyText>
      <BodyText color="muted" customColor="#6C757D">Muted body text</BodyText>
      <BodyText color="error" customColor="#DC3545">Error body text</BodyText>
      <BodyText color="success" customColor="#28A745">Success body text</BodyText>
      
      {/* Caption - Different variants */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Caption Variants</Text>
      <Caption variant="default" customColor="#000">Default caption text</Caption>
      <Caption variant="subtitle" customColor="#000">Subtitle caption text</Caption>
      <Caption variant="label" customColor="#000">Label caption text</Caption>
      <Caption variant="helper" customColor="#000">Helper caption text</Caption>
      <Caption variant="timestamp" customColor="#000">Timestamp caption text</Caption>
      <Caption variant="metadata" customColor="#000">Metadata caption text</Caption>
      
      {/* Label - Different variants */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Label Variants</Text>
      <Label variant="default" customColor="#000">Default Form Label</Label>
      <Label variant="required" customColor="#000">Required Form Label *</Label>
      <Label variant="optional" customColor="#000">Optional Form Label (optional)</Label>
      
      {/* Link - Different variants */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Link Variants</Text>
      <Link variant="default" onPress={() => {}}>Default Link</Link>
      <Link variant="inline" onPress={() => {}}>Inline Link</Link>
      <Link variant="button" onPress={() => {}}>Button Link</Link>
      <Link variant="nav" onPress={() => {}}>Navigation Link</Link>
      <Link variant="external" onPress={() => {}}>External Link</Link>
      
      {/* Code - Different variants */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Code Variants</Text>
      <Code variant="inline">const example = "inline code";</Code>
      <Code variant="block">const blockCode = "multi-line code block";</Code>
      <Code variant="snippet">function snippet() {'{'} return "code snippet"; {'}'}</Code>
      <Code variant="command">npm install package</Code>
      <Code variant="output">Output: Successfully installed</Code>
      <Code variant="highlight">Highlighted code text</Code>

      {/* Underline after Typography */}
      <View style={{ height: 2, backgroundColor: '#E5E7EB', marginVertical: 24 }} />

      {/* TabNavigation Demo */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: '#000' }}>TabNavigation Demo</Text>
      <View style={{ marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
        <TabNavigation
          items={tabNavItems}
          activeIndex={tabNavIndex}
          onTabChange={(index, item) => setTabNavIndex(index)}
        />
        <View style={{ padding: 16, backgroundColor: '#F9FAFB' }}>
          <Text style={{ color: '#666' }}>Selected Tab: {tabNavItems[tabNavIndex].label}</Text>
        </View>
      </View>

      {/* Step 6: Layout */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: '#000' }}>Step 6: Layout</Text>
      
      {/* Container */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Container</Text>
      <Container>
        <Text style={{ color: '#000' }}>This is content inside a Container component</Text>
      </Container>
      
      {/* Stack */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Stack (Vertical)</Text>
      <Stack spacing="sm">
        <Text style={{ color: '#000' }}>Stack Item 1</Text>
        <Text style={{ color: '#000' }}>Stack Item 2</Text>
        <Text style={{ color: '#000' }}>Stack Item 3</Text>
      </Stack>
      
      {/* HStack */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>HStack (Horizontal)</Text>
      <HStack spacing="sm">
        <Text style={{ color: '#000' }}>Item 1</Text>
        <Text style={{ color: '#000' }}>Item 2</Text>
        <Text style={{ color: '#000' }}>Item 3</Text>
      </HStack>
      
      {/* Flex */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Flex</Text>
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Text style={{ color: '#000' }}>Left Item</Text>
        <Text style={{ color: '#000' }}>Right Item</Text>
      </Flex>
      
      {/* Grid */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Grid</Text>
      <Grid columns={2} gap="sm">
        <GridItem>
          <Text style={{ color: '#000' }}>Grid Item 1</Text>
        </GridItem>
        <GridItem>
          <Text style={{ color: '#000' }}>Grid Item 2</Text>
        </GridItem>
        <GridItem>
          <Text style={{ color: '#000' }}>Grid Item 3</Text>
        </GridItem>
        <GridItem>
          <Text style={{ color: '#000' }}>Grid Item 4</Text>
        </GridItem>
      </Grid>
      
      {/* Spacer */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Spacer</Text>
      <Text style={{ color: '#000' }}>Content above spacer</Text>
      <Spacer size={16} />
      <Text style={{ color: '#000' }}>Content below spacer</Text>
      
      {/* Divider - Temporarily disabled due to import issue */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Divider</Text>
      <Text style={{ color: '#000' }}>Content above divider</Text>
      <View style={{ height: 1, backgroundColor: '#E5E7EB', marginVertical: 8 }} />
      <Text style={{ color: '#000' }}>Content below divider</Text>

      {/* Underline after Layout */}
      <View style={{ height: 2, backgroundColor: '#E5E7EB', marginVertical: 24 }} />

      {/* Step 7: Inputs */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: '#000' }}>Step 7: Inputs</Text>
      
      {/* Standard text input */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>TextInput</Text>
      <TextInput placeholder="Standard text input" />
      
      {/* Phone input */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>PhoneInput</Text>
      <PhoneInput placeholder="Phone number" />
      
      {/* Code input */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>CodeInput</Text>
      <CodeInput length={4} />
      
      {/* Email input */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>EmailInput</Text>
      <EmailInput placeholder="Email address" />
      
      {/* Password input */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>PasswordInput</Text>
      <PasswordInput placeholder="Password" />
      
      {/* Number input */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>NumberInput</Text>
      <NumberInput placeholder="Enter number" />
      
      {/* Select input */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>SelectInput</Text>
      <SelectInput 
        options={[
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
          { label: 'Option 3', value: 3 }
        ]} 
      />
      
      {/* Slider input */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>SliderInput</Text>
      <SliderInput min={0} max={100} />
      
      {/* Date input */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>DateInput</Text>
      <DateInput />
      
      {/* Time input */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>TimeInput</Text>
      <TimeInput />
      
      {/* Search input */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>SearchInput</Text>
      <SearchInput placeholder="Search..." />
      
      {/* Text area */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>TextArea</Text>
      <TextArea placeholder="Multi-line text input" />
      
      {/* URL input */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>URLInput</Text>
      <URLInput placeholder="Enter URL" />
      
      {/* File input */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>FileInput</Text>
      <FileInput />

      {/* Underline after Inputs */}
      <View style={{ height: 2, backgroundColor: '#E5E7EB', marginVertical: 24 }} />

      {/* Step 8: Alerts */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: '#000' }}>Step 8: Alerts</Text>
      
      {/* Alert Components */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Alert Components</Text>
      
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Alert Variants</Text>
      
      {/* Alert Component */}
      {alertVisible && (
        <Alert
          variant={alertVariant}
          title={alertVariant.charAt(0).toUpperCase() + alertVariant.slice(1)}
          description={`This is a ${alertVariant} alert message.`}
          dismissible={true}
          onDismiss={hideAlert}
          autoDissmissTimeout={5000}
        />
      )}
      
      {/* Alert Triggers */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 16, marginBottom: 4, color: '#000' }}>Alert Triggers</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        <ButtonPrimary onPress={() => showAlert('info')} config={{ size: 'small' }}>Show Info Alert</ButtonPrimary>
        <ButtonPrimary onPress={() => showAlert('success')} config={{ size: 'small' }}>Show Success Alert</ButtonPrimary>
        <ButtonPrimary onPress={() => showAlert('warning')} config={{ size: 'small' }}>Show Warning Alert</ButtonPrimary>
        <ButtonPrimary onPress={() => showAlert('error')} config={{ size: 'small' }}>Show Error Alert</ButtonPrimary>
      </View>

      {/* Underline after Alerts */}
      <View style={{ height: 2, backgroundColor: '#E5E7EB', marginVertical: 24 }} />

      {/* Step 9: Badges */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: '#000' }}>Step 9: Badges</Text>
      
      {/* Badge Variants */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Badge Variants</Text>
      
      {/* Dot Badges */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Dot Badges</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <View style={{ position: 'relative' }}>
          <View style={{ width: 40, height: 40, backgroundColor: '#E5E7EB', borderRadius: 20 }} />
          <Badge variant="dot" color="primary" size="small" />
        </View>
        <View style={{ position: 'relative' }}>
          <View style={{ width: 40, height: 40, backgroundColor: '#E5E7EB', borderRadius: 20 }} />
          <Badge variant="dot" color="success" size="small" />
        </View>
        <View style={{ position: 'relative' }}>
          <View style={{ width: 40, height: 40, backgroundColor: '#E5E7EB', borderRadius: 20 }} />
          <Badge variant="dot" color="warning" size="small" />
        </View>
        <View style={{ position: 'relative' }}>
          <View style={{ width: 40, height: 40, backgroundColor: '#E5E7EB', borderRadius: 20 }} />
          <Badge variant="dot" color="error" size="small" />
        </View>
      </View>
      
      {/* Text Badges */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Text Badges</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <Badge variant="text" color="primary" size="medium">New</Badge>
        <Badge variant="text" color="success" size="medium">Active</Badge>
        <Badge variant="text" color="warning" size="medium">Pending</Badge>
        <Badge variant="text" color="error" size="medium">Error</Badge>
        <Badge variant="text" color="info" size="medium">Info</Badge>
      </View>
      
      {/* Number Badges */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Number Badges</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <View style={{ position: 'relative' }}>
          <View style={{ width: 40, height: 40, backgroundColor: '#E5E7EB', borderRadius: 20 }} />
          <Badge variant="number" count={3} color="primary" size="small" />
        </View>
        <View style={{ position: 'relative' }}>
          <View style={{ width: 40, height: 40, backgroundColor: '#E5E7EB', borderRadius: 20 }} />
          <Badge variant="number" count={12} color="success" size="small" />
        </View>
        <View style={{ position: 'relative' }}>
          <View style={{ width: 40, height: 40, backgroundColor: '#E5E7EB', borderRadius: 20 }} />
          <Badge variant="number" count={99} color="warning" size="small" />
        </View>
        <View style={{ position: 'relative' }}>
          <View style={{ width: 40, height: 40, backgroundColor: '#E5E7EB', borderRadius: 20 }} />
          <Badge variant="number" count={150} color="error" size="small" maxCount={99} showPlus={true} />
        </View>
      </View>
      
      {/* Status Badges */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Status Badges</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <Badge variant="status" color="success" size="medium">Online</Badge>
        <Badge variant="status" color="warning" size="medium">Away</Badge>
        <Badge variant="status" color="error" size="medium">Offline</Badge>
        <Badge variant="status" color="info" size="medium">Busy</Badge>
      </View>
      
      {/* Outline Badges */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Outline Badges</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <Badge variant="outline" color="primary" size="medium">Draft</Badge>
        <Badge variant="outline" color="success" size="medium">Published</Badge>
        <Badge variant="outline" color="warning" size="medium">Review</Badge>
        <Badge variant="outline" color="error" size="medium">Archived</Badge>
      </View>
      
      {/* Badge Sizes */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Badge Sizes</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <Badge variant="text" color="primary" size="small">Small</Badge>
        <Badge variant="text" color="primary" size="medium">Medium</Badge>
        <Badge variant="text" color="primary" size="large">Large</Badge>
      </View>
      
      {/* Badge Colors */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Badge Colors</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <Badge variant="text" color="primary" size="medium">Primary</Badge>
        <Badge variant="text" color="secondary" size="medium">Secondary</Badge>
        <Badge variant="text" color="success" size="medium">Success</Badge>
        <Badge variant="text" color="warning" size="medium">Warning</Badge>
        <Badge variant="text" color="error" size="medium">Error</Badge>
        <Badge variant="text" color="info" size="medium">Info</Badge>
        <Badge variant="text" color="gold" size="medium">Gold</Badge>
        <Badge variant="text" color="purple" size="medium">Purple</Badge>
      </View>
      
      {/* Animated Badges */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Animated Badges</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <Badge variant="dot" color="primary" size="small" animation="pulse" />
        <Badge variant="text" color="success" size="medium" animation="bounce">Live</Badge>
        <Badge variant="text" color="warning" size="medium" animation="fade">Updating</Badge>
        <Badge variant="text" color="error" size="medium" animation="scale">Alert</Badge>
      </View>
      
      {/* Glow Badges */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Glow Badges</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <Badge variant="text" color="primary" size="medium" showGlow={true}>Premium</Badge>
        <Badge variant="text" color="gold" size="medium" showGlow={true}>VIP</Badge>
        <Badge variant="text" color="purple" size="medium" showGlow={true}>Pro</Badge>
      </View>

      {/* Underline after Badges */}
      <View style={{ height: 2, backgroundColor: '#E5E7EB', marginVertical: 24 }} />

      {/* Step 10: Progress Bars */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: '#000' }}>Step 10: Progress Bars</Text>
      
      {/* Progress Bar Variants */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Progress Bar Variants</Text>
      
      {/* Linear Progress Bars */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Linear Progress Bars</Text>
      <View style={{ gap: 16, marginBottom: 16 }}>
        <LinearProgressBar progress={progressValue} showProgress={true} />
        <LinearProgressBar progress={progressValue} size="thin" showProgress={true} />
        <LinearProgressBar progress={progressValue} size="thick" showProgress={true} />
      </View>
      
      {/* Circular Progress Bar */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Circular Progress Bar</Text>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <CircularProgressBar progress={progressValue} showProgress={true} />
      </View>
      
      {/* Cosmic Progress Bar */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Cosmic Progress Bar</Text>
      <View style={{ gap: 16, marginBottom: 16 }}>
        <CosmicProgressBar progress={progressValue} showProgress={true} />
        <CosmicProgressBar progress={progressValue} size="thin" showProgress={true} />
        <CosmicProgressBar progress={progressValue} size="thick" showProgress={true} />
      </View>
      
      {/* Indeterminate Progress */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Indeterminate Progress</Text>
      <View style={{ gap: 16, marginBottom: 16 }}>
        <LinearProgressBar progress={0} indeterminate={true} />
        <LinearProgressBar progress={0} indeterminate={true} size="thin" />
        <LinearProgressBar progress={0} indeterminate={true} size="thick" />
      </View>
      
      {/* Progress Bar Sizes */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Progress Bar Sizes</Text>
      <View style={{ gap: 16, marginBottom: 16 }}>
        <LinearProgressBar progress={progressValue} size="thin" showProgress={true} />
        <LinearProgressBar progress={progressValue} size="medium" showProgress={true} />
        <LinearProgressBar progress={progressValue} size="thick" showProgress={true} />
      </View>
      
      {/* Custom Progress Values */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Custom Progress Values</Text>
      <View style={{ gap: 16, marginBottom: 16 }}>
        <LinearProgressBar progress={10} showProgress={true} progressText="Starting..." />
        <LinearProgressBar progress={50} showProgress={true} progressText="Halfway there!" />
        <LinearProgressBar progress={90} showProgress={true} progressText="Almost done!" />
        <LinearProgressBar progress={100} showProgress={true} progressText="Complete!" />
      </View>
      
      {/* Progress Controls */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Progress Controls</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        <ButtonPrimary onPress={() => setProgressValue(0)} config={{ size: 'small' }}>0%</ButtonPrimary>
        <ButtonPrimary onPress={() => setProgressValue(25)} config={{ size: 'small' }}>25%</ButtonPrimary>
        <ButtonPrimary onPress={() => setProgressValue(50)} config={{ size: 'small' }}>50%</ButtonPrimary>
        <ButtonPrimary onPress={() => setProgressValue(75)} config={{ size: 'small' }}>75%</ButtonPrimary>
        <ButtonPrimary onPress={() => setProgressValue(100)} config={{ size: 'small' }}>100%</ButtonPrimary>
        <ButtonSecondary onPress={() => setIndeterminateProgress(!indeterminateProgress)} config={{ size: 'small' }}>
          {indeterminateProgress ? 'Stop Indeterminate' : 'Start Indeterminate'}
        </ButtonSecondary>
      </View>

      {/* Underline after Progress Bars */}
      <View style={{ height: 2, backgroundColor: '#E5E7EB', marginVertical: 24 }} />

      {/* Step 11: Loading Spinner */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: '#000' }}>Step 11: Loading Spinner</Text>
      
      {/* Loading Spinner Examples */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Loading Spinner Examples</Text>
      
      {/* Small Loading Spinner */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Small Loading Spinner</Text>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <LoadingSpinner size="small" text="Loading data..." />
      </View>
      
      {/* Large Loading Spinner */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Large Loading Spinner</Text>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <LoadingSpinner size="large" text="Please wait..." />
      </View>
      
      {/* Custom Color Loading Spinner */}
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 12, marginBottom: 4, color: '#000' }}>Custom Color Loading Spinner</Text>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <LoadingSpinner size="large" color="#10B981" text="Processing..." />
      </View>
      
      {/* Loading Spinner Controls */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Loading Spinner Controls</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        <ButtonPrimary onPress={() => setShowLoadingSpinner(!showLoadingSpinner)} config={{ size: 'small' }}>
          {showLoadingSpinner ? 'Hide Spinner' : 'Show Spinner'}
        </ButtonPrimary>
        <ButtonSecondary onPress={() => setLoadingText('Loading data...')} config={{ size: 'small' }}>
          Data Loading
        </ButtonSecondary>
        <ButtonSecondary onPress={() => setLoadingText('Processing...')} config={{ size: 'small' }}>
          Processing
        </ButtonSecondary>
        <ButtonSecondary onPress={() => setLoadingText('Please wait...')} config={{ size: 'small' }}>
          Please Wait
        </ButtonSecondary>
      </View>
      
      {/* Conditional Loading Spinner */}
      {showLoadingSpinner && (
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <LoadingSpinner size="large" text={loadingText} />
        </View>
      )}

      {/* Underline after Loading Spinner */}
      <View style={{ height: 2, backgroundColor: '#E5E7EB', marginVertical: 24 }} />

      {/* Step 12: Controls */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: '#000' }}>Step 12: Controls</Text>
      
      {/* Simple Toggle */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Toggle</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 30,
            backgroundColor: toggleValue ? '#2E86DE' : '#E5E7EB',
            borderRadius: 15,
            justifyContent: 'center',
            paddingHorizontal: 2,
          }}
          onPress={() => setToggleValue(!toggleValue)}
        >
          <View style={{
            width: 26,
            height: 26,
            backgroundColor: 'white',
            borderRadius: 13,
            transform: [{ translateX: toggleValue ? 20 : 0 }],
          }} />
        </TouchableOpacity>
        <Text style={{ color: '#000' }}>Toggle is {toggleValue ? 'ON' : 'OFF'}</Text>
      </View>
      
      {/* Simple Checkbox */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Checkbox</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <TouchableOpacity
          style={{
            width: 24,
            height: 24,
            borderWidth: 2,
            borderColor: checkboxValue ? '#2E86DE' : '#E5E7EB',
            backgroundColor: checkboxValue ? '#2E86DE' : 'transparent',
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setCheckboxValue(!checkboxValue)}
        >
          {checkboxValue && (
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>✓</Text>
          )}
        </TouchableOpacity>
        <Text style={{ color: '#000' }}>Checkbox is {checkboxValue ? 'checked' : 'unchecked'}</Text>
      </View>
      
      {/* Simple Radio Buttons */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Radio Buttons</Text>
      <View style={{ marginBottom: 16 }}>
        {['option1', 'option2', 'option3'].map((option) => (
          <TouchableOpacity
            key={option}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
            onPress={() => setRadioValue(option)}
          >
            <View style={{
              width: 20,
              height: 20,
              borderWidth: 2,
              borderColor: radioValue === option ? '#2E86DE' : '#E5E7EB',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {radioValue === option && (
                <View style={{
                  width: 8,
                  height: 8,
                  backgroundColor: '#2E86DE',
                  borderRadius: 4,
                }} />
              )}
            </View>
            <Text style={{ color: '#000', marginLeft: 8 }}>Option {option.slice(-1)}</Text>
          </TouchableOpacity>
        ))}
        <Text style={{ color: '#000', marginTop: 8 }}>Selected: {radioValue}</Text>
      </View>
      
      {/* Simple Slider */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Slider</Text>
      <View style={{ marginBottom: 16 }}>
        <View style={{
          height: 6,
          backgroundColor: '#E5E7EB',
          borderRadius: 3,
          justifyContent: 'center',
        }}>
          <View style={{
            width: `${sliderValue}%`,
            height: 6,
            backgroundColor: '#2E86DE',
            borderRadius: 3,
          }} />
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: `${sliderValue}%`,
            top: -7,
            width: 20,
            height: 20,
            backgroundColor: '#2E86DE',
            borderRadius: 10,
            transform: [{ translateX: -10 }],
          }}
          onPress={() => setSliderValue(Math.min(100, Math.max(0, sliderValue + 10)))}
        />
        <Text style={{ color: '#000', marginTop: 16 }}>Value: {sliderValue}</Text>
      </View>
      
      {/* Simple Rating */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Rating</Text>
      <View style={{ marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRatingValue(star)}
            >
              <Text style={{ fontSize: 24, color: star <= ratingValue ? '#FFD700' : '#E5E7EB' }}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={{ color: '#000', marginTop: 8 }}>Rating: {ratingValue}/5</Text>
      </View>
      
      {/* Simple Stepper */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Stepper</Text>
      <View style={{ marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#2E86DE',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setStepperValue(Math.max(1, stepperValue - 1))}
          >
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>-</Text>
          </TouchableOpacity>
          <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>{stepperValue}</Text>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#2E86DE',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setStepperValue(Math.min(10, stepperValue + 1))}
          >
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: '#000', marginTop: 8 }}>Step: {stepperValue}</Text>
      </View>
      
      {/* Simple Switch */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Switch</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 30,
            backgroundColor: switchValue ? '#2E86DE' : '#E5E7EB',
            borderRadius: 15,
            justifyContent: 'center',
            paddingHorizontal: 2,
          }}
          onPress={() => setSwitchValue(!switchValue)}
        >
          <View style={{
            width: 26,
            height: 26,
            backgroundColor: 'white',
            borderRadius: 13,
            transform: [{ translateX: switchValue ? 20 : 0 }],
          }} />
        </TouchableOpacity>
        <Text style={{ color: '#000' }}>Switch is {switchValue ? 'ON' : 'OFF'}</Text>
      </View>
      
      {/* Simple Segmented Control */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Segmented Control</Text>
      <View style={{ marginBottom: 16 }}>
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#E5E7EB',
          borderRadius: 8,
          padding: 2,
        }}>
          {['Option 1', 'Option 2', 'Option 3'].map((option, index) => (
            <TouchableOpacity
              key={option}
              style={{
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: segmentedValue === `option${index + 1}` ? '#2E86DE' : 'transparent',
                borderRadius: 6,
                alignItems: 'center',
              }}
              onPress={() => setSegmentedValue(`option${index + 1}`)}
            >
              <Text style={{
                color: segmentedValue === `option${index + 1}` ? 'white' : '#000',
                fontWeight: 'bold',
              }}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={{ color: '#000', marginTop: 8 }}>Selected: {segmentedValue}</Text>
      </View>
      
      {/* Simple Color Picker */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Color Picker</Text>
      <View style={{ marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#2E86DE'].map((color) => (
            <TouchableOpacity
              key={color}
              style={{
                width: 40,
                height: 40,
                backgroundColor: color,
                borderRadius: 20,
                borderWidth: colorValue === color ? 3 : 1,
                borderColor: colorValue === color ? '#000' : '#E5E7EB',
              }}
              onPress={() => setColorValue(color)}
            />
          ))}
        </View>
        <View style={{ 
          width: 40, 
          height: 40, 
          backgroundColor: colorValue, 
          borderRadius: 8, 
          marginTop: 8,
          borderWidth: 1,
          borderColor: '#E5E7EB'
        }} />
        <Text style={{ color: '#000', marginTop: 8 }}>Selected Color: {colorValue}</Text>
      </View>
      
      {/* Simple Control Base */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Control Base</Text>
      <View style={{ marginBottom: 16 }}>
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 24,
            backgroundColor: '#2E86DE',
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={() => console.log('ControlBase pressed')}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Base Control Component</Text>
        </TouchableOpacity>
      </View>

      {/* Underline after Controls */}
      <View style={{ height: 2, backgroundColor: '#E5E7EB', marginVertical: 24 }} />

      {/* Step 13: Advanced Components */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 24, color: '#000' }}>Step 13: Advanced Components</Text>
      
      {/* Modals */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#000' }}>Modals</Text>
      
      {/* Modal Trigger */}
      <TouchableOpacity
        style={{
          paddingVertical: 12,
          paddingHorizontal: 24,
          backgroundColor: '#2E86DE',
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 16,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Open Modal</Text>
      </TouchableOpacity>
      
      {/* Modal */}
      {modalVisible && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 24,
            margin: 20,
            maxWidth: 400,
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 16 }}>
              Advanced Modal
            </Text>
            <Text style={{ color: '#000', marginBottom: 16 }}>
              This is an advanced modal with header, content, and footer sections.
            </Text>
            <Text style={{ color: '#000', marginBottom: 16 }}>
              It demonstrates the modal system capabilities.
            </Text>
            <TouchableOpacity
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: '#2E86DE',
                borderRadius: 6,
                alignSelf: 'flex-end',
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {/* Bottom Sheet Trigger */}
      <TouchableOpacity
        style={{
          paddingVertical: 12,
          paddingHorizontal: 24,
          backgroundColor: '#2E86DE',
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 16,
        }}
        onPress={() => setBottomSheetVisible(true)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Open Bottom Sheet</Text>
      </TouchableOpacity>
      
      {/* Bottom Sheet */}
      {bottomSheetVisible && (
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 24,
          zIndex: 1000,
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 16 }}>
            Bottom Sheet
          </Text>
          <Text style={{ color: '#000', marginBottom: 16 }}>
            This is a bottom sheet component that slides up from the bottom.
          </Text>
          <TouchableOpacity
            style={{
              paddingVertical: 12,
              paddingHorizontal: 24,
              backgroundColor: '#2E86DE',
              borderRadius: 8,
              alignItems: 'center',
            }}
            onPress={() => setBottomSheetVisible(false)}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Overlays */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Overlays</Text>
      
      {/* Simple Tooltip */}
      <View style={{ marginBottom: 16 }}>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: '#E5E7EB',
            borderRadius: 6,
            alignSelf: 'flex-start',
          }}
          onPress={() => setTooltipVisible(!tooltipVisible)}
        >
          <Text style={{ color: '#000' }}>Click for Tooltip</Text>
        </TouchableOpacity>
        {tooltipVisible && (
          <View style={{
            position: 'absolute',
            top: -40,
            left: 0,
            backgroundColor: '#1F2937',
            padding: 8,
            borderRadius: 6,
            zIndex: 1000,
          }}>
            <Text style={{ color: 'white', fontSize: 12 }}>
              This is a tooltip with helpful information
            </Text>
          </View>
        )}
      </View>
      
      {/* Simple Popover */}
      <View style={{ marginBottom: 16 }}>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: '#E5E7EB',
            borderRadius: 6,
            alignSelf: 'flex-start',
          }}
          onPress={() => setPopoverVisible(!popoverVisible)}
        >
          <Text style={{ color: '#000' }}>Click for Popover</Text>
        </TouchableOpacity>
        {popoverVisible && (
          <View style={{
            position: 'absolute',
            top: 40,
            left: 0,
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            zIndex: 1000,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <Text style={{ color: '#000', fontWeight: 'bold', marginBottom: 8 }}>
              Popover Content
            </Text>
            <Text style={{ color: '#000' }}>
              This is a popover with custom content.
            </Text>
            <TouchableOpacity
              style={{
                paddingVertical: 4,
                paddingHorizontal: 8,
                backgroundColor: '#2E86DE',
                borderRadius: 4,
                alignSelf: 'flex-end',
                marginTop: 8,
              }}
              onPress={() => setPopoverVisible(false)}
            >
              <Text style={{ color: 'white', fontSize: 12 }}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* Display Components */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Display Components</Text>
      
      {/* Simple List */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#000' }}>List</Text>
        {[
          { id: '1', title: 'List Item 1', description: 'Description for item 1' },
          { id: '2', title: 'List Item 2', description: 'Description for item 2' },
          { id: '3', title: 'List Item 3', description: 'Description for item 3' },
        ].map((item) => (
          <View key={item.id} style={{ padding: 16, backgroundColor: '#F9FAFB', marginBottom: 8, borderRadius: 8 }}>
            <Text style={{ color: '#000', fontWeight: 'bold' }}>{item.title}</Text>
            <Text style={{ color: '#6B7280' }}>{item.description}</Text>
          </View>
        ))}
      </View>
      
      {/* Simple Badge */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#000' }}>Simple Badge</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{
            width: 8,
            height: 8,
            backgroundColor: '#2E86DE',
            borderRadius: 4,
          }} />
          <View style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: '#10B981',
            borderRadius: 12,
          }}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Success</Text>
          </View>
          <View style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: '#F59E0B',
            borderRadius: 12,
          }}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>5</Text>
          </View>
        </View>
      </View>
      
      {/* Simple Chip */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#000' }}>Simple Chip</Text>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <View style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: '#2E86DE',
            borderRadius: 16,
          }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>Primary</Text>
          </View>
          <View style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#6B7280',
            borderRadius: 16,
          }}>
            <Text style={{ color: '#6B7280', fontSize: 14, fontWeight: 'bold' }}>Secondary</Text>
          </View>
          <View style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: '#F3F4F6',
            borderRadius: 16,
          }}>
            <Text style={{ color: '#10B981', fontSize: 14, fontWeight: 'bold' }}>Success</Text>
          </View>
        </View>
      </View>
      
      {/* Disclosure */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Disclosure</Text>
      
      {/* Simple Accordion */}
      <View style={{ marginBottom: 16 }}>
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            backgroundColor: '#F3F4F6',
            borderRadius: 8,
            marginBottom: 8,
          }}
          onPress={() => setAccordionOpen(!accordionOpen)}
        >
          <Text style={{ color: '#000', fontWeight: 'bold' }}>
            Accordion Item 1 {accordionOpen ? '▼' : '▶'}
          </Text>
        </TouchableOpacity>
        {accordionOpen && (
          <View style={{
            padding: 16,
            backgroundColor: '#F9FAFB',
            borderRadius: 8,
            marginBottom: 8,
          }}>
            <Text style={{ color: '#000' }}>
              This is the content for accordion item 1. It can contain any content.
            </Text>
          </View>
        )}
        
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            backgroundColor: '#F3F4F6',
            borderRadius: 8,
          }}
          onPress={() => {}}
        >
          <Text style={{ color: '#000', fontWeight: 'bold' }}>Accordion Item 2 ▶</Text>
        </TouchableOpacity>
      </View>
      
      {/* Loading Components */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Loading Components</Text>
      
      {/* Simple Skeleton Loader */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#000' }}>Skeleton Loader</Text>
        {skeletonLoading ? (
          <View style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 8 }}>
            <View style={{ height: 20, backgroundColor: '#E5E7EB', borderRadius: 4, marginBottom: 8 }} />
            <View style={{ height: 16, backgroundColor: '#E5E7EB', borderRadius: 4, width: '60%' }} />
          </View>
        ) : (
          <View style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 8 }}>
            <Text style={{ color: '#000' }}>Content loaded after skeleton</Text>
          </View>
        )}
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: '#2E86DE',
            borderRadius: 6,
            marginTop: 8,
            alignSelf: 'flex-start',
          }}
          onPress={() => setSkeletonLoading(!skeletonLoading)}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {skeletonLoading ? 'Hide Skeleton' : 'Show Skeleton'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Simple Spinner */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#000' }}>Simple Spinner</Text>
        <View style={{ alignItems: 'center' }}>
          <View style={{
            width: 40,
            height: 40,
            borderWidth: 4,
            borderColor: '#E5E7EB',
            borderTopColor: '#2E86DE',
            borderRadius: 20,
          }} />
        </View>
      </View>
      
      {/* Simple Progress Bar */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#000' }}>Simple Progress Bar</Text>
        <View style={{
          height: 8,
          backgroundColor: '#E5E7EB',
          borderRadius: 4,
          overflow: 'hidden',
        }}>
          <View style={{
            width: '75%',
            height: 8,
            backgroundColor: '#2E86DE',
            borderRadius: 4,
          }} />
        </View>
        <Text style={{ color: '#000', marginTop: 4, fontSize: 12 }}>75%</Text>
      </View>
      
      {/* Simple Feedback */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Simple Feedback</Text>
      
      {/* Simple Alert */}
      <View style={{ marginBottom: 16 }}>
        <View style={{
          padding: 16,
          backgroundColor: '#DBEAFE',
          borderLeftWidth: 4,
          borderLeftColor: '#2E86DE',
          borderRadius: 8,
        }}>
          <Text style={{ color: '#000', fontWeight: 'bold', marginBottom: 4 }}>
            Simple Alert
          </Text>
          <Text style={{ color: '#000' }}>
            This is a simple alert component with basic styling.
          </Text>
        </View>
      </View>
      
      {/* Simple Toast */}
      <View style={{ marginBottom: 16 }}>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: '#2E86DE',
            borderRadius: 6,
            alignSelf: 'flex-start',
          }}
          onPress={() => setToastVisible(true)}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Show Toast</Text>
        </TouchableOpacity>
        {toastVisible && (
          <View style={{
            position: 'absolute',
            top: 100,
            left: 20,
            right: 20,
            backgroundColor: '#10B981',
            padding: 16,
            borderRadius: 8,
            zIndex: 1000,
          }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              This is a toast notification
            </Text>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
              onPress={() => setToastVisible(false)}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>×</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* Simple Constellation */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Simple Constellation</Text>
      
      <TouchableOpacity
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: '#2E86DE',
          borderRadius: 6,
          alignSelf: 'flex-start',
          marginBottom: 16,
        }}
        onPress={() => setConstellationVisible(!constellationVisible)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {constellationVisible ? 'Hide Constellation' : 'Show Constellation'}
        </Text>
      </TouchableOpacity>
      
      {constellationVisible && (
        <View style={{ height: 200, backgroundColor: '#1F2937', borderRadius: 8, marginBottom: 16, position: 'relative' }}>
          {/* Stars */}
          <View style={{ position: 'absolute', top: 50, left: 50, width: 4, height: 4, backgroundColor: '#FFD700', borderRadius: 2 }} />
          <View style={{ position: 'absolute', top: 100, left: 150, width: 4, height: 4, backgroundColor: '#FFD700', borderRadius: 2 }} />
          <View style={{ position: 'absolute', top: 150, left: 250, width: 4, height: 4, backgroundColor: '#FFD700', borderRadius: 2 }} />
          {/* Connections */}
          <View style={{
            position: 'absolute',
            top: 52,
            left: 52,
            width: 100,
            height: 1,
            backgroundColor: '#FFD700',
            transform: [{ rotate: '45deg' }],
          }} />
          <View style={{
            position: 'absolute',
            top: 102,
            left: 152,
            width: 100,
            height: 1,
            backgroundColor: '#FFD700',
            transform: [{ rotate: '45deg' }],
          }} />
        </View>
      )}
      
      {/* Simple Orbital */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Simple Orbital</Text>
      
      <TouchableOpacity
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: '#2E86DE',
          borderRadius: 6,
          alignSelf: 'flex-start',
          marginBottom: 16,
        }}
        onPress={() => setOrbitalVisible(!orbitalVisible)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {orbitalVisible ? 'Hide Orbital' : 'Show Orbital'}
        </Text>
      </TouchableOpacity>
      
      {orbitalVisible && (
        <View style={{ height: 200, backgroundColor: '#1F2937', borderRadius: 8, marginBottom: 16, justifyContent: 'center', alignItems: 'center' }}>
          {/* Center */}
          <View style={{ width: 20, height: 20, backgroundColor: '#FFD700', borderRadius: 10 }} />
          {/* Orbital rings */}
          <View style={{
            position: 'absolute',
            width: 120,
            height: 120,
            borderWidth: 1,
            borderColor: '#FFD700',
            borderRadius: 60,
          }} />
          <View style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderWidth: 1,
            borderColor: '#FF6B6B',
            borderRadius: 100,
          }} />
          {/* Satellites */}
          <View style={{
            position: 'absolute',
            top: 40,
            left: 100,
            width: 10,
            height: 10,
            backgroundColor: '#FFD700',
            borderRadius: 5,
          }} />
          <View style={{
            position: 'absolute',
            top: 80,
            right: 50,
            width: 8,
            height: 8,
            backgroundColor: '#FF6B6B',
            borderRadius: 4,
          }} />
        </View>
      )}
      
      {/* Simple Particles */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Simple Particles</Text>
      
      <TouchableOpacity
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: '#2E86DE',
          borderRadius: 6,
          alignSelf: 'flex-start',
          marginBottom: 16,
        }}
        onPress={() => setParticlesVisible(!particlesVisible)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {particlesVisible ? 'Hide Particles' : 'Show Particles'}
        </Text>
      </TouchableOpacity>
      
      {particlesVisible && (
        <View style={{ height: 200, backgroundColor: '#1F2937', borderRadius: 8, marginBottom: 16, position: 'relative' }}>
          {/* Particles */}
          <View style={{ position: 'absolute', top: 100, left: 100, width: 6, height: 6, backgroundColor: '#2E86DE', borderRadius: 3 }} />
          <View style={{ position: 'absolute', top: 150, left: 200, width: 6, height: 6, backgroundColor: '#2E86DE', borderRadius: 3 }} />
          <View style={{ position: 'absolute', top: 200, left: 150, width: 6, height: 6, backgroundColor: '#2E86DE', borderRadius: 3 }} />
          <View style={{ position: 'absolute', top: 50, left: 250, width: 6, height: 6, backgroundColor: '#2E86DE', borderRadius: 3 }} />
          <View style={{ position: 'absolute', top: 180, left: 50, width: 6, height: 6, backgroundColor: '#2E86DE', borderRadius: 3 }} />
        </View>
      )}
      
      {/* Simple Floating */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Simple Floating</Text>
      
      <TouchableOpacity
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: '#2E86DE',
          borderRadius: 6,
          alignSelf: 'flex-start',
          marginBottom: 16,
        }}
        onPress={() => setFloatingVisible(!floatingVisible)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {floatingVisible ? 'Hide Floating' : 'Show Floating'}
        </Text>
      </TouchableOpacity>
      
      {floatingVisible && (
        <View style={{ height: 200, backgroundColor: '#1F2937', borderRadius: 8, marginBottom: 16, position: 'relative' }}>
          {/* Floating element */}
          <View style={{
            position: 'absolute',
            top: 100,
            left: 100,
            width: 30,
            height: 30,
            backgroundColor: '#2E86DE',
            borderRadius: 15,
          }} />
          {/* Floating trail */}
          <View style={{
            position: 'absolute',
            top: 115,
            left: 50,
            width: 50,
            height: 2,
            backgroundColor: '#2E86DE',
            borderRadius: 1,
          }} />
          <View style={{
            position: 'absolute',
            top: 115,
            left: 100,
            width: 50,
            height: 2,
            backgroundColor: '#2E86DE',
            borderRadius: 1,
          }} />
        </View>
      )}

      {/* ============================================================================
      NAVIGATION COMPONENTS DEMO
      ============================================================================ */}
      
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 32, marginBottom: 16, color: '#000' }}>Navigation Components</Text>
      
      {/* Status Bar Components */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Status Bar Components</Text>
      
      <View style={{ marginBottom: 16 }}>
        <StatusBarComponent 
          variant="light-content" 
          backgroundColor="#2E86DE"
          barStyle="light-content"
        />
        <View style={{ height: 20, backgroundColor: '#2E86DE', marginBottom: 8 }} />
        <Text style={{ fontSize: 12, color: '#666' }}>StatusBarComponent with light style</Text>
      </View>
      
      <View style={{ marginBottom: 16 }}>
        <StatusBarOverlay 
          backgroundColor="rgba(0,0,0,0.5)"
        />
        <View style={{ height: 20, backgroundColor: 'rgba(0,0,0,0.5)', marginBottom: 8 }} />
        <Text style={{ fontSize: 12, color: '#666' }}>StatusBarOverlay with dark style</Text>
      </View>
      
      <View style={{ marginBottom: 16 }}>
        <StatusBarBlur />
        <View style={{ height: 20, backgroundColor: 'rgba(255,255,255,0.3)', marginBottom: 8 }} />
        <Text style={{ fontSize: 12, color: '#666' }}>StatusBarBlur with light blur</Text>
      </View>
      
      {/* Header Components */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Header Components</Text>
      
      <View style={{ marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
        <PrimaryHeader
          title="Primary Header"
          subtitle="With subtitle"
        />
      </View>
      
      <View style={{ marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
        <SectionHeader
          title="Section Header"
          description="Section description"
        />
      </View>
      
      <TouchableOpacity
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: '#2E86DE',
          borderRadius: 6,
          alignSelf: 'flex-start',
          marginBottom: 16,
        }}
        onPress={() => setShowSearchHeader(!showSearchHeader)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {showSearchHeader ? 'Hide Search Header' : 'Show Search Header'}
        </Text>
      </TouchableOpacity>
      
      {showSearchHeader && (
        <View style={{ marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
          <SearchHeader
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}
      
      <View style={{ marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
        <HeaderOverlay />
      </View>
      
      <View style={{ marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
        <HeaderBase />
      </View>
      
      {/* Tab Navigation */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Tab Navigation</Text>
      
      <View style={{ marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
        <TabNavigation
          items={[
            { id: 'home', label: 'Home', icon: 'home' },
            { id: 'search', label: 'Search', icon: 'search' },
            { id: 'profile', label: 'Profile', icon: 'user' },
          ]}
          activeIndex={0}
          onTabPress={(index, item) => setActiveTab(item.id)}
        />
        <View style={{ padding: 16, backgroundColor: '#F9FAFB' }}>
          <Text style={{ color: '#666' }}>Active Tab: {activeTab}</Text>
        </View>
      </View>
      
      {/* Bottom Navigation */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Bottom Navigation</Text>
      
      <View style={{ marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
        <BottomNavigation
          items={[
            { id: 'home', label: 'Home', icon: 'home' },
            { id: 'search', label: 'Search', icon: 'search' },
            { id: 'favorites', label: 'Favorites', icon: 'heart' },
            { id: 'profile', label: 'Profile', icon: 'user' },
          ]}
          activeItemId={activeBottomTab}
          onItemSelect={setActiveBottomTab}
        />
        <View style={{ padding: 16, backgroundColor: '#F9FAFB' }}>
          <Text style={{ color: '#666' }}>Active Bottom Tab: {activeBottomTab}</Text>
        </View>
      </View>
      
      <View style={{ marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
        <BottomNavContainer>
          <BottomNavItem
            id="home"
            icon={{ name: 'home' }}
            label="Home"
            active={activeBottomTab === 'home'}
            onPress={() => setActiveBottomTab('home')}
          />
          <BottomNavItem
            id="search"
            icon={{ name: 'search' }}
            label="Search"
            active={activeBottomTab === 'search'}
            onPress={() => setActiveBottomTab('search')}
          />
          <BottomNavItem
            id="favorites"
            icon={{ name: 'heart' }}
            label="Favorites"
            active={activeBottomTab === 'favorites'}
            onPress={() => setActiveBottomTab('favorites')}
          />
          <BottomNavItem
            id="profile"
            icon={{ name: 'user' }}
            label="Profile"
            active={activeBottomTab === 'profile'}
            onPress={() => setActiveBottomTab('profile')}
          />
        </BottomNavContainer>
      </View>
      
      <View style={{ marginBottom: 16, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden', height: 100, position: 'relative' }}>
        <BottomNavOrb
          icon={{ name: 'plus' }}
          onPress={() => console.log('Orb pressed')}
          style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}
        />
        <View style={{ padding: 16, backgroundColor: '#F9FAFB' }}>
          <Text style={{ color: '#666' }}>Bottom Navigation with Orb</Text>
        </View>
      </View>
      
      {/* Floating Navigation */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>Floating Navigation</Text>
      
      <TouchableOpacity
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: '#2E86DE',
          borderRadius: 6,
          alignSelf: 'flex-start',
          marginBottom: 16,
        }}
        onPress={() => setShowFloatingOrb(!showFloatingOrb)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {showFloatingOrb ? 'Hide Floating Orb' : 'Show Floating Orb'}
        </Text>
      </TouchableOpacity>
      
      {showFloatingOrb && (
        <View style={{ height: 200, backgroundColor: '#1F2937', borderRadius: 8, marginBottom: 16, position: 'relative' }}>
          <NavigationFloatingOrb
            size="medium"
            onPress={() => console.log('Floating orb pressed')}
            style={{ position: 'absolute', top: 70, right: 20 }}
          />
          <Text style={{ color: 'white', position: 'absolute', bottom: 20, left: 20 }}>Floating Orb Navigation</Text>
        </View>
      )}
      
      <TouchableOpacity
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: '#2E86DE',
          borderRadius: 6,
          alignSelf: 'flex-start',
          marginBottom: 16,
        }}
        onPress={() => setShowFloatingFAB(!showFloatingFAB)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {showFloatingFAB ? 'Hide Floating FAB' : 'Show Floating FAB'}
        </Text>
      </TouchableOpacity>
      
      {showFloatingFAB && (
        <View style={{ height: 200, backgroundColor: '#1F2937', borderRadius: 8, marginBottom: 16, position: 'relative' }}>
          <FloatingFAB
            icon="plus"
            onPress={() => console.log('FAB pressed')}
            style={{ position: 'absolute', bottom: 20, right: 20 }}
          />
          <Text style={{ color: 'white', position: 'absolute', bottom: 20, left: 20 }}>Floating Action Button</Text>
        </View>
      )}

      {/* SegmentedTabs Demo */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 8, color: '#000' }}>SegmentedTabs Demo</Text>
      <SegmentedTabs
        segments={[
          { id: 'tab1', label: 'Tab 1' },
          { id: 'tab2', label: 'Tab 2' },
          { id: 'tab3', label: 'Tab 3' },
        ]}
        selectedIndex={tabIndex}
        onSelectionChange={setTabIndex}
        variant={SegmentedTabsVariant.PILLS}
        size={SegmentedTabsSize.MEDIUM}
        animation={SegmentedTabsAnimation.SMOOTH}
        styleConfig={{
          backgroundColor: '#fff',
          selectedBackgroundColor: '#2E86DE',
          borderColor: '#2E86DE',
          selectedBorderColor: '#FFD700',
          textColor: '#222',
          selectedTextColor: '#FFD700',
          borderRadius: 12,
          borderWidth: 1,
          shadow: false,
          elevation: 4,
        }}
        animationConfig={{ duration: 300, useNativeDriver: true, damping: 20, stiffness: 200 }}
        gestureConfig={{ enabled: true, swipeEnabled: true, hapticFeedback: true }}
        accessibilityLabel="Demo Segmented Tabs"
        accessibilityHint="Switch between tabs"
        testID="demo-segmented-tabs"
      />

    </ScrollView>
  );
};

export default DemoHomePage;
