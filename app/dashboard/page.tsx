'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Transaction {
  id: number;
  title: string;
  category: string;
  amount: number;
  status: string;
  date: string;
}

interface Stats {
  total_balance: number;
  monthly_income: number;
  monthly_expenses: number;
  total_savings: number;
}

interface Message {
  id: number;
  message: string;
  role: string;
  created_at: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchDashboard();
    fetchMessages();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/dashboard');
      if (!res.ok) {
        router.push('/login');
        return;
      }
      const data = await res.json();
      setUser(data.user);
      setStats(data.stats);
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/chat');
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || sending) return;

    const userMessage = chatInput;
    setChatInput('');
    setSending(true);

    setMessages(prev => [...prev, {
      id: Date.now(),
      message: userMessage,
      role: 'user',
      created_at: new Date().toISOString()
    }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          message: data.response,
          role: 'assistant',
          created_at: new Date().toISOString()
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a1a1f] border-r border-[#2d2d32] flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">K</span>
            </div>
            <h1 className="text-xl font-bold text-white">Kodbank</h1>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#2d2d32] rounded-lg text-white">
              <span>📊</span>
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d32] rounded-lg text-gray-400">
              <span>📈</span>
              <span>Analytics</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d32] rounded-lg text-gray-400">
              <span>💳</span>
              <span>Cards</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d32] rounded-lg text-gray-400">
              <span>💰</span>
              <span>Assets</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d32] rounded-lg text-gray-400">
              <span>👤</span>
              <span>Profile</span>
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-2">
          <button 
            onClick={() => setChatOpen(!chatOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d32] rounded-lg text-gray-400"
          >
            <span>💬</span>
            <span>AI Chat</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d32] rounded-lg text-gray-400">
            <span>⚙️</span>
            <span>Settings</span>
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2d2d32] rounded-lg text-gray-400"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Welcome back, {user?.name?.split(' ')[0] || 'User'}</h2>
              <p className="text-gray-400 mt-1">Here's what's happening with your finance today.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-[#1a1a1f] border border-[#2d2d32] rounded-lg text-white hover:bg-[#2d2d32]">
                Check Balance
              </button>
              <button className="px-6 py-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600">
                Send Money
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#1a1a1f] border border-[#2d2d32] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#2d2d32] rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💵</span>
                </div>
                <span className="text-green-500 text-sm">↑ 12.5%</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Balance</p>
              <p className="text-white text-3xl font-bold">${stats?.total_balance.toLocaleString()}</p>
            </div>

            <div className="bg-[#1a1a1f] border border-[#2d2d32] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#2d2d32] rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <span className="text-green-500 text-sm">↑ 8.2%</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">Monthly Income</p>
              <p className="text-white text-3xl font-bold">${stats?.monthly_income.toLocaleString()}</p>
            </div>

            <div className="bg-[#1a1a1f] border border-[#2d2d32] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#2d2d32] rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📉</span>
                </div>
                <span className="text-red-500 text-sm">↓ 4.1%</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">Monthly Expenses</p>
              <p className="text-white text-3xl font-bold">${stats?.monthly_expenses.toLocaleString()}</p>
            </div>

            <div className="bg-[#1a1a1f] border border-[#2d2d32] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#2d2d32] rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <span className="text-green-500 text-sm">↑ 15.3%</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Savings</p>
              <p className="text-white text-3xl font-bold">${stats?.total_savings.toLocaleString()}</p>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-[#1a1a1f] border border-[#2d2d32] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-[#0a0a0f] rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#2d2d32] rounded-lg flex items-center justify-center">
                      <span className="text-xl">
                        {transaction.category === 'Technology' ? '💻' :
                         transaction.category === 'Food & Drink' ? '☕' :
                         transaction.category === 'Income' ? '↗️' : '📦'}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{transaction.title}</p>
                      <p className="text-gray-400 text-sm">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${transaction.amount > 0 ? 'text-green-500' : 'text-white'}`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-sm">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Panel */}
      {chatOpen && (
        <div className="w-96 bg-[#1a1a1f] border-l border-[#2d2d32] flex flex-col">
          <div className="p-4 border-b border-[#2d2d32] flex items-center justify-between">
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <p>Start a conversation with AI</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-orange-500 text-white'
                        : 'bg-[#2d2d32] text-gray-200'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))
            )}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-[#2d2d32] text-gray-200 p-3 rounded-lg">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t border-[#2d2d32]">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-[#0a0a0f] border border-[#2d2d32] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !chatInput.trim()}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
