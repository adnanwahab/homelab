'use client'

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import fs from 'fs'
//easier to understand codebase = long term good because easier to debug while iterating. 
export default function Page() {
    const [notifications, setNotifications] = useState<string[]>([])
    
    async function checkErrorTables() {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // Fetch all tables
        const { data: tables } = await supabase
            .from('information_schema.tables')
            .select('table_name')
            .eq('table_schema', 'public')

        // Check each table for error entries
        for (const table of tables || []) {
            const { data: tableData } = await supabase
                .from(table.table_name)
                .select('*')

            const errorEntries = tableData?.filter(entry => 
                Object.keys(entry).some(key => 
                    key.toLowerCase().includes('error_')
                )
            )

            if (errorEntries?.length) {
                const message = `Found ${errorEntries.length} error entries in table ${table.table_name}`
                
                // Add to UI notifications
                setNotifications(prev => [...prev, message])
                
                // Send webhook notification
                await fetch('/api/error-webhook', {
                    method: 'POST',
                    body: JSON.stringify({
                        message,
                        errors: errorEntries
                    })
                })
            }
        }
    }

    useEffect(() => {
        checkErrorTables()
        // Set up periodic checking every 5 minutes
        const interval = setInterval(checkErrorTables, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Auto Debugger</h1>
            
            {/* Error Notifications */}
            <div className="space-y-2">
                {notifications.map((notification, index) => (
                    <div key={index} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {notification}
                    </div>
                ))}
            </div>
        </div>
    )
}