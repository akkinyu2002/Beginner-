'use client';

import { useState } from 'react';
import { validatePracticeCode } from '../lib/api';

const starterPracticeCode = 'for i in range(1, 6):\n    print(i)';

export default function PracticePanel() {
  const [code, setCode] = useState(starterPracticeCode);
  const [feedback, setFeedback] = useState('Submit your code to get feedback.');
  const [passed, setPassed] = useState(null);
  const [checking, setChecking] = useState(false);

  const handleSubmit = async () => {
    setChecking(true);

    try {
      const result = await validatePracticeCode(code);
      setPassed(result.passed);
      setFeedback(result.feedback);
    } catch (error) {
      setPassed(false);
      setFeedback(error.message || 'Unable to validate your code right now.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <section className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Practice Challenge</h2>
      <p className="mt-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
        Task: Write Python code to print numbers from 1 to 5 using a loop.
      </p>

      <textarea
        value={code}
        onChange={(event) => setCode(event.target.value)}
        className="mt-4 h-40 w-full rounded-xl border border-slate-300 p-4 font-mono text-sm text-slate-900"
        aria-label="Practice code input"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={checking}
        className="mt-4 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-300"
      >
        {checking ? 'Checking...' : 'Check Answer'}
      </button>

      <p
        className={`mt-4 rounded-lg p-3 text-sm font-medium ${
          passed === null
            ? 'bg-slate-100 text-slate-700'
            : passed
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-rose-100 text-rose-800'
        }`}
      >
        {feedback}
      </p>
    </section>
  );
}
