import axios from 'axios';
import base from './base';

const api = {
    goodsList(param: any) {  //{page:xx}
        return axios.get(base.goodsList, {
            params: param
        })
    },
    addGood(param: any) {
        return axios.post(base.addGood, param)
    },
    updateGood(param: any) {
        return axios.post(base.updateGood, param)
    },
    delGood(param: any) {
        return axios.get(base.delGood, {
            params: param
        })
    },
    selectOneGood(param: any) {
        return axios.get(base.selectOneGood, {
            params: param
        })
    },
    login(param: any) {
        return axios.post(base.login, param)
    },
}

export default api
