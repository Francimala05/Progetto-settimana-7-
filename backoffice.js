const search = new URLSearchParams(window.location.search);    // ricerca nella Window.location.search
const id = search.get("appId");     //metodo che ci genera la chiave "appId che ci troveremo poi nell'homepage"
const URL = id ? "https://striveschool-api.herokuapp.com/api/product/" + id : "https://striveschool-api.herokuapp.com/api/product/";  //per entrambi i metodi stesso EndPoint
const method = id ? "PUT" : "POST";

const handleSubmit = e => {  //funzione avviata al click del pulsante

  e.preventDefault();   // evitiamo il ricaricamento della pagina al click del bottone submit 
 
  const newProduct = {  //creazione oggetto generato dal backOffice e con tutti e 5 i valori del form
    name: e.target.elements.name.value,
    description: e.target.elements.description.value,
    imageUrl: e.target.elements.imageUrl.value,
    brand: e.target.elements.brand.value,
    price: e.target.elements.price.value
  };

  fetch(URL, {   //richiamo del Fetch
    method: method,
    body: JSON.stringify(newProduct), // ricordiamo di fare la stringhifizzazione dell'oggetto nativo
    
    headers: {

      "Content-Type": "application/json",  //header fondamentale anche assieme alla key
      Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNjYWQ3NDRkOGViMzAwMTVhNGE1NGUiLCJpYXQiOjE3MzIwMjk4MTIsImV4cCI6MTczMzIzOTQxMn0.1pK5a1erZzJfD6CE8fLL6z5rW4ZGMWg1TtoDJJwXqwE"
    }
  })
    .then(resp => {  //primo then di verifica e trasformazione formato JSON
      if (resp.ok) {
        return resp.json();
      }
    })
    .then(newProduct => {  //il dato è così arrivato
      if (id) {
        alert("abbiamo modificato l'offerta con id: " + newProduct._id); //messaggio per modifica
      } else {
        e.target.reset(); 
        alert("abbiamo creato una nuova offerta con id: " + newProduct._id);  //messaggio per creazione
      }
    })
    .catch(err => console.log(err)); //catch ci permette di capire se ci sono errori
};

const handleDelete = () => {  //funzione per l'eliminazione dell'oggetto
  fetch(URL, {   //richiamo del Fetch
    method: "DELETE" , //questa volta utilizzeremo metodo DELETE
    headers: {
      
      "Content-Type": "application/json",  //specifichiamo content e autorizzazione
      Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNjYWQ3NDRkOGViMzAwMTVhNGE1NGUiLCJpYXQiOjE3MzIwMjk4MTIsImV4cCI6MTczMzIzOTQxMn0.1pK5a1erZzJfD6CE8fLL6z5rW4ZGMWg1TtoDJJwXqwE"
    }
  }) 
    .then(resp => {  //primo then di verifica per evitare successivi errori
      if (resp.ok) {
        return resp.json();  //trasformazione JSON
      }
    })
    .then(deletedObj => {  //secondo then di arrivo dei dati
      alert("l'offerta con id " + deletedObj._id + " è stata eliminata con successo");  //all' arrivo dei dati un alert ci informerà e creerà l'ID
      window.location.assign("/");
    })
    .catch(err => console.log(err)); //catch di controllo
};


window.addEventListener("DOMContentLoaded", function () {  // al caricarimento della pagina colleghiamo l'evento submit sul nostro form
  const form = document.querySelector("form"); // richiamiamo il form
  form.onsubmit = handleSubmit;  //assegnamolo alla funzione
  const submitBtn = document.querySelector("button[type=submit]");   //richiamiamo tutti i bottoni
  const deleteBtn = document.getElementById("deleteBtn");
  const subtitle = document.getElementById("subtitle");  //richiamiamo il sottotitolo che sarà variabile

  if (id) {  //per modificare
    subtitle.innerText = "➡️Modifica Offerta";  //campi diversi  per modifica
    submitBtn.classList.add("btn-success");
    submitBtn.innerText = "Modifica"; 
    deleteBtn.classList.remove("d-none");     // il bottone delete diventa visibile
    deleteBtn.onclick = handleDelete;

    fetch(URL)  //richiamiamo fetch 
      .then(resp => {  // primo then di verifica
        if (resp.ok) { 
          return resp.json();  //risponde in formato JSON
        } else {
          throw new Error(`Ci dispiace, non siamo riusciti a reperire i dati. Errore: ${response.statusText}`);  //qualora ci fossero errori
        }
      })
      .then(product => {  //secondo then di arrivo dati
        console.log(product);
        const { name, description,brand,imageUrl, price } = product;         // prepopolazione campi dei 5 input
        document.getElementById("name").value = name;
        document.getElementById("brand").value = brand;
        document.getElementById("imageUrl").value = imageUrl;
        document.getElementById("description").value = description;
        document.getElementById("price").value = price;
      });
  } else {
    subtitle.innerText = "➡️Crea Offerta";     //campi diversi per creazione
    submitBtn.classList.add("btn-success");
  }
});