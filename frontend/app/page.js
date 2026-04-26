import Hero from '../components/Hero';
import LessonSystem from '../components/LessonSystem';
import dynamic from 'next/dynamic';
import PracticePanel from '../components/PracticePanel';

const EditorPanel = dynamic(() => import('../components/EditorPanel'), {
  ssr: false,
  loading: () => (
    <section className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-slate-600">Loading editor...</p>
    </section>
  ),
});

export default function HomePage() {
  return (
    <main className="px-4 py-10 md:px-8">
      <Hero />
      <LessonSystem />
      <EditorPanel />
      <PracticePanel />
    </main>
  );
}
