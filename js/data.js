const COUNTRIES = [

  { name: "United States",        continent: "North America", average: 14.5, climate: "mild", currency: "USD", perUSD: 1 },
  { name: "Canada",               continent: "North America", average: 13.5, climate: "mild", currency: "CAD", perUSD: 1.37 },
  { name: "Mexico",               continent: "North America", average: 4.5,  climate: "hot",  currency: "MXN", perUSD: 18 },
  
  { name: "United Kingdom",       continent: "Europe", average: 7.5, climate: "mild", currency: "GBP", perUSD: 0.78 },
  { name: "Ireland",              continent: "Europe", average: 9,   climate: "mild", currency: "EUR", perUSD: 0.92 },
  { name: "France",               continent: "Europe", average: 6.5, climate: "mild", currency: "EUR", perUSD: 0.92 },
  { name: "Germany",              continent: "Europe", average: 8.5, climate: "mild", currency: "EUR", perUSD: 0.92 },
  { name: "Italy",                continent: "Europe", average: 6.5, climate: "mild", currency: "EUR", perUSD: 0.92 },
  { name: "Spain",                continent: "Europe", average: 6,   climate: "mild", currency: "EUR", perUSD: 0.92 },
  { name: "Netherlands",          continent: "Europe", average: 9,   climate: "mild", currency: "EUR", perUSD: 0.92 },
  { name: "Poland",               continent: "Europe", average: 7,   climate: "mild", currency: "PLN", perUSD: 4 },
  { name: "Sweden",               continent: "Europe", average: 6,   climate: "mild", currency: "SEK", perUSD: 10.5 },
  { name: "Norway",               continent: "Europe", average: 8,   climate: "mild", currency: "NOK", perUSD: 10.8 },
  { name: "Russia",               continent: "Europe", average: 11,  climate: "mild", currency: "RUB", perUSD: 95 },
  { name: "Turkey",               continent: "Europe", average: 5.5, climate: "mild", currency: "TRY", perUSD: 34 },
  { name: "Ukraine",              continent: "Europe", average: 4.5, climate: "mild", currency: "UAH", perUSD: 41 },

  { name: "China",                continent: "Asia", average: 8,   climate: "mild", currency: "CNY", perUSD: 7.2 },
  { name: "India",                continent: "Asia", average: 2,   climate: "hot",  currency: "INR", perUSD: 84 },
  { name: "Japan",                continent: "Asia", average: 8.5, climate: "mild", currency: "JPY", perUSD: 150 },
  { name: "South Korea",          continent: "Asia", average: 12,  climate: "mild", currency: "KRW", perUSD: 1350 },
  { name: "Indonesia",            continent: "Asia", average: 3,   climate: "hot",  currency: "IDR", perUSD: 15800 },
  { name: "Pakistan",             continent: "Asia", average: 1.5, climate: "hot",  currency: "PKR", perUSD: 280 },
  { name: "Bangladesh",           continent: "Asia", average: 1,   climate: "hot",  currency: "BDT", perUSD: 120 },
  { name: "Philippines",          continent: "Asia", average: 1.8, climate: "hot",  currency: "PHP", perUSD: 57 },
  { name: "Vietnam",              continent: "Asia", average: 4,   climate: "hot",  currency: "VND", perUSD: 25000 },
  { name: "Thailand",             continent: "Asia", average: 5,   climate: "hot",  currency: "THB", perUSD: 35 },
  { name: "Malaysia",             continent: "Asia", average: 8,   climate: "hot",  currency: "MYR", perUSD: 4.5 },
  { name: "Sri Lanka",            continent: "Asia", average: 1.2, climate: "hot",  currency: "LKR", perUSD: 300 },
  { name: "Saudi Arabia",         continent: "Asia", average: 17,  climate: "hot",  currency: "SAR", perUSD: 3.75 },
  { name: "United Arab Emirates", continent: "Asia", average: 18,  climate: "hot",  currency: "AED", perUSD: 3.67 },
  { name: "Israel",               continent: "Asia", average: 8,   climate: "hot",  currency: "ILS", perUSD: 3.7 },

  { name: "Nigeria",              continent: "Africa", average: 0.7, climate: "hot",  currency: "NGN", perUSD: 1500 },
  { name: "South Africa",         continent: "Africa", average: 7,   climate: "mild", currency: "ZAR", perUSD: 18 },
  { name: "Egypt",                continent: "Africa", average: 2.5, climate: "hot",  currency: "EGP", perUSD: 49 },
  { name: "Kenya",                continent: "Africa", average: 0.5, climate: "hot",  currency: "KES", perUSD: 129 },
  { name: "Ethiopia",             continent: "Africa", average: 0.3, climate: "hot",  currency: "ETB", perUSD: 120 },
  { name: "Ghana",                continent: "Africa", average: 0.8, climate: "hot",  currency: "GHS", perUSD: 15 },
  { name: "Morocco",              continent: "Africa", average: 2,   climate: "mild", currency: "MAD", perUSD: 10 },

  { name: "Brazil",               continent: "South America", average: 2.5, climate: "hot",  currency: "BRL", perUSD: 5.5 },
  { name: "Argentina",            continent: "South America", average: 4.5, climate: "mild", currency: "ARS", perUSD: 1000 },
  { name: "Chile",                continent: "South America", average: 4.5, climate: "mild", currency: "CLP", perUSD: 950 },
  { name: "Colombia",             continent: "South America", average: 2,   climate: "hot",  currency: "COP", perUSD: 4200 },
  { name: "Peru",                 continent: "South America", average: 1.8, climate: "hot",  currency: "PEN", perUSD: 3.8 },

  { name: "Australia",            continent: "Oceania", average: 15,  climate: "hot",  currency: "AUD", perUSD: 1.5 },
  { name: "New Zealand",          continent: "Oceania", average: 7.5, climate: "mild", currency: "NZD", perUSD: 1.65 }
];


const CONTINENT_AVERAGES = {
  "Africa": 1.1,
  "Asia": 4.6,
  "Europe": 7,
  "North America": 11,
  "South America": 2.5,
  "Oceania": 10
};

const WORLD_AVERAGE = 4.7;