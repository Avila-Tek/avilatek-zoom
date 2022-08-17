export interface IChargeOnDestinyMode {
  code: string;
  description: string;
}

export interface IZoomServiceType {
  codservicio: number;
  nombre: string;
  codfamilia: number;
}

export interface IServiceType {
  code: number;
  name: string;
  familyCode: number;
}

type TShipmentCODInsuranceOffice = {};

type TShipmentCODNoInsuranceOffice = {};

type TPrepaidShipment = {
  consignment: boolean;
};

type TShipmentPerson = {
  name: string;
  contact: string;
  dniType: 'J' | 'E' | 'G' | 'P' | 'V';
  dni: string;
  cityCode: number;
  municipalityCode: string;
  parishCode: string;
  zipCode: string;
  phone: string;
  cellPhoneCode: '0412' | '0416' | '0426' | '0414' | '0424';
  cellPhoneNumber: string;
  address: string;
  property: string;
};

type TWithdrawInOffice =
  | { withdrawInOffice: true; officeCode: number }
  | { withdrawInOffice: false };

type TInsurance =
  | { type: 'merchandise'; insurance: boolean }
  | { type: 'document' };

type TLocker = {
  code: string;
  acronym: string;
};

export type TCreateShipment = {
  serviceCode: number;
  consignment?: boolean;
  sender: TShipmentPerson;
  recipient: TShipmentPerson;
  withdrawInOffice: boolean;
  cityCode: number;
  municipalityCode: string;
  parishCode: string;
  zipCode: string;
  content: string;
  refCode: string;
  pieces: number;
  weight: number;
  type: 'document' | 'merchandise';
  declaredValue: number;
  modeChargeDestiny?: string;
  locker?: TLocker;
} & TWithdrawInOffice &
  TInsurance;
