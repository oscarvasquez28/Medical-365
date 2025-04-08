import api from '../lib/axios'

export default {
  getAppointments(){
    return api.get('/appointments')
  },
  getAppointmentsTable(){
    return api.get('/appointments/table')
  },
  getAppointmentById(id){
    return api.get(`/appointments/${id}`)
  },
  getRisksList(){
    return api.get('/appointments/risks/list')
  },
  getStatusList(){
    return api.get('/appointments/status/list')
  },
  getAppointmentsCalendar(id){
    return api.get(`/appointments/calendar/${id}`)
  },
  postAppointments(data){
    return api.post('/appointments', data)
  },
  putAppointments(id, data){
    return api.put(`/appointments/${id}`, data)
  },
}