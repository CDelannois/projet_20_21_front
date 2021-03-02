const verification = {}

//_________________________________________________________________________________MEMBRES______________________________________________________________________________________________

/*Le bouton "Envoyer est désactivé. Il ne sera activé que quand toutes les variables des lignes 8 à 13 seront TRUE. Chacune de ces variable reçoit la valeur TRUE si
les différentes conditions du champ correspondant sont remplies.*/

$('#saveMembre').prop("disabled", true);

let nomOk = false;
let prenomOk = false;
let telephoneOk = false;
let emailOk = false;
let adresseOk = false;
let dateNaissanceOk = false;

//Champ nom
verification.verificationNom = (e) => {

    let nom = $('#nom')[0].value;
    let erreurAlphaNom = $('#erreur-alpha-nom')[0];
    let erreurLengthNom = $('#erreur-length-nom')[0];
    let alphaNom = false;
    let lengthNom = false;

    if (!validator.isAlpha(nom, "fr-FR")) {
        erreurAlphaNom.textContent = "Ce champ ne peut comporter que des lettres.";
        alphaNom = false;
    } else {
        erreurAlphaNom.textContent = "";
        alphaNom = true;
    };

    if (!validator.isLength(nom, { min: 2, max: 45 })) {
        erreurLengthNom.textContent = "Le nom doit comporter au moins deux caractères et maximum 45 caractères!";
        lengthNom = false;
    } else {
        erreurLengthNom.textContent = "";
        lengthNom = true;
    };

    if (alphaNom === false || lengthNom === false) { //Si chaque condition est remplie, la variable globale nomOk devient true.
        nomOk = false;
    } else {
        nomOk = true;
    }
}
$('#nom').keyup(verification.verificationNom);

//Champ prénom
verification.verificationPrenom = (e) => {

    let prenom = $('#prenom')[0].value;
    let erreurAlphaPrenom = $('#erreur-alpha-prenom')[0];
    let erreurLengthPrenom = $('#erreur-length-prenom')[0];
    let alphaPrenom = false;
    let lengthPrenom = false;


    if (!validator.isAlpha(prenom, "fr-FR")) {
        erreurAlphaPrenom.textContent = "Ce champ ne peut comporter que des lettres.";
        alphaPrenom = false;
    } else {
        erreurAlphaPrenom.textContent = "";
        alphaPrenom = true;
    };

    if (!validator.isLength(prenom, { min: 2, max: 45 })) {
        erreurLengthPrenom.textContent = "Le prénom doit comporter au moins deux caractères et maximum 45 caractères!";
        lengthPrenom = false;
    } else {
        erreurLengthPrenom.textContent = "";
        lengthPrenom = true;
    };

    if (alphaPrenom === false || lengthPrenom === false) {
        prenomOk = false;
    } else {
        prenomOk = true;
    }
}
$('#prenom').keyup(verification.verificationPrenom);

//Champ telephone
verification.verificationTelephone = (e) => {
    let telephone = $('#telephone')[0].value;
    let erreurIntTelephone = $('#erreur-int-telephone')[0];
    let erreurLengthTelephone = $('#erreur-length-telephone')[0];
    let intTelephone = false;
    let lengthTelephone = false;

    if (!validator.isInt(telephone)) {
        erreurIntTelephone.textContent = "Ce champ ne peut comporter que chiffres.";
        intTelephone = false;
    } else {
        erreurIntTelephone.textContent = "";
        intTelephone = true;
    };

    if (!validator.isLength(telephone, { min: 9, max: 45 })) {
        erreurLengthTelephone.textContent = "Le numéro de téléphone doit comporter au moins neuf caractères et maximum 45 caractères!";
        lengthTelephone = false;
    } else {
        erreurLengthTelephone.textContent = "";
        lengthTelephone = true;
    };

    if (intTelephone === false || lengthTelephone === false) {
        telephoneOk = false;
    } else {
        telephoneOk = true;
    }
}
$('#telephone').keyup(verification.verificationTelephone);

