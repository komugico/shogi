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

class KomaLogic {
    constructor(koma_idx, short_name, long_name, top, left) {
        this.koma_idx = koma_idx;
        this.short_name = short_name;
        this.long_name = long_name;
        this.top = top;
        this.left = left;
    }

    // Getter
    get koma_idx() { return this._koma_idx; }
    get short_name() { return this._short_name; }
    get long_name() { return this._long_name; }

    // Setter
    set koma_idx(koma_idx) { this._koma_idx = koma_idx; }
    set short_name(short_name) { this._short_name = short_name; }
    set long_name(long_name) { this._long_name = long_name; }

    get_css_style(owner) {
        if (owner == O_2) {
            // 相手駒の場合反対向きで表示
            return {
                top: (this.top - 144) + "px",
                left: this.left + "px"
            };
        }
        else {
            // 自駒の場合通常の向きで表示
            return {
                top: this.top + "px",
                left: this.left + "px"
            };
        }
    }

    basic_move(board, player, x, y, directions) {
        // Private Method
        // 隣接箇所への移動（桂馬のジャンプも可能）
        
        // 1. 移動可能場所の格納配列作成
        let movable_board = new Array(9);
        for (let idx = 0; idx < 9; idx++) {
            movable_board[idx] = new Array(9).fill(false);
        }
        // 2. 所有情報の確認（駒の所有者でなければ移動不可）
        if (board[y][x] == player) {
            // 3. 移動可能場所の判定
            for (let direction of directions) {
                let px = x + (direction[0] * player);
                let py = y + (direction[1] * player);
                if (px >= 0 && px < 9 && py >= 0 && py < 9) {
                    if (board[py][px] != player) {
                        movable_board[py][px] = true;
                    }
                }
                else {
                    // 範囲外ならスキップ
                    continue;
                }
            }
        }
        // 4. 移動可能場所の返却
        return movable_board;
    }

    continuous_move(board, player, x, y, directions) {
        // Private Method
        // 連続的な移動

        // 1. 移動可能場所の格納配列作成
        let movable_board = new Array(9);
        for (let idx = 0; idx < 9; idx++) {
            movable_board[idx] = new Array(9).fill(false);
        }
        // 2. 所有情報の確認（駒の所有者でなければ移動不可）
        if (board[y][x] == player) {
            // 3. 移動可能場所の判定
            for (let direction of directions) {
                let px = x;
                let py = y;
                while (true) {
                    px = px + (direction[0] * player);
                    py = py + (direction[1] * player);
                    if (px >= 0 && px < 9 && py >= 0 && py < 9) {
                        if (board[py][px] == player) {
                            // 自駒ならbreak
                            break;
                        }
                        else {
                            if (board[py][px] == O_N) {
                                // 空きならtrue
                                movable_board[py][px] = true;
                            }
                            else {
                                // 相手駒なら移動可にした上でbreak
                                movable_board[py][px] = true;
                                break;
                            }
                        }
                    }
                    else {
                        // 範囲外ならbreak
                        break;
                    }
                }
            }
        }
        // 4. 移動可能場所の返却
        return movable_board;
    }

    basic_put(board) {
        // Private Method.
        // 通常の駒置き動作
    }

    clone() {
        // Abstract Method.
        throw new Error("Implementation error. You have to implement the method < clone >");
    }

    captured() {
        // Abstract Method.
        throw new Error("Implementation error. You have to implement the method < captured >");
    }

    promoted() {
        // Abstract Method
        throw new Error("Implementation error. You have to implement the method < promoted >");
    }

    move(board, player, x, y) {
        // Abstract Method.
        throw new Error("Implementation error. You have to implement the method < move >");
    }

    put(board) {
        // Abstract Method.
        throw new Error("Implementation error. You have to implement the method < put >");
    }
}

export class NoneLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_NONE, "-", "-", -48, -129);
    }

    clone() { return new NoneLogic(); }
    captured() { return null; }
    promoted() { return null; }

    move(board, player, x, y) {
        // すべてfalseで返却
        let movable_board = new Array(9);
        for (let idx = 0; idx < 9; idx++) {
            movable_board[idx] = new Array(9).fill(false);
        }
        return movable_board;
    }

    put(board) {
        
    }
}

export class FuLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_FU, "歩", "歩兵", 0, -301);
    }

    clone() { return new FuLogic(); }
    captured() { return new FuLogic(); }
    promoted() { return new TokinLogic(); }

    move(board, player, x, y) {
        let movable_board = super.basic_move(board, player, x, y,
            [
                [0, -1]
            ]
        );
        return movable_board;
    }

    put(board) {

    }
}

export class KyoshaLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_KYOSHA, "香", "香車", 0, -258);
    }

    clone() { return new KyoshaLogic(); }
    captured() { return new KyoshaLogic(); }
    promoted() { return new NarikyoLogic(); }

    move(board, player, x, y) {
        let movable_board = super.continuous_move(board, player, x, y,
            [
                [0, -1]
            ]
        );
        return movable_board;
    }

    put(board) {

    }
}

export class KeimaLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_KEIMA, "桂", "桂馬", 0, -215);
    }

    clone() { return new KeimaLogic(); }
    captured() { return new KeimaLogic(); }
    promoted() { return new NarikeiLogic(); }

    move(board, player, x, y) {
        let movable_board = super.basic_move(board, player, x, y,
            [
                [-1, -2],
                [1, -2]
            ]
        );
        return movable_board;
    }

    put(board) {

    }
}

