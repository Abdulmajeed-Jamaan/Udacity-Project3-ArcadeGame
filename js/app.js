
//**************************************************************************************
//***********************************  ENEMY CLASS *************************************
//**************************************************************************************

class Enemy {
    constructor(position, cordinates) {
        this.sprite = 'images/enemy-bug.png';
        this.x = position.x;
        this.y = position.y;
        this.screenWidth = cordinates.col * BLOCK_WIDTH;
        this.screenHeight = cordinates.row * BLOCK_HEIGHT;
        this.speed = this.randomSpeed();
    }

    update(dt) {
        if (this.x >= this.screenWidth) {
            this.speed = this.randomSpeed();
            this.x = -BLOCK_WIDTH;
        } else {
            this.x += this.speed;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // _____________________GENERATE RANDOM SPEED WHEN INITIALISE________________________
    randomSpeed() {
        let speed = Math.ceil(Math.random() * 2);
        return speed;
    }
}

//**************************************************************************************
//**********************************  PLAYER CLASS *************************************
//**************************************************************************************
class Player {
    constructor(position, cordinates) {
        this.player = 'images/char-horn-girl.png';
        this.position = position;
        this.x = position.col * BLOCK_WIDTH;
        this.y = position.row * BLOCK_HEIGHT - 20;
        this.screenWidth = cordinates.col * BLOCK_WIDTH;
        this.screenHeight = cordinates.row * BLOCK_HEIGHT;
        this.crash = false;
    }

    update(dt) {

    }

    render() {
        ctx.drawImage(Resources.get(this.player), this.x, this.y);
    }

    // _____________________TO RESET THE PLAYER WHEN CRASH OR WIN________________________
    reset() {
        this.x = this.position.col * BLOCK_WIDTH;
        this.y = this.position.row * BLOCK_HEIGHT - 20;
    }

    // ________________ -_____CHECK IF PLAYER ARRIVE TO THE WATER________________________
    checkWin() {
        if (this.y <= 0) {
            addScore();
            this.crash = true;
            setTimeout(() => {
                this.reset();
                this.crash = false;
            }, 500);
        }
    }

    // _____________STOP THE ANIMATION FOR PERIOD OF TIME THEN RESTART ________________
    crashMethod(enemy) {
        enemy.speed = 0;
        this.crash = true;
        setTimeout(() => {
            this.reset();
            enemy.speed = 1;
            this.crash = false;
            resetScore();
        }, 500);
    }

    // ______________________CHECK IF THE PLAYER HIT THE ENEMY_________________________
    checkCrash() {
        for (const enemy of allEnemies) {
            if (this.y == enemy.y) {
                if (this.x < (enemy.x + BLOCK_WIDTH - 25) && (this.x + BLOCK_WIDTH - 25) > enemy.x) {
                    this.crashMethod(enemy);
                }
            }

        }
    }

    handleInput(key) {
        // ________________IF CRASH HAPPEN DONT RECIEVE ANY INPUTS___________________
        if (this.crash)
            return;

        switch (key) {
            case 'left':
                if (this.x > 0) {
                    this.x -= BLOCK_WIDTH;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= BLOCK_HEIGHT;
                }
                break;
            case 'right':
                if ((this.x + BLOCK_WIDTH) < this.screenWidth) {
                    this.x += BLOCK_WIDTH;
                }

                break;
            case 'down':
                if ((this.y + BLOCK_HEIGHT) < (this.screenHeight - BLOCK_HEIGHT)) {
                    this.y += BLOCK_HEIGHT;
                }
                break;
        }
        // ________________________CHECK WIND AFTER EVRERY MOVE___________________________
        this.checkWin();
    }
}



