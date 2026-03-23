function HistorySidebar({ entries }) {
  if (!entries.length) {
    return (
      <div className="card history-card empty">
        <p>Aucun historique pour le moment.</p>
        <p className="hint">Les 10 dernières questions apparaîtront ici pour audit RGPD.</p>
      </div>
    );
  }

  return (
    <div className="card history-card">
      <header>
        <h3>Historique sécurisé</h3>
        <p>{entries.length} requêtes locales</p>
      </header>
      <ul>
        {entries.slice(0, 10).map((entry) => (
          <li key={entry.id}>
            <p className="question">{entry.question}</p>
            <p className="meta-row">
              <span>{entry.contextId}</span>
              <span>{entry.source}</span>
            </p>
            <time>{new Date(entry.timestamp).toLocaleTimeString()}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistorySidebar;
