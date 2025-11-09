// fond semi-transparent pourle popup
// Pour afficher le fond semi-transparent
function showLoadingPopup() {
  document.querySelector('.overlay').style.display = 'block';
}

// Pour masquer le fond semi-transparent
function hideLoadingPopup() {
  document.querySelector('.overlay').style.display = 'none';
}

// // *********************************************Button excel import

const realFileBtn = document.getElementById("real-file-excel");
const excelFileBtn = document.getElementById("import-excel");
const choosedFile = document.getElementById("imported-excel");
const commenrDivisionBouton = document.getElementById("division-excel-button");
const telechargerFichierBouton = document.getElementById("telecharger-fichier-segmente");
const stopProcess = document.getElementById('stop-process');

// Variables pour le chemin du fichier, le chemin de téléchargement, et le nom du fichier
var file_path = "";
let telechargement_path = '';
let nom_du_fichier = '';

// Fonction pour obtenir le nom et le chemin du fichier sélectionné à partir de python
async function getFileName() {
  try {
    file_path = await eel.select_and_send_excel_path()();

    if (file_path) {
      const pathSeparator = file_path.includes("\\") ? "\\" : "/";
      const parts = file_path.split(pathSeparator);
      const fileName = parts[parts.length - 1];
      return fileName;
    }

  } catch (error) {
    console.error("Erreur : " + error);
  }
  return "";
}

// Écoute le clic sur excelFileBtn et exécute la fonction getFilePath pour obtenir le chemin du fichier séléctionné
excelFileBtn.addEventListener("click", async function() {
  const NomFichier = await getFileName();
  if (NomFichier != "") {
    // Afficher le fichier choisi
    choosedFile.removeAttribute("hidden");
    excelFileBtn.setAttribute("hidden", "hidden");
    choosedFile.querySelector("span").innerHTML = NomFichier;
    // activer le button de division une fois le fichier séléctionné
    commenrDivisionBouton.style.backgroundColor = "#009dcc";
    commenrDivisionBouton.style.color = "#ffff";
    commenrDivisionBouton.disabled = false;
  }
  else {
    // Réinitialiser le bouton si aucun fichier n'est choisi
    excelFileBtn.innerHTML = '<i class="fa-regular fa-file-excel excel-icon"></i><br>Importer fichier Excel';
  }
});

// Gestion du clic sur choosedFile pour revenir à l'état initial (cas de la suppression du fichier avec le button corbeille)
choosedFile.addEventListener("click", function(){
    excelFileBtn.removeAttribute("hidden");
    choosedFile.setAttribute("hidden", "hidden");
    commenrDivisionBouton.style.backgroundColor = "#f5f6f8";
    commenrDivisionBouton.style.color = "#adb3c4";
    commenrDivisionBouton.disabled = true;
});

// Fonction pour diviser le fichier Excel
eel.expose(divisionExcel);
async function divisionExcel() {
  const loadingPopup = document.getElementById("loading-popup");
  loadingPopup.style.display = "block";
  showLoadingPopup();

  // Récupérer les valeurs des champs
  var nomPage = document.getElementById('nomPage').value;
  var lignesParPage = document.getElementById('lignesParPage').value;
  var lignesParPagetraite = document.getElementById('nomPageExcel_traite').value;
  
  // Traitement de la valeur par défaut si le champ du nom de la page du fichier excel à traitée est vide
  if (lignesParPagetraite.trim() === '') {
    lignesParPagetraite='Feuil1';
  }
  else{
    lignesParPagetraite=lignesParPagetraite;
  }
  // Vérifier si les champs sont vides et appele de la fonction python correspondante à la division du fichier
  if (nomPage.trim() === '') {
    if (lignesParPage.trim() === '') {
      eel.division_excel(file_path,'BATCH',971,lignesParPagetraite);
    }
    else {
      eel.division_excel(file_path, 'BATCH', lignesParPage,lignesParPagetraite);
    }
  }
  else {
    if (lignesParPage.trim() === '') {
      eel.division_excel(file_path, page_name=nomPage,971,lignesParPagetraite);
    }
    else {
      eel.division_excel(file_path, nomPage, lignesParPage,971,lignesParPagetraite);
    }
  }

  // Réinitialiser le processus d'arrêt (pour le button cancel)
  eel.reinitialize_stop()
  
}

