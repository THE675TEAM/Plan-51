import React, { useState, useEffect } from 'react'

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [stats, setStats] = useState({
    totalUnits: 420,
    activeOwners: 38,
    pendingPayments: 5,
    upcomingAssemblies: 1,
    activeSanctions: 2,
    completedTasks: 85
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const tasksByCategory = [
    { category: 'Gestión Financiera', pending: 3, completed: 12, priority: 'high' },
    { category: 'Asambleas', pending: 1, completed: 2, priority: 'medium' },
    { category: 'Sanciones', pending: 2, completed: 1, priority: 'high' },
    { category: 'Documentación', pending: 4, completed: 8, priority: 'low' },
    { category: 'Propietarios', pending: 1, completed: 15, priority: 'medium' }
  ]

  const recentActivities = [
    { time: '10:30', action: 'Convocatoria enviada para Asamblea Ordinaria', type: 'assembly' },
    { time: '09:15', action: 'Pago de cuota de administración recibido - Apto 301', type: 'payment' },
    { time: '08:45', action: 'Notificación de sanción enviada - Apto 205', type: 'sanction' },
    { time: '08:30', action: 'Actualización de datos de propietario - Apto 102', type: 'owner' }
  ]

  const alerts = [
    { message: 'Asamblea Ordinaria programada para el 30 de junio', level: 'info', icon: '🏛️' },
    { message: '5 propietarios con pagos pendientes', level: 'warning', icon: '⚠️' },
    { message: 'Renovación de póliza de seguro vence en 15 días', level: 'error', icon: '🛡️' }
  ]

  return (
    <div className="p-8 space-y-8 fade-in">
      {/* Header with time */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold hologram-text mb-2">
            Panel de Control THE 675 TEAM
          </h1>
          <p className="text-cyan-300">
            Sistema Inteligente de Administración de Propiedad Horizontal
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono text-cyan-400">
            {currentTime.toLocaleTimeString('es-CO')}
          </div>
          <div className="text-sm text-gray-400">
            {currentTime.toLocaleDateString('es-CO', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat-card p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Unidades</p>
              <p className="text-3xl font-bold text-cyan-400">{stats.totalUnits}</p>
            </div>
            <div className="text-4xl">🏢</div>
          </div>
        </div>

        <div className="stat-card p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Propietarios Activos</p>
              <p className="text-3xl font-bold text-green-400">{stats.activeOwners}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="stat-card p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pagos Pendientes</p>
              <p className="text-3xl font-bold text-orange-400">{stats.pendingPayments}</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="stat-card p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Próximas Asambleas</p>
              <p className="text-3xl font-bold text-blue-400">{stats.upcomingAssemblies}</p>
            </div>
            <div className="text-4xl">🏛️</div>
          </div>
        </div>

        <div className="stat-card p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Sanciones Activas</p>
              <p className="text-3xl font-bold text-red-400">{stats.activeSanctions}</p>
            </div>
            <div className="text-4xl">⚠️</div>
          </div>
        </div>

        <div className="stat-card p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Cumplimiento</p>
              <p className="text-3xl font-bold text-cyan-400">{stats.completedTasks}%</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tasks by category */}
        <div className="glow-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center">
            📊 Tareas por Categoría
          </h3>
          <div className="space-y-4">
            {tasksByCategory.map((task, index) => (
              <div key={index} className="bg-gray-800/30 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-white">{task.category}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                    task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {task.priority === 'high' ? 'Alta' : 
                     task.priority === 'medium' ? 'Media' : 'Baja'}
                  </span>
                </div>
                <div className="flex space-x-4 text-sm">
                  <span className="text-orange-400">Pendientes: {task.pending}</span>
                  <span className="text-green-400">Completadas: {task.completed}</span>
                </div>
                <div className="mt-2 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                    style={{ 
                      width: `${(task.completed / (task.completed + task.pending)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activities */}
        <div className="glow-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center">
            🕒 Actividad Reciente
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg">
                <div className="text-xs text-cyan-400 font-mono min-w-12">
                  {activity.time}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{activity.action}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                    activity.type === 'assembly' ? 'bg-blue-500/20 text-blue-300' :
                    activity.type === 'payment' ? 'bg-green-500/20 text-green-300' :
                    activity.type === 'sanction' ? 'bg-red-500/20 text-red-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {activity.type === 'assembly' ? 'Asamblea' :
                     activity.type === 'payment' ? 'Pago' :
                     activity.type === 'sanction' ? 'Sanción' : 'General'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts section */}
      <div className="glow-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center">
          🚨 Alertas Inteligentes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((alert, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              alert.level === 'error' ? 'bg-red-900/20 border-red-500/30 text-red-300' :
              alert.level === 'warning' ? 'bg-yellow-900/20 border-yellow-500/30 text-yellow-300' :
              'bg-blue-900/20 border-blue-500/30 text-blue-300'
            }`}>
              <div className="flex items-start space-x-3">
                <span className="text-xl">{alert.icon}</span>
                <p className="text-sm">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="cyber-button p-4 rounded-lg text-white font-semibold hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">💰</div>
          Generar Recibo
        </button>
        <button className="cyber-button p-4 rounded-lg text-white font-semibold hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">📧</div>
          Enviar Convocatoria
        </button>
        <button className="cyber-button p-4 rounded-lg text-white font-semibold hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">📋</div>
          Nuevo Documento
        </button>
        <button className="cyber-button p-4 rounded-lg text-white font-semibold hover:scale-105 transition-transform">
          <div className="text-2xl mb-2">⚖️</div>
          Consultar Ley
        </button>
      </div>
    </div>
  )
}

export default Dashboard
