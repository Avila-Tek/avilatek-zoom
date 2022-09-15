import Axios, { AxiosInstance } from 'axios';
import { buildApiResponse } from './ApiResponseBuilder';
import {
  GuiaElectronicaConfig,
  IChargeOnDestinyMode,
  IServiceType,
  IZoomServiceType,
  TCreateShipment,
  ZoomResponse,
} from './types';

export class GuiaElectronica {
  private axios: AxiosInstance;
  private user: string;
  private password: string;
  private certificate: string;
  private privateKey: string;

  constructor(config: GuiaElectronicaConfig) {
    this.axios = Axios.create({
      baseURL: config.endpoint,
    });
    this.user = config.user;
    this.password = config.password;
    this.certificate = '';
    this.privateKey = config.privateKey;
  }

  private async token() {
    const search = new URLSearchParams({
      login: this.user,
      clave: this.password,
    });
    const { data } = await this.axios.post<ZoomResponse<{ token: string }[]>>(
      `/generarToken?${search.toString()}`
    );
    return buildApiResponse<{ token: string }[], string>(
      data,
      values => values[0].token
    );
  }

  private async cert() {
    const { response } = await this.token();
    const search = new URLSearchParams({
      login: this.user,
      password: this.password,
      token: response,
      frase_privada: this.privateKey,
    });
    const { data } = await this.axios.post<
      ZoomResponse<{ certificado: string }[]>
    >(`/zoomCert?${search.toString()}`);
    this.certificate = data.entidadRespuesta[0].certificado;
    return buildApiResponse<{ certificado: string }[], string>(
      data,
      values => values[0].certificado
    );
  }

  public async modesChargeOnDestiny() {
    const { data } = await this.axios.get<ZoomResponse<Record<string, string>>>(
      `/getModalidadCod`
    );
    return buildApiResponse<Record<string, string>, IChargeOnDestinyMode[]>(
      data,
      values =>
        Object.keys(values).map(key => ({
          code: key,
          description: values[key],
        }))
    );
  }

  public async clientServices({
    clientCode,
    isReturn,
  }: {
    clientCode: string;
    isReturn: boolean;
  }) {
    if (typeof clientCode === 'undefined' || typeof clientCode !== 'string') {
      throw new TypeError(
        `The param _clientCode_ is required and must be a string`
      );
    }
    if (typeof isReturn === 'undefined' || typeof isReturn !== 'boolean') {
      throw new TypeError(
        `The param isReturn is required and must be a boolean`
      );
    }
    const search = new URLSearchParams({
      codigo_cliente: clientCode,
      clave_acceso: this.password,
      devolucion: isReturn ? '1' : '0',
    });
    const { data } = await this.axios.get<ZoomResponse<IZoomServiceType[]>>(
      `/getServiciosCliente?${search.toString()}`
    );
    return buildApiResponse<IZoomServiceType[], IServiceType[]>(data, values =>
      values.map(value => ({
        code: value.codservicio,
        name: value.nombre,
        familyCode: value.codfamilia,
      }))
    );
  }

  public async createShipment(params: TCreateShipment) {
    // TODO validate
    const { response: cert } = await this.cert();
    const search = new URLSearchParams({
      //! auth
      login: this.user,
      clave: this.password,
      certificado: cert,
      //! servicio
      codservicio: String(params.serviceCode),
      consignacion: String(params.consignment ? 1 : 0),
      //! remitente
      remitente: String(params.sender.name),
      contacto_remitente: String(params.sender.contact),
      tiporifcirem: `${params.sender.dniType}-`,
      cirifrem: params.sender.dni,
      codciudadrem: String(params.sender.cityCode),
      codmunicipiorem: String(params.sender.municipalityCode),
      codparroquiarem: String(params.sender.parishCode),
      zona_postal_remitente: String(params.sender.zipCode),
      telefono_remitente: String(params.sender.phone),
      codcelurem: String(params.sender.cellPhoneCode),
      celularrem: String(params.sender.cellPhoneNumber),
      direccion_remitente: String(params.sender.address),
      inmueble_remitente: String(params.sender.property),
      //! destino
      retira_oficina: String(params.withdrawInOffice ? '1' : '0'),
      codciudaddes: String(params.cityCode),
      codmunicipiodes: String(params.municipalityCode),
      codparroquiades: String(params.parishCode),
      zona_postal_destino: String(params.zipCode),
      ...(params.withdrawInOffice
        ? { codoficinades: String(params.officeCode) }
        : {}),
      //! destinatario
      destinatario: String(params.recipient.name),
      contacto_destino: String(params.recipient.contact),
      tiporifcidest: `${String(params.recipient.dniType)}-`,
      cirif_destinatario: String(params.recipient.dni),
      codceludest: String(params.recipient.cellPhoneCode),
      celular: String(params.recipient.cellPhoneNumber),
      telefono_destino: String(params.recipient.phone),
      direccion_destino: String(params.recipient.address),
      inmueble_destino: String(params.recipient.property),
      //! detalles
      descripcion_contenido: String(params.content),
      referencia: String(params.refCode),
      numero_piezas: String(params.pieces),
      peso_bruto: String(params.weight),
      tipo_envio: params.type === 'merchandise' ? 'M' : 'D',
      ...(params.type === 'merchandise'
        ? { valor_declarado: String(params.declaredValue) }
        : {}),
      ...(params.type === 'merchandise'
        ? { seguro: params.insurance ? '1' : '0' }
        : {}),
      ...(params.type === 'merchandise'
        ? { valor_mercancia: String(0) } // FIXME
        : {}),
      ...(params.modeChargeDestiny
        ? { modalidad_cod: String(params.modeChargeDestiny) }
        : {}),
      ...(params.locker
        ? { codigo_casillero: String(params.locker.code) }
        : {}),
      ...(params.locker
        ? { siglas_casillero: String(params.locker.acronym) }
        : {}),
    });
    const { data } = await this.axios.post<ZoomResponse<{ numguia: string }[]>>(
      `/createShipment?${search.toString()}`
    );
    return buildApiResponse<{ numguia: string }[], string>(
      data,
      values => values?.[0]?.numguia ?? null
    );
  }

  public async pdf({
    clientCode,
    trackingCode,
  }: {
    clientCode: string;
    trackingCode: string;
  }) {
    // TODO: Validate
    const search = new URLSearchParams({
      codcliente: String(clientCode),
      clave: this.password,
      codguia: String(trackingCode),
    });
    const { data } = await this.axios.get<ZoomResponse<{ guiaPDF: string }>>(
      `/generarPdfGuiaEWs?${search.toString()}`
    );
    return buildApiResponse<{ guiaPDF: string }, string>(
      data,
      values => values.guiaPDF
    );
  }
}
