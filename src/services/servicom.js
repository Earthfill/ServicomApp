import axios from "axios";

const ID_BASE_URL = 'https://e24e-197-210-71-239.ngrok-free.app/api/Agency/GetAgencyById'

const getByGuid = async (uniqueGuid) => {
  const response = await axios.get(`${ID_BASE_URL}/${uniqueGuid}`)
  console.log(response);
  return response

}

export default { getByGuid }