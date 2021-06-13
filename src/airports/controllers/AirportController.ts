import express from 'express';

import AirportService from "../services/AirportService";

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