//Champ email

verification.verificationEmail = (e) => {

    let email = $('#email')[0].value;
    let erreurIsEmail = $('#erreur-is-email')[0];
    let erreurLengthEmail = $('#erreur-length-email')[0];
    let isEmail = false;
    let lengthEmail = false;

    if (!validator.isEmail(email)) {
        erreurIsEmail.textContent = "L'adresse email n'est pas valide.";
        isEmail = false;
    } else {
        erreurIsEmail.textContent = "";
        isEmail = true;
    };

    if (!validator.isLength(email, { min: undefined, max: 45 })) {
        erreurLengthEmail.textContent = "Ce champ peut comporter au maximum 45 caractères!";
        lengthEmail = false;
    } else {
        erreurLengthEmail.textContent = "";
        lengthEmail = true;
    };

    if (isEmail === false || lengthEmail === false) {
        emailOk = false;
    } else {
        emailOk = true;
    }
}
$('#email').keyup(verification.verificationEmail);

//Champ adresse

verification.verificationAdresse = (e) => {

    let adresse = $('#adresse')[0].value;
    let erreurAlphaAdresse = $('#erreur-alpha-adresse')[0];
    let erreurLengthAdresse = $('#erreur-length-adresse')[0];
    let alphaAdresse = false;
    let lengthAdresse = false;

    if (!validator.isAlpha(adresse, 'fr-FR', { ignore: " 0123456789+" })) {
        erreurAlphaAdresse.textContent = "Ce champ ne peut pas comporter de caractères spéciaux!";
        alphaAdresse = false;
    } else {
        erreurAlphaAdresse.textContent = "";
        alphaAdresse = true;
    };

    if (!validator.isLength(adresse, { min: 10, max: 200 })) {
        erreurLengthAdresse.textContent = "Ce champ doit comporter entre 10 et 200 caractères!";
        lengthAdresse = false;
    } else {
        erreurLengthAdresse.textContent = "";
        lengthAdresse = true;
    };

    if (alphaAdresse === false || lengthAdresse === false) {
        adresseOk = false;
    } else {
        adresseOk = true;
    }
}
$('#adresse').keyup(verification.verificationAdresse);

//Champ adresse

verification.verificationDateNaissance = (e) => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(); //Permet de récupérer la date du jour au format date.

    let dateNaissance = $('#date_naissance')[0].value;
    let erreurDateNaissance = $('#erreur-date-naissance')[0];
    let beforeDateNaissance = false;

    if (!validator.isBefore(dateNaissance, date)) {
        erreurDateNaissance.textContent = "La date ne peut dépasser la date actuelle.";
        beforeDateNaissance = false;
    } else {
        erreurDateNaissance.textContent = "";
        beforeDateNaissance = true;
    };

    if (beforeDateNaissance === false) {
        dateNaissanceOk = false;
    } else {
        dateNaissanceOk = true;
    }
}
$('#date_naissance').change(verification.verificationDateNaissance);

//Déblocage du bouton
verification.unlockButtonMembre = (e) => {

    if ((nomOk === true &&
        prenomOk === true &&
        telephoneOk === true &&
        emailOk === true &&
        adresseOk === true &&
        dateNaissanceOk === true) ||
        $('#id_membre')[0].value > 0) {
        $('#saveMembre').prop("disabled", false);
    } else {
        $('#saveMembre').prop("disabled", true);
    }
}
$('#nom').keyup(verification.unlockButtonMembre);
$('#prenom').keyup(verification.unlockButtonMembre);
$('#telephone').keyup(verification.unlockButtonMembre);
$('#email').keyup(verification.unlockButtonMembre);
$('#adresse').keyup(verification.unlockButtonMembre);
$('#date_naissance').change(verification.unlockButtonMembre);

//_________________________________________________________________________________JEUX______________________________________________________________________________________________

