type HeroProps = {
  theme: string;
};




export default function Hero({ theme }: HeroProps) {
  return (
    <section className="mb-10">
      <p className="text-yellow-400 font-semibold tracking-[0.2em] uppercase mb-3">
        FIFA World Cup 2026
      </p>

      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
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