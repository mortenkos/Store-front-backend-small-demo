import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyAuthToken } from '../middleware/middleware';
import { getUserActiveOrder, getUserCompletedOrders } from '../models/order';

dotenv.config();

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  const users = await store.index();

  res.json(users);
}
const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    if (!user) {
      res.status(204);
    }
    res.json(user);
  } catch (err) {
    res.json(err)
  }  
}
const create = async (req: Request, res: Response) => {
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password_hash: req.body.password
  }
  
  try {
    
    const newUser = await store.create(user);
    const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET as string)
    
    res.json({token});
  } catch (err) {
    res.json(err)
  }  
}
const getActiveOrder = async (req: Request, res: Response) => {
  try {
    const activeOrder = await getUserActiveOrder(req.params.id)
    
    if (!activeOrder.length) {
      res.status(204);
    }
    res.json({activeOrder: {products: activeOrder}});
  } catch (err) {
    res.json(err)
  }  
}
const getCompletedOrders = async (req: Request, res: Response) => {
  try {
    const completedOrders = await getUserCompletedOrders(req.params.id)
    
    if (!Object.keys(completedOrders).length) {
      res.status(204);
    }
    res.json(completedOrders);
  } catch (err) {
    res.json(err)
  }  
}
const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password_hash: req.body.password,
      }
      try {
          const u = await store.authenticate(user.first_name, user.last_name, user.password_hash)
          if (!u) {
              throw new Error(`Ups, I didn't find this user, Is it possible that you made little typo mistake?`);
          }
          var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
          
          res.json({token})
      } catch(error) {
            if (error instanceof Error) {
                res.status(401).send(error.message);
            } else {
                res.status(401);
            }  
      }
}

const userRoutes = (app: express.Application) => {
    app.get('/users/auth', authenticate);
    app.get('/users/:id', verifyAuthToken, show);
    app.get('/users/:id/current-order', verifyAuthToken, getActiveOrder);
    app.get('/users/:id/completed-orders', verifyAuthToken, getCompletedOrders);
    app.get('/users', verifyAuthToken, index);
    app.post('/users', create);
}

export default userRoutes;