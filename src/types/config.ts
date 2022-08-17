export type ZoomResponse<T> = {
  codrespuesta: string;
  mensaje: string;
  entidadRespuesta: T;
};

export interface ApiResponse<T> {
  code: string;
  message: string;
  response: T;
}

export interface CanguroAzulConfig {
  endpoint: string;
}

export interface GuiaElectronicaConfig {
  endpoint: string;
  user: string;
  password: string;
  privateKey: string;
}

export type ZoomConfig =
  | {
      env: 'production' | 'development';
    }
  | Config;

export type Config = {
  canguroAzulEndpoint: string;
  guiaElectronicaEndpoint: string;
  guiaElectronicaUser: string;
  guiaElectronicaPassword: string;
  guiaElectronicaKey: string;
};
