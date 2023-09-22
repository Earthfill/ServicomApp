import axios from "axios";

// const BASE_URL = 'https://e249-197-210-70-37.ngrok-free.app'; // host.local.internal
// const ID_BASE_URL = `${BASE_URL}/api/v1/Agency/getAgencyByGuid?uniqueGuid=`;
const ID_BASE_URL = 'https://feeback-core.herokuapp.com/api/v1/agency/1'
const COMPLAINT_URL = 'https://feeback-core.herokuapp.com/api/v1/Complaint';
const TAG_URL = 'https://feeback-core.herokuapp.com/api/v1/tag';

const getByGuid = async () => {
  const response = await axios.get(`${ID_BASE_URL}`);
  console.log(response);
  return response.data;
}

const create = async newObject => {
  const response = await axios.post(COMPLAINT_URL, newObject);
  console.log(response);
  return response.data;
}

const getTags = async () => {
  const response = await axios.get(`${TAG_URL}`);
  return response.data;
}

export default { 
  getByGuid, 
  create,
  getTags
}