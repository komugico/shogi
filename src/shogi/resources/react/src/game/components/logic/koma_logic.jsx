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

/**
 * 駒ロジックの親クラス
 */
class KomaLogic {
    /**
     * 駒ロジックのコンストラクタ
     * 
     * @param {number} koma_idx     共通の駒インデックス
     * @param {string} short_name   駒の略称
     * @param {string} long_name    駒の名称
     * @param {number} top          駒画像の上位置
     * @param {number} left         駒画像の左位置
     */
    constructor(koma_idx, short_name, long_name, top, left) {
        /** 共通の駒インデックス */ this._koma_idx = koma_idx;
        /** 駒の略称             */ this._short_name = short_name;
        /** 駒の名称             */ this._long_name = long_name;
        /** 駒画像の上位置       */ this._top = top;
        /** 駒画像の左位置       */ this._left = left;
    }

    /** @type {number} */ get koma_idx() { return this._koma_idx; }
    /** @type {string} */ get short_name() { return this._short_name; }
    /** @type {string} */ get long_name() { return this._long_name; }
    /** @type {number} */ get top() { return this._top; }
    /** @type {number} */ get left() { return this._left; }

    /** @type {number} */ set koma_idx(koma_idx) { this._koma_idx = koma_idx; }
    /** @type {string} */ set short_name(short_name) { this._short_name = short_name; }
    /** @type {string} */ set long_name(long_name) { this._long_name = long_name; }
    /** @type {number} */ set top(top) { this._top = top; }
    /** @type {number} */ set left(left) { this._left = left; }

    /**
     * 駒のCSSスタイルを提供する関数
     * 
     * @param {number} owner    駒の所有者
     */
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

    /**
     * 隣接箇所への移動可否を判断する関数
     * 
     * @param {number[][]} owners       駒の所有者情報を示す盤面
     * @param {number} player           手番のプレイヤー
     * @param {number} x                駒のX座標
     * @param {number} y                駒のY座標
     * @param {number[][]} directions   移動可能な方向
     * 
     * @return {number[][]}             移動可否を示す盤面
     */
    basic_move(owners, player, x, y, directions) {
        // 1. 移動可能場所の格納配列作成
        let movables = new Array(9);
        for (let idx = 0; idx < 9; idx++) {
            movables[idx] = new Array(9).fill(false);
        }
        // 2. 所有情報の確認（駒の所有者でなければ移動不可）
        if (owners[y][x] == player) {
            // 3. 移動可能場所の判定
            for (let direction of directions) {
                let px = x + (direction[0] * player);
                let py = y + (direction[1] * player);
                if (px >= 0 && px < 9 && py >= 0 && py < 9) {
                    if (owners[py][px] != player) {
                        movables[py][px] = true;
                    }
                }
                else {
                    // 範囲外ならスキップ
                    continue;
                }
            }
        }
        // 4. 移動可能場所の返却
        return movables;
    }

