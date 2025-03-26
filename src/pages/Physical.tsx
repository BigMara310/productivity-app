import { useState } from 'react'
import { 
  CheckCircleIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

interface Workout {
  id: number
  type: string
  description: string
  duration: string
  completed: boolean
  sets?: number
  reps?: number
  weight?: number
  notes?: string
}

interface Goal {
  id: number
  name: string
  current: number
  target: number
  unit: string
  progress: number
  deadline?: string
  notes?: string
}

interface Reminder {
  id: number
  text: string
  completed: boolean
  time?: string
  recurring?: boolean
}

const initialStats = [
  { id: 1, name: 'Progression Globale', value: '75%', color: 'bg-green-500', editable: true },
  { id: 2, name: 'Sessions Complétées', value: '3/4', color: 'bg-blue-500', editable: true },
  { id: 3, name: 'Temps d\'Entraînement', value: '45m', color: 'bg-purple-500', editable: true },
]

const initialWorkouts: Workout[] = [
  { 
    id: 1,
    type: 'Force',
    description: 'Musculation - Haut du corps',
    duration: '45 min',
    completed: true,
    sets: 4,
    reps: 12,
    weight: 60,
    notes: 'Augmenter le poids la prochaine fois'
  },
  {
    id: 2,
    type: 'Cardio',
    description: 'Course à pied',
    duration: '30 min',
    completed: false,
    notes: 'Objectif: 5km'
  },
  {
    id: 3,
    type: 'Flexibilité',
    description: 'Yoga matinal',
    duration: '20 min',
    completed: true,
    notes: 'Focus sur les étirements dorsaux'
  },
]

const initialGoals: Goal[] = [
  {
    id: 1,
    name: 'Poids',
    current: 75,
    target: 70,
    unit: 'kg',
    progress: 60,
    deadline: '2024-06-01',
    notes: 'Réduction progressive'
  },
  {
    id: 2,
    name: 'Force',
    current: 80,
    target: 100,
    unit: 'kg',
    progress: 80,
    deadline: '2024-07-15',
    notes: 'Développé couché'
  },
  {
    id: 3,
    name: 'Endurance',
    current: 25,
    target: 30,
    unit: 'min',
    progress: 83,
    deadline: '2024-05-30',
    notes: 'Course continue'
  },
]

const initialReminders: Reminder[] = [
  { id: 1, text: 'Boire 2L d\'eau', completed: true, time: '08:00', recurring: true },
  { id: 2, text: 'Étirements post-entraînement', completed: false, time: '18:00', recurring: true },
  { id: 3, text: '8h de sommeil', completed: true, time: '22:00', recurring: true },
]

export default function Physical() {
  const [stats, setStats] = useState(initialStats)
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [goals, setGoals] = useState(initialGoals)
  const [reminders, setReminders] = useState(initialReminders)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState<'workout' | 'goal' | 'reminder' | null>(null)
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null)

  const handleStatEdit = (id: number, newValue: string) => {
    setStats(stats.map(stat => 
      stat.id === id ? { ...stat, value: newValue } : stat
    ))
  }

  const handleWorkoutAdd = (workout: Workout) => {
    setWorkouts([...workouts, { ...workout, id: workouts.length + 1 }])
    setShowForm(null)
  }

  const handleWorkoutDelete = (id: number) => {
    setWorkouts(workouts.filter(w => w.id !== id))
  }

  const handleWorkoutToggle = (id: number) => {
    setWorkouts(workouts.map(w =>
      w.id === id ? { ...w, completed: !w.completed } : w
    ))
  }

  const handleWorkoutEdit = (workout: Workout) => {
    setWorkouts(workouts.map(w => w.id === workout.id ? workout : w))
    setEditingWorkout(null)
    setShowForm(null)
  }

  const handleGoalAdd = (goal: Goal) => {
    setGoals([...goals, { ...goal, id: goals.length + 1 }])
    setShowForm(null)
  }

  const handleGoalDelete = (id: number) => {
    setGoals(goals.filter(g => g.id !== id))
  }

  const handleGoalEdit = (goal: Goal) => {
    setGoals(goals.map(g => g.id === goal.id ? goal : g))
    setEditingGoal(null)
    setShowForm(null)
  }

  const handleReminderAdd = (reminder: Reminder) => {
    setReminders([...reminders, { ...reminder, id: reminders.length + 1 }])
    setShowForm(null)
  }

  const handleReminderToggle = (id: number) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, completed: !r.completed } : r
    ))
  }

  const handleReminderEdit = (reminder: Reminder) => {
    setReminders(reminders.map(r => r.id === reminder.id ? reminder : r))
    setEditingReminder(null)
    setShowForm(null)
  }

  const startEditing = (type: 'workout' | 'goal' | 'reminder', item: Workout | Goal | Reminder) => {
    setShowForm(type)
    switch (type) {
      case 'workout':
        setEditingWorkout(item as Workout)
        break
      case 'goal':
        setEditingGoal(item as Goal)
        break
      case 'reminder':
        setEditingReminder(item as Reminder)
        break
    }
  }

  return (
    <div className="h-full grid grid-cols-12 gap-6">
      {/* En-tête et description */}
      <div className="col-span-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
          Évolution Physique
        </h1>
        <p className="text-gray-400">
          Suivez votre progression physique et atteignez vos objectifs d'entraînement.
        </p>
      </div>

      {/* Statistiques */}
      <div className="col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-full">
                <p className="text-sm text-gray-400 flex items-center justify-between">
                  {stat.name}
                  {stat.editable && (
                    <PencilIcon 
                      className="h-4 w-4 text-gray-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      onClick={() => setEditingId(stat.id)}
                    />
                  )}
                </p>
                {editingId === stat.id ? (
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatEdit(stat.id, e.target.value)}
                    onBlur={() => setEditingId(null)}
                    className="mt-2 w-full bg-transparent text-3xl font-semibold text-white border-b border-gray-600 focus:outline-none focus:border-indigo-500"
                    autoFocus
                  />
                ) : (
                  <p className="mt-2 text-3xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                )}
              </div>
              <div className={`h-12 w-12 rounded-full ${stat.color} bg-opacity-20 flex items-center justify-center transform transition-transform duration-300 hover:scale-110 ml-4`}>
                <div className={`h-8 w-8 rounded-full ${stat.color} animate-pulse`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Programme d'entraînement */}
      <div className="col-span-12 lg:col-span-8">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Programme d'Entraînement
            </h3>
            <button 
              onClick={() => {
                setEditingWorkout(null)
                setShowForm('workout')
              }}
              className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg flex items-center space-x-2 hover:bg-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 group"
            >
              <PlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Ajouter</span>
            </button>
          </div>
          <div className="space-y-4">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleWorkoutToggle(workout.id)}
                      className="focus:outline-none"
                    >
                      {workout.completed ? (
                        <CheckCircleIcon className="h-6 w-6 text-green-500 animate-pulse" />
                      ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-gray-400 group-hover:border-gray-300 transition-colors duration-300" />
                      )}
                    </button>
                    <div>
                      <h4 className="text-white font-medium group-hover:text-gray-200 transition-colors duration-300">{workout.type}</h4>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{workout.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{workout.duration}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing('workout', workout)}
                        className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleWorkoutDelete(workout.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
                {selectedWorkout?.id === workout.id && (
                  <div className="p-4 border-t border-gray-600/30 bg-gray-700/30">
                    <div className="grid grid-cols-2 gap-4">
                      {workout.sets && (
                        <div>
                          <p className="text-sm text-gray-400">Séries</p>
                          <p className="text-white">{workout.sets}</p>
                        </div>
                      )}
                      {workout.reps && (
                        <div>
                          <p className="text-sm text-gray-400">Répétitions</p>
                          <p className="text-white">{workout.reps}</p>
                        </div>
                      )}
                      {workout.weight && (
                        <div>
                          <p className="text-sm text-gray-400">Poids</p>
                          <p className="text-white">{workout.weight}kg</p>
                        </div>
                      )}
                    </div>
                    {workout.notes && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-400">Notes</p>
                        <p className="text-white">{workout.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Objectifs et Rappels */}
      <div className="col-span-12 lg:col-span-4 grid grid-rows-2 gap-6">
        {/* Objectifs */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Objectifs
            </h3>
            <button 
              onClick={() => {
                setEditingGoal(null)
                setShowForm('goal')
              }}
              className="p-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors duration-200"
            >
              <PlusIcon className="h-4 w-4 text-gray-300" />
            </button>
          </div>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="group">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {goal.name}
                      </span>
                      {goal.deadline && (
                        <span className="text-xs text-gray-500">
                          (Date limite: {new Date(goal.deadline).toLocaleDateString()})
                        </span>
                      )}
                    </div>
                    {goal.notes && (
                      <p className="text-xs text-gray-500 mt-1">{goal.notes}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing('goal', goal)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-all duration-200"
                    >
                      <PencilIcon className="h-3 w-3 text-gray-300" />
                    </button>
                    <button
                      onClick={() => handleGoalDelete(goal.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-all duration-200"
                    >
                      <TrashIcon className="h-3 w-3 text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                </div>
                <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transform transition-transform duration-1000 ease-in-out group-hover:scale-x-105"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rappels */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Rappels
            </h3>
            <button 
              onClick={() => {
                setEditingReminder(null)
                setShowForm('reminder')
              }}
              className="p-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors duration-200"
            >
              <PlusIcon className="h-4 w-4 text-gray-300" />
            </button>
          </div>
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleReminderToggle(reminder.id)}
                    className="focus:outline-none"
                  >
                    {reminder.completed ? (
                      <CheckCircleIcon className="h-6 w-6 text-green-500 animate-pulse" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-gray-400 group-hover:border-gray-300 transition-colors duration-300" />
                    )}
                  </button>
                  <div>
                    <span className={`text-sm transition-all duration-300 ${
                      reminder.completed ? 'text-gray-400 line-through' : 'text-white group-hover:text-gray-200'
                    }`}>
                      {reminder.text}
                    </span>
                    {reminder.time && (
                      <p className="text-xs text-gray-500">{reminder.time}</p>
                    )}
                  </div>
                </div>
                {reminder.recurring && (
                  <span className="text-xs text-gray-500 px-2 py-1 rounded-full bg-gray-700/50">
                    Récurrent
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulaires modaux pour l'ajout/modification */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white">
                {showForm === 'workout' && (editingWorkout ? 'Modifier' : 'Ajouter') + ' un entraînement'}
                {showForm === 'goal' && (editingGoal ? 'Modifier' : 'Ajouter') + ' un objectif'}
                {showForm === 'reminder' && (editingReminder ? 'Modifier' : 'Ajouter') + ' un rappel'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(null)
                  setEditingWorkout(null)
                  setEditingGoal(null)
                  setEditingReminder(null)
                }}
                className="p-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors duration-200"
              >
                <XMarkIcon className="h-5 w-5 text-gray-300" />
              </button>
            </div>

            {showForm === 'workout' && (
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const workoutData: Workout = {
                  id: editingWorkout?.id || 0,
                  type: formData.get('type') as string,
                  description: formData.get('description') as string,
                  duration: formData.get('duration') as string,
                  completed: editingWorkout?.completed || false,
                  sets: parseInt(formData.get('sets') as string) || undefined,
                  reps: parseInt(formData.get('reps') as string) || undefined,
                  weight: parseInt(formData.get('weight') as string) || undefined,
                  notes: formData.get('notes') as string || undefined
                }
                if (editingWorkout) {
                  handleWorkoutEdit(workoutData)
                } else {
                  handleWorkoutAdd(workoutData)
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
                      Type d'entraînement
                    </label>
                    <input
                      type="text"
                      name="type"
                      id="type"
                      required
                      defaultValue={editingWorkout?.type}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Force, Cardio, Flexibilité..."
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      required
                      defaultValue={editingWorkout?.description}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Description de l'entraînement"
                    />
                  </div>
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">
                      Durée
                    </label>
                    <input
                      type="text"
                      name="duration"
                      id="duration"
                      required
                      defaultValue={editingWorkout?.duration}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="45 min"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="sets" className="block text-sm font-medium text-gray-300 mb-1">
                        Séries
                      </label>
                      <input
                        type="number"
                        name="sets"
                        id="sets"
                        defaultValue={editingWorkout?.sets}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="4"
                      />
                    </div>
                    <div>
                      <label htmlFor="reps" className="block text-sm font-medium text-gray-300 mb-1">
                        Répétitions
                      </label>
                      <input
                        type="number"
                        name="reps"
                        id="reps"
                        defaultValue={editingWorkout?.reps}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="12"
                      />
                    </div>
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-1">
                        Poids (kg)
                      </label>
                      <input
                        type="number"
                        name="weight"
                        id="weight"
                        defaultValue={editingWorkout?.weight}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="60"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      id="notes"
                      rows={3}
                      defaultValue={editingWorkout?.notes}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Notes additionnelles..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    {editingWorkout ? 'Modifier' : 'Ajouter'} l'entraînement
                  </button>
                </div>
              </form>
            )}

            {showForm === 'goal' && (
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const goalData: Goal = {
                  id: editingGoal?.id || 0,
                  name: formData.get('name') as string,
                  current: parseInt(formData.get('current') as string),
                  target: parseInt(formData.get('target') as string),
                  unit: formData.get('unit') as string,
                  progress: 0,
                  deadline: formData.get('deadline') as string || undefined,
                  notes: formData.get('notes') as string || undefined
                }
                goalData.progress = (goalData.current / goalData.target) * 100
                if (editingGoal) {
                  handleGoalEdit(goalData)
                } else {
                  handleGoalAdd(goalData)
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Nom de l'objectif
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      defaultValue={editingGoal?.name}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Poids, Force, Endurance..."
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="current" className="block text-sm font-medium text-gray-300 mb-1">
                        Valeur actuelle
                      </label>
                      <input
                        type="number"
                        name="current"
                        id="current"
                        required
                        defaultValue={editingGoal?.current}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="75"
                      />
                    </div>
                    <div>
                      <label htmlFor="target" className="block text-sm font-medium text-gray-300 mb-1">
                        Objectif
                      </label>
                      <input
                        type="number"
                        name="target"
                        id="target"
                        required
                        defaultValue={editingGoal?.target}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="70"
                      />
                    </div>
                    <div>
                      <label htmlFor="unit" className="block text-sm font-medium text-gray-300 mb-1">
                        Unité
                      </label>
                      <input
                        type="text"
                        name="unit"
                        id="unit"
                        required
                        defaultValue={editingGoal?.unit}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="kg"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-1">
                      Date limite
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      id="deadline"
                      defaultValue={editingGoal?.deadline}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      id="notes"
                      rows={3}
                      defaultValue={editingGoal?.notes}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Notes additionnelles..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    {editingGoal ? 'Modifier' : 'Ajouter'} l'objectif
                  </button>
                </div>
              </form>
            )}

            {showForm === 'reminder' && (
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const reminderData: Reminder = {
                  id: editingReminder?.id || 0,
                  text: formData.get('text') as string,
                  completed: editingReminder?.completed || false,
                  time: formData.get('time') as string || undefined,
                  recurring: formData.get('recurring') === 'true'
                }
                if (editingReminder) {
                  handleReminderEdit(reminderData)
                } else {
                  handleReminderAdd(reminderData)
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-1">
                      Rappel
                    </label>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      required
                      defaultValue={editingReminder?.text}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Boire 2L d'eau"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">
                      Heure
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      defaultValue={editingReminder?.time}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="recurring"
                      id="recurring"
                      value="true"
                      defaultChecked={editingReminder?.recurring}
                      className="h-4 w-4 rounded border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-gray-700/50"
                    />
                    <label htmlFor="recurring" className="text-sm font-medium text-gray-300">
                      Récurrent
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    {editingReminder ? 'Modifier' : 'Ajouter'} le rappel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 