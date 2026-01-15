// Inisialisasi peta
var map = L.map('map').setView([4.2105, 101.9758], 6); // tengah Malaysia

// Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Warna setiap negeri
var stateColors = {
    "JHR": "#808080",
    "KDH": "#66ccff",
    "KTN": "#99ff99",
    "MLK": "#ffcc99",
    "NSN": "#ffcc66",
    "PHG": "#ff6666",
    "PRK": "#ffff99",
    "PLS": "#66ffcc",
    "PNG": "#cc99ff",
    "SBH": "#ff99ff",
    "SWK": "#66cc99",
    "TRG": "#800080",
    "KUL": "#cccccc",
    "PP": "#ffcc66",
    "PRJ": "#66ffcc",
    "SGR": "#6699ff"
};

// Load GeoJSON Malaysia
fetch('malaysia.geojson')
.then(response => response.json())
.then(data => {
    L.geoJSON(data, {
        style: function(feature) {
            return {
                color: 'blue',                   // garis negeri
                weight: 2,
                fillColor: stateColors[feature.id] || '#ffffff',
                fillOpacity: 0.5
            };
        },
        onEachFeature: function(feature, layer) {
            // Dapatkan center polygon
            var center = layer.getBounds().getCenter();

            // Tambah marker nama negeri di tengah
            L.marker(center, {
                icon: L.divIcon({
                    className: 'state-label',
                    html: feature.properties.name,
                    iconSize: null
                })
            }).addTo(map);
        }
    }).addTo(map);
});