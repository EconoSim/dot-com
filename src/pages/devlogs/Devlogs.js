import React, { useState, useEffect } from 'react';
import './Devlogs.css';
import DevLogContainer from '../../components/DevLogContainer/DevLogContainer';

function Devlogs() {

    return (
        <div className="devlogs">
            <DevLogContainer
                project="EconoSim"
                repository="econosim.org"
            />
        </div>
    );
}

export default Devlogs;
