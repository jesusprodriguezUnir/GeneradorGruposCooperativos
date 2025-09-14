import React from 'react';
import { Student } from '../types';
import { Crown, HelpCircle } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  isSelected?: boolean;
  onClick?: () => void;
  showIcons?: boolean;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  isSelected = false,
  onClick,
  showIcons = true
}) => {
  return (
    <div
      className={`p-3 rounded-lg border-2 transition-all cursor-pointer relative ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900">{student.name}</span>
        {showIcons && (
          <div className="flex gap-1">
            {student.isLeader && (
              <Crown className="w-4 h-4 text-yellow-500" title="Líder" />
            )}
            {student.needsHelp && (
              <HelpCircle className="w-4 h-4 text-blue-500" title="Necesita ayuda" />
            )}
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        ID: {student.id} | {student.gender === 'male' ? 'Niño' : 'Niña'}
      </div>
      {student.preferences.length > 0 && (
        <div className="text-xs text-gray-600 mt-2">
          Preferencias: {student.preferences.join(', ')}
        </div>
      )}
    </div>
  );
};