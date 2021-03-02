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