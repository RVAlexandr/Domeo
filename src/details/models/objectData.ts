import {ClientInfo} from "@/details/models/clientInfo";
import {FlatInfo} from "@/details/models/flatInfo";

export class ObjectData {
    id: number;

    clientInfo: ClientInfo;

    flatInfo: FlatInfo;

    cashOut: number;

    status: number;

    moneyType: number;

    tags:[];

    constructor(
        id2: number,
        clientInfo: ClientInfo,
        flatInfo: FlatInfo,
        cashOut: number,
        status: number,
        moneyType: number,
        tags: [],
    ) {
        this.id = id2;
        this.clientInfo = clientInfo;
        this.flatInfo = flatInfo;
        this.cashOut = cashOut;
        this.status = status;
        this.moneyType = moneyType;
        this.tags = tags;
    }
}