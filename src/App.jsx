import Navbar from './landingPage/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Invoice Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">
            Create and manage business invoices, memos, customers, and products from a single workspace.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
