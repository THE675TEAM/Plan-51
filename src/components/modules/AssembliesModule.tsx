import React, { useState } from 'react'

interface Assembly {
  id: number
  type: 'ordinaria' | 'extraordinaria'
  date: string
  time: string
  status: 'programada' | 'realizada' | 'cancelada'
  agenda: string[]
  quorum: number
  attendees?: number
}

const AssembliesModule: React.FC = () => {
  const [selectedView, setSelectedView] = useState('calendar')
  const [showNewAssembly, setShowNewAssembly] = useState(false)
  const [newAssembly, setNewAssembly] = useState({
    type: 'ordinaria',
    date: '',
    time: '',
    agenda: ''
  })

  const assemblies: Assembly[] = [
    {
      id: 1,
      type: 'ordinaria',
      date: '2025-06-30',
      time: '09:00',
      status: 'programada',
      agenda: [
        'Verificación del quórum',
        'Lectura y aprobación del acta anterior',
        'Informe del administrador',
        'Estados financieros',
        'Presupuesto para el próximo período',
        'Elección del consejo de administración',
        'Proposiciones y varios'
      ],
      quorum: 50
    },
    {
      id: 2,
      type: 'extraordinaria',
      date: '2025-05-15',
      time: '19:00',
      status: 'realizada',
      agenda: [
        'Aprobación de reforma al reglamento',
        'Autorización para obras de mejora',
        'Aumento de cuotas extraordinarias'
      ],
      quorum: 51,
      attendees: 32
    }
  ]

  const agendaTemplates = {
    ordinaria: [
      'Verificación del quórum',
      'Lectura y aprobación del acta anterior',
      'Informe del administrador',
      'Estados financieros',
      'Presupuesto para el próximo período',
      'Elección de dignatarios',
      'Proposiciones y varios'
    ],
    extraordinaria: [
      'Verificación del quórum',
      'Lectura del orden del día',
      'Tema específico a tratar',
      'Votaciones correspondientes'
    ]
  }

  const generateConvocation = (assembly: Assembly) => {
    const isOrdinary = assembly.type === 'ordinaria'
    const minDays = isOrdinary ? 15 : 8
    
    return `
CONVOCATORIA A ASAMBLEA ${assembly.type.toUpperCase()}

De conformidad con lo establecido en los artículos 33 al 41 de la Ley 675 de 2001, se convoca a todos los propietarios y/o sus representantes a la Asamblea ${assembly.type} que se realizará:

FECHA: ${new Date(assembly.date).toLocaleDateString('es-CO', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}
HORA: ${assembly.time}
LUGAR: Salón comunal del edificio

ORDEN DEL DÍA:
${assembly.agenda.map((item, index) => `${index + 1}. ${item}`).join('\n')}

IMPORTANTE:
- La convocatoria se realiza con ${minDays} días de anticipación según la ley
- El quórum requerido es del ${assembly.quorum}% de los coeficientes
- En segunda convocatoria (30 minutos después) se sesiona con cualquier número
- Favor confirmar asistencia para efectos de logística

Atentamente,
EL ADMINISTRADOR
`
  }

  return (
    <div className="p-8 space-y-8 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold hologram-text mb-2">
            🏛️ Gestión de Asambleas
          </h1>
          <p className="text-cyan-300">
            Generador automático de convocatorias y gestión de asambleas
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Artículos 33-41 - Ley 675</div>
          <div className="text-xs text-cyan-400">Asambleas de Propietarios</div>
        </div>
      </div>

      {/* View selector */}
      <div className="flex space-x-4">
        <button
          onClick={() => setSelectedView('calendar')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            selectedView === 'calendar'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
              : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/30'
          }`}
        >
          📅 Calendario
        </button>
        <button
          onClick={() => setSelectedView('generate')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            selectedView === 'generate'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
              : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/30'
          }`}
        >
          ✍️ Generar Convocatoria
        </button>
        <button
          onClick={() => setSelectedView('templates')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            selectedView === 'templates'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
              : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/30'
          }`}
        >
          📋 Plantillas
        </button>
      </div>

      {/* Calendar view */}
      {selectedView === 'calendar' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-cyan-300">Asambleas Programadas</h2>
            <button
              onClick={() => setShowNewAssembly(true)}
              className="cyber-button px-6 py-3 rounded-lg font-semibold"
            >
              + Nueva Asamblea
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assemblies.map((assembly) => (
              <div key={assembly.id} className="glow-card p-6 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Asamblea {assembly.type.charAt(0).toUpperCase() + assembly.type.slice(1)}
                    </h3>
                    <p className="text-cyan-400">
                      {new Date(assembly.date).toLocaleDateString('es-CO')} a las {assembly.time}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    assembly.status === 'programada' ? 'bg-blue-500/20 text-blue-300' :
                    assembly.status === 'realizada' ? 'bg-green-500/20 text-green-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {assembly.status.charAt(0).toUpperCase() + assembly.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Orden del Día:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {assembly.agenda.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                      {assembly.agenda.length > 3 && (
                        <li className="text-cyan-400 text-xs">
                          +{assembly.agenda.length - 3} temas más...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">
                      Quórum: {assembly.quorum}%
                    </span>
                    {assembly.attendees && (
                      <span className="text-green-400">
                        Asistencia: {assembly.attendees} propietarios
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {assembly.status === 'programada' && (
                      <>
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm transition-colors">
                          📧 Enviar Convocatoria
                        </button>
                        <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded text-sm transition-colors">
                          ✏️ Editar
                        </button>
                      </>
                    )}
                    {assembly.status === 'realizada' && (
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm transition-colors">
                        📄 Ver Acta
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generate convocation view */}
      {selectedView === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glow-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">
              ✍️ Generador de Convocatorias
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tipo de Asamblea</label>
                <select
                  value={newAssembly.type}
                  onChange={(e) => setNewAssembly({...newAssembly, type: e.target.value as 'ordinaria' | 'extraordinaria'})}
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white"
                >
                  <option value="ordinaria">Ordinaria</option>
                  <option value="extraordinaria">Extraordinaria</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Fecha</label>
                  <input
                    type="date"
                    value={newAssembly.date}
                    onChange={(e) => setNewAssembly({...newAssembly, date: e.target.value})}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Hora</label>
                  <input
                    type="time"
                    value={newAssembly.time}
                    onChange={(e) => setNewAssembly({...newAssembly, time: e.target.value})}
                    className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Temas Adicionales (opcional)</label>
                <textarea
                  value={newAssembly.agenda}
                  onChange={(e) => setNewAssembly({...newAssembly, agenda: e.target.value})}
                  placeholder="Temas específicos para agregar al orden del día..."
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white h-20 resize-none"
                />
              </div>

              <button className="w-full cyber-button py-3 rounded-lg font-semibold">
                🚀 Generar Convocatoria
              </button>
            </div>
          </div>

          <div className="glow-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">
              📄 Vista Previa
            </h3>
            <div className="bg-gray-800/30 p-4 rounded-lg text-sm text-gray-300 whitespace-pre-line font-mono">
              {newAssembly.date && newAssembly.time ? 
                generateConvocation({
                  id: 0,
                  type: newAssembly.type as 'ordinaria' | 'extraordinaria',
                  date: newAssembly.date,
                  time: newAssembly.time,
                  status: 'programada',
                  agenda: [
                    ...agendaTemplates[newAssembly.type as 'ordinaria' | 'extraordinaria'],
                    ...(newAssembly.agenda ? newAssembly.agenda.split('\n').filter(item => item.trim()) : [])
                  ],
                  quorum: 50
                }) :
                'Complete los campos para generar la vista previa de la convocatoria...'
              }
            </div>
          </div>
        </div>
      )}

      {/* Templates view */}
      {selectedView === 'templates' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-cyan-300">📋 Plantillas de Orden del Día</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glow-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                📅 Asamblea Ordinaria
              </h3>
              <div className="space-y-2">
                {agendaTemplates.ordinaria.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-800/30 rounded">
                    <span className="text-cyan-400 font-semibold text-sm">{index + 1}.</span>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm transition-colors">
                Usar esta plantilla
              </button>
            </div>

            <div className="glow-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                ⚡ Asamblea Extraordinaria
              </h3>
              <div className="space-y-2">
                {agendaTemplates.extraordinaria.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-800/30 rounded">
                    <span className="text-cyan-400 font-semibold text-sm">{index + 1}.</span>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded text-sm transition-colors">
                Usar esta plantilla
              </button>
            </div>
          </div>

          {/* Legal requirements */}
          <div className="glow-card p-6 rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">
              ⚖️ Requisitos Legales - Ley 675
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-800/20 p-3 rounded border border-blue-500/30">
                <h4 className="text-blue-300 font-semibold mb-2">Asamblea Ordinaria</h4>
                <ul className="text-blue-200 space-y-1">
                  <li>• Convocatoria: 15 días calendario</li>
                  <li>• Frecuencia: Una vez al año</li>
                  <li>• Quórum: 50% + 1 de coeficientes</li>
                  <li>• Segunda convocatoria: Cualquier número</li>
                </ul>
              </div>
              <div className="bg-orange-800/20 p-3 rounded border border-orange-500/30">
                <h4 className="text-orange-300 font-semibold mb-2">Asamblea Extraordinaria</h4>
                <ul className="text-orange-200 space-y-1">
                  <li>• Convocatoria: 8 días calendario</li>
                  <li>• Frecuencia: Cuando sea necesaria</li>
                  <li>• Quórum: 50% + 1 de coeficientes</li>
                  <li>• Orden del día específico</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New assembly modal */}
      {showNewAssembly && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-cyan-500/30 p-6 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Nueva Asamblea</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tipo</label>
                <select className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white">
                  <option>Ordinaria</option>
                  <option>Extraordinaria</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Fecha</label>
                  <input type="date" className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Hora</label>
                  <input type="time" className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white" />
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowNewAssembly(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowNewAssembly(false)}
                  className="flex-1 cyber-button py-2 px-4 rounded"
                >
                  Crear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssembliesModule
