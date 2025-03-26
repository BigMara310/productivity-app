import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface FormProps {
  onClose: () => void
  onSubmit: (data: any) => void
  type: 'reading' | 'course' | 'flashcard' | 'mindmap'
  editingItem?: any
}

export default function IntellectualForms({ onClose, onSubmit, type, editingItem }: FormProps) {
  const [topics, setTopics] = useState<string[]>(editingItem?.topics || [])
  const [newTopic, setNewTopic] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    
    let data: any = {}
    
    switch (type) {
      case 'reading':
        data = {
          id: editingItem?.id || 0,
          title: formData.get('title'),
          author: formData.get('author'),
          progress: parseInt(formData.get('progress') as string) || 0,
          pagesRead: parseInt(formData.get('pagesRead') as string) || 0,
          totalPages: parseInt(formData.get('totalPages') as string) || 0,
          timeSpent: parseInt(formData.get('timeSpent') as string) || 0,
          notes: formData.get('notes'),
          completed: editingItem?.completed || false
        }
        break
        
      case 'course':
        data = {
          id: editingItem?.id || 0,
          name: formData.get('name'),
          progress: parseInt(formData.get('progress') as string) || 0,
          nextSession: formData.get('nextSession'),
          materials: (formData.get('materials') as string).split(',').map(m => m.trim()),
          notes: formData.get('notes'),
          completed: editingItem?.completed || false
        }
        break
        
      case 'flashcard':
        data = {
          id: editingItem?.id || 0,
          question: formData.get('question'),
          answer: formData.get('answer'),
          category: formData.get('category'),
          difficulty: formData.get('difficulty'),
          lastReviewed: new Date().toISOString(),
          mastered: editingItem?.mastered || false
        }
        break
        
      case 'mindmap':
        data = {
          id: editingItem?.id || 0,
          title: formData.get('title'),
          topics,
          connections: editingItem?.connections || [],
          lastEdited: new Date().toISOString()
        }
        break
    }
    
    onSubmit(data)
  }

  const addTopic = () => {
    if (newTopic.trim()) {
      setTopics([...topics, newTopic.trim()])
      setNewTopic('')
    }
  }

  const removeTopic = (index: number) => {
    setTopics(topics.filter((_, i) => i !== index))
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white">
            {editingItem ? 'Modifier' : 'Ajouter'} {
              type === 'reading' ? 'une lecture' :
              type === 'course' ? 'un cours' :
              type === 'flashcard' ? 'une flashcard' :
              'une mind map'
            }
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors duration-200"
          >
            <XMarkIcon className="h-5 w-5 text-gray-300" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'reading' && (
            <>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  defaultValue={editingItem?.title}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Titre du livre"
                />
              </div>
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-1">
                  Auteur
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  required
                  defaultValue={editingItem?.author}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Nom de l'auteur"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pagesRead" className="block text-sm font-medium text-gray-300 mb-1">
                    Pages lues
                  </label>
                  <input
                    type="number"
                    name="pagesRead"
                    id="pagesRead"
                    required
                    defaultValue={editingItem?.pagesRead}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label htmlFor="totalPages" className="block text-sm font-medium text-gray-300 mb-1">
                    Total des pages
                  </label>
                  <input
                    type="number"
                    name="totalPages"
                    id="totalPages"
                    required
                    defaultValue={editingItem?.totalPages}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="timeSpent" className="block text-sm font-medium text-gray-300 mb-1">
                  Temps de lecture (minutes)
                </label>
                <input
                  type="number"
                  name="timeSpent"
                  id="timeSpent"
                  required
                  defaultValue={editingItem?.timeSpent}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0"
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
                  defaultValue={editingItem?.notes}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Notes de lecture..."
                />
              </div>
            </>
          )}

          {type === 'course' && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Nom du cours
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  defaultValue={editingItem?.name}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Nom du cours"
                />
              </div>
              <div>
                <label htmlFor="progress" className="block text-sm font-medium text-gray-300 mb-1">
                  Progression (%)
                </label>
                <input
                  type="number"
                  name="progress"
                  id="progress"
                  required
                  min="0"
                  max="100"
                  defaultValue={editingItem?.progress}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label htmlFor="nextSession" className="block text-sm font-medium text-gray-300 mb-1">
                  Prochaine session
                </label>
                <input
                  type="date"
                  name="nextSession"
                  id="nextSession"
                  required
                  defaultValue={editingItem?.nextSession}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="materials" className="block text-sm font-medium text-gray-300 mb-1">
                  Matériel (séparés par des virgules)
                </label>
                <input
                  type="text"
                  name="materials"
                  id="materials"
                  required
                  defaultValue={editingItem?.materials?.join(', ')}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Slides, Exercices, Projets"
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
                  defaultValue={editingItem?.notes}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Notes sur le cours..."
                />
              </div>
            </>
          )}

          {type === 'flashcard' && (
            <>
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-1">
                  Question
                </label>
                <textarea
                  name="question"
                  id="question"
                  required
                  rows={2}
                  defaultValue={editingItem?.question}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Votre question..."
                />
              </div>
              <div>
                <label htmlFor="answer" className="block text-sm font-medium text-gray-300 mb-1">
                  Réponse
                </label>
                <textarea
                  name="answer"
                  id="answer"
                  required
                  rows={3}
                  defaultValue={editingItem?.answer}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Votre réponse..."
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                  Catégorie
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  required
                  defaultValue={editingItem?.category}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ex: Mathématiques"
                />
              </div>
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-1">
                  Difficulté
                </label>
                <select
                  name="difficulty"
                  id="difficulty"
                  required
                  defaultValue={editingItem?.difficulty || 'medium'}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="easy">Facile</option>
                  <option value="medium">Moyen</option>
                  <option value="hard">Difficile</option>
                </select>
              </div>
            </>
          )}

          {type === 'mindmap' && (
            <>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  defaultValue={editingItem?.title}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Titre de la mind map"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Sujets
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Nouveau sujet"
                    />
                    <button
                      type="button"
                      onClick={addTopic}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      Ajouter
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-600/50 rounded-full text-sm text-gray-300 flex items-center gap-2"
                      >
                        {topic}
                        <button
                          type="button"
                          onClick={() => removeTopic(index)}
                          className="hover:text-red-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {editingItem ? 'Modifier' : 'Ajouter'}
          </button>
        </form>
      </div>
    </div>
  )
} 