    /**
     * 連続的な移動による移動可否を判断する関数
     * 
     * @param {number[][]} owners       駒の所有者情報を示す盤面
     * @param {number} player           手番のプレイヤー
     * @param {number} x                駒のX座標
     * @param {number} y                駒のY座標
     * @param {number[][]} directions   連続的に移動可能な方向
     * 
     * @return {number[][]}             移動可否を示す盤面
     */
    continuous_move(owners, player, x, y, directions) {
        // 1. 移動可能場所の格納配列作成
        let movables = new Array(9);
        for (let idx = 0; idx < 9; idx++) {
            movables[idx] = new Array(9).fill(false);
        }
        // 2. 所有情報の確認（駒の所有者でなければ移動不可）
        if (owners[y][x] == player) {
            // 3. 移動可能場所の判定
            for (let direction of directions) {
                let px = x;
                let py = y;
                while (true) {
                    px = px + (direction[0] * player);
                    py = py + (direction[1] * player);
                    if (px >= 0 && px < 9 && py >= 0 && py < 9) {
                        if (owners[py][px] == player) {
                            // 自駒ならbreak
                            break;
                        }
                        else {
                            if (owners[py][px] == O_N) {
                                // 空きならtrue
                                movables[py][px] = true;
                            }
                            else {
                                // 相手駒なら移動可にした上でbreak
                                movables[py][px] = true;
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
        return movables;
    }

    /**
     * 持ち駒の配置可否を判断する関数
     * 
     * @param {number[][]} owners   駒の所有者情報を示す盤面
     * @param {number} player       手番のプレイヤー
     * 
     * @return {number[][]}         配置可否を示す盤面
     */
    basic_put(owners, player) {
        // 1. 配置可能場所の格納配列作成
        let putables = new Array(9);
        for (let idx = 0; idx < 9; idx++) {
            putables[idx] = new Array(9).fill(false);
        }
        // 2. 配置可否を判断
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                if (owners[y][x] == O_N) {
                    switch (this.koma_idx) {
                        case KOMA_IDX_FU:
                        case KOMA_IDX_KYOSHA:
                            // 歩と香車は最上段にはおけない
                            if (player == O_1 && y >= 1) {
                                putables[y][x] = true;
                            }
                            if (player == O_2 && y <= 7) {
                                putables[y][x] = true;
                            }
                            break;
                        case KOMA_IDX_KEIMA:
                            // 桂馬は最上段と２段めにはおけない
                            if (player == O_1 && y >= 2) {
                                putables[y][x] = true;
                            }
                            if (player == O_2 && y <= 6) {
                                putables[y][x] = true;
                            }
                            break;
                        default:
                            putables[y][x] = true;
                            break;
                    }
                }
            }
        }
        return putables;
    }

    /**
     * 同じ駒のコピーを生成する関数
     * 
     * @abstract
     */
    clone() {
        throw new Error("Implementation error. You have to implement the method < clone >");
    }

    /**
     * 取った際の駒（不成の駒）を生成する関数
     * 
     * @abstract
     */
    captured() {
        throw new Error("Implementation error. You have to implement the method < captured >");
    }

    /**
     * 成駒を生成する関数
     * 
     * @abstract
     */
    promoted() {
        throw new Error("Implementation error. You have to implement the method < promoted >");
    }

    /**
     * 駒を持った際の移動可能座標を計算する関数
     * 
     * @param {number[][]} owners   駒の所有者情報を示す盤面
     * @param {number} player       手番のプレイヤー
     * @param {number} x            持った駒のX座標（筋）
     * @param {number} y            持った駒のY座標（段）
     * 
     * @abstract
     */
    move(owners, player, x, y) {
        throw new Error("Implementation error. You have to implement the method < move >");
    }

    /**
     * 駒台の駒を持った際の配置可能座標を計算する関数
     * 
     * @param {number[][]} owners    駒の所有者情報を示す盤面
     * @param {number} player       手番のプレイヤー
     * 
     * @abstract
     */
    put(owners, player) {
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

    move(owners, player, x, y) {
        // すべてfalseで返却
        let movables = new Array(9);
        for (let idx = 0; idx < 9; idx++) {
            movables[idx] = new Array(9).fill(false);
        }
        return movables;
    }

    put(owners, player) {
        // すべてfalseで返却
        let putables = new Array(9);
        for (let idx = 0; idx < 9; idx++) {
            putables[idx] = new Array(9).fill(false);
        }
        return putables;
    }
}

export class FuLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_FU, "歩", "歩兵", 0, -301);
    }

    clone() { return new FuLogic(); }
    captured() { return new FuLogic(); }
    promoted() { return new TokinLogic(); }

    move(owners, player, x, y) {
        let movables = super.basic_move(owners, player, x, y,
            [
                [0, -1]
            ]
        );
        return movables;
    }

    put(owners, player) {
        // TODO: 打ち歩詰め禁止<================================================
        return super.basic_put(owners, player);
    }

    nifuCheck(komas, owners, player, putables) {
        let new_putables = new Array(9);
        for (let idx = 0; idx < 9; idx++) {
            new_putables[idx] = new Array(9).fill(false);
        }
        for (let x = 0; x < 9; x++) {
            let existsFu = false;
            for (let y = 0; y < 9; y++) {
                if (komas[y][x].koma_idx == KOMA_IDX_FU && owners[y][x] == player) {
                    existsFu = true;
                    break;
                }
            }
            for (let y = 0; y < 9; y++) {
                if (existsFu == false) {
                    new_putables[y][x] = putables[y][x];
                }
            }
        }
        return new_putables;
    }
}

export class KyoshaLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_KYOSHA, "香", "香車", 0, -258);
    }

    clone() { return new KyoshaLogic(); }
    captured() { return new KyoshaLogic(); }
    promoted() { return new NarikyoLogic(); }

    move(owners, player, x, y) {
        let movables = super.continuous_move(owners, player, x, y,
            [
                [0, -1]
            ]
        );
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}

export class KeimaLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_KEIMA, "桂", "桂馬", 0, -215);
    }

    clone() { return new KeimaLogic(); }
    captured() { return new KeimaLogic(); }
    promoted() { return new NarikeiLogic(); }

    move(owners, player, x, y) {
        let movables = super.basic_move(owners, player, x, y,
            [
                [-1, -2],
                [1, -2]
            ]
        );
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}

