import axios from 'axios';

export interface Patient {
  id: number;
  nombre: string;
  apellido: string;
  sexo: string;
  fechaDeNacimiento: string;
  edad: number;
  correoElectronico: string;
  telefono: number;
  estadoDeSalud: string;
  fechaDeRegistro: string;
}

const API_BASE_URL = 'http://localhost:8080/api';

export const patientService = {
  getAllPatients: async (): Promise<Patient[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pacientes`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch patients');
    }
  }
};

export default patientService;
