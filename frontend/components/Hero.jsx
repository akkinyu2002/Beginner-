export default function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-sm">
      <p className="w-fit rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700">
        Free Learning Platform
      </p>
      <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
        CodeFromZero: Learn Python from very simple to very deep.
      </h1>
      <p className="max-w-3xl text-lg text-slate-700">
        Kids can learn in simple mode. College students can switch to advanced mode and dive into real
        coding depth.
      </p>
      <a
        href="#lesson"
        className="w-fit rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
      >
        Start Learning
      </a>
    </section>
  );
}
