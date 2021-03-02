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

    let url = 'http://localhost:3000/membre';

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
            url: 'http://localhost:3000/membre',
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


    let url = 'http://localhost:3000/jeux';

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