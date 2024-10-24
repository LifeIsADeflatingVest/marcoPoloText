//random notifications for "all clear" traveling
let travelNotes = [
    "You are traveling in good spirits and without problems…",
    "The journey is peaceful, with a gentle breeze guiding your way.",
    "You travel steadily, the path ahead clear and inviting.",
    "Your thoughts are wandering as you traverse the tranquil landscape.",
    "You move forward, enjoying the sounds of nature surrounding you.",
    "The road is smooth, and you feel a sense of calm as you travel.",
    "Your journey is uneventful, but the scenery is pleasing.",
    "With each passing mile, you feel more at ease in your surroundings.",
    "You make good progress, and the air is fresh and invigorating.",
    "Traveling along the path, you take in the beauty of the moment.",
    "You wander forward, the world around you peaceful and still."
];
let boatTravelNotes = [
    "You sail smoothly across the waters, the wind filling your sails.",
    "The sea is calm, and your vessel glides effortlessly through the waves.",
    "As you navigate the waters, the horizon stretches endlessly before you.",
    "You enjoy the gentle rocking of the boat as you drift along.",
    "The sun warms your face as you sail under clear skies.",
    "The sound of the water lapping against the hull brings a sense of tranquility.",
    "Your journey is steady, with no storms in sight to disrupt your path.",
    "You catch a glimpse of seabirds soaring overhead as you travel.",
    "With each passing moment, the beauty of the open sea captivates you.",
    "The sails billow proudly, and you feel a thrill of adventure in your heart."
];

