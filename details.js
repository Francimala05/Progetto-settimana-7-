
const URL = "https://striveschool-api.herokuapp.com/api/product/"; //richiamo all'endPoint
const search = new URLSearchParams(window.location.search); // ricerca nella Window.location.search
const id = search.get("appId"); //metodo che ci genera la chiave "appId che ci troveremo poi nell'homepage"

window.addEventListener("DOMContentLoaded", function () { //funcione addEvenListener che ci permette di ritornare i dati che vengono ricevuti nell'URL
  fetch(URL + id, {  //chiamiamo la fetch con il nostro endPoint e con l'id, inoltre gli diamo la key per l'Authorization

    headers: {
      
      "Content-Type": "application/json",
      Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNjYWQ3NDRkOGViMzAwMTVhNGE1NGUiLCJpYXQiOjE3MzIwMjk4MTIsImV4cCI6MTczMzIzOTQxMn0.1pK5a1erZzJfD6CE8fLL6z5rW4ZGMWg1TtoDJJwXqwE"
    }
  })
    .then(resp => {    //primo then per verifica e arrivo oggetto
      if (resp.ok) {
        return resp.json(); //trasformazione JSON
      } else {
        throw new Error(`Ci dispiace,non troviamo il prodotto selezionato. Errore: ${response.statusText}`);  //qualora la verifica non funzionasse
      }
    })
    .then(product => {  //secondo then per ottenere il dato
      const { name,brand, description, price,_id, createdAt, updatedAt, imageUrl } = product;  //elementi Product
      const productContainer = document.getElementById("dettagliofferta");  //richiamiamo il contenitore
      // svuotiamo il contenitore  e creiamo la struttura
      productContainer.innerHTML = `
        
                    <h1 class="display-5">${name}</h1>
                     <p class="lead">${brand}</p>
                    <p class="lead">${description}</p>
                    <p class="display-6 text-primary">${price > 0 ? price + "€" : "gratis"}</p>
                    <h6 class="bg-primary ps-2 py-3">Dettagli del server:</h6>
                    <ul class="list-group">
                        <li class="list-group-item ps-2"><strong>ID:</strong> ${_id}</li>
                        <li class="list-group-item ps-2"><strong>CREATO:</strong> ${new Date(createdAt).toLocaleString()}</li>
                        <li class="list-group-item ps-2"><strong>AGGIORNATO:</strong> ${new Date(updatedAt).toLocaleString()}</li>
                    </ul>
                    <button class="btn btn-warning mx-1 mt-2" onclick="handleClick()">Modifica</button>
         <button class="btn btn-success mx-1 mt-2" >Acquista ora!</button>
        `;

        const fotoPrinc = document.getElementById("fotoprinc"); //sezione a destra per foto
        fotoPrinc.innerHTML = `
         <img style="width:500px; height:500px" class="card-img me-auto" src="${imageUrl}">
`;
    })
    .catch(err => console.log(err));   //verifichiamo qualora ci fossero degli errori con catch
});
const handleClick = () => {     //assegniamo ogni singolo oggetto un id specifico creato in Backoffice(utile anche in Post man)
  window.location.assign("./backoffice.html?appId=" + id);  
};