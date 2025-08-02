import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import Code, { 
  CodeProps, 
  CodeRef,
  CodeSize,
  CodeWeight,
  CodeAlign,
  CodeColor,
  CodeAnimation,
  CodeVariant,
  CodeTheme,
} from '../Code';

/**
 * Code Component Test
 * 
 * A comprehensive test component for the Code primitive that demonstrates
 * all variants, props, and features of the component.
 */
const CodeTest: React.FC = () => {
  const codeRef = useRef<CodeRef>(null);
  
  // Test data
  const variants: CodeVariant[] = ['inline', 'block', 'snippet', 'command', 'output', 'highlight'];
  const sizes: CodeSize[] = ['small', 'medium', 'large'];
  const weights: CodeWeight[] = ['regular', 'medium', 'semibold'];
  const alignments: CodeAlign[] = ['left', 'center', 'right'];
  const colors: CodeColor[] = ['primary', 'secondary', 'accent', 'muted', 'inverse', 'error', 'warning', 'success', 'syntax'];
  const animations: CodeAnimation[] = ['none', 'fade', 'slide', 'scale', 'glow', 'type'];
  const themes: CodeTheme[] = ['dark', 'light', 'monokai', 'solarized', 'dracula', 'github'];

  // Interactive state
  const [variant, setVariant] = useState<CodeVariant>('inline');
  const [size, setSize] = useState<CodeSize>('medium');
  const [weight, setWeight] = useState<CodeWeight>('regular');
  const [align, setAlign] = useState<CodeAlign>('left');
  const [color, setColor] = useState<CodeColor>('primary');
  const [animation, setAnimation] = useState<CodeAnimation>('none');
  const [theme, setTheme] = useState<CodeTheme>('dark');
  const [animated, setAnimated] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [enableGlow, setEnableGlow] = useState(false);
  const [truncate, setTruncate] = useState(false);
  const [selectable, setSelectable] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [wrapLines, setWrapLines] = useState(false);

  // Sample code snippets
  const codeSnippets = {
    javascript: `const hello = (name) => {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome to Corp Astro\`;
};`,
    python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
    typescript: `interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = async (id: string): Promise<User> => {
  return await fetch(\`/api/users/\${id}\`).then(res => res.json());
};`,
    css: `.corp-astro-button {
  background: linear-gradient(135deg, #2E86DE 0%, #5758BB 100%);
  border-radius: 28px;
  padding: 0 32px;
  color: #FFFFFF;
  font-family: 'Futura PT';
  font-weight: 600;
  box-shadow: 0 8px 32px rgba(46,134,222,0.4);
}`,
    json: `{
  "name": "corp-astro",
  "version": "1.0.0",
  "description": "Corporate Mysticism UI Library",
  "main": "index.js",
  "dependencies": {
    "react": "^18.0.0",
    "react-native": "^0.72.0"
  }
}`,
    command: `npm install @corp-astro/ui
cd my-project
npm run dev`,
  };

  const longText = "This is a very long line of code that demonstrates text truncation and wrapping behavior in different scenarios and configurations.";

  // Interactive handlers
  const handleAnimate = () => {
    if (codeRef.current) {
      codeRef.current.animate(1, 500);
    }
  };

  const handleMeasure = () => {
    if (codeRef.current) {
      codeRef.current.measure().then(dimensions => {
        console.log('Code dimensions:', dimensions);
      });
    }
  };

  // Render button helper
  const renderButton = (label: string, isActive: boolean, onPress: () => void) => (
    <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, isActive && styles.activeButtonText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Code Component Test</Text>
        <Text style={styles.subtitle}>
          Comprehensive test of the Code primitive component
        </Text>
      </View>

      {/* Interactive Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactive Controls</Text>
        
        {/* Variant Selection */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Variant:</Text>
          <View style={styles.buttonRow}>
            {variants.map((v) => 
              renderButton(v, variant === v, () => setVariant(v))
            )}
          </View>
        </View>

        {/* Size Selection */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Size:</Text>
          <View style={styles.buttonRow}>
            {sizes.map((s) => 
              renderButton(s, size === s, () => setSize(s))
            )}
          </View>
        </View>

        {/* Weight Selection */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Weight:</Text>
          <View style={styles.buttonRow}>
            {weights.map((w) => 
              renderButton(w, weight === w, () => setWeight(w))
            )}
          </View>
        </View>

        {/* Alignment Selection */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Alignment:</Text>
          <View style={styles.buttonRow}>
            {alignments.map((a) => 
              renderButton(a, align === a, () => setAlign(a))
            )}
          </View>
        </View>

        {/* Color Selection */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Color:</Text>
          <View style={styles.buttonRow}>
            {colors.map((c) => 
              renderButton(c, color === c, () => setColor(c))
            )}
          </View>
        </View>

        {/* Animation Selection */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Animation:</Text>
          <View style={styles.buttonRow}>
            {animations.map((a) => 
              renderButton(a, animation === a, () => setAnimation(a))
            )}
          </View>
        </View>

        {/* Theme Selection */}
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Theme:</Text>
          <View style={styles.buttonRow}>
            {themes.map((t) => 
              renderButton(t, theme === t, () => setTheme(t))
            )}
          </View>
        </View>

        {/* Toggle Controls */}
        <View style={styles.controlGroup}>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Animated:</Text>
            <Switch value={animated} onValueChange={setAnimated} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Uppercase:</Text>
            <Switch value={uppercase} onValueChange={setUppercase} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Lowercase:</Text>
            <Switch value={lowercase} onValueChange={setLowercase} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Glow Effect:</Text>
            <Switch value={enableGlow} onValueChange={setEnableGlow} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Truncate:</Text>
            <Switch value={truncate} onValueChange={setTruncate} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Selectable:</Text>
            <Switch value={selectable} onValueChange={setSelectable} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Line Numbers:</Text>
            <Switch value={showLineNumbers} onValueChange={setShowLineNumbers} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.controlLabel}>Wrap Lines:</Text>
            <Switch value={wrapLines} onValueChange={setWrapLines} />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleAnimate}>
            <Text style={styles.actionButtonText}>Animate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleMeasure}>
            <Text style={styles.actionButtonText}>Measure</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Live Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Preview</Text>
        <View style={styles.previewContainer}>
          <Code
            ref={codeRef}
            variant={variant}
            size={size}
            weight={weight}
            align={align}
            color={color}
            animation={animation}
            theme={theme}
            animated={animated}
            uppercase={uppercase}
            lowercase={lowercase}
            enableGlow={enableGlow}
            truncate={truncate}
            selectable={selectable}
            showLineNumbers={showLineNumbers}
            wrapLines={wrapLines}
            testID="interactive-code"
          >
            {truncate ? longText : variant === 'inline' ? 'const hello = "world"' : codeSnippets.javascript}
          </Code>
        </View>
      </View>

      {/* Variant Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Variant Showcase</Text>
        <View style={styles.showcase}>
          {variants.map((variant) => (
            <View key={variant} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{variant}</Text>
              <Code variant={variant} testID={`variant-${variant}`}>
                {variant === 'inline' ? 'console.log("Hello")' : codeSnippets.javascript}
              </Code>
            </View>
          ))}
        </View>
      </View>

      {/* Size Variants Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Variants</Text>
        <View style={styles.showcase}>
          {sizes.map((size) => (
            <View key={size} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{size}</Text>
              <Code size={size} variant="block" testID={`size-${size}`}>
                {`// ${size} size code\nconst value = ${size === 'small' ? 12 : size === 'medium' ? 14 : 16};`}
              </Code>
            </View>
          ))}
        </View>
      </View>

      {/* Weight Variants Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weight Variants</Text>
        <View style={styles.showcase}>
          {weights.map((weight) => (
            <View key={weight} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{weight}</Text>
              <Code weight={weight} variant="block" testID={`weight-${weight}`}>
                {`// ${weight} weight code\nconst fontWeight = "${weight}";`}
              </Code>
            </View>
          ))}
        </View>
      </View>

      {/* Theme Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme Showcase</Text>
        <View style={styles.showcase}>
          {themes.map((theme) => (
            <View key={theme} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{theme}</Text>
              <Code theme={theme} variant="block" testID={`theme-${theme}`}>
                {`// ${theme} theme\nconst theme = "${theme}";\nconsole.log(theme);`}
              </Code>
            </View>
          ))}
        </View>
      </View>

      {/* Animation Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animation Showcase</Text>
        <View style={styles.showcase}>
          {animations.filter(a => a !== 'none').map((animation) => (
            <View key={animation} style={styles.showcaseItem}>
              <Text style={styles.showcaseLabel}>{animation}</Text>
              <Code 
                animation={animation} 
                animated={true} 
                animationLoop={true}
                variant="block"
                testID={`animation-${animation}`}
              >
                {`// ${animation} animation\nconst animate = "${animation}";`}
              </Code>
            </View>
          ))}
        </View>
      </View>

      {/* Language Examples */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language Examples</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>JavaScript</Text>
            <Code variant="block" language="javascript" testID="javascript-code">
              {codeSnippets.javascript}
            </Code>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Python</Text>
            <Code variant="block" language="python" testID="python-code">
              {codeSnippets.python}
            </Code>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>TypeScript</Text>
            <Code variant="block" language="typescript" testID="typescript-code">
              {codeSnippets.typescript}
            </Code>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>CSS</Text>
            <Code variant="block" language="css" testID="css-code">
              {codeSnippets.css}
            </Code>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>JSON</Text>
            <Code variant="block" language="json" testID="json-code">
              {codeSnippets.json}
            </Code>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Command Line</Text>
            <Code variant="command" language="shell" testID="command-code">
              {codeSnippets.command}
            </Code>
          </View>
        </View>
      </View>

      {/* Custom Styling Showcase */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styling</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Color</Text>
            <Code customColor="#FF6B6B" variant="block" testID="custom-color-code">
              {`// Custom color code\nconst color = "#FF6B6B";`}
            </Code>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Size</Text>
            <Code customSize={16} variant="block" testID="custom-size-code">
              {`// Custom size code\nconst size = 16;`}
            </Code>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Background</Text>
            <Code 
              backgroundColor="rgba(255, 107, 107, 0.1)" 
              borderColor="#FF6B6B"
              borderWidth={1}
              variant="block" 
              testID="custom-background-code"
            >
              {`// Custom background\nconst bg = "rgba(255, 107, 107, 0.1)";`}
            </Code>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Custom Style</Text>
            <Code 
              style={{ 
                fontStyle: 'italic',
                textDecorationLine: 'underline',
                textDecorationColor: '#2E86DE'
              }}
              variant="block"
              testID="custom-style-code"
            >
              {`// Custom style code\nconst style = "italic underline";`}
            </Code>
          </View>
        </View>
      </View>

      {/* Inline Code Examples */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inline Code Usage</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>In Paragraph</Text>
            <Text style={styles.paragraphText}>
              Use the <Code variant="inline">useState</Code> hook to manage component state. 
              You can also use <Code variant="inline">useEffect</Code> for side effects.
            </Text>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>With Highlighting</Text>
            <Text style={styles.paragraphText}>
              Install the package with <Code variant="highlight">npm install @corp-astro/ui</Code> and 
              import components like <Code variant="highlight">import {`{ Button }`} from '@corp-astro/ui'</Code>.
            </Text>
          </View>
        </View>
      </View>

      {/* Truncation Examples */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Truncation Examples</Text>
        <View style={styles.showcase}>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Normal Text</Text>
            <Code variant="block" testID="normal-text-code">
              {`const longVariableName = "This is a normal code block that will wrap to multiple lines if needed";`}
            </Code>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Truncated</Text>
            <Code variant="block" truncate={true} testID="truncated-code">
              {`const veryLongVariableNameThatWillBeTruncated = "This is a very long line of code that will be truncated with ellipsis";`}
            </Code>
          </View>
          <View style={styles.showcaseItem}>
            <Text style={styles.showcaseLabel}>Two Lines</Text>
            <Code variant="block" numberOfLines={2} testID="two-lines-code">
              {`const multiLineCode = {\n  first: "This is the first line",\n  second: "This is the second line",\n  third: "This line will be cut off"\n};`}
            </Code>
          </View>
        </View>
      </View>

      {/* Performance Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Test</Text>
        <View style={styles.performanceTest}>
          {Array.from({ length: 20 }, (_, index) => (
            <Code 
              key={index} 
              variant={variants[index % variants.length]}
              animation="fade"
              animated={true}
              testID={`performance-${index}`}
            >
              {`// Performance test ${index + 1}\nconst test = ${index + 1};`}
            </Code>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Corp Astro Code Component Test Complete
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08080F',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#B8B8C0',
    textAlign: 'center',
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  controlGroup: {
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 14,
    color: '#B8B8C0',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeButton: {
    backgroundColor: '#2E86DE',
    borderColor: '#2E86DE',
  },
  buttonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  activeButtonText: {
    color: '#FFFFFF',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2E86DE',
    marginTop: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  previewContainer: {
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  showcase: {
    gap: 16,
  },
  showcaseItem: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  showcaseLabel: {
    fontSize: 12,
    color: '#B8B8C0',
    marginBottom: 8,
    fontWeight: '500',
  },
  paragraphText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  performanceTest: {
    gap: 4,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
  },
});

export default CodeTest;
