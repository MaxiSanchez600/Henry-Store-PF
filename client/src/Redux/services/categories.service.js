import axios from "axios";
// ACA SE DEBERIA IMPORTAR LA RUTA PARA HACER EL GET 
// import CATEGORIES from "../../Assets/categories.json";
import { CATETGORIES_URL } from '../../Config/index';
//REVISAR ESTO!!!! CATETGORIES NO ESTA EN CONFIG, ROMPE?
export async function getAllCategoriesService() {
  return axios.get(CATETGORIES_URL);
}