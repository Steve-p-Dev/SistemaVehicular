document.addEventListener('DOMContentLoaded', (event) => {
    // Splash screen redirection
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', function() {
            window.location.href = 'main.html';
        });
    }

    // Login validation and redirection
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');

            if (username === 'puce' && password === 'puce123') {
                window.location.href = 'registro-vehicular.html';
            } else {
                errorMessage.textContent = 'Usuario o contraseña incorrectos';
            }
        });
    }

    // Back to splash screen redirection
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // Validate year input to prevent negative numbers
    const yearInput = document.getElementById('year');
    if (yearInput) {
        yearInput.addEventListener('input', function() {
            const yearError = document.getElementById('yearError');
            if (yearInput.value < 0) {
                yearError.textContent = 'El año no puede ser negativo';
                yearInput.value = '';
            } else {
                yearError.textContent = '';
            }
            checkFormValidity();
        });
    }

    // Check form validity to enable/disable submit button
    function checkFormValidity() {
        const vehicleName = document.getElementById('vehicleName').value;
        const model = document.getElementById('model').value;
        const plate = document.getElementById('plate').value;
        const year = document.getElementById('year').value;

        const submitButton = document.getElementById('submitButton');
        if (vehicleName && model && plate && year) {
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.setAttribute('disabled', 'true');
        }
    }

    // Listen for input events on form fields
    const formInputs = document.querySelectorAll('#vehicleForm input');
    formInputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
    });

    // Handle form submission
    const vehicleForm = document.getElementById('vehicleForm');
    if (vehicleForm) {
        vehicleForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const vehicleDetails = {
                name: document.getElementById('vehicleName').value,
                model: document.getElementById('model').value,
                plate: document.getElementById('plate').value,
                color: document.getElementById('color').value,
                year: document.getElementById('year').value
            };
            localStorage.setItem('vehicleDetails', JSON.stringify(vehicleDetails));
            const alertBox = document.createElement('div');
            alertBox.className = 'alert-box';
            alertBox.textContent = 'Vehículo registrado correctamente.';
            document.body.appendChild(alertBox);

            // Mostrar la alerta
            setTimeout(() => {
                alertBox.classList.add('show');
            }, 10); // Añadir un pequeño retraso para la transición

            setTimeout(() => {
                alertBox.classList.remove('show');
                alertBox.remove();
                window.location.href = 'mapa.html';
            }, 2000);
        });
    }

    // Clear form fields
    const clearButton = document.getElementById('clearButton');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            document.getElementById('vehicleName').value = '';
            document.getElementById('model').value = '';
            document.getElementById('plate').value = '';
            document.getElementById('color').value = '';
            document.getElementById('year').value = '';
            document.getElementById('yearError').textContent = '';
            checkFormValidity();
        });
    }

    // Initialize map and display vehicle details
    function initMap() {
        const vehicleDetails = JSON.parse(localStorage.getItem('vehicleDetails'));
        if (vehicleDetails) {
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: { lat: -34.397, lng: 150.644 } // Cambia las coordenadas según sea necesario
            });

            const marker = new google.maps.Marker({
                position: { lat: -34.397, lng: 150.644 },
                map: map,
                title: `Vehículo: ${vehicleDetails.name}`
            });

            const infowindow = new google.maps.InfoWindow({
                content: `
                    <div>
                        <h3>${vehicleDetails.name}</h3>
                        <p>Modelo: ${vehicleDetails.model}</p>
                        <p>Placa: ${vehicleDetails.plate}</p>
                        <p>Color: ${vehicleDetails.color}</p>
                        <p>Año: ${vehicleDetails.year}</p>
                    </div>
                `
            });

            marker.addListener('mouseover', function() {
                infowindow.open(map, marker);
            });

            marker.addListener('mouseout', function() {
                infowindow.close();
            });
        }
    }

    if (document.getElementById('map')) {
        initMap();
    }
});
//Estado del vehiculo y mapa
document.addEventListener('DOMContentLoaded', (event) => {
    // Mostrar información del vehículo al hacer hover
    const vehicleIcon = document.getElementById('vehicleIcon');
    const vehicleInfo = document.querySelector('.vehicle-info');

    vehicleIcon.addEventListener('mouseover', function() {
        vehicleInfo.style.display = 'block';
    });

    vehicleIcon.addEventListener('mouseout', function() {
        vehicleInfo.style.display = 'none';
    });

    // Mostrar información de estado al hacer hover sobre las partes del vehículo
    const statusItems = document.querySelectorAll('.status-item');
    statusItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            const check = item.querySelector('.status-check');
            check.style.display = 'inline';
        });

        item.addEventListener('mouseout', function() {
            const check = item.querySelector('.status-check');
            check.style.display = 'none';
        });
    });
});

//Botones de panico
document.getElementById('panicButton').addEventListener('click', function() {
    showCustomAlert('bi-exclamation-circle-fill', 'Crimen notificado al ECU911');
});

document.getElementById('lockButton').addEventListener('click', function() {
    showCustomAlert('bi-lock-fill', 'Auto bloqueado hasta nuevo aviso');
});

document.getElementById('downArrow').addEventListener('click', function() {
    window.location.href = 'mapa.html'; 
});

function showCustomAlert(iconClass, message) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert');
    
    const alertIcon = document.createElement('i');
    alertIcon.classList.add('alert-icon', 'bi', iconClass);
    
    const alertMessage = document.createElement('span');
    alertMessage.textContent = message;
    
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', function() {
        alertBox.style.display = 'none';
    });
    
    alertBox.appendChild(alertIcon);
    alertBox.appendChild(alertMessage);
    alertBox.appendChild(closeButton);
    
    document.body.appendChild(alertBox);

    // Mostrar la alerta
    alertBox.classList.add('show');

    // Cerrar automáticamente después de 3 segundos
    setTimeout(function() {
        alertBox.style.display = 'none';
    }, 3000);
}
//funcion alerta en peligro
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'mapa.html') {
        setupMapaPage();
    } else if (currentPage === 'custom_alert_page.html') {
        setupCustomAlertPage();
    }

    function setupMapaPage() {
        // No se necesita configuración específica para esta página
    }
});



// Función para hacer que la palabra "Ventanas" parpadee en rojo
function highlightWindows() {
    const windowsElement = document.getElementById('windows2');
    windowsElement.classList.add('red-blink');
}

// Ejecutar las funciones al cargar la página
window.onload = function() {
    showAlert();
    highlightWindows();
};











