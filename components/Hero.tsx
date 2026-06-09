type HeroProps = {
  theme: string;
};




export default function Hero({ theme }: HeroProps) {
  return (
    <section className="mb-10">
      <p
        className={`font-semibold tracking-[0.2em] uppercase mb-3 ${
          theme === "dark" ? "text-yellow-400" : "text-yellow-900"
        }`}
      >
        FIFA WORLD CUP 2026
      </p>

      <h1
        className={`text-7xl font-bold ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}
      >
        Track Your Teams.
        <br />
        Every Fixture.
      </h1>

      <p className="mt-4 text-lg text-gray-400 max-w-2xl">
        Follow every match, stadium, and kickoff time for your favorite
        national teams throughout the FIFA World Cup 2026.
      </p>
    </section>
  );
}