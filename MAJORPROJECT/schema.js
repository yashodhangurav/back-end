//this file is used to validate the data sent from the client to the server using Joi library

const Joi = require('joi');

module.exports.listingSchema = Joi.object({ 
    listing : Joi.object({                            //listing is the name of the object in req.body
        title: Joi.string().required(),
        price: Joi.number().required().min(0),        //price should be a number and minimum value is 0
        description: Joi.string().required(),
        location: Joi.string().required(),
        country : Joi.string().required(),
        image : Joi.string().allow("", null)          //image is optional field so we are allowing empty string and null
    }).required()                                     //listing object is required
});


// review schema

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),   //rating should be a number and minimum value is 1 and maximum value is 5
        comment : Joi.string().required()
    }).required()
})