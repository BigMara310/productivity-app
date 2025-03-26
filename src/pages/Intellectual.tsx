import { useState } from 'react'
import { 
  CheckCircleIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon,
  BookOpenIcon,
  AcademicCapIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import IntellectualForms from '../components/forms/IntellectualForms'

interface Reading {
  id: number
  title: string
  author: string
  progress: number
  pagesRead: number
  totalPages: number
  timeSpent: number
  notes: string
  completed: boolean
}

interface Course {
  id: number
  name: string
  progress: number
  nextSession: string
  materials: string[]
  notes: string
  completed: boolean
}

interface Flashcard {
  id: number
  question: string
  answer: string
  category: string
  lastReviewed?: string
  difficulty: 'easy' | 'medium' | 'hard'
  mastered: boolean
}

interface MindMap {
  id: number
  title: string
  topics: string[]
  connections: { from: string, to: string }[]
  lastEdited: string
}

const initialReadings: Reading[] = [
  {
    id: 1,
    title: "L'Art de la Guerre",
    author: "Sun Tzu",
    progress: 65,
    pagesRead: 130,
    totalPages: 200,
    timeSpent: 180,
    notes: "Concepts clés sur la stratégie",
    completed: false
  }
]

const initialCourses: Course[] = [
  {
    id: 1,
    name: "Intelligence Artificielle",
    progress: 45,
    nextSession: "2024-03-20",
    materials: ["Slides", "Exercices", "Projets"],
    notes: "Chapitre sur le Machine Learning",
    completed: false
  }
]

const initialFlashcards: Flashcard[] = [
  {
    id: 1,
    question: "Qu'est-ce que le Machine Learning?",
    answer: "Une branche de l'IA qui permet aux systèmes d'apprendre à partir des données",
    category: "IA",
    lastReviewed: "2024-03-15",
    difficulty: "medium",
    mastered: false
  }
]

const initialMindMaps: MindMap[] = [
  {
    id: 1,
    title: "Concepts d'IA",
    topics: ["Machine Learning", "Deep Learning", "Neural Networks"],
    connections: [
      { from: "Machine Learning", to: "Deep Learning" }
    ],
    lastEdited: "2024-03-15"
  }
]

export default function Intellectual() {
  const [readings, setReadings] = useState(initialReadings)
  const [courses, setCourses] = useState(initialCourses)
  const [flashcards, setFlashcards] = useState(initialFlashcards)
  const [mindMaps, setMindMaps] = useState(initialMindMaps)
  const [showForm, setShowForm] = useState<'reading' | 'course' | 'flashcard' | 'mindmap' | null>(null)
  const [editingItem, setEditingItem] = useState<any>(null)

  // Handlers pour les lectures
  const handleReadingAdd = (reading: Reading) => {
    setReadings([...readings, { ...reading, id: readings.length + 1 }])
    setShowForm(null)
  }

  const handleReadingEdit = (reading: Reading) => {
    setReadings(readings.map(r => r.id === reading.id ? reading : r))
    setEditingItem(null)
    setShowForm(null)
  }

  const handleReadingDelete = (id: number) => {
    setReadings(readings.filter(r => r.id !== id))
  }

  // Handlers pour les cours
  const handleCourseAdd = (course: Course) => {
    setCourses([...courses, { ...course, id: courses.length + 1 }])
    setShowForm(null)
  }

  const handleCourseEdit = (course: Course) => {
    setCourses(courses.map(c => c.id === course.id ? course : c))
    setEditingItem(null)
    setShowForm(null)
  }

  const handleCourseDelete = (id: number) => {
    setCourses(courses.filter(c => c.id !== id))
  }

  // Handlers pour les flashcards
  const handleFlashcardAdd = (flashcard: Flashcard) => {
    setFlashcards([...flashcards, { ...flashcard, id: flashcards.length + 1 }])
    setShowForm(null)
  }

  const handleFlashcardEdit = (flashcard: Flashcard) => {
    setFlashcards(flashcards.map(f => f.id === flashcard.id ? flashcard : f))
    setEditingItem(null)
    setShowForm(null)
  }

  const handleFlashcardDelete = (id: number) => {
    setFlashcards(flashcards.filter(f => f.id !== id))
  }

  // Handlers pour les mind maps
  const handleMindMapAdd = (mindMap: MindMap) => {
    setMindMaps([...mindMaps, { ...mindMap, id: mindMaps.length + 1 }])
    setShowForm(null)
  }

  const handleMindMapEdit = (mindMap: MindMap) => {
    setMindMaps(mindMaps.map(m => m.id === mindMap.id ? mindMap : m))
    setEditingItem(null)
    setShowForm(null)
  }

  const handleMindMapDelete = (id: number) => {
    setMindMaps(mindMaps.filter(m => m.id !== id))
  }

  const startEditing = (type: 'reading' | 'course' | 'flashcard' | 'mindmap', item: any) => {
    setShowForm(type)
    setEditingItem(item)
  }

  return (
    <div className="h-full grid grid-cols-12 gap-6">
      {/* En-tête et description */}
      <div className="col-span-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-2">
          Développement Intellectuel
        </h1>
        <p className="text-gray-400">
          Gérez vos lectures, cours, et outils d'apprentissage pour un développement intellectuel optimal.
        </p>
      </div>

      {/* Lectures en cours */}
      <div className="col-span-12 lg:col-span-6">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Lectures en cours
            </h3>
            <button 
              onClick={() => {
                setEditingItem(null)
                setShowForm('reading')
              }}
              className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg flex items-center space-x-2 hover:bg-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
            >
              <PlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Ajouter</span>
            </button>
          </div>
          <div className="space-y-4">
            {readings.map((reading) => (
              <div
                key={reading.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium group-hover:text-gray-200 transition-colors duration-300">
                        {reading.title}
                      </h4>
                      <p className="text-sm text-gray-400">{reading.author}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing('reading', reading)}
                        className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleReadingDelete(reading.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{reading.pagesRead} / {reading.totalPages} pages</span>
                      <span>{Math.round(reading.timeSpent / 60)}h de lecture</span>
                    </div>
                    <div className="h-2 bg-gray-600/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                        style={{ width: `${reading.progress}%` }}
                      />
                    </div>
                    {reading.notes && (
                      <p className="text-sm text-gray-400 mt-2">{reading.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cours et formations */}
      <div className="col-span-12 lg:col-span-6">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Cours et formations
            </h3>
            <button 
              onClick={() => {
                setEditingItem(null)
                setShowForm('course')
              }}
              className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg flex items-center space-x-2 hover:bg-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group"
            >
              <PlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Ajouter</span>
            </button>
          </div>
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium group-hover:text-gray-200 transition-colors duration-300">
                        {course.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        Prochaine session: {new Date(course.nextSession).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing('course', course)}
                        className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleCourseDelete(course.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Progression: {course.progress}%</span>
                      <span>{course.materials.length} ressources</span>
                    </div>
                    <div className="h-2 bg-gray-600/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    {course.notes && (
                      <p className="text-sm text-gray-400 mt-2">{course.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flashcards */}
      <div className="col-span-12 lg:col-span-6">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Flashcards
            </h3>
            <button 
              onClick={() => {
                setEditingItem(null)
                setShowForm('flashcard')
              }}
              className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg flex items-center space-x-2 hover:bg-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 group"
            >
              <PlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Ajouter</span>
            </button>
          </div>
          <div className="space-y-4">
            {flashcards.map((flashcard) => (
              <div
                key={flashcard.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        flashcard.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                        flashcard.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {flashcard.difficulty}
                      </span>
                      <span className="text-sm text-gray-400">{flashcard.category}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing('flashcard', flashcard)}
                        className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleFlashcardDelete(flashcard.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white">{flashcard.question}</p>
                    <p className="text-gray-400">{flashcard.answer}</p>
                    {flashcard.lastReviewed && (
                      <p className="text-xs text-gray-500">
                        Dernière révision: {new Date(flashcard.lastReviewed).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mind Maps */}
      <div className="col-span-12 lg:col-span-6">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Mind Maps
            </h3>
            <button 
              onClick={() => {
                setEditingItem(null)
                setShowForm('mindmap')
              }}
              className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg flex items-center space-x-2 hover:bg-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 group"
            >
              <PlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Ajouter</span>
            </button>
          </div>
          <div className="space-y-4">
            {mindMaps.map((mindMap) => (
              <div
                key={mindMap.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium group-hover:text-gray-200 transition-colors duration-300">
                      {mindMap.title}
                    </h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing('mindmap', mindMap)}
                        className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleMindMapDelete(mindMap.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {mindMap.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-600/50 rounded-full text-xs text-gray-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Dernière modification: {new Date(mindMap.lastEdited).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulaires modaux */}
      {showForm && (
        <IntellectualForms
          type={showForm}
          editingItem={editingItem}
          onClose={() => {
            setShowForm(null)
            setEditingItem(null)
          }}
          onSubmit={(data) => {
            switch (showForm) {
              case 'reading':
                if (editingItem) {
                  handleReadingEdit(data)
                } else {
                  handleReadingAdd(data)
                }
                break
              case 'course':
                if (editingItem) {
                  handleCourseEdit(data)
                } else {
                  handleCourseAdd(data)
                }
                break
              case 'flashcard':
                if (editingItem) {
                  handleFlashcardEdit(data)
                } else {
                  handleFlashcardAdd(data)
                }
                break
              case 'mindmap':
                if (editingItem) {
                  handleMindMapEdit(data)
                } else {
                  handleMindMapAdd(data)
                }
                break
            }
          }}
        />
      )}
    </div>
  )
} 