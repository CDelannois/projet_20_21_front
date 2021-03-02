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
            url: 'http://localhost:3000/membre',
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
                    url: `http://localhost:3000/membre/${membreId}`,
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
    listJeux.jeu = await listJeux.getJeux(jeuID);
    listJeux.importOneJeuInTable(listJeux.jeu, true);
    display.detailJeu();
}


//Récupération des jeux
listJeux.getJeux = (jeuID) => {
    let url = 'http://localhost:3000/jeux';

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
                url: `http://localhost:3000/jeux/${jeuId}`,
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
            url: `http://localhost:3000/membreJeux/${membreId}`,
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