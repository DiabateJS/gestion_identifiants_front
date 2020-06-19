function onFormLoad()
{
    clearFormFields();
    var defaultGroupName = "site_web";
    enableSelectedGroup(defaultGroupName);
}


function enableSelectedGroup(groupName)
{
    for (var i = 0 ; i < arFieldsGroup.length ; i++)
    {

        if (arFieldsGroup[i] == groupName)
        {
            $("#"+arFieldsGroup[i]).show();
        }
        else
        {
            $("#"+arFieldsGroup[i]).hide();
        }
    }
}

function onListeTypeIdentifiantChange()
{
    console.log("[FCT::onListeTypeIdentifiantChange] Début de la fonction");
    var typeIdent = $("#Ident_type").val();
    console.log("[FCT::onListeTypeIdentifiantChange] typeIdent = "+typeIdent);

    clearFormFields();
    $("#Ident_type").val(typeIdent);
    enableSelectedGroup(typeIdent);

}

function loadIdentifiant(type,id_ident){

    if (app_data)
    {
        if (app_data[type])
        {
            var oIdentifiant = null;
            for (var i = 0 ; i < app_data[type].length ; i++)
            {
                if (app_data[type][i].id_ident == id_ident)
                {
                    oIdentifiant = app_data[type][i];
                }
            }

            if (oIdentifiant != null)
            {
                if (type == "site_web")
                {
                    $("#Ident_type").val("site_web");
                    enableSelectedGroup("site_web");

                    $("#Ident_id").val(oIdentifiant.id_ident);
                    $("#Ident_nom").val(oIdentifiant.libelle);
                    $("#Ident_login").val(oIdentifiant.login);
                    $("#Ident_mdp").val(oIdentifiant.mdp);
                    $("#Ident_commentaire").val(oIdentifiant.commentaire);

                    $("#Ident_siteWeb_type").val(oIdentifiant.type);
                    $("#Ident_siteWeb_lien").val(oIdentifiant.lien);

                }

                if (type == "compte_messagerie")
                {
                    $("#Ident_type").val("compte_messagerie");
                    enableSelectedGroup("compte_messagerie");

                    $("#Ident_id").val(oIdentifiant.id_ident);
                    $("#Ident_nom").val(oIdentifiant.libelle);
                    $("#Ident_login").val(oIdentifiant.login);
                    $("#Ident_mdp").val(oIdentifiant.mdp);
                    $("#Ident_commentaire").val(oIdentifiant.commentaire);

                    $("#Ident_messagerie_nom").val(oIdentifiant.messagerie);
                    $("#Ident_messagerie_lien").val(oIdentifiant.lien);
                }

                if (type == "application")
                {
                    $("#Ident_type").val("application");
                    enableSelectedGroup("application");

                    $("#Ident_id").val(oIdentifiant.id_ident);
                    $("#Ident_nom").val(oIdentifiant.libelle);
                    $("#Ident_login").val(oIdentifiant.login);
                    $("#Ident_mdp").val(oIdentifiant.mdp);
                    $("#Ident_commentaire").val(oIdentifiant.commentaire);

                    $("#Ident_app_type").val(oIdentifiant.type);
                    $("#Ident_app_nom").val(oIdentifiant.nom_app);
                    $("#Ident_app_version").val(oIdentifiant.version_app);

                }

                if (type == "carte_bancaire")
                {
                    $("#Ident_type").val("carte_bancaire");
                    enableSelectedGroup("carte_bancaire");

                    $("#Ident_id").val(oIdentifiant.id_ident);
                    $("#Ident_nom").val(oIdentifiant.libelle);
                    $("#Ident_login").val("");
                    $("#Ident_mdp").val("");
                    $("#Ident_commentaire").val(oIdentifiant.commentaire);

                    $("#Ident_cb_banque").val(oIdentifiant.banque);
                    $("#Ident_cb_numero").val(oIdentifiant.numero);
                    $("#Ident_cb_date_expiration").val(oIdentifiant.date_exp);

                }

                if (type == "serveur")
                {
                    $("#Ident_type").val("serveur");
                    enableSelectedGroup("serveur");

                    $("#Ident_id").val(oIdentifiant.id_ident);
                    $("#Ident_nom").val(oIdentifiant.libelle);
                    $("#Ident_login").val(oIdentifiant.login);
                    $("#Ident_mdp").val(oIdentifiant.mdp);
                    $("#Ident_commentaire").val(oIdentifiant.commentaire);

                    $("#Ident_serveur_type").val(oIdentifiant.libelle_type_serveur);
                    $("#Ident_serveur_lien").val(oIdentifiant.lien_serveur);
                    $("#Ident_serveur_adresse_ip").val(oIdentifiant.adresse_ip);
                    $("#Ident_serveur_os").val(oIdentifiant.nom_os);
                    $("#Ident_serveur_os_version").val(oIdentifiant.version_os);

                }

            }

        }

    }else
    {
        var msg = "Les données de l'application ne sont pas chargées !";
        displayMessage("error",msg);
    }

}

