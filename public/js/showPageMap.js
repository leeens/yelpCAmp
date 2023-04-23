mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v11', 
    center: campground.geometry.coordinates, 
    zoom: 10, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 20})
       .setHTML(
            `<h5>${campground.title}</h5>`
        )
    )
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl());