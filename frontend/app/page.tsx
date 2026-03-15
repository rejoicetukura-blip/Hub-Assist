export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight">
        BlueCollar <span className="text-blue-400">Hub</span>
      </h1>
      <p className="text-gray-400 text-center max-w-md">
        A comprehensive coworking and workspace management platform powered by{' '}
        <a
          href="https://stellar.org"
          className="text-blue-400 underline"
          target="_blank"
          rel="noreferrer"
        >
          Stellar
        </a>
        .
      </p>
      <div className="flex gap-4">
        <a
          href="/dashboard"
          className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Dashboard
        </a>
        <a
          href="/auth/login"
          className="px-5 py-2 border border-gray-600 rounded-lg hover:border-gray-400 transition"
        >
          Sign In
        </a>
      </div>
    </main>
  );
}
