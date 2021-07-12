import joi from 'joi';

const insertShirtSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    description: joi.string().required(),
    category_id: joi.number().required(),
    price: joi.string().required(),
    color: joi.string().required()
});

export {
    insertShirtSchema
}