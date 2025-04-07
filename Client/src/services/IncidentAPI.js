import api from '../lib/axios'

export default {
  getIncidentTypes(){
    return api.get('/incidentTypes/list')
  },
}