function saveNewIdentifiant()
{

  $.ajax({
      method: "GET",
      data: {
                operation : "create",
                oIdent : getCurrentIdentifiant(),
                api_key : api_key
            },

      url: url_base+"gestion_identifiants_backend/",

      success: function(response){

          var oData = JSON.parse(response);

          if (oData.return_code == 200)
          {
              var oResData = JSON.parse(oData.data);

              $("#Ident_id").val(oResData.id_ident);

              displayMessage("success","Identifiant correctement crée en base !");

              updateMenu();

          }

      }
  });

}

function updateIdentifiant()
{
  $.ajax({
      method: "GET",
      data: {
                operation : "update",
                oIdent : getCurrentIdentifiant(),
                api_key : api_key
            },

      url: url_base+"gestion_identifiants_backend/",

      success: function(response){

          var oData = JSON.parse(response);

          if (oData.return_code == 200)
          {
              var oResData = JSON.parse(oData.data);

              displayMessage("success","Identifiant correctement mis à jour en base !");

              updateMenu();

          }

      }
  });
}

function deleteIdentifiant()
{
  $.ajax({
      method: "GET",
      data: {
                operation : "delete",
                oIdent : getCurrentIdentifiant(),
                api_key : api_key
            },

      url: url_base+"gestion_identifiants_backend/",

      success: function(response){

          var oData = JSON.parse(response);

          if (oData.return_code == 200)
          {
              var oResData = JSON.parse(oData.data);

              displayMessage("success","Identifiant supprimer de la base !");

              updateMenu();

              clearFormFields();

          }

      }
  });
}

function getCurrentIdentifiant()
{

    var oIdent = {
      "typeIdent":"",
      "id_ident":$("#Ident_id").val(),
      "libelle":$("#Ident_nom").val(),
      "login":$("#Ident_login").val(),
      "mdp":$("#Ident_mdp").val(),
      "commentaire":$("#Ident_commentaire").val()
    };

    var typeIdent = $("#Ident_type").val();

    oIdent.typeIdent = typeIdent;

    if (typeIdent == "site_web")
    {
        oIdent.type = $("#Ident_siteWeb_type").val();
        oIdent.lien = $("#Ident_siteWeb_lien").val();
    }

    if (typeIdent == "compte_messagerie")
    {
        oIdent.messagerie = $("#Ident_messagerie_nom").val();
        oIdent.lien = $("#Ident_messagerie_lien").val();
    }

    if (typeIdent == "application")
    {

        oIdent.app_type = $("#Ident_app_type").val();
        oIdent.nom_app = $("#Ident_app_nom").val();
        oIdent.version_app = $("#Ident_app_version").val();

    }

    if (typeIdent == "carte_bancaire")
    {

        oIdent.banque = $("#Ident_cb_banque").val();
        oIdent.numero = $("#Ident_cb_numero").val();
        oIdent.date_exp = $("#Ident_cb_date_expiration").val();

    }

    if (typeIdent == "serveur")
    {

        oIdent.type = $("#Ident_serveur_type").val();
        oIdent.lien_serveur = $("#Ident_serveur_lien").val();
        oIdent.adresse_ip = $("#Ident_serveur_adresse_ip").val();
        oIdent.nom_os = $("#Ident_serveur_os").val();
        oIdent.version_os = $("#Ident_serveur_os_version").val();

    }

    return oIdent;

}

