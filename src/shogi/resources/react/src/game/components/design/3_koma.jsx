import React from 'react';

import { Col } from 'react-bootstrap';

export class Koma extends React.Component {
    constructor() {
        super();
    }

    handleClick() {
        let komaoto = new Audio();
        komaoto.src = "/static/audio/komaoto5.wav";
        komaoto.play()
    }

    render() {
        return (
            <Col class-name="masu-col">
                <button className="masu">
                    <p className="koma">
                        <img
                            className="koma-img"
                            src="/static/img/koma_ichiji_touka.bmp"
                            style={{ top: "0px", left: "0px" }}
                            onClick={this.handleClick}
                        />
                    </p>
                </button>
            </Col>
        );
    }
}

export class KomadaiKoma extends React.Component {
    constructor() {
        super();
    }

    getKomaStyle() {
        return ({
            top: this.props.top + "px",
            left: this.props.left + "px"
        });
    }

    render() {
        return (
            <Col class-name="komadai-masu-col" xl={3} lg={3} md={3} sm={9} xs={9}>
                <button className="komadai-masu">
                    <p className="koma" style={{zoom: "1.0"}}>
                        <img
                            className="koma-img"
                            src="/static/img/koma_ichiji_touka.bmp"
                            style={this.getKomaStyle()} />
                    </p>
                </button>
            </Col>
        );
    }
}