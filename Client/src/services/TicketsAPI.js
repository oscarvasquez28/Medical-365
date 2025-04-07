import api from '../lib/axios'

export default {
  getTickets(){
    return api.get('/tickets')
  },
  getTicketsList(){
    return api.get('/tickets/list')
  },
  postTickets(data){
    return api.post('/tickets', data)
  },
}