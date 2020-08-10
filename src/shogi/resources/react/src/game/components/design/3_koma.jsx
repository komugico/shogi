import React from 'react';

import { Col } from 'react-bootstrap';

export class Koma extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Col class-name="masu-col">
                <button className="masu">
                    <p className="koma"><img className="koma-img" src="/static/img/koma_ichiji.bmp" /></p>
                </button>
            </Col>
        );
    }
}