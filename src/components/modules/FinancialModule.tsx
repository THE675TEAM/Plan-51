import React, { useState } from 'react'

const FinancialModule: React.FC = () => {
  const [selectedCalculator, setSelectedCalculator] = useState('cuotas')
  const [calculatorData, setCalculatorData] = useState({
    totalUnits: 42,
    monthlyBudget: 8500000,
    commonExpenses: 6200000,
    reserves: 2300000
  })

  const calculators = [
    { id: 'cuotas', name: 'Cuotas de Administración', icon: '💰' },
    { id: 'presupuesto', name: 'Presupuesto Anual', icon: '📊' },
    { id: 'reservas', name: 'Reservas Obligatorias', icon: '🏦' },
    { id: 'paz-salvos', name: 'Paz y Salvos', icon: '✅' }
  ]

  const expenses = [
    { category: 'Servicios Públicos', amount: 2800000, percentage: 45 },
    { category: 'Mantenimiento', amount: 1500000, percentage: 24 },
    { category: 'Vigilancia', amount: 1200000, percentage: 19 },
    { category: 'Aseo', amount: 700000, percentage: 12 }
  ]

  const pendingPayments = [
    { unit: 'Apto 301', owner: 'Carlos Rodríguez', amount: 425000, months: 2 },
    { unit: 'Apto 205', owner: 'María González', amount: 212500, months: 1 },
    { unit: 'Local 102', owner: 'Empresa XYZ', amount: 850000, months: 2 },
    { unit: 'Apto 404', owner: 'Luis Martínez', amount: 637500, months: 3 }
  ]

  const calculateQuota = () => {
    const baseQuota = calculatorData.monthlyBudget / calculatorData.totalUnits
    return Math.round(baseQuota)
  }

  const calculateReserves = () => {
    const requiredReserves = calculatorData.monthlyBudget * 0.7 // 70% según normativa
    return Math.round(requiredReserves)
  }

  return (
    <div className="p-8 space-y-8 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold hologram-text mb-2">
            💰 Gestión Financiera IA
          </h1>
          <p className="text-cyan-300">
            Calculadoras automáticas y análisis financiero inteligente
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Artículos 51 y 52 - Ley 675</div>
          <div className="text-xs text-cyan-400">Administración Financiera</div>
        </div>
      </div>

      {/* Calculator selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {calculators.map((calc) => (
          <button
            key={calc.id}
            onClick={() => setSelectedCalculator(calc.id)}
            className={`p-4 rounded-lg text-left transition-all duration-300 ${
              selectedCalculator === calc.id
                ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-400'
                : 'bg-gray-800/20 hover:bg-gray-700/30 border border-gray-600/30'
            }`}
          >
            <div className="text-2xl mb-2">{calc.icon}</div>
            <h3 className="font-semibold text-white text-sm">{calc.name}</h3>
          </button>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator panel */}
        <div className="glow-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">
            🧮 Calculadora Inteligente
          </h3>
          
          {selectedCalculator === 'cuotas' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Total Unidades</label>
                <input
                  type="number"
                  value={calculatorData.totalUnits}
                  onChange={(e) => setCalculatorData({...calculatorData, totalUnits: parseInt(e.target.value) || 0})}
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Presupuesto Mensual ($)</label>
                <input
                  type="number"
                  value={calculatorData.monthlyBudget}
                  onChange={(e) => setCalculatorData({...calculatorData, monthlyBudget: parseInt(e.target.value) || 0})}
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white"
                />
              </div>
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-4 rounded-lg border border-green-500/30">
                <h4 className="text-green-300 font-semibold mb-2">Cuota Calculada</h4>
                <div className="text-3xl font-bold text-green-400">
                  ${calculateQuota().toLocaleString('es-CO')}
                </div>
                <p className="text-xs text-gray-400 mt-1">Por unidad mensual</p>
              </div>
            </div>
          )}

          {selectedCalculator === 'reservas' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 rounded-lg border border-blue-500/30">
                <h4 className="text-blue-300 font-semibold mb-2">Reserva Obligatoria</h4>
                <div className="text-3xl font-bold text-blue-400">
                  ${calculateReserves().toLocaleString('es-CO')}
                </div>
                <p className="text-xs text-gray-400 mt-1">70% del presupuesto mensual</p>
              </div>
              <div className="text-sm text-gray-300 bg-gray-800/30 p-3 rounded-lg">
                <strong>📖 Marco Legal:</strong> Según el artículo 51 de la Ley 675, el administrador debe mantener reservas para imprevistos y reparaciones mayores.
              </div>
            </div>
          )}
        </div>

        {/* Financial overview */}
        <div className="glow-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">
            📊 Resumen Financiero
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-800/30 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Ingresos Mensuales</span>
                <span className="text-green-400 font-semibold">
                  ${(calculateQuota() * calculatorData.totalUnits).toLocaleString('es-CO')}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Gastos Comunes</span>
                <span className="text-orange-400 font-semibold">
                  ${calculatorData.commonExpenses.toLocaleString('es-CO')}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Reservas Actuales</span>
                <span className="text-blue-400 font-semibold">
                  ${calculatorData.reserves.toLocaleString('es-CO')}
                </span>
              </div>
              <hr className="border-gray-600 my-3" />
              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">Balance</span>
                <span className="text-cyan-400 font-bold text-lg">
                  ${((calculateQuota() * calculatorData.totalUnits) - calculatorData.commonExpenses).toLocaleString('es-CO')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses breakdown */}
      <div className="glow-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-cyan-300 mb-4">
          💳 Distribución de Gastos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {expenses.map((expense, index) => (
            <div key={index} className="bg-gray-800/30 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">{expense.category}</h4>
              <div className="text-2xl font-bold text-cyan-400 mb-1">
                ${expense.amount.toLocaleString('es-CO')}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{expense.percentage}%</span>
                <div className="w-16 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${expense.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending payments */}
      <div className="glow-card p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-cyan-300 mb-4">
          ⚠️ Pagos Pendientes
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left p-3 text-gray-400">Unidad</th>
                <th className="text-left p-3 text-gray-400">Propietario</th>
                <th className="text-left p-3 text-gray-400">Monto</th>
                <th className="text-left p-3 text-gray-400">Meses</th>
                <th className="text-left p-3 text-gray-400">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pendingPayments.map((payment, index) => (
                <tr key={index} className="border-b border-gray-700/50">
                  <td className="p-3 text-white font-medium">{payment.unit}</td>
                  <td className="p-3 text-gray-300">{payment.owner}</td>
                  <td className="p-3 text-orange-400 font-semibold">
                    ${payment.amount.toLocaleString('es-CO')}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payment.months > 2 ? 'bg-red-500/20 text-red-300' :
                      payment.months > 1 ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-orange-500/20 text-orange-300'
                    }`}>
                      {payment.months} mes{payment.months > 1 ? 'es' : ''}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs text-white transition-colors">
                        Notificar
                      </button>
                      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs text-white transition-colors">
                        Recibo
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="glow-card p-6 rounded-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30">
        <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center">
          🤖 Recomendaciones IA
        </h3>
        <div className="space-y-3">
          <div className="bg-purple-800/20 p-3 rounded-lg">
            <p className="text-purple-200 text-sm">
              💡 <strong>Optimización:</strong> Considera renegociar el contrato de servicios públicos. Análisis indica posible ahorro del 12%.
            </p>
          </div>
          <div className="bg-blue-800/20 p-3 rounded-lg">
            <p className="text-blue-200 text-sm">
              📈 <strong>Predicción:</strong> Basado en el patrón de pagos, se recomienda aumentar las reservas en un 15% para el próximo trimestre.
            </p>
          </div>
          <div className="bg-green-800/20 p-3 rounded-lg">
            <p className="text-green-200 text-sm">
              ✅ <strong>Cumplimiento:</strong> El edificio mantiene un excelente nivel de reservas según los requisitos de la Ley 675.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinancialModule
