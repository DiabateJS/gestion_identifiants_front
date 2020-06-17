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

function getWebSiteMenu(webSiteCol){
    var sCode = "<ul>";
    var nbrePages = 1;
    var currentPage = 1;
    if (webSiteCol && webSiteCol.length){
        var max = webSiteCol.length > 10 ? 10 : webSiteCol.length; 
        //Calcul de pagination
        nbrePages = Math.round(webSiteCol.length / 10 );
        for (var i = 0 ; i < max ; i++)
        {
            sCode += "<li><a href='#' onClick=\"loadIdentifiant('site_web',"+webSiteCol[i].id_ident+")\">"+webSiteCol[i].libelle+"</a></li>";
        }
    }
    sCode += "<li><center><b> 1 / "+nbrePages+" pages</b></center></li>";
    //Construction de la barre de navigation
    if (nbrePages > 1){
        sCode +="<li><center>";
        sCode +="<button class='btn btn-primary'><</button>";
        sCode += " <button class='btn btn-warning'>"+currentPage+"</button> ";
        sCode +=" ... ";
        sCode += "<button class='btn btn-primary'>"+webSiteCol.length+"</button>";
        sCode +=" <button class='btn btn-primary'>></button>";
        sCode += "</center></ul>";
    }
    return sCode;
}

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

                var sCode = getWebSiteMenu(app_data.site_web);
                $("#list_ident_site_web").html(sCode);

                sCode = "<ul>";
                for (var i = 0 ; i < app_data.compte_messagerie.length ; i++)
                {
                    sCode += "<li><a href='#' onClick=\"loadIdentifiant('compte_messagerie',"+app_data.compte_messagerie[i].id_ident+")\">"+app_data.compte_messagerie[i].libelle+"</a></li>";
                }
                sCode += "</ul>";
                $("#list_ident_messagerie").html(sCode);

                sCode = "<ul>";
                for (var i = 0 ; i < app_data.application.length ; i++)
                {
                    sCode += "<li><a href='#' onClick=\"loadIdentifiant('application',"+app_data.application[i].id_ident+")\">"+app_data.application[i].libelle+"</a></li>";
                }
                sCode += "</ul>";
                $("#list_ident_application").html(sCode);

                sCode = "<ul>";
                for (var i = 0 ; i < app_data.carte_bancaire.length ; i++)
                {
                    sCode += "<li><a href='#' onClick=\"loadIdentifiant('carte_bancaire',"+app_data.carte_bancaire[i].id_ident+")\">"+app_data.carte_bancaire[i].libelle+"</a></li>";
                }
                sCode += "</ul>";
                $("#list_ident_cb").html(sCode);

                sCode = "<ul>";
                for (var i = 0 ; i < app_data.serveur.length ; i++)
                {
                    sCode += "<li><a href='#' onClick=\"loadIdentifiant('serveur',"+app_data.serveur[i].id_ident+")\">"+app_data.serveur[i].libelle+"</a></li>";
                }
                sCode += "</ul>";
                $("#list_ident_serveur").html(sCode);

            }
        }
    });

}