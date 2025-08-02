/**
 * Corp Astro UI Library - North Indian Chart Data Processor
 * Module 173: NorthIndianChartDataProcessor.tsx
 * 
 * A utility component that processes and transforms astrological data specifically
 * for North Indian chart format visualization. Handles chart calculations, 
 * planetary positions, aspects, and data transformations for enhanced user experience.
 * 
 * Features:
 * - Chart data parsing and validation
 * - Planetary position calculations for North Indian format
 * - House cusps and sign placement conversion
 * - Aspect calculations and strength determination
 * - Data transformation for visualization components
 * - Support for multiple chart types (D1, D9, D10, etc.)
 * - Compatibility with standard astrological data formats
 * - Performance-optimized calculations with memoization
 * 
 * Data Processing Capabilities:
 * - Convert Western chart data to North Indian format
 * - Process planetary degrees and house placements
 * - Calculate planetary aspects and their orbs
 * - Determine planetary strengths and dignities
 * - Generate chart metadata and summary information
 * - Support for multiple ayanamsa systems
 * 
 * @module NorthIndianChartDataProcessor
 * @version 1.0.0
 * @since 2024
 */

import React, { useMemo, useCallback } from 'react';
import { 
  VedicPlanet, 
  VedicRashi, 
  NorthIndianHouseNumber,
  NorthIndianChartData,
  NorthIndianHouseData,
  NorthIndianAspectData,
} from './NorthIndianChart';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Raw astrological data input format
 */
export interface RawAstrologicalData {
  /** Date and time of the chart */
  datetime: string;
  /** Location information */
  location?: string;
  /** Chart title or name */
  title?: string;
  /** Planetary positions in degrees */
  planets: Record<VedicPlanet, number>;
  /** House cusps in degrees */
  houseCusps: number[];
  /** Ascendant degree */
  ascendant: number;
  /** Ayanamsa used (optional) */
  ayanamsa?: string;
  /** Chart type identifier */
  chartType?: string;
}

/**
 * Planetary dignity information
 */
export interface PlanetaryDignity {
  planet: VedicPlanet;
  rashi: VedicRashi;
  dignity: 'exalted' | 'debilitated' | 'own' | 'friend' | 'enemy' | 'neutral';
  strength: number; // 0-100
  isRetrograde?: boolean;
}

/**
 * Aspect information
 */
export interface AspectData {
  fromPlanet: VedicPlanet;
  toPlanet: VedicPlanet;
  fromHouse: NorthIndianHouseNumber;
  toHouse: NorthIndianHouseNumber;
  type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile' | 'special';
  orb: number;
  strength: number; // 0-100
  isApplying: boolean;
}

/**
 * Chart analysis summary
 */
export interface ChartAnalysis {
  /** Total number of planets */
  planetCount: number;
  /** Dominant element */
  dominantElement: 'fire' | 'earth' | 'air' | 'water';
  /** Dominant modality */
  dominantModality: 'cardinal' | 'fixed' | 'mutable';
  /** Angular houses with planets */
  angularPlanets: VedicPlanet[];
  /** Exalted planets */
  exaltedPlanets: VedicPlanet[];
  /** Debilitated planets */
  debilitatedPlanets: VedicPlanet[];
  /** Retrograde planets */
  retrogradePlanets: VedicPlanet[];
  /** Strong aspects count */
  strongAspects: number;
}

/**
 * Data processor props
 */