// transports and price range
let transports = [
    {transport: "none", buy: 0, maintenance: 1, cargo: 3, movement: 0},
    {transport: "ship", buy: 90, maintenance: 20, cargo: 16, movement: 10},
    {transport: "horse", buy: 6, maintenance: 3, cargo: 5, movement: 9},
    {transport: "caravan", buy: 16, maintenance: 8, cargo: 12, movement: 6},
]
let transBuy = [[0,0], [70, 110], [2, 10], [8, 32]];
let transSpeed = [[0,0], [5, 13], [5, 12], [2, 7]];
let transMaint = [[1, 1], [10, 30], [1, 5], [5, 11]];
//cargo categories and special cities
let cargoGoods = ["silk", "carpets", "porcelain", "gems", "handicraft", "textiles", "spices"];
let shortages = [];
let specialTrades = [
    {city: "Venice", item: "textiles", factor: 0.7},
    {city: "Samarkand", item: "spices", factor: 0.7},
    {city: "Beijing", item: "porcelain", factor: 0.7},
    {city: "Baghdad", item: "carpets", factor: 0.7},
    {city: "Malacca", item: "spices", factor: 0.6},
    {city: "Canton", item: "silk", factor: 0.6},
    {city: "Diu", item: "handicraft", factor: 0.8},
    {city: "Isfahan", item: "gems", factor: 0.7},
    {city: "Nanjing", item: "porcelain", factor: 0.6},
    {city: "Manila", item: "spices", factor: 0.5},
];
// cities & ports
let destinations = [
{cityName:"Venice",zone:"1",city:true,port:true,nearest:[
    {city: "Constantinople", distance: 7, direction: "E", maritime: false, course: "1"},
    {city: "Alexandria", distance: 11, direction: "S", maritime: true, course: "A"},
    {city: "Damascus Port", distance: 12 , direction: "S" , maritime: true, course: "A"},
    {city: "Constantinople", distance: 9, direction: "E", maritime: true, course: "A"},
]},
{cityName:"Constantinople",zone:"1",city:true,port:true,nearest:[
    {city: "Venice", distance: 7, direction: "W", maritime: false, course: "1"},
    {city: "Venice", distance: 9, direction: "W", maritime: true, course: "A"},
    {city: "Damascus", distance: 10 , direction: "S" , maritime: false, course: "2"},
    {city: "Trabizond", distance: 11, direction: "E", maritime: false, course: "2"},
    {city: "Tana", distance: 4, direction: "E", maritime: true, course: "C"},
    {city: "Trabizond", distance: 4, direction: "E", maritime: true, course: "C"},
    {city: "Alexandria", distance: 8, direction: "S", maritime: true, course: "A"},
    {city: "Damascus Port", distance: 9, direction: "S", maritime: true, course: "A"},
]},
{cityName:"Alexandria",zone:"2",city:true,port:true, nearest:[
    {city: "Venice", distance: 11, direction: "N", maritime: true, course: "A"},
    {city: "Constantinople", distance: 8, direction: "N", maritime: true, course: "A"},
    {city: "Damascus Port", distance: 9, direction: "E", maritime: true, course: "A"},
    {city: "Damascus", distance: 4, direction: "E", maritime: false, course: "2"},
    {city: "Zeila", distance: 8, direction: "S", maritime: true, course: "B"},
    {city: "Aden", distance: 8, direction: "S", maritime: true, course: "B"},
]},
{cityName:"Damascus Port",zone:"2",city:false,port:true, nearest:[
    {city: "Alexandria", distance: 9, direction: "W", maritime: true, course: "A"},
    {city: "Venice", distance: 12, direction: "N", maritime: true, course: "A"},
    {city: "Constantinople", distance: 9, direction: "N", maritime: true, course: "A"},
    {city: "Damascus", distance: 1, direction: "E", maritime: false, course: "2"},
]},
{cityName:"Tana",zone:"3",city:true,port:true, nearest:[
    {city: "Trabizond", distance: 4, direction: "S", maritime: true, course: "C"},
    {city: "Constantinople", distance: 4, direction: "W", maritime: true, course: "C"},
    {city: "Samarkand", distance: 9, direction: "E", maritime: false, course: "3"},

]},
{cityName:"Trabizond",zone:"2",city:true,port:true,nearest:[
    {city: "Tana", distance: 4, direction: "N", maritime: true, course: "C"},
    {city: "Constantinople", distance: 11, direction: "W" , maritime: false, course: "2"},
    {city: "Constantinople", distance: 4, direction: "W", maritime: true, course: "C"},
    {city: "Damascus", distance: 5, direction: "S", maritime: false, course: "2"},
    {city: "Tabrez", distance: 3, direction: "S", maritime: false, course: "2"},
]},
{cityName:"Damascus",zone:"2",city:true,port:false, nearest:[
    {city: "Alexandria", distance: 4, direction: "W", maritime:false, course: "2"},
    {city: "Damascus Port", distance: 1, direction: "W", maritime: false, course: "2"},
    {city: "Trabizond", distance: 5, direction: "N", maritime:false, course: "2"},
    {city: "Constantinople", distance: 10, direction: "N", maritime:false, course: "2"},
]},
{cityName:"Zeila",zone:"2",city:true,port:true,nearest:[
    {city: "Alexandria", distance: 8, direction: "N", maritime: true, course: "B"},
    {city: "Aden", distance: 2, direction: "E" , maritime: true, course: "B"},
    {city: "Ormuz", distance: 8, direction: "E", maritime: true, course: "D"},
    {city: "Diu", distance: 10, direction: "E", maritime: true, course: "D"},
    {city: "Agra Port", distance: 10, direction: "E", maritime: true, course: "D"},
    {city: "Bombay", distance: 8, direction: "E", maritime: true, course: "D"},
    {city: "Colombo", distance: 9, direction: "E", maritime: true, course: "E"},
    {city: "Madras", distance: 11, direction: "E", maritime: true, course: "E"},
    {city: "Chittagong", distance: 15, direction: "E", maritime: true, course: "DE"},
    {city: "Malacca", distance: 18, direction: "E", maritime: true, course: "DE"},
]},
{cityName:"Aden",zone:"2",city:true,port:true,nearest:[
    {city: "Alexandria", distance: 8, direction: "N", maritime: true, course: "B"},
    {city: "Zeila", distance: 2, direction: "W" , maritime: true, course: "B"},
    {city: "Ormuz", distance: 8, direction: "E", maritime: true, course: "D"},
    {city: "Diu", distance: 10, direction: "E", maritime: true, course: "D"},
    {city: "Agra Port", distance: 10, direction: "E", maritime: true, course: "D"},
    {city: "Bombay", distance: 8, direction: "E", maritime: true, course: "D"},
    {city: "Colombo", distance: 9, direction: "E", maritime: true, course: "D"},
    {city: "Madras", distance: 11, direction: "E", maritime: true, course: "D"},
    {city: "Chittagong", distance: 15, direction: "E", maritime: true, course: "DE"},
    {city: "Malacca", distance: 18, direction: "E", maritime: true, course: "DE"},
]},
{cityName:"Samarkand",zone:"4",city:true,port:false,nearest:[
    {city: "Tana", distance: 9, direction: "W", maritime:false, course: "3"},
    {city: "Kashgar", distance: 6, direction: "E", maritime:false, course: "4"},
    {city: "Agra", distance: 19, direction: "S", maritime:false, course: "45"},
    {city: "Diu", distance: 18, direction: "S", maritime:false, course: "45"},
    {city: "Ormuz", distance: 19, direction: "W", maritime:false, course: "4"},
    {city: "Tabrez", distance: 8, direction: "W", maritime:false, course: "42"},
    {city: "Isfahan", distance: 9, direction: "W", maritime:false, course: "42"},
    {city: "Baghdad", distance: 10, direction: "W", maritime:false, course: "42"},
    {city: "Damascus", distance: 13, direction: "W", maritime:false, course: "42"},
    {city: "Gulf Port", distance: 13, direction: "W", maritime:false, course: "42"},
]},
{cityName:"Tabrez",zone:"2",city:true,port:false,nearest:[
    {city: "Trabizond", distance: 3, direction: "N", maritime:false, course: "2"},
    {city: "Samarkand", distance: 8, direction: "E", maritime:false, course: "24"},
    {city: "Isfahan", distance: 5, direction: "E", maritime:false, course: "2"},
    {city: "Baghdad", distance: 6, direction: "S", maritime:false, course: "2"},
    {city: "Damascus", distance: 9, direction: "W", maritime:false, course: "2"},
    {city: "Gulf Port", distance: 9, direction: "W", maritime:false, course: "2"},
]},
{cityName:"Isfahan",zone:"2",city:true,port:false,nearest:[
    {city: "Ormuz", distance: 3, direction: "W", maritime:false, course: "2"},
    {city: "Baghdad", distance: 4, direction: "N", maritime:false, course: "2"},
    {city: "Tabrez", distance: 5, direction: "N", maritime:false, course: "2"},
    {city: "Samarkand", distance: 9, direction: "E", maritime:false, course: "24"},
    {city: "Damascus", distance: 10, direction: "W", maritime:false, course: "2"},
    {city: "Gulf Port", distance: 10, direction: "W", maritime:false, course: "2"},
]},
{cityName:"Gulf Port",zone:"2",city:false,port:true,nearest:[
    {city: "Ormuz", distance: 6, direction: "S", maritime:true, course: "D"},
    {city: "Baghdad", distance: 5, direction: "E", maritime:false, course: "2"},
    {city: "Damascus", distance: 6, direction: "N", maritime:false, course: "2"},
    {city: "Tabrez", distance: 9, direction: "N", maritime:false, course: "2"},
    {city: "Isfahan", distance: 10, direction: "E", maritime:false, course: "2"},
    {city: "Samarkand", distance: 13, direction: "E", maritime:false, course: "24"},
]},
{cityName:"Baghdad",zone:"2",city:true,port:false,nearest:[
    {city: "Isfahan", distance: 4, direction: "S", maritime:false, course: "2"},
    {city: "Gulf Port", distance: 5, direction: "W", maritime:false, course: "2"},
    {city: "Damascus", distance: 5, direction: "W", maritime:false, course: "2"},
    {city: "Tabrez", distance: 6, direction: "N", maritime:false, course: "2"},
    {city: "Samarkand", distance: 10, direction: "E", maritime:false, course: "24"},
]},
{cityName:"Ormuz",zone:"2",city:true,port:true,nearest:[
    {city: "Gulf Port", distance: 6, direction: "N", maritime:true, course: "D"},
    {city: "Zeila", distance: 8, direction: "W", maritime:true, course: "D"},
    {city: "Aden", distance: 8, direction: "W", maritime:true, course: "D"},
    {city: "Diu", distance: 5, direction: "S", maritime:true, course: "D"},
    {city: "Agra Port", distance: 5, direction: "S", maritime:true, course: "D"},
    {city: "Bombay", distance: 8, direction: "S", maritime:true, course: "D"},
    {city: "Colombo", distance: 13, direction: "E", maritime:true, course: "D"},
    {city: "Madras", distance: 15, direction: "E", maritime:true, course: "D"},
    {city: "Chittagong", distance: 19, direction: "E", maritime:true, course: "DE"},
    {city: "Malacca", distance: 21, direction: "E", maritime:true, course: "DE"},
    {city: "Isfahan", distance: 3, direction: "N", maritime:false, course: "2"},
    {city: "Diu", distance: 5, direction: "S", maritime:false, course: "4"},
    {city: "Kashgar", distance: 15, direction: "E", maritime:false, course: "4"},
    {city: "Samarkand", distance: 19, direction: "E", maritime:false, course: "4"},
    {city: "Agra", distance: 26, direction: "S", maritime:false, course: "45"},
]},
{cityName:"Bombay",zone:"5",city:true,port:true, nearest:[
    {city: "Agra", distance: 5, direction: "N", maritime:false, course: "5"},
    {city: "Madras", distance: 4, direction: "E", maritime:false, course: "5"},
    {city: "Agra Port", distance: 3, direction: "N", maritime:true, course: "5"},
    {city: "Diu", distance: 10, direction: "N", maritime:true, course: "D"},
    {city: "Ormuz", distance: 8, direction: "N", maritime:true, course: "D"},
    {city: "Zeila", distance: 10, direction: "W", maritime:true, course: "D"},
    {city: "Aden", distance: 10, direction: "W", maritime:true, course: "D"},
    {city: "Colombo", distance: 4, direction: "E", maritime:true, course: "D"},
    {city: "Madras", distance: 6, direction: "E", maritime:true, course: "DE"},
    {city: "Chittagong", distance: 10, direction: "E", maritime:true, course: "E"},
    {city: "Malacca", distance: 12, direction: "E", maritime:true, course: "E"},
]},
{cityName:"Colombo",zone:"5",city:true,port:true,nearest:[
    {city: "Aden", distance: 9, direction: "W", maritime:true, course: "D"},
    {city: "Zeila", distance: 9, direction: "W", maritime:true, course: "D"},
    {city: "Bombay", distance: 4, direction: "N", maritime:true, course: "D"},
    {city: "Agra Port", distance: 15, direction: "N", maritime:true, course: "D"},
    {city: "Diu", distance: 15, direction: "N", maritime:true, course: "D"},
    {city: "Ormuz", distance: 13, direction: "N", maritime:true, course: "D"},
    {city: "Madras", distance: 3, direction: "N", maritime:true, course: "E"},
    {city: "Chittagong", distance: 7, direction: "E", maritime:true, course: "E"},
    {city: "Malacca", distance: 9, direction: "E", maritime:true, course: "E"},
]},
{cityName:"Diu",zone:"5",city:true,port:true, nearest:[
    {city: "Agra Port", distance: 2, direction: "S", maritime:true, course: "D"},
    {city: "Ormuz", distance: 5, direction: "N", maritime:true, course: "D"},
    {city: "Zeila", distance: 10, direction: "W", maritime:true, course: "D"},
    {city: "Aden", distance: 10, direction: "W", maritime:true, course: "D"},
    {city: "Colombo", distance: 15, direction: "S", maritime:true, course: "D"},
    {city: "Bombay", distance: 10, direction: "S", maritime:true, course: "D"},
    {city: "Madras", distance: 17, direction: "E", maritime:true, course: "DE"},
    {city: "Chittagong", distance: 21, direction: "E", maritime:true, course: "DE"},
    {city: "Malacca", distance: 23, direction: "E", maritime:true, course: "DE"},
    {city: "Ormuz", distance: 5, direction: "N", maritime:false, course: "4"},
    {city: "Agra", distance: 3, direction: "E", maritime:false, course: "5"},
    {city: "Kashgar", distance: 14, direction: "N", maritime:false, course: "54"},
    {city: "Samarkand", distance: 18, direction: "N", maritime:false, course: "54"},
]},
{cityName:"Madras",zone:"5",city:true,port:true,nearest:[
    {city: "Bombay", distance: 4, direction: "W", maritime:false, course: "5"},
    {city: "Chittagong", distance: 9, direction: "E", maritime:false, course: "5"},
    {city: "Agra", distance: 12, direction: "W", maritime:false, course: "5"},
    {city: "Zeila", distance: 11, direction: "W", maritime:true, course: "D"},
    {city: "Aden", distance: 11, direction: "W", maritime:true, course: "D"},
    {city: "Ormuz", distance: 15, direction: "W", maritime:true, course: "D"},
    {city: "Diu", distance: 17, direction: "W", maritime:true, course: "D"},
    {city: "Agra Port", distance: 17, direction: "W", maritime:true, course: "D"},
    {city: "Bombay", distance: 6, direction: "W", maritime:true, course: "ED"},
    {city: "Colombo", distance: 3, direction: "S", maritime:true, course: "E"},
    {city: "Chittagong", distance: 6, direction: "E", maritime:true, course: "E"},
    {city: "Malacca", distance: 8, direction: "E", maritime:true, course: "E"},
]},
{cityName:"Isfahan",zone:"2",city:true,port:false,nearest:[
    {city: "Ormuz", distance: 3, direction: "S", maritime:false, course: "2"},
    {city: "Baghdad", distance: 4, direction: "N", maritime:false, course: "2"},
    {city: "Tabrez", distance: 3, direction: "N", maritime:false, course: "2"},
    {city: "Damascus", distance: 10, direction: "W", maritime:false, course: "2"},
    {city: "Gulf Port", distance: 10, direction: "W", maritime:false, course: "2"},
    {city: "Samarkand", distance: 9, direction: "E", maritime:false, course: "24"},
]},
{cityName:"Kashgar",zone:"6",city:true,port:false, nearest:[
    {city: "Samarkand", distance: 6, direction: "W", maritime:false, course: "4"},
    {city: "Diu", distance: 14, direction: "S", maritime:false, course: "45"},
    {city: "Agra", distance: 15, direction: "S", maritime:false, course: "45"},
    {city: "Ormuz", distance: 15, direction: "W", maritime:false, course: "4"},
    {city: "Kharakhoto", distance: 6, direction: "N", maritime:false, course: "6"},
]},
{cityName:"Agra Port",zone:"5",city:false,port:true,nearest:[
    {city: "Agra", distance: 1, direction: "E", maritime:false, course: "5"},
    {city: "Diu", distance: 2, direction: "N", maritime:true, course: "5"},
    {city: "Ormuz", distance: 5, direction: "N", maritime:true, course: "54"},
    {city: "Zeila", distance: 10, direction: "W", maritime:true, course: "D"},
    {city: "Aden", distance: 10, direction: "W", maritime:true, course: "D"},
    {city: "Bombay", distance: 3, direction: "S", maritime:true, course: "D"},
    {city: "Colombo", distance: 15, direction: "S", maritime:true, course: "D"},
    {city: "Madras", distance: 17, direction: "E", maritime:true, course: "DE"},
    {city: "Chittagong", distance: 21, direction: "E", maritime:true, course: "DE"},
    {city: "Malacca", distance: 23, direction: "E", maritime:true, course: "DE"},
]},
{cityName:"Agra",zone:"5",city:true,port:false,nearest:[
    {city: "Diu", distance: 3, direction: "W", maritime:false, course: "5"},
    {city: "Bombay", distance: 5, direction: "S", maritime:false, course: "5"},
    {city: "Madras", distance: 12, direction: "S", maritime:false, course: "5"},
    {city: "Chittagong", distance: 11, direction: "E", maritime:false, course: "5"},
    {city: "Kashgar", distance: 15, direction: "N", maritime:false, course: "54"},
    {city: "Samarkand", distance: 19, direction: "N", maritime:false, course: "54"},
    {city: "Ormuz", distance: 26, direction: "W", maritime:false, course: "54"},
]},
  {cityName: "Chittagong", zone: "5", city: true, port: true, nearest: [
    { city: "Madras", distance: 9, direction: "W", maritime: false, course: "5" },
    { city: "Bombay", distance: 10, direction: "W", maritime: true , course: "E"},
    { city: "Madras", distance: 6, direction: "W", maritime: true, course: "E" },
    { city: "Colombo", distance: 7, direction: "W", maritime: true, course: "E" },
    { city: "Diu", distance: 21, direction: "W", maritime: true, course: "ED" },
    { city: "Agra", distance: 11, direction: "W", maritime: false, course: "5" },
    { city: "Malacca", distance: 8, direction: "E", maritime: true, course: "E" },
    { city: "Hsian", distance: 11, direction: "N", maritime: false , course: "6"},
    { city: "Yunnan", distance: 8, direction: "N", maritime: false, course: "8" },
    { city: "Mongla", distance: 14, direction: "E", maritime: false , course: "8"},
    { city: "Canton", distance: 18, direction: "N", maritime: false , course: "8"},
  ]},
  { cityName: "Malacca", zone: "8", city: true, port: true, nearest: [
    { city: "Chittagong", distance: 9, direction: "W", maritime: true , course: "E"},
    { city: "Madras", distance: 8, direction: "W", maritime: true , course: "E"},
    { city: "Bombay", distance: 12, direction: "W", maritime: true , course: "ED"},
    { city: "Colombo", distance: 9, direction: "W", maritime: true , course: "E"},
    { city: "Diu", distance: 23, direction: "W", maritime: true , course: "ED"},
    { city: "Ormuz", distance: 21, direction: "W", maritime: true , course: "ED"},
    { city: "Zeila", distance: 18, direction: "W", maritime: true , course: "ED"},
    { city: "Mongla", distance: 8, direction: "N", maritime: false , course: "8"},
    { city: "Palembang", distance: 2, direction: "S", maritime: true , course: "F"},
    { city: "Mongla", distance: 7, direction: "N", maritime: true , course: "F"},
    { city: "Canton", distance: 10, direction: "N", maritime: true , course: "F"},
    { city: "Manila", distance: 11, direction: "N", maritime: true , course: "F"},
    { city: "Taiwan", distance: 13, direction: "N", maritime: true , course: "F"},
    { city: "Nanjing", distance: 15, direction: "N", maritime: true , course: "F"},
    { city: "Nagasaki", distance: 17, direction: "N", maritime: true , course: "F"},
  ]},
  { cityName: "Kharakhoto", zone: "6", city: true, port: false, nearest: [
    { city: "Hsian", distance: 4, direction: "S", maritime: false , course: "6"},
    { city: "Beijing", distance: 3, direction: "E", maritime: false, course: "6" },
    { city: "Kashgar", distance: 6, direction: "S", maritime: false, course: "6" },
  ]},
{cityName:"Palembang",zone:"8",city:true,port:true,nearest:[
    { city: "Malacca", distance: 2, direction: "N", maritime: true , course: "F"},
    { city: "Mongla", distance: 7, direction: "N", maritime: true , course: "F"},
    { city: "Manila", distance: 11, direction: "N", maritime: true , course: "F"},
    { city: "Canton", distance: 10, direction: "N", maritime: true , course: "F"},
    { city: "Taiwan", distance: 13, direction: "N", maritime: true , course: "F"},
    { city: "Nanjing", distance: 15, direction: "N", maritime: true, course: "F" },
    { city: "Nagasaki", distance: 17, direction: "N", maritime: true, course: "F" },
]},
{cityName:"Mongla",zone:"8",city:true,port:true, nearest:[
    { city: "Malacca", distance: 8, direction: "S", maritime: false, course: "8"},
    { city: "Chittagong", distance: 14, direction: "W", maritime: false, course: "8"},
    { city: "Yunnan", distance: 20, direction: "N", maritime: false, course: "8"},
    { city: "Canton", distance: 12, direction: "N", maritime: false, course: "86"},
    { city: "Malacca", distance: 7, direction: "S", maritime: true , course: "F"},
    { city: "Palembang", distance: 7, direction: "S", maritime: true , course: "F"},
    { city: "Canton", distance: 9, direction: "N", maritime: true , course: "F"},
    { city: "Manila", distance: 10, direction: "N", maritime: true , course: "F"},
    { city: "Taiwan", distance: 12, direction: "N", maritime: true , course: "F"},
    { city: "Nanjing", distance: 14, direction: "N", maritime: true, course: "F"},
    { city: "Nagasaki", distance: 16, direction: "N", maritime: true , course: "F"},
]},
{cityName:"Canton",zone:"6",city:true,port:true, nearest:[
    { city: "Yunnan", distance: 5, direction: "W", maritime: false, course: "6"},
    { city: "Mongla", distance: 12, direction: "S", maritime: false, course: "8" },
    { city: "Chittagong", distance: 18, direction: "W", maritime: false, course: "8" },
    { city: "Mongla", distance: 9, direction: "S", maritime: true, course: "F" },
    { city: "Malacca", distance: 10, direction: "S", maritime: true, course: "F" },
    { city: "Palembang", distance: 10, direction: "S", maritime: true, course: "F" },
    { city: "Manila", distance: 3, direction: "E", maritime: true, course: "F" },
    { city: "Taiwan", distance: 4, direction: "N", maritime: true, course: "F" },
    { city: "Nanjing", distance: 6, direction: "N", maritime: true, course: "F" },
    { city: "Nagasaki", distance: 8, direction: "N", maritime: true, course: "F" },
]},
{cityName:"Yunnan",zone:"6",city:true,port:false,nearest:[
    { city: "Nanjing", distance: 9, direction: "N", maritime: false, course: "6" },
    { city: "Hsian", distance: 6, direction: "N", maritime: false, course: "6" },
    { city: "Canton", distance: 5, direction: "E", maritime: false, course: "6" },
    { city: "Chittagong", distance: 8, direction: "S", maritime: false, course: "8" },
    { city: "Mongla", distance: 20, direction: "S", maritime: false, course: "8" },
]},
{cityName:"Manila",zone:"7",city:true,port:true,nearest:[
    { city: "Mongla", distance: 10, direction: "S", maritime: true, course: "F" },
    { city: "Malacca", distance: 11, direction: "S", maritime: true, course: "F" },
    { city: "Palembang", distance: 11, direction: "S", maritime: true, course: "F" },
    { city: "Canton", distance: 3, direction: "W", maritime: true, course: "F" },
    { city: "Taiwan", distance: 4, direction: "N", maritime: true, course: "F" },
    { city: "Nanjing", distance: 6, direction: "N", maritime: true, course: "F" },
    { city: "Nagasaki", distance: 7, direction: "N", maritime: true, course: "F" },
]},
{cityName:"Hsian",zone:"6",city:true,port:false,nearest:[
    { city: "Beijing", distance: 3, direction: "N", maritime: false, course: "6" },
    { city: "Kharakhoto", distance: 4, direction: "N", maritime: false, course: "6" },
    { city: "Chittagong", distance: 11, direction: "S", maritime: false, course: "6" },
    { city: "Yunnan", distance: 6, direction: "S", maritime: false, course: "6" },
    { city: "Nanjing", distance: 4, direction: "E", maritime: false, course: "6" },
    { city: "Canton", distance: 10, direction: "S", maritime: false, course: "6" },
]},
{cityName:"Beijing",zone:"6",city:true,port:false,nearest:[
    { city: "Kharakhoto", distance: 5, direction: "W", maritime: false, course: "6" },
    { city: "Hsian", distance: 3, direction: "W", maritime: false, course: "6" },
    { city: "Nanjing", distance: 3, direction: "S", maritime: false, course: "6" },
]},
{cityName:"Nanjing",zone:"6",city:true,port:true,nearest:[
    { city: "Beijing", distance: 3, direction: "N", maritime: false, course: "6" },
    { city: "Hsian", distance: 4, direction: "W", maritime: false, course: "6" },
    { city: "Yunnan", distance: 9, direction: "S", maritime: false, course: "6" },
    { city: "Canton", distance: 7, direction: "S", maritime: false, course: "6" },
    { city: "Nagasaki", distance: 3, direction: "E", maritime: true, course: "F" },
    { city: "Taiwan", distance: 4, direction: "S", maritime: true, course: "F" },
    { city: "Manila", distance: 7, direction: "S", maritime: true, course: "F" },
    { city: "Canton", distance: 6, direction: "S", maritime: true, course: "F" },
    { city: "Mongla", distance: 14, direction: "S", maritime: true, course: "F" },
    { city: "Malacca", distance: 15, direction: "S", maritime: true, course: "F" },
    { city: "Palembang", distance: 15, direction: "S", maritime: true, course: "F" },
]},
{cityName:"Nagasaki",zone:"7",city:true,port:true,nearest:[
    { city: "Nanjing", distance: 3, direction: "W", maritime: true, course: "F" },
    { city: "Taiwan", distance: 5, direction: "S", maritime: true, course: "F" },
    { city: "Manila", distance: 7, direction: "S", maritime: true, course: "F" },
    { city: "Canton", distance: 8, direction: "S", maritime: true, course: "F" },
    { city: "Manila", distance: 8, direction: "S", maritime: true, course: "F" },
    { city: "Mongla", distance: 13, direction: "S", maritime: true, course: "F" },
    { city: "Malacca", distance: 17, direction: "S", maritime: true, course: "F" },
    { city: "Palembang", distance: 17, direction: "S", maritime: true, course: "F" },
]},
{cityName:"Taiwan",zone:"7",city:true,port:true,nearest:[
    { city: "Nagasaki", distance: 6, direction: "N", maritime: true, course: "F" },
    { city: "Nanjing", distance: 5, direction: "N", maritime: true, course: "F" },
    { city: "Manila", distance: 4, direction: "S", maritime: true, course: "F" },
    { city: "Canton", distance: 4, direction: "S", maritime: true, course: "F" },
    { city: "Mongla", distance: 12, direction: "S", maritime: true, course: "F" },
    { city: "Malacca", distance: 13, direction: "S", maritime: true, course: "F" },
    { city: "Palembang", distance: 13, direction: "S", maritime: true, course: "F"},
]},
];
//city descriptions
const cityInfo = [
    { city: "Venice", description: "A powerful maritime republic known for its intricate canals and majestic architecture, Venice dominates Mediterranean trade with its extensive fleet. The city is a bustling center of commerce, connecting Europe with the riches of the East." },
    { city: "Constantinople", description: "The capital of the Byzantine Empire, Constantinople is a fortified city at the crossroads of Europe and Asia. It boasts impressive walls, vibrant markets, and a rich cultural heritage, serving as a hub for trade and diplomacy." },
    { city: "Alexandria", description: "A vital port of Egypt, Alexandria is famed for its ancient lighthouse and the Great Library, which attracted scholars and merchants alike. Its bustling harbor facilitates trade routes connecting Africa, Asia, and Europe." },
    { city: "Damascus Port", description: "This key Syrian trade hub links the Mediterranean with the rich inland routes of the Silk Road. Known for its skilled artisans, Damascus Port serves as a vital point for commerce and cultural exchange." },
    { city: "Tana", description: "A Genoese trading colony on the Sea of Azov, Tana is crucial for commerce between Europe and the vast Mongol Empire. Its markets are alive with goods from distant lands, making it a melting pot of cultures." },
    { city: "Trabizond", description: "A fortified city along the Black Sea, Trabizond is a vital gateway for silk and spice trade between Asia and Europe. Its strategic location and thriving commerce make it a key player in regional politics." },
    { city: "Damascus", description: "One of the oldest continuously inhabited cities, Damascus is renowned for its exquisite textiles and steel. A vibrant center of culture and trade, it connects various trade routes across the Middle East." },
    { city: "Zeila", description: "A bustling Somali port city, Zeila is known for trading ivory, incense, and slaves. Its strategic location along the Red Sea and Indian Ocean makes it an essential hub for maritime commerce." },
    { city: "Aden", description: "Located at the entrance of the Red Sea, Aden is a thriving port city that connects Indian Ocean trade with Arabian markets. Its strategic position enhances its role in regional trade networks." },
    { city: "Samarkand", description: "A key Silk Road city, Samarkand is famed for its wealth and vibrant culture. It serves as a major crossroads for merchants traveling between East and West, showcasing a blend of various cultures." },
    { city: "Tabrez", description: "A major trade hub in Persia, Tabriz attracts merchants from China, Byzantium, and the Arab world. Its bustling bazaars and diverse population reflect the rich tapestry of cultures that converge here." },
    { city: "Isfahan", description: "Known for its stunning architecture and gardens, Isfahan is a cultural and commercial center in Persia. It lies on the Silk Road, making it a vital point for trade and cultural exchange." },
    { city: "Gulf Port", description: "A trade hub in the Persian Gulf, this port connects Arabia with Indian Ocean trade. Its strategic location facilitates commerce and cultural exchanges between various maritime powers." },
    { city: "Baghdad", description: "The heart of the Islamic world, Baghdad is renowned for its scholars, libraries, and vibrant markets. Though recovering from Mongol invasions, it remains a vital center for trade and knowledge." },
    { city: "Ormuz", description: "A crucial island port controlling the entrance to the Persian Gulf, Ormuz is vital for trade between Europe, the Middle East, and Asia. Its markets are bustling with spices, silks, and precious gems." },
    { city: "Bombay", description: "Currently a small fishing village, Bombay is located on India’s western coast. Its natural harbor hints at future potential for growth into a significant port city." },
    { city: "Colombo", description: "A bustling port city on the island of Sri Lanka, Colombo is known for its spices and connection to Arab and Indian trade routes. Its strategic location fosters vibrant commerce and cultural interactions." },
    { city: "Diu", description: "A strategic port on India’s west coast, Diu plays a key role in the spice trade. Its coastal defenses and position make it essential for controlling trade routes in the region." },
    { city: "Madras", description: "A small coastal village on India's southeastern coast, Madras is beginning to establish itself along Indian Ocean trade routes. Its growth hints at future significance in regional commerce." },
    { city: "Kashgar", description: "A crucial Silk Road city, Kashgar acts as a gateway between China and Central Asia. Its markets teem with goods and cultures from across the continent, highlighting its significance in trade." },
    { city: "Agra Port", description: "A port in northern India that connects to the Ganges trade routes. It serves as a key transit point for goods moving to and from the heart of the subcontinent." },
    { city: "Agra", description: "A prominent city in northern India, Agra is known for its strategic location on major trade routes. Its bustling markets and rich cultural heritage attract merchants and travelers alike." },
    { city: "Chittagong", description: "A vital port city in Bengal, Chittagong is pivotal for maritime trade in the Bay of Bengal. Its location enhances its role as a gateway for goods traveling to and from Southeast Asia." },
    { city: "Malacca", description: "A vital trading port in Southeast Asia, Malacca controls access to the Malacca Strait. Its multicultural population and thriving commerce link the Indian and Pacific Oceans." },
    { city: "Kharakhoto", description: "A remote city in the Gobi Desert, Kharakhoto serves as a key Silk Road stop under Mongol control. Its location aids in connecting the East and West through trade and cultural exchanges." },
    { city: "Palembang", description: "A major trading port in Sumatra, Palembang is a hub for the Srivijaya Empire’s spice trade. Its strategic position enhances its importance in regional commerce and cultural interactions." },
    { city: "Mongla", description: "Located near the Sundarbans, Mongla is an important port city in Bangladesh, facilitating trade through its access to the Bay of Bengal. Its strategic position makes it a crucial gateway for goods moving to and from inland markets, enhancing regional commerce. The city's proximity to the mangrove forests also provides a unique ecological backdrop." },
    { city: "Canton", description: "A thriving Chinese port city, Canton facilitates extensive trade with the wider Indian Ocean region. Its markets are alive with goods from across Asia, making it a bustling commercial hub." },
    { city: "Yunnan", description: "A mountainous region in southwest China, Yunnan is important for its tea production and trade with Southeast Asia. Its diverse cultures reflect the region's historical connections." },
    { city: "Manila", description: "Currently a small coastal settlement in the Philippines, Manila is beginning to establish trade connections with China. Its location hints at future growth in maritime commerce." },
    { city: "Hsian", description: "A key Silk Road city, Hsian was once the capital of several Chinese dynasties. Known for its cosmopolitan culture, it attracts merchants and scholars from distant lands." },
    { city: "Beijing", description: "Under Mongol rule, Beijing is emerging as the capital of the Yuan dynasty. Its political and economic significance is growing, making it a vital center in East Asia." },
    { city: "Nanjing", description: "A major city in southern China, Nanjing serves as an administrative and commercial hub. Its historical importance and strategic location enhance its role in regional trade." },
    { city: "Nagasaki", description: "Currently a small fishing village in Japan, Nagasaki is beginning to establish trade connections with China. Its coastal location offers potential for future growth." },
    { city: "Taiwan", description: "An island inhabited by indigenous peoples, Taiwan is yet to become a key player in regional trade. Its strategic location hints at future importance in maritime commerce." }
];


