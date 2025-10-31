
export default function FAQPage(){
  return (
    <main className="page">
      <section className="container py-10">
        <h1 className="text-3xl font-bold mb-4">FAQ</h1>
        <details className="card mb-2" open>
          <summary className="font-semibold cursor-pointer">What makes Unicorn Air's theme different?</summary>
          <p className="mt-2 text-violet-200/90">We keep it light and fun. You’ll see playful copy and art, but ops remain professional and realistic.</p>
        </details>
        <details className="card mb-2">
          <summary className="font-semibold cursor-pointer">How do I join?</summary>
          <p className="mt-2 text-violet-200/90">Head to the Crew Portal, create your profile, and connect your preferred sim tools.</p>
        </details>
        <details className="card mb-2">
          <summary className="font-semibold cursor-pointer">Which tools do you support?</summary>
          <p className="mt-2 text-violet-200/90">SimBrief, FsHub, Hoppie ACARS, and natural-speech ATC via SayIntentions.AI. VATSIM/IVAO pilots are welcome too.</p>
        </details>
        <details className="card">
          <summary className="font-semibold cursor-pointer">Do you run events?</summary>
          <p className="mt-2 text-violet-200/90">Yes—seasonal fly-ins, route challenges, and alliance ops. Check Discord for schedules.</p>
        </details>
      </section>
    </main>
  )
}
