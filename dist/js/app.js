let api = "https://charles-boardgame-api.herokuapp.com";
//_________________________________________________________________________________MEMBRES______________________________________________________________________________________________

//Déclaration des variables
const listMembre = {};
listMembre.membreToRemove = null;
listMembre.init = async () => {
    listMembre.membre = await listMembre.getMembre();
    listMembre.importMembreInTable(listMembre.membre, true);
}

//Récupération des membres
listMembre.getMembre = () => {
    return jQuery
        .ajax({
            url: api + '/membre',
            method: 'GET'
        })
        .catch((error) => {
            console.warn(error);
            return [];
        })
};

//Confirmation de la suppression
listMembre.confirmRemoveMembre = async (membreId) => {
    listMembre.membreToRemove = membreId;
    $('#remove-membre-modal').modal('toggle');
}

//Suppression d'un membre
listMembre.remove = async () => {
    const membreId = listMembre.membreToRemove;
    listMembre.hasGames = await listMembreJeux.getMembreJeux(membreId);
    try {
        if ((listMembre.hasGames).length > 0) {
            $("#remove-membre-modal").modal('hide');
            $('#remove-error-modal').modal('toggle');
        } else {
            await jQuery
                .ajax({
                    url: api + `/membre/${membreId}`,
                    method: "DELETE",
                });
            $(`[data-id="${membreId}"]`).fadeOut('slow');
        }
    } catch (error) {
        console.error(error);
        alert('Une erreur est survenue. Impossible de supprimer le membre.');
    } finally {
        $("#remove-membre-modal").modal('hide');
    }
}

//Liste des membres
listMembre.importMembreInTable = (membres, clear) => {
    const tbody = $("#list-membres tbody");

    if (clear === true) {
        tbody.empty();
    }

    tbody.append(
        membres.map((membre) => {
            const date = moment(membre.date_naissance).format("DD/MM/YYYY");
            return `
            <tr data-id="${membre.id_membre}">
                <td>${membre.nom}</td>
                <td>${membre.prenom}</td>
                <td>${membre.telephone}</td>
                <td>${membre.email}</td>
                <td>${membre.adresse}</td>
                <td>${date}</td>
                <td>
                    <button onclick="listMembreJeux.showJeux(${membre.id_membre})" class ="btn btn-info">Voir les jeux
                </td>
                <td>
                    <button id="edit_membre" onclick="edition.showFormMembre(${membre.id_membre})" class ="btn btn-primary">Modifier
                </td>
                <td>
                    <button onclick="listMembre.confirmRemoveMembre(${membre.id_membre})" class ="btn btn-danger remove-line">Supprimer
                </td>
            </tr>`;
        })
    );
}

listMembre.init();

//_________________________________________________________________________________JEUX______________________________________________________________________________________________

const listJeux = {};
listJeux.jeuxToRemove = null;
listJeux.init = async () => {
    listJeux.jeu = await listJeux.getJeux();
    listJeux.importJeuxInTable(listJeux.jeu, true);
}

//Affichage d'un jeu
listJeux.jeuDetail = async (jeuID) => {
    listJeux.oneJeu = await listJeux.getJeux(jeuID);
    listJeux.importOneJeuInTable(listJeux.oneJeu, true);
    display.detailJeu();
}


//Récupération des jeux
listJeux.getJeux = (jeuID) => {
    let url = api + '/jeux';

    //Si on a l'ID d'un jeu, on affiche les détails de celui-ci.
    if (jeuID) {
        url += `/${jeuID}`;
    }

    return jQuery
        .ajax({
            url,
            method: 'GET'
        })
        .catch((error) => {
            console.warn(error);
            return [];
        })
};

//Confirmation de la suppression
listJeux.confirmRemoveJeu = (jeuId) => {
    listJeux.jeuxToRemove = jeuId;
    $('#remove-jeu-modal').modal('toggle');
}

