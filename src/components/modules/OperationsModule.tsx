import React from 'react'

const OperationsModule: React.FC = () => {
  const operations = [
    { task: 'Mantenimiento ascensores', status: 'completed', date: '2025-06-20', responsible: 'Empresa TecnoLift' },
    { task: 'Revisión sistema eléctrico', status: 'in-progress', date: '2025-06-25', responsible: 'Electricistas SA' },
    { task: 'Limpieza tanques de agua', status: 'pending', date: '2025-07-01', responsible: 'AquaClean' },
    { task: 'Fumigación áreas comunes', status: 'pending', date: '2025-07-05', responsible: 'Control Plagas' }
  ]

  return (
    <div className="p-8 space-y-8 fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold hologram-text mb-2">🔧 Gestión Operativa</h1>
          <p className="text-cyan-300">Administración y control de operaciones</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Artículo 51 - Ley 675</div>
          <div className="text-xs text-cyan-400">Gestión Administrativa</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glow-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">📋 Tareas Operativas</h3>
          <div className="space-y-3">
            {operations.map((op, index) => (
              <div key={index} className="bg-gray-800/30 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{op.task}</h4>
                  <span className={`px-2 py-1 text-xs rounded ${
                    op.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                    op.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-orange-500/20 text-orange-300'
                  }`}>
                    {op.status === 'completed' ? 'Completada' :
                     op.status === 'in-progress' ? 'En progreso' : 'Pendiente'}
                  </span>
                </div>
                <div className="text-sm text-gray-300">
                  <div>Fecha: {new Date(op.date).toLocaleDateString('es-CO')}</div>
                  <div>Responsable: {op.responsible}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glow-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">📊 Indicadores</h3>
          <div className="space-y-4">
            <div className="stat-card p-4 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">75%</div>
                <div className="text-sm text-gray-400">Tareas Completadas</div>
              </div>
            </div>
            <div className="stat-card p-4 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">2</div>
                <div className="text-sm text-gray-400">En Progreso</div>
              </div>
            </div>
            <div className="stat-card p-4 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">2</div>
                <div className="text-sm text-gray-400">Pendientes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OperationsModule
