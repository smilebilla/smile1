import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import NorthIndianChart from "../../components/astrology/NorthIndianChart";

const samplePositions = [
  { planet: "Sun", house: 1 },
  { planet: "Mercury", house: 1 },
  { planet: "Moon", house: 3 },
  { planet: "Venus", house: 4 },
  { planet: "Mars", house: 5 },
  { planet: "Jupiter", house: 6 },
  { planet: "Saturn", house: 7 },
  { planet: "Rahu", house: 8 },
  { planet: "Ketu", house: 9 },
  { planet: "Neptune", house: 11 },
  { planet: "Uranus", house: 12 },
  { planet: "Pluto", house: 12 },
];

const NorthIndianChartScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>
          North Indian Chart Demo
        </Text>
        <NorthIndianChart positions={samplePositions} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NorthIndianChartScreen;
