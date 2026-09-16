export const categories = ['All', 'Espresso', 'Latte', 'Cold Coffee', 'Pastries']

export const products = [
  { id: 'velvet-latte', name: 'Velvet Latte', category: 'Latte', price: 5.5, description: 'Espresso, silky steamed milk and a touch of vanilla.', ingredients: 'Espresso, steamed milk, vanilla', accent: '#c97b4b' },
  { id: 'midnight-mocha', name: 'Midnight Mocha', category: 'Latte', price: 6.25, description: 'Dark chocolate, espresso and velvety milk.', ingredients: 'Espresso, dark chocolate, milk', accent: '#704333' },
  { id: 'golden-cappuccino', name: 'Golden Cappuccino', category: 'Espresso', price: 5.75, description: 'Rich espresso with beautifully textured milk foam.', ingredients: 'Double espresso, textured milk', accent: '#d5a36b' },
  { id: 'cold-brew-noir', name: 'Cold Brew Noir', category: 'Cold Coffee', price: 5.25, description: 'Slow-steeped cold brew with a smooth chocolate finish.', ingredients: 'Cold brew coffee, filtered water', accent: '#53655e' },
  { id: 'house-espresso', name: 'House Espresso', category: 'Espresso', price: 4.25, description: 'A bold double shot with notes of dark chocolate.', ingredients: 'Double espresso', accent: '#95543a' },
  { id: 'caramel-cloud', name: 'Caramel Cloud', category: 'Latte', price: 6, description: 'Espresso, caramel and silky milk foam.', ingredients: 'Espresso, milk, caramel', accent: '#bd7e47' },
  { id: 'vanilla-bean-cold-brew', name: 'Vanilla Bean Cold Brew', category: 'Cold Coffee', price: 5.75, description: 'Cold brew balanced with smooth vanilla.', ingredients: 'Cold brew coffee, vanilla bean', accent: '#a98c67' },
  { id: 'almond-croissant', name: 'Almond Croissant', category: 'Pastries', price: 4.5, description: 'Buttery pastry with almond cream and toasted almonds.', ingredients: 'Laminated pastry, almond cream, almonds', accent: '#d1a45a' },
]

export function getProduct(productId) { return products.find((product) => product.id === productId) }
