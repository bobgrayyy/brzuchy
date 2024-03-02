// Inicjalizacja mapy
    var map = L.map('mapa').setView([50.061610, 19.938278], 12);

    // Dodawanie podkładu z OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

      var customIcon = L.icon({
        iconUrl: 'Layouts/B.svg', // Ścieżka do ikony markera
        iconSize: [32, 32], // Rozmiar ikony markera
        iconAnchor: [16, 32], // Punkt kotwiczenia ikony markera
        popupAnchor: [0, -32] // Punkt kotwiczenia dymka informacyjna
    });

    function createMarker(name, lat, lon, link, type) {
        var marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);

        marker.bindPopup('<a href="' + link + '" style="font-size: 16px; font-family: Inter; color: #FF76B8 ">' + name + ' (' + type + ')</a>');
        return marker; // Zwracamy marker, aby można go było później ukryć/pokazać
    }


    // Przypisanie treści dymka do markera

    var bistro = []; // Pusta tablica na bistra
    var markers = []; // Tablica na markery

    // Odczytaj dane z pliku JSON na GitHub przy załadowaniu strony
    async function fetchBistroData() {
        try {
            const response = await fetch('https://api.github.com/repos/bobgrayyy/brzuchy/contents/bistroList.json');
            const data = await response.json();

            if (data.content) {
                // Pobierz zawartość pliku JSON i przekonwertuj na tekst
                var decodedContent = atob(data.content);

                // Zdekoduj tekst UTF-8
                var decodedUtf8Content = decodeURIComponent(escape(decodedContent));

                // Parsuj zdekodowany JSON
                bistro = JSON.parse(decodedUtf8Content);

                // Wyświetl markery na mapie
                bistro.forEach(item => {
                    var marker = createMarker(item.name, item.lat, item.lon, item.link, item.type);
                    markers.push(marker); // Dodajemy marker do tablicy markers
                });
                console.log('Plik JSON został pobrany z GitHub.');
                console.log(bistro);
            } else {
                console.error('Plik JSON jest pusty lub zawiera nieprawidłową zawartość.');
            }
        } catch (error) {
            console.error('Błąd podczas odczytu danych z pliku JSON:', error);
        }
    }

    // Wywołaj funkcję, aby pobrać dane z GitHub przy załadowaniu strony
    fetchBistroData();

   // Nasłuchuj kliknięcia na divy elementów
var elementDivs = document.querySelectorAll(".element");
elementDivs.forEach(elementDiv => {
    elementDiv.addEventListener("click", function () {
        var selectedType = this.getAttribute("data-type");
        filterMarkers(selectedType);
    });
});

// Funkcja do filtrowania markerów
function filterMarkers(selectedType) {
    markers.forEach(marker => {
        var markerType = marker.getPopup().getContent().match(/\(([^)]+)\)/)[1];
        if (selectedType === "refresh" || markerType === selectedType) {
            map.addLayer(marker);
        } else {
            map.removeLayer(marker);
        }
    });
}

    // Zmiana fokusu mapy na inne miasta
    document.getElementById("Wroclaw").addEventListener("click", function() {
        map.setView([51.110318, 17.032907], 12);
    });

      document.getElementById("Poznan").addEventListener("click", function() {
        map.setView([52.40945483673702, 16.941539375501087], 12);
    });

           document.getElementById("Trojmiasto").addEventListener("click", function() {
        map.setView([54.41846464068668, 18.572711099894782], 10);
    });

    document.getElementById("Warszawa").addEventListener("click", function() {
        map.setView([52.229676, 21.012229], 12);
    });

    document.getElementById("Krakow").addEventListener("click", function() {
        map.setView([50.064651, 19.944981], 12);
    });

    document.getElementById("Lodz").addEventListener("click", function() {
        map.setView([51.759445, 19.457216], 12);
    });

    document.getElementById("inny").addEventListener("click", function() {
        map.setView([47.700603, 22.230680], 4);
    });


    // Zmiana obrazków
    
    const refresh = document.getElementById('refresh');
    refresh.addEventListener('mouseover',
       function() { this.src = 'Layouts/RefreshCr.svg'; }
        );
    refresh.addEventListener('mouseout',
       function() { this.src = 'Layouts/Refresh.svg'; }
        );



    const kawa = document.getElementById('kawa_herbata');
    kawa.addEventListener('mouseover',
       function() { this.src = 'Layouts/KawaCr.svg'; }
        );
    kawa.addEventListener('mouseout',
       function() { this.src = 'Layouts/Kawa.svg'; }
        );


    const wino = document.getElementById('wino');
    wino.addEventListener('mouseover',
       function() { this.src = 'Layouts/WinoCr.svg'; }
        );
    wino.addEventListener('mouseout',
       function() { this.src = 'Layouts/Wino.svg'; }
        );


    const lody = document.getElementById('lody');
    lody.addEventListener('mouseover',
       function() { this.src = 'Layouts/LodyCr.svg'; }
        );
    lody.addEventListener('mouseout',
       function() { this.src = 'Layouts/Lody.svg'; }
        );

     const wypieki = document.getElementById('wypieki');
    wypieki.addEventListener('mouseover',
       function() { this.src = 'Layouts/WypiekiCr.svg'; }
        );
    wypieki.addEventListener('mouseout',
       function() { this.src = 'Layouts/Wypieki.svg'; }
        );

    const pizza = document.getElementById('pizza');
    pizza.addEventListener('mouseover',
       function() { this.src = 'Layouts/PizzaCr.svg'; }
        );
    pizza.addEventListener('mouseout',
       function() { this.src = 'Layouts/Pizza.svg'; }
        );

    const ramen = document.getElementById('ramen');
    ramen.addEventListener('mouseover',
       function() { this.src = 'Layouts/RamenCr.svg'; }
        );
    ramen.addEventListener('mouseout',
       function() { this.src = 'Layouts/Ramen.svg'; }
        );

    const sushi = document.getElementById('sushi');
    sushi.addEventListener('mouseover',
       function() { this.src = 'Layouts/SushiCr.svg'; }
        );
    sushi.addEventListener('mouseout',
       function() { this.src = 'Layouts/Sushi.svg'; }
        );




        const slodycze = document.getElementById('slodycze');