export class GinLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_GIN, "銀", "銀将", 0, -172);
    }

    clone() { return new GinLogic(); }
    captured() { return new GinLogic(); }
    promoted() { return new NariginLogic(); }

    move(board, player, x, y) {
        let movable_board = super.basic_move(board, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 1],
                [1, 1]
            ]
        );
        return movable_board;
    }

    put(board) {

    }
}

export class KinLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_KIN, "金", "金将", 0, -129);
    }

    clone() { return new KinLogic(); }
    captured() { return new KinLogic(); }
    promoted() { return null; }

    move(board, player, x, y) {
        let movable_board = super.basic_move(board, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        return movable_board;
    }

    put(board) {

    }
}

export class KakuLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_KAKU, "角", "角行", 0, -86);
    }
    
    clone() { return new KakuLogic(); }
    captured() { return new KakuLogic(); }
    promoted() { return new UmaLogic(); }

    move(board, player, x, y) {
        let movable_board = super.continuous_move(board, player, x, y,
            [
                [-1, -1],
                [1, -1],
                [-1, 1],
                [1, 1]
            ]
        );
        return movable_board;
    }

    put(board) {

    }
}

export class HishaLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_HISHA, "飛", "飛車", 0, -43);
    }
    
    clone() { return new HishaLogic(); }
    captured() { return new HishaLogic(); }
    promoted() { return new RyuLogic(); }

    move(board, player, x, y) {
        let movable_board = super.continuous_move(board, player, x, y,
            [
                [0, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        return movable_board;
    }

    put(board) {

    }
}

export class OuLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_OU, "王", "王将", 0, 0);
    }
    
    clone() { return new OuLogic(); }
    captured() { return new OuLogic(); }
    promoted() { return null; }

    move(board, player, x, y) {
        let movable_board = super.basic_move(board, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [-1, 1],
                [0, 1],
                [1, 1]
            ]
        );
        return movable_board;
    }

    put(board) {

    }
}

export class GyokuLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_GYOKU, "玉", "玉将", -48, 0);
    }
    
    clone() { return new GyokuLogic(); }
    captured() { return new GyokuLogic(); }
    promoted() { return null; }

    move(board, player, x, y) {
        let movable_board = super.basic_move(board, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [-1, 1],
                [0, 1],
                [1, 1]
            ]
        );
        return movable_board;
    }

    put(board) {

    }
}

export class TokinLogin extends KomaLogic {
    constructor() {
        super(KOMA_IDX_TOKIN, "と", "と金", -48, -301);
    }
    
    clone() { return new TokinLogic(); }
    captured() { return new FuLogic(); }
    promoted() { return null; }

    move(board, player, x, y) {
        let movable_board = super.basic_move(board, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        return movable_board;
    }

    put(board) {
        
    }
}

export class NarikyoLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_NARIKYO, "杏", "成香", -48, -258);
    }

    clone() { return new NarikyoLogic(); }
    captured() { return new KyoshaLogic(); }
    promoted() { return null; }

    move(board, player, x, y) {
        let movable_board = super.basic_move(board, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        return movable_board;
    }

    put(board) {
        
    }
}

export class NarikeiLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_NARIKEI, "圭", "成桂", -48, -215);
    }

    clone() { return new NarikeiLogic(); }
    captured() { return new KeimaLogic(); }
    promoted() { return null; }

    move(board, player, x, y) {
        let movable_board = super.basic_move(board, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        return movable_board;
    }

    put(board) {

    }
}

export class NariginLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_NARIGIN, "全", "成銀", -48, -172);
    }
    
    clone() { return new NariginLogic(); }
    captured() { return new GinLogic(); }
    promoted() { return null; }

    move(board, player, x, y) {
        let movable_board = super.basic_move(board, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        return movable_board;
    }

    put(board) {

    }
}

export class UmaLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_UMA, "馬", "龍馬", 0, -86);
    }

    clone() { return new UmaLogic(); }
    captured() { return new KakuLogic(); }
    promoted() { return null; }

    move(board, player, x, y) {
        let movable_board = new Array(9);
        for (let idx = 0; idx < 9; idx++) {
            movable_board[idx] = new Array(9).fill(false);
        }
        let movable_board_1 = super.continuous_move(board, player, x, y,
            [
                [-1, -1],
                [1, -1],
                [-1, 1],
                [1, 1]
            ]
        );
        let movable_board_2 = super.basic_move(board, player, x, y,
            [
                [0, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                movable_board[y][x] = movable_board_1[y][x] || movable_board_2[y][x];
            }
        }
        return movable_board;
    }

    put(board) {

    }
}

export class RyuLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_RYU, "龍", "龍王", 0, -43);
    }
    
    clone() { return new RyuLogic(); }
    captured() { return new HishaLogic(); }
    promoted() { return null; }

    move(board, player, x, y) {
        let movable_board = new Array(9);
        for (let idx = 0; idx < 9; idx++) {
            movable_board[idx] = new Array(9).fill(false);
        }
        let movable_board_1 = super.continuous_move(board, player, x, y,
            [
                [0, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        let movable_board_2 = super.basic_move(board, player, x, y,
            [
                [-1, -1],
                [1, -1],
                [-1, 1],
                [1, 1]
            ]
        );
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                movable_board[y][x] = movable_board_1[y][x] || movable_board_2[y][x];
            }
        }
        return movable_board;
    }

    put(board) {

    }
}