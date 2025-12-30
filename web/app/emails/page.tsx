import fs from 'fs';
import path from 'path';

type Email = {
  id: string;
  subject?: string;
  from?: string;
  to?: string;
  date?: string;
  snippet?: string;
};

async function getEmails(): Promise<Email[]> {
  const filePath = path.join(process.cwd(), 'web', 'public', 'emails.json');
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(data) as Email[];
  } catch (e) {
    return [];
  }
}

export default async function EmailsPage() {
  const emails = await getEmails();
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Emails</h1>
      {emails.length === 0 ? (
        <p className="text-gray-500">No emails found.</p>
      ) : (
        <ul className="divide-y divide-gray-200 border rounded-md">
          {emails.map((email) => (
            <li key={email.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-base font-medium truncate">
                  {email.subject || '(no subject)'}
                </h2>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {email.date || ''}
                </span>
              </div>
              <div className="mt-1 text-sm text-gray-600">
                <span className="font-medium">From:</span> {email.from || ''}
                {email.to ? (
                  <>
                    <span className="mx-2 text-gray-400">→</span>
                    <span className="font-medium">To:</span> {email.to}
                  </>
                ) : null}
              </div>
              {email.snippet ? (
                <p className="mt-2 text-sm text-gray-700 line-clamp-2">{email.snippet}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



