const { Zoom } = require('./dist');
const fs = require('fs');

async function main() {
  const zoom = new Zoom({ env: 'development' });

  const guiaElectronica = zoom.guiaElectronica;
  const canguroAzul = zoom.canguroAzul;

  const data = await guiaElectronica.pdf({
    clientCode: '1',
    trackingCode: '1000196184',
  });

  fs.writeFileSync('base64', data.response);

  // const data = await guiaElectronica.createShipment({
  //   serviceCode: 1,
  //   sender: {
  //     name: 'JOSE QUEVEDO',
  //     contact: 'JOSE QUEVEDO',
  //     dniType: 'V',
  //     dni: '27014788',
  //     cityCode: 19,
  //     municipalityCode: '1519',
  //     parishCode: '151901',
  //     zipCode: '1073',
  //     phone: '0212-8712180',
  //     cellPhoneCode: '0412',
  //     cellPhoneNumber: '1331439',
  //     address: 'EDIF. PROTECT AND GAMBLER',
  //     property: 'EDIFICIO',
  //   },
  //   recipient: {
  //     name: 'MARCOS QUEVEDO',
  //     contact: 'MARCOS QUEVEDO',
  //     dniType: 'V',
  //     dni: '7098551',
  //     cityCode: 17,
  //     municipalityCode: '2023',
  //     parishCode: '202301',
  //     zipCode: '5001',
  //     phone: '0241-8712180',
  //     cellPhoneCode: '0412',
  //     cellPhoneNumber: '1331439',
  //     address: 'EDIF. PROTECT AND GAMBLER',
  //     property: 'EDIFICIO',
  //   },
  //   withdrawInOffice: true,
  //   officeCode: 117,
  //   cityCode: 17,
  //   municipalityCode: '2023',
  //   parishCode: '202301',
  //   zipCode: '5001',
  //   content: 'ROPA',
  //   refCode: 'abcd1234',
  //   pieces: 3,
  //   weight: 1,
  //   type: 'merchandise',
  //   modeChargeDestiny: String(1),
  //   insurance: true,
  //   declaredValue: 100,
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
