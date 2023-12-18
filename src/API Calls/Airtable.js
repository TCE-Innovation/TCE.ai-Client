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

//function to send private form data to airtable base
export async function sendPrivateFormData(name, email, description) {
    const tableId = 'tblJhpvPlMY1OeqLD';
    const baseId = 'appSnS8FJjZqfnBSv'
    var base = new Airtable({apiKey: 'patlr5uHzCsVA5n44.60e06f59a3a49f3b492a501adf24fe2800073534a140500c2e28c9ff355dabef'}).base(baseId);
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

//function to send public form data to airtable base
export async function sendPublicFormData(name, email, organization, phone, contactMessage) {
    const tableId = 'tblKDT1lKLBlP1oTa';
    const baseId = 'appA98lgpoCkM03ZU'
    var base = new Airtable({apiKey: 'patlr5uHzCsVA5n44.60e06f59a3a49f3b492a501adf24fe2800073534a140500c2e28c9ff355dabef'}).base(baseId);
    try {
        //create record in Airtable
        await base(tableId).create([
            {
                "fields": {
                    "Name": name,
                    "Email": email,
                    "Outside Organization": organization,
                    "Contact Phone Number": phone,
                    "Contact Description": contactMessage
                }
            }
        ]);
    } catch (error) {
        console.error(error);
    }
}

//INCOMPLETE
//function to send asset form data to airtable base
export async function sendAssetFormData(name, email, item, project, reason, dateNeeded, dateReturn) {
    const tableId = 'tbluSgQoYoS7rTbKg';
    const baseId = 'apphQBuS3DFnPYMFm'
    var base = new Airtable({apiKey: 'patlr5uHzCsVA5n44.60e06f59a3a49f3b492a501adf24fe2800073534a140500c2e28c9ff355dabef'}).base(baseId);
    try {
        //create record in Airtable
        await base(tableId).create([
            {
                "fields": {
                    "Item Needed": item,
                    "Reason": reason,
                    "Project": project,
                    "Name": name,
                    "Date Needed": dateNeeded,
                    "Return Date": dateReturn,
                    "Email Address": email,
                }
            }
        ]);
    } catch (error) {
        console.error(error);
    }
}

//INCOMPLETE
//function to update the amount of times someone has accessed a feature
export async function updateAccessCount(name, feature) {
    const tableId = '';
    const baseId = ''
    var base = new Airtable({apiKey: 'patlr5uHzCsVA5n44.60e06f59a3a49f3b492a501adf24fe2800073534a140500c2e28c9ff355dabef'}).base(baseId);
    try {
        //get all records from Airtable
        const records = await base(tableId).select().all();

        //loop through records and check name
        for (const record of records){
            if (record.fields.name === name) {
                //update record
                base(tableId).update([
                    {
                        "id": record.fields.id,
                        "fields": {
                            "Feature": feature,
                            "Access Count": record.fields.accessCount + 1
                        }
                    }
                ]);
            }
        };
    } catch (error) {
        console.error(error);
    }
}

