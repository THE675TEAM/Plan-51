import React, { useState } from 'react'

const SanctionsModule: React.FC = () => {
  const [selectedInfraction, setSelectedInfraction] = useState('')
  const [sanctionAmount, setSanctionAmount] = useState(0)

  const infractions = [
    { type: 'Ruido excesivo', minAmount: 50000, maxAmount: 100000, article: 'Art. 57' },
    { type: 'Uso indebido de áreas comunes', minAmount: 75000, maxAmount: 150000, article: 'Art. 57' },
    { type: 'Mascotas sin autorización', minAmount: 40000, maxAmount: 80000, article: 'Art. 57' },
    { type: 'Modificaciones no autorizadas', minAmount: 100000, maxAmount: 200000, article: 'Art. 57' }
  ]

  const activeSanctions = [
    { id: 1, unit: 'Apto 205', owner: 'Carlos Pérez', infraction: 'Ruido excesivo', amount: 75000, date: '2025-06-15', status: 'notificado' },
    { id: 2, unit: 'Apto 302', owner: 'Ana García', infraction: 'Mascotas sin autorización', amount: 60000, date: '2025-06-10', status: 'pendiente' }
  ]

  return (
    <div className="p-8 space-y-8 fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold hologram-text mb-2">
            ⚠️ Sistema de Sanciones
          </h1>
          <p className="text-cyan-300">Calculadora automática y notificaciones legales</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Artículo 57 - Ley 675</div>
          <div className="text-xs text-cyan-400">Régimen Sancionatorio</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glow-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">🧮 Calculadora de Sanciones</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Tipo de Infracción</label>
              <select 
                value={selectedInfraction}
                onChange={(e) => setSelectedInfraction(e.target.value)}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white"
              >
                <option value="">Seleccione una infracción...</option>
                {infractions.map((inf, index) => (
                  <option key={index} value={inf.type}>{inf.type}</option>
                ))}
              </select>
            </div>
            {selectedInfraction && (
              <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 p-4 rounded-lg border border-orange-500/30">
                <h4 className="text-orange-300 font-semibold mb-2">Rango de Sanción</h4>
                <div className="text-sm text-orange-200">
                  Mínimo: ${infractions.find(i => i.type === selectedInfraction)?.minAmount.toLocaleString('es-CO')}<br/>
                  Máximo: ${infractions.find(i => i.type === selectedInfraction)?.maxAmount.toLocaleString('es-CO')}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="glow-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">📋 Sanciones Activas</h3>
          <div className="space-y-3">
            {activeSanctions.map((sanction) => (
              <div key={sanction.id} className="bg-gray-800/30 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-white">{sanction.unit}</h4>
                    <p className="text-sm text-gray-300">{sanction.owner}</p>
                    <p className="text-xs text-orange-400">{sanction.infraction}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-red-400 font-semibold">${sanction.amount.toLocaleString('es-CO')}</div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      sanction.status === 'notificado' ? 'bg-blue-500/20 text-blue-300' : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {sanction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SanctionsModule
