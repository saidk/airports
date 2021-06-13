import {CommonRoutesConfig} from '../../common/routes/config';
import express from 'express';
import AirportController from "../controllers/AirportController";

export class AirportsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AirportsRoutes');
    }

    configureRoutes() {

        this.app.route(`/airports`)
            .get(AirportController.findPathBetweenAirports);

        return this.app;
    }
}
