import React from 'react'

interface SidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const modules = [
    {
      id: 'dashboard',
      name: 'Panel Principal',
      icon: '🏢',
      description: 'Vista general del sistema'
    },
    {
      id: 'financial',
      name: 'Gestión Financiera',
      icon: '💰',
      description: 'Administración financiera y presupuestos'
    },
    {
      id: 'legal',
      name: 'Asistente Legal',
      icon: '⚖️',
      description: 'Consultas sobre Ley 675'
    },
    {
      id: 'assemblies',
      name: 'Asambleas',
      icon: '🏛️',
      description: 'Gestión de asambleas y convocatorias'
    },
    {
      id: 'owners',
      name: 'Propietarios',
      icon: '👥',
      description: 'Control de propietarios y paz y salvos'
    },
    {
      id: 'sanctions',
      name: 'Sanciones',
      icon: '⚠️',
      description: 'Sistema de sanciones y notificaciones'
    },
    {
      id: 'calendar',
      name: 'Calendario Inteligente',
      icon: '📅',
      description: 'Recordatorios y obligaciones legales'
    },
    {
      id: 'operations',
      name: 'Operaciones',
      icon: '🔧',
      description: 'Gestión administrativa y operativa'
    },
    {
      id: 'documents',
      name: 'Documentos',
      icon: '📋',
      description: 'Generador de documentos legales'
    }
  ]

  return (
    <div className="w-80 sidebar-glow h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-cyan-500/30">
        <h1 className="text-2xl font-bold neon-text mb-2">
          THE 675 TEAM
        </h1>
        <p className="text-cyan-300 text-sm">
          Sistema Inteligente de Administración
        </p>
        <p className="text-cyan-400 text-xs mt-1">
          Basado en Ley 675 de 2001
        </p>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full p-4 rounded-lg text-left transition-all duration-300 group ${
                activeModule === module.id
                  ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-400 glow-card'
                  : 'bg-gray-800/20 hover:bg-gray-700/30 border border-gray-600/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{module.icon}</span>
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    activeModule === module.id ? 'text-cyan-300' : 'text-white'
                  }`}>
                    {module.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {module.description}
                  </p>
                </div>
              </div>
              
              {/* Active indicator */}
              {activeModule === module.id && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </button>
          ))}
        </div>
        
        {/* Footer info */}
        <div className="mt-8 p-4 glass-morphism rounded-lg">
          <h4 className="text-cyan-300 font-semibold mb-2">
            Sistema Inteligente
          </h4>
          <p className="text-xs text-gray-400 mb-3">
            Potenciado por IA para optimizar la administración de propiedad horizontal según normativa colombiana.
          </p>
          <div className="flex items-center space-x-2 text-xs text-cyan-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Sistema Activo</span>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
