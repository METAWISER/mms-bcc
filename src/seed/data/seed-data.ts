import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

export const SEED_USERS = [
  {
    name: 'Carlos Zamora',
    email: 'admin@example.com',
    password: '123456',
    roles: [ValidRoles.ADMIN],
  },
  {
    name: 'Juan Perez',
    email: 'employee@example.com',
    password: '123456',
    roles: [ValidRoles.EMPLOYEE],
  },
  {
    name: 'Genesis Moreno',
    email: 'client1@example.com',
    password: '123456',
    roles: [ValidRoles.CLIENT],
  },
  {
    name: 'John Doe',
    email: 'client2@example.com',
    password: '123456',
    roles: [ValidRoles.CLIENT],
  },
];

export const SEED_PRODUCTS = [
  {
    name: 'Samsung 55" QLED Smart TV',
    description: 'Ultra HD 4K Smart TV with vibrant colors and voice control.',
    price: 799,
  },
  {
    name: 'Apple iPhone 14 Pro',
    description:
      '128GB, 6.1-inch Super Retina XDR display, triple camera system.',
    price: 1099,
  },
  {
    name: 'Bose QuietComfort 45 Headphones',
    description:
      'Wireless noise-canceling headphones with Bluetooth connectivity.',
    price: 329,
  },
  {
    name: 'HP Pavilion Gaming Laptop',
    description: '15.6-inch FHD, Intel Core i7, 16GB RAM, NVIDIA GTX 1650.',
    price: 899,
  },
  {
    name: 'Sony PlayStation 5',
    description:
      'Next-gen gaming console with a powerful custom SSD and DualSense controller.',
    price: 499,
  },
  {
    name: 'Canon EOS 250D DSLR Camera',
    description:
      '24.1 MP DSLR camera with 4K video recording and flip-out screen.',
    price: 549,
  },
  {
    name: 'Apple Watch Series 8',
    description:
      'GPS, 41mm, health tracking with ECG and fall detection features.',
    price: 429,
  },
  {
    name: 'Dyson V15 Detect Vacuum Cleaner',
    description:
      'Cordless vacuum cleaner with powerful suction and laser dust detection.',
    price: 699,
  },
  {
    name: 'ASUS ROG Swift Gaming Monitor',
    description: '27-inch WQHD, 165Hz, 1ms response time, G-Sync compatible.',
    price: 599,
  },
  {
    name: 'Google Nest Hub (2nd Gen)',
    description: 'Smart home display with voice control for a connected home.',
    price: 99,
  },
  {
    name: 'JBL Charge 5 Bluetooth Speaker',
    description:
      'Portable waterproof speaker with powerful bass and long battery life.',
    price: 179,
  },
  {
    name: 'Microsoft Xbox Series X',
    description:
      '1TB console with stunning 4K graphics and ultra-fast load times.',
    price: 499,
  },
  {
    name: 'Philips Hue Smart Bulbs (4-pack)',
    description:
      'Color-changing LED smart bulbs compatible with Alexa and Google Assistant.',
    price: 199,
  },
  {
    name: 'KitchenAid Artisan Stand Mixer',
    description:
      'Tilt-head stand mixer with 5-quart stainless steel bowl, 10 speeds.',
    price: 399,
  },
  {
    name: 'Huawei MateBook X Pro',
    description: '14-inch laptop, Intel Core i7, 16GB RAM, 512GB SSD.',
    price: 1199,
  },
  {
    name: 'Nespresso Vertuo Coffee Machine',
    description:
      'High-quality coffee machine with one-touch brewing technology.',
    price: 149,
  },
  {
    name: 'Garmin Forerunner 945 Smartwatch',
    description:
      'Premium GPS running watch with music storage and VO2 max monitor.',
    price: 599,
  },
  {
    name: 'LG 34" UltraWide Monitor',
    description:
      '34-inch curved ultrawide monitor with HDR support and USB-C connectivity.',
    price: 699,
  },
  {
    name: 'GoPro HERO10 Black',
    description:
      'Action camera with 5.3K video, HyperSmooth stabilization, waterproof design.',
    price: 449,
  },
  {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description:
      'Industry-leading noise cancellation with up to 30 hours of battery life.',
    price: 349,
  },
];
