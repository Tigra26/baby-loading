export interface WeekBaby {
  analogy: string;
  image: string;
  description: string[];
  interestingFact: string;
}
export interface ComfortTip {
  category: string;
  tip: string;
}
export interface WeekMom {
  feelings: { states: string[]; sensationDescr: string };
  comfortTips: ComfortTip[];
}

export function isWeekBaby(data: WeekBaby | WeekMom): data is WeekBaby {
  return "analogy" in data;
}
export interface WeekGreeting {
  curWeekToPregnant: number;
  daysBeforePregnant: number;
  momHint: string;
}
