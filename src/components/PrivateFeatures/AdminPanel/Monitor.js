import React from 'react';

const Monitor = () => {
   
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
           <iframe 
                class="airtable-embed" 
                title="Monitor"
                src="https://airtable.com/embed/appfF7QtyV8ahG0OT/shraLazZw6W12QaG4?backgroundColor=pinkDusty&viewControls=on" 
                frameborder="0" 
                onmousewheel="" 
                width="100%" 
                height="533" 
                style={{background: 'transparent', border: '1px solid #ccc'}}
            ></iframe>
        </div>
    );
};

export default Monitor;
