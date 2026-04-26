'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchLessonCatalog } from '../lib/api';

export default function LessonCatalog() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadLessons = async () => {
      try {
        const lessonList = await fetchLessonCatalog();
        if (mounted) {
          setLessons(lessonList);
        }
      } catch (_error) {
        if (mounted) {
          setError('Unable to load lesson catalog right now.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadLessons();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Python Roadmap</h2>
      <p className="mt-2 text-slate-700">Follow lessons in order and move from basics to logic mastery.</p>

      {loading && <p className="mt-4 text-sm text-slate-500">Loading roadmap...</p>}
      {error && <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/lesson/${lesson.slug}`}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-cyan-300 hover:bg-cyan-50"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Lesson {lesson.order}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">{lesson.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{lesson.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
