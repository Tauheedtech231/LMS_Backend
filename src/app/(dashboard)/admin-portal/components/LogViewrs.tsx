// components/LogsViewer.tsx
import React, { useState } from 'react';
import { Log } from '../types';

interface LogsViewerProps {
  logs: Log[];
}

const LogsViewer: React.FC<LogsViewerProps> = ({ logs }) => {
  const [filter, setFilter] = useState<'all' | 'info' | 'warn' | 'error'>('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'system' | 'user'>('all');

  const filteredLogs = logs.filter(log => 
    (filter === 'all' || log.level === filter) &&
    (sourceFilter === 'all' || log.source === sourceFilter)
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100';
      case 'warn':
        return 'text-yellow-700 bg-yellow-100 dark:bg-yellow-700 dark:text-yellow-100';
      case 'info':
        return 'text-blue-700 bg-blue-100 dark:bg-blue-700 dark:text-blue-100';
      default:
        return 'text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getSourceColor = (source: string) => {
    return source === 'system' 
      ? 'text-purple-700 bg-purple-100 dark:bg-purple-700 dark:text-purple-100'
      : 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100';
  };

  return (
    <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        System Logs
      </h2>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Level
          </label>
          <select
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'info' | 'warn' | 'error')}
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="warn">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Source
          </label>
          <select
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value as 'all' | 'system' | 'user')}
          >
            <option value="all">All Sources</option>
            <option value="system">System</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {filteredLogs.map(log => (
                <tr key={log.id} className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3 text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${getLevelColor(log.level)}`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${getSourceColor(log.source)}`}>
                      {log.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {log.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogsViewer;