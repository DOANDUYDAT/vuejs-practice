/**
 * Mocking client-server processing
 */
const _products = [
  {
    id: 1,
    image: require("../assets/image/m20.jpg"),
    title: "Sam Sung Galaxy M20",
    price: 5000000,
    inventory: 10,
  },
  {
    id: 2,
    image: require("../assets/image/j7.jpg"),
    title: "Sam Sung Galaxy J7 Prime",
    price: 4000000,
    inventory: 10,
  },
  {
    id: 3,
    image: require("../assets/image/m20.jpg"),
    title: "Sam Sung Galaxy M20",
    price: 5000000,
    inventory: 10,
  },
  {
    id: 4,
    image: require("../assets/image/j7.jpg"),
    title: "Sam Sung Galaxy J7 Prime",
    price: 4000000,
    inventory: 10,
  },
  {
    id: 5,
    image: require("../assets/image/m20.jpg"),
    title: "Sam Sung Galaxy M20",
    price: 5000000,
    inventory: 10,
  },
  {
    id: 6,
    image: require("../assets/image/j7.jpg"),
    title: "Sam Sung Galaxy J7 Prime",
    price: 4000000,
    inventory: 10,
  },
  {
    id: 7,
    image: require("../assets/image/m20.jpg"),
    title: "Sam Sung Galaxy M20",
    price: 5000000,
    inventory: 10,
  },
  {
    id: 8,
    image: require("../assets/image/j7.jpg"),
    title: "Sam Sung Galaxy J7 Prime",
    price: 4000000,
    inventory: 10,
  },
  {
    id: 9,
    image: require("../assets/image/m20.jpg"),
    title: "Sam Sung Galaxy M20",
    price: 5000000,
    inventory: 10,
  },
  {
    id: 10,
    image: require("../assets/image/j7.jpg"),
    title: "Sam Sung Galaxy J7 Prime",
    price: 4000000,
    inventory: 10,
  },
]

export default {
  getProducts(cb) {
    setTimeout(() => cb(_products), 100)
  },

  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('DuyDat') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}