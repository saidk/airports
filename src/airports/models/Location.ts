class Location {
    private _latitude: number;
    private _longitude: number;

    public get latitude(): number {
        return this._latitude;
    }

    public set latitude(latitude: number) {
        this._latitude = latitude;
    }

    public get longitude(): number {
        return this._longitude;
    }

    public set longitude(longitude: number) {
        this._longitude = longitude;
    }

    constructor(vLatitude: number, vLongitude: number) {
        this._latitude = vLatitude;
        this._longitude = vLongitude;
    }

}

export { Location };
