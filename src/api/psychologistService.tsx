import axios from 'axios';

export interface Psychologist {
  id: number;
  nombre: string;
  apellido: string;
  correoElectronico: string;
  edad: number;
  telefono: number;
  sexo: string;
  fechaDeNacimiento: string;
  especialidad: string;
  añosDeExperiencia: number;
  horarioDeAtencion: string;
}

const API_BASE_URL = 'http://localhost:8080/api';

export const psychologistService = {
  getAllPsychologists: async (): Promise<Psychologist[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/psicologos`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch psychologists');
    }
  }
};

export default psychologistService;
