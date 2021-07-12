import joi from 'joi';

const insertCategorySchema = joi.object({
    name: joi.string().required()
});

export {
    insertCategorySchema
}