//events
var events = [
    {desc:"There are too many products in the city market. Eager to sell, you make a bad deal and lose 5 florins in the transaction. You earn 1 experience point.", zone:["1","2","3"], outcomes:[
        {
            money: -5,
            xp: 1,
        },
    ]},
    {desc:"You are facing a wolf pack.", zone:["1","2","3"], outcomes:[
        {
            event: "You manage to defend and earn 3 experience points.",
            xp: 3,
        },
        {
            event: "You are cornered, and your progress is delayed.",
            delay: true,
        },
    ]},
    {desc:"You are invited to participate in a hunt.", zone:["2","3","4","5"], outcomes:[
        {
            event: "You kill a bear and earn 3 experience points.",
            xp: 3,

        },
        {
            event: "You fail to achieve anything.",
        },
        {
            event: "You injure yourself and your progress is delayed.",
            delay: true,
        },
    ]},
    {desc:"Crossing a desert, you are bitten by a snake. The venom is not deadly.", zone:["2","3","4","5"], outcomes:[
        {
            event: "You continue your journey.",
        },
        {
            event:  "Your progress is delayed.",
            delay: true,
        },
    ]},
    {desc:"You are invited to a Buddhist monastery, where you have a mystic experience.", zone:["5","6","7"], outcomes:[
        {
            event: "You earn 3 experience points.",
            xp: 3,
        },
        {
            event:"You earn 5 experience points.",
            xp: 5,
        },
        {
            event:   "You earn 1 experience point.",
            xp: 1,
        },
    ]},
    {desc:"You sent a message to the Grand Khan that brought you favor.", zone:["6"], outcomes:[
        {
            event: "You earn 3 experience points.",
            xp: 3,
        },
        {
            event: "You earn 5 florins.",
            money: 5,
        }
    ]},
    {desc:"You have run out of water in the desert.", zone:["3", "4", "6"], outcomes:[
        {
            event: "You discover an oasis and earn 1 experience point.",
            xp: 1,
        },
        {
            event: "You discover an ancient city with a well. You earn 2 experience points.",
            xp: 2,
        },
        {
            event: "You discover a small puddle. Your transportation can only carry half of your cargo. The rest is lost.",
            cargoLoss: "half",
        },
    ]},
    {desc:"You are cornered by bandits.", zone:["3", "4"], outcomes:[
        {
            get otherActions() {
                let result = hasFreePass();
                let obj;
                if (result) {
                    obj = {
                        event: "You use one of your free passes and continue without repercussions. You earn 1 experience point.",
                        passes: -1,
                        xp: 1,
                    }
                } else {
                    let ransom = randInt(2, Math.min(12, florins - 1));
                    obj = {
                        event: ("You need to pay " + ransom + " florins as ransom. You earn 1 experience point."),
                        xp: 1,
                        money: random*(-1),
                    }
                }
                return obj;
            }
        },
    ]},
    {desc:"You meet Persian merchants who convince you to give them some of your provisions for 10 florins. You gain 2 experience points.", zone:["2", "3", "4", "5"], outcomes:[
        {
            money: 10,
            xp: 2,
        },
    ]},
    {desc:"Your escorts abandon you.", zone:["1", "2", "3"], outcomes:[
        {
            event: "You find the way on your own and earn 1 experience point.",
            xp: 1,
        },
        {
            event: "You follow the wrong way but find a shortcut, earning 2 experience points.",
            xp: 2,
        },
        {
            event: "You are lost and your progress is delayed.",
            delay: true,
        },
    ]},
    {desc:"You save a nomad chief from a serious illness. Grateful, he gives you some cargo.", zone:["2", "3"], outcomes:[
        {
           get otherActions() {
                let result = howMuchCargoSpace();
                let obj;
                if (result > 0) {
                    let theCargo = getRandomItem(cargoGoods);
                    currentCargo[theCargo] += 1;
                    obj = {
                        event: ("You accept the cargo of " + theCargo + " and earn 1 experience point."),
                        xp: 1,
                    }
                } else {
                    obj = {
                        event: ("You don't have any cargo room left, so you exchange it for 20 florins."),
                        money: 20,
                    }
                }
                return obj;
            }
        },
    ]},
    {desc:"You take castaways on board your ship and learn the sea is full of pirates.", zone:["D", "E", "F"], outcomes:[
        {
            event: "Your progress is delayed.",
            delay: true,
        },
        {
            event: "You continue your journey and earn 1 experience point.",
            xp: 1,
        },
    ]},
    {desc:"You find a bag full of florins.", zone:["5", "6", "7", "8"], outcomes:[
        {
            event: "You keep the treasure, earning 80 florins.",
            money: 80,
        },
        {
            event: "You deliver the bag to the nearest representative of the Grand Khan and he rewards you with 10 florins, 2 free passes, and 3 experience points.",
            xp: 3,
            money: 10,
            passes: 2,
        },
        {
            event: "You are arrested, lose all your cargo, and your progress is delayed.",
            delay: true,
            cargoLoss: "all",
        },
    ]},
    {desc:"Your ship runs aground.", zone:["A", "B", "C", "D", "E", "F"], outcomes:[
        {
            event: "You succeed and earn 1 experience point.",
            xp: 1,
        },
        {
            event: "Your progress is delayed, as you have to wait for the next tide.",
            delay: true,
        },
    ]},
    {desc:"There is a disease on board the ship, and many fall ill.", zone:["A", "B", "C", "D", "E", "F"], outcomes:[
        {
            event: "You cure the sick and earn 2 experience points.",
            xp: 2,
        },
        {
            event: "You cure the sick, but your progress is delayed. You earn 1 experience point.",
            xp: 1,
            delay: true,
        },
        {
            event: "Many sailors die. You are delayed.",
            delay: true,
        },
    ]},
    {desc:"The food purveyor deceived you, and much of the food is spoiled. You delay and pay 5 florins for new supplies. You gain 2 experience points", zone:["B", "D", "E", "F"], outcomes:[
        {
            event: "",
            xp: 2,
            money: -5,
            delay: true,
        },
    ]},
    {desc:"A merchant from Genova is held in a prison.", zone:["4", "5", "6", "7", "8"], outcomes:[
        {
            get otherActions() {
                let result = hasFreePass();
                let obj;
                if (result) {
                    obj = {
                        event: "You use one of your free passes to release him. He is very grateful and gives you 10 florins. You also earn 2 experience points.",
                        passes: -1,
                        xp: 2,
                        money: 10,
                    }
                } else {
                    obj = {
                        event: ("Without any free passes, you cannot release him. The event affects you, and your journey is delayed. You earn 1 experience point."),
                        delay: true,
                        xp: 1,
                    }
                }
                return obj;
            }
        }
    ]},
    {desc:"A beggar foretells bad news and disasters during a religious ceremony.", zone:["2", "3", "4"], outcomes:[
        {
            event: "Your progress is delayed.",
            delay: true,
        },
        {
            event: "You continue your journey and earn 2 experience points.",
            xp: 2,
        },
        {
            event: "You become lost in a blizzard, delaying and losing half of your cargo. You earn 5 experience points.",
            xp: 5,
            cargoLoss: "half",
            delay: true,
        },
    ]},
    {desc:"You are invited for dinner at a local lord's table. You must offer a gift.", zone:["2", "3", "4", "5", "6"], outcomes:[
        {
            get otherActions() {
                let obj;
                let totalCurrentCargo = Object.values(currentCargo).reduce((sum, quantity) => sum + quantity, 0);
                if (totalCurrentCargo == 0) {
                    obj = {
                        event: "However, you have nothing to give, and the lord is offended. Your progress is delayed, as you spend some time in the prison.",
                        delay: true,
                    }
                }
                else {
                    let availableKeys = Object.keys(currentCargo).filter(key => currentCargo[key] > 0);
                    let theGift = getRandomItem(availableKeys);
                    currentCargo[theGift]--;
                    if (["spices", "textiles", "handicraft"].includes(theGift)) {
                        obj = {
                            event: ("You gifted " + theGift + ", which isn't very appreciated. You don't earn anything from the event."),
                        }
                    }
                    else if (["porcelain", "gems"].includes(theGift)) {
                        obj = {
                            event: ("You gifted " + theGift + ", which is appreciated. The lord offers you 40 florins in return."),
                            money: 40,
                        }
                    }
                    else {
                        obj = {
                            event: ("You gifted " + theGift + ", which is very appreciated. You get 60 florins and 3 experience points."),
                            xp: 3,
                            money: 60,
                        }
                    }
                }
                return obj;
            }
        }
    ]},
    {desc:"You save a passerby from a bandit's attack. The man happens to be an important local prince.", zone:["2", "4", "5", "6"], outcomes:[
        {
            event: "The man succumbs to his injuries, but first offers you 20 florins.",
            money: 20,
        },
        {
            event: "The man survives and you discover he plans a revolution against the Grand Khan. You earn 5 experience points.",
            xp: 5,
        },
        {
            event: "More bandits appear, and you have to escape. You earn nothing from this event.",
        },
    ]},
    {desc:"Your journey is interrupted as you are trapped between two warring nations.", zone:["4", "5", "6", "7", "8"], outcomes:[
        {
            get otherActions() {
                let result = hasFreePass();
                let obj;
                if (result) {
                    if (Math.random() > 0.5) {
                        obj = {
                            event: "You use one of your free passes and your intervention helps cease hostilities. You earn 3 experience points.",
                            passes: -1,
                            xp: 3,
                        }
                    }
                    else {
                        obj = {
                            event: "You use one of your free passes, but your intervention doesn't help. You must pay 3 florins to be allowed to continue.",
                            passes: -1,
                            money: -3,
                        }
                    }
                } else {
                    obj = {
                        event: ("Without any free passes, you can do nothing but wait. Your journey is delayed."),
                        delay: true,
                    }
                }
                return obj;
            }
        }
    ]},
    //{desc:"", zone:[ "6"]},
    {desc:"An administrator requires a fee of 5 florins to let you pass.", zone:["1", "2", "3", "4", "5"], outcomes: [
        {
            get otherActions() {
                let obj;
                let totalCurrentCargo = Object.values(currentCargo).reduce((sum, quantity) => sum + quantity, 0);
                if (florins > 5) {
                    obj = {
                        event: "",
                        money: -5,
                    }
                }
                else {
                    if (totalCurrentCargo == 0) {
                        obj = {
                            event: "You have neither florins nor cargo, so you are imprisoned. Your journey is delayed, but you earn 2 experience points.",
                            delay: true,
                            xp: 2,
                        }
                    }
                    else {
                        let availableKeys = Object.keys(currentCargo).filter(key => currentCargo[key] > 0);
                        let theGift = getRandomItem(availableKeys);
                        currentCargo[theGift]--;
                        obj = {
                            event: ("You have no florins left to pay, but you give " + theGift + ", which is accepted as payment."),
                        }
                    }
                }
                return obj;
            }
        }
    ]},
    {desc:"A landslide blocks your passage.", zone:["4", "5", "6", "8"], outcomes:[
        {
            event: "You are able to continue, but you are delayed.",
            delay: true,
        },
        {
            event: "You find a better passage and earn 2 experience points.",
            xp: 2,
        },
        {
            event: "Your progress is delayed and you lose half your cargo trying to find a passage.",
            cargoLoss: "half",
            delay: true,
        },
    ]},
    //{desc:"", zone:["1", "2", "3", "4", "5", "6", "7", "8", "A", "B", "C", "D", "E", "F"]},
    {desc:"The sailors go ashore for supplies but are captured by pirates.", zone:["B", "D", "E", "F"], outcomes:[
        {
            event: "You manage to release them, but you are delayed. You earn 2 experience points.",
            delay: true,
            xp: 2,
        },
        {
            event: "You must pay 5 florins as ransom.",
            money: -5,
        },
    ]},
    {desc:"The court officials are envious of the Europeans' influence on the Grand Khan and conspire against them.", zone:["6", "8"], outcomes:[
        {
            event: "The conspiracy fails and you earn 2 experience points.",
            xp: 2,
        },
        {
            event: "You are poisoned and your progress is delayed.",
            delay: true,
        },
    ]},
    {desc:"Some prisoners are facing execution in a town.", zone:["4", "5", "6", "7", "8"], outcomes:[
        {
            get otherActions() {
                let result = hasFreePass();
                let obj;
                if (!result) {
                    if (Math.random() > 0.5) {
                        obj = {
                            event: "You convince the governor to release them and earn 2 experience points.",
                            xp: 2,
                        }
                    }
                    else {
                        obj = {
                            event: "Your intervention causes the governor to suspect you. You end up in prison, losing all your cargo and being delayed, but earning 1 experience point.",
                            xp: 1,
                            cargoLoss: "all",
                            delay: true,
                        }
                    }
                } else {
                    obj = {
                        event: ("You use one of your free passes to release them, earning 2 experience points."),
                        xp: 2,
                        passes: -1,
                    }
                }
                return obj;
            }
        }
    ]},
    {desc:"You are facing a storm.", zone:["D", "E", "F"], outcomes:[
        {
            get otherActions() {
                let obj;
                if (Math.random() > 0.5) {
                    if (Math.random() > 0.5) { // 25%
                        obj = {
                            event: "You are saved, but your progress is delayed.",
                            delay: true,
                        }
                    }
                    else { //25%
                        currentLocation = "Venice";
                        florins = 230;
                        currentCargo = {
                            silk: 0,
                            carpets: 0,
                            porcelain: 0,
                            gems: 0,
                            handicraft: 0,
                            textiles: 0,
                            spices: 0,
                        };
                        freePass = 0;
                        currentTransport = "none";
                        obj = {
                            event: "Your ship goes down and you lose everything. You return to Venice and acquire new funds, earning 5 experience points.",
                            xp: 5,
                        }
                    }
                }
                else { //50%
                    obj = {
                        event: "The ship is seriously damaged. You lose half the cargo and are delayed.",
                        delay: true,
                        cargoLoss: "half",
                    }
                }
                return obj;
            }
        }
    ]},
    //{desc:"It's the birthday of the Grand Khan, and you are invited to his celebration.", zone:["1", "2", "3", "4", "5", "6", "7", "8", "A", "B", "C", "D", "E", "F"]},
    {desc:"Chinese scientists show you the effects of gunpowder.", zone:["6"], outcomes:[
        {
            event: "You keep a sample and earn 5 experience points.",
            xp: 5,
        },
        {
            event: "You are not impressed, wasting the opportunity.",
        },
    ]},
    //{desc:"You meet some Arab merchants.", zone:["4", "5", "6", "7", "8"]},
    {desc:"All ports are closed due to pirate activity. Your trip is delayed.", zone:["A", "B", "C", "D", "E", "F"], outcomes: [
        {
            delay:true,
        }
    ]},
    {desc:"Your ship encounters strong headwinds.", zone:["A", "B", "C", "D", "E", "F"], outcomes:[
        {
            event: "You must discard half your cargo.",
            cargoLoss: "half",
        },
        {
            event: "You must discard your entire cargo.",
            cargoLoss: "all",
        },
    ]},
    {desc:"Thick fog envelopes your ship, causing your trip to be delayed.", zone:["A", "B", "C"], outcomes: [
        {
            delay: true,
        }
    ]},
    {desc:"Your ship is boarded by Chinese pirates.", zone:["E", "F"], outcomes:[
        {
            get otherActions() {
                let obj;
                if (Math.random() > 0.5) {
                    if (Math.random() > 0.5) { // 25%
                        obj = {
                            event: "You manage to drive them back, earning 1 experience point.",
                            xp: 1,
                        }
                    }
                    else { //25%
                        obj = {
                            event: "You manage to arrest them, earning 2 experience points and 5 florins.",
                            xp: 2,
                            money: 5,
                        }
                    }
                }
                else { //50%
                    obj = {
                        event: "You are overwhelmed, and end up losing all your cargo.",
                        cargoLoss: "all",
                    }
                }
                return obj;
            }
        }
    ]},
    {desc:"You are delayed due to bad weather.", zone:["4", "5", "6", "8"], outcomes: [
        {
            delay:true
        }
    ]},
    {desc:"You are delayed by a sandstorm crossing a desert.", zone:["3", "4"], outcomes: [
        {
            delay:true
        }
    ]},
];
shuffle(events);
const cycleGen = cycleArray(events);
let pastEvents = [];