let titreOk = false;
let joueursMinOk = false;
let joueursMaxOk = false;
let dureeOk = false;
let ageRecommandeOk = false;
let mecanismeOk = false;
let mecanisme2Ok = true;//facultatif, peut être vide, set sur false si une erreur est entrée
let dateParutionOk = false;
let editeurOk = false;
let commentaireOk = true;//facultatif, peut être vide, set sur false si une erreur est entrée

$('#saveJeu').prop("disabled", true);

verification.verificationTitre = (e) => {

    //Champ titre
    let titre = $('#titre')[0].value;
    let erreurLengthTitre = $('#erreur-length-titre')[0];
    let lengthTitre = false;

    if (!validator.isLength(titre, { min: 1, max: 45 })) {
        erreurLengthTitre.textContent = "Ce champ doit comporter entre 1 et 45 caractères.";
        lengthTitre = false;
    } else {
        erreurLengthTitre.textContent = "";
        lengthTitre = true;
    };

    if (lengthTitre == false) {
        titreOk = false;
    } else {
        titreOk = true;
    }
}

$('#titre').keyup(verification.verificationTitre);

//Champ joueurs_min
verification.verificationJoueursMin = (e) => {
    let joueursMin = $('#joueurs_min')[0].value;
    let erreurIntMin = $('#erreur-int-min')[0];
    let erreurValueMin = $('#erreur-value-min')[0];
    let intMin = false;
    let valueMin = false;

    if (!validator.isInt(joueursMin)) {
        erreurIntMin.textContent = "Ce champ ne peut comporter que des chiffres.";
        intMin = false;
    } else {
        erreurIntMin.textContent = "";
        intMin = true;
    }

    if (!validator.isInt(joueursMin, { min: 1, max: parseInt($('#joueurs_max')[0].value) })) {
        erreurValueMin.textContent = "La valeur doit être comprise entre 1 et le nombre maximum de joueurs.";
        valueMin = false;
    } else {
        erreurValueMin.textContent = "";
        valueMin = true;
    }

    if (intMin == false || valueMin == false) {
        joueursMaxOk = false;
    } else {
        joueursMaxOk = true;
    }
}
$('#joueurs_min').keyup(verification.verificationJoueursMin);
$('#joueurs_max').keyup(verification.verificationJoueursMin);

//Champ joueurs_max
verification.verificationJoueursMax = (e) => {
    let joueursMax = $('#joueurs_max')[0].value;
    let erreurIntMax = $('#erreur-int-max')[0];
    let erreurValueMax = $('#erreur-value-max')[0];
    let intMax = false;
    let valueMax = false;

    if (!validator.isInt(joueursMax)) {
        erreurIntMax.textContent = "Ce champ ne peut comporter que des chiffres.";
        intMax = false;
    } else {
        erreurIntMax.textContent = "";
        intMax = true;
    }

    if (!validator.isInt(joueursMax, { min: parseInt($('#joueurs_min')[0].value), max: 1000 })) {
        erreurValueMax.textContent = "La valeur doit être supérieur à celle du nombre minimum de joueurs.";
        valueMax = false;
    } else {
        erreurValueMax.textContent = "";
        valueMax = true;
    }

    if (erreurIntMax == false || valueMax == false) {
        joueursMinOk = false;
    } else {
        joueursMinOk = true;
    }
}

$('#joueurs_min').keyup(verification.verificationJoueursMax);
$('#joueurs_max').keyup(verification.verificationJoueursMax);


//Champ durée
verification.verificationDuree = (e) => {
    let duree = $('#duree')[0].value;
    let erreurIntDuree = $('#erreur-int-duree')[0];
    let intDuree = false;

    if (!validator.isInt(duree, { min: 1 })) {
        erreurIntDuree.textContent = "Ce champ doit être rempli avec un nombre supérieur à 0.";
        intDuree = false;
    } else {
        erreurIntDuree.textContent = "";
        intDuree = true;
    }

    if (intDuree == false) {
        dureeOk = false;
    } else {
        dureeOk = true;
    }
}
$('#duree').keyup(verification.verificationDuree);

