import joi from 'joi';

const insertPantsSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    description: joi.string().required(),
    category_id: joi.number().required(),
    price: joi.string().required(),
});

export {
    insertPantsSchema
}