//progressional events
let progressional = [
  {
    title: "Witnessing a Silk Road Caravan",
    description: "A vast caravan of merchants and traders from across Asia passes through a local town. You marvel at the exotic goods on display, from silks and spices to precious stones and rare artifacts. As you mingle with the crowd, you hear tales of distant lands, fueling your desire for exploration. The Silk Road is a world of endless possibilities, and you feel a growing sense of excitement about the adventures that await you.",
    outcomes: [] // currently inactive.
  },
  {
    title: "Learning About Chinese Medicine",
    description: "A wise old Chinese physician invites you to his clinic, where you learn about the ancient healing practices of his people. He shows you the properties of various herbs, explains the principles of acupuncture, and discusses the importance of maintaining balance between yin and yang. The knowledge you gain could prove invaluable on your journey, as you face the challenges and dangers of the unknown.",
    outcomes: []
  },
  {
    title: "Encountering a Monk",
    description: "A serene monk approaches you in a peaceful temple, offering you spiritual guidance. As you listen to his words, you feel a sense of calm wash over you. He speaks of the beauty and power of nature, the importance of inner peace, and the interconnectedness of all living things. His teachings leave a lasting impression on you, shaping your perspective on the world and your place within it.",
    outcomes: []
  },
  {
    title: "Observing a Celestial Event",
    description: "The sky is ablaze with a dazzling new star that has appeared in the heavens. You witness this extraordinary event, a phenomenon that has not been seen in centuries. The sight fills you with awe and wonder, reminding you of the vastness and mystery of the universe. You feel a deep connection to the cosmos, and a sense of purpose in your own journey.",
    outcomes: []
  },
  {
    title: "Hearing Tales of a Great Wall",
    description: "As you travel through the countryside, you hear stories about a massive wall enveloping much of the East. The sheer scale of the project inspires you, and you can't help but imagine the countless hours of labor and sacrifice that went into its creation. You are filled with a sense of awe and admiration.",
    outcomes: []
  },
  {
    title: "Discovering a Lost City",
    description: "You stumble upon the ruins of a long-forgotten city, hidden deep in the wilderness. The crumbling walls and overgrown temples tell tales of a once-great civilization, leaving you to wonder about its history and fate. As you explore the ruins, you uncover clues about the city's past, and you feel a sense of responsibility to preserve its memory for future generations.",
    outcomes: []
  }
];
shuffle(progressional);