//Suppression d'un jeu
listJeux.remove = async () => {
    const jeuId = listJeux.jeuxToRemove;
    try {
        await jQuery
            .ajax({
                url: api + `/jeux/${jeuId}`,
                method: "DELETE",
            });
        $(`[data-id="${jeuId}"]`).fadeOut('slow');
    } catch (error) {
        console.error(error);
        alert('Une erreur est survenue. Impossible de supprimer le jeu.');
    } finally {
        $("#remove-jeu-modal").modal('hide');
    }
}

//Liste des jeux
listJeux.importJeuxInTable = (jeux, clear) => {

    const tbody = $("#list-jeux tbody");

    if (clear === true) {
        tbody.empty();
    }

    jeux.forEach((jeu) => {
        tbody.append(`
                <tr data-id="${jeu.id_jeux}" >
                <td>${jeu.titre}</td>
                <td>${jeu.joueurs_min}</td>
                <td>${jeu.joueurs_max}</td>
                <td>${jeu.duree}</td>
                <td>${jeu.age_recommande}</td>
                <td>${jeu.mecanisme}</td>
                <td>${jeu.mecanisme2}</td>
                <td>${jeu.editeur}</td>
                <td>
                    <button onclick="edition.showFormJeu(${jeu.id_jeux})" class = "btn btn-primary">Modifier
                </td>
                <td>
                    <button onclick="listJeux.confirmRemoveJeu(${jeu.id_jeux})" class ="btn btn-danger remove-line">Supprimer
                </td>
                <td>
                    <button onclick="listJeux.jeuDetail(${jeu.id_jeux})" class = "btn btn-info">Détails
                </td>
            </tr>`);
    });
};

listJeux.importOneJeuInTable = (jeu, clear) => {

    const tbody = $("#details-list tbody")

    if (clear === true) {
        tbody.empty();
    }
    console.log(jeu);
    jeu.forEach((detail) => {
        const date = moment(detail.date_parution).format("MMMM YYYY");
        tbody.append(`
            
            <tr data-id="${detail.id_jeux}"> <td>Titre : ${detail.titre}</td></tr>
            <tr><td>Nombre minimum de joueurs : ${detail.joueurs_min}</td></tr>
            <tr><td>Nombre maximum de joueurs : ${detail.joueurs_max}</td></tr>
            <tr><td>Durée du jeu (en minutes) : ${detail.duree}</td></tr>
            <tr><td>Age minimum recommandé : ${detail.age_recommande}</td></tr>
            <tr><td>Mecanisme principal du jeu : ${detail.mecanisme}</td></tr>
            <tr><td>Mecanisme secondaire : ${detail.mecanisme2}</td></tr>
            <tr><td>Date de parution du jeu : ${date}</td></tr>
            <tr><td>Editeur : ${detail.editeur}</td></tr>
            <tr><td>Commentaire sur le jeu : ${detail.commentaire}</td></tr>
            <tr><td>Propriétaire : ${detail.prenom} ${detail.nom}</td></tr>
            
        `)
    });
}

listJeux.init();

//_________________________________________________________________________________JEUX D'UN MEMBRE______________________________________________________________________________________________


const listMembreJeux = {};

listMembreJeux.init = async (membreId) => {
    listMembreJeux.membreJeu = await listMembreJeux.getMembreJeux(membreId);
    listMembreJeux.importMembreJeuxInTable(listMembreJeux.membreJeu, true);
}

//Récupération des jeux liés aux membres
listMembreJeux.getMembreJeux = (membreId) => {
    return jQuery
        .ajax({
            url: api + `/membreJeux/${membreId}`,
            method: 'GET'
        })
        .catch((error) => {
            console.warn(error);
            return [];
        })
};

//Liste des jeux

