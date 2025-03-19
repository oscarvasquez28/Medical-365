import api from '../lib/axios'

export default {
  getCollaborators(){
    return api.get('/collaborators')
  },
  postLogin(data){
    return api.post('/collaborators/login', data)
  }
}