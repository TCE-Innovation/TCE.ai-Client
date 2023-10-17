const tableId = 'tbllr82cbFWIZ15C5'; 
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'patlr5uHzCsVA5n44.60e06f59a3a49f3b492a501adf24fe2800073534a140500c2e28c9ff355dabef'}).base('appbZOyLaEfXejoBd');

//function to pull job title from Airtable based on name
export async function getJobTitle(name) { 
    try {
        //get all records from Airtable
        const records = await base(tableId).select().all();

        //loop through records and check name
        for (const record of records){
            if (record.fields.name === name) {
               return record.fields.title;
            }
        };
    } catch (error) {
        console.error(error);
    }
}

//function to pull job title from Airtable based on name
export async function getProjects(name) { 
    try {
        //get all records from Airtable
        const records = await base(tableId).select().all();

        //loop through records and check name
        for (const record of records){
            if (record.fields.name === name) {
               return record.fields.projects;
            }
        };
    } catch (error) {
        console.error(error);
    }
}