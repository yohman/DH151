// let's create some data
let data = [
	{
		'id': 0,
		'title':'Osaka',
		'lat': 34.6937,
		'lon': 135.5023,
		'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Osaka_Castle_02bs3200.jpg/320px-Osaka_Castle_02bs3200.jpg',
		'description': "Osaka is a large port city and commercial center on the Japanese island of Honshu. It's known for its modern architecture, nightlife and hearty street food. The 16th-century shogunate Osaka Castle, which has undergone several restorations, is its main historical landmark. It's surrounded by a moat and park with plum, peach and cherry-blossom trees. Sumiyoshi-taisha is among Japan’s oldest Shinto shrines. ― Google"

	},
	{
		'id': 1,
		'title':'Cali',
		'lat': 3.4516,
		'lon': -76.5320,
		'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Pascual_Guerrero_U-20WC_2011_CMR-NZL.JPG/320px-Pascual_Guerrero_U-20WC_2011_CMR-NZL.JPG',
		'description':"Cali is a Colombian city in the Valle del Cauca department, southwest of Bogotá. It’s known for salsa dancing and there are many clubs in the suburb of Juanchito. In Cali’s oldest quarter, the neoclassical San Pedro Cathedral houses paintings of the Quito School. Nearby is the 18th- and 19th-century San Francisco Religious Complex. La Merced Chapel is where the first mass was held after Cali was founded in 1536. ― Google"
	},
	{
		'id': 2,
		'title':'Bangkok',
		'lat': 13.7563,
		'lon': 100.5018,
		'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Bangkok_skytrain_sunset.jpg/320px-Bangkok_skytrain_sunset.jpg',
		'description':"Bangkok, Thailand’s capital, is a large city known for ornate shrines and vibrant street life. The boat-filled Chao Phraya River feeds its network of canals, flowing past the Rattanakosin royal district, home to opulent Grand Palace and its sacred Wat Phra Kaew Temple. Nearby is Wat Pho Temple with an enormous reclining Buddha and, on the opposite shore, Wat Arun Temple with its steep steps and Khmer-style spire. ― Google"
	},
	{
		'id': 3,
		'title':'Tokyo',
		'lat': 35.6762,
		'lon': 139.6503,
		'image':'https://www.stofficetokyo.ch/sites/default/files/styles/featured_image_840x572_/public/2019-01/icu_dronei_34ab_170430-42_r.jpg?itok=mkG94UWD',
		'description':"Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens. The city's many museums offer exhibits ranging from classical art (in the Tokyo National Museum) to a reconstructed kabuki theater (in the Edo-Tokyo Museum). ― Google"
	},
	{
		'id': 4,
		'title':'Los Angeles',
		'lat': 34.0522,
		'lon': -118.2437,
		'image':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/UCLA_Royce_Hall.jpg/320px-UCLA_Royce_Hall.jpg',
		'description':"Los Angeles is a sprawling Southern California city and the center of the nation’s film and television industry. Near its iconic Hollywood sign, studios such as Paramount Pictures, Universal and Warner Brothers offer behind-the-scenes tours. On Hollywood Boulevard, TCL Chinese Theatre displays celebrities’ hand- and footprints, the Walk of Fame honors thousands of luminaries and vendors sell maps to stars’ homes. ― Google"
	},
]


var map = L.map('map').setView([0,0], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// create an empty featureGroup
let myMarkers = L.featureGroup();

// loop through data
data.forEach(function(item){
	let marker = L.marker([item.lat,item.lon])
		.bindPopup(item.title+'<br><img width=200 src="'+item.image+'"><br>'+item.description)
	
	// add marker to featureGroup
	myMarkers.addLayer(marker);
	
	// add data to sidebar
	$('.sidebar').append('<div class="sidebar-item" onclick="flyByID('+item.id+')">' + item.title + '</div>')
});

// add the featureGroup to the map
myMarkers.addTo(map)

// zoom to markers
map.fitBounds(myMarkers.getBounds())

let layers = {
	"My Markers": myMarkers
}

L.control.layers(null,layers).addTo(map)

// fly to a location by id
function flyByID(id){
	map.panTo([data[id].lat,data[id].lon],12)

	// open the popup
	myMarkers.getLayers()[id].openPopup()
}
