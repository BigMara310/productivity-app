import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  SunIcon,
} from '@heroicons/react/24/outline'

interface DashboardLayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Tableau de bord', href: '/', icon: HomeIcon },
  { name: 'Physique', href: '/physical', icon: UserGroupIcon },
  { name: 'Intellectuel', href: '/intellectual', icon: AcademicCapIcon },
  { name: 'Financier', href: '/financial', icon: CurrencyDollarIcon },
  { name: 'Spirituel', href: '/spiritual', icon: SparklesIcon },
]

const quotes = [
  "La discipline est le pont entre les objectifs et l'accomplissement.",
  "Les habitudes que tu formes aujourd'hui déterminent ton avenir.",
  "Le succès est une conséquence de l'effort quotidien.",
  "Chaque petit progrès compte dans la grande histoire de ta réussite.",
  "La constance dans l'effort mène à l'excellence."
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div className="flex min-h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/30">
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700/30 bg-gray-800/70">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Croissance Totale
          </h1>
          <button className="p-2 rounded-lg bg-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
            <SunIcon className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg mb-2 transition-all duration-300 hover:scale-102 ${
                  isActive
                    ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg shadow-black/20'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? 'text-indigo-400' : 'text-gray-400 group-hover:text-gray-300'
                  }`}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
          <p className="text-sm text-gray-400 italic hover:text-gray-300 transition-colors duration-300">"{randomQuote}"</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/30 shadow-lg">
          <div className="h-full flex items-center justify-between px-6">
            <div className="flex items-center">
              <h2 className="text-lg font-medium text-white flex items-center">
                {(() => {
                  const currentRoute = navigation.find(item => item.href === location.pathname)
                  if (currentRoute?.icon) {
                    const Icon = currentRoute.icon
                    return <Icon className="h-6 w-6 mr-2 text-indigo-400 animate-pulse" />
                  }
                  return null
                })()}
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {navigation.find(item => item.href === location.pathname)?.name}
                </span>
              </h2>
            </div>
            <button className="rounded-full bg-gray-700/50 p-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
              <span className="sr-only">Notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-transparent">
          <div className="p-6 max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 