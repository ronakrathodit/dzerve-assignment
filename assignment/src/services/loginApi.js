import Api from '.';
import { endpoints } from './endPoint';

export default class LoginApi extends Api {

    userExist(data) {
        let payload = {
            ...data
        };
        let url = this.buildUrl(endpoints.userExist)
        return this.fetch(url, "POST", JSON.stringify(payload)).then(response => response);
    }
    updatePassword(data) {
        let layout = {
            ...data
        }
        let url = this.buildUrl(endpoints.updatePassword)
        return this.fetch(url, "POST", JSON.stringify(layout)).then(response => response);
    }
   

}