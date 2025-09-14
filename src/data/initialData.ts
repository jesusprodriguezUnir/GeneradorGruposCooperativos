import { Student, Constraint } from '../types';

export const initialStudents: Student[] = [
  { id: 1, name: 'AINOHA IZASCU', gender: 'female', isLeader: false, needsHelp: false, preferences: [18, 11, 12, 2] },
  { id: 2, name: 'AINHARA', gender: 'female', isLeader: true, needsHelp: false, preferences: [1, 12] },
  { id: 3, name: 'ANDREW DAVID', gender: 'male', isLeader: false, needsHelp: false, preferences: [19, 13] },
  { id: 4, name: 'ASSIA', gender: 'female', isLeader: true, needsHelp: false, preferences: [18, 1] },
  { id: 5, name: 'CARLA', gender: 'female', isLeader: false, needsHelp: false, preferences: [16, 20] },
  { id: 6, name: 'CESAR', gender: 'male', isLeader: false, needsHelp: true, preferences: [19, 3, 23] },
  { id: 7, name: 'CRISTIAN', gender: 'male', isLeader: false, needsHelp: false, preferences: [] },
  { id: 8, name: 'ELENA', gender: 'female', isLeader: false, needsHelp: false, preferences: [] },
  { id: 9, name: 'ERICK', gender: 'male', isLeader: false, needsHelp: false, preferences: [] },
  { id: 10, name: 'HELENA', gender: 'female', isLeader: false, needsHelp: true, preferences: [11, 1, 18, 2] },
  { id: 11, name: 'EMILEE', gender: 'female', isLeader: false, needsHelp: false, preferences: [8, 4, 1, 18] },
  { id: 12, name: 'KIARA ARELI', gender: 'female', isLeader: true, needsHelp: false, preferences: [1, 2] },
  { id: 13, name: 'LUCAS', gender: 'male', isLeader: true, needsHelp: false, preferences: [] },
  { id: 14, name: 'LUIS ANGEL', gender: 'male', isLeader: false, needsHelp: false, preferences: [] },
  { id: 15, name: 'MARCOS', gender: 'male', isLeader: false, needsHelp: true, preferences: [1, 13] },
  { id: 16, name: 'MARTINA G', gender: 'female', isLeader: false, needsHelp: false, preferences: [17, 22] },
  { id: 17, name: 'MARTINA S', gender: 'female', isLeader: false, needsHelp: true, preferences: [16, 20, 22] },
  { id: 18, name: 'PAULA', gender: 'female', isLeader: false, needsHelp: false, preferences: [1, 2] },
  { id: 19, name: 'ROBERT ALEJANDRO', gender: 'male', isLeader: false, needsHelp: false, preferences: [] },
  { id: 20, name: 'ROKAYA', gender: 'female', isLeader: true, needsHelp: false, preferences: [16, 17] },
  { id: 21, name: 'RUBÉN YAHIR', gender: 'male', isLeader: true, needsHelp: false, preferences: [19, 13] },
  { id: 22, name: 'SARA', gender: 'female', isLeader: false, needsHelp: false, preferences: [16, 17] },
  { id: 23, name: 'YAREL', gender: 'female', isLeader: false, needsHelp: false, preferences: [1, 13] },
  { id: 24, name: 'YOUNESS', gender: 'male', isLeader: false, needsHelp: true, preferences: [3, 23] }
];

export const initialConstraints: Constraint[] = [
  {
    id: 'c1',
    type: 'cannot_be_together',
    description: 'Erik, Luis Angel y Cristian no pueden estar juntos (pero cada uno necesita un líder)',
    students: [9, 14, 7],
    enabled: true
  },
  {
    id: 'c2',
    type: 'separate_leaders',
    description: 'Los líderes deben ir en grupos separados',
    students: [2, 12, 20, 13, 21, 4],
    enabled: true
  },
  {
    id: 'c3',
    type: 'separate_help',
    description: 'Los estudiantes que necesitan ayuda deben ir separados',
    students: [6, 24, 10, 15, 17],
    enabled: true
  },
  {
    id: 'c4',
    type: 'max_boys_with_student',
    description: 'Marcos puede tener como máximo un niño varón en su grupo',
    students: [15],
    enabled: true,
    maxBoys: 1,
    targetStudent: 15
  },
  {
    id: 'c5',
    type: 'must_be_together',
    description: 'Elena tiene que estar con Assia',
    students: [8, 4],
    enabled: true
  },
  {
    id: 'c6',
    type: 'exclude_combination',
    description: 'No mezclar Carla con Ainoha',
    students: [5, 1],
    enabled: true
  }
];