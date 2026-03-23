import AskForm from './components/AskForm.jsx';
import AnswerPanel from './components/AnswerPanel.jsx';
import HistorySidebar from './components/HistorySidebar.jsx';
import StatusBadge from './components/StatusBadge.jsx';
import { useAskLegalAi } from './hooks/useAskLegalAi.js';

function App() {
  const { ask, history, status, error, lastAnswer } = useAskLegalAi();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">LegalAI • Assistant RAG RGPD</p>
          <h1>Console Opérations Juridiques</h1>
          <p className="subtitle">
            Posez vos questions (3000 utilisateurs, 90k requêtes/jour) — le backend gère rate limit,
            cache et RAG Groq.
          </p>
        </div>
        <StatusBadge status={status} />
      </header>

      <main className="app-content">
        <section className="main-panel">
          <AskForm onSubmit={ask} isLoading={status === 'loading'} />
          <AnswerPanel answer={lastAnswer} error={error} status={status} />
        </section>
        <aside className="history-panel">
          <HistorySidebar entries={history} />
        </aside>
      </main>
    </div>
  );
}

export default App;
