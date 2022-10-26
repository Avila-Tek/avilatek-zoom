const { Zoom } = require('./dist');
const fs = require('fs');

async function main() {
  // const zoom = new Zoom({
  //   canguroAzulEndpoint:
  //     'https://webservices.zoom.red/baaszoom/public/canguroazul/',
  //   guiaElectronicaEndpoint:
  //     'https://webservices.zoom.red/baaszoom/public/guiaelectronica/',
  //   guiaElectronicaKey: 'vVxBkWrLEnS90Tsh2jOF',
  //   guiaElectronicaPassword: 'Zas123456',
  //   guiaElectronicaUser: '449762',
  // });

  const zoom = new Zoom({ env: 'development' });


  const guiaElectronica = zoom.guiaElectronica;
  const canguroAzul = zoom.canguroAzul;

  const data = await canguroAzul.calculateShippingRate({
        type: 'charge-to-destination',
        recipientCityCode: 19,
        merchandiseValue: 200,
        mode: 'delivery',
        senderCityCode: 19,
        pieces: 1,
        weight: 1,
        declaredValue: 200,
  });

  // console.log(data);

  // const data = await guiaElectronica.pdf({
  //   clientCode: '449762',
  //   trackingCode: '1543684804',
  // });

  // fs.writeFileSync('base64', data.response);

  // const data = await guiaElectronica.createShipment({
  //   serviceCode: 104,
  //   sender: {
  //     name: 'ADIDAS',
  //     contact: 'GUILLERMO A SOSA M',
  //     dniType: 'V',
  //     dni: '26123123',
  //     cityCode: 19,
  //     municipalityCode: '1507',
  //     parishCode: '150701',
  //     zipCode: '1060',
  //     phone: '0412-1231234',
  //     cellPhoneCode: '0412',
  //     cellPhoneNumber: '1231234',
  //     address: 'La Castellana, Avenida Calle',
  //     property: 'N/A',
  //   },
  //   recipient: {
  //     name: 'GUILLERMO ANDRÉS SOSA MENDOZA',
  //     contact: 'GUILLERMO ANDRÉS SOSA MENDOZA',
  //     dniType: 'V',
  //     dni: '26989156',
  //     cityCode: 19,
  //     municipalityCode: '1507',
  //     parishCode: '150701',
  //     zipCode: '1060',
  //     phone: '0412-1231234',
  //     cellPhoneCode: '0412',
  //     cellPhoneNumber: '1231234',
  //     address: 'La Castellana, Avenida Calle',
  //     property: 'N/A',
  //   },
  //   withdrawInOffice: false,
  //   cityCode: 19,
  //   municipalityCode: '1507',
  //   parishCode: '150701',
  //   zipCode: '1060',
  //   content: 'ROPA',
  //   refCode: '630fc8e0f051840fc974d2a9',
  //   pieces: 1,
  //   weight: 1.5,
  //   type: 'merchandise',
  //   // modeChargeDestiny: '0',
  //   insurance: true,
  //   declaredValue: 100,
  //   consignment: true,
  // });

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
