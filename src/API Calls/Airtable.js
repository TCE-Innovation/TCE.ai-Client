//function to pull all person ids in AirTable
async function getAllPersonIds() { 
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base(process.env.AIRTABLE_BASE_KEY);
    
    var personIds = [];

    try {
        //get all records from Airtable
        const records = await base(tableId).select().all();

        //loop through records and add the id to the array
        records.forEach(function(record) {
            personIds.push(record.fields.id);
        });
        return personIds;
    } catch (error) {
        console.error(error);
    }
}