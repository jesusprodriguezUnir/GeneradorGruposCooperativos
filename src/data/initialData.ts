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
    description: 'Los líderes deben ir en grupos separados (excepto Assia y Kiara)',
    students: [2, 20, 13, 21],
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
    enabled: false
  },
  {
    id: 'c6',
    type: 'exclude_combination',
    description: 'No mezclar Carla con Ainoha',
    students: [5, 1],
    enabled: true
  },
  {
    id: 'c7',
    type: 'cannot_be_together',
    description: 'Carla y Youness (ya coincidieron)',
    students: [5, 24],
    enabled: true
  },
  {
    id: 'c8',
    type: 'cannot_be_together',
    description: 'Rubén Yahir y Paula (ya coincidieron)',
    students: [21, 18],
    enabled: true
  },
  {
    id: 'c9',
    type: 'cannot_be_together',
    description: 'Lucas y Andrew David (ya coincidieron)',
    students: [13, 3],
    enabled: true
  },
  {
    id: 'c10',
    type: 'cannot_be_together',
    description: 'Cristian y Martina S (ya coincidieron)',
    students: [7, 17],
    enabled: true
  },
  {
    id: 'c11',
    type: 'cannot_be_together',
    description: 'Erik y Helena (ya coincidieron)',
    students: [9, 10],
    enabled: true
  },
  {
    id: 'c12',
    type: 'cannot_be_together',
    description: 'Ainoha Izacu y Emilee (ya coincidieron)',
    students: [1, 11],
    enabled: true
  },
  {
    id: 'c13',
    type: 'cannot_be_together',
    description: 'Ainhara y Assia (ya coincidieron)',
    students: [2, 4],
    enabled: true
  },
  {
    id: 'c14',
    type: 'cannot_be_together',
    description: 'Cesar y Sara (ya coincidieron)',
    students: [6, 22],
    enabled: true
  },
  {
    id: 'c15',
    type: 'cannot_be_together',
    description: 'Elena y Marcos (ya coincidieron)',
    students: [8, 15],
    enabled: true
  },
  {
    id: 'c16',
    type: 'cannot_be_together',
    description: 'Kiara Areli y Yarel (ya coincidieron)',
    students: [12, 23],
    enabled: true
  },
  {
    id: 'c17',
    type: 'cannot_be_together',
    description: 'Luis Angel y Robert Alejandro (ya coincidieron)',
    students: [14, 19],
    enabled: true
  },
  {
    id: 'c18',
    type: 'cannot_be_together',
    description: 'Martina G y Rokaya (ya coincidieron)',
    students: [16, 20],
    enabled: true
  },
  {
    id: 'c19',
    type: 'must_be_together',
    description: 'Assia y Kiara Areli deben ir juntas',
    students: [4, 12],
    enabled: true
  },
  {
    id: 'c20',
    type: 'cannot_be_together',
    description: 'Ainoha Izacu y Kiara Areli no pueden ir juntas',
    students: [1, 12],
    enabled: true
  }
];