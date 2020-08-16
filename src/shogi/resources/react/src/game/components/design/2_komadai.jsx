import React from 'react';

import { Row, Col } from 'react-bootstrap';

import { KomadaiKoma } from './3_koma.jsx';

import { NoneLogic } from '../logic/koma_logic.jsx';
import { MochigomaLogic } from '../logic/mochigoma_logic.jsx';

import {
    KOMA_IDX_FU,
    KOMA_IDX_KYOSHA,
    KOMA_IDX_KEIMA,
    KOMA_IDX_GIN,
    KOMA_IDX_KIN,
    KOMA_IDX_KAKU,
    KOMA_IDX_HISHA
} from '../definition/koma_idx_define.jsx';

export class Komadai extends React.Component {
    constructor() {
        super();
    }

    renderKomadai() {
        return (
            <div>
                <Row class="komadai-row" noGutters>
                    {this.renderKoma(KOMA_IDX_HISHA)}
                    {this.renderKazu(KOMA_IDX_HISHA)}
                    {this.renderKoma(KOMA_IDX_KAKU)}
                    {this.renderKazu(KOMA_IDX_KAKU)}
                    {this.renderMargin()}
                </Row>
                <Row class="komadai-row" noGutters>
                    {this.renderKoma(KOMA_IDX_KIN)}
                    {this.renderKazu(KOMA_IDX_KIN)}
                    {this.renderKoma(KOMA_IDX_GIN)}
                    {this.renderKazu(KOMA_IDX_GIN)}
                    {this.renderMargin()}
                </Row>
                <Row class="komadai-row" noGutters>
                    {this.renderKoma(KOMA_IDX_KEIMA)}
                    {this.renderKazu(KOMA_IDX_KEIMA)}
                    {this.renderKoma(KOMA_IDX_KYOSHA)}
                    {this.renderKazu(KOMA_IDX_KYOSHA)}
                    {this.renderKoma(KOMA_IDX_FU)}
                    {this.renderKazu(KOMA_IDX_FU)}
                </Row>
            </div>
        );
    }

    renderKoma(koma_idx) {
        if (this.props.mochigoma.getKomakazu(koma_idx)) {
            return (
                <KomadaiKoma
                    koma={MochigomaLogic.getKoma(koma_idx)}
                    owner={this.props.owner}
                    handleGrabMochigoma={this.props.handleGrabMochigoma}
                />
            );
        }
        else {
            return (
                <KomadaiKoma
                    koma={new NoneLogic()}
                    owner={this.props.owner}
                    handleGrabMochigoma={null}
                />
            );
        }
    }

    renderKazu(koma_idx) {
        let komakazu = this.props.mochigoma.getKomakazu(koma_idx);
        if (komakazu > 0) {
            return (
                <Col className="komadai-moji-col" xl={1} lg={1} md={1} sm={3} xs={3}>
                    <div className="komadai-moji">
                        <p className="moji">{komakazu}</p>
                    </div>
                </Col>
            );
        }
        else {
            return (
                <Col className="komadai-moji-col" xl={1} lg={1} md={1} sm={3} xs={3}>
                    <div className="komadai-moji">
                        <p className="moji"></p>
                    </div>
                </Col>
            );
        }
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