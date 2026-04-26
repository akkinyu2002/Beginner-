import Link from 'next/link';
import LessonSystem from '../../components/LessonSystem';
import LessonCatalog from '../../components/LessonCatalog';

export default function LessonPage() {
  return (
    <main className="px-4 py-10 md:px-8">
      <section className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Python Learning Roadmap</h1>
        <p className="mt-2 text-slate-700">
          Start from the first lesson, then continue through conditions and loops.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Back to Home
        </Link>
      </section>

      <LessonCatalog />
      <LessonSystem />
    </main>
  );
}
