import React, { useState } from 'react';
import { Student, Constraint } from '../types';
import { GroupCard } from './GroupCard';
import { Save, Upload } from 'lucide-react';

interface ConfigurationPanelProps {
  students: Student[];
  constraints: Constraint[];
  onStudentsChange: (students: Student[]) => void;
  onConstraintsChange: (constraints: Constraint[]) => void;
  onSaveConfig: (name: string) => void;
  onLoadConfig: (config: import('../types').Configuration) => void;
  groups?: import('../types').Group[];
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  students,
  constraints,
  onStudentsChange,
  onConstraintsChange,
  onSaveConfig,
  onLoadConfig,
  groups
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'constraints'>('students');
  const [configName, setConfigName] = useState('');

  const handleStudentChange = (id: number, field: keyof Student, value: string | boolean | number | number[]) => {
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, [field]: value } : student
    );
    onStudentsChange(updatedStudents);
  };

  const handleConstraintToggle = (id: string) => {
    const updatedConstraints = constraints.map(constraint =>
      constraint.id === id ? { ...constraint, enabled: !constraint.enabled } : constraint
    );
    onConstraintsChange(updatedConstraints);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target?.result as string);
          onLoadConfig(config);
        } catch {
          alert('Error al cargar el archivo JSON');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
  <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Configuración</h2>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Nombre de configuración"
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <button
              onClick={() => {
                if (configName.trim()) {
                  onSaveConfig(configName);
                  setConfigName('');
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar
            </button>
          </div>
          <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Cargar
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Pestañas */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'students'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Estudiantes
        </button>
        <button
          onClick={() => setActiveTab('constraints')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'constraints'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Restricciones
        </button>
      </div>

      {/* Contenido de pestañas */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map(student => {
              const studentColors = [
                'bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100',
                'bg-gradient-to-r from-blue-100 via-indigo-50 to-teal-100',
                'bg-gradient-to-r from-green-100 via-teal-50 to-blue-50',
                'bg-gradient-to-r from-yellow-100 via-orange-50 to-pink-50',
                'bg-gradient-to-r from-purple-100 via-pink-50 to-blue-50',
                'bg-gradient-to-r from-red-100 via-pink-50 to-yellow-50',
              ];
              const idx = students.findIndex(s => s.id === student.id);
              const colorClass = studentColors[idx % studentColors.length];
              return (
                <div key={student.id} className={`border border-gray-200 rounded-lg p-4 shadow-lg ${colorClass}`}>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        value={student.name}
                        onChange={(e) => handleStudentChange(student.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white/80"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Género
                        </label>
                        <select
                          value={student.gender}
                          onChange={(e) => handleStudentChange(student.id, 'gender', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white/80"
                        >
                          <option value="male">Niño</option>
                          <option value="female">Niña</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={student.isLeader}
                          onChange={(e) => handleStudentChange(student.id, 'isLeader', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm font-bold text-yellow-900 bg-gradient-to-r from-yellow-300 to-yellow-500 px-2 py-1 rounded-full shadow">Líder</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={student.needsHelp}
                          onChange={(e) => handleStudentChange(student.id, 'needsHelp', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm font-bold text-blue-900 bg-gradient-to-r from-blue-200 to-blue-400 px-2 py-1 rounded-full shadow">Necesita ayuda</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferencias (IDs separados por comas)
                      </label>
                      <input
                        type="text"
                        value={student.preferences.join(', ')}
                        onChange={(e) => {
                          const prefs = e.target.value
                            .split(',')
                            .map(p => parseInt(p.trim()))
                            .filter(p => !isNaN(p));
                          handleStudentChange(student.id, 'preferences', prefs);
                        }}
                        placeholder="ej: 1, 5, 12"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white/80"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Vista previa de grupos generados */}
          {groups && groups.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-bold text-purple-700 mb-4">Vista previa de grupos generados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {groups.map(group => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'constraints' && (
        <div className="space-y-4">
          {constraints.map(constraint => (
            <div key={constraint.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{constraint.description}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Estudiantes: {constraint.students.join(', ')}
                  </p>
                  <p className="text-xs text-gray-500">Tipo: {constraint.type}</p>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={constraint.enabled}
                    onChange={() => handleConstraintToggle(constraint.id)}
                    className="mr-2"
                  />
                  <span className="text-sm">Activa</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};