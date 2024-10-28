export default class Evento {
    name: string | null | undefined;
    phone: string | null | undefined;
    email: string | null | undefined;
    time: string | null | undefined;

    constructor(name: string, phone: string, email: string, time: string) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.time = time;
    }
}
