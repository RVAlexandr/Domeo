export class FlatInfo {
    area: number;

    elevator: boolean;

    flatType: number;

    repairType: number;

    residentalComplex: string;

    constructor(
        area: number,
        elevator: boolean,
        flatType: number,
        repairType: number,
        residentalComplex: string,
    ) {
        this.residentalComplex = residentalComplex;
        this.flatType = flatType;
        this.repairType = repairType;
        this.area = area;
        this.elevator = elevator;
    }
}