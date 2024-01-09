document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("searchButton").addEventListener("click", search);
});

function search() {
  const wordInput = document.getElementById("wordInput");
  const meaningElement = document.getElementById("meaning");

  const word = wordInput.value.trim();

  if (word !== "") {
    const apiKey = "29387f30-d5ee-4d43-82c0-f16c0beed901";
    const apiEndpoint = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;

    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const shortDefs = data[0].shortdef;

          if (shortDefs && shortDefs.length > 0) {
            meaningElement.textContent = `Meaning: ${shortDefs.join(", ")}`;
          } else {
            meaningElement.textContent = "No definitions found.";
          }
        } else {
          meaningElement.textContent = "No definitions found.";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        meaningElement.textContent = "Error fetching meaning.";
      });
  } else {
    meaningElement.textContent = "Please enter a word.";
  }
}
