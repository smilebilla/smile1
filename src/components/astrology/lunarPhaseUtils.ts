import { LunarPhaseData, MoonPhase } from './LunarPhase';

// Simple moon phase calculation (not astronomically perfect, but good for UI)
// Source: https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf
function calculateMoonPhase(date: Date): { phase: MoonPhase; illumination: number; nextPhase: MoonPhase; daysUntilNext: number } {
  const phases: MoonPhase[] = [
    'new_moon',
    'waxing_crescent',
    'first_quarter',
    'waxing_gibbous',
    'full_moon',
    'waning_gibbous',
    'last_quarter',
    'waning_crescent',
  ];
  const activities: Record<MoonPhase, string[]> = {
    new_moon: ['Set intentions', 'Start new projects', 'Meditate'],
    waxing_crescent: ['Plan', 'Take first steps', 'Nourish ideas'],
    first_quarter: ['Take action', 'Overcome obstacles', 'Push forward'],
    waxing_gibbous: ['Refine', 'Adjust plans', 'Analyze'],
    full_moon: ['Celebrate', 'Express gratitude', 'Harvest'],
    waning_gibbous: ['Share wisdom', 'Give back', 'Declutter'],
    last_quarter: ['Release', 'Forgive', 'Let go'],
    waning_crescent: ['Rest', 'Reflect', 'Surrender'],
  };
  // Days since known new moon (2000-01-06)
  const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14));
  const diff = date.getTime() - knownNewMoon.getTime();
  const days = diff / (1000 * 60 * 60 * 24);
  const lunations = days / 29.53058867;
  const phaseIndex = Math.floor((lunations % 1) * 8) % 8;
  const phase = phases[phaseIndex];
  // Illumination (approximate)
  const illumination = Math.round(50 * (1 - Math.cos(2 * Math.PI * ((lunations % 1)))));
  // Next phase
  const nextPhase = phases[(phaseIndex + 1) % 8];
  const daysUntilNext = Math.round(29.53058867 / 8);
  return { phase, illumination, nextPhase, daysUntilNext };
}

export function getCurrentLunarPhaseData(): LunarPhaseData {
  const now = new Date();
  const { phase, illumination, nextPhase, daysUntilNext } = calculateMoonPhase(now);
  const activities: Record<MoonPhase, string[]> = {
    new_moon: ['Set intentions', 'Start new projects', 'Meditate'],
    waxing_crescent: ['Plan', 'Take first steps', 'Nourish ideas'],
    first_quarter: ['Take action', 'Overcome obstacles', 'Push forward'],
    waxing_gibbous: ['Refine', 'Adjust plans', 'Analyze'],
    full_moon: ['Celebrate', 'Express gratitude', 'Harvest'],
    waning_gibbous: ['Share wisdom', 'Give back', 'Declutter'],
    last_quarter: ['Release', 'Forgive', 'Let go'],
    waning_crescent: ['Rest', 'Reflect', 'Surrender'],
  };
  return {
    phase,
    illumination,
    date: now.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
    nextPhase,
    daysUntilNext,
    activities: activities[phase],
  };
} 