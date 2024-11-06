
//AJAX//
function loadPage(pageUrl) {
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('contenidos').innerHTML = html;
        })
        .catch(error => {
            console.error('Hubo un problema al cargar la página:', error);
        });
}

document.getElementById('Caja1').addEventListener('click', function () {
    loadPage('caja1.html');
});

document.getElementById('Caja2').addEventListener('click', function () {
    loadPage('caja2.html');
});

document.getElementById('Caja3').addEventListener('click', function () {
    loadPage('caja3.html');
});


//lyrics//
function letras(cancion) {
    console.log("algo")
    fetch(`https://api.lyrics.ovh/v1/guns n' roses/${cancion}`)
        .then(response => response.json())
        .then(data => 
        {
            console.log(data);
            contenedor = document.getElementById("lyricsSong");
            contenedor.innerHTML = data.lyrics;
        })
        .catch(error => console.error('Error:', error));

}




// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
