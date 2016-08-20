export class config {

    public static getEnvironmentVariable(value) {
        var environment:string;
        var data = {};
        environment = window.location.hostname;
        
        switch (environment) {
            //development environment
            case 'localhost':
                data = {
                    endPoint: 'http://localhost:3000/'
                };
                break;
             case 'test':
                data = {
                    endPoint: 'https://example.com/'
                };
                break;
        }
        return data[value];
    }
}
