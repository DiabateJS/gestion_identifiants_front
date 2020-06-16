var arFieldsGroup = [
    "common",
    "site_web",
    "carte_bancaire",
    "application",
    "compte_messagerie",
    "serveur"
];

var typeIdentDico = {

    "common":[
        "Ident_type",
        "Ident_id",
        "Ident_nom",
        "Ident_login",
        "Ident_mdp",
        "Ident_commentaire"
    ],

    "site_web": [
        "Ident_siteWeb_type",
        "Ident_siteWeb_lien",
        "Ident_siteWeb_type",
    ],
    "carte_bancaire":[
        "Ident_cb_banque",
        "Ident_cb_numero",
        "Ident_cb_date_expiration"
    ],
    "application":[
        "Ident_app_type",
        "Ident_app_nom",
        "Ident_app_version"
    ],
    "compte_messagerie":[
        "Ident_messagerie_nom",
        "Ident_messagerie_lien"
    ],
    "serveur":[
        "Ident_serveur_type",
        "Ident_serveur_lien",
        "Ident_serveur_adresse_ip",
        "Ident_serveur_os",
        "Ident_serveur_os_version"
    ],
    "autre":[]
};

function displayMessage(type,msg)
{
    try
    {
        if (type == "success")
        {
            swal({
              type: 'success',
              title: "Application gestion d'identifiants",
              text: msg
            });
        }
        else if (type == "error")
        {
            swal({
              type: 'error',
              title: "Application gestion d'identifiants",
              text: msg
            });
        }
        else
        {
            swal({
              title: "Application gestion d'identifiants",
              text: msg
            });
        }
    }
    catch(e)
    {
        console.log("[FCT::displayMessage] - Erreur : e.message = "+e.message);
    }

}