// Soumettre le formulaire 
commenrDivisionBouton.addEventListener("click", function() {
  divisionExcel(); 
});




eel.expose(close_loading_popup); // Expose la fonction pour être appelée depuis Python

// Fonction pour fermer le popup de chargement quand la division du fichier est terminée (déclanché par python)
function close_loading_popup(chemin_telechargement, nom_fichier) {
  console.log('closing popup');
  const loadingPopup = document.getElementById("loading-popup");
  loadingPopup.style.display = "none";
  hideLoadingPopup();
  // Mettre à jour le bouton de téléchargement
  telechargerFichierBouton.style.backgroundColor = "#009dcc";
  telechargerFichierBouton.style.color = "#ffff";
  telechargerFichierBouton.innerHTML = '<i class="fa-solid fa-download"></i> Télécharger le fichier segmenté';
  telechargerFichierBouton.disabled = false;
  // Mettre à jour les variables pour le téléchargement
  telechargement_path = chemin_telechargement;
  nom_du_fichier = nom_fichier;
}

//------------button telecharger le fichier
// Éléments du DOM pour gérer le téléchargement et les popups
const downloadPopup = document.getElementById("download-popup");
const errorPopup = document.getElementById("error-popup");
const closePopupButton = document.getElementById("close-popup-button");
const closeLoadingPopupButton = document.getElementById("close-loading-popup-button");
const closePopupButton2 = document.getElementById("close-popup-button2");

// Gestion du téléchargement du fichier segmenté
telechargerFichierBouton.addEventListener("click", async function() {
  var folder_path = await eel.select_and_send_folder_path()();
  const downloaded_path = await eel.telecharger_fichier(nom_du_fichier, telechargement_path, folder_path)();
  downloadPopup.style.display = "block";
  document.getElementById("chemin-a-remplir").innerHTML = downloaded_path;
  telechargerFichierBouton.style.backgroundColor = "#75bb41";
  telechargerFichierBouton.style.color = "#ffff";
  telechargerFichierBouton.innerHTML = '<i class="fa-solid fa-check"></i> Téléchargement effectué';
});

// Gestion de la fermeture des popups avec la petite croix
closePopupButton.addEventListener("click", function() {
  downloadPopup.style.display = "none";
});

closePopupButton2.addEventListener("click", function() {
  errorPopup.style.display = "none";
});

// Écoute de l'événement de touche Échap pour fermer les popups
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    downloadPopup.style.display = "none";
    errorPopup.style.display = "none";
  }
});


//gestion d'exception
eel.expose(gestion_exception);

//dans le cas ou il y a une erreur dans le fonctionnement de python le popup d'erreur apparaitera
function gestion_exception () {
  const loadingPopup = document.getElementById("loading-popup");
  loadingPopup.style.display = "none";
  hideLoadingPopup();
  errorPopup.style.display = "block";
}


// Fermer la connexion Python lors de la fermeture de la fenêtre
window.addEventListener("beforeunload", function(event) {
  if (event.target.activeElement.tagName !== 'A') {
    eel.close_python(); 
  }});

// Bouton pour arrêter le processus de division 
closeLoadingPopupButton.addEventListener("click", function() {
  eel.close_process();
  const loadingPopup = document.getElementById("loading-popup");
  stopProcess.style.display = "block";//affichage du popup d'attente
  loadingPopup.style.display = "none";
});

//fermeture du popup d'attente quand la division sera bien annulé
eel.expose(stop_process);
function stop_process() {
  stopProcess.style.display = "none";
  errorPopup.style.display = "none";
  hideLoadingPopup();
}
