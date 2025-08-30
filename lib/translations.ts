export type Language = "rw" | "en" | "fr"

export const translations = {
  rw: {
    // Navigation
    home: "Ahabanza",
    submitIssue: "Tanga Ikibazo",
    followUp: "Gukurikirana",
    publicOpinions: "Ibitekerezo bya Rubanda",
    language: "Ururimi",

    // Home page
    welcomeTitle: "Murakaza neza ku Rubuga rw'Ibibazo by'Abaturage",
    welcomeSubtitle:
      "Tanga ibibazo byawe, ibitekerezo, cyangwa ibyifuzo kugira ngo dufatanye mu guteza imbere igihugu cyacu",

    // Issue submission
    issueTitle: "Andika Ikibazo Cyawe",
    issueDescription: "Sobanura ikibazo cyawe mu buryo burambuye",
    category: "Icyiciro",
    priority: "Ibanze",
    attachments: "Inyandiko zinyuranye",
    anonymous: "Banga amazina",
    fullName: "Amazina yose",
    phoneNumber: "Nimero ya telefoni",
    email: "Imeyili",
    submit: "Kohereza",

    // Categories
    infrastructure: "Ibikorwa remezo",
    healthcare: "Ubuvuzi",
    education: "Uburezi",
    security: "Umutekano",
    environment: "Ibidukikije",
    other: "Ibindi",

    // Priority levels
    low: "Bike",
    medium: "Hagati",
    high: "Byinshi",
    urgent: "Byihutirwa",

    // Follow up
    ticketId: "Nimero y'icyemezo",
    enterTicketId: "Injiza nimero y'icyemezo",
    checkStatus: "Reba uko bigenda",
    addMoreInfo: "Ongeraho amakuru",

    // Status
    received: "Byakiriwe",
    inProgress: "Biragenda",
    resolved: "Byakemuwe",
    closed: "Byafunze",

    // Auth
    logout: "Gusohoka",

    // Common
    loading: "Biragenda...",
    error: "Ikosa",
    success: "Byagenze neza",
    cancel: "Kuraguza",
    save: "Bika",
    edit: "Hindura",
    delete: "Siba",
    view: "Reba",
    back: "Subira",
    next: "Komeza",
    previous: "Ibanziriza",
    search: "Shakisha",
    filter: "Shyungura",
    sort: "Shirisha",
    date: "Itariki",
    time: "Igihe",
    status: "Uko bigenda",
    actions: "Ibikorwa",
    details: "Ibisobanuro",
    comments: "Ibitekerezo",
    attachFiles: "Shyiraho dosiye",
    required: "Bikenewe",
    optional: "Bitakenewe",
    yes: "Yego",
    no: "Oya",
    continue: "Komeza",
    finish: "Soza",
    close: "Funga",

    // Government announcements
    governmentAnnouncements: "Amatangazo ya Leta",
    announcementsDescription: "Reba amatangazo mashya ya Leta n'amakuru y'ingenzi",
    viewAnnouncements: "Reba Amatangazo",
    downloadAttachment: "Kuramo Inyandiko",
    watchVideo: "Reba Amashusho",
    viewImage: "Reba Ishusho",

    // Floating button translations
    submitNewIssue: "Tanga Ikibazo Gishya",

    totalIssues: "Ibibazo Byose",
    filterIssues: "Shyungura Ibibazo",
    allCategories: "Ibyiciro Byose",
    allStatuses: "Imiterere Yose",
    noIssuesFound: "Nta kibazo cyabonetse gikurikije ibyo wasabye",
    communityComments: "Ibitekerezo by'Abaturage",
    viewDetails: "Reba Ibisobanuro",

    placeholders: {
      fullName: "Injiza amazina yawe yose",
      phoneNumber: "Injiza nimero ya telefoni yawe",
      email: "Injiza imeyili yawe",
      issueTitle: "Andika umutwe w'ikibazo cyawe",
      issueDescription: "Sobanura ikibazo cyawe mu buryo burambuye...",
      ticketId: "Injiza nimero y'icyemezo cyawe",
      additionalInfo: "Ongeraho amakuru y'inyongera...",
      comments: "Andika ibitekerezo byawe...",
    },

    // New translation keys for submit page
    minimalSubmissionSuccess: "Nimero y'icyemezo yawe yashyizweho. Koresha uku kugira ngo urangize kohereza ikibazo cyawe nyuma.",
    fullSubmissionSuccess: "Ikibazo cyawe cyakoherejwe neza",
    minimalSubmissionInstructions: "Bika uyu numero y'icyemezo. Urashobora kuyukoresha kugira ngo ongero amakuru y'ikibazo cyawe nyuma kuri uku kuri Kurukurikirana.",
    fullSubmissionInstructions: "Bika uyu numero y'icyemezo kugira ngo ukurikirane uko bigenda ikibazo cyawe no kongeramo amakuru y'inyongera niba bikenewe.",
    completeIssue: "Rangiza Ikibazo",
    submissionMethodTitle: "Uko ushobora kohereza?",
    submissionMethodDescription: "Hitamo uburyo bwo kohereza bwo guhitamo",
    quickStart: "Gutangira Vuba",
    quickStartDescription: "Gusa tanga amakuru yawe yo gukurikirana kugira ngo ubone numero y'icyemezo. Ongeramo amakuru y'ikibazo nyuma.",
    completeSubmission: "Kohereza Urukurikirane",
    completeSubmissionDescription: "Kohereza amakuru yose y'ikibazo cyawe ubu hamwe n'amakuru yose.",
    issueDetails: "Amakuru y'Ikibazo",
    privacySettings: "Igenamiterere rya Kwihishira",
    privacySettingsDescription: "Gukurikirana uwo ashobora kubona kohereza ryawe",
    submissionOptions: "Amahitamo yo Kohereza",
    submittingForSomeoneElse: "Nkohereza ikibazo kuri undi",
    otherPersonNameLabel: "Amazina y'uwo ikibazo kibihererwa",
    contactInformation: "Amakuru yo Gukurikirana",
    contactRequiredDescription: "Bikenewe - Tanga amakuru yawe yo gukurikirana kugira ngo ubone numero y'icyemezo",
    contactOptionalDescription: "Tanga amakuru yawe yo gukurikirana kugira ngo ubone amakuru y'inyongera",
    getTicketId: "Bona Numero y'Icyemezo",
    saveDraftAndGetTicketId: "Bika Ibisubizo no Bona Numero y'Icyemezo",
    notLoggedInMessage: "Ntibyemewe kwinjira. Ubutumwa bwawe buzaba bwihishijwe ku giti gibe.",
    issueType: "Ubwoko bw'Ikibazo",
    positiveFeedback: "Ibitekerezo Byiza",
    negativeFeedback: "Ibitekerezo Bibi",
    suggestion: "Ibyifuzo",
    isPublic: "Ni byo rubanda rwose",
    isPublicDescription: "Rubanda rwose rurashobora kubona kohereza ryawe",
  },
  en: {
    // Navigation
    home: "Home",
    submitIssue: "Submit Issue",
    followUp: "Follow Up",
    publicOpinions: "Public Opinions",
    language: "Language",

    // Home page
    welcomeTitle: "Welcome to Citizen Issue Platform",
    welcomeSubtitle: "Submit your issues, feedback, or suggestions to help us improve our community together",

    // Issue submission
    issueTitle: "Describe Your Issue",
    issueDescription: "Provide a detailed description of your issue",
    category: "Category",
    priority: "Priority",
    attachments: "Attachments",
    anonymous: "Submit Anonymously",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    email: "Email",
    submit: "Submit",

    // Categories
    infrastructure: "Infrastructure",
    healthcare: "Healthcare",
    education: "Education",
    security: "Security",
    environment: "Environment",
    other: "Other",

    // Priority levels
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",

    // Follow up
    ticketId: "Ticket ID",
    enterTicketId: "Enter your ticket ID",
    checkStatus: "Check Status",
    addMoreInfo: "Add More Information",

    // Status
    received: "Received",
    inProgress: "In Progress",
    resolved: "Resolved",
    closed: "Closed",

    // Auth
    logout: "Logout",

    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    back: "Back",
    next: "Next",
    previous: "Previous",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    date: "Date",
    time: "Time",
    status: "Status",
    actions: "Actions",
    details: "Details",
    comments: "Comments",
    attachFiles: "Attach Files",
    required: "Required",
    optional: "Optional",
    yes: "Yes",
    no: "No",
    continue: "Continue",
    finish: "Finish",
    close: "Close",

    // Government announcements
    governmentAnnouncements: "Government Announcements",
    announcementsDescription: "View the latest government announcements and important updates",
    viewAnnouncements: "View Announcements",
    downloadAttachment: "Download Attachment",
    watchVideo: "Watch Video",
    viewImage: "View Image",

    // Floating button translations
    submitNewIssue: "Submit New Issue",

    totalIssues: "Total Issues",
    filterIssues: "Filter Issues",
    allCategories: "All Categories",
    allStatuses: "All Statuses",
    noIssuesFound: "No issues found matching your criteria",
    communityComments: "Community Comments",
    viewDetails: "View Details",

    placeholders: {
      fullName: "Enter your full name",
      phoneNumber: "Enter your phone number",
      email: "Enter your email address",
      issueTitle: "Enter the title of your issue",
      issueDescription: "Describe your issue in detail...",
      ticketId: "Enter your ticket ID",
      additionalInfo: "Add additional information...",
      comments: "Write your comments...",
    },

    // New translation keys for submit page
    minimalSubmissionSuccess: "Your ticket ID has been generated. Use it to complete your issue submission later.",
    fullSubmissionSuccess: "Your issue has been submitted successfully",
    minimalSubmissionInstructions: "Please save this ticket ID. You can use it to add your issue details later through the Follow Up page.",
    fullSubmissionInstructions: "Please save this ticket ID to track your issue status and add additional information if needed.",
    completeIssue: "Complete Issue",
    submissionMethodTitle: "How would you like to submit?",
    submissionMethodDescription: "Choose your preferred submission method",
    quickStart: "Quick Start",
    quickStartDescription: "Just provide your contact info to get a ticket ID. Add issue details later.",
    completeSubmission: "Complete Submission",
    completeSubmissionDescription: "Submit your full issue details now with all information.",
    issueDetails: "Issue Details",
    privacySettings: "Privacy Settings",
    privacySettingsDescription: "Manage who can see your submission",
    submissionOptions: "Submission Options",
    submittingForSomeoneElse: "I am submitting this issue for someone else",
    otherPersonNameLabel: "Name of the person this issue affects",
    contactInformation: "Contact Information",
    contactRequiredDescription: "Required - Provide your contact details to get a ticket ID",
    contactOptionalDescription: "Provide your contact details to receive updates",
    getTicketId: "Get Ticket ID",
    saveDraftAndGetTicketId: "Save Draft & Get Ticket ID",
    notLoggedInMessage: "You are not logged in. Your submission will be anonymous by default.",
    issueType: "Issue Type",
    positiveFeedback: "Positive Feedback",
    negativeFeedback: "Negative Feedback",
    suggestion: "Suggestion",
    isPublic: "This is public",
    isPublicDescription: "Everyone can see your submission",
  },
  fr: {
    // Navigation
    home: "Accueil",
    submitIssue: "Soumettre un Problème",
    followUp: "Suivi",
    publicOpinions: "Opinions Publiques",
    language: "Langue",

    // Home page
    welcomeTitle: "Bienvenue sur la Plateforme des Problèmes Citoyens",
    welcomeSubtitle:
      "Soumettez vos problèmes, commentaires ou suggestions pour nous aider à améliorer notre communauté ensemble",

    // Issue submission
    issueTitle: "Décrivez Votre Problème",
    issueDescription: "Fournissez une description détaillée de votre problème",
    category: "Catégorie",
    priority: "Priorité",
    attachments: "Pièces Jointes",
    anonymous: "Soumettre Anonymement",
    fullName: "Nom Complet",
    phoneNumber: "Numéro de Téléphone",
    email: "Email",
    submit: "Soumettre",

    // Categories
    infrastructure: "Infrastructure",
    healthcare: "Santé",
    education: "Éducation",
    security: "Sécurité",
    environment: "Environnement",
    other: "Autre",

    // Priority levels
    low: "Faible",
    medium: "Moyen",
    high: "Élevé",
    urgent: "Urgent",

    // Follow up
    ticketId: "ID du Ticket",
    enterTicketId: "Entrez votre ID de ticket",
    checkStatus: "Vérifier le Statut",
    addMoreInfo: "Ajouter Plus d'Informations",

    // Status
    received: "Reçu",
    inProgress: "En Cours",
    resolved: "Résolu",
    closed: "Fermé",

    // Auth
    logout: "Déconnexion",

    // Common
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    cancel: "Annuler",
    save: "Sauvegarder",
    edit: "Modifier",
    delete: "Supprimer",
    view: "Voir",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    search: "Rechercher",
    filter: "Filtrer",
    sort: "Trier",
    date: "Date",
    time: "Heure",
    status: "Statut",
    actions: "Actions",
    details: "Détails",
    comments: "Commentaires",
    attachFiles: "Joindre des Fichiers",
    required: "Requis",
    optional: "Optionnel",
    yes: "Oui",
    no: "Non",
    continue: "Continuer",
    finish: "Terminer",
    close: "Fermer",

    // Government announcements
    governmentAnnouncements: "Annonces Gouvernementales",
    announcementsDescription: "Consultez les dernières annonces gouvernementales et mises à jour importantes",
    viewAnnouncements: "Voir les Annonces",
    downloadAttachment: "Télécharger la Pièce Jointe",
    watchVideo: "Regarder la Vidéo",
    viewImage: "Voir l'Image",

    // Floating button translations
    submitNewIssue: "Soumettre un Nouveau Problème",

    totalIssues: "Total des Problèmes",
    filterIssues: "Filtrer les Problèmes",
    allCategories: "Toutes les Catégories",
    allStatuses: "Tous les Statuts",
    noIssuesFound: "Aucun problème trouvé correspondant à vos critères",
    communityComments: "Commentaires de la Communauté",
    viewDetails: "Voir les Détails",

    placeholders: {
      fullName: "Entrez votre nom complet",
      phoneNumber: "Entrez votre numéro de téléphone",
      email: "Entrez votre adresse email",
      issueTitle: "Entrez le titre de votre problème",
      issueDescription: "Décrivez votre problème en détail...",
      ticketId: "Entrez votre ID de ticket",
      additionalInfo: "Ajoutez des informations supplémentaires...",
      comments: "Écrivez vos commentaires...",
    },

    // New translation keys for submit page
    minimalSubmissionSuccess: "Votre ID de ticket a été généré. Utilisez-le pour compléter votre soumission de problème plus tard.",
    fullSubmissionSuccess: "Votre problème a été soumis avec succès",
    minimalSubmissionInstructions: "Veuillez sauvegarder cet ID de ticket. Vous pouvez l'utiliser pour ajouter les détails de votre problème plus tard via la page de Suivi.",
    fullSubmissionInstructions: "Veuillez sauvegarder cet ID de ticket pour suivre le statut de votre problème et ajouter des informations supplémentaires si nécessaire.",
    completeIssue: "Compléter le Problème",
    submissionMethodTitle: "Comment souhaitez-vous soumettre ?",
    submissionMethodDescription: "Choisissez votre méthode de soumission préférée",
    quickStart: "Démarrage Rapide",
    quickStartDescription: "Fournissez simplement vos informations de contact pour obtenir un ID de ticket. Ajoutez les détails du problème plus tard.",
    completeSubmission: "Soumission Complète",
    completeSubmissionDescription: "Soumettez tous les détails de votre problème maintenant avec toutes les informations.",
    issueDetails: "Détails du Problème",
    privacySettings: "Paramètres de Confidentialité",
    privacySettingsDescription: "Gérez qui peut voir votre soumission",
    submissionOptions: "Options de Soumission",
    submittingForSomeoneElse: "Je soumets ce problème pour quelqu'un d'autre",
    otherPersonNameLabel: "Nom de la personne affectée par ce problème",
    contactInformation: "Informations de Contact",
    contactRequiredDescription: "Requis - Fournissez vos coordonnées pour obtenir un ID de ticket",
    contactOptionalDescription: "Fournissez vos coordonnées pour recevoir des mises à jour",
    getTicketId: "Obtenir l'ID de Ticket",
    saveDraftAndGetTicketId: "Sauvegarder le Brouillon et Obtenir l'ID de Ticket",
    notLoggedInMessage: "Vous n'êtes pas connecté. Votre soumission sera anonyme par défaut.",
    issueType: "Type de Problème",
    positiveFeedback: "Retour Positif",
    negativeFeedback: "Retour Négatif",
    suggestion: "Suggestion",
    isPublic: "Ceci est public",
    isPublicDescription: "Tout le monde peut voir votre soumission",
  },
}

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split(".")
  let value: any = translations[lang]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
