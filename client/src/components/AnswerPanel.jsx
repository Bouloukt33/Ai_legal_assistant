function AnswerPanel({ answer, error, status }) {
  const hasAnswer = Boolean(answer);

  return (
    <section className="card answer-panel">
      <header>
        <div>
          <p className="eyebrow">Réponse consolidée</p>
          <h2>RAG + Groq</h2>
        </div>
        <span className="source-chip">{answer?.source || 'en attente'}</span>
      </header>

      {error && <p className="error">{error}</p>}

      {!hasAnswer && !error && (
        <p className="placeholder">
          Vous verrez ici les obligations légales, références contextuelles et ID de la source simulée.
        </p>
      )}

      {hasAnswer && (
        <div>
          <p className="answer-text">{answer.answer}</p>
          <dl className="meta">
            <div>
              <dt>Contexte</dt>
              <dd>{answer.contextId}</dd>
            </div>
            <div>
              <dt>Statut</dt>
              <dd>{status === 'cached' ? 'cache (0s)' : 'live (Groq API)'}</dd>
            </div>
            <div>
              <dt>Horodatage</dt>
              <dd>{new Date(answer.timestamp).toLocaleString()}</dd>
            </div>
          </dl>
        </div>
      )}
    </section>
  );
}

export default AnswerPanel;
