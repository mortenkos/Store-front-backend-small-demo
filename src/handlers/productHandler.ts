import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { ProductServices } from '../services/productServices';
// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyAuthToken } from '../middleware/middleware';

dotenv.config();

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  const products = await store.index();

  res.json(products);
}
const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    if (!product) {
      // res.json(`No product with given id: ${req.params.id}`);
      res.status(204);
    }
    res.json(product);
  } catch (err) {
    res.json(err)
  }  
}
const showByCategory = async (req: Request, res: Response) => {
  try {
    const products = await store.showByCategory(req.params.category);
    
    if (!products.length) {
      res.status(204);
    }
    res.json(products);
  } catch (err) {
    res.json(err)
  }  
}
const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  }
  
  try {
    
    const newProduct = await store.create(product);
    
    res.json(newProduct);
  } catch (err) {
    res.json(err)
  }  
}

const showTop5Products = async (req: Request, res: Response) => {
  const productServices = new ProductServices;
  try {
    let products = await productServices.getTop5Products();
    if (!products.length) {
      res.status(204);
    }
    if (products.length >= 5) {
      products = products.slice(0, 5);
    }
    res.json(products);
  } catch (err) {
    res.json(err)
  }  
}

const productRoutes = (app: express.Application) => {
    app.get('/products/category/:category', showByCategory);
    app.get('/products/top-5', showTop5Products)
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
}

export default productRoutes;