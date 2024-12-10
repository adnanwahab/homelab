

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JoinPage() {
  const [email, setEmail] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-teal-900">
      <div className="w-full max-w-md p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Join Three.js Journey
        </h1>

        <div className="flex rounded-lg overflow-hidden mb-8">
          <button
            onClick={() => setIsGift(false)}
            className={`flex-1 py-3 px-4 ${
              !isGift
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              For myself
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
          </button>
          <button
            onClick={() => setIsGift(true)}
            className={`flex-1 py-3 px-4 ${
              isGift
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              It&apos;s a gift
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <svg className="w-6 h-6 absolute right-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 text-indigo-600 focus:ring-indigo-500 bg-gray-700"
            />
            <label className="ml-2 text-sm text-gray-300">
              I acknowledge and agree to the{' '}
              <Link href="/terms" className="text-white hover:text-indigo-400 underline">
                General Conditions of Sale and Use
              </Link>
            </label>
          </div>

          <div className="flex gap-4 justify-end">
            <button className="px-6 py-2 text-indigo-300 hover:text-indigo-200 rounded-lg border border-indigo-700 hover:border-indigo-600">
              I have a discount
            </button>
            <button
              disabled={!email || !acknowledged}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}