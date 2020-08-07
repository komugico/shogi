import React from 'react';
import ReactDOM from 'react-dom';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1> Shogi </h1>
                <h1> Hello, React!! </h1>
            </div>
        );
    }
}

ReactDOM.render(
    <Home />,
    document.getElementById("home")
);