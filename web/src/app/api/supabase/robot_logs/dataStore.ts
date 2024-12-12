// // src/app/api/robot_logs/dataStore.ts

// // For demonstration only. This data will NOT persist if the server restarts.
// // In production, connect to a database or another persistent storage solution.
// type LogEntry = {
//   timestamp: number;
//   message: string;
// };

// const roombaLogs: LogEntry[] = [];
// const zed2iLogs: LogEntry[] = [];
// const lerbotLogs: LogEntry[] = [];

// export { roombaLogs, zed2iLogs, lerbotLogs, LogEntry };

type LogEntry = {
  timestamp: number;
  message: string;
  level?: 'info' | 'warn' | 'error';
};

const roombaLogs: LogEntry[] = [
  { timestamp: Date.now(), message: 'Roomba initialized', level: 'info' }
];

const zed2iLogs: LogEntry[] = [
  { timestamp: Date.now(), message: 'ZED2i camera ready', level: 'info' }
];

const lerbotLogs: LogEntry[] = [
  { timestamp: Date.now(), message: 'Lerbot standing by', level: 'info' }
];

export { roombaLogs, zed2iLogs, lerbotLogs };
export type { LogEntry };