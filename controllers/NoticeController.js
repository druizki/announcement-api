const Notice = require('../models').Notice;

module.exports = {
    list : async() => {
        const notices = await Notice.findAll({
            order: [['id', 'DESC']],
            raw: true
        });
        return notices;
    }
}