import React, { useState } from 'react'

const DocumentsModule: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('')

  const templates = [
    { id: 'convocatoria', name: 'Convocatoria a Asamblea', icon: '📧', category: 'Asambleas' },
    { id: 'acta', name: 'Acta de Asamblea', icon: '📄', category: 'Asambleas' },
    { id: 'paz-salvo', name: 'Paz y Salvo', icon: '✅', category: 'Financiero' },
    { id: 'recibo', name: 'Recibo de Pago', icon: '💰', category: 'Financiero' },
    { id: 'sancion', name: 'Notificación de Sanción', icon: '⚠️', category: 'Legal' },
    { id: 'contrato', name: 'Contrato de Servicios', icon: '📋', category: 'Administrativo' }
  ]

  const generateDocument = (templateId: string) => {
    const templates: Record<string, string> = {
      'paz-salvo': `
PAZ Y SALVO
EDIFICIO RESIDENCIAL THE 675 TEAM

EL ADMINISTRADOR del Edificio Residencial certifica que:

PROPIETARIO: [NOMBRE_PROPIETARIO]
UNIDAD: [NUMERO_UNIDAD]
CÉDULA: [CEDULA]

SE ENCUENTRA AL DÍA en el pago de cuotas de administración, servicios y demás obligaciones pecuniarias para con la copropiedad, a la fecha de expedición del presente documento.

Este documento se expide de conformidad con lo establecido en el artículo 51 numeral 6 de la Ley 675 de 2001.

Fecha de expedición: ${new Date().toLocaleDateString('es-CO')}
Válido por: 30 días calendario

_________________________
EL ADMINISTRADOR
      `,
      'recibo': `
RECIBO DE PAGO
EDIFICIO RESIDENCIAL THE 675 TEAM

RECIBO No.: [NUMERO_RECIBO]
FECHA: ${new Date().toLocaleDateString('es-CO')}

PROPIETARIO: [NOMBRE_PROPIETARIO]
UNIDAD: [NUMERO_UNIDAD]

CONCEPTO: Cuota de administración mes de [MES_PERIODO]
VALOR: $[VALOR_CUOTA]

FORMA DE PAGO: [FORMA_PAGO]
FECHA DE PAGO: [FECHA_PAGO]

_________________________
EL ADMINISTRADOR
      `
    }
    
    return templates[templateId] || 'Plantilla no disponible'
  }

  return (
    <div className="p-8 space-y-8 fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold hologram-text mb-2">📋 Generador de Documentos</h1>
          <p className="text-cyan-300">Plantillas automáticas de documentos legales</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Ley 675 de 2001</div>
          <div className="text-xs text-cyan-400">Documentación Legal</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glow-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">📄 Plantillas Disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 rounded-lg text-left transition-all duration-300 ${
                  selectedTemplate === template.id
                    ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-400'
                    : 'bg-gray-800/20 hover:bg-gray-700/30 border border-gray-600/30'
                }`}
              >
                <div className="text-2xl mb-2">{template.icon}</div>
                <h4 className="font-semibold text-white text-sm">{template.name}</h4>
                <p className="text-xs text-gray-400">{template.category}</p>
              </button>
            ))}
          </div>
          
          {selectedTemplate && (
            <div className="mt-6">
              <button className="w-full cyber-button py-3 rounded-lg font-semibold">
                🚀 Generar Documento
              </button>
            </div>
          )}
        </div>

        <div className="glow-card p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">👁️ Vista Previa</h3>
          <div className="bg-gray-800/30 p-4 rounded-lg text-sm text-gray-300 whitespace-pre-line font-mono max-h-96 overflow-y-auto">
            {selectedTemplate ? 
              generateDocument(selectedTemplate) :
              'Seleccione una plantilla para ver la vista previa...'
            }
          </div>
        </div>
      </div>

      <div className="glow-card p-6 rounded-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30">
        <h3 className="text-lg font-semibold text-purple-300 mb-4">🤖 Funciones IA</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-purple-800/20 p-3 rounded border border-purple-500/30">
            <h4 className="text-purple-300 font-semibold mb-2">Auto-completado</h4>
            <p className="text-purple-200">Llena automáticamente los datos del propietario desde la base de datos.</p>
          </div>
          <div className="bg-blue-800/20 p-3 rounded border border-blue-500/30">
            <h4 className="text-blue-300 font-semibold mb-2">Validación Legal</h4>
            <p className="text-blue-200">Verifica que el documento cumple con los requisitos de la Ley 675.</p>
          </div>
          <div className="bg-green-800/20 p-3 rounded border border-green-500/30">
            <h4 className="text-green-300 font-semibold mb-2">Envío Automático</h4>
            <p className="text-green-200">Envía los documentos por email directamente a los propietarios.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentsModule
