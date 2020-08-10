import React from 'react';

import { Row, Col } from 'react-bootstrap';

import { Board } from './2_board.jsx';
import { Komadai } from './2_komadai.jsx';
import { UserInfo } from './2_user_info.jsx';

export class Shogi extends React.Component {
    constructor() {
        super();

        this.state = {
            komas: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            teban: 0,
        }
    }

    render() {
        return (
            <Row>
                <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                    <Komadai />
                    <UserInfo />
                </Col>
                <Col  xl={8} lg={8} md={8} sm={12} xs={12}>
                    <Board
                        komas={this.state.komas}
                        teban={this.state.teban}
                    />
                </Col>
                <Col  xl={2} lg={2} md={2} sm={12} xs={12}>
                    <UserInfo />
                    <Komadai />
                </Col>
            </Row>
        );
    }
}