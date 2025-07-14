import {Request, Response} from 'express'

export class IndexController {
    public getIndex(req: Request, res: Response): void {
        res.send('Server says: Hello, World! 🤪');
    }
}