import Link from 'next/link';
import LessonSystem from '../../../components/LessonSystem';

export default function LessonDetailPage({ params }) {
  return (
    <main className="px-4 py-10 md:px-8">
      <section className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Lesson Detail</h1>
        <p className="mt-2 text-slate-700">Study this topic in simple and advanced modes with line-by-line logic.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/lesson"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to Roadmap
          </Link>
          <Link
            href="/"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to Home
          </Link>
        </div>
      </section>

      <LessonSystem lessonSlug={params.slug} />
    </main>
  );
}
