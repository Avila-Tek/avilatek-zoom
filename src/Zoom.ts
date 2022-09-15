import { CanguroAzul } from './CanguroAzul';
import { GuiaElectronica } from './GuiaElectronica';
import { Config, ZoomConfig } from './types/config';

export class Zoom {
  public canguroAzul: CanguroAzul;
  public guiaElectronica: GuiaElectronica;

  constructor(config: ZoomConfig) {
    const settings: Config = {
      canguroAzulEndpoint: '',
      guiaElectronicaEndpoint: '',
      guiaElectronicaUser: '',
      guiaElectronicaPassword: '',
      guiaElectronicaKey: '',
    };
    if ('env' in config) {
      if (config.env === 'development') {
        settings.canguroAzulEndpoint =
          'http://sandbox.grupozoom.com/baaszoom/public/canguroazul';
        settings.guiaElectronicaEndpoint =
          'http://sandbox.grupozoom.com/baaszoom/public/guiaelectronica';
        settings.guiaElectronicaUser = '1';
        settings.guiaElectronicaPassword = '456789';
        settings.guiaElectronicaKey = 'RH0sVTL9za7O6gutqI43';
      }
    } else {
      settings.canguroAzulEndpoint = config.canguroAzulEndpoint;
      settings.guiaElectronicaEndpoint = config.guiaElectronicaEndpoint;
      settings.guiaElectronicaUser = config.guiaElectronicaUser;
      settings.guiaElectronicaPassword = config.guiaElectronicaPassword;
      settings.guiaElectronicaKey = config.guiaElectronicaKey;
    }
    this.canguroAzul = new CanguroAzul({
      endpoint: settings.canguroAzulEndpoint,
    });
    this.guiaElectronica = new GuiaElectronica({
      endpoint: settings.guiaElectronicaEndpoint,
      user: settings.guiaElectronicaUser,
      password: settings.guiaElectronicaPassword,
      privateKey: settings.guiaElectronicaKey,
    });
  }
}
