import Axios, { AxiosInstance } from 'axios';
import { buildApiResponse } from './ApiResponseBuilder';
import {
  TCalculateShippingRate,
  CanguroAzulConfig,
  ICity,
  ICountry,
  IModeOfFare,
  IMunicipality,
  IOffice,
  IParish,
  IShippingType,
  IState,
  ITypeOfFare,
  IZoomCity,
  IZoomCountry,
  IZoomModeOfFare,
  IZoomMunicipality,
  IZoomOffice,
  IZoomParish,
  IZoomShippingType,
  IZoomState,
  IZoomTypeOfFare,
  ZoomResponse,
  IZoomShippingRate,
  IShippingRate,
  IZoomTracking,
  ITracking,
} from './types';

export class CanguroAzul {
  private axios: AxiosInstance;

  constructor(config: CanguroAzulConfig) {
    this.axios = Axios.create({
      baseURL: config.endpoint,
    });
  }

  /**
   * @function countries
   * @description TODO
   * @since 0.1.0
   * @author Jose Quevedo <jose@avilatek.com>
   * @param param0
   * @returns {import('./types').ApiResponse<import('./types').ICountry>}
   */
  public async countries({ type = 1 }: { type: number | null }) {
    const search = new URLSearchParams({
      tipo: String(type),
    });
    const { data } = await this.axios.get<ZoomResponse<IZoomCountry[]>>(
      `/getPaises?${search.toString()}`
    );
    return buildApiResponse<IZoomCountry[], ICountry[]>(
      data,
      (countries: IZoomCountry[]) =>
        countries.map(country => ({
          code: country.codpais,
          name: country.nombre_pais,
          nameDHL: country.nombre_pais_dhl,
          acronym: country.siglas,
        }))
    );
  }

  /**
   * @function states
   * @description TODO
   * @since 0.1.0
   * @author Jose Quevedo <jose@avilatek.com>
   * @param param0
   * @returns {import('./types').ApiResponse<import('./types').IState>}
   */
  public async states({ countryCode }: { countryCode: number }) {
    if (typeof countryCode === 'undefined') {
      throw new TypeError(`The params countryCode is required`);
    }
    if (typeof countryCode !== 'number') {
      throw new TypeError(`The params countryCode most be a number`);
    }
    const search = new URLSearchParams({
      filtro: String(countryCode),
    });
    const { data } = await this.axios.get<ZoomResponse<IZoomState[]>>(
      `/getEstados?${search.toString()}`
    );
    return buildApiResponse<IZoomState[], IState[]>(data, states =>
      states.map(state => ({
        code: state.codestado,
        name: state.nombre,
      }))
    );
  }

  /**
   * @function cities
   * @description TODO
   * @since 0.1.0
   * @param params0
   * @author Jose Quevedo <jose@avilatek.com>
   * @returns {import('./types').ApiResponse<import('./types').ICity>}
   */
  public async cities({
    filter,
  }: {
    filter?:
      | 'origin'
      | 'national'
      | 'charge-to-destination'
      | 'sender'
      | 'default';
  }) {
    const translateFilter = (filter: string) => {
      switch (filter) {
        case 'origin':
          return 'origen';
        case 'national':
          return 'nacional';
        case 'charge-to-destination':
          return 'cod';
        case 'sender':
          return 'remitente';
        case 'default':
          return 'default';
        default:
          return 'default';
      }
    };
    const search = new URLSearchParams({
      ...(filter ? { filtro: translateFilter(filter) } : {}),
    });
    const { data } = await this.axios.get<ZoomResponse<IZoomCity[]>>(
      `/getCiudades?${search.toString()}`
    );
    return buildApiResponse<IZoomCity[], ICity[]>(data, value =>
      value.map(city => ({
        code: city.codciudad,
        name: city.nombre_ciudad,
        state: city.nombre_estado,
        maxWeight: city?.pesomax,
        officeCode: city?.codoficinaope,
        officeName: city?.nombre,
      }))
    );
  }

