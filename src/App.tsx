import React, { useState, useCallback } from 'react';
import { Student, Constraint, Group, Configuration } from './types';
import { initialStudents, initialConstraints } from './data/initialData';
import { GroupGenerator } from './utils/groupGenerator';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { GroupCard } from './components/GroupCard';
import { Users, Settings, Play, Download, RefreshCw, AlertTriangle } from 'lucide-react';

function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [constraints, setConstraints] = useState<Constraint[]>(initialConstraints);
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeView, setActiveView] = useState<'config' | 'groups'>('config');
  const [error, setError] = useState<string | null>(null);

  const generateGroups = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    
    // Simular delay para mostrar loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const generator = new GroupGenerator(students, constraints);
    const result = generator.generateGroups();
    
    if (result) {
      setGroups(result);
      setActiveView('groups');
    } else {
      setError('No se pudieron generar grupos que cumplan todas las restricciones. Intenta ajustar las configuraciones.');
    }
    
    setIsGenerating(false);
  }, [students, constraints]);

  const saveConfiguration = useCallback((name: string) => {
    const config: Configuration = {
      students,
      constraints,
      name,
      createdAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${name}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [students, constraints]);

  const loadConfiguration = useCallback((config: Configuration) => {
    setStudents(config.students);
    setConstraints(config.constraints);
    setGroups(null);
  }, []);

  const resetGroups = useCallback(() => {
    setGroups(null);
    setError(null);
    setActiveView('config');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Generador Grupos Cooperativos
          </h1>
          <p className="text-gray-600">
            Organiza automáticamente 24 estudiantes en 6 grupos de 4 personas
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveView('config')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeView === 'config'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              Configuración
            </button>
            <button
              onClick={() => groups && setActiveView('groups')}
              disabled={!groups}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeView === 'groups' && groups
                  ? 'bg-blue-600 text-white shadow-md'
                  : groups
                  ? 'text-gray-600 hover:text-gray-800'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <Users className="w-4 h-4" />
              Grupos Generados
            </button>
          </div>
        </div>

        {/* Generate Button */}
        {activeView === 'config' && (
          <div className="text-center mb-8">
            <button
              onClick={generateGroups}
              disabled={isGenerating}
              className={`px-8 py-4 bg-green-600 text-white rounded-xl font-medium text-lg shadow-lg hover:bg-green-700 transition-all flex items-center gap-3 mx-auto ${
                isGenerating ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isGenerating ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              {isGenerating ? 'Generando...' : 'Generar Grupos'}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}

        {/* Main Content */}
        {activeView === 'config' && (
          <ConfigurationPanel
            students={students}
            constraints={constraints}
            onStudentsChange={setStudents}
            onConstraintsChange={setConstraints}
            onSaveConfig={saveConfiguration}
            onLoadConfig={loadConfiguration}
          />
        )}

        {activeView === 'groups' && groups && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Grupos Generados</h2>
              <div className="flex gap-3">
                <button
                  onClick={generateGroups}
                  disabled={isGenerating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  Regenerar
                </button>
                <button
                  onClick={resetGroups}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Volver a Configuración
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {groups.map(group => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>

            {/* Estadísticas */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Estadísticas de Generación</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {groups.filter(g => g.students.some(s => s.isLeader)).length}
                  </div>
                  <div className="text-sm text-gray-600">Grupos con Líder</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {groups.reduce((acc, g) => {
                      return acc + g.students.reduce((prefAcc, s) => {
                        return prefAcc + s.preferences.filter(p => g.students.some(gs => gs.id === p)).length;
                      }, 0);
                    }, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Preferencias Satisfechas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(
                      groups.reduce((acc, g) => {
                        const boys = g.students.filter(s => s.gender === 'male').length;
                        const girls = g.students.filter(s => s.gender === 'female').length;
                        return acc + Math.abs(boys - girls);
                      }, 0) / 6 * 10
                    ) / 10}
                  </div>
                  <div className="text-sm text-gray-600">Promedio Desequilibrio Género</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {constraints.filter(c => c.enabled).length}
                  </div>
                  <div className="text-sm text-gray-600">Restricciones Activas</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;