function clearFormFields()
{
    for (var i = 0 ; i < arFieldsGroup.length ; i++)
    {

        var currentGroup = arFieldsGroup[i];

        var arFields = typeIdentDico[currentGroup];

        for (var j = 0 ; j < arFields.length ; j++)
        {
            $("#"+arFields[j]).val("");
        }

    }

}

function retriveDataBetweenIndexes(dataCol,beginIndex, endIndex){
    var retrieveData = [];
    if (dataCol && dataCol.length){
        if (beginIndex < endIndex && dataCol.length >= endIndex){
            for (var i = beginIndex; i< endIndex ; i++){
                retrieveData.push(dataCol[i]);
            }
        }
    }
    return retrieveData;
}

var nbreLienParPage = 10;
//Constantes catégorie site web
var currentPageSiteWeb = 1;
var nbrePagesSiteWeb = 1;
//Constantes catégorie messagerie
var currentPageMessagerie = 1;
var nbrePagesMessagerie = 1;
//Constantes catégorie application
var currentPageApplication = 1;
var nbrePagesApplication = 1;
//Constantes Carte Bancaire
var currentPageCarteBancaire = 1;
var nbrePagesCarteBancaire = 1;
//Constantes Serveur
var currentPageServeur = 1;
var nbrePagesServeur = 1;

//############################# Début traitement pagination catégorie Site Web ########################################
function goToPrevPageSiteWeb(){
    if (currentPageSiteWeb > 1){
        currentPageSiteWeb-= 1;
        $("#paginationLabelSiteWeb").html("<b>"+currentPageSiteWeb+" / "+nbrePagesSiteWeb+" "+(nbrePagesSiteWeb == 1 ? "page" : "pages")+"</b>");
        updateMenu();
    }

}

function goToNextPageSiteWeb(){
    if (currentPageSiteWeb < nbrePagesSiteWeb){
        currentPageSiteWeb+= 1;
        $("#paginationLabelSiteWeb").html("<b>"+currentPageSiteWeb+" / "+nbrePagesSiteWeb+" "+(nbrePagesSiteWeb == 1 ? "page" : "pages")+"</b>");
        updateMenu();
    }
}

function getWebSiteMenu(webSiteCol){
    var sCode = "<ul>";
    if (webSiteCol && webSiteCol.length){
        for (var i = 0 ; i < webSiteCol.length ; i++)
        {
            sCode += "<li><a href='#' onClick=\"loadIdentifiant('site_web',"+webSiteCol[i].id_ident+")\">"+webSiteCol[i].libelle+"</a></li>";
        }
    }

    //Construction de la barre de navigation
    if (nbrePagesSiteWeb > 1){
        sCode +="<li>";
        sCode +="<button class='btn btn-primary' onclick='goToPrevPageSiteWeb();return false;'><</button>";
        sCode +="<span id='paginationLabelSiteWeb'><b> "+currentPageSiteWeb+" / "+nbrePagesSiteWeb+" "+(nbrePagesSiteWeb == 1 ? "page" : "pages")+"</b><span>";
        sCode +=" <button class='btn btn-primary' onclick='goToNextPageSiteWeb();return false;'>></button>";
        sCode += "</ul>";
    }
    return sCode;
}

function buildWebSiteMenu(app_data){
    if (app_data && app_data.site_web && app_data.site_web.length){
        nbrePagesSiteWeb = Math.round(app_data.site_web.length / nbreLienParPage);
        var debutIndexSiteWeb = nbrePagesSiteWeb == 1 ? 0 : nbreLienParPage*(currentPageSiteWeb - 1);
        var maxSiteWeb = app_data.site_web.length > nbreLienParPage * (currentPageSiteWeb + 1) ? nbreLienParPage * currentPageSiteWeb : app_data.site_web.length;
        var newWebDataCol = [];
        
        for (var i = debutIndexSiteWeb ; i < maxSiteWeb ; i++)
        {
            newWebDataCol.push(app_data.site_web[i]);
        }
        var sCode = getWebSiteMenu(newWebDataCol);
        $("#list_ident_site_web").html(sCode);
    }
}

