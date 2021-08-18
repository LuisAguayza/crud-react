import axios from "axios";
const urlBase = "http://localhost:8080/";
export default async function axiosFetch(empleado) {
  try {
    const response = await axios({
      url: urlBase + "Empleado/save",
      method: "POST",
      data: empleado,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
