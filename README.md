# LegalAI — Assistant Juridique RAG

Backend Express.js conçu pour un assistant LegalTech (LegalAI) respectant RGPD, SLA 99.9% et contraintes budgétaires.

## Prérequis
- Node.js 20+
- Variable `GROQ_API_KEY` (Groq console)

## Installation
```bash
npm install
```

Si vous voyez `EACCES` sous macOS, corrigez les permissions npm :
```bash
sudo chown -R $(id -u):$(id -g) ~/.npm
npm install
```

## Démarrage
```bash
cp .env.example .env # créez le fichier et ajoutez GROQ_API_KEY
npm run start        # production
npm run dev          # reload auto en dev
```

## Endpoint principal
| Méthode | Route | Corps attendu | Réponse |
|---------|-------|---------------|---------|
| POST    | `/ask`| `{ "question": "texte" }` | `{ source, answer, contextId }` |

Fonctionnalités :
- Rate limit 60 req/min/IP
- Cache mémoire TTL 5 min
- Timeout forcé 10s
- Logs JSON (pour ELK/OpenSearch)
- RAG minimal via `services/ragService.js`

## Structure Clean Architecture légère
Voir `docs/analysis.md` pour l’arborescence, l’analyse architecturale, ainsi que le schéma Mermaid complet.

## Tests rapides
Aucun test automatisé encore, mais vous pouvez vérifier l’API avec curl :
```bash
curl -X POST http://localhost:3000/ask \
  -H 'Content-Type: application/json' \
  -d '{"question":"Quels sont les délais d’un NDA ?"}'
```

## Analyse & Schéma
`docs/analysis.md` couvre :
- RAG vs fine-tuning
- Stratégie scale-out
- Risques sécurité (prompt injection, RGPD)
- Optimisation des coûts
- Diagramme Mermaid (Utilisateur → LB → API → RAG → Groq)
