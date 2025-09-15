import React from 'react';
import { Chatbot } from './components/Chatbot';
import { MessageCircle, Brain, Zap, Shield } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FAQ Chatbot</h1>
              <p className="text-gray-600">Intelligent question answering system</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Features */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How it works</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Intelligent Matching</h3>
                    <p className="text-sm text-gray-600 mt-1">Uses advanced algorithms to understand your questions and find the best answers.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Instant Responses</h3>
                    <p className="text-sm text-gray-600 mt-1">Get immediate answers to your questions without waiting for human support.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Always Available</h3>
                    <p className="text-sm text-gray-600 mt-1">24/7 availability means you can get help whenever you need it.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Topics</h2>
              <div className="space-y-2">
                {[
                  'Business Hours & Contact',
                  'Shipping & Delivery',
                  'Returns & Exchanges',
                  'Payment Methods',
                  'Account Management',
                  'Security & Privacy'
                ].map((topic, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chatbot */}
          <div className="lg:col-span-2">
            <Chatbot />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>FAQ Chatbot - Powered by intelligent question matching and natural language processing</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;