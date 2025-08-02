import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Spacer from '../Spacer';

const SpacerTest = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-6 text-gray-800">Spacer Component Test</Text>
      
      {/* Basic Spacer */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">Basic Spacer</Text>
        <View className="flex-row items-center bg-white p-4 rounded-lg">
          <View className="bg-blue-500 p-2 rounded">
            <Text className="text-white">Item 1</Text>
          </View>
          <Spacer />
          <View className="bg-green-500 p-2 rounded">
            <Text className="text-white">Item 2</Text>
          </View>
        </View>
      </View>
      
      {/* Size Variations */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">Size Variations</Text>
        <View className="bg-white p-4 rounded-lg">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Small</Text>
            </View>
            <Spacer size={8} />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">8px</Text>
            </View>
          </View>
          
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Medium</Text>
            </View>
            <Spacer size={16} />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">16px</Text>
            </View>
          </View>
          
          <View className="flex-row items-center">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Large</Text>
            </View>
            <Spacer size={32} />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">32px</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Direction Variations */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">Direction Variations</Text>
        <View className="bg-white p-4 rounded-lg">
          <Text className="text-sm mb-2 text-gray-600">Horizontal Spacer</Text>
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Left</Text>
            </View>
            <Spacer direction="horizontal" size={24} />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">Right</Text>
            </View>
          </View>
          
          <Text className="text-sm mb-2 text-gray-600">Vertical Spacer</Text>
          <View className="items-center">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Top</Text>
            </View>
            <Spacer direction="vertical" size={24} />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">Bottom</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Flexible Spacer */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">Flexible Spacer</Text>
        <View className="bg-white p-4 rounded-lg">
          <View className="flex-row items-center h-12 border border-gray-300 rounded">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Left</Text>
            </View>
            <Spacer flexible />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">Right</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Preset Configurations */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">Preset Configurations</Text>
        <View className="bg-white p-4 rounded-lg">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Minimal</Text>
            </View>
            <Spacer preset="minimal" />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">4px</Text>
            </View>
          </View>
          
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Compact</Text>
            </View>
            <Spacer preset="compact" />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">8px</Text>
            </View>
          </View>
          
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Comfortable</Text>
            </View>
            <Spacer preset="comfortable" />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">16px</Text>
            </View>
          </View>
          
          <View className="flex-row items-center">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Spacious</Text>
            </View>
            <Spacer preset="spacious" />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">24px</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Custom Width/Height */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">Custom Dimensions</Text>
        <View className="bg-white p-4 rounded-lg">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Custom Width</Text>
            </View>
            <Spacer width={50} />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">50px</Text>
            </View>
          </View>
          
          <View className="items-center">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Custom Height</Text>
            </View>
            <Spacer height={30} />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">30px</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Debug Visualization */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">Debug Visualization</Text>
        <View className="bg-white p-4 rounded-lg">
          <View className="flex-row items-center">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Debug</Text>
            </View>
            <Spacer debug size={40} />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">Visible</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Responsive Configuration */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">Responsive Configuration</Text>
        <View className="bg-white p-4 rounded-lg">
          <View className="flex-row items-center">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Responsive</Text>
            </View>
            <Spacer 
              responsive={{
                xs: { size: 8 },
                sm: { size: 16 },
                md: { size: 24 },
                lg: { size: 32 }
              }}
            />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">Adaptive</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Constraint Testing */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">Size Constraints</Text>
        <View className="bg-white p-4 rounded-lg">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Min Width</Text>
            </View>
            <Spacer minWidth={20} maxWidth={60} flexible />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">Max Width</Text>
            </View>
          </View>
          
          <View className="items-center">
            <View className="bg-blue-500 p-2 rounded">
              <Text className="text-white">Min Height</Text>
            </View>
            <Spacer minHeight={20} maxHeight={60} direction="vertical" />
            <View className="bg-green-500 p-2 rounded">
              <Text className="text-white">Max Height</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Section Spacers */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-gray-700">Section Spacers</Text>
        <View className="bg-white p-4 rounded-lg">
          <View className="bg-blue-500 p-4 rounded">
            <Text className="text-white text-center">Section 1</Text>
          </View>
          <Spacer preset="section" />
          <View className="bg-green-500 p-4 rounded">
            <Text className="text-white text-center">Section 2</Text>
          </View>
          <Spacer preset="page" />
          <View className="bg-purple-500 p-4 rounded">
            <Text className="text-white text-center">Section 3</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SpacerTest;
