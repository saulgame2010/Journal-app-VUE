import axios from "axios";

// Aquí creamos nuestro axios para empezar a hacer peticiones
const journalApi = axios.create({
    baseURL: 'https://vue-demos-7d681-default-rtdb.firebaseio.com'
})

export default journalApi