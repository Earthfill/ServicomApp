import axios from "axios";

const BASE_URL = 'https://b7cb7-197-210-76-136.ngrok-free.app'; // host.local.internal
const ID_BASE_URL = `${BASE_URL}/api/v1/Agency/getAgencyByGuid?uniqueGuid=`;
const COMPLAINT_URL = `${BASE_URL}/api/v1/Complaint`;

const getByGuid = async (uniqueGuid) => {
  const response = await axios.get(`${ID_BASE_URL}${uniqueGuid}`);
  console.log(response);
  return response.data;
}

const create = async newObject => {
  const response = await axios.post(COMPLAINT_URL, newObject);
  console.log(response);
  return response.data;
}

export default { 
  getByGuid, 
  create 
}