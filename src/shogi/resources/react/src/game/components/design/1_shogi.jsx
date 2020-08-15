// React
import React from 'react';

// Bootstrap
import { Row, Col } from 'react-bootstrap';

// Design
import { Board } from './2_board.jsx';
import { Komadai } from './2_komadai.jsx';
import { UserInfo } from './2_user_info.jsx';

// Logic
import { ShogiLogic } from '../logic/shogi_logic.jsx';

// Definition
import { OWNER_PLAYER1, OWNER_PLAYER2 } from '../definition/owner_define.jsx';

export class Shogi extends React.Component {
    constructor() {
        super();

        this.shogiLogic = new ShogiLogic();

        this.state = {
            komas: this.shogiLogic.getBoard().getKomas(),
            owners: this.shogiLogic.getBoard().getOwners(),
            mochigomas_1: this.shogiLogic.getMochigomas(OWNER_PLAYER1),
            mochigomas_2: this.shogiLogic.getMochigomas(OWNER_PLAYER2),
            action_board: this.shogiLogic.getActionBoard(),
            teban: this.shogiLogic.getTeban(),
            turn: this.shogiLogic.getTurn()
        };

        this.handleGrabKoma = this.handleGrabKoma.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    handleGrabKoma(x, y) {
        this.shogiLogic.grabKoma(x, y);
        this.setState((state, props) => ({
            action_board: this.shogiLogic.getActionBoard()
        }));
    }

    handleAction(x, y) {
        this.shogiLogic.action(x, y);
        this.setState((state, props) => ({
            komas: this.shogiLogic.getBoard().getKomas(),
            owners: this.shogiLogic.getBoard().getOwners(),
            mochigomas_1: this.shogiLogic.getMochigomas(OWNER_PLAYER1),
            mochigomas_2: this.shogiLogic.getMochigomas(OWNER_PLAYER2),
            action_board: this.shogiLogic.getActionBoard(),
            teban: this.shogiLogic.getTeban(),
            turn: this.shogiLogic.getTurn()
        }));
    }

    render() {
        return (
            <Row>
                <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Komadai />
                    <UserInfo />
                </Col>
                <Col  xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Board
                        komas={this.state.komas}
                        owners={this.state.owners}
                        action_board={this.state.action_board}
                        handleGrabKoma={this.handleGrabKoma}
                        handleAction={this.handleAction}
                        teban={this.state.teban}
                    />
                </Col>
                <Col  xl={3} lg={3} md={3} sm={12} xs={12}>
                    <UserInfo />
                    <Komadai />
                </Col>
            </Row>
        );
    }
}