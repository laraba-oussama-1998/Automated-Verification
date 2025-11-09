const realFileBtn = document.getElementById("real-file-excel");
const excelFileBtn = document.getElementById("import-excel");
const choosedFile = document.getElementById("imported-excel");
const commenrVerificationButton = document.getElementById("test");
const downloadButton = document.getElementById("dowload-button");

// Variables pour le chemin de téléchargement, et le nom du fichier
let telechargement_path = '';
let nom_du_fichier = '';

// *********************************************Button excel
// Variables pour le chemin du fichier excel
var file_path_excl = ""

// Fonction pour obtenir le nom et le chemin du fichier excel sélectionné à partir de python
async function getExclName() {
  try {
    file_path_excl = await eel.select_and_send_excel_path()();

    if (file_path_excl) {
      const pathSeparator = file_path_excl.includes("\\") ? "\\" : "/";
      const parts = file_path_excl.split(pathSeparator);
      const fileName = parts[parts.length - 1];
      return fileName;
    }

  } catch (error) {
    console.error("Erreur : " + error);
  }
  return "";
}

// Écoute le clic sur excelFileBtn et exécute la fonction getExclName pour obtenir le chemin du fichier séléctionné
excelFileBtn.addEventListener("click", async function() {
  const NomFichier = await getExclName();
  if (NomFichier != "") {
    // Afficher le fichier choisi
    choosedFile.removeAttribute("hidden");
    excelFileBtn.setAttribute("hidden", "hidden");
    choosedFile.querySelector("span").innerHTML = NomFichier;
    if (imageFileBtn.hasAttribute("hidden")){
    // activer le button de division une fois le fichier séléctionné et avoir vérifier que les images aussi ont été séléctionnés
      commenrVerificationButton.style.backgroundColor = "#009dcc";
      commenrVerificationButton.style.color = "#ffff";
      commenrVerificationButton.disabled = false;
      }
    
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
    commenrVerificationButton.style.backgroundColor = "#f5f6f8";
    commenrVerificationButton.style.color = "#adb3c4";
    commenrVerificationButton.disabled = true;
});
// *****************************************************Button images
const realImgBtn = document.getElementById("real-file-image");
const imageFileBtn = document.getElementById("import-image");
const choosedImage = document.getElementById("imported-image");
const closeLoadingPopupButton = document.getElementById("close-loading-popup-button");

// Variables pour le chemin du fichier PDF des images
var file_path_img = ""

// Fonction pour obtenir le nom et le chemin du fichier PDF sélectionné à partir de python
async function getImgName() {
  try {
    file_path_img = await eel.select_and_send_pdf_path()();

    if (file_path_img) {
      const pathSeparator = file_path_img.includes("\\") ? "\\" : "/";
      const parts = file_path_img.split(pathSeparator);
      const fileName = parts[parts.length - 1];
      return fileName;
    }

  } catch (error) {
    console.error("Erreur : " + error);
  }
  return "";
}


// fond transparent pourle popup
// Pour afficher le fond semi-transparent
function showLoadingPopup() {
  document.querySelector('.overlay').style.display = 'block';
}

// Pour masquer le fond semi-transparent
function hideLoadingPopup() {
  document.querySelector('.overlay').style.display = 'none';
}

// Écoute le clic sur excelFileBtn et exécute la fonction getImgName pour obtenir le chemin du fichier séléctionné
imageFileBtn.addEventListener("click", async function() {
  const NomFichier = await getImgName();
  if (NomFichier != "") {
    choosedImage.removeAttribute("hidden");
    imageFileBtn.setAttribute("hidden", "hidden");
    choosedImage.querySelector("span").innerHTML = NomFichier;
    if (excelFileBtn.hasAttribute("hidden")){
      // activer le button de division une fois les fichiers pdf et excel séléctionné
      commenrVerificationButton.style.backgroundColor = "#009dcc";
      commenrVerificationButton.style.color = "#ffff";
      commenrVerificationButton.disabled = false;
      }
    
  }
  else {
    imageFileBtn.innerHTML = '<i class="fa-regular fa-images image-icon"></i><br>Importer les images';
  }
});
// Gestion du clic sur choosedFile pour revenir à l'état initial (cas de la suppression du fichier avec le button corbeille)
choosedImage.addEventListener("click", function(){
    imageFileBtn.removeAttribute("hidden");
    choosedImage.setAttribute("hidden", "hidden");
    commenrVerificationButton.style.backgroundColor = "#f5f6f8";
    commenrVerificationButton.style.color = "#adb3c4";
    commenrVerificationButton.disabled = true;
});
// *********************************************Button verification

// Fonction pour lancer la vérificationdes comptes  avec le button dédié
commenrVerificationButton.addEventListener('click', function() {
  const loadingPopup = document.getElementById("loading-popup");
  loadingPopup.style.display = "block";
  showLoadingPopup();

  var NomFeuil = document.getElementById('nomPageExcel_1').value;
  var Colonne = document.getElementById('nomColonneExcel1').value;
  //mettre les valeur par défaut si les champs sont vides
  if (NomFeuil.trim() === '') {
    NomFeuil='Feuil1';
    }
  else{
    NomFeuil=NomFeuil;
    }
  if (Colonne.trim() === '') {
    Colonne='CompteA';
    }
  else{
    Colonne=Colonne;
    }
  //appele de la focntion de vérification des comptes
  eel.main(file_path_excl, file_path_img, NomFeuil, Colonne);

});



//*********************************affichage du résultat */
eel.expose(close_loading_popup); // Expose la fonction pour être appelée depuis Python
//quand la fonction python termine son traitement, elle appel cette fonction qui 
//ferme le popup de chargement et qui active le button de téléchargement
function close_loading_popup(chemin_telechargement, nom_fichier, df) {
  if (df) {
    //on recois le dataframe qui contient les comptes à vérifier manuellement à partir de python
    const loadingPopup = document.getElementById("loading-popup");
    loadingPopup.style.display = "none";
    hideLoadingPopup();
    //affichage des comptes dans la fenetre 
    document.querySelector('#dataframe-row table').innerHTML = df;
    document.getElementById("dataframe-row").removeAttribute("hidden");
    downloadButton.style.backgroundColor = "#009dcc";
    downloadButton.style.color = "#ffff";
    downloadButton.innerHTML = '<i class="fa-solid fa-download"></i> Exporter au format excel';
    downloadButton.disabled = false;
    //mise à jour des variables pour le téléchargement
    telechargement_path = chemin_telechargement;
    nom_du_fichier = nom_fichier;
  }
  else {
    //si df est None et donc que tout les comptes sont vérifiés
    document.getElementById("dataframe").innerHTML = "<p>Pas d'erreurs dans la vérification des comptes CCP</p>";
  }
}

//gestion d'exception
eel.expose(gestion_exception);
//en cas d'erreurs dans python le popup d'erreur sera affiché
function gestion_exception () {
  const loadingPopup = document.getElementById("loading-popup");
  loadingPopup.style.display = "none";
  hideLoadingPopup();
  errorPopup.style.display = "block";
}

//button telecharger 
const downloadPopup = document.getElementById("download-popup");
const closePopupButton = document.getElementById("close-popup-button");
const closePopupButton2 = document.getElementById("close-popup-button2");
const errorPopup = document.getElementById("error-popup");
const stopProcess = document.getElementById('stop-process');

//fonction du button télécharger qui effectue le téléchargement grace à python
downloadButton.addEventListener("click", async function() {
  var folder_path = await eel.select_and_send_folder_path()();
  const downloaded_path = await eel.telecharger_fichier(nom_du_fichier, telechargement_path, folder_path)();
  downloadPopup.style.display = "block";
  document.getElementById("chemin-a-remplir").innerHTML = downloaded_path;
  downloadButton.style.backgroundColor = "#75bb41";
  downloadButton.style.color = "#ffff";
  downloadButton.innerHTML = '<i class="fa-solid fa-check"></i>  Exportation effectué';
});

//fermeture des popups avec la petite croix
closePopupButton.addEventListener("click", function() {
  downloadPopup.style.display = "none";
});

closePopupButton2.addEventListener("click", function() {
  errorPopup.style.display = "none";
});

// Écoute de l'événement de touche Échap pour la fermeture des popups
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    downloadPopup.style.display = "none";
    errorPopup.style.display = "none";
  }
});


// Fermer la connexion Python lors de la fermeture de la fenêtre
window.addEventListener("beforeunload", function(event) {
  if (event.target.activeElement.tagName !== 'A') {
    eel.close_python(); // Cette fonction doit être exposée depuis Python
  }
});

// Bouton pour arrêter le processus de division 
closeLoadingPopupButton.addEventListener("click", function() {
  eel.close_process();
  console.log('close button');
  const loadingPopup = document.getElementById("loading-popup");
  stopProcess.style.display = "block";
  loadingPopup.style.display = "none";
});

//fermeture du popup d'attente quand la division sera bien annulé
eel.expose(stop_process);
function stop_process() {
  stopProcess.style.display = "none";
  errorPopup.style.display = "none";
  hideLoadingPopup();
}