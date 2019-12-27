const slugify = require('../utils/slugify')

const getCategoryById = db => async (id) => {
    const category = await db('categories').select('*').where('id', id)
    return category
}

const getCategories = db => async () => {
    const categories = await db('categories').select('*')
    const categoriesWithSlug = categories.map( oldCategory => {
        const newCategory = {
            ...oldCategory, 
            slug: slugify(oldCategory.category)
        }
        return newCategory
    })
    return categoriesWithSlug
}

module.exports = {
    getCategoryById, getCategories
}