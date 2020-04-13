// Variables
const listaTweets = document.getElementById("lista-tweets");

// Event Listeners

eventListeners();

function eventListeners() {
  // Cuando se envia el formulario
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweet);

  // Borrar Tweets
  listaTweets.addEventListener("click", borrarTweet);

  // Contenido guardado
  document.addEventListener("DOMContentLoaded", localStorageListo);
}

// Funciones

//Añadir tweet del formulario

function agregarTweet(e) {
  e.preventDefault();
  // leer el valor del textarea
  const tweet = document.getElementById("tweet").value;

  // Crear boton eliminar
  const botonBorrar = document.createElement("a");
  botonBorrar.classList = "borrar-tweet";
  botonBorrar.innerText = "X";

  // Crear elemento y añadirle el contenido a la lista
  const li = document.createElement("li");
  li.innerText = tweet;

  //añade el boton de borrar el tweet
  li.appendChild(botonBorrar);

  //añade el tweet a la lista
  listaTweets.appendChild(li);

  // Añadir a Local Storage
  agregarTweetLocalStorage(tweet);
}

// Elimina el tweet del DOM
function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    borrarTweetLocalStorage(e.target.parentElement.innerText);
  }
}

//Mostrar datos de LS en la lista
function localStorageListo() {
  let tweets;

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (tweet) {
    // Crear boton eliminar
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement("li");
    li.innerText = tweet;

    //añade el boton de borrar el tweet
    li.appendChild(botonBorrar);

    //añade el tweet a la lista
    listaTweets.appendChild(li);
  });
}

// Agregar tweet a local storage
function agregarTweetLocalStorage(tweet) {
  let tweets;

  tweets = obtenerTweetsLocalStorage();
  //Añadir el nuevo tweet
  tweets.push(tweet);
  // Convertir de string a arreglo para LS
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Comprueba si hay elementos en LS, retorna un arreglo
function obtenerTweetsLocalStorage() {
  let tweets;
  //REvisamos los valores de LS
  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

// Eliminar tweet de LS

function borrarTweetLocalStorage(tweet) {
  let tweets;
  let tweetBorrado;
  // así se obtiene el tweet a borrar y cortado
  tweetBorrado = tweet.substring(0, tweet.length - 1);

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (tweet, index) {
    if (tweetBorrado === tweet) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}
