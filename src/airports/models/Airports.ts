class Airports {
    private _airports: Array<string>;

    public get airports(): Array<string>{
        return this._airports;
    }

    public addAirport(airport: string) {
        this._airports.push(airport);
    }

    constructor() {
        this._airports = [];
    }

}

export { Airports };
