class EventController {
    static async getAllTaxonomies(request, response) {
        try {
            const data = require('../db/taxonomies.json')
            let taxonomies = []
            let sportTaxonomies = data.taxonomies.filter((el) => {
                return el.parent_id === 1000000
            }).slice(0,5)
            let musicTaxonomies = data.taxonomies.filter((el) => {
                return el.parent_id === 2000000
            })
            
            sportTaxonomies.forEach((el) => {
                taxonomies.push(el)
            })

            musicTaxonomies.forEach((el) => {
                taxonomies.push(el)
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