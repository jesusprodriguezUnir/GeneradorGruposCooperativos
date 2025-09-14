import React from 'react';
import { Student } from '../types';
import { Crown, HelpCircle } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  isSelected?: boolean;
  onClick?: () => void;
  showIcons?: boolean;
  colorClass?: string;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  isSelected = false,
  onClick,
  showIcons = true,
  colorClass = ''
}) => {
  return (
    <div
      className={`p-3 rounded-xl border-2 transition-all cursor-pointer relative shadow-lg ${colorClass} ${
        isSelected
          ? 'border-blue-500 scale-105'
          : 'border-gray-200 hover:border-purple-400 hover:scale-105'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold text-purple-700 drop-shadow-lg text-base">
          {student.name}
        </span>
        {showIcons && (
          <div className="flex gap-1">
            {student.isLeader && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900 text-xs font-bold shadow">
                <Crown className="w-4 h-4" /> Líder
              </span>
            )}
            {student.needsHelp && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 text-xs font-bold shadow">
                <span title="Necesita ayuda"><HelpCircle className="w-4 h-4" /></span> Ayuda
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center text-xs mt-1">
        <span className={`px-2 py-0.5 rounded-full font-semibold shadow ${student.gender === 'male' ? 'bg-blue-200 text-blue-800' : 'bg-pink-200 text-pink-800'}`}>
          {student.gender === 'male' ? 'Niño' : 'Niña'}
        </span>
        <span className="text-gray-500">ID: {student.id}</span>
      </div>
      {student.preferences.length > 0 && (
        <div className="text-xs text-purple-700 mt-2 font-semibold">
          Preferencias: <span className="text-purple-500">{student.preferences.join(', ')}</span>
        </div>
      )}
    </div>
  );
};