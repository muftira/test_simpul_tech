import axios from "axios";

// const base_url = "https://my-json-server.typicode.com/muftira/quicks/";
const base_url = "http://localhost:3000/";

export async function fetchData(fetchType, const_api_url, objData) {
  try {
    const response = await axios({
        url: base_url + const_api_url,
        method: fetchType.toUpperCase(),
        // headers: {
        //     'Authorization': '',
        //     'Content-Type': ''
        // },
        data: objData,
      });

      return {
        success: true,
        message: 'Success',
        data: response,
      };
  } catch (e) {
    return {
        success: false,
        message: e.message,
      };
  }
}
