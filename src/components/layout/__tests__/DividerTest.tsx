import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Divider from '../Divider';

const DividerTest = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8f9fa', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#1a202c' }}>
        Divider Component Test
      </Text>
      
      {/* Basic Horizontal Divider */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2d3748' }}>
          Basic Horizontal Divider
        </Text>
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <View style={{ backgroundColor: '#e3f2fd', padding: 12, borderRadius: 6 }}>
            <Text style={{ color: '#1976d2' }}>Content Above</Text>
          </View>
          <Divider />
          <View style={{ backgroundColor: '#e8f5e8', padding: 12, borderRadius: 6 }}>
            <Text style={{ color: '#388e3c' }}>Content Below</Text>
          </View>
        </View>
      </View>
      
      {/* Vertical Divider */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2d3748' }}>
          Vertical Divider
        </Text>
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 80 }}>
            <View style={{ backgroundColor: '#e3f2fd', padding: 12, borderRadius: 6, flex: 1 }}>
              <Text style={{ color: '#1976d2' }}>Left Content</Text>
            </View>
            <Divider orientation="vertical" length={60} />
            <View style={{ backgroundColor: '#e8f5e8', padding: 12, borderRadius: 6, flex: 1 }}>
              <Text style={{ color: '#388e3c' }}>Right Content</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Color Variants */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2d3748' }}>
          Color Variants
        </Text>
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Primary</Text>
          <Divider color="primary" />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Secondary</Text>
          <Divider color="secondary" />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Accent</Text>
          <Divider color="accent" />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Error</Text>
          <Divider color="error" />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Warning</Text>
          <Divider color="warning" />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Success</Text>
          <Divider color="success" />
        </View>
      </View>
      
      {/* Thickness Variants */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2d3748' }}>
          Thickness Variants
        </Text>
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>1px</Text>
          <Divider thickness={1} color="primary" />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>2px</Text>
          <Divider thickness={2} color="primary" />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>4px</Text>
          <Divider thickness={4} color="primary" />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>8px</Text>
          <Divider thickness={8} color="primary" />
        </View>
      </View>
      
      {/* Style Variants */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2d3748' }}>
          Style Variants
        </Text>
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Solid</Text>
          <Divider variant="solid" color="primary" thickness={2} />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Dashed</Text>
          <Divider variant="dashed" color="primary" thickness={2} />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Dotted</Text>
          <Divider variant="dotted" color="primary" thickness={2} />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Gradient</Text>
          <Divider 
            variant="gradient" 
            gradientColors={['#54A0FF', '#A55EEA']} 
            thickness={3} 
          />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Glow</Text>
          <Divider 
            variant="glow" 
            color="primary" 
            thickness={2} 
            glowIntensity={0.6} 
            glowRadius={15} 
          />
        </View>
      </View>
      
      {/* Spacing Variants */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2d3748' }}>
          Spacing Variants
        </Text>
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <View style={{ backgroundColor: '#f7fafc', padding: 8, borderRadius: 4 }}>
            <Text style={{ color: '#2d3748' }}>None Spacing</Text>
          </View>
          <Divider spacing="none" color="primary" />
          <View style={{ backgroundColor: '#f7fafc', padding: 8, borderRadius: 4 }}>
            <Text style={{ color: '#2d3748' }}>Content</Text>
          </View>
          
          <View style={{ backgroundColor: '#f7fafc', padding: 8, borderRadius: 4, marginTop: 16 }}>
            <Text style={{ color: '#2d3748' }}>Small Spacing</Text>
          </View>
          <Divider spacing="sm" color="primary" />
          <View style={{ backgroundColor: '#f7fafc', padding: 8, borderRadius: 4 }}>
            <Text style={{ color: '#2d3748' }}>Content</Text>
          </View>
          
          <View style={{ backgroundColor: '#f7fafc', padding: 8, borderRadius: 4, marginTop: 16 }}>
            <Text style={{ color: '#2d3748' }}>Large Spacing</Text>
          </View>
          <Divider spacing="xl" color="primary" />
          <View style={{ backgroundColor: '#f7fafc', padding: 8, borderRadius: 4 }}>
            <Text style={{ color: '#2d3748' }}>Content</Text>
          </View>
        </View>
      </View>
      
      {/* Inset Dividers */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2d3748' }}>
          Inset Dividers
        </Text>
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <View style={{ backgroundColor: '#f7fafc', padding: 8, borderRadius: 4 }}>
            <Text style={{ color: '#2d3748' }}>Regular Divider</Text>
          </View>
          <Divider color="primary" />
          <View style={{ backgroundColor: '#f7fafc', padding: 8, borderRadius: 4 }}>
            <Text style={{ color: '#2d3748' }}>Content</Text>
          </View>
          
          <View style={{ backgroundColor: '#f7fafc', padding: 8, borderRadius: 4, marginTop: 16 }}>
            <Text style={{ color: '#2d3748' }}>Inset Divider</Text>
          </View>
          <Divider color="primary" inset insetAmount={24} />
          <View style={{ backgroundColor: '#f7fafc', padding: 8, borderRadius: 4 }}>
            <Text style={{ color: '#2d3748' }}>Content</Text>
          </View>
        </View>
      </View>
      
      {/* Opacity Variants */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2d3748' }}>
          Opacity Variants
        </Text>
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Opacity 1.0</Text>
          <Divider color="primary" opacity={1.0} thickness={2} />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Opacity 0.7</Text>
          <Divider color="primary" opacity={0.7} thickness={2} />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Opacity 0.5</Text>
          <Divider color="primary" opacity={0.5} thickness={2} />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Opacity 0.3</Text>
          <Divider color="primary" opacity={0.3} thickness={2} />
        </View>
      </View>
      
      {/* Preset Configurations */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2d3748' }}>
          Preset Configurations
        </Text>
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Subtle</Text>
          <Divider preset="subtle" />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Prominent</Text>
          <Divider preset="prominent" />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Section</Text>
          <Divider preset="section" />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Card</Text>
          <Divider preset="card" />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>List</Text>
          <Divider preset="list" />
          
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Nav</Text>
          <Divider preset="nav" />
        </View>
      </View>
      
      {/* Responsive Configuration */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2d3748' }}>
          Responsive Configuration
        </Text>
        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8 }}>
          <Text style={{ marginBottom: 8, color: '#4a5568' }}>Responsive Divider</Text>
          <Divider 
            responsive={{
              xs: { thickness: 1, color: 'muted' },
              sm: { thickness: 2, color: 'primary' },
              md: { thickness: 3, color: 'accent' },
              lg: { thickness: 4, color: 'success' }
            }}
          />
        </View>
      </View>
      
      {/* List Example */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2d3748' }}>
          List Example
        </Text>
        <View style={{ backgroundColor: 'white', borderRadius: 8 }}>
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#1a202c' }}>Item 1</Text>
            <Text style={{ fontSize: 14, color: '#4a5568' }}>Description for item 1</Text>
          </View>
          <Divider preset="list" />
          
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#1a202c' }}>Item 2</Text>
            <Text style={{ fontSize: 14, color: '#4a5568' }}>Description for item 2</Text>
          </View>
          <Divider preset="list" />
          
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#1a202c' }}>Item 3</Text>
            <Text style={{ fontSize: 14, color: '#4a5568' }}>Description for item 3</Text>
          </View>
        </View>
      </View>
      
      {/* Card Example */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2d3748' }}>
          Card Example
        </Text>
        <View style={{ backgroundColor: 'white', borderRadius: 8, padding: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#1a202c', marginBottom: 8 }}>
            Card Title
          </Text>
          <Text style={{ fontSize: 14, color: '#4a5568', marginBottom: 16 }}>
            Card subtitle or description
          </Text>
          
          <Divider preset="card" />
          
          <View style={{ paddingVertical: 16 }}>
            <Text style={{ fontSize: 16, color: '#1a202c' }}>Card Content</Text>
            <Text style={{ fontSize: 14, color: '#4a5568', marginTop: 8 }}>
              This is some content inside the card that comes after the divider.
            </Text>
          </View>
          
          <Divider preset="card" />
          
          <View style={{ paddingTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 14, color: '#54A0FF' }}>Action 1</Text>
            <Text style={{ fontSize: 14, color: '#54A0FF' }}>Action 2</Text>
          </View>
        </View>
      </View>
      
      {/* Navigation Example */}
      <View style={{ marginBottom: 32 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#2d3748' }}>
          Navigation Example
        </Text>
        <View style={{ backgroundColor: 'white', borderRadius: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#54A0FF' }}>Home</Text>
            </View>
            <Divider orientation="vertical" preset="nav" length={40} />
            
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#4a5568' }}>About</Text>
            </View>
            <Divider orientation="vertical" preset="nav" length={40} />
            
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#4a5568' }}>Contact</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DividerTest;
