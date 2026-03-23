const LABELS = {
  idle: 'Prêt',
  loading: 'Interroge Groq',
  cached: 'Réponse cache',
  live: 'Réponse live',
  error: 'Erreur',
};

function StatusBadge({ status }) {
  const normalized = LABELS[status] ? status : 'idle';
  return <span className={`status-badge status-${normalized}`}>{LABELS[normalized]}</span>;
}

export default StatusBadge;
