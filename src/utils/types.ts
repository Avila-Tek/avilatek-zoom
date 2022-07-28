export type ZoomResponse<T> = {
  codrespuesta: string;
  mensaje: string;
  entidadRespuesta: T;
};

export type GetInfoTracking = {
  search_type: number;
  code: string;
  clientCode: string;
};

export type GetCities = {
  filter: 'origen' | 'nacional' | 'cod' | 'remitente' | 'default';
};

export type GetOffices = {
  codciudad: number;
  codservicio: number;
  siglas: string;
  codpais: number | null;
};

export type GetZoomTrack = {
  codigo: string;
  tipo_busqueda: 1 | 2 | 3 | 4 | 5;
  web: 0 | 1 | null;
};

export type ComputeRate = {
  tipo_tarifa: number | null;
  modalidad_tarifa: number | null;
  ciudad_remitente: number | null;
  ciudad_destinatario: number | null;
  oficina_retirar: number | null;
  cantidad_piezas: number | null;
  peso: number | null;
  valor_mercancia: number | null;
  valor_declarado: number | null;
  codpais: number | null;
  tipo_envio: number | null;
  zona_postal: number | null;
  alto: number | null;
  ancho: number | null;
  largo: number | null;
};

export type GetAnswersTags = {
  id_language: number | null;
  codrespuesta: string | null;
};

export type GetSections = {
  id_language: number | null;
  id_session: number | null;
};

export type GetLastTracking = {
  tipo_busqueda: number | null;
  codigo: string;
  codigo_cliente: string;
};

export type GetMunicipalities = {
  codciudad: number;
  remitente: string | null;
};

export type GetParishes = {
  codciudad: number;
  codmunicipio: number;
  remitente: string | null;
};

export type GetOfficesGE = {
  codigo_ciudad_destino: number;
  modalidad_tarifa: number | null;
  tipo_tarifa: number | null;
};

export type GetCitiesOfi = {
  codestado: string;
  recolecta: number | null;
};

export type GetDeliveryRouteType = {
  codciudadori: number;
  codciudaddes: number;
};

export type Login = {
  login: string;
  claveenc: string;
};
