import axios from 'axios';
import { optional } from 'utils';

const BASE_URL = 'http://sandbox.grupozoom.com/baaszoom/public/canguroazul';

export async function getInfoTracking(
  search_type: number,
  code: string,
  clientCode: string
) {
  try {
    const res = await axios.get(
      `${BASE_URL}/getInfoTracking?tipo_busqueda=${search_type}&codigo=${code}&codigo_cliente=${clientCode}`
    );
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getRateTypes() {
  try {
    const res = await axios.get(`${BASE_URL}/getTipoTarifa`);
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getRateModes() {
  try {
    const res = await axios.get(`${BASE_URL}/getModalidadTarifa`);
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getCities(
  filtro: 'origen' | 'nacional' | 'cod' | 'remitente' | 'default'
) {
  try {
    const res = await axios.get(`${BASE_URL}/getCiudades?filtro=${filtro}`);
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getOffices(
  codciudad: number,
  codservicio: number,
  siglas: string = '',
  codpais: number | null = null
) {
  try {
    const res = await axios.get(
      `${BASE_URL}/getOficinas?codciudad=${codciudad}&codservicio=${codservicio}&${optional(
        'siglas',
        siglas
      )}&${optional('codpais', codpais)}`
    );
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getCountries(tipo: number | null) {
  try {
    const res = await axios.get(
      `${BASE_URL}/getPaises?${optional('tipo', tipo)}`
    );
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getDeliveryTypes() {
  try {
    const res = await axios.get(`${BASE_URL}/getTipoEnvio`);
    return res;
  } catch (error) {
    return { error };
  }
}

export async function computeRate(
  tipo_tarifa: number | null = null,
  modalidad_tarifa: number | null = null,
  ciudad_remitente: number | null = null,
  ciudad_destinatario: number | null = null,
  oficina_retirar: number | null = null,
  cantidad_piezas: number | null = null,
  peso: number | null = null,
  valor_mercancia: number | null = null,
  valor_declarado: number | null = null,
  codpais: number | null = null,
  tipo_envio: number | null = null,
  zona_postal: number | null = null,
  alto: number | null = null,
  ancho: number | null = null,
  largo: number | null = null
) {
  try {
    const res = await axios.get(
      `${BASE_URL}/CalcularTarifa?${optional(
        'tipo_tarifa',
        tipo_tarifa
      )}&${optional('modalidad_tarifa', modalidad_tarifa)}&${optional(
        'modalidad_tarifa',
        modalidad_tarifa
      )}&${optional('ciudad_remitente', ciudad_remitente)}&${optional(
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
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getZoomTrackWs(
  codigo: string,
  tipo_busqueda: 1 | 2 | 3 | 4 | 5,
  web: 0 | 1 | null = null
) {
  try {
    const res = await axios.get(
      `${BASE_URL}/getZoomTrackWs?codigo=${codigo}&tipo_busqueda=${tipo_busqueda}&${optional(
        'web',
        web
      )}`
    );
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getLanguages() {
  try {
    const res = await axios.get(`${BASE_URL}/getlanguages`);
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getAnswersTags(
  id_language: number | null = null,
  codrespuesta: string | null = null
) {
  try {
    const res = await axios.get(
      `${BASE_URL}/getRespuestastags?${optional(
        'id_language',
        id_language
      )}&${optional('codrespuesta', codrespuesta)}`
    );
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getSections(
  id_language: number | null = null,
  id_session: number | null = null
) {
  try {
    const res = await axios.get(
      `${BASE_URL}/getSecciones?${optional(
        'id_language',
        id_language
      )}&${optional('id_session', id_session)}`
    );
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getLastTracking(
  tipo_busqueda: number | null = null,
  codigo: string,
  codigo_cliente: string
) {
  try {
    const res = await axios.get(
      `${BASE_URL}/getLastTracking?${optional(
        'tipo_busqueda',
        tipo_busqueda
      )}&codigo=${codigo}&codigo_client=${codigo_cliente}`
    );
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getMunicipalities(
  codciudad: number,
  remitente: string | null = null
) {
  try {
    const res = await axios.get(
      `${BASE_URL}/getMunicipios?codciudad=${codciudad}${optional(
        'remitente',
        remitente
      )}`
    );
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getParishes(
  codciudad: number,
  codmunicipio: number,
  remitente: string | null = null
) {
  try {
    const res = await axios.get(
      `${BASE_URL}/getParroquias?codciudad=${codciudad}&codmunicipio=${codmunicipio}&${optional(
        'remitente',
        remitente
      )}`
    );
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getOfficesGE(
  codigo_ciudad_destino: number,
  modalidad_tarifa: number | null = null,
  tipo_tarifa: number | null = null
) {
  try {
    const res = await axios.get(
      `${BASE_URL}/getOficinasGE?codigo_ciudad_destino=${codigo_ciudad_destino}&${optional(
        'modalidad_tarifa',
        modalidad_tarifa
      )}&${optional('tipo_tarifa', tipo_tarifa)}`
    );
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getStatus() {
  try {
    const res = await axios.get(`${BASE_URL}/getEstatus`);
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getCitiesOfi(
  codestado: string,
  recolecta: number | null = null
) {
  try {
    const res = await axios.get(
      `${BASE_URL}/getCiudadesOfi?codestado=${codestado}&${optional(
        'recolecta',
        recolecta
      )}`
    );
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getBranchOffices(codciudad: number) {
  try {
    const res = await axios.get(
      `${BASE_URL}/getSucursales?codciudad=${codciudad}`
    );
    return res;
  } catch (error) {
    return { error };
  }
}

export async function getDeliveryRouteType(
  codciudadori: number,
  codciudaddes: number
) {
  try {
    const res = await axios.get(
      `${BASE_URL}/getTipoRutaEnvio?codciudadori=${codciudadori}&codciudaddes=${codciudaddes}`
    );
    return res;
  } catch (error) {
    return { error };
  }
}
