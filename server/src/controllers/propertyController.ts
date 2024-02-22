import { Request, Response } from 'express';
import { Property } from '../models/Property';

let properties: Property[] = [];

export const getProperties = (req: Request, res: Response) => {
    res.json(properties);
}

export const addProperty = (req: Request, res: Response) => {
    console.log('Request body:', req.body);

    const { address, photo, price } = req.body;

    if (!address || !photo || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProperty: Property = {
        id: properties.length + 1,
        address,
        photo,
        price
    };

    properties.push(newProperty);
    res.json(properties);
}