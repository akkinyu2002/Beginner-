'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchLesson } from '../lib/api';
import pythonIntroLesson from '../data/pythonIntroLesson';

export default function LessonSystem() {
  const [mode, setMode] = useState('simple');
  const [lesson, setLesson] = useState(pythonIntroLesson);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadLesson = async () => {
      try {
        const serverLesson = await fetchLesson();
        if (mounted) {
          setLesson(serverLesson);
        }
      } catch (_error) {
        if (mounted) {
          setLesson(pythonIntroLesson);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadLesson();

    return () => {
      mounted = false;
    };
  }, []);

  const explanationText = useMemo(() => {
    if (mode === 'simple') {
      return lesson.simple;
    }

    return lesson.advanced;
  }, [lesson, mode]);

  const codeLines = lesson.code.split('\n');

  return (
    <section
      id="lesson"
      className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-slate-900">{lesson.title}</h2>
        <button
          type="button"
          onClick={() => setMode((current) => (current === 'simple' ? 'advanced' : 'simple'))}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Switch to {mode === 'simple' ? 'advanced' : 'simple'} mode
        </button>
      </div>

      {loading && <p className="mt-4 text-sm text-slate-500">Loading lesson content...</p>}

      <p className="mt-4 rounded-xl bg-cyan-50 p-4 text-slate-800">{explanationText}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Code Example</h3>
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
            <code>{lesson.code}</code>
          </pre>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Line by Line Logic</h3>
          <ul className="mt-3 space-y-2">
            {lesson.lineExplanations.map((lineExplanation, index) => (
              <li key={lineExplanation} className="rounded-lg border border-slate-200 p-3 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">{codeLines[index]}</p>
                <p className="mt-1">{lineExplanation}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-600">{lesson.explanation}</p>
    </section>
  );
}