//Champ âge recommandé
verification.verificationAge = (e) => {
    let ageRecommande = $('#age_recommande')[0].value;
    let erreurIntAgeRecommande = $('#erreur-int-age')[0];
    let intAgeRecommande = false;

    if (!validator.isInt(ageRecommande, { min: 3 })) {
        erreurIntAgeRecommande.textContent = "Ce champ doit être rempli avec un nombre égal ou supérieur à 3.";
        intAgeRecommande = false;
    } else {
        erreurIntAgeRecommande.textContent = "";
        intAgeRecommande = true;
    }

    if (intAgeRecommande = false) {
        ageRecommandeOk = false;
    } else {
        ageRecommandeOk = true;
    }
}
$('#age_recommande').keyup(verification.verificationAge);

//Champ mécanisme
verification.verificationMecanisme = (e) => {
    let mecanisme = $('#mecanisme')[0].value;
    let erreurAlphaMecanisme = $('#erreur-alpha-mecanisme')[0];
    let erreurLengthMecanisme = $('#erreur-length-mecanisme')[0];
    let alphaMecanisme = false;
    let lengthMecanisme = false;


    if (!validator.isAlpha(mecanisme, "fr-FR", { ignore: " -" })) {
        erreurAlphaMecanisme.textContent = "Ce champs ne peut contenir que des lettres, espaces ou traits d'union.";
        alphaMecanisme = false;
    } else {
        erreurAlphaMecanisme.textContent = "";
        alphaMecanisme = true;
    }

    if (!validator.isLength(mecanisme, { min: 4, max: 45 })) {
        erreurLengthMecanisme.textContent = "Ce champs doit contenir entre 4 et 45 caractères.";
        lengthMecanisme = false;
    } else {
        erreurLengthMecanisme.textContent = "";
        lengthMecanisme = true;
    }

    if (alphaMecanisme == false || lengthMecanisme == false) {
        mecanismeOk = false;
    } else {
        mecanismeOk = true;
    }
}

$('#mecanisme').keyup(verification.verificationMecanisme);

//Champ mécanisme secondaire
verification.verificationMecanisme2 = (e) => {
    let mecanisme2 = $('#mecanisme2')[0].value;
    let erreurAlphaMecanisme2 = $('#erreur-alpha-mecanisme2')[0];
    let erreurLengthMecanisme2 = $('#erreur-length-mecanisme2')[0];
    let alphaMecanisme2 = false;
    let lengthMecanisme2 = false;

    if (!validator.isEmpty(mecanisme2)) {
        if (!validator.isAlpha(mecanisme2, "fr-FR", { ignore: " -" })) {
            erreurAlphaMecanisme2.textContent = "Ce champ peut être vide ou ne peut contenir que des lettres, espace ou traits d'union.";
            alphaMecanisme2 = false;
        } else {
            erreurAlphaMecanisme2.textContent = "";
            alphaMecanisme2 = true;
        }
    } else {
        erreurAlphaMecanisme2.textContent = "";
        alphaMecanisme2 = true;
    }

    if (!validator.isLength(mecanisme2, { min: 0, max: 45 })) {
        erreurLengthMecanisme2.textContent = "Ce champ peut contenir maximum 45 caractères.";
        lengthMecanisme2 = false;
    } else {
        erreurLengthMecanisme2.textContent = "";
        lengthMecanisme2 = true;
    }

    if (alphaMecanisme2 == false || lengthMecanisme2 == false) {
        mecanisme2Ok == false;
    } else {
        mecanisme2Ok = true;
    }
}

$('#mecanisme2').keyup(verification.verificationMecanisme2);

