import { BoardLogic } from './board_logic.jsx';
import { MochigomaLogic } from './mochigoma_logic.jsx';

import {
    OWNER_NONE      as O_N,
    OWNER_PLAYER1   as O_1,
    OWNER_PLAYER2   as O_2
} from '../definition/owner_define.jsx';

import {
    KOMA_IDX_FU
} from '../definition/koma_idx_define.jsx';

export class ShogiLogic {
    static get STATE_WAIT() { return 0; }
    static get STATE_GRAB_KOMA() { return 1; }
    static get STATE_GRAB_MOCHIGOMA() { return 2; }

    constructor() {
        this.turn = 1;
        this.teban = O_1;
        this.state = ShogiLogic.STATE_WAIT;
        this.move_from_x = -1;
        this.move_from_y = -1;
        this.board = new BoardLogic();
        this.action_board = null;
        this.mochigoma_1 = new MochigomaLogic(O_1);
        this.mochigoma_2 = new MochigomaLogic(O_2);
        this.initActionBoard();
    }

    initActionBoard() {
        this.action_board = [
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false]
        ];
    }

    proceed() {
        this.turn = this.turn + 1;
        this.teban = this.teban * -1;
        this.move_from_x = -1;
        this.move_from_y = -1;
        this.state = ShogiLogic.STATE_WAIT;
    }

    action(x, y) {
        switch (this.state) {
            case ShogiLogic.STATE_GRAB_KOMA:
                return this.moveKoma(x, y);
            case ShogiLogic.STATE_GRAB_MOCHIGOMA:
                return this.putMochigoma(x, y);
            default:
                return false;
        }
    }

    grabKoma(x, y) {
        let movable_positions = this.board.grab(this.teban, x, y);
        if (movable_positions) {
            for (let py = 0; py < 9; py++) {
                for (let px = 0; px < 9; px++) {
                    this.action_board[py][px] = movable_positions[py][px];
                }
            }
            this.move_from_x = x;
            this.move_from_y = y;
            this.state = ShogiLogic.STATE_GRAB_KOMA;
            return true;
        }
        else {
            return false;
        }
    }

    moveKoma(x, y) {
        if (this.action_board[y][x]) {
            if (this.board.canMove(this.teban, this.move_from_x, this.move_from_y, x, y)) {
                if (this.board.existsEnemy(this.teban, x, y)) {
                    // 駒の獲得がある場合
                    let captured = this.board.capture(x, y);
                    if (this.teban == O_1) {
                        this.mochigoma_1.stock(captured.koma_idx);
                    }
                    else {
                        this.mochigoma_2.stock(captured.koma_idx);
                    }
                }
                // 移動を実行
                this.board.move(this.teban, this.move_from_x, this.move_from_y, x, y);
                // 成りチェックを実行
                this.board.promoteCheck(this.teban, this.move_from_x, this.move_from_y, x, y);
                // 動作用盤面を初期化
                this.initActionBoard();
                // 手番を進める
                this.proceed();
                return true;
            }
            else {
                // 移動不可の場合
                this.initActionBoard();
                return false;
            }
        }
        else {
            // ここには遷移しないはずだが念の為に設定
            this.initActionBoard();
            return false;
        }
    }

    grabMochigoma(koma_idx) {
        let mochigoma = null;
        if (this.teban == O_1) {
            mochigoma = this.mochigoma_1;
        }
        if (this.teban == O_2) {
            mochigoma = this.mochigoma_2;
        }
        let putable_positions = mochigoma.grab(koma_idx, this.board.getOwners(), this.teban);
        console.dir("a");
        if (putable_positions) {
            this.state = ShogiLogic.STATE_GRAB_MOCHIGOMA;
            // 二歩禁止
            console.dir("b");
            if (koma_idx == KOMA_IDX_FU) {
                console.dir("c");
                let new_putable_positions = mochigoma.grabbed.nifuCheck(
                    this.board.getKomas(),
                    this.board.getOwners(),
                    this.teban,
                    putable_positions
                );
                putable_positions = new_putable_positions;
            }
            // 格納
            for (let py = 0; py < 9; py++) {
                for (let px = 0; px < 9; px++) {
                    this.action_board[py][px] = putable_positions[py][px];
                }
            }
        }
    }

    putMochigoma(x, y) {
        let mochigoma = null;
        if (this.teban == O_1) {
            mochigoma = this.mochigoma_1;
        }
        if (this.teban == O_2) {
            mochigoma = this.mochigoma_2;
        }
        let koma = mochigoma.pickGrabbedKoma()
        if (koma) {
            // 駒を置く
            this.board.putKoma(koma, this.teban, x, y);
            // 動作用盤面を初期化
            this.initActionBoard();
            // 手番を進める
            this.proceed();
            return true;
        }
        else {
            // 動作用盤面を初期化
            this.initActionBoard();
            return false;
        }
    }

    outeCheck(owner) {
        return false;
    }

    tsumiCheck(owner) {
        return false;
    }
    
    getTurn() { return this.turn; }
    getTeban() { return this.teban; }
    getBoard() { return this.board; }
    getActionBoard() { return this.action_board; }
    getMochigoma(owner) {
        switch (owner) {
            case O_1:
                return this.mochigoma_1;
            case O_2:
                return this.mochigoma_2;
            default:
                return false;
        }
    }
}