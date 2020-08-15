import { BoardLogic } from './board_logic.jsx';
import { MochigomaLogic } from './mochigoma_logic.jsx';

import {
    OWNER_NONE      as O_N,
    OWNER_PLAYER1   as O_1,
    OWNER_PLAYER2   as O_2
} from '../definition/owner_define.jsx';

export class ShogiLogic {
    static get STATE_WAIT() { return 0; }
    static get STATE_GRAB_KOMA() { return 1; }
    static get STATE_GRAB_MOCHIGOMA() { return 2; }

    constructor() {
        this.turn = 1;
        this.teban = O_1;
        this.state = ShogiLogic.STATE_WAIT;
        this.move_from_x = 0;
        this.move_from_y = 0;
        this.board = new BoardLogic();
        this.action_board = null;
        this.mochigomas_1 = new MochigomaLogic(O_1);
        this.mochigomas_2 = new MochigomaLogic(O_2);
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
                        this.mochigomas_1.stock(captured.koma_idx);
                    }
                    else {
                        this.mochigomas_2.stock(captured.koma_idx);
                    }
                }
                this.board.move(this.teban, this.move_from_x, this.move_from_y, x, y);
                this.initActionBoard();
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

    captureKoma(x, y) {
        this.initActionBoard();
    }

    grabMochigoma(koma_idx) {
        this.initActionBoard();
    }

    putMochigoma(x, y) {
        this.initActionBoard();
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
    getMochigomas(owner) {
        switch (owner) {
            case O_1:
                return this.mochigomas_1;
            case O_2:
                return this.mochigomas_2;
            default:
                return false;
        }
    }
}