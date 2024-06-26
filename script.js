window.addEventListener("load", function () {
  this.document.getElementById("preloader").style.display = "none";
  this.document.getElementById("PL").style.display = "none";
});

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

// Extracting data from server
async function fetchData() {
  try {
    const response = await fetch("http://127.0.0.1:5000/data");
    const data = await response.json();
    typeWriter(`${data.toUpperCase()}`, 50);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
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
      result.results[0][0].transcript.toLowerCase() === "open my portfolio"
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
    } else if (
      result.results[0][0].transcript.toLowerCase().includes("timer of")
    ) {
      t = result.results[0][0].transcript.toLowerCase();
      t = t.substring(t.indexOf("timer of") + 8).trim();
      t = t.split(" ");

      if (t[1] == "hour" || t[1] == "hours") {
        displayCountdown(t[0] * 60 * 60 * 1000);
      } else if (t[1] == "minute" || t[1] == "minutes") {
        displayCountdown(t[0] * 60 * 1000);
      } else if (t[1] == "second" || t[1] == "seconds") {
        displayCountdown(t[0] * 1000);
      }

      function displayCountdown(remainingTime) {
        // Function to update the countdown display
        let intervalId = setInterval(function () {
          let hours = Math.floor(
            (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          let minutes = Math.floor(
            (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
          );
          let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
          output.textContent = `${hours} : ${minutes} : ${seconds}`;

          if (remainingTime <= 0) {
            clearInterval(intervalId);
            typeWriter("TIME IS UP !", 50);
          } else {
            remainingTime -= 1000;
          }
        }, 1000);
      }
    } else if (
      result.results[0][0].transcript.toLowerCase().includes("time in")
    ) {
      citytime = result.results[0][0].transcript.toLowerCase();
      citytime = citytime.substring(citytime.indexOf("time in") + 7).trim();

      const apiKey = "fsrqvnWVJQwcyoIomsF7lA==tLDvpk1irPxBu8fi";

      fetch(`https://api.api-ninjas.com/v1/worldtime?city=${citytime}`, {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          typeWriter(
            `CURRENT TIME IN ${citytime.toUpperCase()} IS ${data.hour}:${
              data.minute
            }:${data.second} , ${data.day_of_week
              .substring(0, 3)
              .toUpperCase()}`,
            50
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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
    } else if (
      result.results[0][0].transcript.toLowerCase().includes("movie")
    ) {
      const apiKey = "a974b84a0e4c4ecf7867c911669b4c9a"; // Your TMDb API key
      const apiReadToken =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTc0Yjg0YTBlNGM0ZWNmNzg2N2M5MTE2NjliNGM5YSIsInN1YiI6IjY1Yjk0NjI0OTBmY2EzMDBjOTA1Nzc3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tXlwbp1kJvAeplLvj2P_RdO1FJ1jfTQBSVSiUunoOGg";

      // URL for TMDb API endpoint (replace with the actual endpoint you want to use)
      const apiUrl = "https://api.themoviedb.org/3/movie/popular";

      // Fetching data from TMDb API using the provided JWT for read access
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiReadToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          for (let i = 0; i < data.results.length; i++) {
            const x = data.results[i].title;
            const z = data.results[i].vote_average;
            const y = data.results[i].release_date;

            if (
              !confirm(`${x.toUpperCase()}\nRELEASE DATE : ${y}\nRATING : ${z}`)
            ) {
              break;
            }
          }
          typeWriter(`THESE WERE TOP ${data.results.length} LATEST MOVIES`, 50);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (
      result.results[0][0].transcript.toLowerCase().includes("calculate")
    ) {
      let expression = result.results[0][0].transcript
        .toLowerCase()
        .replace("calculate", "")
        .trim();

      if (expression.includes("x")) {
        expression = expression.replace("x", "*");
      }

      typeWriter(`${expression} = ${eval(expression)}`, 50);
    }
    // else if (result.results[0][0].transcript.toLowerCase().includes("news")) {
    //   // Replace 'YOUR_API_KEY' with your actual News API key
    //   var apiKey = "024b649e788045f980852117fca7e78e";

    //   // News API endpoint
    //   var apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

    //   // Fetch options
    //   var fetchOptions = {
    //     method: "GET",
    //   };

    //   // Make the fetch request
    //   fetch(apiUrl, fetchOptions)
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       for (let i = 0; i < data.articles.length; i++) {
    //         const articleTitle = data.articles[i].title;
    //         if (!confirm(`${articleTitle}`)) {
    //           break;
    //         }
    //       }
    //       typeWriter(
    //         `THESE WERE TODAY'S TOP ${data.articles.length} HEADLINES`,
    //         50
    //       );
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // }
    else if (
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
    } else if (
      result.results[0][0].transcript.toLowerCase().includes("server")
    ) {
      fetchData(); // Call the fetchData function
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
