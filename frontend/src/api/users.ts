import axios from "axios";

export default {

async getById (id: string) {
  const userRaw = await axios.get(`http://localhost:3001/users/${id}`);
  return userRaw.data.data.user;
},
}