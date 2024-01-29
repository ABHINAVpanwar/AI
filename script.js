// Select the target node
const target = document.body;

// Create an observer instance
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      // Check if added nodes include the target elements
      const preloader = document.getElementById("preloader");
      const PL = document.getElementById("PL");

      if (preloader && PL) {
        preloader.style.display = "none";
        PL.style.display = "none";

        // Disconnect the observer once elements are found
        observer.disconnect();
      }
    }
  });
});

// Configuration of the observer
const config = { childList: true, subtree: true };

// Start observing the target node for configured mutations
observer.observe(target, config);

button = document.getElementById("button");
output = document.getElementById("output");

// Function for the typewriter effect
function typeWriter(text, speed) {
  output.innerHTML = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      output.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

document.addEventListener("DOMContentLoaded", function () {
  const output = document.getElementById("output");
  // Execute the typeWriter function after 2 seconds
  setTimeout(function () {
    typeWriter("CLICK ON THE SCREEN AND ASK ME ANYTHING . . .", 50);
  }, 2000);
});

button.addEventListener("click", function () {
  // Function for voice feedback
  // function speak(message) {
  //   const synth = window.speechSynthesis;
  //   const utterance = new SpeechSynthesisUtterance(message);
  //   synth.speak(utterance);
  // }

  SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();

  recognition.onstart = () => {
    typeWriter("", 50);
  };

  recognition.onspeechend = () => {
    recognition.stop();
  };

  recognition.onresult = (result) => {
    console.log(result.results[0][0].transcript.toUpperCase());
    if (result.results[0][0].transcript.toLowerCase().includes("hello")) {
      var greetings = [
        "HELLO THERE! HOW CAN I HELP YOU?",
        "HI! WHAT CAN I DO FOR YOU?",
        "GREETINGS! HOW MAY I ASSIST YOU?",
        "WELCOME! HOW CAN I MAKE YOUR DAY BETTER?",
        "HEY THERE! WHAT BRINGS YOU TODAY?",
      ];

      var randomGreeting =
        greetings[Math.floor(Math.random() * greetings.length)];
      typeWriter(randomGreeting, 50);
    } else if (
      result.results[0][0].transcript.toLowerCase().includes("goodbye") ||
      result.results[0][0].transcript.toLowerCase().includes("bye")
    ) {
      var farewells = [
        "HAVE A GREAT DAY!",
        "GOODBYE! TAKE CARE!",
        "SEE YOU LATER!",
        "UNTIL WE MEET AGAIN!",
        "FAREWELL! WISHING YOU THE BEST!",
      ];

      var randomFarewell =
        farewells[Math.floor(Math.random() * farewells.length)];
      typeWriter(randomFarewell, 50);
    } else if (
      result.results[0][0].transcript.toLowerCase() === "open twitch"
    ) {
      window.open("https://www.twitch.tv/", "_blank");
      typeWriter("OPENING TWITCH", 50);
    } else if (
      result.results[0][0].transcript.toLowerCase() === "OPEN MY PORTFOLIO"
    ) {
      window.open("https://abhinavpanwar.netlify.app/", "_blank");
      typeWriter("OPENING YOUR PORTFOLIO", 50);
    } else if (
      result.results[0][0].transcript.toLowerCase() === "open whatsapp"
    ) {
      window.open("https://web.whatsapp.com/", "_blank");
      typeWriter("OPENING WHATSAPP", 50);
    } else if (
      result.results[0][0].transcript.toLowerCase() === "open github"
    ) {
      window.open("https://github.com/ABHINAVpanwar", "_blank");
      typeWriter("OPENING GITHUB", 50);
    } else if (
      result.results[0][0].transcript.toLowerCase() === "open jio cinema"
    ) {
      window.open("https://www.jiocinema.com/", "_blank");
      typeWriter("OPENING JIO CINEMA", 50);
    } else if (
      result.results[0][0].transcript.toLowerCase() === "open instagram"
    ) {
      window.open("https://www.instagram.com/", "_blank");
      typeWriter("OPENING INSTAGRAM", 50);
    } else if (result.results[0][0].transcript.toLowerCase().includes("time")) {
      const currentTime = new Date().toLocaleTimeString();
      typeWriter(`CURRENT TIME IS ${currentTime}`, 50);
    } else if (result.results[0][0].transcript.toLowerCase().includes("date")) {
      const currentDate = new Date().toLocaleDateString();
      typeWriter(`TODAY'S DATE IS ${currentDate}`, 50);
    } else if (result.results[0][0].transcript.toLowerCase().includes("joke")) {
      const url =
        "https://jokeapi-v2.p.rapidapi.com/joke/Any?format=json&blacklistFlags=nsfw%2Cracist";

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "b9d6108ademsh4abb9aa4a2e82b5p13f220jsn4a91389425ae",
          "X-RapidAPI-Host": "jokeapi-v2.p.rapidapi.com",
        },
      };

      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          // Check if it's a two-part joke (has both setup and delivery)
          if (result.type === "twopart") {
            typeWriter(`${result.setup}  ${result.delivery}`, 50);
          } else {
            // For one-liner jokes
            typeWriter(result.joke, 50);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (
      result.results[0][0].transcript.toLowerCase().includes("directions from")
    ) {
      const apiKey = "5b3ce3597851110001cf6248228510d0766f420584e4a4dccc1cd89f"; // Replace with your actual OpenRouteService API key

      const locationCommand = result.results[0][0].transcript
        .toLowerCase()
        .replace("directions from", "")
        .trim();

      // Split the command into starting and destination parts
      const [startLocation, destination] = locationCommand.split(" to ");

      // Use OpenRouteService Geocoding API to get coordinates for the starting location
      const startGeocodingUrl = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(
        startLocation
      )}`;

      fetch(startGeocodingUrl)
        .then((response) => response.json())
        .then((startData) => {
          // Extract coordinates from the first feature in the geocoding response
          const startCoords = startData.features[0].geometry.coordinates;
          // Use OpenRouteService Geocoding API to get coordinates for the destination
          const destinationGeocodingUrl = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(
            destination
          )}`;

          fetch(destinationGeocodingUrl)
            .then((response) => response.json())
            .then((destinationData) => {
              // Extract coordinates from the first feature in the geocoding response
              const destinationCoords =
                destinationData.features[0].geometry.coordinates;

              // Use the obtained startCoords and destinationCoords in the directions URL
              const directionsUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.join(
                ","
              )}&end=${destinationCoords.join(",")}`;

              // Continue with the existing code for fetching directions
              fetch(directionsUrl)
                .then((response) => response.json())
                .then((data) => {
                  fetch(directionsUrl)
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.features && data.features.length > 0) {
                        // Extract relevant information from the directions response
                        const duration =
                          data.features[0].properties.segments[0].duration;
                        const distance =
                          data.features[0].properties.segments[0].distance;

                        // Display the information in an alert
                        typeWriter(
                          `DIRECTIONS FROM ${startLocation.toUpperCase()} TO ${destination.toUpperCase()} :  DURATION : ${(
                            duration / 3600
                          ).toFixed(2)} HRS  DISTANCE : ${(
                            distance / 1000
                          ).toFixed(2)} KM`,
                          50
                        );
                      } else {
                        typeWriter(
                          `Unable to get directions from ${startLocation} to ${destination}. Please try again.`,
                          50
                        );
                      }
                    })
                    .catch((error) => {
                      console.error("Error fetching directions:", error);
                      typeWriter(
                        "Error fetching directions. Please try again.",
                        50
                      );
                    });
                })
                .catch((error) => {
                  console.error("Error fetching directions:", error);
                  typeWriter(
                    "Error fetching directions. Please try again.",
                    50
                  );
                });
            })
            .catch((error) => {
              console.error(
                "Error fetching destination geocoding data:",
                error
              );
              typeWriter(
                "Error fetching destination geocoding data. Please try again.",
                50
              );
            });
        })
        .catch((error) => {
          console.error(
            "Error fetching starting location geocoding data:",
            error
          );
          typeWriter(
            "Error fetching starting location geocoding data. Please try again.",
            50
          );
        });
    } else if (
      result.results[0][0].transcript.toLowerCase().includes("meaning of")
    ) {
      const word = result.results[0][0].transcript
        .toLowerCase()
        .replace("meaning of", "")
        .trim();

      var apiKey = "fsrqvnWVJQwcyoIomsF7lA==tLDvpk1irPxBu8fi"; // Replace with your actual API key

      fetch("https://api.api-ninjas.com/v1/dictionary?word=" + word, {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          typeWriter(
            `${word.toUpperCase()} - ${data.definition.slice(
              0,
              data.definition.indexOf("3")
            )}`,
            50
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (result.results[0][0].transcript.toLowerCase().includes("news")) {
      // Replace 'YOUR_API_KEY' with your actual News API key
      var apiKey = "024b649e788045f980852117fca7e78e";

      // News API endpoint
      var apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

      // Fetch options
      var fetchOptions = {
        method: "GET",
      };

      // Make the fetch request
      fetch(apiUrl, fetchOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          for (let i = 0; i < data.articles.length; i++) {
            const articleTitle = data.articles[i].title;
            if (!confirm(`${articleTitle}`)) {
              break;
            }
          }
          typeWriter(
            `THESE WERE TODAY'S TOP ${data.articles.length} HEADLINES`,
            50
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (
      result.results[0][0].transcript
        .toLowerCase()
        .includes("search wikipedia for")
    ) {
      const wiki = result.results[0][0].transcript
        .toLowerCase()
        .replace("search wikipedia for", "")
        .trim();
      window.open(
        `https://en.wikipedia.org/wiki/${encodeURIComponent(wiki)}`,
        "_blank"
      );
      typeWriter(`SEARCHING WIKIPEDIA FOR ${wiki.toUpperCase()}`, 50);
    } else if (
      result.results[0][0].transcript
        .toLowerCase()
        .includes("search youtube for")
    ) {
      const you = result.results[0][0].transcript
        .toLowerCase()
        .replace("search youtube for", "")
        .trim();
      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(
          you
        )}`,
        "_blank"
      );
      typeWriter(`SEARCHING YOUTUBE FOR ${you.toUpperCase()}`, 50);
    } else if (result.results[0][0].transcript.toLowerCase().includes("play")) {
      const searchTerm = result.results[0][0].transcript
        .toLowerCase()
        .replace("play", "")
        .trim();

      // Perform a search using the YouTube Data API
      fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
          searchTerm
        )}&part=snippet&key=AIzaSyBdgQrCmB6XxxOXSN3Oyk8zmsRIxq9V_kg`
      )
        .then((response) => response.json())
        .then((data) => {
          // Extract the video ID from the first search result
          const videoId = data.items[0].id.videoId;

          // Open a new tab/window to play the YouTube video
          window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
          typeWriter(`PLAYING ${searchTerm.toUpperCase()}`, 50);
        })
        .catch((error) => {
          console.error("Error fetching data from YouTube API:", error);
        });
    } else if (
      result.results[0][0].transcript
        .toLowerCase()
        .includes("search instagram for")
    ) {
      const insta = result.results[0][0].transcript
        .toLowerCase()
        .replace("search instagram for", "")
        .replace(/\s+/g, "");

      window.open(
        `https://www.instagram.com/${encodeURIComponent(insta)}/`,
        "_blank"
      );
      typeWriter(`SEARCHING INSTAGRAM FOR ${insta.toUpperCase()}`, 50);
    } else {
      const google = result.results[0][0].transcript.toLowerCase();
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(google)}`,
        "_blank"
      );
      typeWriter(`${google.toUpperCase()}`, 50);
    }
  };
  recognition.start();
});
