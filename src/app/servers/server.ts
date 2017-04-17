export class Server {
    readonly address: string;
    readonly hostname: string;
    readonly sortname: string;
    readonly strippedname: string;
    readonly data: any;

    currentPlayers: number;

    get maxPlayers(): number {
        return 24;
    }

    get ping(): number {
        return 42;
    }

    get iconUri(): string {
        return 'http://5r.kngrektor.com/servericon/' + this.address;
    }

    public getSortable(name: string): any {
        switch (name) {
            case 'name':
                return this.sortname;
            case 'ping':
                return this.ping;
            case 'players':
                return this.currentPlayers;
            default:
                throw new Error('Unknown sortable');
        }
    }

    public static fromObject(address: string, object: any): Server {
        return new Server(address, object);
    }

    private constructor(address: string, object: any) {
        // temp compat behavior
        if (object.Resources) {
            object.resources = object.Resources;
        }

        this.address = address;
        this.hostname = object.hostname;
        this.currentPlayers = object.clients | 0;

        this.strippedname = this.hostname.replace(/\^[0-9]/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        this.sortname = this.strippedname.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        this.data = object;
    }
}