  /**
   * @function municipalities
   * @description TODO
   * @since 0.1.0
   * @author Jose Quevedo <jose@avilatek.com>
   * @param param0
   * @returns {import('./types').ApiResponse<import('./types').IMunicipality>}
   */
  public async municipalities({
    cityCode,
    sender,
  }: {
    cityCode: number;
    sender?: 't';
  }) {
    if (typeof cityCode === 'undefined' || cityCode === null) {
      throw new TypeError(`The params cityCode is required`);
    }
    if (typeof cityCode !== 'number') {
      throw new TypeError(`The params cityCode most be a number`);
    }
    const search = new URLSearchParams({
      codciudad: String(cityCode),
      ...(sender ? { remitente: sender } : {}),
    });
    const { data } = await this.axios.get<ZoomResponse<IZoomMunicipality[]>>(
      `/getMunicipios?${search.toString()}`
    );
    return buildApiResponse<IZoomMunicipality[], IMunicipality[]>(
      data,
      values =>
        values.map(value => ({
          code: value.codigo_municipio,
          name: value.nombre_municipio,
        }))
    );
  }

  /**
   * @function parishes
   * @description TODO
   * @since 0.1.0
   * @author Jose Quevedo <jose@avilatek.com>
   * @param param0
   * @returns {import('./types').ApiResponse<import('./types').IParish>}
   */
  public async parishes({
    cityCode,
    municipalityCode,
    sender,
  }: {
    cityCode: number;
    municipalityCode: string;
    sender?: 't';
  }) {
    if (typeof cityCode === 'undefined' || cityCode === null) {
      throw new TypeError(`The params cityCode is required`);
    }
    if (typeof cityCode !== 'number') {
      throw new TypeError(`The params cityCode most be a number`);
    }
    if (typeof municipalityCode === 'undefined' || cityCode === null) {
      throw new TypeError(`The params cityCode is required`);
    }
    if (typeof municipalityCode !== 'string') {
      throw new TypeError(`The params cityCode most be a string`);
    }
    const search = new URLSearchParams({
      codciudad: String(cityCode),
      codmunicipio: String(municipalityCode),
      ...(sender ? { remitente: sender } : {}),
    });
    const { data } = await this.axios.get<ZoomResponse<IZoomParish[]>>(
      `/getParroquias?${search.toString()}`
    );
    return buildApiResponse<IZoomParish[], IParish[]>(data, values =>
      values.map(value => ({
        code: value.codigo_parroquia,
        name: value.nombre_parroquia,
        zipCode: value.codigo_postal,
      }))
    );
  }

  /**
   * @function offices
   * @description TODO
   * @since 0.1.0
   * @author Jose Quevedo <jose@avilatek.com>
   * @param param0
   * @returns {import('./types').ApiResponse<import('./types').IOffice>}
   */
  public async offices({
    cityCode,
    serviceCode,
    acronym,
    countryCode,
  }: {
    cityCode: number;
    serviceCode: number;
    acronym?: string;
    countryCode?: number;
  }) {
    if (typeof cityCode === 'undefined' || cityCode === null) {
      throw new TypeError(`The params cityCode is required`);
    }
    if (typeof cityCode !== 'number') {
      throw new TypeError(`The params cityCode must be a number`);
    }
    if (typeof serviceCode === 'undefined' || cityCode === null) {
      throw new TypeError(`The params serviceCode is required`);
    }
    if (typeof serviceCode !== 'number') {
      throw new TypeError(`The params serviceCode must be a number`);
    }
    const search = new URLSearchParams({
      codciudad: String(cityCode),
      codservicio: String(serviceCode),
      ...(acronym ? { siglas: acronym } : {}),
      ...(countryCode ? { codpais: String(countryCode) } : {}),
    });
    const { data } = await this.axios.get<ZoomResponse<IZoomOffice[]>>(
      `/getOficinas?${search.toString()}`
    );
    return buildApiResponse<IZoomOffice[], IOffice[]>(data, values =>
      values.map(value => ({
        code: value.codoficina,
        name: value.nombre,
        officeTypeCode: value.codtipoofi,
      }))
    );
  }
  /**
   * @function typesOfFare
   * @description TODO
   * @since 0.1.0
   * @author Jose Quevedo <jose@avilatek.com>
   * @returns {import('./types').ApiResponse<import('./types').ITypeOfFare>}
   */
  public async typesOfFare() {
    const { data } = await this.axios.get<ZoomResponse<IZoomTypeOfFare[]>>(
      `/getTipoTarifa`
    );
    return buildApiResponse<IZoomTypeOfFare[], ITypeOfFare[]>(data, values =>
      values.map(value => ({
        code: value.codigo,
        description: value.descripcion,
      }))
    );
  }

