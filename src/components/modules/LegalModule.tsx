import React, { useState, useRef, useEffect } from 'react'

interface ChatMessage {
  id: number
  type: 'user' | 'ai'
  message: string
  timestamp: Date
  article?: string
}

const LegalModule: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'ai',
      message: '¡Hola! Soy tu asistente legal especializado en la Ley 675 de 2001. Puedo ayudarte con consultas sobre administración de propiedad horizontal, deberes del administrador, asambleas, sanciones y mucho más. ¿En qué puedo asistirte?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const legalDatabase = {
    'administrador': {
      article: 'Artículo 51',
      content: 'Son funciones del administrador: representar legalmente la persona jurídica, convocar asambleas, llevar los libros de administración, otorgar paz y salvos, recaudar cuotas de administración, entre otras.'
    },
    'cuotas': {
      article: 'Artículo 52',
      content: 'Las cuotas de administración son obligatorias y su pago es exigible. El administrador debe recaudarlas y aplicar los procedimientos de cobro establecidos en la ley.'
    },
    'asamblea': {
      article: 'Artículos 33-41',
      content: 'La asamblea general es el órgano máximo de dirección. Se reúne ordinariamente una vez al año y extraordinariamente cuando sea necesario. Las decisiones se toman por mayorías establecidas en la ley.'
    },
    'sanciones': {
      article: 'Artículo 57',
      content: 'Las sanciones por incumplimiento de obligaciones no pecuniarias deben respetar el debido proceso, el derecho de defensa y contradicción. Las multas tienen límites establecidos.'
    },
    'paz y salvo': {
      article: 'Artículo 51 numeral 6',
      content: 'El administrador debe otorgar paz y salvos por cuotas de administración. Es un documento que certifica que el propietario se encuentra al día en sus obligaciones.'
    }
  }

  const quickQuestions = [
    '¿Cuáles son las funciones del administrador?',
    '¿Cómo se calculan las cuotas de administración?',
    '¿Qué es una asamblea extraordinaria?',
    '¿Cómo aplicar sanciones legalmente?',
    '¿Qué es un paz y salvo?',
    '¿Cuáles son las reservas obligatorias?'
  ]

  const simulateAIResponse = (userMessage: string): { message: string; article?: string } => {
    const message = userMessage.toLowerCase()
    
    // Buscar en la base de datos legal
    for (const [key, value] of Object.entries(legalDatabase)) {
      if (message.includes(key)) {
        return {
          message: `📖 ${value.content}\n\n💡 Esta información se encuentra en el ${value.article} de la Ley 675 de 2001.`,
          article: value.article
        }
      }
    }

    // Respuestas generales basadas en palabras clave
    if (message.includes('multa') || message.includes('sancion')) {
      return {
        message: '⚖️ Las sanciones en propiedad horizontal deben seguir el debido proceso. Las multas no pueden exceder 2 salarios mínimos diarios vigentes por cada incumplimiento. Es importante documentar todas las notificaciones y dar oportunidad de descargos al sancionado.',
        article: 'Artículo 57'
      }
    }

    if (message.includes('reserva') || message.includes('fondo')) {
      return {
        message: '🏦 Las reservas son fondos obligatorios que debe mantener la copropiedad para reparaciones y mantenimiento de bienes comunes. Se recomienda mantener al menos el 70% del presupuesto anual como reserva.',
        article: 'Artículo 51'
      }
    }

    if (message.includes('convocatoria')) {
      return {
        message: '📧 La convocatoria a asamblea debe realizarse con mínimo 15 días calendario de anticipación para asambleas ordinarias y 8 días para extraordinarias. Debe incluir orden del día específico y enviarse a todos los propietarios.',
        article: 'Artículo 35'
      }
    }

    if (message.includes('quorum')) {
      return {
        message: '👥 El quórum para asambleas es la mitad más uno de los coeficientes de copropiedad. Si no se logra en primera convocatoria, en segunda convocatoria se constituye con cualquier número de asistentes.',
        article: 'Artículo 37'
      }
    }

    // Respuesta por defecto
    return {
      message: '🤖 Entiendo tu consulta sobre propiedad horizontal. Aunque no tengo información específica sobre ese tema en mi base de datos actual, te recomiendo revisar la Ley 675 de 2001 o ser más específico en tu consulta. Puedo ayudarte con temas como: administrador, cuotas, asambleas, sanciones, paz y salvos, reservas, entre otros.'
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simular delay de IA
    setTimeout(() => {
      const aiResponse = simulateAIResponse(inputMessage)
      const aiMessage: ChatMessage = {
        id: messages.length + 2,
        type: 'ai',
        message: aiResponse.message,
        timestamp: new Date(),
        article: aiResponse.article
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="p-8 space-y-8 fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold hologram-text mb-2">
            ⚖️ Asistente Legal IA
          </h1>
          <p className="text-cyan-300">
            Consultas inteligentes sobre la Ley 675 de 2001
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Ley 675 de 2001</div>
          <div className="text-xs text-cyan-400">Régimen de Propiedad Horizontal</div>
        </div>
      </div>

      {/* Main chat interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Chat area */}
        <div className="lg:col-span-3">
          <div className="glow-card rounded-xl overflow-hidden h-96 flex flex-col">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-4 border-b border-cyan-500/30">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  🤖
                </div>
                <div>
                  <h3 className="font-semibold text-white">Asistente Legal 675</h3>
                  <p className="text-xs text-cyan-300">Especialista en Propiedad Horizontal</p>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">En línea</span>
                </div>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3xl p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                      : 'bg-gray-800/50 border border-cyan-500/20 text-gray-200'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.message}</p>
                    {message.article && (
                      <div className="mt-2 text-xs bg-blue-900/30 p-2 rounded border border-blue-500/30">
                        📖 Referencia: {message.article}
                      </div>
                    )}
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('es-CO')}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/50 border border-cyan-500/20 text-gray-200 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-cyan-500/30">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu consulta legal aquí..."
                  className="flex-1 p-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-6 py-3 cyber-button rounded-lg font-semibold disabled:opacity-50"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick questions sidebar */}
        <div className="space-y-6">
          <div className="glow-card p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">
              ❓ Consultas Frecuentes
            </h3>
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left p-3 text-sm bg-gray-800/30 hover:bg-gray-700/30 border border-gray-600/30 hover:border-cyan-500/30 rounded-lg transition-all duration-300"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Legal references */}
          <div className="glow-card p-4 rounded-xl">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">
              📚 Referencias Rápidas
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                <strong className="text-blue-300">Art. 51:</strong>
                <p className="text-gray-300 mt-1">Funciones del administrador</p>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                <strong className="text-green-300">Art. 33-41:</strong>
                <p className="text-gray-300 mt-1">Asambleas de propietarios</p>
              </div>
              <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                <strong className="text-orange-300">Art. 57:</strong>
                <p className="text-gray-300 mt-1">Régimen sancionatorio</p>
              </div>
              <div className="bg-purple-900/20 p-3 rounded border border-purple-500/30">
                <strong className="text-purple-300">Art. 52:</strong>
                <p className="text-gray-300 mt-1">Cuotas de administración</p>
              </div>
            </div>
          </div>

          {/* AI capabilities */}
          <div className="glow-card p-4 rounded-xl bg-gradient-to-b from-purple-900/20 to-blue-900/20 border border-purple-500/30">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">
              🤖 Capacidades IA
            </h3>
            <div className="space-y-2 text-sm text-purple-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Interpretación de artículos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Casos de aplicación práctica</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Procedimientos legales</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Documentación requerida</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegalModule
