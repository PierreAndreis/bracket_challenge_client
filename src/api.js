import axios from "axios";

const API = {};

const url = "https://bracket_api.vgpro.gg"


API.checkIgn = async (ign) => {
  try {
    const res = await axios({
      method: 'post',
      baseURL: url,
      url: '/check/ign',
      data: {ign: ign}
    });
    
    if (!res || !res.data) throw new Error();

    return res.data.result;
  }
  catch(e) {
    return -1; // internal server error
  }
}

API.checkEmail = async (email) => {
  try {
    const res = await axios({
      method: 'post',
      baseURL: url,
      url: '/check/email',
      data: {email: email}
    });
    
    if (!res || !res.data) throw new Error();

    return res.data.result;
  }
  catch(e) {
    return -1; // internal server error
  }
}

API.sendResult = async (ign, email, answer) => {
  try {
    const res = await axios({
      method: 'post',
      baseURL: url,
      url: '/sendResult',
      data: {ign: ign, email: email, answer: answer}
    });
    
    if (!res || !res.data) throw new Error();

    return 1;
  }
  catch(e) {
    return -1; // internal server error
  }
}
export default API;