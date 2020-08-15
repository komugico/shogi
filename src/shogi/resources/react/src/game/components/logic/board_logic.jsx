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
    TokinLogin      as TK,
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
    
    capture(x, y) {
        return this.komas[y][x].captured();
    }

    getKomas() { return this.komas; }
    getOwners() { return this.owners; }
}