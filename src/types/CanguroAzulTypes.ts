export interface IZoomCountry {
  codpais: number;
  nombre_pais: string;
  nombre_pais_dhl: string;
  siglas: string;
}

export interface ICountry {
  code: number;
  name: string;
  nameDHL: string;
  acronym: string;
}

export interface IZoomState {
  codestado: number;
  nombre: string;
}

export interface IState {
  code: number;
  name: string;
}

export interface IZoomCity {
  codciudad: number;
  nombre_ciudad: string;
  nombre_estado: string;
  pesomax?: string;
  codoficinaope?: number;
  nombre?: string;
}

export interface ICity {
  code: number;
  name: string;
  state: string;
  maxWeight?: string;
  officeCode?: number;
  officeName?: string;
}

export interface IZoomMunicipality {
  codigo_municipio: string;
  nombre_municipio: string;
}

export interface IMunicipality {
  code: string;
  name: string;
}

export interface IZoomParish {
  codigo_parroquia: string;
  nombre_parroquia: string;
  codigo_postal: string;
}

export interface IParish {
  code: string;
  name: string;
  zipCode: string;
}

export interface IZoomOffice {
  codoficina: number;
  nombre: string;
  codtipoofi: number;
  direccion?: string;
}

export interface IOffice {
  code: number;
  name: string;
  officeTypeCode: number;
  address?: string;
}

export interface IZoomTypeOfFare {
  codigo: string;
  descripcion: string;
}

export interface ITypeOfFare {
  code: string;
  description: string;
}

export interface IZoomModeOfFare {
  codigo: string;
  descripcion: string;
}

export interface IModeOfFare {
  code: string;
  description: string;
}

export interface IZoomShippingType {
  id: number;
  codigo: string;
  descripcion: string;
}

export interface IShippingType {
  id: number;
  code: string;
  description: string;
}

type TCalculateShippingRateNational = {
  type: 'charge-to-destination' | 'national';
  recipientCityCode: number;
  merchandiseValue?: number;
} & (
  | {
      mode: 'office';
      officeCode: number;
    }
  | {
      mode: 'delivery';
    }
);

type TCalculateShippingRateInternational = {
  type: 'international';
  shippingType: 'documents' | 'merchandise';
  countryCode: number;
  zipCode: string;
  height?: number;
  width?: number;
  length?: number;
};

export type TCalculateShippingRate = {
  senderCityCode: number;
  pieces: number;
  weight: number;
  declaredValue?: number;
} & (TCalculateShippingRateNational | TCalculateShippingRateInternational);

export interface IZoomShippingRate {
  detalle: {
    iva_porcentaje: number;
    codtipopes: number;
    basico: string;
    kilos_sobrepeso: string;
    codtraslado: number;
    sobrepeso: string;
    traslado: string;
  };
  flete: string;
  comision: string;
  seguro: string;
  combustible: string;
  subtotal: string;
  franqueo_postal: string;
  iva: string;
  total: string;
}

export interface IShippingRate {
  details: {
    taxPercentage: number;
    codtipopes: number;
    basic: string;
    overweightAmount: string;
    transferCode: number;
    overweight: string;
    transfer: string;
  };
  freight: string;
  commission: string;
  insurance: string;
  gas: string;
  subtotal: string;
  postalPostage: string;
  tax: string;
  total: string;
}

export interface IZoomTracking {
  referencia: string;
  receptor: string;
  codigo_cliente: string;
  guia: number;
  fecha: string;
  codigo_estatus: number;
  siglas: string;
  descripcion_estatus: string;
  hora: string;
  fechapro: string;
  sello: string;
  codtipo: number;
}

export interface ITracking {
  reference: string;
  receiver: string;
  clientCode: string;
  tracking: number;
  date: string;
  statusCode: number;
  acronym: string;
  statusDescription: string;
  hour: string;
  processingDate: string;
  stamp: string;
  typeCode: number;
}