  /**
   * @function modesOfFare
   * @description TODO
   * @since 0.1.0
   * @author Jose Quevedo <jose@avilatek.com>
   * @returns {import('./types').ApiResponse<import('./types').IModeOfFare>}
   */
  public async modesOfFare() {
    const { data } = await this.axios.get<ZoomResponse<IZoomModeOfFare[]>>(
      `/getModalidadTarifa`
    );
    return buildApiResponse<IZoomModeOfFare[], IModeOfFare[]>(data, values =>
      values.map(value => ({
        code: value.codigo,
        description: value.descripcion,
      }))
    );
  }

  /**
   * @function shippingTypes
   * @description TODO
   * @since 0.1.0
   * @author Jose Quevedo <jose@avilatek.com>
   * @returns {import('./types').ApiResponse<import('./types').IShippingType>}
   */
  public async shippingTypes() {
    const { data } = await this.axios.get<ZoomResponse<IZoomShippingType[]>>(
      `/getTipoEnvio`
    );
    return buildApiResponse<IZoomShippingType[], IShippingType[]>(
      data,
      values =>
        values.map(value => ({
          id: value.id,
          code: value.codigo,
          description: value.descripcion,
        }))
    );
  }

  /**
   * @function calculateShippingRate
   * @description TODO
   * @since 0.1.0
   * @param {import('./types').TCalculateShippingRate} params
   * @author Jose Quevedo <jose@avilatek.com>
   * @returns {import('./types').ApiResponse<import('./types').IShippingRate>}
   */
  public async calculateShippingRate(params: TCalculateShippingRate) {
    const typeOfFare =
      params.type === 'charge-to-destination'
        ? 1
        : params.type === 'national'
        ? 2
        : params.type === 'international'
        ? 3
        : -1;
    if (
      !['charge-to-destination', 'national', 'international'].includes(
        params.type
      ) ||
      typeOfFare === -1
    ) {
      throw new TypeError(
        `The param _type_ must be one of the following ${[
          'charge-to-destination (1)',
          'national (2)',
          'international (3)',
        ].join(', ')}`
      );
    }
    const modeOfFare =
      params.type === 'international'
        ? 0
        : params.mode === 'office'
        ? 1
        : params.mode === 'delivery'
        ? 2
        : -1;
    if (
      params.type !== 'international' &&
      (!['office', 'delivery'].includes(params.mode) || modeOfFare === -1)
    ) {
      throw new TypeError(
        `The params _mode_ must be use only for charge-to-destination and nationals shipments, and must be equal to ${[
          'office (1)',
          'delivery (2)',
        ].join(', ')} `
      );
    }
    if (
      typeof params.senderCityCode === 'undefined' ||
      typeof params.senderCityCode !== 'number'
    ) {
      throw new TypeError(
        `The params senderCityCode is required and must be a number`
      );
    }
    const recipientCityCode =
      params.type !== 'international' ? params.recipientCityCode : undefined;
    if (
      params.type !== 'international' &&
      (typeof recipientCityCode === 'undefined' ||
        typeof recipientCityCode !== 'number')
    ) {
      throw new TypeError(
        `The param recipientCityCode must be defined and of type number when the shipment is national`
      );
    }
    const officeCode =
      params.type !== 'international' && params.mode === 'office'
        ? params.officeCode
        : undefined;
    if (
      params.type !== 'international' &&
      params.mode === 'office' &&
      (typeof officeCode === 'undefined' || typeof officeCode !== 'number')
    ) {
      throw new TypeError(
        `The params officeCode is required when the shipment is national and is retired in an office, and must be of type number`
      );
    }
    if (
      typeof params.pieces === 'undefined' ||
      typeof params.pieces !== 'number'
    ) {
      throw new TypeError(`The params pieces is required and must be a number`);
    }
    if (
      typeof params.weight === 'undefined' ||
      typeof params.weight !== 'number'
    ) {
      throw new TypeError(`The params weight is required and must be a number`);
    }
    const merchandiseValue =
      params.type !== 'international' && params.type === 'charge-to-destination'
        ? params.merchandiseValue
        : undefined;
    if (
      params.type !== 'international' &&
      params.type === 'charge-to-destination' &&
      (typeof merchandiseValue === 'undefined' ||
        typeof merchandiseValue !== 'number')
    ) {
      throw new TypeError(
        `The merchandise value is required when the shipment is charge-to-destination`
      );
    }
    const countryCode =
      params.type === 'international' ? params.countryCode : 0;
    if (
      params.type === 'international' &&
      (typeof params.countryCode === 'undefined' ||
        typeof params.countryCode !== 'number')
    ) {
      throw new TypeError(
        `The param countryCode is required for international shipments`
      );
    }
    const shippingTypeCode =
      params.type !== 'international'
        ? 0
        : params.shippingType === 'documents'
        ? 1
        : params.shippingType === 'merchandise'
        ? 2
        : -1;
    if (
      params.type === 'international' &&
      (!['documents', 'merchandise'].includes(params.shippingType) ||
        shippingTypeCode === -1)
    ) {
      throw new TypeError(
        `The param _shippingType_ must be one of the following ${[
          'documents (1)',
          'merchandise (2)',
        ].join(', ')}`
      );
    }
    if (
      params.type === 'international' &&
      shippingTypeCode === 2 &&
      (typeof params.height === 'undefined' ||
        typeof params.height !== 'number')
    ) {
      throw new TypeError(`The params height is required and must be a number`);
    }
    if (
      params.type === 'international' &&
      shippingTypeCode === 2 &&
      (typeof params.width === 'undefined' || typeof params.width !== 'number')
    ) {
      throw new TypeError(`The params width is required and must be a number`);
    }
    if (
      params.type === 'international' &&
      shippingTypeCode === 2 &&
      (typeof params.length === 'undefined' ||
        typeof params.length !== 'number')
    ) {
      throw new TypeError(`The params length is required and must be a number`);
    }
    const search = new URLSearchParams({
      tipo_tarifa: String(typeOfFare),
      modalidad_tarifa: String(modeOfFare),
      ciudad_remitente: String(params.senderCityCode),
      ciudad_destinatario: String(recipientCityCode),
      oficina_retirar: String(officeCode),
      cantidad_piezas: String(params.pieces),
      peso: String(params.weight),
      ...(merchandiseValue
        ? { valor_mercancia: String(merchandiseValue) }
        : {}),
      ...(params.declaredValue
        ? { valor_declarado: String(params.declaredValue) }
        : {}),
      codpais: String(countryCode),
      tipo_envio: String(shippingTypeCode),
      ...(params.type === 'international' && params.zipCode
        ? { zona_postal: params.zipCode }
        : {}),
      ...(params.type === 'international' && shippingTypeCode === 2
        ? { alto: String(params.height) }
        : {}),
      ...(params.type === 'international' && shippingTypeCode === 2
        ? { ancho: String(params.weight) }
        : {}),
      ...(params.type === 'international' && shippingTypeCode === 2
        ? { largo: String(params.length) }
        : {}),
    });
    const { data } = await this.axios.get<ZoomResponse<IZoomShippingRate>>(
      `/CalcularTarifa?${search.toString()}`
    );
    return buildApiResponse<IZoomShippingRate, IShippingRate>(data, value => ({
      details: {
        taxPercentage: value.detalle.iva_porcentaje,
        codtipopes: value.detalle.codtipopes,
        basic: value.detalle.basico,
        overweightAmount: value.detalle.kilos_sobrepeso,
        transferCode: value.detalle.codtraslado,
        overweight: value.detalle.sobrepeso,
        transfer: value.detalle.traslado,
      },
      freight: value.flete,
      commission: value.comision,
      insurance: value.seguro,
      gas: value.combustible,
      subtotal: value.subtotal,
      postalPostage: value.franqueo_postal,
      tax: value.iva,
      total: value.total,
    }));
  }

