import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState({
    blog: false,
    youtube: false,
    crypto: false,
    aiTools: false,
    affiliate: false,
    betting: false
  });
  const [lastPostTimes, setLastPostTimes] = useState({});
  const [earnings, setEarnings] = useState('$0.00');

  useEffect(() => {
    document.body.className = darkMode ? 'bg-zinc-900 text-white' : 'bg-white text-black';
    fetchStatus();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, [darkMode]);

  const fetchStatus = async () => {
    setStatus({
      blog: true,
      youtube: true,
      crypto: true,
      aiTools: true,
      affiliate: true,
      betting: false
    });
    setLastPostTimes({
      blog: '10:15am',
      youtube: '10:17am',
      crypto: '10:19am'
    });
    setEarnings('$78.54');
  };

  const fetchLogs = async () => {
    setLogs(logs => [
      `[🕒 ${new Date().toLocaleTimeString()}] Blog published: "Top 5 Wireless Gadgets for 2025"`,
      ...logs.slice(0, 9)
    ]);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">AutoProfit Nexus Dashboard</h1>
        <button onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(status).map(([key, value]) => (
          <div key={key} className="rounded-2xl p-4 shadow bg-zinc-800">
            <h2 className="text-xl capitalize">{key} System</h2>
            <p>Status: <span className={value ? 'text-green-400' : 'text-red-500'}>{value ? 'Running ✅' : 'Offline ❌'}</span></p>
            <p>Last Action: {lastPostTimes[key] || 'N/A'}</p>
          </div>
        ))}

        <div className="rounded-2xl p-4 shadow bg-zinc-800 col-span-2">
          <h2 className="text-xl">📊 Last 24hr Earnings</h2>
          <p className="text-3xl font-bold text-green-300">{earnings}</p>
        </div>
      </div>

      <div className="rounded-2xl p-4 shadow bg-zinc-800">
        <h2 className="text-xl mb-2">📜 Activity Log</h2>
        <div className="h-64 overflow-y-scroll text-sm font-mono">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
