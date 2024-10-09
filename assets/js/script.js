// Login

var usuarios = [

    // usuario
    {
        "mail": "usuario",
        "contraseña": "123",
        "rol": 1
    },

    // creador
    {
        "mail": "creator",
        "contraseña": "123",
        "rol": 2
    }
];

function InicioSesion() {
    var nombre = document.getElementById("nombre").value;
    var contraseña = document.getElementById("contraseña").value;


    for (let index = 0; index < usuarios.length; index++) {
        if (usuarios[index].nombre === nombre && usuarios[index].contraseña === contraseña) {
            if (usuarios[index].rol == 1) {


                // Redirigir al usuario
                window.location.href = '/pages/home.html';
            } else if (usuarios[index].rol == 2) {


                // Redirigir al creador
                window.location.href = '...';
            }
            return;
        }
    }
    alert("Datos Incorrectos");
}


//AJAX//
function loadPage(pageUrl){
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

document.getElementById('Caja1').addEventListener('click', function() {
    loadPage('caja1.html');
});

document.getElementById('Caja2').addEventListener('click', function() {
    loadPage('caja2.html');
});

document.getElementById('Caja3').addEventListener('click', function() {
    loadPage('caja3.html');
});