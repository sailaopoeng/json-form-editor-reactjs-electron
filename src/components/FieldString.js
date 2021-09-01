import React from 'react';
import TableLeftCol from './TableLeftCol';

export default function FieldString( { idKey, configKey, configValue, desc, choice, isNumber, onChangeFn }) {
    function getSelectOption(d) {
        return (
            <option key={d} value={d} >{d}</option>
        )
    }

    
    if(choice && choice.length > 0){

        var choiceArray = choice.split("|");
        if(choiceArray.length > 0){
            return(
                <tr key={idKey}>
                    <TableLeftCol configKey={configKey} desc={desc} />
                    <td className="rightCol"> 
                        <select className="fieldValueText" name={ configKey } defaultValue={ configValue } onChange={ onChangeFn } >
                            { choiceArray.map(d => getSelectOption(d)) }
                        </select> 
                    </td>
                </tr>
            )
        }
    }
    else{
        if(configValue && configValue.length >= 35){
            const wrap = (s, w) => s.replace(
                new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n'
            );
            var afterWrap = wrap(configValue, 35);
            var wrapArray = afterWrap.split("\n");
            var wrapCount = wrapArray.length;
            
            var extraClass = "extraHeight extraHeight" + wrapCount;
            return (
                <tr key={idKey} className={extraClass}>
                    <TableLeftCol configKey={configKey} desc={desc} />
                    <td className="rightCol"> 
                        <textarea className="fieldValueText" rows={wrapCount} cols="35" defaultValue={ configValue } onChange={ onChangeFn }></textarea> 
                    </td>
                </tr>
            )
        }
        else{
            var fieldType = "text";
            if(isNumber === "number"){
                fieldType = "number";
            }
            

            return (
                <tr key={idKey}>
                    <TableLeftCol configKey={configKey} desc={desc} />
                    <td className="rightCol"> 
                        <input className="fieldValueText" type={fieldType} defaultValue={ configValue } onChange={ onChangeFn }></input> 
                    </td>
                </tr>
            )
        }
    }
}