const lokalne = document.getElementById('lokalne');
const pasta = document.getElementById('pasta');
const owoce_morza = document.getElementById('owoce_morza');
const burgery = document.getElementById('burgery');
const indyjskie = document.getElementById('indyjskie');
const sniadanie = document.getElementById('sniadanie');
const meksykanskie = document.getElementById('meksykanskie');
const kanapki = document.getElementById('kanapki');
const gruzinskie = document.getElementById('gruzinskie');
const warzywa_grzyby = document.getElementById('warzywa_grzyby');
const inne = document.getElementById('inne');

slodycze.addEventListener('mouseover', function() { this.src = 'Layouts/SłodyczeCr.svg'; });
slodycze.addEventListener('mouseout', function() { this.src = 'Layouts/Słodycze.svg'; });

lokalne.addEventListener('mouseover', function() { this.src = 'Layouts/LokalneCr.svg'; });
lokalne.addEventListener('mouseout', function() { this.src = 'Layouts/Lokalne.svg'; });

pasta.addEventListener('mouseover', function() { this.src = 'Layouts/PastaCr.svg'; });
pasta.addEventListener('mouseout', function() { this.src = 'Layouts/Pasta.svg'; });

owoce_morza.addEventListener('mouseover', function() { this.src = 'Layouts/OwoceMorzaCr.svg'; });
owoce_morza.addEventListener('mouseout', function() { this.src = 'Layouts/OwoceMorza.svg'; });

burgery.addEventListener('mouseover', function() { this.src = 'Layouts/BurgerCr.svg'; });
burgery.addEventListener('mouseout', function() { this.src = 'Layouts/Burger.svg'; });

indyjskie.addEventListener('mouseover', function() { this.src = 'Layouts/IndyjskieCr.svg'; });
indyjskie.addEventListener('mouseout', function() { this.src = 'Layouts/Indyjskie.svg'; });

sniadanie.addEventListener('mouseover', function() { this.src = 'Layouts/ŚniadanieCr.svg'; });
sniadanie.addEventListener('mouseout', function() { this.src = 'Layouts/Śniadanie.svg'; });

meksykanskie.addEventListener('mouseover', function() { this.src = 'Layouts/MeksykańskieCr.svg'; });
meksykanskie.addEventListener('mouseout', function() { this.src = 'Layouts/Meksykańskie.svg'; });

kanapki.addEventListener('mouseover', function() { this.src = 'Layouts/KanapkaCr.svg'; });
kanapki.addEventListener('mouseout', function() { this.src = 'Layouts/Kanapka.svg'; });

gruzinskie.addEventListener('mouseover', function() { this.src = 'Layouts/GruzińskieCr.svg'; });
gruzinskie.addEventListener('mouseout', function() { this.src = 'Layouts/Gruzińskie.svg'; });

warzywa_grzyby.addEventListener('mouseover', function() { this.src = 'Layouts/Warzywa GrzybyCr.svg'; });
warzywa_grzyby.addEventListener('mouseout', function() { this.src = 'Layouts/Warzywa Grzyby.svg'; });

inne.addEventListener('mouseover', function() { this.src = 'Layouts/InneCr.svg'; });
inne.addEventListener('mouseout', function() { this.src = 'Layouts/Inne.svg'; });


    //Scrollowanie

    const scrollContainer = document.getElementById('row');
    let move;

scrollContainer.addEventListener('mouseover', (e) => {
    const containerWidth = scrollContainer.offsetWidth;
    const containerScrollWidth = scrollContainer.scrollWidth;
    const scrollThreshold = 200; // Dystans od krawÄdzi, przy ktÃ³rym ma zaczÄÄ siÄ przewijanie

    const isNearLeftEdge = e.clientX < scrollThreshold;
    const isNearRightEdge = e.clientX > containerWidth - scrollThreshold;


    move = setInterval(function() {
        if (isNearLeftEdge) 
        {scrollLeftBy(-160);} 

        else if (isNearRightEdge) 
        {scrollLeftBy(160);}
    }, 80);
});




scrollContainer.addEventListener('mouseout', () => {
clearInterval(move);
});

function scrollLeftBy(value) {
  const currentScrollLeft = scrollContainer.scrollLeft;
  scrollContainer.scrollLeft = currentScrollLeft + value;
  setTimeout(() => {
  }, 80); // 
}