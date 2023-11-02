//REACT
import React from 'react';

const Press = () => {
    return (
        <div className='container'>
            <br />
            <div className="header">PRESS</div>
                <br />
                <br />
                <div className="cards-container">
                    <div className="press-card">
                        <div className="card-body">
                            <a href='https://www.youtube.com/watch?v=cbV4s_CxpE0' className="link-text" target="_blank" rel="noopener noreferrer">How Tech Expands Jobsite Access for Construction Projects</a>
                        </div>
                    </div>

                    <div className="press-card">
                        <div className="card-body">
                            <a href='https://www.openspace.ai/resources/webinars/fireside-chat-how-tces-transit-projects-arrive-on-time-with-openspace/' className="link-text" target="_blank" rel="noopener noreferrer">Fireside Chat: How TCE’s Transit Projects Arrive On Time with OpenSpace</a>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Press;