listMembreJeux.importMembreJeuxInTable = (membreJeux, clear) => {
    const tbody = $("#list-membre-jeux tbody");
    nom = membreJeux[0].nom;
    prenom = membreJeux[0].prenom;
    $('#title-list-membre-jeux')[0].textContent = ('Jeux de ' + prenom + ' ' + nom);
    if (clear === true) {
        tbody.empty();
    }

    membreJeux.forEach((membreJeu) => {
        tbody.append(`
            <tr data-id="${membreJeu.id_jeux}">
                <td>${membreJeu.titre}</td>
                <td>${membreJeu.joueurs_min}</td>
                <td>${membreJeu.joueurs_max}</td>
                <td>${membreJeu.duree}</td>
                <td>${membreJeu.age_recommande}</td>
                <td>${membreJeu.mecanisme}</td>
                <td>${membreJeu.mecanisme2}</td>
                <td>${membreJeu.editeur}</td>
                <td id="appartient">${membreJeu.appartient}</td>
                <td>
                    <button onclick="edition.showFormJeu(${membreJeu.id_jeux})" class = "btn btn-primary">Modifier
                </td>
                <td>
                    <button onclick="listJeux.confirmRemoveJeu(${membreJeu.id_jeux})" class = "btn btn-danger remove-line">Supprimer
                </td>
                <td>
                    <button onclick="listJeux.jeuDetail(${membreJeu.id_jeux})" class = "btn btn-info">Détails
                </td>
            </tr>`);
    });
};

//Vider la liste des jeux d'un membre pour permettre d'afficher d'autres listes
listMembreJeux.emptyList = () => {
    $("#body-list-membre-jeux").empty();
}

//Affichage des jeux d'un membre
listMembreJeux.showJeux = (membreId) => {
    listMembreJeux.emptyList();
    listMembreJeux.init(membreId);
    display.showMembreJeux();
};
const edition = {};

//_________________________________________________________________________________MEMBRES______________________________________________________________________________________________

//Afficher le formulaire pour ajouter un membre
edition.showFormMembre = (membreID) => {
    //si on a un ID, on appelle populate
    if (membreID) {
        edition.populateMembre(membreID);
    }
    $('#container-form-membre').fadeIn();
    $('#button-add-membre').hide();
    $("#button-display-jeux").hide();
    $('#button-cancel-edit-membre').show();
    $('#membre-table').hide();
};

edition.populateMembre = (membreID) => {
    edition.cleanFormMembre();
    //D'abord on récupère l'ID du membre à modifier
    const membre = listMembre.membre.find(membre => membre.id_membre === membreID);
    //Si le membre existe
    if (membre) {
        let myDate, day, month, year, date; //Récupération et formatage de la date pour l'envoyer dans le formulaire.
        myDate = new Date(membre.date_naissance);
        day = myDate.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        month = myDate.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        year = myDate.getFullYear();
        date = year + "-" + month + "-" + day;
        $('#id_membre').val(membre.id_membre);
        $('#nom').val(membre.nom);
        $('#prenom').val(membre.prenom);
        $('#telephone').val(membre.telephone);
        $('#email').val(membre.email);
        $('#adresse').val(membre.adresse);
        $('#date_naissance').val(date);
    }
}

//Effacer le formulaire pour ajouter un membre
edition.hideFormMembre = () => {
    $('#container-form-membre').fadeOut();
    $('#button-add-membre').show();
    $("#button-display-jeux").show();
    $('#button-cancel-edit-membre').hide();
    edition.cleanFormMembre();
    $('#saveMembre').prop("disabled", true);
    $('#membre-table').fadeIn();
};

edition.cleanFormMembre = () => {
    $('#id_membre').val('');
    $('#nom').val('');
    $('#prenom').val('');
    $('#telephone').val('');
    $('#email').val('');
    $('#adresse').val('');
    $('#date_naissance').val('');
    $('#erreur-alpha-nom')[0].textContent = "";
    $('#erreur-length-nom')[0].textContent = "";
    $('#erreur-alpha-prenom')[0].textContent = "";
    $('#erreur-length-prenom')[0].textContent = "";
    $('#erreur-int-telephone')[0].textContent = "";
    $('#erreur-length-telephone')[0].textContent = "";
    $('#erreur-is-email')[0].textContent = "";
    $('#erreur-length-email')[0].textContent = "";
    $('#erreur-alpha-adresse')[0].textContent = "";
    $('#erreur-length-adresse')[0].textContent = "";
    $('#erreur-date-naissance')[0].textContent = "";
}

