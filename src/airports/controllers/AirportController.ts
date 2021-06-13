import express from 'express';

// we use debug with a custom context as described in Part 1
import debug from 'debug';
import AirportService from "../services/AirportService";

const log: debug.IDebugger = debug('app:users-controller');
class UsersController {
    async findPathBetweenAirports(req: express.Request, res: express.Response) {
        const sourceAirport = req.query.sourceAirport as string;
        const destinationAirport = req.query.destinationAirport as string;
        if (sourceAirport === undefined || destinationAirport === undefined) {
            res.status(400).send('Please provide source and destination airports')
        }
        const path = AirportService.findPathBetweenAirports(sourceAirport, destinationAirport);
        res.status(200).send(path);
    }
}

export default new UsersController();
