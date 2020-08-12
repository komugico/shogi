import React from 'react';

import { Row, Col } from 'react-bootstrap';

import { KomadaiKoma } from './3_koma.jsx';

export class Komadai extends React.Component {
    constructor() {
        super();
    }

    renderKomadai() {
        return (
            <div>
                <Row class="komadai-row" noGutters>
                    {this.renderKoma(0, -43)}
                    {this.renderKomakazu(0)}
                    {this.renderKoma(0, -86)}
                    {this.renderKomakazu(0)}
                    {this.renderMargin()}
                </Row>
                <Row class="komadai-row" noGutters>
                    {this.renderKoma(0, -129)}
                    {this.renderKomakazu(0)}
                    {this.renderKoma(0, -172)}
                    {this.renderKomakazu(0)}
                    {this.renderMargin()}
                </Row>
                <Row class="komadai-row" noGutters>
                    {this.renderKoma(0, -215)}
                    {this.renderKomakazu(0)}
                    {this.renderKoma(0, -258)}
                    {this.renderKomakazu(0)}
                    {this.renderKoma(0, -301)}
                    {this.renderKomakazu(0)}
                </Row>
            </div>
        );
    }

    renderKoma(top, left) {
        return (
            <KomadaiKoma
                top={top}
                left={left}
            />
        )
    }

    renderKomakazu(x) {
        return (
            <Col className="komadai-moji-col" xl={1} lg={1} md={1} sm={3} xs={3}>
                <div className="komadai-moji">
                    <p className="moji">{x}</p>
                </div>
            </Col>
        );
    }

    renderMargin() {
        return (
            <Col className="margin-komadai-col" xl={4} lg={4} md={4} sm={12} xs={12}></Col>
        )
    }

    render() {
        return (
            <div className="shogi-komadai">
                {this.renderKomadai()}
            </div>
        );
    }
}