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

  // Paleta de gradientes para grupos
  const gradients = [
    'from-blue-50 via-purple-50 to-pink-100',
    'from-green-50 via-teal-50 to-blue-50',
    'from-yellow-50 via-orange-50 to-pink-50',
    'from-indigo-50 via-blue-50 to-purple-50',
    'from-pink-50 via-red-50 to-yellow-50',
    'from-purple-50 via-pink-50 to-blue-50',
  ];
  const gradient = gradients[(group.id - 1) % gradients.length];

  return (
    <div className={`rounded-xl shadow-xl p-6 border-2 border-white bg-gradient-to-br ${gradient} transition-all duration-300 hover:scale-105 hover:shadow-2xl`} style={{backgroundColor: '#f8fafc'}}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2 drop-shadow-lg">
          <Users className="w-6 h-6 text-gray-700" />
          Grupo {group.id}
        </h3>
        <div className="text-sm font-bold text-gray-700 bg-white/60 px-3 py-1 rounded-full shadow">
          {boys.length}♂ / {girls.length}♀
        </div>
      </div>

      {leaders.length > 0 && (
        <div className="mb-3">
          <span className="text-xs font-bold text-yellow-900 bg-gradient-to-r from-yellow-300 to-yellow-500 px-3 py-1 rounded-full shadow-md">
            {leaders.length} LÍDER{leaders.length > 1 ? 'ES' : ''}
          </span>
        </div>
      )}

      {helpers.length > 0 && (
        <div className="mb-3">
          <span className="text-xs font-bold text-blue-900 bg-gradient-to-r from-blue-200 to-blue-400 px-3 py-1 rounded-full shadow-md">
            {helpers.length} NECESITA{helpers.length > 1 ? 'N' : ''} AYUDA
          </span>
        </div>
      )}

      <div className="space-y-2">
        {/* Paleta de colores pastel para estudiantes */}
        {group.students.map((student, idx) => {
          const studentColors = [
            'bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100',
            'bg-gradient-to-r from-blue-100 via-indigo-50 to-teal-100',
            'bg-gradient-to-r from-green-100 via-teal-50 to-blue-50',
            'bg-gradient-to-r from-yellow-100 via-orange-50 to-pink-50',
            'bg-gradient-to-r from-purple-100 via-pink-50 to-blue-50',
            'bg-gradient-to-r from-red-100 via-pink-50 to-yellow-50',
          ];
          const colorClass = studentColors[idx % studentColors.length];
          return (
            <StudentCard
              key={student.id}
              student={student}
              showIcons={false}
              colorClass={colorClass}
            />
          );
        })}
      </div>

      {/* Análisis de preferencias satisfechas */}
      <div className="mt-4 pt-3 border-t-2 border-white/40">
        <div className="text-xs text-white/90">
          <strong className="font-bold text-white">Preferencias satisfechas:</strong>
          {group.students.map(student => {
            const satisfied = student.preferences.filter(prefId =>
              group.students.some(s => s.id === prefId)
            );
            return satisfied.length > 0 ? (
              <div key={student.id} className="mt-1">
                <span className="font-semibold text-white/90">{student.name}</span>: <span className="text-green-200">{satisfied.length}</span>/<span className="text-green-100">{student.preferences.length}</span>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};