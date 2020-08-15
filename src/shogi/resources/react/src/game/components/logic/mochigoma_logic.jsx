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

    stock(koma_idx) {
        this.mochigomas[koma_idx] += 1;
        return true;
    }

    grab(koma_idx, board) {
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
                        return null;
                }
                return this.grabbed.put(board);
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }

    put(koma_idx) {
        if (this.mochigomas[koma_idx] > 0) {
            this.mochigomas[koma_idx] -= 1;
            return true;
        }
        else {
            return false;
        }
    }
}