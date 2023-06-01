const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose
    .connect("mongodb+srv://nmemarcoding:Nima1377@cluster0.exmvpqg.mongodb.net/")
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
})

const products = [];

for (let i = 0; i < 100; i++) {
  const product = new Product({
    title: faker.commerce.productName(),
    desc: faker.commerce.productDescription(),
    img: faker.image.imageUrl(),
    categories: faker.commerce.department(),
    price: faker.commerce.price(),
    inStock: true
  });
  products.push(product);
}

Product.insertMany(products)
  .then(() => console.log('Products created successfully'))
  .catch(err => console.log(err));
