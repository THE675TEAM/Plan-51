import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import ModuleManager from './components/ModuleManager'
import AIAssistant from './components/AIAssistant'
import './App.css'

function App() {
  const [activeModule, setActiveModule] = useState('dashboard')
  const [showAI, setShowAI] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>
      
      {/* Main layout */}
      <div className="relative z-10 flex h-screen">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        
        <main className="flex-1 overflow-y-auto">
          {activeModule === 'dashboard' && <Dashboard />}
          {activeModule !== 'dashboard' && (
            <ModuleManager activeModule={activeModule} />
          )}
        </main>
        
        {/* AI Assistant Toggle */}
        <button
          onClick={() => setShowAI(!showAI)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white p-4 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-cyan-500/25"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        
        {/* AI Assistant Panel */}
        {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
      </div>
    </div>
  )
}

export default App
