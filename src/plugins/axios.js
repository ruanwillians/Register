import Vue from "vue";
import axios from "axios";

// metodo global
// axios.defaults.baseURL = 'https://curso-vue-b058d-default-rtdb.firebaseio.com/'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: 'https://curso-vue-b058d-default-rtdb.firebaseio.com/',
            //criando os headers com o metodo create,  junto na inicialização da aplicação
            // headers: {
            //     'authorizaion': 'autorização123'
            // }
        })

        //retorna config da request
        Vue.prototype.$http.interceptors.request.use(config => {
            return config
        }), error => Promise.reject(error)

        //transformando resposta em um array
        Vue.prototype.$http.interceptors.response.use(res => {
            // const array = []
            // for(let chave in res.data){ //chave == id gerado pelo firebase
            //    array.push({id: chave, ...res.data[chave]})  // criando um objeto com id e os demais valores e subindo no array
            // }
            // res.data = array //atribuindo novo array ao valor
            return res
        }), error => Promise.reject(error)
    }
})
