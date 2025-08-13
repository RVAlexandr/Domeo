export class Tag {
    message: string;

    type: number;

    constructor(
        message: string,
        type: number,
    ) {
        this.message = message;
        this.type = type;
    }
}