const Database = require("../db/database")

class TicketStatus{
    id = null
    statusName = null
    
    constructor(data){
        Object.assign(this, data)
    }

    static async get(id){
        const database = new Database('ticket_status')
        const data = await database.selectById(id)

        if(data){
            return new this(data[0])
        }

        return null
    }

    static async findAll(){
        const database = new Database('ticket_status')
        const data = await database.select()

        if(data){
            const result = []

            data.forEach((row, index) => {
                result[index] = new this(row)
            })

            return result
        }

        return null
    }

    async save(){
        const database = new Database('ticket_status')

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

module.exports = TicketStatus