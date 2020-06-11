import React from "react";

import SvgIcon from '@material-ui/core/SvgIcon';

export default function PlusIcon(props) {
    return (
        <SvgIcon { ...props }>
            <path d="M19,13H5V11H19V13Z"/>
        </SvgIcon>
    );
}


