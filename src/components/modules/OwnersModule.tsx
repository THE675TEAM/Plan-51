import React, { useState } from 'react'

interface Owner {
  id: number
  name: string
  unit: string
  email: string
  phone: string
  debt: number
  status: 'al-dia' | 'moroso' | 'suspendido'
  lastPayment: string
}

const OwnersModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('todos')
  
  const owners: Owner[] = [
    { id: 1, name: 'Carlos Rodríguez', unit: 'Apto 301', email: 'carlos@email.com', phone: '3001234567', debt: 425000, status: 'moroso', lastPayment: '2025-04-15' },
    { id: 2, name: 'María González', unit: 'Apto 205', email: 'maria@email.com', phone: '3007654321', debt: 0, status: 'al-dia', lastPayment: '2025-06-15' },
    { id: 3, name: 'Luis Martínez', unit: 'Apto 404', email: 'luis@email.com', phone: '3009876543', debt: 637500, status: 'moroso', lastPayment: '2025-03-20' },
    { id: 4, name: 'Ana Torres', unit: 'Apto 102', email: 'ana@email.com', phone: '3005551234', debt: 0, status: 'al-dia', lastPayment: '2025-06-20' }
  ]

  const filteredOwners = owners.filter(owner => {
    const matchesSearch = owner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         owner.unit.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'todos' || owner.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const generatePazYSalvo = (owner: Owner) => {
    const isUpToDate = owner.debt === 0
    return {
      isValid: isUpToDate,
      document: `
PAZ Y SALVO
Edificio Residencial THE 675 TEAM

Se certifica que el propietario:
NOMBRE: ${owner.name}
UNIDAD: ${owner.unit}

${isUpToDate ? 
  'SE ENCUENTRA AL DÍA en el pago de cuotas de administración a la fecha.' :
  'PRESENTA MORA en el pago de cuotas por valor de $' + owner.debt.toLocaleString('es-CO')
}

Fecha de expedición: ${new Date().toLocaleDateString('es-CO')}
Válido por: 30 días

EL ADMINISTRADOR
      `
    }
  }

  return (
    <div className="p-8 space-y-8 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold hologram-text mb-2">
            👥 Control de Propietarios
          </h1>
          <p className="text-cyan-300">
            Base de datos interactiva con paz y salvos automáticos
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Artículo 51 numeral 6 - Ley 675</div>
          <div className="text-xs text-cyan-400">Paz y Salvos</div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Buscar por nombre o unidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white"
          >
            <option value="todos">Todos los estados</option>
            <option value="al-dia">Al día</option>
            <option value="moroso">Moroso</option>
            <option value="suspendido">Suspendido</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card p-4 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{owners.length}</div>
            <div className="text-sm text-gray-400">Total Propietarios</div>
          </div>
        </div>
        <div className="stat-card p-4 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {owners.filter(o => o.status === 'al-dia').length}
            </div>
            <div className="text-sm text-gray-400">Al Día</div>
          </div>
        </div>
        <div className="stat-card p-4 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">
              {owners.filter(o => o.status === 'moroso').length}
            </div>
            <div className="text-sm text-gray-400">Morosos</div>
          </div>
        </div>
        <div className="stat-card p-4 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              ${owners.reduce((sum, o) => sum + o.debt, 0).toLocaleString('es-CO')}
            </div>
            <div className="text-sm text-gray-400">Deuda Total</div>
          </div>
        </div>
      </div>

      {/* Owners table */}
      <div className="glow-card rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-4 border-b border-cyan-500/30">
          <h3 className="text-lg font-semibold text-white">Base de Datos de Propietarios</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left p-4 text-gray-400">Propietario</th>
                <th className="text-left p-4 text-gray-400">Unidad</th>
                <th className="text-left p-4 text-gray-400">Contacto</th>
                <th className="text-left p-4 text-gray-400">Estado</th>
                <th className="text-left p-4 text-gray-400">Deuda</th>
                <th className="text-left p-4 text-gray-400">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOwners.map((owner) => (
                <tr key={owner.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-white">{owner.name}</div>
                      <div className="text-xs text-gray-400">
                        Último pago: {new Date(owner.lastPayment).toLocaleDateString('es-CO')}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-cyan-400 font-medium">{owner.unit}</td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="text-gray-300">{owner.email}</div>
                      <div className="text-gray-400">{owner.phone}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      owner.status === 'al-dia' ? 'bg-green-500/20 text-green-300' :
                      owner.status === 'moroso' ? 'bg-orange-500/20 text-orange-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {owner.status === 'al-dia' ? 'Al día' :
                       owner.status === 'moroso' ? 'Moroso' : 'Suspendido'}
                    </span>
                  </td>
                  <td className="p-4">
                    {owner.debt > 0 ? (
                      <span className="text-orange-400 font-semibold">
                        ${owner.debt.toLocaleString('es-CO')}
                      </span>
                    ) : (
                      <span className="text-green-400">$0</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button 
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          owner.debt === 0 
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        }`}
                        disabled={owner.debt > 0}
                      >
                        📄 Paz y Salvo
                      </button>
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors">
                        ✏️ Editar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paz y Salvo generator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glow-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">
            📄 Generador de Paz y Salvo
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Seleccionar Propietario</label>
              <select className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white">
                <option>Seleccione un propietario...</option>
                {owners.map(owner => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name} - {owner.unit}
                  </option>
                ))}
              </select>
            </div>
            <button className="w-full cyber-button py-3 rounded-lg font-semibold">
              🚀 Generar Paz y Salvo
            </button>
          </div>
        </div>

        <div className="glow-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">
            🤖 Análisis Inteligente
          </h3>
          <div className="space-y-3">
            <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
              <p className="text-blue-200 text-sm">
                📊 <strong>Estadística:</strong> El 50% de los propietarios están al día en sus pagos.
              </p>
            </div>
            <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
              <p className="text-orange-200 text-sm">
                ⚠️ <strong>Alerta:</strong> 2 propietarios presentan mora superior a 2 meses.
              </p>
            </div>
            <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
              <p className="text-green-200 text-sm">
                💡 <strong>Recomendación:</strong> Implementar plan de pagos para propietarios morosos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnersModule
