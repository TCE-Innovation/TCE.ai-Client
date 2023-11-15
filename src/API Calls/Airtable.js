var Airtable = require('airtable');

//function to pull job title from Airtable based on name
export async function getJobTitle(name) { 
    const tableId = 'tbllr82cbFWIZ15C5'; 
    var base = new Airtable({apiKey: 'patlr5uHzCsVA5n44.60e06f59a3a49f3b492a501adf24fe2800073534a140500c2e28c9ff355dabef'}).base('appbZOyLaEfXejoBd');
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
    const tableId = 'tbllr82cbFWIZ15C5'; 
    var base = new Airtable({apiKey: 'patlr5uHzCsVA5n44.60e06f59a3a49f3b492a501adf24fe2800073534a140500c2e28c9ff355dabef'}).base('appbZOyLaEfXejoBd');
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

//function to send form data to airtable base
export async function sendFormData(name, email, description) {
    const tableId = 'tblJhpvPlMY1OeqLD';
    var base = new Airtable({apiKey: 'patlr5uHzCsVA5n44.60e06f59a3a49f3b492a501adf24fe2800073534a140500c2e28c9ff355dabef'}).base('appSnS8FJjZqfnBSv');
    try {
        //create record in Airtable
        await base(tableId).create([
            {
                "fields": {
                    "Name": name,
                    "Email": email,
                    "Description": description
                }
            }
        ]);
    } catch (error) {
        console.error(error);
    }
}