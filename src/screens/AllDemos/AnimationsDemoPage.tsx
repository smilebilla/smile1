import React, { useState, useRef } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions,
  Animated,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const AnimationsDemoPage: React.FC = () => {
  // State for controlling animations
  const [activeAnimations, setActiveAnimations] = useState<Set<string>>(new Set());
  const [particleCount, setParticleCount] = useState(10);

  // Animation refs
  const fadeAnimations = useRef<{ [key: string]: any }>({});
  const slideAnimations = useRef<{ [key: string]: any }>({});
  const particleAnimations = useRef<{ [key: string]: any }>({});
  const orbitalAnimations = useRef<{ [key: string]: any }>({});
  const cosmicAnimations = useRef<{ [key: string]: any }>({});
  const constellationAnimations = useRef<{ [key: string]: any }>({});

  // ============================================================================
  // FADE TRANSITIONS DEMO
  // ============================================================================

  const createFadeDemo = (direction: string, timing: string = 'normal') => {
    const key = `fade-${direction}-${timing}`;
    const animatedValue = new Animated.Value(0);
    
    const duration = timing === 'instant' ? 100 : timing === 'quick' ? 200 : timing === 'slow' ? 500 : timing === 'gentle' ? 800 : 300;
    
    const animation = {
      value: animatedValue,
      controls: {
        start: () => {
          // Reset to initial state
          animatedValue.setValue(direction.includes('in') ? 0 : 1);
          
          Animated.timing(animatedValue, {
            toValue: direction.includes('in') ? 1 : 0,
            duration,
            useNativeDriver: true
          }).start();
        },
        stop: () => {
          animatedValue.stopAnimation();
        }
      }
    };
    
    fadeAnimations.current[key] = animation;
    return animation;
  };

  const toggleFadeAnimation = (direction: string, timing: string = 'normal') => {
    const key = `fade-${direction}-${timing}`;
    const animation = fadeAnimations.current[key] || createFadeDemo(direction, timing);
    
    if (activeAnimations.has(key)) {
      animation.controls.stop();
      setActiveAnimations(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    } else {
      animation.controls.start();
      setActiveAnimations(prev => new Set(prev).add(key));
    }
  };

  // ============================================================================
  // SLIDE TRANSITIONS DEMO
  // ============================================================================

  const createSlideDemo = (direction: string, timing: string = 'normal') => {
    const key = `slide-${direction}-${timing}`;
    const animatedValue = new Animated.Value(0);
    
    const duration = timing === 'instant' ? 100 : timing === 'quick' ? 200 : timing === 'slow' ? 500 : timing === 'gentle' ? 800 : 300;
    
    const animation = {
      value: animatedValue,
      controls: {
        start: () => {
          Animated.timing(animatedValue, {
            toValue: 1,
            duration,
            useNativeDriver: true
          }).start();
        },
        stop: () => {
          animatedValue.stopAnimation();
        }
      }
    };
    
    slideAnimations.current[key] = animation;
    return animation;
  };

  const toggleSlideAnimation = (direction: string, timing: string = 'normal') => {
    const key = `slide-${direction}-${timing}`;
    const animation = slideAnimations.current[key] || createSlideDemo(direction, timing);
    
    if (activeAnimations.has(key)) {
      animation.controls.stop();
      setActiveAnimations(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    } else {
      animation.controls.start();
      setActiveAnimations(prev => new Set(prev).add(key));
    }
  };

  // ============================================================================
  // PARTICLE MOTION DEMO
  // ============================================================================

  const createParticleDemo = (motionType: string) => {
    const key = `particle-${motionType}`;
    const animatedValue = new Animated.Value(0);
    
    const animation = {
      value: animatedValue,
      controls: {
        start: () => {
          Animated.loop(
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true
            })
          ).start();
        },
        stop: () => {
          animatedValue.stopAnimation();
        }
      }
    };
    
    particleAnimations.current[key] = animation;
    return animation;
  };

  const toggleParticleAnimation = (motionType: string) => {
    const key = `particle-${motionType}`;
    const animation = particleAnimations.current[key] || createParticleDemo(motionType);
    
    if (activeAnimations.has(key)) {
      animation.controls.stop();
      setActiveAnimations(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    } else {
      animation.controls.start();
      setActiveAnimations(prev => new Set(prev).add(key));
    }
  };

  // ============================================================================
  // ORBITAL ROTATION DEMO
  // ============================================================================

  const createOrbitalDemo = (speed: string, direction: string = 'normal') => {
    const key = `orbital-${speed}-${direction}`;
    const animatedValue = new Animated.Value(0);
    
    // Calculate duration based on speed
    const duration = speed === 'slow' ? 3000 : speed === 'medium' ? 2000 : 1000;
    
    const animation = {
      value: animatedValue,
      controls: {
        start: () => {
          Animated.loop(
            Animated.timing(animatedValue, {
              toValue: 1,
              duration,
              useNativeDriver: true
            })
          ).start();
        },
        stop: () => {
          animatedValue.stopAnimation();
        }
      }
    };
    
    orbitalAnimations.current[key] = animation;
    return animation;
  };

  const toggleOrbitalAnimation = (speed: string, direction: string = 'normal') => {
    const key = `orbital-${speed}-${direction}`;
    const animation = orbitalAnimations.current[key] || createOrbitalDemo(speed, direction);
    
    if (activeAnimations.has(key)) {
      animation.controls.stop();
      setActiveAnimations(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    } else {
      animation.controls.start();
      setActiveAnimations(prev => new Set(prev).add(key));
    }
  };

  // ============================================================================
  // COSMIC ANIMATIONS DEMO
  // ============================================================================

  const createCosmicDemo = (timing: string) => {
    const key = `cosmic-${timing}`;
    const animatedValue = new Animated.Value(0);
    
    const duration = timing === 'instant' ? 100 : timing === 'quick' ? 200 : timing === 'responsive' ? 400 : timing === 'moderate' ? 600 : timing === 'slow' ? 1500 : timing === 'continuous' ? 3000 : 20000;
    
    const animation = {
      value: animatedValue,
      controls: {
        start: () => {
          Animated.timing(animatedValue, {
            toValue: 1,
            duration,
            useNativeDriver: true
          }).start();
        },
        stop: () => {
          animatedValue.stopAnimation();
        }
      }
    };
    
    cosmicAnimations.current[key] = animation;
    return animation;
  };

  const toggleCosmicAnimation = (timing: string) => {
    const key = `cosmic-${timing}`;
    const animation = cosmicAnimations.current[key] || createCosmicDemo(timing);
    
    if (activeAnimations.has(key)) {
      animation.controls.stop();
      setActiveAnimations(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    } else {
      animation.controls.start();
      setActiveAnimations(prev => new Set(prev).add(key));
    }
  };

  // ============================================================================
  // CONSTELLATION ANIMATIONS DEMO
  // ============================================================================

  const createConstellationDemo = (easing: string) => {
    const key = `constellation-${easing}`;
    const animatedValue = new Animated.Value(0);
    
    const animation = {
      value: animatedValue,
      controls: {
        start: () => {
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
          }).start();
        },
        stop: () => {
          animatedValue.stopAnimation();
        }
      }
    };
    
    constellationAnimations.current[key] = animation;
    return animation;
  };

  const toggleConstellationAnimation = (easing: string) => {
    const key = `constellation-${easing}`;
    const animation = constellationAnimations.current[key] || createConstellationDemo(easing);
    
    if (activeAnimations.has(key)) {
      animation.controls.stop();
      setActiveAnimations(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    } else {
      animation.controls.start();
      setActiveAnimations(prev => new Set(prev).add(key));
    }
  };

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const renderFadeSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Fade Transitions</Text>
      <Text style={styles.sectionDescription}>
        Smooth fade in/out animations with various directions and timing presets
      </Text>
      
      {/* Demo Animation Area */}
      <View style={styles.demoArea}>
        {(['in', 'out', 'inUp', 'inDown', 'inLeft', 'inRight']).map(direction => {
          const key = `fade-${direction}-normal`;
          const animation = fadeAnimations.current[key];
          return (
            <Animated.View
              key={direction}
              style={[
                styles.demoBox,
                {
                  opacity: animation?.value || (direction.includes('in') ? 0 : 1),
                  backgroundColor: '#2E86DE'
                }
              ]}
            >
              <Text style={styles.demoText}>Fade {direction}</Text>
            </Animated.View>
          );
        })}
      </View>
      
      <View style={styles.animationGrid}>
        {(['in', 'out', 'inUp', 'inDown', 'inLeft', 'inRight']).map(direction => (
          <TouchableOpacity
            key={direction}
            style={[
              styles.animationButton,
              activeAnimations.has(`fade-${direction}-normal`) && styles.activeButton
            ]}
            onPress={() => toggleFadeAnimation(direction, 'normal')}
          >
            <Text style={styles.buttonText}>Fade {direction}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subsectionTitle}>Timing Presets</Text>
      <View style={styles.animationGrid}>
        {(['instant', 'quick', 'normal', 'slow', 'gentle']).map(timing => (
          <TouchableOpacity
            key={timing}
            style={[
              styles.animationButton,
              activeAnimations.has(`fade-in-${timing}`) && styles.activeButton
            ]}
            onPress={() => toggleFadeAnimation('in', timing)}
          >
            <Text style={styles.buttonText}>{timing}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSlideSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Slide Transitions</Text>
      <Text style={styles.sectionDescription}>
        Directional slide animations with smooth easing
      </Text>
      
      {/* Demo Animation Area */}
      <View style={styles.demoArea}>
        {(['up', 'down', 'left', 'right']).map(direction => {
          const key = `slide-${direction}-normal`;
          const animation = slideAnimations.current[key];
          return (
            <Animated.View
              key={direction}
              style={[
                styles.demoBox,
                {
                  backgroundColor: '#10B981',
                  transform: [{
                    translateY: animation?.value?.interpolate({
                      inputRange: [0, 1],
                      outputRange: direction === 'up' ? [50, 0] : direction === 'down' ? [-50, 0] : [0, 0]
                    }) || 0
                  }, {
                    translateX: animation?.value?.interpolate({
                      inputRange: [0, 1],
                      outputRange: direction === 'left' ? [50, 0] : direction === 'right' ? [-50, 0] : [0, 0]
                    }) || 0
                  }]
                }
              ]}
            >
              <Text style={styles.demoText}>Slide {direction}</Text>
            </Animated.View>
          );
        })}
      </View>
      
      <View style={styles.animationGrid}>
        {(['up', 'down', 'left', 'right']).map(direction => (
          <TouchableOpacity
            key={direction}
            style={[
              styles.animationButton,
              activeAnimations.has(`slide-${direction}-normal`) && styles.activeButton
            ]}
            onPress={() => toggleSlideAnimation(direction, 'normal')}
          >
            <Text style={styles.buttonText}>Slide {direction}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderParticleSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Particle Motion</Text>
      <Text style={styles.sectionDescription}>
        Advanced particle physics and motion algorithms
      </Text>
      
      {/* Demo Animation Area */}
      <View style={styles.demoArea}>
        {(['float', 'drift', 'orbit', 'spiral']).map(motionType => {
          const key = `particle-${motionType}`;
          const animation = particleAnimations.current[key];
          return (
            <Animated.View
              key={motionType}
              style={[
                styles.demoBox,
                {
                  backgroundColor: '#F59E0B',
                  transform: [{
                    scale: animation?.value?.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 1.2, 1]
                    }) || 1
                  }, {
                    rotate: animation?.value?.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg']
                    }) || '0deg'
                  }]
                }
              ]}
            >
              <Text style={styles.demoText}>{motionType}</Text>
            </Animated.View>
          );
        })}
      </View>
      
      <View style={styles.animationGrid}>
        {(['float', 'drift', 'orbit', 'spiral', 'brownian', 'field', 'constellation', 'stardust']).map(motionType => (
          <TouchableOpacity
            key={motionType}
            style={[
              styles.animationButton,
              activeAnimations.has(`particle-${motionType}`) && styles.activeButton
            ]}
            onPress={() => toggleParticleAnimation(motionType)}
          >
            <Text style={styles.buttonText}>{motionType}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.controlRow}>
        <Text style={styles.controlLabel}>Particle Count: {particleCount}</Text>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setParticleCount(prev => Math.max(1, prev - 5))}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setParticleCount(prev => Math.min(50, prev + 5))}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOrbitalSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Orbital Rotations</Text>
      <Text style={styles.sectionDescription}>
        Celestial orbital rotation animations with multiple speeds and directions
      </Text>
      
      {/* Demo Animation Area */}
      <View style={styles.demoArea}>
        {(['slow', 'medium', 'fast']).map(speed => {
          const key = `orbital-${speed}-normal`;
          const animation = orbitalAnimations.current[key];
          return (
            <Animated.View
              key={speed}
              style={[
                styles.demoBox,
                {
                  backgroundColor: '#8B5CF6',
                  transform: [{
                    rotate: animation?.value?.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg']
                    }) || '0deg'
                  }]
                }
              ]}
            >
              <Text style={styles.demoText}>{speed}</Text>
            </Animated.View>
          );
        })}
      </View>
      
      <View style={styles.animationGrid}>
        {(['slow', 'medium', 'fast']).map(speed => (
          <TouchableOpacity
            key={speed}
            style={[
              styles.animationButton,
              activeAnimations.has(`orbital-${speed}-normal`) && styles.activeButton
            ]}
            onPress={() => toggleOrbitalAnimation(speed, 'normal')}
          >
            <Text style={styles.buttonText}>{speed}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.animationGrid}>
        {(['normal', 'reverse', 'alternate', 'alternate-reverse']).map(direction => (
          <TouchableOpacity
            key={direction}
            style={[
              styles.animationButton,
              activeAnimations.has(`orbital-medium-${direction}`) && styles.activeButton
            ]}
            onPress={() => toggleOrbitalAnimation('medium', direction)}
          >
            <Text style={styles.buttonText}>{direction}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCosmicSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Cosmic Animations</Text>
      <Text style={styles.sectionDescription}>
        Cosmic timing and celestial motion patterns
      </Text>
      
      {/* Demo Animation Area */}
      <View style={styles.demoArea}>
        {(['instant', 'quick', 'responsive', 'moderate']).map(timing => {
          const key = `cosmic-${timing}`;
          const animation = cosmicAnimations.current[key];
          return (
            <Animated.View
              key={timing}
              style={[
                styles.demoBox,
                {
                  backgroundColor: '#EC4899',
                  transform: [{
                    scale: animation?.value?.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 1.3, 1]
                    }) || 1
                  }]
                }
              ]}
            >
              <Text style={styles.demoText}>{timing}</Text>
            </Animated.View>
          );
        })}
      </View>
      
      <View style={styles.animationGrid}>
        {(['instant', 'quick', 'responsive', 'moderate', 'slow', 'continuous', 'eternal']).map(timing => (
          <TouchableOpacity
            key={timing}
            style={[
              styles.animationButton,
              activeAnimations.has(`cosmic-${timing}`) && styles.activeButton
            ]}
            onPress={() => toggleCosmicAnimation(timing)}
          >
            <Text style={styles.buttonText}>{timing}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderConstellationSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Constellation Animations</Text>
      <Text style={styles.sectionDescription}>
        Star constellation formation and connection animations
      </Text>
      
      {/* Demo Animation Area */}
      <View style={styles.demoArea}>
        {(['linear', 'ease-in-out', 'ease-in', 'ease-out']).map(easing => {
          const key = `constellation-${easing}`;
          const animation = constellationAnimations.current[key];
          return (
            <Animated.View
              key={easing}
              style={[
                styles.demoBox,
                {
                  backgroundColor: '#06B6D4',
                  opacity: animation?.value || 0,
                  transform: [{
                    scale: animation?.value?.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1]
                    }) || 0.5
                  }]
                }
              ]}
            >
              <Text style={styles.demoText}>{easing}</Text>
            </Animated.View>
          );
        })}
      </View>
      
      <View style={styles.animationGrid}>
        {(['linear', 'ease-in-out', 'ease-in', 'ease-out', 'bounce', 'elastic']).map(easing => (
          <TouchableOpacity
            key={easing}
            style={[
              styles.animationButton,
              activeAnimations.has(`constellation-${easing}`) && styles.activeButton
            ]}
            onPress={() => toggleConstellationAnimation(easing)}
          >
            <Text style={styles.buttonText}>{easing}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#0F172A', '#1E293B', '#334155']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Animations Demo</Text>
          <Text style={styles.subtitle}>
            Comprehensive showcase of all animation functionalities
          </Text>
        </View>

        {renderFadeSection()}
        {renderSlideSection()}
        {renderParticleSection()}
        {renderOrbitalSection()}
        {renderCosmicSection()}
        {renderConstellationSection()}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Active Animations: {activeAnimations.size}
          </Text>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              // Stop all animations
              Object.values(fadeAnimations.current).forEach((anim: any) => anim.controls.stop());
              Object.values(slideAnimations.current).forEach((anim: any) => anim.controls.stop());
              Object.values(particleAnimations.current).forEach((anim: any) => anim.controls.stop());
              Object.values(orbitalAnimations.current).forEach((anim: any) => anim.controls.stop());
              Object.values(cosmicAnimations.current).forEach((anim: any) => anim.controls.stop());
              Object.values(constellationAnimations.current).forEach((anim: any) => anim.controls.stop());
              setActiveAnimations(new Set());
            }}
          >
            <Text style={styles.buttonText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 12,
  },
  demoArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
    minHeight: 80,
    alignItems: 'center',
  },
  demoBox: {
    width: 80,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  demoText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  animationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  animationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#475569',
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#2E86DE',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  controlLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#475569',
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
  },
  footer: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#DC2626',
    borderRadius: 8,
  },
});

export default AnimationsDemoPage; 