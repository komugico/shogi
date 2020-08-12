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
                    <Col xl={2} lg={2} md={2} sm={12} xs={12}>
                        <KifuMenu />
                    </Col>
                    <Col xl={10} lg={10} md={10} sm={12} xs={12}>
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