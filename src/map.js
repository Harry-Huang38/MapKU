function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 38.957235, lng: -95.248962 },
        zoom: 16,        
    });
    directionsRenderer.setMap(map); 
    const calculateDirections = function (){
        mapRoute(directionsService, directionsRenderer);
    }
    setMarkers(map);
    document.getElementById("CalculateDirections").addEventListener("click", calculateDirections);
    


  // // Add a style-selector control to the map.

  //   const styleControl = document.getElementById("style-selector-control");
  //   map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(styleControl);
  // // Set the map's style to the initial value of the selector.
  //   const styleSelector = document.getElementById("style-selector");
  //   map.setOptions({ styles: styles[styleSelector.value] });
  // // Apply new JSON when the user selects a different style.
  //   styleSelector.addEventListener("change", () => {
  //       map.setOptions({ styles: styles[styleSelector.value] });
  // });
}

const beaches = [
    ["Anschutz Library", 38.957325, -95.249661, 6],
    ["KU engineering", 38.95781445088452, -95.25263124321691, 5],
    ["Fraser Hall", 38.957273866157685, -95.24356786041308, 4],
    ["Wescoe Hall", 38.957784622454255, -95.24777752972496, 3],
    ["Snow hall", 38.95892226130865, -95.24899211623296, 2],
    ["Lied Center", 38.95511168388419, -95.26276438739704, 1]
  ];

  function setMarkers(map) {
    // Adds markers to the map.
    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.
    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
      const image = {
      url:
        "jayhawk_no_BG-removebg-preview.png",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(100, 100),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 20),
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: "poly",
    };
    for (let i = 0; i < beaches.length; i++) {
        const beach = beaches[i];
        new google.maps.Marker({
          position: { lat: beach[1], lng: beach[2] },
          map,
          icon: image,
          shape: shape,
          title: beach[0],
          zIndex: beach[3],
        });
      }
}


function mapRoute(directionsService, directionsRenderer){

    const wayps = [];
    wayps.push({location: document.getElementById("Waypoints").value + ", lawrence", stopover: true}); 

    directionsService.route(
        {
            origin: {
                query: document.getElementById("DirectionsStart").value + ", lawrence", //This could cause some issues in the future
            },
            destination: {
                query: document.getElementById("DirectionsEnd").value + ", lawrence", //This could cause some issues in the future
            },
            waypoints: wayps, 
            travelMode: google.maps.TravelMode.WALKING,
        },
        (response, status) => {
            if (status === "OK"){
                //console.log(response);
                console.log("Distance: ", response.routes[0].legs[0].distance.text);
                console.log("Duration: ", response.routes[0].legs[0].duration.text);
                for (let i = 0; i < response.routes[0].legs[0].steps.length; i++){
                    console.log(response.routes[0].legs[0].steps[i].instructions, "in", response.routes[0].legs[0].steps[i].distance.text);
                }
                //console.log("Steps: ", response.routes[0].legs[0].steps);
                directionsRenderer.setDirections(response);
                console.log("Got to the good outcome from", document.getElementById("DirectionsStart").value, "to", document.getElementById("DirectionsEnd").value);
            }
            else{
                console.log("Directions fucked up by: " + status);
            }
        }
    );
}

// styles for the map
// const styles = {
//     default: [],
//     silver: [
//       {
//         elementType: "geometry",
//         stylers: [{ color: "#f5f5f5" }],
//       },
//       {
//         elementType: "labels.icon",
//         stylers: [{ visibility: "off" }],
//       },
//       {
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#616161" }],
//       },
//       {
//         elementType: "labels.text.stroke",
//         stylers: [{ color: "#f5f5f5" }],
//       },
//       {
//         featureType: "administrative.land_parcel",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#bdbdbd" }],
//       },
//       {
//         featureType: "poi",
//         elementType: "geometry",
//         stylers: [{ color: "#eeeeee" }],
//       },
//       {
//         featureType: "poi",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#757575" }],
//       },
//       {
//         featureType: "poi.park",
//         elementType: "geometry",
//         stylers: [{ color: "#e5e5e5" }],
//       },
//       {
//         featureType: "poi.park",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#9e9e9e" }],
//       },
//       {
//         featureType: "road",
//         elementType: "geometry",
//         stylers: [{ color: "#ffffff" }],
//       },
//       {
//         featureType: "road.arterial",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#757575" }],
//       },
//       {
//         featureType: "road.highway",
//         elementType: "geometry",
//         stylers: [{ color: "#dadada" }],
//       },
//       {
//         featureType: "road.highway",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#616161" }],
//       },
//       {
//         featureType: "road.local",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#9e9e9e" }],
//       },
//       {
//         featureType: "transit.line",
//         elementType: "geometry",
//         stylers: [{ color: "#e5e5e5" }],
//       },
//       {
//         featureType: "transit.station",
//         elementType: "geometry",
//         stylers: [{ color: "#eeeeee" }],
//       },
//       {
//         featureType: "water",
//         elementType: "geometry",
//         stylers: [{ color: "#c9c9c9" }],
//       },
//       {
//         featureType: "water",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#9e9e9e" }],
//       },
//     ],
//     night: [{ elementType: "geometry", stylers: [{ color: "#242f3e" }] },
//       { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
//       { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
//       {
//         featureType: "administrative.locality",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#d59563" }],
//       },
//       {
//         featureType: "poi",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#d59563" }],
//       },
//       {
//         featureType: "poi.park",
//         elementType: "geometry",
//         stylers: [{ color: "#263c3f" }],
//       },
//       {
//         featureType: "poi.park",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#6b9a76" }],
//       },
//       {
//         featureType: "road",
//         elementType: "geometry",
//         stylers: [{ color: "#38414e" }],
//       },
//       {
//         featureType: "road",
//         elementType: "geometry.stroke",
//         stylers: [{ color: "#212a37" }],
//       },
//       {
//         featureType: "road",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#9ca5b3" }],
//       },
//       {
//         featureType: "road.highway",
//         elementType: "geometry",
//         stylers: [{ color: "#746855" }],
//       },
//       {
//         featureType: "road.highway",
//         elementType: "geometry.stroke",
//         stylers: [{ color: "#1f2835" }],
//       },
//       {
//         featureType: "road.highway",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#f3d19c" }],
//       },
//       {
//         featureType: "transit",
//         elementType: "geometry",
//         stylers: [{ color: "#2f3948" }],
//       },
//       {
//         featureType: "transit.station",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#d59563" }],
//       },
//       {
//         featureType: "water",
//         elementType: "geometry",
//         stylers: [{ color: "#17263c" }],
//       },
//       {
//         featureType: "water",
//         elementType: "labels.text.fill",
//         stylers: [{ color: "#515c6d" }],
//       },
//       {
//         featureType: "water",
//         elementType: "labels.text.stroke",
//         stylers: [{ color: "#17263c" }],
//       },
//     ],
//   };
  