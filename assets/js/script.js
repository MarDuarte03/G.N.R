
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


//ejemplo//
const apiKey = '$2a$10$Pitj.3i5z0w.NNEJ4.XmgelQKKBUb507JNAk2VxR0fYxG9fVANf9.'; //JSONbin apiKey https://jsonbin.io/app/app/api-keys
const binId = '670fad5dacd3cb34a897fada'; //JSONbin ID https://jsonbin.io/app/account/summary
const idImgur = '34defce0edb2505'; //Imgur API Key https://api.imgur.com/oauth2/addclient

// Cargar tareas cuando se abre la página
window.onload = function() {
    loadTasks();
};

// Función para cargar las tareas consultando en la API de JSONbin
async function loadTasks() {
    try {
        const response = await axios.get(`https://api.jsonbin.io/v3/b/${binId}`, {
            headers: { 'X-Master-Key': apiKey }
        });
        const tasks = response.data.record.tasks;
        displayTasks(tasks);
    } catch (error) {
        console.error('Error cargando tareas:', error);
    }
}

// Función para mostrar las tareas en la página
function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Limpiar la lista antes de mostrar nuevas tareas

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${task.image_url}" alt="Imagen" width="50">
            <span>${task.task}</span>
            <input type="checkbox" ${task.checked ? 'checked' : ''} onclick="toggleTask(${task.id})">
        `;
        /*
            <button onclick="deleteTask(${task.id})" style="background: none; border: none; cursor: pointer;">
                🗑️
            </button>
        */
        taskList.appendChild(li);
    });
}


// Función para agregar una nueva tarea
async function addTask() {
    const newTask = document.getElementById('newTask').value;
    const taskImage = document.getElementById('taskImage').files[0];

    if (!newTask || !taskImage) {
        alert('Por favor, ingresa una tarea y selecciona una imagen.');
        return;
    }

    try {
        // Subir imagen a Imgur
        const formData = new FormData();
        formData.append('image', taskImage);

        const imgurResponse = await axios.post('https://api.imgur.com/3/image', formData, {
            headers: { Authorization: 'Client-ID ' + idImgur }
        });

        const imageUrl = imgurResponse.data.data.link;

        // Obtener tareas actuales
        const response = await axios.get(`https://api.jsonbin.io/v3/b/${binId}`, {
            headers: { 'X-Master-Key': apiKey }
        });
        const tasks = response.data.record.tasks;

        // Crear nueva tarea
        const newTaskObject = {
            id: tasks.length + 1,
            task: newTask,
            image_url: imageUrl,
            checked: false
        };

        // Agregar la nueva tarea a la lista
        tasks.push(newTaskObject);

        // Guardar las tareas actualizadas en JSONBin
        await axios.put(`https://api.jsonbin.io/v3/b/${binId}`, { tasks }, {
            headers: { 'Content-Type': 'application/json', 'X-Master-Key': apiKey }
        });

        // Recargar la lista de tareas
        loadTasks();

    } catch (error) {
        console.error('Error al agregar la tarea:', error);
    }
}

// Función para marcar/desmarcar tareas y eliminar si está "checked"
async function toggleTask(taskId) {
    try {
        const response = await axios.get(`https://api.jsonbin.io/v3/b/${binId}`, {
            headers: { 'X-Master-Key': apiKey }
        });
        let tasks = response.data.record.tasks;

        // Encontrar la tarea y cambiar su estado
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.checked = !task.checked;
        }

        // Guardar las tareas actualizadas en JSONBin
        await axios.put(`https://api.jsonbin.io/v3/b/${binId}`, { tasks }, {
            headers: { 'Content-Type': 'application/json', 'X-Master-Key': apiKey }
        });

        // Recargar la lista de tareas
        loadTasks();
    } catch (error) {
        console.error('Error al cambiar el estado de la tarea:', error);
    }
}

// Función para eliminar una tarea
async function deleteTask(taskId) {
    try {
        const response = await axios.get(`https://api.jsonbin.io/v3/b/${binId}`, {
            headers: { 'X-Master-Key': apiKey }
        });
        let tasks = response.data.record.tasks;

        // Filtrar la tarea que debe eliminarse
        tasks = tasks.filter(t => t.id !== taskId);

        // Guardar las tareas actualizadas en JSONBin
        await axios.put(`https://api.jsonbin.io/v3/b/${binId}`, { tasks }, {
            headers: { 'Content-Type': 'application/json', 'X-Master-Key': apiKey }
        });

        // Recargar la lista de tareas
        loadTasks();
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
    }
}