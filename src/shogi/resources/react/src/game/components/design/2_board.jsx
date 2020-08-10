import React from 'react';

import { Row, Col } from 'react-bootstrap';

import { Koma } from './3_koma.jsx';

export class Board extends React.Component {
    constructor() {
        super();
    }

    renderBoard() {
        let board = this.props.komas.map((row, y) =>
            <Row className="board-row" noGutters>
                {this.renderMarginLeft()}
                {row.map((koma, x) => this.renderKoma(x, y, koma))}
                {this.renderMarginRight(y)}
            </Row>
        );
        return board;
    }

    renderKoma(x, y, koma) {
        return (
            <Koma />
        )
    }

    renderMarginTop() {
        let suji = null;
        if (this.props.teban == 0) {
            // 先手番
            suji = ["９", "８", "７", "６", "５", "４", "３", "２", "１"];
        }
        else {
            // 後手番
            suji = ["１", "２", "３", "４", "５", "６", "７", "８", "９"];
        }
        let marginTop = suji.map((s) => 
            <Col className="margin-col-top-bottom"><div className="text-center margin-top-bottom">{s}</div></Col>
        );
        return (
            <Row noGutters>
                <Col className="margin-col-top-bottom"><div className="float-right margin-corner"></div></Col>
                {marginTop}
                <Col className="margin-col-top-bottom"><div className="float-left margin-corner"></div></Col>
            </Row>
        );
    }

    renderMarginBottom() {
        let marginBottom = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => 
            <Col className="margin-col-top-bottom"><div className="text-center margin-top-bottom"></div></Col>
        );
        return (
            <Row noGutters>
                <Col className="margin-col-top-bottom"><div className="float-right margin-corner"></div></Col>
                {marginBottom}
                <Col className="margin-col-top-bottom"><div className="float-left margin-corner"></div></Col>
            </Row>
        );
    }

    renderMarginLeft() {
        return (
            <Col><div className="float-right margin-left-right"></div></Col>
        );
    }

    renderMarginRight(y) {
        let dan = null;
        if (this.props.teban == 0) {
            // 先手番
            dan = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
        }
        else {
            // 後手番
            dan = ["九", "八", "七", "六", "五", "四", "三", "二", "一"];
        }
        return (
            <Col className="margin-col-left-right">
                <div className="float-left margin-left-right"></div>
                <p className="margin-dan">{dan[y]}</p>
            </Col>
        );
    }

    render() {
        return (
            <div className="shogi-board">
                {this.renderMarginTop()}
                {this.renderBoard()}
                {this.renderMarginBottom()}
            </div>
        );
    }
}