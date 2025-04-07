import api from '../lib/axios'

export default {
  getToolings(){
    return api.get('/toolings')
  },
  getToolingsId(id){
    return api.get(`/toolings/${id}`)
  },
  getToolingEstatusList(){
    return api.get('/toolings/status/list')
  },
  postTooling(data){
    return api.post('/toolings', data)
  },
  putTooling(id, data){
    return api.put(`/toolings/${id}`, data)
  },
}