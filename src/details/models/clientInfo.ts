export class ClientInfo {
    firstName: string;

    lastName: string;

    middleName: string;

    phone: string;

    mail: string;

    constructor(
        firstName: string,
        lastName: string,
        middleName: string,
        phone: string,
        mail: string,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.phone = phone;
        this.mail = mail;
    }
}