import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface FormProps {
  onClose: () => void
  onSubmit: (data: any) => void
  type: 'transaction' | 'budget' | 'goal' | 'investment'
  editingItem?: any
}

export default function FinancialForms({ onClose, onSubmit, type, editingItem }: FormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    
    let data: any = {}
    
    switch (type) {
      case 'transaction':
        data = {
          id: editingItem?.id || 0,
          date: formData.get('date'),
          type: formData.get('transactionType'),
          category: formData.get('category'),
          amount: parseFloat(formData.get('amount') as string) || 0,
          description: formData.get('description'),
          recurring: formData.get('recurring') === 'true',
          frequency: formData.get('frequency')
        }
        break
        
      case 'budget':
        data = {
          id: editingItem?.id || 0,
          category: formData.get('category'),
          allocated: parseFloat(formData.get('allocated') as string) || 0,
          spent: parseFloat(formData.get('spent') as string) || 0,
          period: formData.get('period'),
          notes: formData.get('notes')
        }
        break
        
      case 'goal':
        data = {
          id: editingItem?.id || 0,
          name: formData.get('name'),
          targetAmount: parseFloat(formData.get('targetAmount') as string) || 0,
          currentAmount: parseFloat(formData.get('currentAmount') as string) || 0,
          deadline: formData.get('deadline'),
          priority: formData.get('priority'),
          notes: formData.get('notes')
        }
        break
        
      case 'investment':
        data = {
          id: editingItem?.id || 0,
          name: formData.get('name'),
          type: formData.get('investmentType'),
          amount: parseFloat(formData.get('amount') as string) || 0,
          currentValue: parseFloat(formData.get('currentValue') as string) || 0,
          purchaseDate: formData.get('purchaseDate'),
          notes: formData.get('notes')
        }
        break
    }
    
    onSubmit(data)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white">
            {editingItem ? 'Modifier' : 'Ajouter'} {
              type === 'transaction' ? 'une transaction' :
              type === 'budget' ? 'un budget' :
              type === 'goal' ? 'un objectif' :
              'un investissement'
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
          {type === 'transaction' && (
            <>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  defaultValue={editingItem?.date}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="transactionType" className="block text-sm font-medium text-gray-300 mb-1">
                  Type
                </label>
                <select
                  name="transactionType"
                  id="transactionType"
                  required
                  defaultValue={editingItem?.type || 'expense'}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="income">Revenu</option>
                  <option value="expense">Dépense</option>
                </select>
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
                  placeholder="Ex: Alimentation"
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
                  Montant
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  required
                  step="0.01"
                  min="0"
                  defaultValue={editingItem?.amount}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
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
                  defaultValue={editingItem?.description}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Description de la transaction"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="recurring"
                  id="recurring"
                  value="true"
                  defaultChecked={editingItem?.recurring}
                  className="h-4 w-4 rounded border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-gray-700/50"
                />
                <label htmlFor="recurring" className="text-sm font-medium text-gray-300">
                  Transaction récurrente
                </label>
              </div>
              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-300 mb-1">
                  Fréquence
                </label>
                <select
                  name="frequency"
                  id="frequency"
                  defaultValue={editingItem?.frequency || 'monthly'}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="daily">Quotidienne</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                  <option value="yearly">Annuelle</option>
                </select>
              </div>
            </>
          )}

          {type === 'budget' && (
            <>
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
                  placeholder="Ex: Alimentation"
                />
              </div>
              <div>
                <label htmlFor="allocated" className="block text-sm font-medium text-gray-300 mb-1">
                  Montant alloué
                </label>
                <input
                  type="number"
                  name="allocated"
                  id="allocated"
                  required
                  step="0.01"
                  min="0"
                  defaultValue={editingItem?.allocated}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="spent" className="block text-sm font-medium text-gray-300 mb-1">
                  Montant dépensé
                </label>
                <input
                  type="number"
                  name="spent"
                  id="spent"
                  required
                  step="0.01"
                  min="0"
                  defaultValue={editingItem?.spent}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="period" className="block text-sm font-medium text-gray-300 mb-1">
                  Période
                </label>
                <select
                  name="period"
                  id="period"
                  required
                  defaultValue={editingItem?.period || 'monthly'}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="monthly">Mensuel</option>
                  <option value="yearly">Annuel</option>
                </select>
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
                  placeholder="Notes sur le budget..."
                />
              </div>
            </>
          )}

          {type === 'goal' && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Nom de l'objectif
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  defaultValue={editingItem?.name}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ex: Épargne d'urgence"
                />
              </div>
              <div>
                <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-300 mb-1">
                  Montant cible
                </label>
                <input
                  type="number"
                  name="targetAmount"
                  id="targetAmount"
                  required
                  step="0.01"
                  min="0"
                  defaultValue={editingItem?.targetAmount}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="currentAmount" className="block text-sm font-medium text-gray-300 mb-1">
                  Montant actuel
                </label>
                <input
                  type="number"
                  name="currentAmount"
                  id="currentAmount"
                  required
                  step="0.01"
                  min="0"
                  defaultValue={editingItem?.currentAmount}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-1">
                  Date limite
                </label>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  required
                  defaultValue={editingItem?.deadline}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">
                  Priorité
                </label>
                <select
                  name="priority"
                  id="priority"
                  required
                  defaultValue={editingItem?.priority || 'medium'}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">Basse</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                </select>
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
                  placeholder="Notes sur l'objectif..."
                />
              </div>
            </>
          )}

          {type === 'investment' && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Nom de l'investissement
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  defaultValue={editingItem?.name}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ex: ETF World"
                />
              </div>
              <div>
                <label htmlFor="investmentType" className="block text-sm font-medium text-gray-300 mb-1">
                  Type d'investissement
                </label>
                <select
                  name="investmentType"
                  id="investmentType"
                  required
                  defaultValue={editingItem?.type || 'stock'}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="stock">Actions</option>
                  <option value="crypto">Crypto-monnaies</option>
                  <option value="real_estate">Immobilier</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
                  Montant investi
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  required
                  step="0.01"
                  min="0"
                  defaultValue={editingItem?.amount}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="currentValue" className="block text-sm font-medium text-gray-300 mb-1">
                  Valeur actuelle
                </label>
                <input
                  type="number"
                  name="currentValue"
                  id="currentValue"
                  required
                  step="0.01"
                  min="0"
                  defaultValue={editingItem?.currentValue}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-300 mb-1">
                  Date d'achat
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  id="purchaseDate"
                  required
                  defaultValue={editingItem?.purchaseDate}
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
                  defaultValue={editingItem?.notes}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Notes sur l'investissement..."
                />
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