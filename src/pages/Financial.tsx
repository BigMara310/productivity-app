import { useState } from 'react'
import { 
  CheckCircleIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  WalletIcon
} from '@heroicons/react/24/outline'
import FinancialForms from '../components/forms/FinancialForms'

interface Transaction {
  id: number
  date: string
  type: 'income' | 'expense'
  category: string
  amount: number
  description: string
  recurring: boolean
  frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

interface Budget {
  id: number
  category: string
  allocated: number
  spent: number
  period: 'monthly' | 'yearly'
  notes?: string
}

interface FinancialGoal {
  id: number
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  priority: 'low' | 'medium' | 'high'
  notes?: string
}

interface Investment {
  id: number
  name: string
  type: 'stock' | 'crypto' | 'real_estate' | 'other'
  amount: number
  currentValue: number
  purchaseDate: string
  notes?: string
}

const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: '2024-03-15',
    type: 'income',
    category: 'Salaire',
    amount: 3000,
    description: 'Salaire mensuel',
    recurring: true,
    frequency: 'monthly'
  },
  {
    id: 2,
    date: '2024-03-16',
    type: 'expense',
    category: 'Alimentation',
    amount: 150,
    description: 'Courses hebdomadaires',
    recurring: true,
    frequency: 'weekly'
  }
]

const initialBudgets: Budget[] = [
  {
    id: 1,
    category: 'Alimentation',
    allocated: 500,
    spent: 350,
    period: 'monthly',
    notes: 'Budget courses et restaurants'
  },
  {
    id: 2,
    category: 'Transport',
    allocated: 200,
    spent: 180,
    period: 'monthly',
    notes: 'Essence et transports en commun'
  }
]

const initialGoals: FinancialGoal[] = [
  {
    id: 1,
    name: 'Épargne d\'urgence',
    targetAmount: 10000,
    currentAmount: 5000,
    deadline: '2024-12-31',
    priority: 'high',
    notes: 'Fond de sécurité 6 mois'
  },
  {
    id: 2,
    name: 'Vacances',
    targetAmount: 3000,
    currentAmount: 1500,
    deadline: '2024-08-01',
    priority: 'medium',
    notes: 'Voyage prévu en août'
  }
]

const initialInvestments: Investment[] = [
  {
    id: 1,
    name: 'ETF World',
    type: 'stock',
    amount: 5000,
    currentValue: 5500,
    purchaseDate: '2024-01-15',
    notes: 'Investissement long terme'
  },
  {
    id: 2,
    name: 'Bitcoin',
    type: 'crypto',
    amount: 1000,
    currentValue: 1200,
    purchaseDate: '2024-02-01',
    notes: 'Investissement spéculatif'
  }
]

