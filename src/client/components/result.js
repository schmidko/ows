import React, {useEffect, useState} from "react";
import {format, toDate} from 'date-fns';
import {de, enUS, eo} from 'date-fns/locale';
import {useLang} from '../hooks/localization';


export default function Result(props) {

    if (props.input === '') {
        return null;
    }

    const {lang, t, update} = useLang();
    const [result, setResult] = useState();

    useEffect(() => {
        let langConfig = enUS;
        if (lang === 'de') {
            langConfig = de;
        }
        const date = format(new Date(parseInt(props.input) * 1000), 'PPP', {locale: langConfig})
        setResult(date);

    }, [props.input, lang]);


    return (

        <div className="w-full flex justify-center ">

            <div className="stats text-primary-content bg-gradient-to-r from-primary to-secondary">

                <div className="stat">
                    <div className="stat-title">{t.result}</div>
                    <div className="stat-value">{result}</div>
                    
                </div>

                
            </div>
        </div>
    );
}
