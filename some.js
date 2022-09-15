const { Zoom } = require('./dist');
const fs = require('fs');

async function main() {
  const zoom = new Zoom({ env: 'production', canguroAzulEndpoint: '', guiaElectronicaEndpoint: '', guiaElectronicaKey: '', guiaElectronicaPassword: '', guiaElectronicaUser: '' });

  const guiaElectronica = zoom.guiaElectronica;
  const canguroAzul = zoom.canguroAzul;

  // const data = await guiaElectronica.pdf({
  //   clientCode: '1',
  //   trackingCode: '1000196184',
  // });

  // fs.writeFileSync('base64', data.response);

  const data = await guiaElectronica.createShipment({
    serviceCode: 2,
    sender: {
      name: 'ADIDAS',
      contact: 'GUILLERMO A SOSA M',
      dniType: 'V',
      dni: '26123123',
      cityCode: 19,
      municipalityCode: '1507',
      parishCode: '150701',
      zipCode: '1060',
      phone: '0412-1231234',
      cellPhoneCode: '0412',
      cellPhoneNumber: '1231234',
      address: 'La Castellana, Avenida Calle',
      property: 'N/A',
    },
    recipient: {
      name: 'GUILLERMO ANDRÉS SOSA MENDOZA',
      contact: 'GUILLERMO ANDRÉS SOSA MENDOZA',
      dniType: 'V',
      dni: '26989156',
      cityCode: 19,
      municipalityCode: '1507',
      parishCode: '150701',
      zipCode: '1060',
      phone: '0412-1231234',
      cellPhoneCode: '0412',
      cellPhoneNumber: '1231234',
      address: 'La Castellana, Avenida Calle',
      property: 'N/A',
    },
    withdrawInOffice: false,
    cityCode: 19,
    municipalityCode: '1507',
    parishCode: '150701',
    zipCode: '1060',
    content: 'ROPA',
    refCode: '630fc8e0f051840fc974d2a9',
    pieces: 1,
    weight: 1.5,
    type: 'merchandise',
    modeChargeDestiny: '0',
    insurance: true,
    declaredValue: 100,
  });

  // const data = await zoom.guiaElectronica.clientServices({
  //   clientCode: '1',
  //   isReturn: false,
  // });

  // const data = await zoom.canguroAzul.officesByWithdraw({
  //   recipientCityCode: 46,
  // }); ;

  console.log(data);
}

main();