export class GinLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_GIN, "銀", "銀将", 0, -172);
    }

    clone() { return new GinLogic(); }
    captured() { return new GinLogic(); }
    promoted() { return new NariginLogic(); }

    move(owners, player, x, y) {
        let movables = super.basic_move(owners, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 1],
                [1, 1]
            ]
        );
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}

export class KinLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_KIN, "金", "金将", 0, -129);
    }

    clone() { return new KinLogic(); }
    captured() { return new KinLogic(); }
    promoted() { return null; }

    move(owners, player, x, y) {
        let movables = super.basic_move(owners, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}

export class KakuLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_KAKU, "角", "角行", 0, -86);
    }
    
    clone() { return new KakuLogic(); }
    captured() { return new KakuLogic(); }
    promoted() { return new UmaLogic(); }

    move(owners, player, x, y) {
        let movables = super.continuous_move(owners, player, x, y,
            [
                [-1, -1],
                [1, -1],
                [-1, 1],
                [1, 1]
            ]
        );
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}

export class HishaLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_HISHA, "飛", "飛車", 0, -43);
    }
    
    clone() { return new HishaLogic(); }
    captured() { return new HishaLogic(); }
    promoted() { return new RyuLogic(); }

    move(owners, player, x, y) {
        let movables = super.continuous_move(owners, player, x, y,
            [
                [0, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}

export class OuLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_OU, "王", "王将", 0, 0);
    }
    
    clone() { return new OuLogic(); }
    captured() { return new OuLogic(); }
    promoted() { return null; }

    move(owners, player, x, y) {
        let movables = super.basic_move(owners, player, x, y,
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
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}

export class GyokuLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_GYOKU, "玉", "玉将", -48, 0);
    }
    
    clone() { return new GyokuLogic(); }
    captured() { return new GyokuLogic(); }
    promoted() { return null; }

    move(owners, player, x, y) {
        let movables = super.basic_move(owners, player, x, y,
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
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}

export class TokinLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_TOKIN, "と", "と金", -48, -301);
    }
    
    clone() { return new TokinLogic(); }
    captured() { return new FuLogic(); }
    promoted() { return null; }

    move(owners, player, x, y) {
        let movables = super.basic_move(owners, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}

export class NarikyoLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_NARIKYO, "杏", "成香", -48, -258);
    }

    clone() { return new NarikyoLogic(); }
    captured() { return new KyoshaLogic(); }
    promoted() { return null; }

    move(owners, player, x, y) {
        let movables = super.basic_move(owners, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}

export class NarikeiLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_NARIKEI, "圭", "成桂", -48, -215);
    }

    clone() { return new NarikeiLogic(); }
    captured() { return new KeimaLogic(); }
    promoted() { return null; }

    move(owners, player, x, y) {
        let movables = super.basic_move(owners, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}

export class NariginLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_NARIGIN, "全", "成銀", -48, -172);
    }
    
    clone() { return new NariginLogic(); }
    captured() { return new GinLogic(); }
    promoted() { return null; }

    move(owners, player, x, y) {
        let movables = super.basic_move(owners, player, x, y,
            [
                [-1, -1],
                [0, -1],
                [1, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}

export class UmaLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_UMA, "馬", "龍馬", -48, -86);
    }

    clone() { return new UmaLogic(); }
    captured() { return new KakuLogic(); }
    promoted() { return null; }

    move(owners, player, x, y) {
        let movables = new Array(9);
        for (let idx = 0; idx < 9; idx++) {
            movables[idx] = new Array(9).fill(false);
        }
        let movables_1 = super.continuous_move(owners, player, x, y,
            [
                [-1, -1],
                [1, -1],
                [-1, 1],
                [1, 1]
            ]
        );
        let movables_2 = super.basic_move(owners, player, x, y,
            [
                [0, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                movables[y][x] = movables_1[y][x] || movables_2[y][x];
            }
        }
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}

export class RyuLogic extends KomaLogic {
    constructor() {
        super(KOMA_IDX_RYU, "龍", "龍王", -48, -43);
    }
    
    clone() { return new RyuLogic(); }
    captured() { return new HishaLogic(); }
    promoted() { return null; }

    move(owners, player, x, y) {
        let movables = new Array(9);
        for (let idx = 0; idx < 9; idx++) {
            movables[idx] = new Array(9).fill(false);
        }
        let movables_1 = super.continuous_move(owners, player, x, y,
            [
                [0, -1],
                [-1, 0],
                [1, 0],
                [0, 1]
            ]
        );
        let movables_2 = super.basic_move(owners, player, x, y,
            [
                [-1, -1],
                [1, -1],
                [-1, 1],
                [1, 1]
            ]
        );
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                movables[y][x] = movables_1[y][x] || movables_2[y][x];
            }
        }
        return movables;
    }

    put(owners, player) {
        return super.basic_put(owners, player);
    }
}