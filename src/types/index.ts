export interface Student {
  id: number;
  name: string;
  gender: 'male' | 'female';
  isLeader: boolean;
  needsHelp: boolean;
  preferences: number[];
}

export interface Constraint {
  id: string;
  type: 'cannot_be_together' | 'must_be_together' | 'separate_leaders' | 'separate_help' | 'max_boys_with_student' | 'exclude_combination';
  description: string;
  students: number[];
  enabled: boolean;
  maxBoys?: number;
  targetStudent?: number;
}

export interface Group {
  id: number;
  students: Student[];
}

export interface Configuration {
  students: Student[];
  constraints: Constraint[];
  name: string;
  createdAt: string;
}