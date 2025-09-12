let travelData = null;

// ================= Task 6: Fetch and display recommendations =================
function loadRecommendations() {
    fetch('travel_recommendation_api.json')
        .then(res => res.json())
        .then(data => {
            travelData = data;
            console.log("JSON data loaded:", data); // Debug log
            displayAllRecommendations();
        })
        .catch(err => console.error('Error loading JSON:', err));
}

function displayAllRecommendations() {
    displayRecommendations(travelData);
}

// ================= Helper to create cards =================
function displayRecommendations(data) {
    const container = document.getElementById('recommendationContainer');
    container.innerHTML = "";
    const createCard = item => {
        const card = document.createElement('div');
        card.className = "card";
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.name;
        const info = document.createElement('div');
        const name = document.createElement('h3');
        name.textContent = item.name;
        const desc = document.createElement('p');
        desc.textContent = item.description;
        info.appendChild(name);
        info.appendChild(desc);
        card.appendChild(img);
        card.appendChild(info);
        return card;
    };

    data.countries?.forEach(c => c.cities?.forEach(city => container.appendChild(createCard(city))));
    data.temples?.forEach(t => container.appendChild(createCard(t)));
    data.beaches?.forEach(b => container.appendChild(createCard(b)));
}

// ================= Task 7 & 8: Keyword search =================
function searchRecommendations() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    if (!keyword || !travelData) return;

    const filtered = [];

    if (keyword.includes('beach')) travelData.beaches?.forEach(b => filtered.push(b));
    else if (keyword.includes('temple')) travelData.temples?.forEach(t => filtered.push(t));
    else {
        travelData.countries?.forEach(c => {
            if (c.name.toLowerCase().includes(keyword)) c.cities.forEach(city => filtered.push(city));
            else c.cities.forEach(city => city.name.toLowerCase().includes(keyword) ? filtered.push(city) : null);
        });
    }

    displayRecommendations({ countries: [], temples: filtered, beaches: filtered });

    // ================= Task 10: Optional country time =================
    if (keyword.includes('australia')) displayCountryTime('Australia/Sydney');
    else if (keyword.includes('japan')) displayCountryTime('Asia/Tokyo');
    else if (keyword.includes('brazil')) displayCountryTime('America/Sao_Paulo');
    else document.getElementById('countryTime').textContent = "";
}

// ================= Task 9: Clear button =================
function resetSearch() {
    document.getElementById('searchInput').value = "";
    displayAllRecommendations();
    document.getElementById('countryTime').textContent = "";
}

// ================= Task 10: Display country time =================
function displayCountryTime(timeZone) {
    const options = { timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const time = new Date().toLocaleTimeString('en-US', options);
    document.getElementById('countryTime').textContent = `Current time in ${timeZone.replace('_',' ')}: ${time}`;
}

// ================= Events =================
window.addEventListener('DOMContentLoaded', () => {
    loadRecommendations();
    document.getElementById('searchBtn').addEventListener('click', searchRecommendations);
    document.getElementById('resetBtn').addEventListener('click', resetSearch);
});
