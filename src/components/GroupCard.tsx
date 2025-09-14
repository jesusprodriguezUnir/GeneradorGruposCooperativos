import React from 'react';
import { Group } from '../types';
import { StudentCard } from './StudentCard';
import { Users } from 'lucide-react';

interface GroupCardProps {
  group: Group;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const leaders = group.students.filter(s => s.isLeader);
  const helpers = group.students.filter(s => s.needsHelp);
  const boys = group.students.filter(s => s.gender === 'male');
  const girls = group.students.filter(s => s.gender === 'female');

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          Grupo {group.id}
        </h3>
        <div className="text-sm text-gray-600">
          {boys.length}♂ / {girls.length}♀
        </div>
      </div>

      {leaders.length > 0 && (
        <div className="mb-3">
          <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
            {leaders.length} LÍDER{leaders.length > 1 ? 'ES' : ''}
          </span>
        </div>
      )}

      {helpers.length > 0 && (
        <div className="mb-3">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
            {helpers.length} NECESITA{helpers.length > 1 ? 'N' : ''} AYUDA
          </span>
        </div>
      )}

      <div className="space-y-2">
        {group.students.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            showIcons={false}
          />
        ))}
      </div>

      {/* Análisis de preferencias satisfechas */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-600">
          <strong>Preferencias satisfechas:</strong>
          {group.students.map(student => {
            const satisfied = student.preferences.filter(prefId =>
              group.students.some(s => s.id === prefId)
            );
            return satisfied.length > 0 ? (
              <div key={student.id} className="mt-1">
                {student.name}: {satisfied.length}/{student.preferences.length}
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};