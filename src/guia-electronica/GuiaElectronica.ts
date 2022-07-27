import Axios, { AxiosInstance } from 'axios';
// import { optional } from '../utils';

export type TGuiaElectronicaConfig = {
  endpoint: string;
};

type GeneratePDFGuideEWs = {
  codcliente: string;
  clave: string;
  codguia: string;
};

type CreateShipment = {
  login: number;
  clave: string;
  certificado: string;
  codservicio: number;
  consignacion: number;
  remitente: string;
  contacto_remitente: string;
  tiporifcirem: string;
  codciudadrem: number;
  codmunicipiorem: number;
  codparroquiarem: number;
  zona_postal_remitente: number;
  telefono_remitente: string;
  codcelurem: string;
  celularrem: string;
  direccion_remitente: string;
  inmueble_remitente: string;
  retira_oficina: string;
  codciudaddes: number;
  codmunicipiodes: number;
  codparroquiades: number;
  zona_postal_destino: number;
  estadodes: string;
  codoficinades: number;
  destinatario: string;
  contacto_destino: string;
  tiporifcidest: string;
  codceludest: string;
  celular: string;
  telefono_destino: string;
  direccion_destino: string;
  inmueble_destino: string;
  descripcion_contenido: string;
  referencia: string;
  numero_piezas: number;
  peso_bruto: number;
  tipo_envio: string;
  valor_declarado: number;
  seguro: number;
  valor_mercancia: number;
  modalidad_cod: number;
};

export class GuiaElectronica {
  private axios: AxiosInstance | null = null;

  constructor(config: TGuiaElectronicaConfig) {
    this.axios! = Axios.create({
      baseURL:
        config?.endpoint ??
        'http://sandbox.grupozoom.com/baaszoom/public/guiaelectronica',
    });
  }
  public async generatePdfGuideEWs({
    codcliente,
    clave,
    codguia,
  }: GeneratePDFGuideEWs) {
    try {
      const { data } = await this.axios!.get(
        `/generarPdfGuiaEWs?codcliente=${codcliente}&clave=${clave}&codguia=${codguia}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }

  public async createShipment({
    login,
    clave,
    certificado,
    codservicio,
    consignacion,
    remitente,
    contacto_remitente,
    tiporifcirem,
    codciudadrem,
    codmunicipiorem,
    codparroquiarem,
    zona_postal_remitente,
    telefono_remitente,
    codcelurem,
    celularrem,
    direccion_remitente,
    inmueble_remitente,
    retira_oficina,
    codciudaddes,
    codmunicipiodes,
    codparroquiades,
    zona_postal_destino,
    estadodes,
    codoficinades,
    destinatario,
    contacto_destino,
    tiporifcidest,
    codceludest,
    celular,
    telefono_destino,
    direccion_destino,
    inmueble_destino,
    descripcion_contenido,
    referencia,
    numero_piezas,
    peso_bruto,
    tipo_envio,
    valor_declarado,
    seguro,
    valor_mercancia,
    modalidad_cod,
  }: CreateShipment) {
    try {
      const { data } = await this.axios!.post(
        `/createShipment?login=${login}&clave=${clave}&certificado=${certificado}&codservicio=${codservicio}&consignacion=${consignacion}&remitente=${remitente}&contacto_remitente=${contacto_remitente}&tiporifcirem=${tiporifcirem}&codciudadrem=${codciudadrem}&codmunicipiorem=${codmunicipiorem}&codparroquiarem=${codparroquiarem}&zona_postal_remitente=${zona_postal_remitente}&telefono_remitente=${telefono_remitente}&codcelurem=${codcelurem}&celularrem=${celularrem}&direccion_remitente=${direccion_remitente}&inmueble_remitente=${inmueble_remitente}&retira_oficina=${retira_oficina}&codciudaddes=${codciudaddes}&codmunicipiodes=${codmunicipiodes}&codparroquiades=${codparroquiades}&zona_postal_destino=${zona_postal_destino}&estadodes=${estadodes}&codoficinades=${codoficinades}&destinatario=${destinatario}&contacto_destino=${contacto_destino}&tiporifcidest=${tiporifcidest}&codceludest=${codceludest}&celular=${celular}&telefono_destino=${telefono_destino}&direccion_destino=${direccion_destino}&inmueble_destino=${inmueble_destino}&descripcion_contenido=${descripcion_contenido}&referencia=${referencia}&numero_piezas=${numero_piezas}&peso_bruto=${peso_bruto}&tipo_envio=${tipo_envio}&valor_declarado=${valor_declarado}&seguro=${seguro}&valor_mercancia=${valor_mercancia}&modalidad_cod=${modalidad_cod}`
      );
      return data;
    } catch (error) {
      return { error };
    }
  }
}
