
import React, {useContext, useState} from 'react';
import de from '../../../localization/de.json';
import en from '../../../localization/en.json';

const LangContext = React.createContext()

export const LangProvider = ({children}) => {
    const [lang, setLang] = useState('en');

    let t = en;
    if (lang === 'de') {
        t = de;
    }

    return (
        <LangContext.Provider value={{lang, t, update: setLang}}>
            {children}
        </LangContext.Provider>
    )
}

export const useLang = () => {
    const {lang, t, update} = useContext(LangContext)
    return {lang, t, update}
}

export const html = (name) => {
    const {lang, t, update} = useContext(LangContext);
    return <div dangerouslySetInnerHTML={{__html: t[name]}} />;
}
