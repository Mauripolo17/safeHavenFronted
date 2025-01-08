import axios from "axios";



const API_BASE_URL = "http://localhost:8080/api";

export interface HistorialRecord  {
  id: number;
  motivo: string;
  duracion: string;
  tipoCita: string;
  insertBy: string;
  updateBy: string;
  fecha: string,
  hora: string,
  paciente: number,
  psicologo: number,
  consultorio: number,
};

export const citaService = {
  getCitasByPaciente: async (id: number): Promise<HistorialRecord[]> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/citas/pacienteHistorial/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch citas");
    }
  },
};
