import { useState } from 'react'
import { 
  CheckCircleIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon,
  HeartIcon,
  StarIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import SpiritualForms from '../components/forms/SpiritualForms'

interface MeditationSession {
  id: number
  date: string
  duration: number
  type: string
  notes: string
  meditationMood: 'calm' | 'neutral' | 'agitated'
  completed: boolean
}

interface PersonalGoal {
  id: number
  name: string
  category: string
  progress: number
  deadline?: string
  notes: string
  completed: boolean
}

interface Quote {
  id: number
  text: string
  author: string
  category: string
  favorite: boolean
  dateAdded: string
}

interface GratitudeEntry {
  id: number
  date: string
  entries: string[]
  gratitudeMood: 'great' | 'good' | 'neutral' | 'bad'
  reflection?: string
}

interface Habit {
  id: number
  name: string
  frequency: 'daily' | 'weekly' | 'monthly'
  streak: number
  totalCompletions: number
  lastCompleted?: string
  notes?: string
}

const initialMeditations: MeditationSession[] = [
  {
    id: 1,
    date: '2024-03-15',
    duration: 20,
    type: 'Pleine conscience',
    notes: 'Focus sur la respiration',
    meditationMood: 'calm',
    completed: true
  }
]

const initialGoals: PersonalGoal[] = [
  {
    id: 1,
    name: 'Développer la patience',
    category: 'Développement personnel',
    progress: 60,
    deadline: '2024-06-30',
    notes: 'Pratiquer la méditation quotidienne',
    completed: false
  }
]

const initialQuotes: Quote[] = [
  {
    id: 1,
    text: 'Le bonheur n\'est pas quelque chose de prêt à l\'emploi. Il découle de vos propres actions.',
    author: 'Dalai Lama',
    category: 'Bonheur',
    favorite: true,
    dateAdded: '2024-03-01'
  }
]

const initialGratitude: GratitudeEntry[] = [
  {
    id: 1,
    date: '2024-03-15',
    entries: [
      'Une belle journée ensoleillée',
      'Un moment agréable avec la famille',
      'Un bon repas partagé'
    ],
    gratitudeMood: 'great',
    reflection: 'Journée remplie de moments précieux'
  }
]

const initialHabits: Habit[] = [
  {
    id: 1,
    name: 'Méditation matinale',
    frequency: 'daily',
    streak: 5,
    totalCompletions: 15,
    lastCompleted: '2024-03-15',
    notes: '10 minutes minimum'
  }
]

export default function Spiritual() {
  const [meditations, setMeditations] = useState(initialMeditations)
  const [goals, setGoals] = useState(initialGoals)
  const [quotes, setQuotes] = useState(initialQuotes)
  const [gratitude, setGratitude] = useState(initialGratitude)
  const [habits, setHabits] = useState(initialHabits)
  const [showForm, setShowForm] = useState<'meditation' | 'goal' | 'quote' | 'gratitude' | 'habit' | null>(null)
  const [editingItem, setEditingItem] = useState<any>(null)

  // Handlers pour les méditations
  const handleMeditationAdd = (meditation: MeditationSession) => {
    setMeditations([...meditations, { ...meditation, id: meditations.length + 1 }])
    setShowForm(null)
  }

  const handleMeditationEdit = (meditation: MeditationSession) => {
    setMeditations(meditations.map(m => m.id === meditation.id ? meditation : m))
    setEditingItem(null)
    setShowForm(null)
  }

  const handleMeditationDelete = (id: number) => {
    setMeditations(meditations.filter(m => m.id !== id))
  }

  const handleMeditationComplete = (id: number) => {
    setMeditations(meditations.map(m =>
      m.id === id ? { ...m, completed: !m.completed } : m
    ))
  }

  // Handlers pour les objectifs
  const handleGoalAdd = (goal: PersonalGoal) => {
    setGoals([...goals, { ...goal, id: goals.length + 1 }])
    setShowForm(null)
  }

  const handleGoalEdit = (goal: PersonalGoal) => {
    setGoals(goals.map(g => g.id === goal.id ? goal : g))
    setEditingItem(null)
    setShowForm(null)
  }

  const handleGoalDelete = (id: number) => {
    setGoals(goals.filter(g => g.id !== id))
  }

  // Handlers pour les citations
  const handleQuoteAdd = (quote: Quote) => {
    setQuotes([...quotes, { ...quote, id: quotes.length + 1 }])
    setShowForm(null)
  }

  const handleQuoteEdit = (quote: Quote) => {
    setQuotes(quotes.map(q => q.id === quote.id ? quote : q))
    setEditingItem(null)
    setShowForm(null)
  }

  const handleQuoteDelete = (id: number) => {
    setQuotes(quotes.filter(q => q.id !== id))
  }

  const handleQuoteFavorite = (id: number) => {
    setQuotes(quotes.map(q =>
      q.id === id ? { ...q, favorite: !q.favorite } : q
    ))
  }

  // Handlers pour la gratitude
  const handleGratitudeAdd = (entry: GratitudeEntry) => {
    setGratitude([...gratitude, { ...entry, id: gratitude.length + 1 }])
    setShowForm(null)
  }

  const handleGratitudeEdit = (entry: GratitudeEntry) => {
    setGratitude(gratitude.map(g => g.id === entry.id ? entry : g))
    setEditingItem(null)
    setShowForm(null)
  }

  const handleGratitudeDelete = (id: number) => {
    setGratitude(gratitude.filter(g => g.id !== id))
  }

  // Handlers pour les habitudes
  const handleHabitAdd = (habit: Habit) => {
    setHabits([...habits, { ...habit, id: habits.length + 1 }])
    setShowForm(null)
  }

  const handleHabitEdit = (habit: Habit) => {
    setHabits(habits.map(h => h.id === habit.id ? habit : h))
    setEditingItem(null)
    setShowForm(null)
  }

  const handleHabitDelete = (id: number) => {
    setHabits(habits.filter(h => h.id !== id))
  }

  const handleHabitComplete = (id: number) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const today = new Date().toISOString().split('T')[0]
        const lastCompleted = h.lastCompleted || '2000-01-01'
        const streak = today > lastCompleted ? h.streak + 1 : h.streak
        
        return {
          ...h,
          streak,
          totalCompletions: h.totalCompletions + 1,
          lastCompleted: today
        }
      }
      return h
    }))
  }

  const startEditing = (type: 'meditation' | 'goal' | 'quote' | 'gratitude' | 'habit', item: any) => {
    setShowForm(type)
    setEditingItem(item)
  }

  return (
    <div className="h-full grid grid-cols-12 gap-6">
      {/* En-tête et description */}
      <div className="col-span-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
          Développement Spirituel
        </h1>
        <p className="text-gray-400">
          Cultivez votre bien-être intérieur et développez votre conscience.
        </p>
      </div>

      {/* Méditations */}
      <div className="col-span-12 lg:col-span-6">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Journal de Méditation
            </h3>
            <button 
              onClick={() => {
                setEditingItem(null)
                setShowForm('meditation')
              }}
              className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg flex items-center space-x-2 hover:bg-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group"
            >
              <PlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Ajouter</span>
            </button>
          </div>
          <div className="space-y-4">
            {meditations.map((meditation) => (
              <div
                key={meditation.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleMeditationComplete(meditation.id)}
                        className="focus:outline-none"
                      >
                        {meditation.completed ? (
                          <CheckCircleIcon className="h-6 w-6 text-purple-500 animate-pulse" />
                        ) : (
                          <div className="h-6 w-6 rounded-full border-2 border-gray-400 group-hover:border-gray-300 transition-colors duration-300" />
                        )}
                      </button>
                      <div>
                        <h4 className="text-white font-medium">{meditation.type}</h4>
                        <p className="text-sm text-gray-400">
                          {meditation.duration} minutes
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing('meditation', meditation)}
                        className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleMeditationDelete(meditation.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{new Date(meditation.date).toLocaleDateString()}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        meditation.meditationMood === 'calm' 
                          ? 'bg-green-500/20 text-green-400'
                          : meditation.meditationMood === 'neutral'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {meditation.meditationMood}
                      </span>
                    </div>
                    {meditation.notes && (
                      <p className="mt-2 text-sm text-gray-400">{meditation.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Citations inspirantes */}
      <div className="col-span-12 lg:col-span-6">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Citations Inspirantes
            </h3>
            <button 
              onClick={() => {
                setEditingItem(null)
                setShowForm('quote')
              }}
              className="px-4 py-2 bg-pink-500/20 text-pink-400 rounded-lg flex items-center space-x-2 hover:bg-pink-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 group"
            >
              <PlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Ajouter</span>
            </button>
          </div>
          <div className="space-y-4">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-600/50 text-gray-300">
                      {quote.category}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleQuoteFavorite(quote.id)}
                        className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                      >
                        <StarIcon className={`h-4 w-4 ${
                          quote.favorite ? 'text-yellow-400' : 'text-gray-300'
                        }`} />
                      </button>
                      <button
                        onClick={() => startEditing('quote', quote)}
                        className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleQuoteDelete(quote.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <blockquote className="mt-2">
                    <p className="text-white italic">"{quote.text}"</p>
                    <footer className="mt-1 text-sm text-gray-400">
                      — {quote.author}
                    </footer>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Journal de gratitude */}
      <div className="col-span-12 lg:col-span-6">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Journal de Gratitude
            </h3>
            <button 
              onClick={() => {
                setEditingItem(null)
                setShowForm('gratitude')
              }}
              className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg flex items-center space-x-2 hover:bg-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 group"
            >
              <PlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Ajouter</span>
            </button>
          </div>
          <div className="space-y-4">
            {gratitude.map((entry) => (
              <div
                key={entry.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        entry.gratitudeMood === 'great' 
                          ? 'bg-green-500/20 text-green-400'
                          : entry.gratitudeMood === 'good'
                          ? 'bg-blue-500/20 text-blue-400'
                          : entry.gratitudeMood === 'neutral'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {entry.gratitudeMood}
                      </span>
                      <button
                        onClick={() => startEditing('gratitude', entry)}
                        className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleGratitudeDelete(entry.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {entry.entries.map((item, index) => (
                      <li key={index} className="text-white flex items-center space-x-2">
                        <HeartIcon className="h-4 w-4 text-pink-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {entry.reflection && (
                    <p className="mt-2 text-sm text-gray-400 italic">
                      {entry.reflection}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Habitudes */}
      <div className="col-span-12 lg:col-span-6">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Habitudes
            </h3>
            <button 
              onClick={() => {
                setEditingItem(null)
                setShowForm('habit')
              }}
              className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg flex items-center space-x-2 hover:bg-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
            >
              <PlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Ajouter</span>
            </button>
          </div>
          <div className="space-y-4">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium">{habit.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>{habit.frequency}</span>
                        <span>•</span>
                        <span>{habit.totalCompletions} completions</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{habit.streak}</div>
                        <div className="text-xs text-gray-400">jours</div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleHabitComplete(habit.id)}
                          className="p-1.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-colors duration-200"
                        >
                          <CheckCircleIcon className="h-4 w-4 text-green-400" />
                        </button>
                        <button
                          onClick={() => startEditing('habit', habit)}
                          className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                        >
                          <PencilIcon className="h-4 w-4 text-gray-300" />
                        </button>
                        <button
                          onClick={() => handleHabitDelete(habit.id)}
                          className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                        >
                          <TrashIcon className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {habit.notes && (
                    <p className="mt-2 text-sm text-gray-400">{habit.notes}</p>
                  )}
                  {habit.lastCompleted && (
                    <p className="mt-2 text-xs text-gray-500">
                      Dernière completion: {new Date(habit.lastCompleted).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulaires modaux */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <SpiritualForms
              type={showForm}
              onClose={() => {
                setShowForm(null)
                setEditingItem(null)
              }}
              onSubmit={(data) => {
                switch (showForm) {
                  case 'meditation':
                    editingItem
                      ? handleMeditationEdit({ ...data, id: editingItem.id })
                      : handleMeditationAdd(data)
                    break
                  case 'quote':
                    editingItem
                      ? handleQuoteEdit({ ...data, id: editingItem.id })
                      : handleQuoteAdd({ ...data, dateAdded: new Date().toISOString().split('T')[0] })
                    break
                  case 'gratitude':
                    editingItem
                      ? handleGratitudeEdit({ ...data, id: editingItem.id })
                      : handleGratitudeAdd(data)
                    break
                  case 'habit':
                    editingItem
                      ? handleHabitEdit({ ...data, id: editingItem.id })
                      : handleHabitAdd({ ...data, streak: 0, totalCompletions: 0 })
                    break
                }
              }}
              editingItem={editingItem}
            />
          </div>
        </div>
      )}
    </div>
  )
} 