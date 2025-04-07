import api from '../lib/axios'

export default {
  getDepartments(){
    return api.get('/departments/list')
  },
}