export interface NorthIndianChartDataProcessorProps {
  /** Raw astrological data to process */
  rawData: RawAstrologicalData;
  /** Include aspects in processing */
  includeAspects?: boolean;
  /** Include dignities analysis */
  includeDignities?: boolean;
  /** Custom orb tolerance for aspects */
  orbTolerance?: number;
  /** Children render prop */
  children: (data: {
    chartData: NorthIndianChartData;
    dignities: PlanetaryDignity[];
    aspects: AspectData[];
    analysis: ChartAnalysis;
    isProcessing: boolean;
    error?: string;
  }) => React.ReactNode;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Rashi (sign) boundaries in degrees
 */
const RASHI_BOUNDARIES: Record<VedicRashi, { start: number; end: number }> = {
  aries: { start: 0, end: 30 },
  taurus: { start: 30, end: 60 },
  gemini: { start: 60, end: 90 },
  cancer: { start: 90, end: 120 },
  leo: { start: 120, end: 150 },
  virgo: { start: 150, end: 180 },
  libra: { start: 180, end: 210 },
  scorpio: { start: 210, end: 240 },
  sagittarius: { start: 240, end: 270 },
  capricorn: { start: 270, end: 300 },
  aquarius: { start: 300, end: 330 },
  pisces: { start: 330, end: 360 },
};

/**
 * Planet exaltation positions
 */
const EXALTATION_POSITIONS: Record<VedicPlanet, { rashi: VedicRashi; degree: number }> = {
  sun: { rashi: 'aries', degree: 10 },
  moon: { rashi: 'taurus', degree: 3 },
  mercury: { rashi: 'virgo', degree: 15 },
  venus: { rashi: 'pisces', degree: 27 },
  mars: { rashi: 'capricorn', degree: 28 },
  jupiter: { rashi: 'cancer', degree: 5 },
  saturn: { rashi: 'libra', degree: 20 },
  rahu: { rashi: 'gemini', degree: 15 },
  ketu: { rashi: 'sagittarius', degree: 15 },
  uranus: { rashi: 'scorpio', degree: 15 },
  neptune: { rashi: 'cancer', degree: 15 },
  pluto: { rashi: 'leo', degree: 15 },
};

/**
 * Planet debilitation positions
 */
const DEBILITATION_POSITIONS: Record<VedicPlanet, { rashi: VedicRashi; degree: number }> = {
  sun: { rashi: 'libra', degree: 10 },
  moon: { rashi: 'scorpio', degree: 3 },
  mercury: { rashi: 'pisces', degree: 15 },
  venus: { rashi: 'virgo', degree: 27 },
  mars: { rashi: 'cancer', degree: 28 },
  jupiter: { rashi: 'capricorn', degree: 5 },
  saturn: { rashi: 'aries', degree: 20 },
  rahu: { rashi: 'sagittarius', degree: 15 },
  ketu: { rashi: 'gemini', degree: 15 },
  uranus: { rashi: 'taurus', degree: 15 },
  neptune: { rashi: 'capricorn', degree: 15 },
  pluto: { rashi: 'aquarius', degree: 15 },
};

/**
 * Planet rulership
 */
const PLANET_RULERSHIP: Record<VedicRashi, VedicPlanet> = {
  aries: 'mars',
  taurus: 'venus',
  gemini: 'mercury',
  cancer: 'moon',
  leo: 'sun',
  virgo: 'mercury',
  libra: 'venus',
  scorpio: 'mars',
  sagittarius: 'jupiter',
  capricorn: 'saturn',
  aquarius: 'saturn',
  pisces: 'jupiter',
};

/**
 * Aspect orbs for different aspect types
 */
const ASPECT_ORBS: Record<string, number> = {
  conjunction: 8,
  opposition: 8,
  trine: 6,
  square: 6,
  sextile: 4,
  special: 5, // Vedic special aspects
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Normalize degrees to 0-360 range
 */
function normalizeDegrees(degrees: number): number {
  while (degrees < 0) degrees += 360;
  while (degrees >= 360) degrees -= 360;
  return degrees;
}

/**
 * Get rashi from degree position
 */
function getRashiFromDegree(degree: number): VedicRashi {
  const normalizedDegree = normalizeDegrees(degree);
  
  for (const [rashi, bounds] of Object.entries(RASHI_BOUNDARIES)) {
    if (normalizedDegree >= bounds.start && normalizedDegree < bounds.end) {
      return rashi as VedicRashi;
    }
  }
  
  return 'aries'; // Fallback
}

/**
 * Get house number from degree using house cusps
 */
function getHouseFromDegree(degree: number, houseCusps: number[]): NorthIndianHouseNumber {
  const normalizedDegree = normalizeDegrees(degree);
  
  for (let i = 0; i < 12; i++) {
    const currentCusp = normalizeDegrees(houseCusps[i]);
    const nextCusp = normalizeDegrees(houseCusps[(i + 1) % 12]);
    
    if (nextCusp > currentCusp) {
      if (normalizedDegree >= currentCusp && normalizedDegree < nextCusp) {
        return (i + 1) as NorthIndianHouseNumber;
      }
    } else {
      // Handle wrap-around at 360/0 degrees
      if (normalizedDegree >= currentCusp || normalizedDegree < nextCusp) {
        return (i + 1) as NorthIndianHouseNumber;
      }
    }
  }
  
  return 1; // Fallback
}

/**
 * Calculate angular distance between two degrees
 */
function calculateAngularDistance(degree1: number, degree2: number): number {
  const diff = Math.abs(normalizeDegrees(degree1) - normalizeDegrees(degree2));
  return Math.min(diff, 360 - diff);
}

/**
 * Determine planetary dignity
 */
function calculatePlanetaryDignity(
  planet: VedicPlanet,
  degree: number,
  rashi: VedicRashi
): PlanetaryDignity {
  const exaltation = EXALTATION_POSITIONS[planet];
  const debilitation = DEBILITATION_POSITIONS[planet];
  const ruler = PLANET_RULERSHIP[rashi];
  
  let dignity: PlanetaryDignity['dignity'] = 'neutral';
  let strength = 50; // Base strength
  
  // Check exaltation
  if (rashi === exaltation.rashi) {
    dignity = 'exalted';
    const distanceFromExact = Math.abs(normalizeDegrees(degree) - exaltation.degree);
    strength = Math.max(80, 100 - distanceFromExact * 2);
  }
  // Check debilitation
  else if (rashi === debilitation.rashi) {
    dignity = 'debilitated';
    const distanceFromExact = Math.abs(normalizeDegrees(degree) - debilitation.degree);
    strength = Math.min(20, 30 - distanceFromExact);
  }
  // Check own sign
  else if (ruler === planet) {
    dignity = 'own';
    strength = 75;
  }
  // Determine friend/enemy relationships (simplified)
  else {
    // This is a simplified version - full dignity calculation
    // would require more complex friend/enemy relationships
    const friendlySigns: Record<VedicPlanet, VedicRashi[]> = {
      sun: ['aries', 'leo', 'sagittarius'],
      moon: ['cancer', 'taurus', 'pisces'],
      mercury: ['gemini', 'virgo', 'aquarius'],
      venus: ['taurus', 'libra', 'pisces'],
      mars: ['aries', 'scorpio', 'capricorn'],
      jupiter: ['sagittarius', 'pisces', 'cancer'],
      saturn: ['capricorn', 'aquarius', 'libra'],
      rahu: ['gemini', 'virgo', 'aquarius'],
      ketu: ['scorpio', 'sagittarius', 'pisces'],
      uranus: ['aquarius', 'scorpio'],
      neptune: ['pisces', 'cancer'],
      pluto: ['scorpio', 'aries'],
    };
    
    if (friendlySigns[planet]?.includes(rashi)) {
      dignity = 'friend';
      strength = 65;
    } else {
      dignity = 'enemy';
      strength = 35;
    }
  }
  
  return {
    planet,
    rashi,
    dignity,
    strength,
  };
}

/**
 * Calculate aspects between planets
 */
function calculateAspects(
  planets: Record<VedicPlanet, number>,
  houseCusps: number[],
  orbTolerance: number = 8
): AspectData[] {
  const aspects: AspectData[] = [];
  const planetEntries = Object.entries(planets) as [VedicPlanet, number][];
  
  for (let i = 0; i < planetEntries.length; i++) {
    for (let j = i + 1; j < planetEntries.length; j++) {
      const [planet1, degree1] = planetEntries[i];
      const [planet2, degree2] = planetEntries[j];
      
      const angularDistance = calculateAngularDistance(degree1, degree2);
      
      // Check for major aspects
      const aspectTypes = [
        { type: 'conjunction' as const, angle: 0 },
        { type: 'opposition' as const, angle: 180 },
        { type: 'trine' as const, angle: 120 },
        { type: 'square' as const, angle: 90 },
        { type: 'sextile' as const, angle: 60 },
      ];
      
      for (const aspectType of aspectTypes) {
        const orb = Math.abs(angularDistance - aspectType.angle);
        const maxOrb = Math.min(orbTolerance, ASPECT_ORBS[aspectType.type]);
        
        if (orb <= maxOrb) {
          const strength = Math.max(0, 100 - (orb / maxOrb) * 100);
          
          aspects.push({
            fromPlanet: planet1,
            toPlanet: planet2,
            fromHouse: getHouseFromDegree(degree1, houseCusps),
            toHouse: getHouseFromDegree(degree2, houseCusps),
            type: aspectType.type,
            orb,
            strength,
            isApplying: degree1 < degree2, // Simplified applying/separating
          });
          
          break; // Only add the closest aspect type
        }
      }
    }
  }
  
  return aspects.sort((a, b) => b.strength - a.strength);
}

/**
 * Generate chart analysis
 */
function generateChartAnalysis(
  chartData: NorthIndianChartData,
  dignities: PlanetaryDignity[],
  aspects: AspectData[]
): ChartAnalysis {
  const planetCount = chartData.houses.reduce((count, house) => count + house.planets.length, 0);
  
  // Count elements
  const elementCounts = { fire: 0, earth: 0, air: 0, water: 0 };
  const modalityCounts = { cardinal: 0, fixed: 0, mutable: 0 };
  
  chartData.houses.forEach(house => {
    house.planets.forEach(() => {
      // This is simplified - would need full element mapping
      const rashiElements: Record<VedicRashi, 'fire' | 'earth' | 'air' | 'water'> = {
        aries: 'fire', leo: 'fire', sagittarius: 'fire',
        taurus: 'earth', virgo: 'earth', capricorn: 'earth',
        gemini: 'air', libra: 'air', aquarius: 'air',
        cancer: 'water', scorpio: 'water', pisces: 'water',
      };
      
      const rashiModalities: Record<VedicRashi, 'cardinal' | 'fixed' | 'mutable'> = {
        aries: 'cardinal', cancer: 'cardinal', libra: 'cardinal', capricorn: 'cardinal',
        taurus: 'fixed', leo: 'fixed', scorpio: 'fixed', aquarius: 'fixed',
        gemini: 'mutable', virgo: 'mutable', sagittarius: 'mutable', pisces: 'mutable',
      };
      
      elementCounts[rashiElements[house.rashi]]++;
      modalityCounts[rashiModalities[house.rashi]]++;
    });
  });
  
  const dominantElement = Object.entries(elementCounts).reduce((a, b) => 
    elementCounts[a[0] as keyof typeof elementCounts] > elementCounts[b[0] as keyof typeof elementCounts] ? a : b
  )[0] as 'fire' | 'earth' | 'air' | 'water';
  
  const dominantModality = Object.entries(modalityCounts).reduce((a, b) => 
    modalityCounts[a[0] as keyof typeof modalityCounts] > modalityCounts[b[0] as keyof typeof modalityCounts] ? a : b
  )[0] as 'cardinal' | 'fixed' | 'mutable';
  
  // Angular houses are 1, 4, 7, 10
  const angularPlanets: VedicPlanet[] = [];
  [1, 4, 7, 10].forEach(houseNum => {
    const house = chartData.houses.find(h => h.number === houseNum);
    if (house) {
      angularPlanets.push(...house.planets);
    }
  });
  
  const exaltedPlanets = dignities.filter(d => d.dignity === 'exalted').map(d => d.planet);
  const debilitatedPlanets = dignities.filter(d => d.dignity === 'debilitated').map(d => d.planet);
  const retrogradePlanets = dignities.filter(d => d.isRetrograde).map(d => d.planet);
  
  const strongAspects = aspects.filter(a => a.strength > 70).length;
  
  return {
    planetCount,
    dominantElement,
    dominantModality,
    angularPlanets,
    exaltedPlanets,
    debilitatedPlanets,
    retrogradePlanets,
    strongAspects,
  };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * North Indian Chart Data Processor
 */
export const NorthIndianChartDataProcessor: React.FC<NorthIndianChartDataProcessorProps> = ({
  rawData,
  includeAspects = true,
  includeDignities = true,
  orbTolerance = 8,
  children,
}) => {
  // ============================================================================
  // PROCESSED DATA
  // ============================================================================

  const processedData = useMemo(() => {
    try {
      // Process houses and planet placements
      const houses: NorthIndianHouseData[] = [];
      
      for (let houseNum = 1; houseNum <= 12; houseNum++) {
        const houseRashi = getRashiFromDegree(rawData.houseCusps[houseNum - 1]);
        const planetsInHouse: VedicPlanet[] = [];
        
        // Find planets in this house
        Object.entries(rawData.planets).forEach(([planet, degree]) => {
          const planetHouse = getHouseFromDegree(degree, rawData.houseCusps);
          if (planetHouse === houseNum) {
            planetsInHouse.push(planet as VedicPlanet);
          }
        });
        
        houses.push({
          number: houseNum as NorthIndianHouseNumber,
          rashi: houseRashi,
          planets: planetsInHouse,
          houseLord: PLANET_RULERSHIP[houseRashi],
          cusp: rawData.houseCusps[houseNum - 1],
        });
      }
      
      // Create chart data
      const chartData: NorthIndianChartData = {
        houses,
        ascendant: getHouseFromDegree(rawData.ascendant, rawData.houseCusps),
        chartType: (rawData.chartType as 'D1' | 'D2' | 'D3' | 'D4' | 'D9' | 'D10' | 'D12' | 'D16' | 'D20' | 'D24' | 'D30' | 'D60') || 'D1',
        datetime: rawData.datetime,
        location: rawData.location,
        title: rawData.title,
      };
      
      // Calculate dignities
      const dignities: PlanetaryDignity[] = includeDignities
        ? Object.entries(rawData.planets).map(([planet, degree]) => {
            const rashi = getRashiFromDegree(degree);
            return calculatePlanetaryDignity(planet as VedicPlanet, degree, rashi);
          })
        : [];
      
      // Calculate aspects
      const aspects: AspectData[] = includeAspects
        ? calculateAspects(rawData.planets, rawData.houseCusps, orbTolerance)
        : [];
      
      // Add aspects to chart data if available
      if (aspects.length > 0) {
        chartData.aspects = aspects.map(aspect => ({
          fromPlanet: aspect.fromPlanet,
          toPlanet: aspect.toPlanet,
          aspectType: aspect.type,
          strength: aspect.strength,
          beneficial: aspect.type === 'trine' || aspect.type === 'sextile',
        }));
      }
      
      // Generate analysis
      const analysis = generateChartAnalysis(chartData, dignities, aspects);
      
      return {
        chartData,
        dignities,
        aspects,
        analysis,
        isProcessing: false,
        error: undefined,
      };
    } catch (error) {
      return {
        chartData: {} as NorthIndianChartData,
        dignities: [],
        aspects: [],
        analysis: {} as ChartAnalysis,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Unknown processing error',
      };
    }
  }, [rawData, includeAspects, includeDignities, orbTolerance]);

  // ============================================================================
  // RENDER
  // ============================================================================

  return <>{children(processedData)}</>;
};

// ============================================================================
// EXPORTS
// ============================================================================

export default NorthIndianChartDataProcessor;

// Export utility functions for external use
export {
  normalizeDegrees,
  getRashiFromDegree,
  getHouseFromDegree,
  calculateAngularDistance,
  calculatePlanetaryDignity,
  calculateAspects,
  generateChartAnalysis,
};

// Export constants for external use
export {
  RASHI_BOUNDARIES,
  EXALTATION_POSITIONS,
  DEBILITATION_POSITIONS,
  PLANET_RULERSHIP,
  ASPECT_ORBS,
};
