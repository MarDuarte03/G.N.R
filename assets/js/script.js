
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

document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookieBanner');
    const overlay = document.getElementById('overlay');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
  
    // Función para verificar si las cookies fueron aceptadas
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
  
    if (!cookiesAccepted) {
      // Si no han sido aceptadas, muestra el aviso, la superposición y bloquea el scroll
      document.body.classList.add('no-scroll');
      cookieBanner.style.display = 'flex';
      overlay.style.display = 'block'; // Muestra la superposición
    }
  
    // Evento para aceptar cookies
    acceptCookiesBtn.addEventListener('click', () => {
      // Guarda la preferencia del usuario en localStorage
      localStorage.setItem('cookiesAccepted', 'true');
  
      // Oculta el aviso de cookies, la superposición y permite el scroll
      cookieBanner.style.display = 'none';
      overlay.style.display = 'none';
      document.body.classList.remove('no-scroll');
    });
  });
  


  document.addEventListener('DOMContentLoaded', () => {
    const lyricsForm = document.getElementById('lyricsForm');
    const lyricsResult = document.getElementById('lyricsResult');
  
    lyricsForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Obtener los valores de los campos
      const artist = document.getElementById('artist').value.trim();
      const song = document.getElementById('song').value.trim();
  
      // Verificar que ambos campos estén llenos
      if (!artist || !song) {
        lyricsResult.innerHTML = 'Por favor, ingresa un artista y una canción.';
        return;
      }
  
      // URL de la API de Lyrics.ovh
      const apiUrl = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`;
  
      try {
        // Realizar la consulta a la API
        const response = await fetch(apiUrl);
  
        // Verificar si la respuesta es correcta
        if (!response.ok) {
          throw new Error('No se encontró la letra de la canción.');
        }
  
        const data = await response.json();
  
        // Mostrar la letra en la página
        lyricsResult.innerHTML = `<h3>Letra de "${song}" - ${artist}</h3><pre>${data.lyrics}</pre>`;
      } catch (error) {
        lyricsResult.innerHTML = `Error: ${error.message}`;
      }
    });
  });
  