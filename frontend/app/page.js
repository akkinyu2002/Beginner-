import Hero from '../components/Hero';

export default function HomePage() {
  return (
    <main className="px-4 py-10 md:px-8">
      <Hero />
      <section id="lesson" className="mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Python lessons are coming next.</h2>
      </section>
    </main>
  );
}