//############################# Fin traitement pagination catégorie Site Web ########################################

//############################# Début traitement pagination catégorie Messagerie ####################################
function goToPrevPageMessagerie(){
    if (currentPageMessagerie > 1){
        currentPageMessagerie-= 1;
        $("#paginationLabelMessagerie").html("<b>"+currentPageMessagerie+" / "+(nbrePagesMessagerie == 1 ? "page" : "pages")+"</b>");
        updateMenu();
    }

}

function goToNextPageMessagerie(){
    if (currentPageMessagerie < nbrePagesMessagerie){
        currentPageMessagerie+= 1;
        $("#paginationLabelMessagerie").html("<b>"+currentPageMessagerie+" / "+(nbrePagesMessagerie == 1 ? "page" : "pages")+"</b>");
        updateMenu();
    }
}

function getWebMessagerie(messagerieCol){
    var sCode = "<ul>";
    if (messagerieCol && messagerieCol.length){
        for (var i = 0 ; i < messagerieCol.length ; i++)
        {
            sCode += "<li><a href='#' onClick=\"loadIdentifiant('compte_messagerie',"+messagerieCol[i].id_ident+")\">"+messagerieCol[i].libelle+"</a></li>";
        }
    }
    //Construction de la barre de navigation
    if (nbrePagesMessagerie > 1){
        sCode +="<li>";
        sCode +="<button class='btn btn-primary' onclick='goToPrevPageMessagerie();return false;'><</button>";
        sCode +="<span id='paginationLabelMessagerie'><b> "+currentPageMessagerie+" / "+nbrePagesMessagerie+ " "+(nbrePagesMessagerie == 1 ? "page" : "pages")+"</b></span>";
        sCode +=" <button class='btn btn-primary' onclick='goToNextPageMessagerie();return false;'>></button>";
        sCode += "</ul>";
    }
    return sCode;
}

function buildMessagerieMenu(app_data){
    if (app_data && app_data.compte_messagerie && app_data.compte_messagerie.length){
        nbrePagesMessagerie = Math.round(app_data.compte_messagerie.length / nbreLienParPage);
        var debutIndexMessagerie = nbrePagesMessagerie == 1 ? 0 : nbreLienParPage*(currentPageMessagerie - 1);
        var maxMessagerie = app_data.compte_messagerie.length > nbreLienParPage * (currentPageMessagerie + 1) ? nbreLienParPage * currentPageMessagerie : app_data.compte_messagerie.length;
        var newMessagerieDataCol = [];
        
        for (var i = debutIndexMessagerie ; i < maxMessagerie ; i++)
        {
            newMessagerieDataCol.push(app_data.compte_messagerie[i]);
        }
        var sCode = getWebMessagerie(newMessagerieDataCol);
        $("#list_ident_messagerie").html(sCode);
    }
}

//############################# Fin traitement pagination catégorie Messagerie ###################################

//############################# Début traitement pagination catégorie Application ####################################
function goToPrevPageApplication(){
    if (currentPageApplication > 1){
        currentPageApplication-= 1;
        $("#paginationLabelApplication").html("<b>"+currentPageApplication+" / "+(nbrePagesApplication == 1 ? "page" : "pages")+"</b>");
        updateMenu();
    }

}

function goToNextPageApplication(){
    if (currentPageApplication < nbrePagesApplication){
        currentPageApplication+= 1;
        $("#paginationLabelApplication").html("<b>"+currentPageApplication+" / "+(nbrePagesApplication == 1 ? "page" : "pages")+"</b>");
        updateMenu();
    }
}

