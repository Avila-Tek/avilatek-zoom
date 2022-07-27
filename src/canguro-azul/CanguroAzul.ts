import Axios, { AxiosInstance } from 'axios';
import { optional } from '../utils';

export type TCanguroAzulConfig = {
  endpoint: string;
};

type GetInfoTracking = {
  search_type: number;
  code: string;
  clientCode: string;
};

type GetCities = {
  filter: 'origen' | 'nacional' | 'cod' | 'remitente' | 'default';
};

type GetOffices = {
  codciudad: number;
  codservicio: number;
  siglas: string;
  codpais: number | null;
};

type GetZoomTrack = {
  codigo: string;
  tipo_busqueda: 1 | 2 | 3 | 4 | 5;
  web: 0 | 1 | null;
};

type ComputeRate = {
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

type GetAnswersTags = {
  id_language: number | null;
  codrespuesta: string | null;
};

type GetSections = {
  id_language: number | null;
  id_session: number | null;
};

type GetLastTracking = {
  tipo_busqueda: number | null;
  codigo: string;
  codigo_cliente: string;
};

type GetMunicipalities = {
  codciudad: number;
  remitente: string | null;
};

type GetParishes = {
  codciudad: number;
  codmunicipio: number;
  remitente: string | null;
};

type GetOfficesGE = {
  codigo_ciudad_destino: number;
  modalidad_tarifa: number | null;
  tipo_tarifa: number | null;
};

type GetCitiesOfi = {
  codestado: string;
  recolecta: number | null;
};

type GetDeliveryRouteType = {
  codciudadori: number;
  codciudaddes: number;
};

export class CanguroAzul {
  private axios: AxiosInstance | null = null;

  constructor(config: TCanguroAzulConfig) {
    this.axios! = Axios.create({
      baseURL:
        config?.endpoint ??
        'http://sandbox.grupozoom.com/baaszoom/public/canguroazul',
    });
  }

  public async getInfoTracking({
    search_type,
    code,
    clientCode,
  }: GetInfoTracking) {
    try {
      const { data } = await this.axios!.get(
        `getInfoTracking?tipo_busqueda=${search_type}&codigo=${code}&codigo_cliente=${clientCode}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getRateTypes() {
    try {
      const { data } = await this.axios!.get(`getTipoTarifa`);
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getRateModes() {
    try {
      const { data } = await this.axios!.get(`getModalidadTarifa`);
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getCities({ filter }: GetCities) {
    try {
      const { data } = await this.axios!.get(`getCiudades?filtro=${filter}`);
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
      const { data } = await this.axios!.get(
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
      const { data } = await this.axios!.get(
        `getPaises?${optional('tipo', tipo)}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getDeliveryTypes() {
    try {
      const { data } = await this.axios!.get(`getTipoEnvio`);
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
      const { data } = await this.axios!.get(
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
      const { data } = await this.axios!.get(
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
      const { data } = await this.axios!.get(`getlanguages`);
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getAnswersTags({ id_language, codrespuesta }: GetAnswersTags) {
    try {
      const { data } = await this.axios!.get(
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
      const { data } = await this.axios!.get(
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
      const { data } = await this.axios!.get(
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
      const { data } = await this.axios!.get(
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
      const { data } = await this.axios!.get(
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
      const { data } = await this.axios!.get(
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
      const { data } = await this.axios!.get(`getEstatus`);
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async getCitiesOfi({ codestado, recolecta }: GetCitiesOfi) {
    try {
      const { data } = await this.axios!.get(
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
      const { data } = await this.axios!.get(
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
      const { data } = await this.axios!.get(
        `getTipoRutaEnvio?codciudadori=${codciudadori}&codciudaddes=${codciudaddes}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }
}