export default function Financial() {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [budgets, setBudgets] = useState(initialBudgets)
  const [goals, setGoals] = useState(initialGoals)
  const [investments, setInvestments] = useState(initialInvestments)
  const [showForm, setShowForm] = useState<'transaction' | 'budget' | 'goal' | 'investment' | null>(null)
  const [editingItem, setEditingItem] = useState<any>(null)

  // Handlers pour les transactions
  const handleTransactionAdd = (transaction: Transaction) => {
    setTransactions([...transactions, { ...transaction, id: transactions.length + 1 }])
    setShowForm(null)
  }

  const handleTransactionEdit = (transaction: Transaction) => {
    setTransactions(transactions.map(t => t.id === transaction.id ? transaction : t))
    setEditingItem(null)
    setShowForm(null)
  }

  const handleTransactionDelete = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  // Handlers pour les budgets
  const handleBudgetAdd = (budget: Budget) => {
    setBudgets([...budgets, { ...budget, id: budgets.length + 1 }])
    setShowForm(null)
  }

  const handleBudgetEdit = (budget: Budget) => {
    setBudgets(budgets.map(b => b.id === budget.id ? budget : b))
    setEditingItem(null)
    setShowForm(null)
  }

  const handleBudgetDelete = (id: number) => {
    setBudgets(budgets.filter(b => b.id !== id))
  }

  // Handlers pour les objectifs
  const handleGoalAdd = (goal: FinancialGoal) => {
    setGoals([...goals, { ...goal, id: goals.length + 1 }])
    setShowForm(null)
  }

  const handleGoalEdit = (goal: FinancialGoal) => {
    setGoals(goals.map(g => g.id === goal.id ? goal : g))
    setEditingItem(null)
    setShowForm(null)
  }

  const handleGoalDelete = (id: number) => {
    setGoals(goals.filter(g => g.id !== id))
  }

  // Handlers pour les investissements
  const handleInvestmentAdd = (investment: Investment) => {
    setInvestments([...investments, { ...investment, id: investments.length + 1 }])
    setShowForm(null)
  }

  const handleInvestmentEdit = (investment: Investment) => {
    setInvestments(investments.map(i => i.id === investment.id ? investment : i))
    setEditingItem(null)
    setShowForm(null)
  }

  const handleInvestmentDelete = (id: number) => {
    setInvestments(investments.filter(i => i.id !== id))
  }

  const startEditing = (type: 'transaction' | 'budget' | 'goal' | 'investment', item: any) => {
    setShowForm(type)
    setEditingItem(item)
  }

  // Calcul des statistiques
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalBudget = budgets.reduce((sum, b) => sum + b.allocated, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)

  const totalInvestments = investments.reduce((sum, i) => sum + i.amount, 0)
  const currentInvestmentValue = investments.reduce((sum, i) => sum + i.currentValue, 0)
  const investmentGain = currentInvestmentValue - totalInvestments

  return (
    <div className="h-full grid grid-cols-12 gap-6">
      {/* En-tête et description */}
      <div className="col-span-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
          Gestion Financière
        </h1>
        <p className="text-gray-400">
          Suivez vos finances, gérez votre budget et atteignez vos objectifs financiers.
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Solde</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {(totalIncome - totalExpenses).toLocaleString()}€
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Budget restant</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {(totalBudget - totalSpent).toLocaleString()}€
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <WalletIcon className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Investissements</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {currentInvestmentValue.toLocaleString()}€
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <ChartBarIcon className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Plus-value</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {investmentGain.toLocaleString()}€
              </p>
            </div>
            <div className={`h-12 w-12 rounded-full ${
              investmentGain >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
            } flex items-center justify-center`}>
              <ChartBarIcon className={`h-6 w-6 ${
                investmentGain >= 0 ? 'text-green-500' : 'text-red-500'
              }`} />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions récentes */}
      <div className="col-span-12 lg:col-span-6">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Transactions récentes
            </h3>
            <button 
              onClick={() => {
                setEditingItem(null)
                setShowForm('transaction')
              }}
              className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg flex items-center space-x-2 hover:bg-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 group"
            >
              <PlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Ajouter</span>
            </button>
          </div>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.type === 'income' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {transaction.type === 'income' ? 'Revenu' : 'Dépense'}
                        </span>
                        <span className="text-sm text-gray-400">{transaction.category}</span>
                      </div>
                      <p className="text-white mt-1">{transaction.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`text-lg font-medium ${
                        transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {transaction.amount.toLocaleString()}€
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditing('transaction', transaction)}
                          className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                        >
                          <PencilIcon className="h-4 w-4 text-gray-300" />
                        </button>
                        <button
                          onClick={() => handleTransactionDelete(transaction.id)}
                          className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                        >
                          <TrashIcon className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-400">
                    <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    {transaction.recurring && (
                      <span className="flex items-center space-x-1">
                        <CheckCircleIcon className="h-4 w-4 text-blue-400" />
                        <span>Récurrent ({transaction.frequency})</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budgets */}
      <div className="col-span-12 lg:col-span-6">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Budgets
            </h3>
            <button 
              onClick={() => {
                setEditingItem(null)
                setShowForm('budget')
              }}
              className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg flex items-center space-x-2 hover:bg-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
            >
              <PlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Ajouter</span>
            </button>
          </div>
          <div className="space-y-4">
            {budgets.map((budget) => (
              <div
                key={budget.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium">{budget.category}</h4>
                      <p className="text-sm text-gray-400">{budget.period}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing('budget', budget)}
                        className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleBudgetDelete(budget.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {budget.spent.toLocaleString()}€ / {budget.allocated.toLocaleString()}€
                      </span>
                      <span className="text-gray-400">
                        {Math.round((budget.spent / budget.allocated) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-600/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          (budget.spent / budget.allocated) > 1
                            ? 'bg-gradient-to-r from-red-500 to-red-400'
                            : (budget.spent / budget.allocated) > 0.8
                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                            : 'bg-gradient-to-r from-blue-500 to-blue-400'
                        }`}
                        style={{ width: `${Math.min((budget.spent / budget.allocated) * 100, 100)}%` }}
                      />
                    </div>
                    {budget.notes && (
                      <p className="text-sm text-gray-400">{budget.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Objectifs financiers */}
      <div className="col-span-12 lg:col-span-6">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Objectifs financiers
            </h3>
            <button 
              onClick={() => {
                setEditingItem(null)
                setShowForm('goal')
              }}
              className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg flex items-center space-x-2 hover:bg-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group"
            >
              <PlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Ajouter</span>
            </button>
          </div>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-white font-medium">{goal.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          goal.priority === 'high' 
                            ? 'bg-red-500/20 text-red-400'
                            : goal.priority === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {goal.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Échéance: {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing('goal', goal)}
                        className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleGoalDelete(goal.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {goal.currentAmount.toLocaleString()}€ / {goal.targetAmount.toLocaleString()}€
                      </span>
                      <span className="text-gray-400">
                        {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-600/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                        style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
                      />
                    </div>
                    {goal.notes && (
                      <p className="text-sm text-gray-400">{goal.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investissements */}
      <div className="col-span-12 lg:col-span-6">
        <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Investissements
            </h3>
            <button 
              onClick={() => {
                setEditingItem(null)
                setShowForm('investment')
              }}
              className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg flex items-center space-x-2 hover:bg-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 group"
            >
              <PlusIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Ajouter</span>
            </button>
          </div>
          <div className="space-y-4">
            {investments.map((investment) => (
              <div
                key={investment.id}
                className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-white font-medium">{investment.name}</h4>
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-600/50 text-gray-300">
                          {investment.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Acheté le {new Date(investment.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing('investment', investment)}
                        className="p-1.5 rounded-lg bg-gray-600/50 hover:bg-gray-600 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleInvestmentDelete(investment.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                      >
                        <TrashIcon className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        Investi: {investment.amount.toLocaleString()}€
                      </span>
                      <span className="text-gray-400">
                        Actuel: {investment.currentValue.toLocaleString()}€
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        Gain/Perte:
                      </span>
                      <span className={
                        investment.currentValue > investment.amount
                          ? 'text-green-400'
                          : investment.currentValue < investment.amount
                          ? 'text-red-400'
                          : 'text-gray-400'
                      }>
                        {(investment.currentValue - investment.amount).toLocaleString()}€
                        ({Math.round(((investment.currentValue - investment.amount) / investment.amount) * 100)}%)
                      </span>
                    </div>
                    {investment.notes && (
                      <p className="text-sm text-gray-400">{investment.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulaires modaux */}
      {showForm && (
        <FinancialForms
          type={showForm}
          editingItem={editingItem}
          onClose={() => {
            setShowForm(null)
            setEditingItem(null)
          }}
          onSubmit={(data) => {
            switch (showForm) {
              case 'transaction':
                if (editingItem) {
                  handleTransactionEdit(data)
                } else {
                  handleTransactionAdd(data)
                }
                break
              case 'budget':
                if (editingItem) {
                  handleBudgetEdit(data)
                } else {
                  handleBudgetAdd(data)
                }
                break
              case 'goal':
                if (editingItem) {
                  handleGoalEdit(data)
                } else {
                  handleGoalAdd(data)
                }
                break
              case 'investment':
                if (editingItem) {
                  handleInvestmentEdit(data)
                } else {
                  handleInvestmentAdd(data)
                }
                break
            }
          }}
        />
      )}
    </div>
  )
} 