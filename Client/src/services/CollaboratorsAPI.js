import api from '../lib/axios'

export default {
  getCollaborators(){
    return api.get('/collaborators')
  },
  getCollaboratorsId(id){
    return api.get(`/collaborators/${id}`)
  },
  putCollaborator(id, data){
    return api.put(`/collaborators/${id}`, data)
  },
  postCollaborator(data){
    return api.post('/collaborators', data)
  },
  postLogin(data){
    return api.post('/collaborators/login', data)
  },
  getGender(){
    return api.get('/collaborators/genders/list')
  },
  getRoles(){
    return api.get('/collaborators/roles/list')
  },
  getStatus(){
    return api.get('/collaborators/status/list')
  },
}