(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/translations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
        var _this;
        value = (_this = value) === null || _this === void 0 ? void 0 : _this[k];
    }
    return value || key;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/use-language.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/translations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LanguageProvider(param) {
    let { children } = param;
    _s();
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("rw") // Default to Kinyarwanda
    ;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            const savedLang = localStorage.getItem("preferred-language");
            if (savedLang && [
                "rw",
                "en",
                "fr"
            ].includes(savedLang)) {
                setLanguage(savedLang);
            }
        }
    }["LanguageProvider.useEffect"], []);
    const handleSetLanguage = (lang)=>{
        setLanguage(lang);
        localStorage.setItem("preferred-language", lang);
    };
    const t = (key)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTranslation"])(language, key);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
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
_s(LanguageProvider, "adHB7+ly+z6aGHww5LPID9YOnIY=");
_c = LanguageProvider;
function useLanguage() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/use-auth.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
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
function AuthProvider(param) {
    let { children } = param;
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
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
        }
    }["AuthProvider.useEffect"], []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
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
_s(AuthProvider, "YajQB7LURzRD+QP5gw0+K2TZIWA=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@15.5.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_e6525eec._.js.map