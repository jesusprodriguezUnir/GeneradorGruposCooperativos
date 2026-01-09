import { useState, useCallback } from 'react';
import { Student, Constraint, Group, Configuration } from './types';
import { initialStudents, initialConstraints } from './data/initialData';
import { GroupGenerator } from './utils/groupGenerator';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { GroupCard } from './components/GroupCard';
import { Users, Settings, Play, RefreshCw, AlertTriangle } from 'lucide-react';

function App() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [constraints, setConstraints] = useState<Constraint[]>(initialConstraints);
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeView, setActiveView] = useState<'config' | 'groups'>('config');
  const [error, setError] = useState<string | null>(null);
  const [lastGroupSize, setLastGroupSize] = useState<number>(4);

  const generateGroups = useCallback(async (size: number = 4) => {
    setIsGenerating(true);
    setError(null);
    setLastGroupSize(size);
    
    // Simular delay para mostrar loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const generator = new GroupGenerator(students, constraints, size);
    const result = generator.generateGroups();
    
    if (result) {
      setGroups(result);
      setActiveView('groups');
    } else {
      setError(`No se pudieron generar grupos de ${size} que cumplan todas las restricciones. Intenta ajustar las configuraciones.`);
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
  <div className="min-h-screen bg-gradient-to-br from-pink-200 via-blue-100 to-indigo-200 relative animate-gradient-x">
      {/* Overlay de carga colorido */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 bg-opacity-90 animate-fadeIn">
          <div className="mb-8">
            <svg className="animate-spin h-16 w-16 text-white drop-shadow-lg" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg animate-pulse">Generando grupos...</h2>
          <p className="text-lg text-white/80 mb-4 animate-fadeIn">¡Un momento! Estamos creando la mejor combinación posible.</p>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-lg mb-2 animate-fadeIn">
            Generador Grupos Cooperativos
          </h1>
          <p className="text-lg text-gray-700 font-medium animate-fadeIn">
            Organiza automáticamente 24 estudiantes en 6 grupos de 4 personas
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-lg p-1 shadow-xl border border-purple-200">
            <button
              onClick={() => setActiveView('config')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 text-lg shadow-lg ${
                activeView === 'config'
                  ? 'bg-gray-800 text-white scale-105'
                  : 'text-gray-700 hover:text-gray-900 bg-white'
              }`}
            >
              <Settings className="w-5 h-5" />
              Configuración
            </button>
            <button
              onClick={() => groups && setActiveView('groups')}
              disabled={!groups}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 text-lg shadow-lg ${
                activeView === 'groups' && groups
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white scale-105'
                  : groups
                  ? 'text-blue-700 hover:text-purple-600 bg-white'
                  : 'text-gray-400 cursor-not-allowed bg-white'
              }`}
            >
              <Users className="w-5 h-5" />
              Grupos Generados
            </button>
          </div>
        </div>

        {/* Generate Buttons */}
        {activeView === 'config' && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => generateGroups(4)}
              disabled={isGenerating}
              className={`px-8 py-4 bg-green-600 text-white rounded-xl font-medium text-lg shadow-lg hover:bg-green-700 transition-all flex items-center gap-3 ${
                isGenerating ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isGenerating && lastGroupSize === 4 ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              {isGenerating && lastGroupSize === 4 ? 'Generando...' : 'Generar Grupos (4)'}
            </button>
            <button
              onClick={() => generateGroups(2)}
              disabled={isGenerating}
              className={`px-8 py-4 bg-blue-600 text-white rounded-xl font-medium text-lg shadow-lg hover:bg-blue-700 transition-all flex items-center gap-3 ${
                isGenerating ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isGenerating && lastGroupSize === 2 ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Users className="w-5 h-5" />
              )}
              {isGenerating && lastGroupSize === 2 ? 'Generando...' : 'Generar Parejas (2)'}
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
              <h2 className="text-2xl font-bold text-gray-800">
                {lastGroupSize === 2 ? 'Parejas Generadas' : 'Grupos Generados'}
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => generateGroups(lastGroupSize)}
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
                  <div className="text-sm text-gray-600">
                    {lastGroupSize === 2 ? 'Parejas con Líder' : 'Grupos con Líder'}
                  </div>
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
                      }, 0) / groups.length * 10
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