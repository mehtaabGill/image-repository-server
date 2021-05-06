import { readAllImageNames } from '../helpers/database';
import { Request, Response } from 'express';

export function sendAllImageNames (req: Request, res: Response) {
    res.json(readAllImageNames());
}