import React, { useState, useRef, useEffect } from 'react'

interface AIAssistantProps {
  onClose: () => void
}

interface Message {
  id: number
  type: 'user' | 'ai'
  message: string
  timestamp: Date
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      message: '🤖 ¡Hola! Soy el Asistente IA de THE 675 TEAM. Puedo ayudarte con consultas sobre la Ley 675, cálculos financieros, generación de documentos y más. ¿En qué te puedo asistir?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickActions = [
    '¿Cómo calcular las cuotas?',
    '¿Qué funciones tiene el administrador?',
    'Generar paz y salvo',
    '¿Cómo convocar asamblea?'
  ]

  const simulateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('cuota') || message.includes('calcular')) {
      return '💰 Para calcular las cuotas de administración, debes dividir el presupuesto mensual entre el número total de unidades. Puedes usar la calculadora en el módulo de Gestión Financiera. ¿Te ayudo con algún cálculo específico?'
    }
    
    if (message.includes('administrador') || message.includes('funciones')) {
      return '⚖️ El administrador tiene múltiples funciones según el artículo 51 de la Ley 675: representar legalmente la copropiedad, convocar asambleas, recaudar cuotas, llevar libros de administración, otorgar paz y salvos, entre otras. ¿Quieres información específica sobre alguna función?'
    }
    
    if (message.includes('paz') || message.includes('salvo')) {
      return '📄 Un paz y salvo certifica que el propietario está al día en sus obligaciones. Solo se puede otorgar cuando no hay deudas pendientes. Puedes generarlo automáticamente en el módulo de Propietarios. ¿Necesitas generar uno ahora?'
    }
    
    if (message.includes('asamblea') || message.includes('convocar')) {
      return '🏛️ Para convocar una asamblea debes hacerlo con 15 días de anticipación (ordinaria) u 8 días (extraordinaria). El módulo de Asambleas tiene un generador automático de convocatorias. ¿Qué tipo de asamblea necesitas convocar?'
    }
    
    if (message.includes('sancion') || message.includes('multa')) {
      return '⚠️ Las sanciones deben respetar el debido proceso. El monto máximo es de 2 salarios mínimos diarios por infracción. Usa el módulo de Sanciones para calcular automáticamente los montos según el tipo de infracción.'
    }
    
    return '🤔 Entiendo tu consulta. Como asistente especializado en la Ley 675, puedo ayudarte con temas específicos como: administración financiera, asambleas, sanciones, documentos legales, y gestión de propietarios. ¿Podrías ser más específico sobre lo que necesitas?'
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse = simulateAIResponse(inputMessage)
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        message: aiResponse,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1200)
  }

  const handleQuickAction = (action: string) => {
    setInputMessage(action)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="fixed bottom-6 right-24 w-96 h-[600px] glow-card rounded-xl slide-in-right z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 p-4 border-b border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              🤖
            </div>
            <div>
              <h3 className="font-semibold text-white">Asistente IA 675</h3>
              <p className="text-xs text-purple-300">Especialista en Propiedad Horizontal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-3 rounded-lg text-sm ${
              message.type === 'user' 
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                : 'bg-gray-800/70 border border-purple-500/20 text-gray-200'
            }`}>
              <p className="whitespace-pre-line">{message.message}</p>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800/70 border border-purple-500/20 text-gray-200 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      <div className="p-3 border-t border-purple-500/30">
        <div className="text-xs text-gray-400 mb-2">Acciones rápidas:</div>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
              className="text-xs p-2 bg-gray-800/30 hover:bg-gray-700/30 border border-gray-600/30 hover:border-purple-500/30 rounded transition-all duration-300"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-purple-500/30">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe tu consulta..."
            className="flex-1 p-2 bg-gray-800/50 border border-purple-500/30 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-400"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded text-sm font-medium disabled:opacity-50 transition-all duration-300"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
