import React from "react";

import SvgIcon from '@material-ui/core/SvgIcon';   //from material ui, makes a text a component icon

export default function LocationEndIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M11,5V3H13V5H11Z" />

        </SvgIcon>
    );
}



