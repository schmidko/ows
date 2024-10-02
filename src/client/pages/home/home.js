import React, { useEffect, useState } from "react";
import "./style.css";
import Result from "../../components/result";
import { CgDarkMode } from 'react-icons/cg';
import { MdLanguage } from 'react-icons/md';
import { RiTwitterXFill } from 'react-icons/ri';
import { useLang } from '../../hooks/localization';
import { Timeline, Follow } from 'react-twitter-widgets'


export default function Home(props) {

    const { lang, t, update } = useLang();

    useEffect(() => {
        let storedTheme = localStorage.getItem("theme");
        if (!storedTheme) {
            storedTheme = 'light';
        }
        document.documentElement.setAttribute("data-theme", storedTheme);

        if (props.lang !== lang) {
            update(props.lang);
        }
    }, []);

    function handleLang(lang) {
        update(lang);
    }

    function handleDarkMode(e) {
        e.preventDefault();

        let storedTheme = localStorage.getItem("theme");

        if (storedTheme === 'dark') {
            storedTheme = 'light';
        } else {
            storedTheme = 'dark';
        }

        document.documentElement.setAttribute("data-theme", storedTheme);
        localStorage.setItem("theme", storedTheme);
    }

    return (

        <div className="w-full flex flex-col h-screen justify-between">

            <div className="navbar bg-base-300">
                <div className="flex-1">
                    <div className="text-primary text-2xl ml-1 font-bold">Open Wallet Score</div>
                    
                </div>
                <div className="dropdown dropdown-end">

                    <button tabIndex={0} className="btn btn-square btn-ghost m-1">
                        <MdLanguage className="h-6 w-6" />
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-30">
                        <li onClick={() => handleLang('en')}><a className={lang === 'en' ? 'bg-primary text-primary-content' : ''}>English</a></li>
                        <li className="mt-1" onClick={() => handleLang('de')}><a className={lang === 'de' ? 'bg-primary text-primary-content' : ''}>German</a></li>
                    </ul>
                </div>
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost" onClick={handleDarkMode}>
                        <CgDarkMode className="h-6 w-6" />
                    </button>
                </div>
            </div>


            <div className="w-full flex justify-center mt-6">
                <div className="w-11/12 flex flex-col items-center">
                    <div className="hero ">
                        <div className="hero-content w-full rounded-lg bg-base-200 flex-col lg:flex-row shadow-md">
                            moo
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-16">
            
            </div>

            <footer className="footer p-10 bg-base-300  mt-10">
                <aside>
                    <div className="flex flex-row">
                        <p>Open Wallet Score<br />...</p>
                    </div>
                </aside>
                
                <nav>
                    <header className="footer-title">center</header>
                    moo
                </nav>
                <nav>
                    <header className="footer-title">right</header>
                    moo
                   
                </nav>

            </footer>
        </div>
    );
}
