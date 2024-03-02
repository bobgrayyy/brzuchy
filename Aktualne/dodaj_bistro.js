var bistro = []; // Początkowo tablica jest pusta

var nameInput = document.getElementById("name");
var typeInput = document.getElementById("type");
var latInput = document.getElementById("lat");
var lonInput = document.getElementById("lon");
var linkInput = document.getElementById("link");

nameInput.value = "";
latInput.value = "";
lonInput.value = "";
linkInput.value = "";
typeInput.selectedIndex = 0; // Poprawione

// Funkcja do wczytywania danych z pliku JSON
async function fetchBistroData() {
    try {
        const response = await fetch('https://api.github.com/repos/bobgrayyy/brzuchy/contents/bistroList.json');
        const data = await response.json();

        if (data.content) {
            // Pobierz zawartość pliku JSON i przypisz do zmiennej bistro
            var decodedContent = atob(data.content);
            var parsedData = JSON.parse(decodedContent);

            // Dodaj wczytane dane do istniejącej tablicy bistro
            bistro = bistro.concat(parsedData);

            console.log('Plik JSON został pobrany z GitHub.');

            // Tutaj możesz wykonać operacje na danych, jeśli są potrzebne po wczytaniu
        } else {
            console.error('Plik JSON jest pusty lub zawiera nieprawidłową zawartość.');
        }
    } catch (error) {
        console.error('Błąd podczas odczytu danych z pliku JSON:', error);
    }
    console.log(bistro);
}

// Wywołaj funkcję fetchBistroData() przy załadowaniu strony
fetchBistroData();

// Funkcja do dodawania nowego bistro
function addBistro() {
    var name = nameInput.value;
    var lat = parseFloat(latInput.value);
    var lon = parseFloat(lonInput.value);
    var link = linkInput.value;
    var type = typeInput.value;

    if (!name || isNaN(lat) || isNaN(lon) || !link || !type) {
        alert("Wszystkie pola są wymagane.");
        return;
    }

    var newBistro = { name: name, lat: lat, lon: lon, link: link, type: type };
    bistro.push(newBistro);

    // Czyść pola formularza po dodaniu
    nameInput.value = "";
    latInput.value = "";
    lonInput.value = "";
    linkInput.value = "";
    typeInput.selectedIndex = 0; // Poprawione

    // Tutaj możesz wykonać inne operacje po dodaniu nowego bistro
    console.log(newBistro);
    console.log(bistro);

    // Zapisz aktualne bistro na GitHub
    saveBistroData();
}

// Funkcja do zapisywania danych bistr na GitHub
async function saveBistroData() {
    var jsonContent = JSON.stringify(bistro);

    // Zakoduj dane do formatu UTF-8
    var utf8Content = unescape(encodeURIComponent(jsonContent));

    // Utwórz zawartość pliku JSON w formacie base64
    var contentBase64 = btoa(utf8Content);

    try {
        const response = await fetch('https://api.github.com/repos/bobgrayyy/brzuchy/contents/bistroList.json');
        const data = await response.json();

        var sha = data.sha;

        // Zapytanie do GitHub API do aktualizacji pliku JSON
        const saveResponse = await fetch('https://api.github.com/repos/bobgrayyy/brzuchy/contents/bistroList.json', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                message: 'Aktualizacja pliku bistroList.json',
                content: contentBase64,
                sha: sha,
            }),
        });

        console.log('Plik JSON został zaktualizowany na GitHub.');

        // Tutaj możesz wykonać inne operacje po zapisaniu danych
    } catch (error) {
        console.error('Błąd podczas zapisywania danych na GitHub:', error);
    }
}