//Valider l'enregistrement d'un membre
edition.saveMembre = async (event) => {
    event.preventDefault(); //Arrêter l'exécution de l'envoi
    const id = $('#id_membre').val();
    const isEdition = id.length > 0;
    const nom = $('#nom').val();
    const prenom = $('#prenom').val();
    const telephone = $('#telephone').val();
    const email = $('#email').val(); //Il faudra ajouter une vérification pour que l'adresse respecte le format *@*.* voir https://www.w3resource.com/javascript/form/email-validation.php
    const adresse = $('#adresse').val();
    const date_naissance = $('#date_naissance').val();

    let url = api + '/membre';

    if (isEdition) {
        url += `/${id}`;
    }

    try {
        const newMembre = await jQuery.ajax({
            url,
            method: "POST",
            data: {
                nom,
                prenom,
                telephone,
                email,
                adresse,
                date_naissance,
            }
        });
        listMembre.init();


        edition.hideFormMembre();
    } catch (error) {
        console.log("Something went wrong!")
        console.error(error);
    }
}

edition.membres = [];

edition.init = async () => {
    edition.membres = await edition.getMembres();
    edition.fillSelectMembres(edition.membres);
}

edition.getMembres = () => {
    return jQuery
        .ajax({
            url: api + '/membre',
            method: 'GET'
        })
        .catch((error) => {
            console.warn(error);
            return [];
        })
};

//_________________________________________________________________________________JEUX______________________________________________________________________________________________

//Afficher le formulaire pour ajouter un jeu
edition.showFormJeu = (jeuID) => {
    //si on a un ID, on appelle populate
    if (jeuID) {
        edition.populateJeu(jeuID);
        $('#membre-jeux-table').hide();
    }
    $('#container-form-jeu').fadeIn();
    $('#button-add-jeu').hide();
    $('#button-add-membre').hide();
    $("#button-display-jeux").hide();
    $("#button-display-membre").hide();
    $('#button-cancel-edit-jeu').show();
    $('#jeux-table').hide();
    $("#error-modal").modal('hide');

};

edition.fillSelectMembres = (membres) => {
    const select = $('#jeuAppartient');
    select.append(
        membres.map(membre => {
            return `<option value="${membre.id_membre}">${membre.prenom} ${membre.nom}</option>`
        })
    );
}
edition.init();
//Pour l'édition d'un jeu: on récupère les infos qu'on place dans le formulaire.
edition.populateJeu = (jeuID) => {
    console.log(jeuID);
    edition.cleanFormJeu();
    //D'abord on récupère l'ID du jeu à modifier
    const jeu = listJeux.jeu.find(jeu => jeu.id_jeux === jeuID);
    console.log(jeu);
    //Si le jeu existe
    if (jeu) {
        let myDate, day, month, year, date; //Récupération et formatage de la date pour l'envoyer dans le formulaire.
        myDate = new Date(jeu.date_parution);
        day = myDate.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        month = myDate.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        year = myDate.getFullYear();
        date = year + "-" + month + "-" + day;

        $('#id_jeux').val(jeu.id_jeux);
        $('#titre').val(jeu.titre);
        $('#joueurs_min').val(jeu.joueurs_min);
        $('#joueurs_max').val(jeu.joueurs_max);
        $('#duree').val(jeu.duree);
        $('#age_recommande').val(jeu.age_recommande);
        $('#mecanisme').val(jeu.mecanisme);
        $('#mecanisme2').val(jeu.mecanisme2);
        $('#date_parution').val(date);
        $('#editeur').val(jeu.editeur);
        $('#commentaire').val(jeu.commentaire);
        $('#jeuAppartient').val(jeu.appartient);
    }
}

//Effacer le formulaire pour ajouter un jeu
edition.hideFormJeu = () => {
    $('#container-form-jeu').fadeOut();
    $('#button-cancel-edit-jeu').hide();
    $("#button-display-jeux").hide();
    $("#button-display-membre").show();
    $('#button-add-jeu').show();
    edition.cleanFormJeu();
    $('#membre-table').hide();
    $('#jeux-table').show();
    $('#saveJeu').prop("disabled", true);
};

