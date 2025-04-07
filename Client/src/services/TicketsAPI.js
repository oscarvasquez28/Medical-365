import api from '../lib/axios'

export default {
  getTickets(){
    return api.get('/tickets')
  },
  postTickets(data){
    return api.post('/tickets', data)
  },
}