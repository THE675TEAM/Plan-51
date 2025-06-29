import React from 'react'
import FinancialModule from './modules/FinancialModule'
import LegalModule from './modules/LegalModule'
import AssembliesModule from './modules/AssembliesModule'
import OwnersModule from './modules/OwnersModule'
import SanctionsModule from './modules/SanctionsModule'
import CalendarModule from './modules/CalendarModule'
import OperationsModule from './modules/OperationsModule'
import DocumentsModule from './modules/DocumentsModule'

interface ModuleManagerProps {
  activeModule: string
}

const ModuleManager: React.FC<ModuleManagerProps> = ({ activeModule }) => {
  const renderModule = () => {
    switch (activeModule) {
      case 'financial':
        return <FinancialModule />
      case 'legal':
        return <LegalModule />
      case 'assemblies':
        return <AssembliesModule />
      case 'owners':
        return <OwnersModule />
      case 'sanctions':
        return <SanctionsModule />
      case 'calendar':
        return <CalendarModule />
      case 'operations':
        return <OperationsModule />
      case 'documents':
        return <DocumentsModule />
      default:
        return (
          <div className="p-8 fade-in">
            <div className="glow-card p-8 rounded-xl text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">
                Módulo en Desarrollo
              </h2>
              <p className="text-gray-400">
                Este módulo está siendo desarrollado por nuestro equipo de IA.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      {renderModule()}
    </div>
  )
}

export default ModuleManager
