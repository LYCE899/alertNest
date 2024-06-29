document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('chat-message').value;
    if (message.trim() === '') return;

    const messageContainer = document.createElement('div');
    messageContainer.className = 'chat-message';
    messageContainer.textContent = message;

    document.querySelector('.chat-messages').appendChild(messageContainer);
    document.getElementById('chat-message').value = '';
    document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight;
});
document.getElementById('geo-btn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }
});

function showPosition(position) {
    document.getElementById('latitude').value = position.coords.latitude;
    document.getElementById('longitude').value = position.coords.longitude;
    displayMap(position.coords.latitude, position.coords.longitude);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("L'utilisateur a refusé la demande de géolocalisation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Les informations de localisation sont indisponibles.");
            break;
        case error.TIMEOUT:
            alert("La demande de géolocalisation a expiré.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Une erreur inconnue est survenue.");
            break;
    }
}

function displayMap(lat, lng) {
    var mapDiv = document.getElementById('map');
    mapDiv.style.display = 'block';
    
    var map = new google.maps.Map(mapDiv, {
        center: {lat: lat, lng: lng},
        zoom: 15
    });
    
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map
    });
}
