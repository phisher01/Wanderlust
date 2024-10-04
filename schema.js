const Joi=require("joi");
const listingSchema=Joi.object({
    Listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().min(0),
        image:Joi.string().allow("",null),
    }).required(),
});

const reviewSchema=Joi.object({
    Review:Joi.object({
        comment:Joi.string().required(),
        rating:Joi.number().required().min(1).max(5),
    }).required(),
});

module.exports={listingSchema,reviewSchema};