import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization ? req.headers.authorization : '';

        const token = authorizationHeader ? authorizationHeader.split(' ')[1] : '';

        jwt.verify(token, process.env.TOKEN_SECRET as string) as jwt.JwtPayload

        next()
    } catch (error) {
        res.status(401)
        res.json(`Autorization failed with an error: ${error}`)
    }
}