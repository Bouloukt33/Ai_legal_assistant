import { getLegalResponse } from './groqClient.js';
import { legalCorpus } from '../data/data.js';
import { logger } from '../utils/logger.js';

const DEFAULT_MODEL = process.env.GROQ_MODEL || 'gpt-4o-mini';

export const findRelevantDoc = (question) => {
  const tokens = question.toLowerCase().split(/\W+/).filter(Boolean);
  const scored = legalCorpus
    .map((doc) => {
      const tagHits = doc.tags.reduce(
        (acc, tag) => (tokens.includes(tag.toLowerCase()) ? acc + 2 : acc),
        0,
      );
      const textHits = tokens.reduce(
        (acc, token) => (doc.summary.toLowerCase().includes(token) ? acc + 1 : acc),
        0,
      );
      return { doc, score: tagHits + textHits };
    })
    .sort((a, b) => b.score - a.score);
  return scored[0]?.score ? scored[0].doc : null;
};

const buildSystemPrompt = (contextSummary) => `Tu es LegalAI, assistant juridique forme pour repondre avec fiabilite et conformite RGPD.
Contrainte SLA: 99.9%. Donnees sensibles, jamais de fuite. Cite les references si elles existent.
Utilise UNIQUEMENT le contexte ci-dessous pour repondre.
Contexte:
${contextSummary || 'Aucun document pertinent.'}`;

export const askLegalAssistant = async (question) => {
  if (!question?.trim()) {
    const error = new Error('La question est requise.');
    error.status = 400;
    throw error;
  }

  const contextDoc = findRelevantDoc(question) || { id: 'fallback', summary: 'Aucun contexte specifique.' };
  const systemPrompt = buildSystemPrompt(contextDoc.summary);
  const formattedQuestion = `Question: ${question}\nReponds en francais de maniere concise (<= 120 mots).`;

  try {
    const answer = await getLegalResponse({
      question: formattedQuestion,
      systemPrompt,
      model: DEFAULT_MODEL,
      maxTokens: 400,
    });

    logger.info('groq-response', { model: DEFAULT_MODEL, docId: contextDoc.id });

    return { answer, contextId: contextDoc.id };
  } catch (error) {
    logger.error('groq-failure', { error: error.message });
    throw error;
  }
};
