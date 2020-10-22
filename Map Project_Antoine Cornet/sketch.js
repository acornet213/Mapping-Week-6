// https://mappa.js.org/docs/getting-started.html


// Other possible interesting videos:
// Subscribers data: https://www.youtube.com/watch?v=Ae73YY_GAU8&feature=youtu.be
// Earthquake Data: https://www.youtube.com/watch?v=ZiYdOwOrGyc&t=1083s

// For integrating images: https://www.youtube.com/watch?v=FVYGyaxG4To


let myMap;
let canvas;
const mappa = new Mappa('Leaflet');

let options = {
  lat: 42,
  lng: -78,
  zoom: 7,
  style: "https://api.mapbox.com/styles/v1/thefrenchy101/ckgisokx205a419tdvzah519q/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGhlZnJlbmNoeTEwMSIsImEiOiJja2dpc2x1NXYwMWVlMnBxdGp2cDMyZ3J4In0.ytyzjMPNOm3YCf27cUsCMQ"
}
//styles
//https://cartocdn_a.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png
//https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png

function preload() {
  // With this code, you will need to convert your GPX file to CSV
  // Google search online converters and select one to test
  firstPath = loadTable('track_points.csv', 'csv', 'header');
}


function setup() {
  canvas = createCanvas(1650, 800);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(clear);

  // myMap.onChange(drawPath(firstPath));
  // myMap.onChange(drawPath(secondPath));
  myMap.onChange(drawPath.bind(null, firstPath));
}


function draw() {
}


function drawPath(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'reclat'));
    const longitude = Number(path.getString(i, 'reclon'));
    const latitude2 = Number(path.getString(i+1, 'reclat'));
    const longitude2 = Number(path.getString(i+1, 'reclon'));

    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      const pos2 = myMap.latLngToPixel(latitude2, longitude2);
      noStroke();
      //fill(239, 209, 159, 15);
      //ellipse(pos.x, pos.y, 10, 10)

      stroke(255,106,19);
      strokeWeight(1.5);
      line(pos.x, pos.y, pos2.x, pos2.y);
    }
  }
}
