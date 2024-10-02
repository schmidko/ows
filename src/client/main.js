
import React from 'react';
import { createRoot } from 'react-dom/client';
import "./main.css";
import { LangProvider } from './hooks/localization'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element:
            <div className="app--root">
                <main className="app--content">
                    <Home />
                </main>
            </div>,
        errorElement: <div>not found</div>
    },
    {
        path: "de",
        element: <Home lang="de" />,
    },
]);

// pages
import Home from './pages/home/home';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <LangProvider>
                <RouterProvider router={router} />
            </LangProvider>
        </QueryClientProvider>

    );
}

const renderApp = () => {
    const root = createRoot(document.getElementById('container'));
    root.render(<App />);
};

renderApp();
