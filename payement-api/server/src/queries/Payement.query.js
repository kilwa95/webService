const Payement = require('../models/Payement');


exports.savePayement = async (data) => {
    try {
        const {tranasction_id,products,customer} = data;
        const payement = await Payement.create({ tranasction_id,products,customer});
        return payement;
    } catch (error) {
        console.error(error);
    }
}
