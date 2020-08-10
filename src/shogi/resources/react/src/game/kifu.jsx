import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

import { Shogi } from './components/design/1_shogi.jsx';
import { KifuMenu } from './components/design/kifu/1_menu.jsx';

class Kifu extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Container fluid>
                <br />
                <Row>
                    <Col xl={3} lg={3} md={3} sm={12} xs={12}>
                        <KifuMenu />
                    </Col>
                    <Col xl={9} lg={9} md={9} sm={12} xs={12}>
                        <Shogi />
                    </Col>
                </Row>
            </Container>
        );
    }
}

ReactDOM.render(
    <Kifu />,
    document.getElementById("main")
);