import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

ChartJS.register(ArcElement, Tooltip, Legend)

const data = {
  labels: ['Physique', 'Intellectuel', 'Financier', 'Spirituel'],
  datasets: [
    {
      data: [25, 30, 20, 25],
      backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0'],
      borderColor: ['#388E3C', '#1976D2', '#F57C00', '#7B1FA2'],
      borderWidth: 2,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#9CA3AF',
        padding: 20,
        font: {
          size: 12,
        },
      },
    },
  },
}

const stats = [
  { name: 'Progression Globale', value: '65%', color: 'bg-green-500' },
  { name: 'Tâches Complétées', value: '12/15', color: 'bg-blue-500' },
  { name: 'Objectifs Atteints', value: '3/4', color: 'bg-purple-500' },
  { name: 'Temps de Focus', value: '2h 30m', color: 'bg-orange-500' },
]

const tasks = [
  { id: 1, name: 'Méditation matinale', category: 'Spirituel', completed: true },
  { id: 2, name: 'Séance de musculation', category: 'Physique', completed: false },
  { id: 3, name: 'Lecture - 30 pages', category: 'Intellectuel', completed: true },
  { id: 4, name: 'Révision du portfolio', category: 'Financier', completed: false },
]

export default function Dashboard() {
  return (
    <div className="h-full grid grid-cols-12 gap-6">
      {/* Statistiques */}
      <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <p className="mt-2 text-3xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-full ${stat.color} bg-opacity-20 flex items-center justify-center transform transition-transform duration-300 hover:scale-110`}>
                <div className={`h-8 w-8 rounded-full ${stat.color} animate-pulse`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphique et Tâches */}
      <div className="col-span-12 lg:col-span-8">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Progression par Pilier
          </h3>
          <div className="h-[calc(100%-4rem)]">
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </div>

      {/* Liste des tâches */}
      <div className="col-span-12 lg:col-span-4">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Tâches du Jour
          </h3>
          <div className="space-y-4 overflow-y-auto h-[calc(100%-4rem)]">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-700/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/70 transition-all duration-300 border border-gray-600/30 hover:shadow-lg group"
              >
                <div className="flex items-center space-x-3">
                  {task.completed ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500 animate-pulse" />
                  ) : (
                    <div className="h-6 w-6 rounded-full border-2 border-gray-400 group-hover:border-gray-300 transition-colors duration-300" />
                  )}
                  <div>
                    <p className={`text-sm font-medium transition-all duration-300 ${
                      task.completed ? 'text-gray-400 line-through' : 'text-white group-hover:text-gray-200'
                    }`}>
                      {task.name}
                    </p>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {task.category}
                    </p>
                  </div>
                </div>
                {!task.completed && (
                  <button className="p-1 hover:bg-gray-600/50 rounded-full transition-all duration-300 hover:shadow-lg">
                    <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors duration-300" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 