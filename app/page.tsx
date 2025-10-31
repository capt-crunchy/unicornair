export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-4">🦄 Welcome to Unicorn Air</h1>
      <p className="text-lg text-gray-300 mb-6">
        Your magical virtual airline headquarters has arrived ✨
      </p>

      <a
        href="/ops"
        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white text-xl"
      >
        Enter Ops Center
      </a>
    </main>
  );
}
