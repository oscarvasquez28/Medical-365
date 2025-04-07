import api from '../lib/axios'

export default {
  getAppointments(){
    return api.get('/appointments')
  },
  getRisksList(){
    return api.get('/appointments/risks/list')
  },
  getAppointmentsCalendar(id){
    return api.get(`/appointments/calendar/${id}`)
  },
  postAppointments(data){
    return api.post('/appointments', data)
  },
}