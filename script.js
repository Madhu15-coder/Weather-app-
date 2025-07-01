async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "c24b56f57eb9107a3c5650798ca2f874"; // ✅ Your real API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>❌ ${error.message}</p>`;
  }
}

function displayWeather(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const result = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${iconUrl}" alt="Weather Icon">
    <p>🌡️ Temperature: ${data.main.temp}°C</p>
    <p>☁️ Weather: ${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
  `;
  document.getElementById("weatherResult").innerHTML = result;
}