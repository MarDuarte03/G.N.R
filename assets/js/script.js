
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




//cookies
let cookiesAccepted = false;

// Mostrar el banner de cookies si no se ha aceptado
function showCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    banner.style.display = 'block';
}

// Manejar la aceptación de cookies
function acceptCookies() {
    cookiesAccepted = true;
    const banner = document.getElementById('cookie-banner');
    banner.style.display = 'none';
    enableScroll();
}

// Inhabilitar scroll
function disableScroll() {
    window.scrollTo(0, window.scrollY);
}

// Habilitar scroll
function enableScroll() {
    window.removeEventListener('scroll', checkScroll);
}

//posición de scroll
function checkScroll() {
    if (!cookiesAccepted && window.scrollY > window.innerHeight / 2) {
        disableScroll();
    }
}

//scroll
window.addEventListener('scroll', checkScroll);

//aceptar de cookies
document.getElementById('accept-cookies').addEventListener('click', acceptCookies);

// Mostrar si no se aceptaron cookies
window.onload = function() {
    if (!cookiesAccepted) {
        showCookieBanner();
    }
    setTimeout(function() {
        document.getElementById("popup").style.display = "flex";
    }, 2000)

    document.getElementById("close-btn").onclick = function() {
        document.getElementById("popup").style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == document.getElementById("popup")) {
            document.getElementById("popup").style.display = "none";
        }
    }
};


