import React from 'react';
import TableLeftCol from './TableLeftCol';

export default function FieldBool( { idKey, configKey, configValue, desc, onChangeFn }) {
    
    return (
        <tr key={idKey}>
            <TableLeftCol configKey={configKey} desc={desc} />
            <td className="rightCol">
                <input className="fieldValueCheckBox" type="checkbox" defaultValue={configValue} defaultChecked={configValue} onChange={ onChangeFn }></input>
            </td>
        </tr>
    )
}