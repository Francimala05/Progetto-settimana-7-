

  
  const getProducts = function () {   
    
    fetch("https://striveschool-api.herokuapp.com/api/product/", {   //chiamiamo la fetch con il nostro endPoint e gli diamo la key per l'Authorization
      headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNjYWQ3NDRkOGViMzAwMTVhNGE1NGUiLCJpYXQiOjE3MzIwMjk4MTIsImV4cCI6MTczMzIzOTQxMn0.1pK5a1erZzJfD6CE8fLL6z5rW4ZGMWg1TtoDJJwXqwE"
      }
      })
      .then((response) => {  //primo then per verifica e arrivo oggetto
        if (response.ok) {
      
          return response.json();  //trasformato in formato JSON
        } else {
          throw new Error(`Ci dispiace, Al momento non abbiamo prodotti disponibili. Errore: ${response.statusText}`);
        }
      })
      .then((products) => {  //secondo then per ottenere il dato
        console.log(products)
        const elm = document.getElementById("listaprodotti");

        products.forEach(products => {   //forEach per ciclare i prodotti e inserirli cosi nel div
          const single = document.createElement("div");
          single.className = "card col-12 col-sm-6 col-md-4 col-lg-3  mt-3 pt-3 pb-3 px-3";  //specifiche per il responsive e composizione card
          single.innerHTML = `<h1 class="card-title text-center">${products.name}</h1>    
          <p class="card-text  text-center">${products.description}</p> 
          <img class="card-img me-auto" src="${products.imageUrl}" >
          <span class="badge ${products.price > 0 ? "text-bg-success" : "text-bg-primary"} me-2">
          ${products.price > 0 ? products.price + "€" : "gratis"}</span>
          <a style="text-decoration:none;" class="text-center mt-3" href="./details.html?appId=${products._id}">SCOPRI DETTAGLI</a>`;
          elm.appendChild(single);  //ogni elemento agganciato al div
        });
      
      })
      .catch(error => {  //verifichiamo qualora ci fossero degli errori con catch
        generateAlert(error.message);
        console.log(error);
      })
      .finally(() => {  //operazione di pulizia e rimozione dell'elemento caricamento
        stacaricando(false); 
      });
  };

  const stacaricando = bool => {   //stabiliamo che lo spinner sia presente fino a quando non arrivino i dati
    const spinner = document.querySelector(".spinner-border");
    if (bool) {
      spinner.classList.remove("d-none"); 
    } else {
      spinner.classList.add("d-none"); //aggiungiamo la classe per non farlo visualizzare
    }
  };
  const generateAlert = msg => {      //l'alert viene posizionato qualora non ci possero elementi presenti
    const avv = document.getElementById("listaprodotti");
    const alert = document.createElement("div");
    alert.className = "alert alert-danger";
    alert.innerText = msg; //messaggio impostato
    avv.parentNode.insertBefore(alert, avv); 
  };

























  window.addEventListener("DOMContentLoaded", function () {
    getProducts();
  });