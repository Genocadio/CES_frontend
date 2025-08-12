import { Translation } from '../types';

export const translations = {
  // Navigation
  issues: { en: 'Issues', rw: 'Ibibazo', fr: 'Problèmes' },
  topics: { en: 'Topics', rw: 'Insanganyamatsiko', fr: 'Sujets' },
  announcements: { en: 'Announcements', rw: 'Amatangazo', fr: 'Annonces' },
  
  // Common actions
  follow: { en: 'Follow', rw: 'Kurikirana', fr: 'Suivre' },
  following: { en: 'Following', rw: 'Urakurikirana', fr: 'Suivi' },
  upvote: { en: 'Upvote', rw: 'Tora hejuru', fr: 'Vote positif' },
  downvote: { en: 'Downvote', rw: 'Tora hasi', fr: 'Vote négatif' },
  reply: { en: 'Reply', rw: 'Subiza', fr: 'Répondre' },
  comment: { en: 'Comment', rw: 'Igitekerezo', fr: 'Commentaire' },
  share: { en: 'Share', rw: 'Sangira', fr: 'Partager' },
  
  // Issue specific
  createIssue: { en: 'Create Issue', rw: 'Kurema Ikibazo', fr: 'Créer un Problème' },
  issueTitle: { en: 'Issue Title', rw: 'Umutwe w\'Ikibazo', fr: 'Titre du Problème' },
  issueDescription: { en: 'Describe your issue...', rw: 'Sobanura ikibazo cyawe...', fr: 'Décrivez votre problème...' },
  category: { en: 'Category', rw: 'Icyiciro', fr: 'Catégorie' },
  status: { en: 'Status', rw: 'Imiterere', fr: 'Statut' },
  priority: { en: 'Priority', rw: 'Ubwihangane', fr: 'Priorité' },
  
  // Status
  open: { en: 'Open', rw: 'Gifunguye', fr: 'Ouvert' },
  inProgress: { en: 'In Progress', rw: 'Mu Rwego', fr: 'En Cours' },
  resolved: { en: 'Resolved', rw: 'Byakemuwe', fr: 'Résolu' },
  closed: { en: 'Closed', rw: 'Byfunze', fr: 'Fermé' },
  
  // Priority
  low: { en: 'Low', rw: 'Buke', fr: 'Faible' },
  medium: { en: 'Medium', rw: 'Hagati', fr: 'Moyen' },
  high: { en: 'High', rw: 'Hejuru', fr: 'Élevé' },
  urgent: { en: 'Urgent', rw: 'Byihutirwa', fr: 'Urgent' },
  
  // Topic specific
  createTopic: { en: 'Create Topic', rw: 'Kurema Ingingo', fr: 'Créer un Sujet' },
  whatHappening: { en: 'What\'s happening?', rw: 'Habaye iki?', fr: 'Que se passe-t-il ?' },
  
  // Time
  justNow: { en: 'Just now', rw: 'Ubu', fr: 'À l\'instant' },
  minutesAgo: { en: 'minutes ago', rw: 'iminota ishize', fr: 'il y a minutes' },
  hoursAgo: { en: 'hours ago', rw: 'amasaha ashize', fr: 'il y a heures' },
  daysAgo: { en: 'days ago', rw: 'iminsi ishize', fr: 'il y a jours' },
  
  // Categories
  infrastructure: { en: 'Infrastructure', rw: 'Ibikorwa Remezo', fr: 'Infrastructure' },
  healthcare: { en: 'Healthcare', rw: 'Ubuvuzi', fr: 'Santé' },
  education: { en: 'Education', rw: 'Uburezi', fr: 'Éducation' },
  transport: { en: 'Transport', rw: 'Ubwikorezi', fr: 'Transport' },
  environment: { en: 'Environment', rw: 'Ibidukikije', fr: 'Environnement' },
  security: { en: 'Security', rw: 'Umutekano', fr: 'Sécurité' },
  
  // Departments
  ministryHealth: { en: 'Ministry of Health', rw: 'Minisitiri w\'Ubuzima', fr: 'Ministère de la Santé' },
  ministryEducation: { en: 'Ministry of Education', rw: 'Minisitiri w\'Uburezi', fr: 'Ministère de l\'Éducation' },
  ministryTransport: { en: 'Ministry of Transport', rw: 'Minisitiri y\'Ubwikorezi', fr: 'Ministère des Transports' },
  localGovernment: { en: 'Local Government', rw: 'Ubutegetsi Bwibanze', fr: 'Gouvernement Local' },
};

export const getTranslation = (key: keyof typeof translations, language: string): string => {
  const translation = translations[key];
  if (!translation) return key;
  return translation[language as keyof Translation] || translation.en;
};