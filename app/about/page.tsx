
export default function AboutPage(){
  return (
    <main className="page">
      <section className="container py-10 prose prose-invert max-w-none">
        <h1>About Unicorn Air</h1>
        <p><strong>Founded:</strong> 2025 • <strong>Base:</strong> Spokane (GEG) • <strong>Focus:</strong> Regional routes and community events.</p>
        <p>Unicorn Air began with a simple idea: make virtual flying welcoming, polished, and a little whimsical. We operate regional routes and community flights, integrating modern tools like SimBrief, FsHub, Hoppie ACARS, and <a href="https://sayintentions.ai" target="_blank" rel="noopener">SayIntentions.AI</a> for natural-speech ATC.</p>
        <h2>Fleet</h2>
        <ul>
          <li>Airbus A320neo (MSFS default)</li>
          <li>Beechcraft & Cessna types for regional hops</li>
        </ul>
        <h2>What sets us apart</h2>
        <ul>
          <li>Professional SOPs with a fun, fantasy-forward brand</li>
          <li>Beginner-friendly onboarding and dispatch</li>
          <li>Events, challenges, and alliance ops</li>
        </ul>
        <h2>Get involved</h2>
        <p>Visitors can browse live activity on FsHub, while pilots can log in via the Crew Portal to fly scheduled or ad-hoc sectors.</p>
      </section>
    </main>
  )
}
