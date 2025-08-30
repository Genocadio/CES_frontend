module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/translations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTranslation",
    ()=>getTranslation,
    "translations",
    ()=>translations
]);
const translations = {
    rw: {
        // Navigation
        home: "Ahabanza",
        submitIssue: "Tanga Ikibazo",
        followUp: "Gukurikirana",
        publicOpinions: "Ibitekerezo bya Rubanda",
        language: "Ururimi",
        // Home page
        welcomeTitle: "Murakaza neza ku Rubuga rw'Ibibazo by'Abaturage",
        welcomeSubtitle: "Tanga ibibazo byawe, ibitekerezo, cyangwa ibyifuzo kugira ngo dufatanye mu guteza imbere igihugu cyacu",
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
            comments: "Andika ibitekerezo byawe..."
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
        isPublicDescription: "Rubanda rwose rurashobora kubona kohereza ryawe"
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
            comments: "Write your comments..."
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
        isPublicDescription: "Everyone can see your submission"
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
        welcomeSubtitle: "Soumettez vos problèmes, commentaires ou suggestions pour nous aider à améliorer notre communauté ensemble",
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
            comments: "Écrivez vos commentaires..."
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
        isPublicDescription: "Tout le monde peut voir votre soumission"
    }
};
function getTranslation(lang, key) {
    const keys = key.split(".");
    let value = translations[lang];
    for (const k of keys){
        value = value?.[k];
    }
    return value || key;
}
}),
"[project]/hooks/use-language.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/translations.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LanguageProvider({ children }) {
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("rw") // Default to Kinyarwanda
    ;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedLang = localStorage.getItem("preferred-language");
        if (savedLang && [
            "rw",
            "en",
            "fr"
        ].includes(savedLang)) {
            setLanguage(savedLang);
        }
    }, []);
    const handleSetLanguage = (lang)=>{
        setLanguage(lang);
        localStorage.setItem("preferred-language", lang);
    };
    const t = (key)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTranslation"])(language, key);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage: handleSetLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/hooks/use-language.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
function useLanguage() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
}),
"[project]/hooks/use-auth.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Mock users for demonstration
const mockUsers = [
    {
        id: "1",
        name: "Jean Baptiste",
        email: "jean@example.com",
        phone: "+250788123456",
        isVerified: true,
        createdAt: new Date("2024-01-01"),
        preferences: {
            language: "rw",
            notifications: true,
            publicProfile: false
        }
    },
    {
        id: "2",
        name: "Marie Uwimana",
        email: "marie@example.com",
        phone: "+250789654321",
        isVerified: true,
        createdAt: new Date("2024-01-05"),
        preferences: {
            language: "en",
            notifications: true,
            publicProfile: true
        }
    }
];
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check for stored user session
        const storedUser = localStorage.getItem("current-user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                localStorage.removeItem("current-user");
            }
        }
        setIsLoading(false);
    }, []);
    const login = async (email, password)=>{
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve)=>setTimeout(resolve, 1000));
        const foundUser = mockUsers.find((u)=>u.email === email);
        if (foundUser && password === "password") {
            // Mock password check
            setUser(foundUser);
            localStorage.setItem("current-user", JSON.stringify(foundUser));
            setIsLoading(false);
            return true;
        }
        setIsLoading(false);
        return false;
    };
    const register = async (name, email, password, phone)=>{
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve)=>setTimeout(resolve, 1500));
        // Check if user already exists
        const existingUser = mockUsers.find((u)=>u.email === email);
        if (existingUser) {
            setIsLoading(false);
            return false;
        }
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            isVerified: false,
            createdAt: new Date(),
            preferences: {
                language: "rw",
                notifications: true,
                publicProfile: false
            }
        };
        mockUsers.push(newUser);
        setUser(newUser);
        localStorage.setItem("current-user", JSON.stringify(newUser));
        setIsLoading(false);
        return true;
    };
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem("current-user");
    };
    const updateProfile = async (updates)=>{
        if (!user) return false;
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve)=>setTimeout(resolve, 1000));
        const updatedUser = {
            ...user,
            ...updates
        };
        setUser(updatedUser);
        localStorage.setItem("current-user", JSON.stringify(updatedUser));
        setIsLoading(false);
        return true;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isLoading,
            login,
            register,
            logout,
            updateProfile
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/hooks/use-auth.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
}),
"[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e926a491._.js.map