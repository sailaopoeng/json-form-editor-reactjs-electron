import React from 'react';

export default function TableLeftCol({configKey, desc}){
    var descHtml = "";
    if(desc && desc.length > 0){
        descHtml = `( ${ desc } )`;
    }
    return(
        <td className="leftCol"> 
            <p className="fieldKey">{ configKey }</p>
            <p className="fieldDesc">{ descHtml }</p>
        </td>
    )
}