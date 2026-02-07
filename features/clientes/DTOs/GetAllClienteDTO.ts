export interface GetAllClienteDTO {
  id: number;
  nombre: string;
  apellido: string;
  numero_documento: string;
  estado: boolean;
  // Estos campos vienen de los JOINs que hicimos en la consulta
  tipoDocumento: string; 
  ciudad: string;
  departamento: string;
  created_at: Date | string;
}