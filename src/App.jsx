import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { TrendingUp, Shield, Brain, Network, BarChart3, Zap, Eye, Users, Leaf } from 'lucide-react'
import './App.css'

// Import assets
import trustlogiqLogo from './assets/TLlogolowqual.png'
import aiBrainCrypto from './assets/ai-brain-crypto.png'
import bestPicture from './assets/BestPicture.png'
import trustGPTIcon from './assets/TRUSTGPT.png'
import neuralNetworkBg from './assets/neural-network-bg.png'
import heroGradientBg from './assets/hero-gradient-bg.png'
import dataVisualizationBg from './assets/data-visualization-bg.png'

function App() {
  const [btcPrice, setBtcPrice] = useState(107433)
  const [ethPrice, setEthPrice] = useState(2443)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setBtcPrice(prev => prev + (Math.random() - 0.5) * 100)
      setEthPrice(prev => prev + (Math.random() - 0.5) * 10)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Security",
      description: "Uncompromising security with transparent operations and verified authenticity in every analysis."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Advanced artificial intelligence analyzes market patterns and predicts potential movements with precision."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Live market data processing with instant alerts on significant cryptocurrency movements."
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Correlation Matrix",
      description: "Understand complex relationships between different cryptocurrencies and traditional markets."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Whale Monitoring",
      description: "Track large transactions and whale movements to stay ahead of market shifts."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Charting",
      description: "Professional-grade charts with technical indicators and customizable timeframes."
    }
  ]

  const investmentCategories = [
    {
      type: "Risk Invest",
      subtitle: "Make Money",
      description: "High-potential opportunities with calculated risk assessment",
      color: "from-red-500 to-orange-500",
      textColor: "text-orange-400"
    },
    {
      type: "Calculated Invest",
      subtitle: "Earn Money",
      description: "Balanced strategies with moderate risk and steady returns",
      color: "from-yellow-500 to-green-500",
      textColor: "text-yellow-400"
    },
    {
      type: "Saved Invest",
      subtitle: "Trust Money",
      description: "Conservative approaches focused on capital preservation",
      color: "from-green-500 to-cyan-500",
      textColor: "text-green-400"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img src={trustlogiqLogo} alt="TRusTLogIQ" className="h-8 w-auto" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</a>
              <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">Features</a>
              <a href="#analytics" className="text-gray-300 hover:text-cyan-400 transition-colors">Analytics</a>
              <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">About</a>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroGradientBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${neuralNetworkBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Future of Trust
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
              in AI-Driven Analysis
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience unparalleled transparency and authenticity in cryptocurrency analysis. 
              TRusTLogIQ provides the trust anchor you need in the complex world of AI and crypto.
            </p>
            
            {/* Live Data Ticker */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-12">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-6 py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-orange-400 font-semibold">BTC</span>
                  <span className="text-white font-bold">${btcPrice.toLocaleString()}</span>
                  <span className="text-green-400 text-sm">+0.88%</span>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-6 py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-400 font-semibold">ETH</span>
                  <span className="text-white font-bold">${ethPrice.toLocaleString()}</span>
                  <span className="text-green-400 text-sm">+0.07%</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-lg px-8 py-4">
                <Zap className="w-5 h-5 mr-2" />
                Activate Platform
              </Button>
              <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 text-lg px-8 py-4">
                <Eye className="w-5 h-5 mr-2" />
                Live Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Floating AI Brain */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <img 
            src={aiBrainCrypto} 
            alt="AI Brain" 
            className="w-64 h-64 opacity-60 animate-pulse"
          />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              "stay curious stop furious - try hard contract smart"
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We help because we can't do otherwise. Our philosophy centers on respect for humans, animals, and nature, 
              providing authentic transparency in an age of AI uncertainty.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Categories */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Investment Strategies
            </h2>
            <p className="text-xl text-gray-300">
              Three distinct approaches to match your risk tolerance and financial goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {investmentCategories.map((category, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-full h-2 rounded-full bg-gradient-to-r ${category.color} mb-4`}></div>
                  <CardTitle className="text-2xl text-white group-hover:text-cyan-400 transition-colors">
                    {category.type}
                  </CardTitle>
                  <CardDescription className={`text-lg font-semibold ${category.textColor}`}>
                    {category.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-950 relative">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${dataVisualizationBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300">
              Advanced tools designed for the modern crypto analyst
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/30 backdrop-blur-sm border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TRusTGPT Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center space-y-12 lg:space-y-0 lg:space-x-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Meet TRusTGPT
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Our AI assistant provides intelligent insights, real-time analysis, and personalized recommendations 
                to help you navigate the complex cryptocurrency landscape with confidence.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  <Brain className="w-5 h-5 mr-2" />
                  Try TRusTGPT
                </Button>
                <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img 
                src={trustGPTIcon} 
                alt="TRusTGPT" 
                className="w-64 h-64 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Green Wheels Initiative */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="w-12 h-12 text-green-400 mr-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Green Wheels Initiative
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our commitment to environmental sustainability through cloud-based rainforest preservation. 
              Every analysis contributes to protecting our planet's most vital ecosystems.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-2xl p-8 border border-green-500/30">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">1,247</div>
                <div className="text-gray-300">Trees Protected</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">89.3 ha</div>
                <div className="text-gray-300">Rainforest Preserved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">2.1 tons</div>
                <div className="text-gray-300">CO₂ Offset</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={trustlogiqLogo} alt="TRusTLogIQ" className="h-8 w-auto" />
              <span className="text-gray-400">© 2025 TRusTLogIQ. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

