import React, { useState } from 'react';
import { Student, Constraint } from '../types';
import { StudentCard } from './StudentCard';
import { Save, Upload, Plus, Trash2 } from 'lucide-react';

interface ConfigurationPanelProps {
  students: Student[];
  constraints: Constraint[];
  onStudentsChange: (students: Student[]) => void;
  onConstraintsChange: (constraints: Constraint[]) => void;
  onSaveConfig: (name: string) => void;
  onLoadConfig: (config: any) => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  students,
  constraints,
  onStudentsChange,
  onConstraintsChange,
  onSaveConfig,
  onLoadConfig
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'constraints'>('students');
  const [configName, setConfigName] = useState('');

  const handleStudentChange = (id: number, field: keyof Student, value: any) => {
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
        } catch (error) {
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
            {students.map(student => (
              <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={student.name}
                      onChange={(e) => handleStudentChange(student.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
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
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm"
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
                      <span className="text-sm">Líder</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={student.needsHelp}
                        onChange={(e) => handleStudentChange(student.id, 'needsHelp', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Necesita ayuda</span>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
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