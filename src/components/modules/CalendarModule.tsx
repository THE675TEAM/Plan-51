import React from 'react'

const CalendarModule: React.FC = () => {
  const events = [
    { date: '2025-06-30', title: 'Asamblea Ordinaria', type: 'assembly', priority: 'high' },
    { date: '2025-07-15', title: 'Vencimiento póliza seguro', type: 'insurance', priority: 'high' },
    { date: '2025-07-01', title: 'Pago cuotas administración', type: 'payment', priority: 'medium' },
    { date: '2025-07-10', title: 'Mantenimiento ascensores', type: 'maintenance', priority: 'medium' }
  ]

  return (
    <div className="p-8 space-y-8 fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold hologram-text mb-2">📅 Calendario Inteligente</h1>
          <p className="text-cyan-300">Recordatorios automáticos de obligaciones legales</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glow-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">📆 Eventos Próximos</h3>
          <div className="space-y-3">
            {events.map((event, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg">
                <div className="text-cyan-400 font-mono text-sm">
                  {new Date(event.date).toLocaleDateString('es-CO')}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{event.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    event.priority === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {event.priority === 'high' ? 'Alta prioridad' : 'Media prioridad'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glow-card p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">🔔 Alertas IA</h3>
          <div className="space-y-3 text-sm">
            <div className="bg-red-900/20 p-3 rounded border border-red-500/30 text-red-200">
              ⚠️ Asamblea ordinaria en 4 días - Preparar documentos
            </div>
            <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30 text-orange-200">
              📄 Renovar póliza de seguro en 15 días
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarModule
