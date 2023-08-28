import axios from "axios";

const BASE_URL = 'https://c843-102-91-54-241.ngrok-free.app'; // host.local.internal
const ID_BASE_URL = `${BASE_URL}/api/Agency/GetAgencyById`;
const COMPLAINT_URL = `${BASE_URL}/api/Complaint/CreateComplaint`;

const getByGuid = async (uniqueGuid) => {
  const response = await axios.get(`${ID_BASE_URL}/${uniqueGuid}`);
  console.log(response);
  return response;
}

const create = async newObject => {
  const response = await axios.post(COMPLAINT_URL, newObject);
  console.log(response);
  return response.data;
}

export default { getByGuid, create }