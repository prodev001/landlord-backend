import models from '../models';

const insert = async() => {
  await models.Building.update({ 
          name: 'The Cardinal Groupxxxx',
          address: '(919) 357-7130',
          email: 'eddie@cardinalgroup.com',
          number_buildings: 15,
          landlord: 'Landlord',
  },{
    where: {
      address: '(919) 357-7130'
    }
  });
}  

  export default {
      insert
  }