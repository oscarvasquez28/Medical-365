import api from '../lib/axios'

export default {
  getAppointments(){
    return api.get('/appointments')
  },
}