//endgame strings
let endOffVenice = "The road ahead narrows as you draw closer to Venice, each step bringing you nearer to the city of your birth. The sights and sounds of distant lands still linger in your memory — palaces gleaming under foreign suns, spices wafting from crowded bazaars, and languages that once seemed impenetrable but are now familiar. Behind you lies the world you have explored, full of wonders and perils, yet the pull of home grows stronger with every mile. Your return will not be without fanfare, for you carry with you stories that will captivate the imaginations of those who stayed behind. Still, the journey is not over, and the road may yet test your resolve. But in the distance, Venice calls, promising rest and reunion. Soon you will see the city rise before you, its canals glistening like a dream on the horizon.";
let endInVenice = "After years of perilous journeys through distant lands, you stand once more on the familiar shores of Venice. The canals shimmer in the fading light, their waters gently lapping at the stones of the city that you once called home. The bustle of merchants and the chatter of familiar voices fill the air, yet you find yourself changed — your mind still adrift in the vast empires, bustling markets, and forgotten roads of the East. Your tales of distant kings, strange customs, and untold treasures will astonish the world, but they will never fully capture the magnitude of what you’ve seen. As you walk the streets of Venice, every step reminds you of the journey that has shaped you into a legend. Though your travels have ended, the mark they leave will endure for generations. Welcome home — your legacy has just begun.";

