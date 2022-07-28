import { CanguroAzul } from './canguro-azul';
import { GuiaElectronica } from './guia-electronica';

export type TZoomConfig = {
  canguroAzulEndpoint: string;
  guiaElectronicaEndpoint: string;
  user: string;
  password: string;
};

export class Zoom {
  public canguroAzul: CanguroAzul;

  public guiaElectronica: GuiaElectronica;

  constructor(config: TZoomConfig) {
    this.canguroAzul = new CanguroAzul({
      endpoint: config.canguroAzulEndpoint,
      user: config.user,
      password: config.password,
    });
    this.guiaElectronica = new GuiaElectronica({
      endpoint: config.guiaElectronicaEndpoint,
    });
  }
}
