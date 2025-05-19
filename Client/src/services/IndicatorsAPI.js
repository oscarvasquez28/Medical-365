import api from '../lib/axios'

export default {
  getTickets(){
    return api.get('/indicators/tickets')
  },
  getTicketsMonth(){
    return api.get('/indicators/tickets/month')
  },
  getAppointmentsMonth(){
    return api.get('/indicators/appointments/month')
  },
  getCollaboratorsStatus(){
    return api.get('/indicators/collaborators')
  },
  getTicketsID(id){
    return api.get(`/indicators/tickets/${id}`)
  },
}