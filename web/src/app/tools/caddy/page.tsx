// pages/caddy-logs.js

export async function getServerSideProps() {
    const logUrl = 'https://files.cgi-tools.dev/log/caddy/learn-math.org.log';
    let logData = '';
  
    try {
      const res = await fetch(logUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch logs: ${res.statusText}`);
      }
      logData = await res.text();
    } catch (error) {
      console.error('Error fetching log file:', error);
      return {
        props: {
          logs: [],
          error: error.message,
        },
      };
    }
  
    // Split the log data into lines
    const lines = logData.split('\n');
  
    // Calculate the date for 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
    // Filter lines based on the timestamp at the beginning of each line
    const filteredLogs = lines.filter((line) => {
      if (!line.trim()) return false;
      // Match ISO 8601 timestamps (adjust the regex if your logs differ)
      const match = line.match(
        /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)/
      );
      if (match) {
        const logDate = new Date(match[1]);
        return logDate >= sevenDaysAgo;
      }
      return false;
    });
  
    return {
      props: {
        logs: filteredLogs,
      },
    };
  }
  
  export default function CaddyLogsPage({ logs, error }) {
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
        <h1>Caddy Logs (Last 7 Days)</h1>
        {logs.length === 0 ? (
          <p>No log entries found for the last 7 days.</p>
        ) : (
          <pre
            style={{
              background: '#f4f4f4',
              padding: '1rem',
              borderRadius: '4px',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
            }}
          >
            {logs.join('\n')}
          </pre>
        )}
      </div>
    );
  }
  