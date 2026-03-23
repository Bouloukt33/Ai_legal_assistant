export const legalCorpus = [
  {
    id: 'contract-nda',
    tags: ['nda', 'confidentialite', 'contrat'],
    summary:
      'Les clauses NDA standard imposent une obligation de confidentialite de 3 ans, sauf si la loi impose une divulgation.',
  },
  {
    id: 'rgpd-base-legale',
    tags: ['rgpd', 'dpo', 'donnees'] ,
    summary:
      "Pour traiter des donnees sensibles, LegalAI doit disposer d'une base legale explicite, journaliser les acces et offrir un droit d'effacement en moins de 30 jours.",
  },
  {
    id: 'procedure-litige',
    tags: ['litige', 'tribunal', 'delais'],
    summary:
      'Un delai moyen de traitement des litiges commerciaux est de 6 mois; la mediation est recommandee avant toute assignation.',
  },
  {
    id: 'contrat-saas',
    tags: ['saas', 'sla', 'contrat'],
    summary:
      'Les contrats SaaS francais doivent stipuler la localisation des donnees et prevoir un RTO/RPO compatibles avec le SLA annnonce.',
  },
  {
    id: 'droit-travail-temps',
    tags: ['droit', 'travail', 'temps', 'france'],
    summary:
      'En France, la duree legale hebdomadaire est de 35h. Tout depassement impose un suivi des heures et une remuneration majorée ou repos compensateur.',
  },
  {
    id: 'droit-travail-licenciement',
    tags: ['licenciement', 'procedure', 'france'],
    summary:
      'Toute procedure de licenciement doit respecter un entretien prealable, un delai de reflexion et une notification ecrite mentionnant les motifs objectifs.',
  },
];
