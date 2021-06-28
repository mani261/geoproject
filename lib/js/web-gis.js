
// geoJSON load
// L.geoJSON(data).addTo(map);
var geojsonLayer = new L.GeoJSON.AJAX('data/data.geojson');
var random_location = L.geoJSON(data, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name)
    }
});
var markers = L.markerClusterGroup();
random_location.addTo(markers);
//markers.addTo(map);

var singleMarker = L.marker([35.69439, 51.42151])
    .bindPopup('متن توضیحات')
    .openPopup();

// Basemaps
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var humanitarian = L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap Contributors. Tiles courtesy of Humanitarian OpenStreetMap Team",
    maxZoom: 20
});
var Stadia_AlidadeSmoothDark = L.tileLayer(
    'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
});
var parsijoo = L.tileLayer(
    'https://developers.parsijoo.ir/web-service/v1/map/?type=tile&x={x}&y={y}&z={z}&apikey=627973149c2041b184e31259821d1306', {
        maxZoom: 21,
    });


var map = L.map('map', {
    center: [35.69439, 51.42151],
    zoom: 13,
    layers: [osm, markers]
});

// add scale map
L.control.scale().addTo(map);

// add fulscreen view
map.addControl(new L.Control.Fullscreen());

// Leaflet Layer Control
var baseMaps = {
    'OSM': osm,
    'Humanitarian': humanitarian,
    'Dark': Stadia_AlidadeSmoothDark,
    'Watercolor': Stamen_Watercolor,
    'Parsijoo': parsijoo
}
var overlayMaps = {
    'GeoJSON Markers': markers,
    'Single Marker': singleMarker,
    'GeoJSON AJAX': geojsonLayer
}

L.control.layers(baseMaps, overlayMaps).addTo(map);

// Turf.js Analysis
// var bbox = turf.bbox(features);

var bufferLayer;
$('#btnBuffer').click(function () { 
    if ($('#btnBuffer').html()=='Buffer') {

        var bufferData = turf.buffer(random_location, 0.5, {units:'kilometers'});
        bufferLayer = L.geoJSON(bufferData).addTo(map);
       
        var point = turf.point([51.42151, 35.69439]);
        var buffered = turf.buffer(point, 0.5, {units: 'kilometers'});
        bufferLayer2 = L.geoJSON(buffered).addTo(map);

        $('#btnBuffer').html('Remove Buffer');
    } else {
        map.removelayer(bufferLayer);

        $('#btnBuffer').html('Buffer');
    }
    
});