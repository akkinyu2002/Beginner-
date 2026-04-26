import Hero from '../components/Hero';
import LessonSystem from '../components/LessonSystem';

export default function HomePage() {
  return (
    <main className="px-4 py-10 md:px-8">
      <Hero />
      <LessonSystem />
    </main>
  );
}
