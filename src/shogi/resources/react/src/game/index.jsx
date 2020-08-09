import React from 'react';
import ReactDOM from 'react-dom';

class Index extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1> Shogi </h1>
            </div>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById("main")
);