import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConfigurationPanel } from '../components/ConfigurationPanel';
import { Student, Constraint } from '../types';

const mockStudents: Student[] = [
  { id: 1, name: 'Ana', gender: 'female', isLeader: false, needsHelp: false, preferences: [] },
  { id: 2, name: 'Luis', gender: 'male', isLeader: true, needsHelp: false, preferences: [1] },
];

const mockConstraints: Constraint[] = [
  { id: 'c1', description: 'Test constraint', students: [1,2], type: 'cannot_be_together', enabled: true },
];

describe('ConfigurationPanel', () => {
  it('renderiza correctamente los estudiantes', () => {
    render(
      <ConfigurationPanel
        students={mockStudents}
        constraints={mockConstraints}
        onStudentsChange={() => {}}
        onConstraintsChange={() => {}}
        onSaveConfig={() => {}}
        onLoadConfig={() => {}}
      />
    );
  expect(screen.getByDisplayValue('Ana')).toBeInTheDocument();
  expect(screen.getByDisplayValue('Luis')).toBeInTheDocument();
    expect(screen.getByText('Configuración')).toBeInTheDocument();
  });
});