//Champ date de parution
verification.verificationDateParution = (e) => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(); //Permet de récupérer la date du jour au format date.
    let dateParution = $('#date_parution')[0].value;
    let erreurBeforeDate = $('#erreur-date-parution')[0];
    let beforeDate = false;

    if (!validator.isBefore(dateParution, date)) {
        erreurBeforeDate.textContent = "La date de parution ne peut pas dépasser la date actuelle.";
        beforeDate = false;
    } else {
        erreurBeforeDate.textContent = "";
        beforeDate = true;
    }

    if (beforeDate == false) {
        dateParutionOk = false;
    } else {
        dateParutionOk = true;
    }
}
$('#date_parution').change(verification.verificationDateParution);

//Champ éditeur
verification.verificationEditeur = (e) => {
    let editeur = $('#editeur')[0].value;
    let erreurLengthEditeur = $('#erreur-length-editeur')[0];
    let lengthEditeur = false;

    if (!validator.isLength(editeur, { min: 1, max: 45 })) {
        erreurLengthEditeur.textContent = "Ce champ doit contenir entre 1 et 45 caractères.";
        lengthEditeur = false;
    } else {
        erreurLengthEditeur.textContent = "";
        lengthEditeur = true;
    }

    if (lengthEditeur = false) {
        editeurOk = false;
    } else {
        editeurOk = true;
    }
}
$('#editeur').keyup(verification.verificationEditeur);

//Champ commentaire
verification.verificationCommentaire = (e) => {
    let commentaire = $('#commentaire')[0].value;
    let erreurLengthCommentaire = $('#erreur-length-commentaire')[0];
    let lengthCommentaire = false;

    if (!validator.isLength(commentaire, { min: 0, max: 200 })) {
        erreurLengthCommentaire.textContent = "Ce champ peut contenir maximum 200 caractères.";
        lengthCommentaire = false;
    } else {
        erreurLengthCommentaire.textContent = "";
        lengthCommentaire = true;
    }

    if (lengthCommentaire == false) {
        commentaireOk = false;
    } else {
        commentaireOk = true;
    }
}

$('#commentaire').keyup(verification.verificationCommentaire);

verification.unlockButtonJeu = (e) => {
    if ((titreOk === true &&
        joueursMinOk === true &&
        joueursMaxOk === true &&
        dureeOk === true &&
        ageRecommandeOk === true &&
        mecanismeOk === true &&
        mecanisme2Ok === true &&
        dateParutionOk === true &&
        editeurOk === true &&
        commentaireOk === true) ||
        $('#id_jeux')[0].value > 0) {
        $('#saveJeu').prop("disabled", false);
    } else {
        $('#saveJeu').prop("disabled", true);
    }
}

$('#titre').keyup(verification.unlockButtonJeu);
$('#joueurs_min').keyup(verification.unlockButtonJeu);
$('#joueurs_max').keyup(verification.unlockButtonJeu);
$('#duree').keyup(verification.unlockButtonJeu);
$('#age_recommande').keyup(verification.unlockButtonJeu);
$('#mecanisme').keyup(verification.unlockButtonJeu);
$('#mecanisme2').keyup(verification.unlockButtonJeu);
$('#date_parution').change(verification.unlockButtonJeu);
$('#editeur').keyup(verification.unlockButtonJeu);
$('#commentaire').keyup(verification.unlockButtonJeu);


//Commentaire sur le jeu, affichage du nombre de caractères restant.
let commentaire = $('#commentaire')[0];


verification.countCharacters = (e) => {
    let textEnteredCommentaire, countRemaining, counter;
    textEnteredCommentaire = $('#commentaire')[0].value;
    counter = (200 - (textEnteredCommentaire.length));
    countRemaining = $('#caracteresRestant')[0];
    if (counter < 0) {
        countRemaining.textContent = "Le texte inséré est trop long!";
    } else {
        countRemaining.textContent = counter + " caractères restant";
    }
};

$('#commentaire').keyup(verification.countCharacters);