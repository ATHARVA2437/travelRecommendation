// Task 1, 2, 3: Search functionality with fetch
function searchRecommendations() {
    const input = document.getElementById("searchInput").value.toLowerCase();
  
    fetch("travel_recommendation_api.json")
      .then(response => response.json())
      .then(data => {
        let results = [];
  
        // Task 4: Beaches
        if (input.includes("beach")) {
          results = data.beaches;
        }
        // Task 5: Temples
        else if (input.includes("temple")) {
          results = data.temples;
        }
        // Task 6: Countries
        else {
          const country = data.countries.find(c => c.name.toLowerCase().includes(input));
          if (country) {
            results = country.cities;
          }
        }
  
        // Task 7: Handle no results
        if (results.length > 0) {
          showRecommendations(results);
        } else {
          document.getElementById("results").innerHTML = "<p>No results found.</p>";
        }
      })
      .catch(error => console.error("Error fetching JSON:", error));
  }
  
  // Task 8: Show results dynamically
  function showRecommendations(list) {
    let output = "";
    list.forEach(place => {
      output += `
        <div class="recommendation">
          <img src="${place.imageUrl}" alt="${place.name}">
          <h3>${place.name}</h3>
          <p>${place.description}</p>
        </div>
      `;
    });
    document.getElementById("results").innerHTML = output;
  }
  
  // Task 9: Clear results
  function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";
  }
  
  // Task 10: Show local time in a given timezone
  function showCountryTime(zone) {
    const options = { timeZone: zone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const timeNow = new Date().toLocaleTimeString('en-US', options);
    alert(`Current time in ${zone}: ${timeNow}`);
  }
  