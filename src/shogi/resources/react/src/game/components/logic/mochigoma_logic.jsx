import {
    FuLogic,
    KyoshaLogic,
    KeimaLogic,
    GinLogic,
    KinLogic,
    KakuLogic,
    HishaLogic
} from './koma_logic.jsx';

import {
    KOMA_IDX_FU,
    KOMA_IDX_KYOSHA,
    KOMA_IDX_KEIMA,
    KOMA_IDX_GIN,
    KOMA_IDX_KIN,
    KOMA_IDX_KAKU,
    KOMA_IDX_HISHA
} from '../definition/koma_idx_define.jsx';

export class MochigomaLogic {
    constructor(owner) {
        this.owner = owner;
        this.mochigomas = new Array(7).fill(0);
        this.grabbed = null;
    }
    
    static getKoma(koma_idx) {
        switch (koma_idx) {
            case KOMA_IDX_FU:
                return new FuLogic();
            case KOMA_IDX_KYOSHA:
                return new KyoshaLogic();
            case KOMA_IDX_KEIMA:
                return new KeimaLogic();
            case KOMA_IDX_GIN:
                return new GinLogic();
            case KOMA_IDX_KIN:
                return new KinLogic();
            case KOMA_IDX_KAKU:
                return new KakuLogic();
            case KOMA_IDX_HISHA:
                return new HishaLogic();
            default:
                return null;
        }
    }

    getKomakazu(koma_idx) {
        return this.mochigomas[koma_idx];
    }

    stock(koma_idx) {
        this.mochigomas[koma_idx] += 1;
        return true;
    }

    grab(koma_idx, owners, player) {
        if (koma_idx >= KOMA_IDX_FU && koma_idx <= KOMA_IDX_HISHA) {
            if (this.mochigomas[koma_idx] > 0) {
                switch (koma_idx) {
                    case KOMA_IDX_FU:
                        this.grabbed = new FuLogic();
                        break;
                    case KOMA_IDX_KYOSHA:
                        this.grabbed = new KyoshaLogic();
                        break;
                    case KOMA_IDX_KEIMA:
                        this.grabbed = new KeimaLogic();
                        break;
                    case KOMA_IDX_GIN:
                        this.grabbed = new GinLogic();
                        break;
                    case KOMA_IDX_KIN:
                        this.grabbed = new KinLogic();
                        break;
                    case KOMA_IDX_KAKU:
                        this.grabbed = new KakuLogic();
                        break;
                    case KOMA_IDX_HISHA:
                        this.grabbed = new HishaLogic();
                        break;
                    default:
                        this.grabbed = null;
                        return null;
                }
                return this.grabbed.put(owners, player);
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }

    pickGrabbedKoma() {
        if (this.grabbed) {
            if (this.mochigomas[this.grabbed.koma_idx] > 0) {
                this.mochigomas[this.grabbed.koma_idx] -= 1;
                let koma = this.grabbed.clone();
                this.grabbed = null;
                return koma;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
}