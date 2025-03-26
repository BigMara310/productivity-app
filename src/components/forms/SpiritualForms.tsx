import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface FormProps {
  onClose: () => void
  onSubmit: (data: any) => void
  type: 'meditation' | 'goal' | 'quote' | 'gratitude' | 'habit'
  editingItem?: any
}

export default function SpiritualForms({ onClose, onSubmit, type, editingItem }: FormProps) {
  const [formData, setFormData] = useState<any>(
    editingItem || {
      // Champs communs
      notes: '',
      
      // Méditation
      date: new Date().toISOString().split('T')[0],
      duration: '',
      type: '',
      meditationMood: 'neutral',
      completed: false,
      
      // Citation
      text: '',
      author: '',
      category: '',
      favorite: false,
      
      // Gratitude
      entries: [''],
      gratitudeMood: 'good',
      reflection: '',
      
      // Habitude
      name: '',
      frequency: 'daily',
      streak: 0,
      totalCompletions: 0
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleGratitudeEntryChange = (index: number, value: string) => {
    const newEntries = [...formData.entries]
    newEntries[index] = value
    setFormData({ ...formData, entries: newEntries })
  }

  const addGratitudeEntry = () => {
    setFormData({ ...formData, entries: [...formData.entries, ''] })
  }

  const removeGratitudeEntry = (index: number) => {
    const newEntries = formData.entries.filter((_: any, i: number) => i !== index)
    setFormData({ ...formData, entries: newEntries })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const renderForm = () => {
    switch (type) {
      case 'meditation':
        return (
          <>
            <h3 className="text-lg font-medium text-white mb-4">
              {editingItem ? 'Modifier la méditation' : 'Nouvelle méditation'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Type de méditation
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="ex: Pleine conscience"
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Durée (minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  État d'esprit
                </label>
                <select
                  name="meditationMood"
                  value={formData.meditationMood}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="calm">Calme</option>
                  <option value="neutral">Neutre</option>
                  <option value="agitated">Agité</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </>
        )

      case 'quote':
        return (
          <>
            <h3 className="text-lg font-medium text-white mb-4">
              {editingItem ? 'Modifier la citation' : 'Nouvelle citation'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Citation
                </label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Auteur
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Catégorie
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="ex: Bonheur, Sagesse, etc."
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
          </>
        )

      case 'gratitude':
        return (
          <>
            <h3 className="text-lg font-medium text-white mb-4">
              {editingItem ? 'Modifier l\'entrée de gratitude' : 'Nouvelle entrée de gratitude'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Pour quoi êtes-vous reconnaissant aujourd'hui ?
                </label>
                <div className="space-y-2">
                  {formData.entries.map((entry: string, index: number) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={entry}
                        onChange={(e) => handleGratitudeEntryChange(index, e.target.value)}
                        className="flex-1 bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeGratitudeEntry(index)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addGratitudeEntry}
                  className="mt-2 text-sm text-green-400 hover:text-green-300"
                >
                  + Ajouter une entrée
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Humeur
                </label>
                <select
                  name="gratitudeMood"
                  value={formData.gratitudeMood}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="great">Excellente</option>
                  <option value="good">Bonne</option>
                  <option value="neutral">Neutre</option>
                  <option value="bad">Mauvaise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Réflexion
                </label>
                <textarea
                  name="reflection"
                  value={formData.reflection}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Une réflexion sur votre journée..."
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </>
        )

      case 'habit':
        return (
          <>
            <h3 className="text-lg font-medium text-white mb-4">
              {editingItem ? 'Modifier l\'habitude' : 'Nouvelle habitude'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nom de l'habitude
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Fréquence
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Quotidienne</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Détails ou objectifs spécifiques..."
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-300"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
      
      {renderForm()}
      
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
        >
          Annuler
        </button>
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg text-white ${
            type === 'meditation'
              ? 'bg-purple-500 hover:bg-purple-600'
              : type === 'quote'
              ? 'bg-pink-500 hover:bg-pink-600'
              : type === 'gratitude'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {editingItem ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  )
} 