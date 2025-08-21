import React, { useState } from 'react';
import { Transaction } from '../types';

interface FeeVerificationProps {
  transactions: Transaction[];
}

const FeeVerification: React.FC<FeeVerificationProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'failed'>('all');

  const filteredTransactions = transactions.filter(transaction => 
    filter === 'all' || transaction.status === filter
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
      case 'pending':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'failed':
        return 'bg-gradient-to-r from-red-400 to-red-600 text-white';
      default:
        return 'bg-gray-200 text-blue-700 dark:bg-gray-700 dark:text-blue-200';
    }
  };

  return (
    <div className="px-4 py-4 mb-8 bg-white rounded-2xl shadow-sm dark:bg-gray-800">
      <h2 className="mb-6 text-xl font-semibold text-blue-700 dark:text-blue-300">
        Fee Verification
      </h2>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-3">
        {['all', 'pending', 'completed', 'failed'].map(f => (
          <button
            key={f}
            className={`px-4 py-1 rounded-full text-sm font-medium shadow-sm transition-colors duration-200 ${
              filter === f
                ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-blue-700 dark:text-blue-200 hover:from-blue-400 hover:to-blue-600 hover:text-white'
            }`}
            onClick={() => setFilter(f as 'all' )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="w-full overflow-x-auto rounded-xl shadow-sm">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-blue-500 uppercase border-b dark:border-gray-700 bg-blue-50 dark:bg-gray-800 dark:text-blue-300">
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Student ID</th>
              <th className="px-4 py-2">Course ID</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id} className="text-sm text-blue-700 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-xl transition-all">
                <td className="px-4 py-2">{transaction.id}</td>
                <td className="px-4 py-2">{transaction.studentId}</td>
                <td className="px-4 py-2">{transaction.courseId}</td>
                <td className="px-4 py-2">${transaction.amount}</td>
                <td className="px-4 py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {transaction.status === 'pending' && (
                    <button className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 transition-colors shadow-sm">
                      Verify
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeVerification;
