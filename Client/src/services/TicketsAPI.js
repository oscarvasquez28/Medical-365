import api from '../lib/axios'

export default {
  getTickets(){
    return api.get('/tickets')
  },
  getTicketsTable(){
    return api.get('/tickets/table')
  },
  getTicketById(id){
    return api.get(`/tickets/${id}`)
  },
  getTicketsList(){
    return api.get('/tickets/list')
  },
  postTickets(data){
    return api.post('/tickets', data)
  },
  putTickets(id, data){
    return api.put(`/tickets/${id}`, data)
  },
}