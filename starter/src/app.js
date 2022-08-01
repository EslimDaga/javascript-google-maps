import { Loader } from "@googlemaps/js-api-loader";
import MarkerClusterer from "@google/markerclustererplus";

const apiOptions = {
	apiKey: "YOUR_API_KEY",
};

const loader = new Loader(apiOptions);

loader.load().then(() => {
	console.log("Maps Js is loaded");
	const map = displayMap();
	const markers = addMarkers(map);
	clusterMarkers(map, markers);
	addPanToMarker(map, markers);
});

const displayMap = () => {
	const mapOptions = {
		center: {
			lat: -33.860664,
			lng: 151.208138,
		},
		zoom: 14,
		mapId: "8e0a97af9386fef",
	};

	const mapDiv = document.getElementById("map");
	const map = new google.maps.Map(mapDiv, mapOptions);
	return map;
};

const addMarkers = map => {
	const locations = {
		operaHouse: { lat: -33.8567844, lng: 151.213108 },
		tarongaZoo: { lat: -33.8472767, lng: 151.2188164 },
		manlyBeach: { lat: -33.8209738, lng: 151.2563253 },
		hyderPark: { lat: -33.8690081, lng: 151.2052393 },
		theRocks: { lat: -33.8587568, lng: 151.2058246 },
		circularQuay: { lat: -33.858761, lng: 151.2055688 },
		harbourBridge: { lat: -33.852228, lng: 151.2038374 },
		kingsCross: { lat: -33.8737375, lng: 151.222569 },
		botanicGardens: { lat: -33.864167, lng: 151.216387 },
		museumOfSydney: { lat: -33.8636005, lng: 151.2092542 },
		maritimeMuseum: { lat: -33.869395, lng: 151.198648 },
		kingStreetWharf: { lat: -33.8665445, lng: 151.1989808 },
		aquarium: { lat: -33.869627, lng: 151.202146 },
		darlingHarbour: { lat: -33.87488, lng: 151.1987113 },
		barangaroo: { lat: -33.8605523, lng: 151.1972205 },
	};

	const markers = [];

	for (const location in locations) {
		const markerOptions = {
			map: map,
			position: locations[location],
			icon: "./img/custom_pin.png",
		};
		//console.log(markerOptions);
		const marker = new google.maps.Marker(markerOptions);
		markers.push(marker);
	}

	return markers;
};

const clusterMarkers = (map, markers) => {
	const clustererOptions = { imagePath: "./img/m" };
	const markerCluster = new MarkerClusterer(map, markers, clustererOptions);
};

const addPanToMarker = (map, markers) => {
	let circle;
	markers.map(marker => {
		marker.addListener("click", event => {
			const location = {
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
			};
			map.panTo(location);
			if (circle) {
				circle.setMap(null);
			}
			circle = drawCircle(map, location);
		});
	});
};

const drawCircle = (map, location) => {
	const circleOptions = {
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 1,
		map,
		center: location,
		radius: 800,
	};
	const circle = new google.maps.Circle(circleOptions);
	return circle;
};