edition.cleanFormJeu = () => {
    $('#id_jeux').val('');
    $('#titre').val('');
    $('#joueurs_min').val('');
    $('#joueurs_max').val('');
    $('#duree').val('');
    $('#age_recommande').val('');
    $('#mecanisme').val('');
    $('#mecanisme2').val('');
    $('#date_parution').val('');
    $('#editeur').val('');
    $('#commentaire').val('');
    $('#jeuAppartient').val();
    $('#erreur-length-titre')[0].textContent = "";
    $('#erreur-int-min')[0].textContent = "";
    $('#erreur-value-min')[0].textContent = "";
    $('#erreur-int-max')[0].textContent = "";
    $('#erreur-value-max')[0].textContent = "";
    $('#erreur-int-duree')[0].textContent = "";
    $('#erreur-int-age')[0].textContent = "";
    $('#erreur-alpha-mecanisme')[0].textContent = "";
    $('#erreur-length-mecanisme')[0].textContent = "";
    $('#erreur-alpha-mecanisme2')[0].textContent = "";
    $('#erreur-length-mecanisme2')[0].textContent = "";
    $('#erreur-date-parution')[0].textContent = "";
    $('#erreur-length-editeur')[0].textContent = "";
    $('#erreur-length-commentaire')[0].textContent = "";
}

edition.saveJeu = async () => {

    const id = $('#id_jeux').val();
    const isEdition = id.length > 0;
    const titre = $('#titre').val();
    const joueurs_min = $('#joueurs_min').val();
    const joueurs_max = $('#joueurs_max').val();
    const duree = $('#duree').val();
    const age_recommande = $('#age_recommande').val();
    const mecanisme = $('#mecanisme').val();
    const mecanisme2 = $('#mecanisme2').val();
    const date_parution = $('#date_parution').val();
    const editeur = $('#editeur').val();
    const commentaire = $('#commentaire').val();
    const appartient = $('#jeuAppartient').val();

    event.preventDefault(); //Arrêter l'exécution de l'envoi


    let url = api + '/jeux';

    if (isEdition) {
        url += `/${id}`;
    }

    try {

        const newJeu = await jQuery.ajax({
            url,
            method: "POST",
            data: {
                titre,
                joueurs_min,
                joueurs_max,
                duree,
                age_recommande,
                mecanisme,
                mecanisme2,
                date_parution,
                editeur,
                commentaire,
                appartient,
            }
        });
        if (isEdition) {
            listJeux.init();
            listMembreJeux.init(appartient);
        } else {
            listJeux.init();
        }
        edition.hideFormJeu();
    } catch (error) {
        console.log("Something went wrong!")
        console.error(error);
    }
}
const display = {};

//Afficher les jeux
display.showJeux = () => {
    $('#jeux-table').show();
    $('#membre-table').hide();
    $('#membre-jeux-table').hide();
    $('#jeu-detail-table').hide();
    $('#button-add-jeu').show();
    $("#button-display-jeux").hide();
    $("#button-display-membre").show();
    $('#button-add-membre').hide();
};

//Afficher les membres
display.showMembre = () => {
    $('#jeux-table').hide();
    $('#membre-table').show();
    $('#membre-jeux-table').hide();
    $('#jeu-detail-table').hide();
    $('#button-add-jeu').hide();
    $("#button-display-jeux").show();
    $("#button-display-membre").hide();
    $('#button-add-membre').show();
};

//Afficher les jeux d'un membre
display.showMembreJeux = () => {
    $('#jeux-table').hide();
    $('#membre-table').hide();
    $('#membre-jeux-table').show();
    $('#jeu-detail-table').hide();
    $('#button-add-membre').hide();
    $('#button-add-jeu').show();
    $("#button-display-jeux").show();
    $("#button-display-membre").show();
}

//Afficher les détails d'un jeu
display.detailJeu = () => {
    $('#jeu-detail-table').show();
    $('#jeux-table').hide();
    $('#membre-jeux-table').hide();
    $('#button-add-jeu').hide();
    $("#button-display-jeux").show();
    $("#button-display-membre").show();
    $('#button-add-membre').hide();
}
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