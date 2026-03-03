import { Ciudad } from "../entities/ciudad.entity";
import { Departamento } from "../entities/departamento.entity";

/**
 * Contrato para el acceso a datos geográficos.
 * Define las operaciones necesarias para obtener la jerarquía de ubicación.
 */
export interface IUbicacionRepository {
  /**
   * Obtiene todos los departamentos registrados en el sistema.
   */
  getDepartamentos(): Promise<Departamento[]>;

  /**
   * Obtiene la lista completa de ciudades con su referencia al departamento.
   */
  getCiudades(): Promise<Ciudad[]>;
}
