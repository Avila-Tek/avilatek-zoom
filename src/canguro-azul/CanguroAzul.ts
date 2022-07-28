import Axios, { AxiosInstance } from 'axios';
import { optional } from '../utils';
import type {
  ZoomResponse,
  GetInfoTracking,
  GetCities,
  GetOffices,
  GetZoomTrack,
  ComputeRate,
  GetAnswersTags,
  GetSections,
  GetLastTracking,
  GetMunicipalities,
  GetParishes,
  GetOfficesGE,
  GetCitiesOfi,
  GetDeliveryRouteType,
  Login,
} from '../utils';

export type TCanguroAzulConfig = {
  endpoint: string;
  user: string;
  password: string;
};

export class CanguroAzul {
  private axios: AxiosInstance | null = null;

  private token: string | null = null;

  constructor(config: TCanguroAzulConfig) {
    this.init(config);
  }

  private async init(config: TCanguroAzulConfig) {
    this.axios! = Axios.create({
      baseURL:
        config?.endpoint ??
        'http://sandbox.grupozoom.com/baaszoom/public/canguroazul',
    });
    const { entidadRespuesta } = await this.login({
      login: config.user,
      claveenc: config.password,
    });
    this.token = entidadRespuesta.token;
    this.axios!.defaults.headers.common.Cookie = `laravel_session=${this.token}`;
  }

  private async login({
    login,
    claveenc,
  }: Login): Promise<ZoomResponse<{ token: string }>> {
    const { data } = await this.axios!.get<ZoomResponse<any>>(
      `loginGenUEWs?login=${login}&claveenc=${claveenc}`
    );
    return data;
  }

  public async getInfoTracking({
    search_type,
    code,
    clientCode,
  }: GetInfoTracking) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getInfoTracking?tipo_busqueda=${search_type}&codigo=${code}&codigo_cliente=${clientCode}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getRateTypes() {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getTipoTarifa`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getRateModes() {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getModalidadTarifa`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getCities({ filter }: GetCities) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getCiudades?filtro=${filter}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getOffices({
    codciudad,
    codpais,
    codservicio,
    siglas,
  }: GetOffices) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getOficinas?codciudad=${codciudad}&codservicio=${codservicio}&${optional(
          'siglas',
          siglas
        )}&${optional('codpais', codpais)}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getCountries({ tipo }: { tipo: number | null }) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getPaises?${optional('tipo', tipo)}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getDeliveryTypes() {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(`getTipoEnvio`);
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async computeRate({
    tipo_tarifa,
    modalidad_tarifa,
    ciudad_remitente,
    ciudad_destinatario,
    oficina_retirar,
    cantidad_piezas,
    peso,
    valor_mercancia,
    valor_declarado,
    codpais,
    tipo_envio,
    zona_postal,
    alto,
    ancho,
    largo,
  }: ComputeRate) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `CalcularTarifa?${optional('tipo_tarifa', tipo_tarifa)}&${optional(
          'modalidad_tarifa',
          modalidad_tarifa
        )}&${optional('modalidad_tarifa', modalidad_tarifa)}&${optional(
          'ciudad_remitente',
          ciudad_remitente
        )}&${optional(
          'ciudadciudad_destinatario',
          ciudad_destinatario
        )}&${optional('oficina_retirar', oficina_retirar)}&${optional(
          'cantidad_piezas',
          cantidad_piezas
        )}&${optional('peso', peso)}&${optional(
          'valor_mercancia',
          valor_mercancia
        )}&${optional('valor_declarado', valor_declarado)}&${optional(
          'codpais',
          codpais
        )}&${optional('tipo_envio', tipo_envio)}&${optional(
          'zona_postal',
          zona_postal
        )}&${optional('alto', alto)}&${optional('ancho', ancho)}&${optional(
          'largo',
          largo
        )}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getZoomTrackWs({ codigo, tipo_busqueda, web }: GetZoomTrack) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getZoomTrackWs?codigo=${codigo}&tipo_busqueda=${tipo_busqueda}&${optional(
          'web',
          web
        )}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getLanguages() {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(`getlanguages`);
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getAnswersTags({ id_language, codrespuesta }: GetAnswersTags) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getRespuestastags?${optional('id_language', id_language)}&${optional(
          'codrespuesta',
          codrespuesta
        )}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getSections({ id_language, id_session }: GetSections) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getSecciones?${optional('id_language', id_language)}&${optional(
          'id_session',
          id_session
        )}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getLastTracking({
    tipo_busqueda,
    codigo_cliente,
    codigo,
  }: GetLastTracking) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getLastTracking?${optional(
          'tipo_busqueda',
          tipo_busqueda
        )}&codigo=${codigo}&codigo_client=${codigo_cliente}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getMunicipalities({ codciudad, remitente }: GetMunicipalities) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getMunicipios?codciudad=${codciudad}${optional(
          'remitente',
          remitente
        )}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getParishes({
    codciudad,
    codmunicipio,
    remitente,
  }: GetParishes) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getParroquias?codciudad=${codciudad}&codmunicipio=${codmunicipio}&${optional(
          'remitente',
          remitente
        )}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getOfficesGE({
    codigo_ciudad_destino,
    modalidad_tarifa,
    tipo_tarifa,
  }: GetOfficesGE) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getOficinasGE?codigo_ciudad_destino=${codigo_ciudad_destino}&${optional(
          'modalidad_tarifa',
          modalidad_tarifa
        )}&${optional('tipo_tarifa', tipo_tarifa)}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getStatus() {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(`getEstatus`);
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getCitiesOfi({ codestado, recolecta }: GetCitiesOfi) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getCiudadesOfi?codestado=${codestado}&${optional(
          'recolecta',
          recolecta
        )}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getBranchOffices({ codciudad }: { codciudad: number }) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getSucursales?codciudad=${codciudad}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getDeliveryRouteType({
    codciudadori,
    codciudaddes,
  }: GetDeliveryRouteType) {
    try {
      const { data } = await this.axios!.get<ZoomResponse<any>>(
        `getTipoRutaEnvio?codciudadori=${codciudadori}&codciudaddes=${codciudaddes}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }
}
