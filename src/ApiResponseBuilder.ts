import { ApiResponse, ZoomResponse } from './types/config';

export function buildApiResponse<Z = any, T = any>(
  data: ZoomResponse<Z>,
  parserFunction?: (value: Z) => T
): ApiResponse<T> {
  if (data.codrespuesta !== 'COD_000' && data.codrespuesta !== 'COD_001') {
    throw new Error(
      `Error en el servicio de Zoom ${data.mensaje} - ${JSON.stringify(
        data.entidadRespuesta,
        null,
        2
      )}`
    );
  }
  let response: T = (data.entidadRespuesta as unknown) as T;
  if (
    typeof parserFunction !== 'undefined' &&
    typeof parserFunction === 'function'
  ) {
    response = parserFunction(data.entidadRespuesta);
  }
  return {
    code: data.codrespuesta,
    message: data.mensaje,
    response,
  };
}
