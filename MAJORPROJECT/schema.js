const Joi = require('joi');
module.exports.listingSchema = Joi.object({ 
    listing : Joi.object({ //listing is the name of the object in req.body
        title: Joi.string().required(),
        price: Joi.number().required().min(0),//price should be a number and minimum value is 0
        description: Joi.string().required(),
        location: Joi.string().required(),
        image : Joi.string().allow("", null)//image is optional field so we are allowing empty string and null
    }).required()
})