function getWebApplication(applicationCol){
    var sCode = "<ul>";
    if (applicationCol && applicationCol.length){
        for (var i = 0 ; i < applicationCol.length ; i++)
        {
            sCode += "<li><a href='#' onClick=\"loadIdentifiant('application',"+applicationCol[i].id_ident+")\">"+applicationCol[i].libelle+"</a></li>";
        }
    }
    sCode += "";
    //Construction de la barre de navigation
    if (nbrePagesApplication > 1){
        sCode +="<li>";
        sCode +="<button class='btn btn-primary' onclick='goToPrevPageApplication();return false;'><</button>";
        sCode +="<span id='paginationLabelApplication'><b> "+currentPageApplication+" / "+nbrePagesApplication+ " "+(nbrePagesApplication == 1 ? "page" : "pages")+"</b></span>";
        sCode +=" <button class='btn btn-primary' onclick='goToNextPageApplication();return false;'>></button>";
        sCode += "</ul>";
    }
    return sCode;
}

function buildApplicationMenu(app_data){
    if (app_data && app_data.application && app_data.application.length){
        nbrePagesApplication = Math.round(app_data.application.length / nbreLienParPage);
        var debutIndexApplication = nbrePagesApplication == 1 ? 0 : nbreLienParPage*(currentPageApplication - 1);
        var maxApplication = app_data.application.length > nbreLienParPage * (currentPageApplication + 1) ? nbreLienParPage * currentPageApplication : app_data.application.length;
        var newApplicationDataCol = [];

        for (var i = debutIndexApplication ; i < maxApplication ; i++)
        {
            newApplicationDataCol.push(app_data.application[i]);
        }
        var sCode = getWebApplication(newApplicationDataCol);
        $("#list_ident_application").html(sCode);
    }
}

//############################# Fin traitement pagination catégorie Application ###################################

//############################# Début traitement pagination catégorie Carte Bancaire ####################################
function goToPrevPageCarteBancaire(){
    if (currentPageCarteBancaire > 1){
        currentPageCarteBancaire-= 1;
        $("#paginationLabelCarteBancaire").html("<b>"+currentPageCarteBancaire+" / "+(nbrePagesCarteBancaire == 1 ? "page" : "pages")+"</b>");
        updateMenu();
    }

}

function goToNextPageCarteBancaire(){
    if (currentPageCarteBancaire < nbrePagesCarteBancaire){
        currentPageCarteBancaire+= 1;
        $("#paginationLabelCarteBancaire").html("<b>"+currentPageCarteBancaire+" / "+(nbrePagesCarteBancaire == 1 ? "page" : "pages")+"</b>");
        updateMenu();
    }
}

function getWebCarteBancaire(carteBancaireCol){
    var sCode = "<ul>";
    if (carteBancaireCol && carteBancaireCol.length){
        for (var i = 0 ; i < carteBancaireCol.length ; i++)
        {
            sCode += "<li><a href='#' onClick=\"loadIdentifiant('carte_bancaire',"+carteBancaireCol[i].id_ident+")\">"+carteBancaireCol[i].libelle+"</a></li>";
        }
    }
    //Construction de la barre de navigation
    if (nbrePagesCarteBancaire > 1){
        sCode +="<li><center>";
        sCode +="<button class='btn btn-primary' onclick='goToPrevPageCarteBancaire();return false;'><</button>";
        sCode +="<span id='paginationLabelCarteBancaire'><b> "+currentPageCarteBancaire+" / "+nbrePagesCarteBancaire+ " "+(nbrePagesCarteBancaire == 1 ? "page" : "pages")+"</b><span>";
        sCode +=" <button class='btn btn-primary' onclick='goToNextPageCarteBancaire();return false;'>></button>";
        sCode += "</center></ul>";
    }
    return sCode;
}