  /**
   * @function tracking
   * @description TODO
   * @since 0.1.0
   * @param params
   * @author Jose Quevedo <jose@avilatek.com>
   * @returns {import('./types').ApiResponse<import('./types').ITracking>}
   */
  public async tracking({
    type,
    code,
    clientCode,
  }: {
    type: 'zoom' | 'ref';
    code: string;
    clientCode: number;
  }) {
    if (typeof type === 'undefined' || (type !== 'zoom' && type !== 'ref')) {
      throw new TypeError(
        `The param _type_ must zoom or ref and should be passed`
      );
    }
    if (typeof code === 'undefined' && typeof code !== 'string') {
      throw new TypeError(
        `The param _code_ is required and should be a string`
      );
    }
    if (typeof clientCode === 'undefined' && typeof clientCode !== 'number') {
      throw new TypeError(
        `The param _clientCode_ is required and should be a number`
      );
    }
    const search = new URLSearchParams({
      tipo_busqueda: String(type === 'zoom' ? 1 : 2),
      codigo: code,
      codigo_cliente: String(clientCode),
    });
    const { data } = await this.axios.get<ZoomResponse<IZoomTracking[]>>(
      `/getInfoTracking?${search.toString()}`
    );
    return buildApiResponse<IZoomTracking[], ITracking[]>(data, values =>
      values.map(value => ({
        reference: value.referencia,
        receiver: value.receptor,
        clientCode: value.codigo_cliente,
        tracking: value.guia,
        date: value.fecha,
        statusCode: value.codigo_estatus,
        acronym: value.siglas,
        statusDescription: value.descripcion_estatus,
        hour: value.hora,
        processingDate: value.fechapro,
        stamp: value.sello,
        typeCode: value.codtipo,
      }))
    );
  }
  /**
   * @function officesByWithdraw
   * @description TODO
   * @since 0.1.0
   * @param params
   * @author Jose Quevedo <jose@avilatek.com>
   * @returns {import('./types').ApiResponse<import('./types').ITracking>}
   */
  public async officesByWithdraw({
    typeOfFare,
    modeOfFare,
    recipientCityCode,
  }: {
    typeOfFare?: number;
    modeOfFare?: number;
    recipientCityCode: number;
  }) {
    if (typeof typeOfFare !== 'undefined' && typeof typeOfFare !== 'number') {
      throw new TypeError(`The param _typeOfFare_ must be a number`);
    }
    if (typeof modeOfFare !== 'undefined' && typeof modeOfFare !== 'number') {
      throw new TypeError(`The param _modeOfFare_ must be a number`);
    }
    if (
      typeof recipientCityCode === 'undefined' ||
      typeof recipientCityCode !== 'number'
    ) {
      throw new TypeError(
        `The param _recipientCityCode_ is required and must be a number`
      );
    }
    const search = new URLSearchParams({
      codigo_ciudad_destino: String(recipientCityCode),
      ...(modeOfFare ? { modalidad_tarifa: String(modeOfFare) } : {}),
      ...(typeOfFare ? { tipo_tarifa: String(typeOfFare) } : {}),
    });
    const { data } = await this.axios.get<ZoomResponse<IZoomOffice[]>>(
      `/getOficinasGE?${search.toString()}`
    );
    return buildApiResponse<IZoomOffice[], IOffice[]>(data, values =>
      values.map(value => ({
        code: value.codoficina,
        name: value.nombre,
        officeTypeCode: value.codtipoofi,
        address: value.direccion,
      }))
    );
  }
}
