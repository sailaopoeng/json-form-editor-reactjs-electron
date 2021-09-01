import React, { useState } from 'react';
import FieldBool from './FieldBool';
import FieldString from './FieldString';

export default function JsonViewer( { filename, configJosn, schemeJson, backAction }) {
    const [filterText, setFilterText] = useState();

    var fieldCount = 0;
    function getField(d) {
        fieldCount++;
        if(d in configJosn){
            var valueX = configJosn[d];
            var schemeX = false;
            if(schemeJson && d in schemeJson){
                schemeX = schemeJson[d];

            }
            var canShow = true;
            if(filterText && filterText.length > 0){
                if(d.indexOf(filterText) >= 0){
                    canShow = true;
                }
                else{
                    canShow = false;
                }
            }

            if(canShow){
                var fieldType = "string";
                if(schemeX){
                    fieldType = schemeX.type;
                    
                }
                else{
                    fieldType = typeof(valueX);
                    console.log('type', fieldType, d);
                }

                if(fieldType === "number"){
                    return (
                        <FieldString key={fieldCount} idKey={fieldCount} configKey={d} configValue={valueX} desc={schemeX.description} choice={schemeX.choice} isNumber={fieldType} onChangeFn={e => oneFieldChange(d, e.target.value)} />
                    )
                }
                else if(fieldType === "bool" || fieldType === "boolean"){
                    return (
                        <FieldBool key={fieldCount} idKey={fieldCount} configKey={d} configValue={valueX} desc={schemeX.description}  onChangeFn={e => oneFieldChange(d, e.target.checked)} />
                    )
                }
                else{
                    //default string
                    return (
                        <FieldString key={fieldCount} idKey={fieldCount} configKey={d} configValue={valueX} desc={schemeX.description} choice={schemeX.choice} onChangeFn={e => oneFieldChange(d, e.target.value)} />
                    )
                }
            }
        }
    }

    function oneFieldChange(key, val){
        console.log(key, val);
        if(key in configJosn){
            configJosn[key] = val;
        }
    }

    function saveConfig(){
        const saveFile = async (blob) => {
            const a = document.createElement('a');
            a.download = 'kiosk_config.json';
            a.href = URL.createObjectURL(blob);
            a.addEventListener('click', (e) => {
                setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
            });
            a.click();
        };



        const obj = configJosn;
        const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });

        saveFile(blob);
    }

    var configKeys = Object.keys(configJosn);
    var backStr = "<< Back";
    return (
        <>
            <div className="headerRow">
                <button className="backBtn" onClick={backAction}>{backStr}</button>
                <input text="text" className="filterText" placeholder="input something to filter" onChange={e => setFilterText(e.target.value)}></input>
                <button className="saveBtn" onClick={saveConfig}>Save</button>
            </div>
            <div className="detailContent">
                <table className="detailTable">
                    <tbody>
                        {configKeys.map(d => getField(d))}
                    </tbody>
                </table>
            </div>
        </>
    )
}