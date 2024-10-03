import React, {useEffect, useState} from "react";
import "./style.css";
import Result from "../../components/result";
import {CgDarkMode} from 'react-icons/cg';
import {MdLanguage} from 'react-icons/md';
import {RiTwitterXFill} from 'react-icons/ri';
import {useLang} from '../../hooks/localization';
import {Timeline, Follow} from 'react-twitter-widgets'
import axios from 'axios';

export default function Home(props) {

    const {lang, t, update} = useLang();
    const [address, setAddress] = useState('');
    const [output, setOutput] = useState(null);

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

    const handleInputChange = (event) => {
        setAddress(event.target.value);
        console.log(event.target.value);
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            if (address.length === 59) {
                let result = await axios.get('/ows?address=' + address);
                setOutput(result.data.data);
                console.log(result.data.data);
            } else {
                setOutput(null);
                console.log('No valid address found!!');
            }
        }
    }

    return (

        <div className="w-full flex flex-col h-screen justify-between">

            <div className="navbar bg-base-300">
                <div className="flex-1">
                    <div className=" text-2xl ml-1 font-bold">Open Wallet Score</div>
                </div>

                <div className="flex-none">
                    <button className="btn btn-square btn-ghost" onClick={handleDarkMode}>
                        <CgDarkMode className="h-6 w-6" />
                    </button>
                </div>
            </div>


            <div className="w-full flex justify-center h-full">
                <div className="w-6/12 flex flex-col items-center mt-60">
                    <input
                        type="text"
                        placeholder="Insert stake address"
                        className="input input-bordered w-full"
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    {output &&
                        <div className="hero mt-10">
                            <div className="hero-content rounded-lg bg-base-200 flex-col lg:flex-row shadow-md">
                                <div>
                                    <h1 className="text-2xl"> Open Wallet Score: {output.scores.openWalletScore}</h1>
                                </div>
                            </div>
                        </div>
                    }
                    {output &&
                        <div className="hero mt-10">
                            <div className="hero-content rounded-lg bg-base-200 flex-col lg:flex-row shadow-md">
                                <div>
                                    Blance Age Score: {output.scores.balanceScore} <br />
                                    Delegation Age Score: {output.scores.delegationAgeScore} <br />
                                    Wallet Age Score: {output.scores.walletAgeScore} <br />
                                    Policy Count Score: {output.scores.policyCountScore} <br />
                                    Transaction Score: {output.scores.txScore}
                                </div>
                            </div>
                        </div>
                    }
                </div>
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