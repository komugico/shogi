import React from 'react';

import { Col } from 'react-bootstrap';

import {
    OWNER_NONE      as O_N,
    OWNER_PLAYER1   as O_1,
    OWNER_PLAYER2   as O_2
} from '../definition/owner_define.jsx';

export class Koma extends React.Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.action == false) {
            this.props.handleGrabKoma(this.props.x, this.props.y);
        }
        else {
            let komaoto = new Audio();
            komaoto.src = "/static/audio/komaoto5.wav";
            komaoto.play();
            this.props.handleAction(this.props.x, this.props.y);
        }
    }

    render() {
        return (
            <Col class-name="masu-col">
                <button className={this.props.action == true ? "masu masu-action" : "masu"} onClick={this.handleClick}>
                    <p className="koma">
                        <img
                            className="koma-img"
                            src="/static/img/koma_ichiji_touka.bmp"
                            style={this.props.koma.get_css_style(this.props.owner)}
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

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.handleGrabMochigoma) {
            this.props.handleGrabMochigoma(this.props.owner, this.props.koma.koma_idx);
        }
    }

    render() {
        return (
            <Col class-name="komadai-masu-col" xl={3} lg={3} md={3} sm={9} xs={9}>
                <button className="komadai-masu" onClick={this.handleClick}>
                    <p className="koma" style={{zoom: "1.0"}}>
                        <img
                            className="koma-img"
                            src="/static/img/koma_ichiji_touka.bmp"
                            style={this.props.koma.get_css_style(O_1)}
                        />
                    </p>
                </button>
            </Col>
        );
    }
}