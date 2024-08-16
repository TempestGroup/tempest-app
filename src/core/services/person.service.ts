import api from '../configs/api.config';

class PersonService {

  savePersonInformation = async (personInfo: any) => {
    return api.post('/api/v1/persons/save-person-information', true, personInfo);
  };

  getPersonInformation = async () => {
    return api.get('/api/v1/persons/get-person-information', true);
  };

}

export default new PersonService();
