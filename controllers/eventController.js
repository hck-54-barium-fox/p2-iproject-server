class EventController {
    static async getAllTaxonomies(request, response) {
        try {
            const data = require('../db/taxonomies.json')
            const taxonomies = data.taxonomies.map((el) => {
                const obj = {
                    name: el.name,
                    slug: el.slug,
                    image: el.image
                }
                return obj
            })
            response.status(200).json(taxonomies)
        } catch (err) {
            response.status(500).json({
                message: "Internal server error"
            })
        }
    }
}

module.exports = EventController