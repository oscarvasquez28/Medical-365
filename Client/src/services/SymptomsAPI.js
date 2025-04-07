import api from '../lib/axios'

export default {
  getSymptomsList(){
    return api.get('/symptoms/list')
  },
}