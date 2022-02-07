const Database = require("../db/database")

class Ticket{
    id = null
    personId = null
    ticketTypeId = null
    dateCreated = null
    description = null
    title = null
    open = null
    important = null

    constructor(data){
        Object.assign(this, data)
    }

    static async get(id){
        const database = new Database('ticket')
        const data = await database.selectById(id)

        if(data){
            return new this(data[0])
        }

        return null
    }

    static async findAll(){
        const database = new Database('ticket')
        const data = await database.select()
        const result = []

        if(data){
            data.forEach((row, index) => {
                result[index] = new this(row)
            })
        }

        return result
    }

    async save(){
        const database = new Database('ticket')

        const fields = Object.keys(this).slice(1)
        const values = Object.values(this).slice(1)

        if(this.id){
            const result = await database.selectById(this.id)

            if(result){
                return await database.update(this.id, fields, values)
            }
        }

        return await database.insert(fields, values)
    }


}

module.exports = Ticket