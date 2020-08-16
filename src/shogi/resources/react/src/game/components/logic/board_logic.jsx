import {
    NoneLogic       as NN,
    FuLogic         as FU,
    KyoshaLogic     as KY,
    KeimaLogic      as KE,
    GinLogic        as GN,
    KinLogic        as KN,
    KakuLogic       as KK,
    HishaLogic      as HS,
    OuLogic         as OU,
    GyokuLogic      as GK,
    TokinLogic      as TK,
    NarikyoLogic    as NY,
    NarikeiLogic    as NE,
    NariginLogic    as NG,
    UmaLogic        as UM,
    RyuLogic        as RY
} from './koma_logic.jsx';

import {
    OWNER_NONE      as O_N,
    OWNER_PLAYER1   as O_1,
    OWNER_PLAYER2   as O_2
} from '../definition/owner_define.jsx';

import {
    KOMA_IDX_NONE,
    KOMA_IDX_FU,
    KOMA_IDX_KYOSHA,
    KOMA_IDX_KEIMA,
    KOMA_IDX_GIN,
    KOMA_IDX_KIN,
    KOMA_IDX_KAKU,
    KOMA_IDX_HISHA,
    KOMA_IDX_OU,
    KOMA_IDX_GYOKU,
    KOMA_IDX_TOKIN,
    KOMA_IDX_NARIKYO,
    KOMA_IDX_NARIKEI,
    KOMA_IDX_NARIGIN,
    KOMA_IDX_UMA,
    KOMA_IDX_RYU
} from '../definition/koma_idx_define.jsx';

export class BoardLogic {
    constructor() {
        this.komas = null;
        this.owners = null;
        this.movables = null;
        this.putables = null;
        this.init_board();
    }

    init_board() {
        this.komas = [
            [new KY(), new KE(), new GN(), new KN(), new OU(), new KN(), new GN(), new KE(), new KY()],
            [new NN(), new HS(), new NN(), new NN(), new NN(), new NN(), new NN(), new KK(), new NN()],
            [new FU(), new FU(), new FU(), new FU(), new FU(), new FU(), new FU(), new FU(), new FU()],
            [new NN(), new NN(), new NN(), new NN(), new NN(), new NN(), new NN(), new NN(), new NN()],
            [new NN(), new NN(), new NN(), new NN(), new NN(), new NN(), new NN(), new NN(), new NN()],
            [new NN(), new NN(), new NN(), new NN(), new NN(), new NN(), new NN(), new NN(), new NN()],
            [new FU(), new FU(), new FU(), new FU(), new FU(), new FU(), new FU(), new FU(), new FU()],
            [new NN(), new KK(), new NN(), new NN(), new NN(), new NN(), new NN(), new HS(), new NN()],
            [new KY(), new KE(), new GN(), new KN(), new GK(), new KN(), new GN(), new KE(), new KY()]
        ];
        this.owners = [
            [O_2, O_2, O_2, O_2, O_2, O_2, O_2, O_2, O_2],
            [O_N, O_2, O_N, O_N, O_N, O_N, O_N, O_2, O_N],
            [O_2, O_2, O_2, O_2, O_2, O_2, O_2, O_2, O_2],
            [O_N, O_N, O_N, O_N, O_N, O_N, O_N, O_N, O_N],
            [O_N, O_N, O_N, O_N, O_N, O_N, O_N, O_N, O_N],
            [O_N, O_N, O_N, O_N, O_N, O_N, O_N, O_N, O_N],
            [O_1, O_1, O_1, O_1, O_1, O_1, O_1, O_1, O_1],
            [O_N, O_1, O_N, O_N, O_N, O_N, O_N, O_1, O_N],
            [O_1, O_1, O_1, O_1, O_1, O_1, O_1, O_1, O_1]
        ];
    }

    grab(player, x, y) {
        return this.komas[y][x].move(this.owners, player, x, y);
    }

    canMove(player, from_x, from_y, to_x, to_y) {
        if (this.owners[from_y][from_x] == player) {
            if (this.owners[to_y][to_x] != player) {
                // 移動元の駒：自駒
                // 移動先の駒：相手駒or空きマス
                // TODO: 移動による詰みのチェック（自殺禁止ルール）<============
                return true;
            }
            else {
                // 移動先の駒が自駒である
                return false;
            }
        }
        else {
            // 移動元の駒が自駒でない
            return false;
        }
    }

    existsEnemy(player, x, y) {
        if (this.owners[y][x] == (player * (-1))) {
            // 敵駒がある場合
            return true;
        }
        else {
            // 敵駒がない場合
            return false;
        }
    }

    move(player, from_x, from_y, to_x, to_y) {
        let koma_copy = this.komas[from_y][from_x].clone();
        this.komas[from_y][from_x] = new NN();
        this.owners[from_y][from_x] = O_N;
        this.komas[to_y][to_x] = koma_copy;
        this.owners[to_y][to_x] = player;
    }

    promoteCheck(player, from_x, from_y, to_x, to_y) {
        let koma_copy = this.komas[to_y][to_x];
        if (koma_copy.promoted()) {
            switch (player) {
                case O_1:
                    if (from_y <= 2 || to_y <= 2) {
                        let needPromote = false;
                        switch (koma_copy.koma_idx) {
                            case KOMA_IDX_FU:
                            case KOMA_IDX_KYOSHA:
                                if (to_y <= 0) {
                                    needPromote = true;
                                }
                                break;
                            case KOMA_IDX_KEIMA:
                                if (to_y <= 1) {
                                    needPromote = true;
                                }
                                break;
                            default:
                                break;
                        }
                        if (needPromote) {
                            this.komas[to_y][to_x] = koma_copy.promoted();
                            return true;
                        }
                        else {
                            let ans = confirm("成りますか？");
                            if (ans) {
                                this.komas[to_y][to_x] = koma_copy.promoted();
                                return true;
                            }
                        }
                    }
                    break;
                case O_2:
                    if (from_y >= 6 || to_y >= 6) {
                        let needPromote = false;
                        switch (koma_copy.koma_idx) {
                            case KOMA_IDX_FU:
                            case KOMA_IDX_KYOSHA:
                                if (to_y >= 8) {
                                    needPromote = true;
                                }
                                break;
                            case KOMA_IDX_KEIMA:
                                if (to_y >= 7) {
                                    needPromote = true;
                                }
                                break;
                            default:
                                break;
                        }
                        if (needPromote) {
                            this.komas[to_y][to_x] = koma_copy.promoted();
                            return true;
                        }
                        else {
                            let ans = confirm("成りますか？");
                            if (ans) {
                                this.komas[to_y][to_x] = koma_copy.promoted();
                                return true;
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        return false;
    }
    
    capture(x, y) {
        return this.komas[y][x].captured();
    }

    putKoma(koma, owner, x, y) {
        this.komas[y][x] = koma;
        this.owners[y][x] = owner;
        return true;
    }

    getKomas() { return this.komas; }
    getOwners() { return this.owners; }
}