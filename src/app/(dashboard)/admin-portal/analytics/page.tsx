"use client";

import { useEffect, useState } from "react";

interface LogEntry {
  timestamp: string;
  userId: string;
  role: string;
  action: string;
  resource: string;
  statusCode: number;
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch("/data/logs.json");
        const data: LogEntry[] = await res.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(
    (log) =>
      log.userId.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.resource.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="p-6 text-blue-600 dark:text-blue-300 text-sm">
        Loading logs...
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Professional Heading */}
      <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-2">
        Admin Activity Logs
      </h1>
      <p className="text-blue-700 dark:text-blue-300 mb-6 text-sm">
        Review all system activities including student actions, instructor updates,
        payment transactions, and system errors.
      </p>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by user, action, or resource..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-3 w-full text-sm rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
      />

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="text-white">
            <tr className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900">
              <th className="p-2 text-left font-semibold">Timestamp</th>
              <th className="p-2 text-left font-semibold">User ID</th>
              <th className="p-2 text-left font-semibold">Role</th>
              <th className="p-2 text-left font-semibold">Action</th>
              <th className="p-2 text-left font-semibold">Resource</th>
              <th className="p-2 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredLogs.map((log, index) => (
              <tr key={index} className="hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors">
                <td className="p-2 text-blue-700 dark:text-blue-300">{log.timestamp}</td>
                <td className="p-2 text-blue-700 dark:text-blue-300">{log.userId}</td>
                <td className="p-2 text-blue-700 dark:text-blue-300">{log.role}</td>
                <td className="p-2 text-blue-700 dark:text-blue-300">{log.action}</td>
                <td className="p-2 text-blue-700 dark:text-blue-300">{log.resource}</td>
                <td
                  className={`p-2 font-semibold ${
                    log.statusCode >= 500
                      ? "text-red-700 dark:text-red-400"
                      : log.statusCode >= 400
                      ? "text-yellow-700 dark:text-yellow-400"
                      : "text-green-700 dark:text-green-400"
                  }`}
                >
                  {log.statusCode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
