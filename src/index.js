
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import store from "./store";
import App from "./App.js";
import "./sass/global.scss";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff4400',
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            contrastText: '#ffcc00',
        },
    },
    typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true,
        fontSize: 50,
    }
});
/*
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root"),
);*/

const RootApp = () => (
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(<RootApp />, document.getElementById('root'));
