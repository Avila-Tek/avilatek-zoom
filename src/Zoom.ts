import { CanguroAzul } from './canguro-azul';
import { GuiaElectronica } from './guia-electronica';

export type TZoomConfig = {
  canguroAzulEndpoint: string;
  guiaElectronicaEndpoint: string;
};

export class Zoom {
  public canguroAzul: CanguroAzul;
  public guiaElectronica: GuiaElectronica;

  constructor(config: TZoomConfig) {
    this.canguroAzul = new CanguroAzul({
      endpoint: config.canguroAzulEndpoint,
    });
    this.guiaElectronica = new GuiaElectronica({
      endpoint: config.guiaElectronicaEndpoint,
    });
  }
}
