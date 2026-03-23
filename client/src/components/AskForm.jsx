import { useState } from 'react';

function AskForm({ onSubmit, isLoading }) {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) {
      return;
    }
    await onSubmit(trimmed);
    setQuestion('');
  };

  return (
    <form className="card ask-form" onSubmit={handleSubmit}>
      <label htmlFor="question">Question juridique</label>
      <textarea
        id="question"
        rows={4}
        placeholder="Ex. Quels délais pour une procédure de licenciement collectif ?"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        disabled={isLoading}
      />
      <div className="form-footer">
        <p>Temps de réponse moyen &lt; 2s — timeout backend 10s.</p>
        <button type="submit" disabled={isLoading || !question.trim()}>
          {isLoading ? 'Analyse en cours...' : 'Interroger LegalAI'}
        </button>
      </div>
    </form>
  );
}

export default AskForm;