//initial player data
let florins = 300;
let xp = 0;
let currentLocation = "Venice";
let currentCargo = {
    silk: 0,
    carpets: 0,
    porcelain: 0,
    gems: 0,
    handicraft: 0,
    textiles: 0,
    spices: 0,
};
let a = 43; // there HAS to be a more elegant way…
let b = 49;
let c = 47;
let d = 34;
let e = 15;
let f = 26;
let g = 47;
let tradingPrices = {
    silk: [a, a-randInt(4,8)], // buy-sell, per unit
    carpets: [b, b-randInt(4,8)],
    porcelain: [c, c-randInt(4,8)],
    gems: [d, d-randInt(3,6)],
    handicraft: [e, e-randInt(2,5)],
    textiles: [f, f-randInt(3,6)],
    spices: [g, g-randInt(4,8)],
}
let tradingRange = [[25, 80], [30, 90], [ 27, 85], [ 17, 70], [5, 20], [5, 50], [20, 100]]; // min-max range for price volatility
let freePass = 1;
let currentTransport = "none";
let currentlyTraveling = false;
let week = 0;
let currentTheme = "green";
let currentTransSpeed;
let currentTransMaint = "1"; // initial; none
let hasVisitedBeijing = false;
let hasReturnedVenice = false;
let lastProgWeek = 0;
let placesVisited = [];
let tradeBought = 0;
let tradeSold = 0;
