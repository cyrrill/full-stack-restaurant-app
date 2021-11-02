const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const mongo = require('./services/mongo');
const Dish  = require('./models/dish');
const Restaurant = require('./models/restaurant');

(async function() {

  try {
    const mingsDishes = await Dish.create([
      {
        name: 'Spring Rolls',
        description: 'Vegetarian rolls',
        imageUrl: '/images/spring-rolls.jpg',
        price: 175
      },
      {
        name: 'Sweet Sour Chicken',
        description: 'Egg roll + fried Wonton',
        imageUrl: '/images/sweet-sour-chicken.jpg',
        price: 795
      },
      {
        name: 'Vegetable Chow Mein',
        description: 'Noodles with chicken stir fried',
        imageUrl: '/images/chow-mein.jpg',
        price: 650
      },
      {
        name: 'Shrimp Lo Mein',
        description: 'Stir-fried shimp spicy sauce',
        imageUrl: '/images/shrimp-low-mein.jpg',
        price: 790
      }
    ]);

    await Restaurant.create([
      {
        name: 'Ming Palace Chinese Restaurant',
        description: 'Selected Chinese Classics',
        imageUrl: '/images/ming-palace-chinese-restaurant.jpg',
        dishes: mingsDishes
      }
    ]);


    const yiamasDishes = await Dish.create([
      {
        name: 'Spanakotiropita',
        description: 'Filo parcels with spinach and feta cheese. Oven baked',
        imageUrl: '/images/spanakotiropita.jpg',
        price: 495
      },
      {
        name: 'Greek Salad',
        description: 'Traditional salad with olives and feta cheese',
        imageUrl: '/images/greek-salad.jpg',
        price: 695
      },
      {
        name: 'Mousaka',
        description: 'Potatoes, minced meat, aubergine topped with bechamel sauce',
        imageUrl: '/images/mousaka.jpg',
        price: 1150
      },
      {
        name: 'Calamari',
        description: 'Buttered squid rings served with tzatziki',
        imageUrl: '/images/calamari.jpg',
        price: 620
      }
    ]);

    await Restaurant.create([
      {
        name: 'Yiamas Greek Taverna',
        description: 'Takes you back to the old country',
        imageUrl: '/images/yiamas-greek-taverna.jpg',
        dishes: yiamasDishes
      }
    ]);

    const namasteDishes = await Dish.create([
      {
        name: 'Samosas',
        description: 'Delicious baked pastry with a savory filling',
        imageUrl: '/images/samosas.jpg',
        price: 590
      },
      {
        name: 'Paneer Tikka Sizzler',
        description: 'Paneer cooked in spicy marinade served with stuffed capsicum',
        imageUrl: '/images/paneer-tikka-sizzler.jpg',
        price: 1325
      },
      {
        name: 'Malai Kofta',
        description: 'Indian dumplings in curry tomato sauce',
        imageUrl: '/images/malai-kofta.jpg',
        price: 1490
      },
      {
        name: 'Tandoori chicken',
        description: 'Chicken prepared in yoghurt, mild spices, and herbs',
        imageUrl: '/images/tandoori-chicken.jpg',
        price: 730
      },
    ]);

    await Restaurant.create([
      {
        name: 'Namaste Indian Restaurant',
        description: 'An authentic taste of Dehli',
        imageUrl: '/images/namaste-indian-restaurant.jpg',
        dishes: namasteDishes
      }
    ]);

    const machuDishes = await Dish.create([
      {
        name: 'Ceviche',
        description: 'White fish marinated in lime with red onion',
        imageUrl: '/images/ceviche.jpg',
        price: 1600
      },
      {
        name: 'Lomo Saltado',
        description: 'Slices of seared beef, onions, tomatoes, and fries',
        imageUrl: '/images/lomo-saltado.jpg',
        price: 1250
      },
      {
        name: 'Chaufa de Mariscos',
        description: 'Rice with a bounty of seafood',
        imageUrl: '/images/chaufa-de-mariscos.jpg',
        price: 1000
      },
      {
        name: 'Yuca a la Huancaina',
        description: 'Yuca with Peruvian creamy pepper sauce',
        imageUrl: '/images/yuca.jpg',
        price: 399
      },
    ]);

    await Restaurant.create([
      {
        name: 'Machu Picchu Peruvian',
        description: 'Flavorful delights of the Andes',
        imageUrl: '/images/machu-picchu-peruvian-restaurant.jpg',
        dishes: machuDishes
      }
    ]);

    const fusionDishes = await Dish.create([
      {
        name: 'Salmon Nori Special',
        description: 'Salmon sashimi with green olives, nori ponzu',
        imageUrl: '/images/salmon-nori.jpg',
        price: 1450
      },
      {
        name: 'Assorted Sashimi',
        description: 'Six slices of delcious sashimi',
        imageUrl: '/images/assorted-sashimi.jpg',
        price: 2900
      },
      {
        name: 'Spicy Tuna Roll',
        description: 'Tuna rice roll spiced with wasabi',
        imageUrl: '/images/spicy-tuna-roll.jpg',
        price: 1150
      },
      {
        name: 'California Roll',
        description: 'Inside-out maki sushi made with crab',
        imageUrl: '/images/california.jpg',
        price: 950
      },
    ]);

    await Restaurant.create([
      {
        name: 'Fusion Sushi',
        description: 'Fusion modern Japanese tastes',
        imageUrl: '/images/fusion-sushi.webp',
        dishes: fusionDishes
      }
    ]);

    const delvecchiosDishes = await Dish.create([
      {
        name: 'Lasagna',
        description: 'Traditional recipe',
        imageUrl: '/images/lasagna.jpg',
        price: 1299
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Wood oven baked to perfection',
        imageUrl: '/images/peperoni-pizza.jpg',
        price: 1799
      },
      {
        name: 'Calzone',
        description: 'Homemade dough and a savory filling of ricotta and mozzarella',
        imageUrl: '/images/calzone.jpg',
        price: 1099
      },
      {
        name: 'Spaghetti Bolognese',
        description: 'Al dente pasta with savory beef tomato sauce',
        imageUrl: '/images/bolognese.jpg',
        price: 850
      },
    ]);

    await Restaurant.create([
      {
        name: 'DelVecchio\'s Pizzeria',
        description: 'Mamma mia!',
        imageUrl: '/images/delvecchios.jpg',
        dishes: delvecchiosDishes
      }
    ]);

  } catch (e) {
    console.log(e);
  }

})();