function buildCarteBancaireMenu(app_data){
    if (app_data && app_data.carte_bancaire && app_data.carte_bancaire.length){
        nbrePagesCarteBancaire = Math.round(app_data.carte_bancaire.length / nbreLienParPage);
        var debutIndexCarteBancaire = nbrePagesCarteBancaire == 1 ? 0 : nbreLienParPage*(currentPageCarteBancaire - 1);
        var maxCarteBancaire = app_data.carte_bancaire.length > nbreLienParPage * (currentPageCarteBancaire + 1) ? nbreLienParPage * currentPageCarteBancaire : app_data.carte_bancaire.length;
        var newCarteBancaireDataCol = [];

        for (var i = debutIndexCarteBancaire ; i < maxCarteBancaire ; i++)
        {
            newCarteBancaireDataCol.push(app_data.carte_bancaire[i]);
        }
        var sCode = getWebCarteBancaire(newCarteBancaireDataCol);
        $("#list_ident_cb").html(sCode);
    }
}

//############################# Fin traitement pagination catégorie Carte Bancaire ###################################

//############################# Début traitement pagination catégorie Serveur ####################################
function goToPrevPageServeur(){
    if (currentPageServeur > 1){
        currentPageServeur-= 1;
        $("#paginationLabelServeur").html("<b>"+currentPageServeur+" / "+(nbrePagesServeur == 1 ? "page" : "pages")+"</b>");
        updateMenu();
    }

}

function goToNextPageServeur(){
    if (currentPageServeur < nbrePagesServeur){
        currentPageServeur+= 1;
        $("#paginationLabelServeur").html("<b>"+currentPageServeur+" / "+(nbrePagesServeur == 1 ? "page" : "pages")+"</b>");
        updateMenu();
    }
}

function getWebServeur(carteServeurCol){
    var sCode = "<ul>";
    if (carteServeurCol && carteServeurCol.length){
        for (var i = 0 ; i < carteServeurCol.length ; i++)
        {
            sCode += "<li><a href='#' onClick=\"loadIdentifiant('serveur',"+carteServeurCol[i].id_ident+")\">"+carteServeurCol[i].libelle+"</a></li>";
        }
    }
    //Construction de la barre de navigation
    if (nbrePagesServeur > 1){
        sCode +="<li>";
        sCode +="<button class='btn btn-primary' onclick='goToPrevPageServeur();return false;'><</button>";
        sCode += " <button class='btn btn-primary'>1</button> ";
        sCode +="<span id='paginationLabelServeur'><b> "+currentPageServeur+" / "+nbrePagesServeur+ " "+(nbrePagesServeur == 1 ? "page" : "pages")+"</b></span>";
        sCode += "<button class='btn btn-primary'>"+nbrePagesServeur+"</button>";
        sCode +=" <button class='btn btn-primary' onclick='goToNextPageServeur();return false;'>></button>";
        sCode += "</ul>";
    }
    return sCode;
}

function buildServeurMenu(app_data){
    if (app_data && app_data.serveur && app_data.serveur.length){
        nbrePagesServeur = Math.round(app_data.serveur.length / nbreLienParPage);
        var debutIndexServeur = nbrePagesServeur == 1 ? 0 : nbreLienParPage*(currentPageServeur - 1);
        var maxServeur = app_data.serveur.length > nbreLienParPage * (currentPageServeur + 1) ? nbreLienParPage * currentPageServeur : app_data.serveur.length;
        var newServeurDataCol = [];
        
        for (var i = debutIndexServeur ; i < maxServeur ; i++)
        {
            newServeurDataCol.push(app_data.serveur[i]);
        }
        var sCode = getWebServeur(newServeurDataCol);
        $("#list_ident_serveur").html(sCode);
    }
}

//############################# Fin traitement pagination catégorie Serveur ###################################

function updateMenu()
{

    $.ajax({
        method: "GET",
        data: {   operation : "enum",
                  api_key : api_key
              },

        url: url_base+"gestion_identifiants_backend/",

        success: function(response){

            var oRes = JSON.parse(response);

            if (oRes.return_code == 200)
            {
                app_data = oRes.data;
                //Chargement des identifiants site web
                buildWebSiteMenu(app_data);
                //Chargement des identifiants messagerie
                buildMessagerieMenu(app_data);
                //Chargement des identifiants application
                buildApplicationMenu(app_data);
                //Chargement des identifiants carte bancaire
                buildCarteBancaireMenu(app_data);
                //Chargement des identifiants serveur
                buildServeurMenu(app_data);
                
            }
        }
    });

}