import React, {useEffect, useState} from "react";
import axios from 'axios';
import "./style.css";
import Result from "../../components/result";
import {CgDarkMode} from 'react-icons/cg';
import {MdLanguage} from 'react-icons/md';
import {RiTwitterXFill} from 'react-icons/ri';
import {useLang} from '../../hooks/localization';
import {Timeline, Follow} from 'react-twitter-widgets'


export default function Home(props) {

    const {lang, t, update} = useLang();
    const [address, setAddress] = useState('');
    const [output, setOutput] = useState({"status": 0});

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
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            if (address.length === 59 || address.length === 103) {
                try {
                    let result = await axios.get('/ows?address=' + address, {timeout: 5000});
                    if (result.data?.status === 1) {
                        if (result.data?.data?.scores?.openWalletScore) {
                            setOutput({"status": 1, "data": result.data.data});
                            console.log(result.data.data);
                        } else {
                            setOutput({"status": 9});  
                        }
                    }
                } catch {
                    console.log('Error when calling /ows endpoint!');
                }
            } else {
                setOutput({"status": 9});
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
                    {output.status === 1 &&
                        <>
                            <div className="hero mt-10">
                                <div className="hero-content rounded-lg bg-base-200 flex-col lg:flex-row shadow-md">
                                    <div>
                                        <h1 className="text-2xl"> Open Wallet Score: {output.data.scores.openWalletScore}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="hero mt-10">
                                <div className="hero-content rounded-lg bg-base-200 flex-col lg:flex-row shadow-md">
                                    <div>
                                        Blance Age Score: {output.data.scores.balanceScore} <br />
                                        Delegation Age Score: {output.data.scores.delegationAgeScore} <br />
                                        Wallet Age Score: {output.data.scores.walletAgeScore} <br />
                                        Policy Count Score: {output.data.scores.policyCountScore} <br />
                                        Transaction Score: {output.data.scores.txScore}
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {output.status === 9 &&
                        <div className="hero mt-10">
                            <div className="hero-content rounded-lg bg-base-200 flex-col lg:flex-row shadow-md">
                                <div>
                                    <h1 className="text-2xl"> No data found!</h1>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>


            <footer className="footer p-10 bg-base-300  mt-10">
                <aside>
                    <div className="flex flex-row">
                    </div>
                </aside>

                <nav>
                    <header className="footer-title"></header>
                    
                </nav>
                <nav>
                    <header className="footer-title"></header>
                    

                </nav>

            </footer>
        </div>
    );
}
