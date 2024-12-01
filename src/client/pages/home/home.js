import React, {useEffect, useState} from "react";
import axios from 'axios';
import "./style.css";
import Result from "../../components/result";
import {CgDarkMode} from 'react-icons/cg';
import {MdLanguage} from 'react-icons/md';
import {useLang} from '../../hooks/localization';


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

                            let dateView = "never";
                            if (result.data.data.firstDelegation) {
                                dateView = new Date(output.data.firstDelegation).toLocaleDateString('en-GB');
                            }
                            result.data.data['dateView'] = dateView;
                            setOutput({"status": 1, "data": result.data.data});
                            
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

        <div className="w-full h-screen flex flex-col justify-between font-roboto">

            <div className="navbar bg-base-300 flex flex-row justify-between">
                <div className="flex flex-col items-start">
                    <div className="text-2xl ml-1 font-bold">OWS</div>
                    <div className="text-l ml-1">Open Wallet Score</div>
                </div>

                <div className="flex-none">
                    <button className="btn btn-square btn-ghost text-base-content" onClick={handleDarkMode}>
                        <CgDarkMode className="h-6 w-6" />
                    </button>
                </div>
            </div>

            <div className="w-full flex justify-center h-full">
                <div className="w-5/12 flex flex-col items-center mt-60">
                    <input
                        type="text"
                        placeholder="Insert stake address"
                        className="input input-bordered w-full text-xl"
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    {output.status === 1 &&
                        <>
                            <div className="hero mt-10 ">
                                <div className="hero-content rounded-lg flex-col lg:flex-row border-solid border-2 border-base-300">
                                    <div className="mb-5">
                                        <div className="text-2xl text-base-content">It looks like you are sending to wallet created on {new Date(output.data.firstTransaction).toLocaleDateString('en-GB')}. It holds {output.data.balanceAda} ADA and has transacted a total of {output.data.transactionCount} times.</div>
                                        <div className="text-xl mt-8">Wallet age: {new Date(output.data.firstTransaction).toLocaleDateString('en-GB')}</div>
                                        <div className="text-xl">Balance: {output.data.balanceAda}</div>
                                        <div className="text-xl">Staked since: {output.data.dateView}</div>
                                        <div className="text-xl ">Total transactions: {output.data.transactionCount}</div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="hero mt-10">
                                <div className="hero-content rounded-lg bg-base-200 flex-col lg:flex-row shadow-md">
                                    <div>
                                        Blance Age Score: {output.data.scores.balanceScore} <br />
                                        Delegation Age Score: {output.data.scores.delegationAgeScore} <br />
                                        Wallet Age Score: {output.data.scores.walletAgeScore} <br />
                                        Policy Count Score: {output.data.scores.policyCountScore} <br />
                                        Transaction Score: {output.data.scores.txScore}
                                    </div>
                                </div>
                            </div> */}
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


            <footer className="footer footer-center bg-base-300 text-base-content p-4">
                <aside>
                    <p>OpenWalletScore.com</p>
                </aside>
            </footer>
        </div>
    );
}
