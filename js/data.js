// Country footprints: tonnes of CO2e per person per year.
// Source: Our World in Data (ourworldindata.org), built on Global Carbon Project data.
// Reviewed on: 27 November 2026. Currency rates are approximate and were checked the same day.

const COUNTRIES = [

  { name: "United States",        continent: "North America", average: 14.50, climate: "mild", currency: "USD", perUSD: 1 },
  { name: "Canada",               continent: "North America", average: 13.64, climate: "mild", currency: "CAD", perUSD: 1.43 },
  { name: "Mexico",               continent: "North America", average: 3.57,  climate: "hot",  currency: "MXN", perUSD: 19.65 },
  
  { name: "United Kingdom",       continent: "Europe",        average: 4.60,  climate: "mild", currency: "GBP", perUSD: 0.78 },
  { name: "Ireland",              continent: "Europe",        average: 5.97,  climate: "mild", currency: "EUR", perUSD: 0.91 },
  { name: "France",               continent: "Europe",        average: 3.83,  climate: "mild", currency: "EUR", perUSD: 0.91 },
  { name: "Germany",              continent: "Europe",        average: 6.82,  climate: "mild", currency: "EUR", perUSD: 0.91 },
  { name: "Italy",                continent: "Europe",        average: 4.97,  climate: "mild", currency: "EUR", perUSD: 0.91 },
  { name: "Spain",                continent: "Europe",        average: 4.40,  climate: "mild", currency: "EUR", perUSD: 0.91 },
  { name: "Netherlands",          continent: "Europe",        average: 6.34,  climate: "mild", currency: "EUR", perUSD: 0.91 },
  { name: "Poland",               continent: "Europe",        average: 7.44,  climate: "mild", currency: "PLN", perUSD: 4.09 },
  { name: "Sweden",               continent: "Europe",        average: 3.75,  climate: "mild", currency: "SEK", perUSD: 10.27 },
  { name: "Norway",               continent: "Europe",        average: 6.48,  climate: "mild", currency: "NOK", perUSD: 9.80 },
  { name: "Russia",               continent: "Europe",        average: 12.27, climate: "mild", currency: "RUB", perUSD: 81.69 },
  { name: "Turkey",               continent: "Europe",        average: 5.54,  climate: "mild", currency: "TRY", perUSD: 50.74 },
  { name: "Ukraine",              continent: "Europe",        average: 3.56,  climate: "mild", currency: "UAH", perUSD: 45.09 },

  { name: "China",                continent: "Asia",          average: 8.77,  climate: "mild", currency: "CNY", perUSD: 6.66 },
  { name: "India",                continent: "Asia",          average: 2.19,  climate: "hot",  currency: "INR", perUSD: 0.93 },
  { name: "Japan",                continent: "Asia",          average: 7.80,  climate: "mild", currency: "JPY", perUSD: 1595.6 },
  { name: "South Korea",          continent: "Asia",          average: 11.24, climate: "mild", currency: "KRW", perUSD: 1333.47 },
  { name: "Indonesia",            continent: "Asia",          average: 2.88,  climate: "hot",  currency: "IDR", perUSD: 18354.45 },
  { name: "Pakistan",             continent: "Asia",          average: 0.83,  climate: "hot",  currency: "PKR", perUSD: 276.72 },
  { name: "Bangladesh",           continent: "Asia",          average: 0.66,  climate: "hot",  currency: "BDT", perUSD: 125.58 },
  { name: "Philippines",          continent: "Asia",          average: 1.45,  climate: "hot",  currency: "PHP", perUSD: 63.76 },
  { name: "Vietnam",              continent: "Asia",          average: 3.69,  climate: "hot",  currency: "VND", perUSD: 25836.52 },
  { name: "Thailand",             continent: "Asia",          average: 3.58,  climate: "hot",  currency: "THB", perUSD: 33.95 },
  { name: "Malaysia",             continent: "Asia",          average: 8.52,  climate: "hot",  currency: "MYR", perUSD: 4.12 },
  { name: "Sri Lanka",            continent: "Asia",          average: 0.84,  climate: "hot",  currency: "LKR", perUSD: 333.63 },
  { name: "Saudi Arabia",         continent: "Asia",          average: 18.64, climate: "hot",  currency: "SAR", perUSD: 3.75 },
  { name: "United Arab Emirates", continent: "Asia",          average: 20.74, climate: "hot",  currency: "AED", perUSD: 3.67 },
  { name: "Israel",               continent: "Asia",          average: 6.19,  climate: "hot",  currency: "ILS", perUSD: 3.33 },

  { name: "Nigeria",              continent: "Africa",        average: 0.60,  climate: "hot",  currency: "NGN", perUSD: 1362.38 },
  { name: "South Africa",         continent: "Africa",        average: 7.11,  climate: "mild", currency: "ZAR", perUSD: 17.36 },
  { name: "Egypt",                continent: "Africa",        average: 2.09,  climate: "hot",  currency: "EGP", perUSD: 54.51 },
  { name: "Kenya",                continent: "Africa",        average: 0.40,  climate: "hot",  currency: "KES", perUSD: 130.38 },
  { name: "Ethiopia",             continent: "Africa",        average: 0.31,  climate: "hot",  currency: "ETB", perUSD: 163.70 },
  { name: "Ghana",                continent: "Africa",        average: 0.73,  climate: "hot",  currency: "GHS", perUSD: 11.89 },
  { name: "Morocco",              continent: "Africa",        average: 1.87,  climate: "mild", currency: "MAD", perUSD: 10.04 },

  { name: "Brazil",               continent: "South America", average: 2.33,  climate: "hot",  currency: "BRL", perUSD: 5.56 },
  { name: "Argentina",            continent: "South America", average: 3.84,  climate: "mild", currency: "ARS", perUSD: 1596.42 },
  { name: "Chile",                continent: "South America", average: 3.84,  climate: "mild", currency: "CLP", perUSD: 1033.18 },
  { name: "Colombia",             continent: "South America", average: 1.80,  climate: "hot",  currency: "COP", perUSD: 3486.64 },
  { name: "Peru",                 continent: "South America", average: 2.00,  climate: "hot",  currency: "PEN", perUSD: 3.47 },

  { name: "Australia",            continent: "Oceania",       average: 14.04, climate: "hot",  currency: "AUD", perUSD: 1.50 },
  { name: "New Zealand",          continent: "Oceania",       average: 5.91,  climate: "mild", currency: "NZD", perUSD: 1.83 }
];


const CONTINENT_AVERAGES = {
  "Africa": 1.0,
  "Asia": 4.9,
  "Europe": 6.5,
  "North America": 10.7,
  "South America": 2.5,
  "Oceania": 9.5
};

const WORLD_AVERAGE = 4.74;