console.log("script.js is running");

const COLOR_PIPE = '#009e00';
const COLOR_GRASS = '#84e28c';

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

let soundJump = new Audio("wing.ogg");
let soundScore = new Audio("point.ogg");
let soundHit = new Audio("hit.ogg");
let soundDie = new Audio("die.ogg");
let soundSwoosh = new Audio("swooshing.ogg");

let channel_max = 10; // number of channels
audiochannels = [];
for (let a = 0; a < channel_max; a++) { // prepare the channels
    audiochannels[a] = [];
    audiochannels[a]['channel'] = new Audio(); // create a new audio object
    audiochannels[a]['finished'] = -1; // expected end time for this channel
}

function sendReward(callback) {
    let url = "http://localhost:8080/web_forbank/api-deposit-withdraw";
    fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            // TODO: thêm thông tin
            "loaiGD": "GT",
            "soTK": "000000004",
            "soTien": reward
        })
    })
        .then(function (response) {
            return response.json();
        })
        .then(result => {
            console.log(result);
            if ((result.message).includes("thành công")) {
                callback();
            } else {
                document.getElementById("errorMsg").innerHTML = result.message;
            }
        })
        .catch(err => {
            console.log(err);
        });
}


function play_sound(s) {
    for (let a = 0; a < audiochannels.length; a++) {
        let thistime = new Date();
        if (audiochannels[a]['finished'] < thistime.getTime()) { // is this channel finished?
            audiochannels[a]['finished'] = thistime.getTime() + s.duration * 1000;
            audiochannels[a]['channel'].src = s.src;
            audiochannels[a]['channel'].load();
            audiochannels[a]['channel'].play();
            break;
        }
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

// namespace our game
let GameEngine = {
    // set up some inital values
    WIDTH: 320,
    HEIGHT: 480,
    scale: 1,
    // the position of the canvas
    // in relation to the screen
    offset: {
        top: 0,
        left: 0
    },
    // store all bird, touches, pipes etc
    entities: [],
    currentWidth: null,
    currentHeight: null,
    canvas: null,
    ctx: null,
    score: {
        taps: 0,
        coins: 0
    },
    distance: 0,
    digits: [],
    fonts: [],
    // we'll set the rest of these
    // in the init function
    RATIO: null,
    bg_grad: "day",
    game: null,
    ua: null,
    android: null,
    ios: null,
    gradients: {},
    init: function () {
        console.log("GameEngine.init");
        let grad;
        // the proportion of width to height
        GameEngine.RATIO = GameEngine.WIDTH / GameEngine.HEIGHT;
        // these will change when the screen is resize
        GameEngine.currentWidth = GameEngine.WIDTH;
        GameEngine.currentHeight = GameEngine.HEIGHT;
        // this is our canvas element
        GameEngine.canvas = document.getElementById('canvas');
        console.log(this.canvas);
        // it's important to set this
        // otherwise the browser will
        // default to 320x200
        GameEngine.canvas.width = GameEngine.WIDTH;
        GameEngine.canvas.height = GameEngine.HEIGHT;
        // the canvas context allows us to
        // interact with the canvas api
        GameEngine.ctx = GameEngine.canvas.getContext('2d');
        // we need to sniff out android & ios
        // so we can hide the address bar in
        // our resize function
        GameEngine.ua = navigator.userAgent.toLowerCase();
        GameEngine.android = GameEngine.ua.indexOf('android') > -1;
        GameEngine.ios = (GameEngine.ua.indexOf('iphone') > -1 || GameEngine.ua.indexOf('ipad') > -1);

        // setup some gradients
        grad = GameEngine.ctx.createLinearGradient(0, 0, 0, GameEngine.HEIGHT);
        grad.addColorStop(0, '#036');
        grad.addColorStop(0.5, '#69a');
        grad.addColorStop(1, 'yellow');
        GameEngine.gradients.dawn = grad;

        grad = GameEngine.ctx.createLinearGradient(0, 0, 0, GameEngine.HEIGHT);
        grad.addColorStop(0, '#69a');
        grad.addColorStop(0.5, '#9cd');
        grad.addColorStop(1, '#fff');
        GameEngine.gradients.day = grad;

        grad = GameEngine.ctx.createLinearGradient(0, 0, 0, GameEngine.HEIGHT);
        grad.addColorStop(0, '#036');
        grad.addColorStop(0.3, '#69a');
        grad.addColorStop(1, 'pink');
        GameEngine.gradients.dusk = grad;

        grad = GameEngine.ctx.createLinearGradient(0, 0, 0, GameEngine.HEIGHT);
        grad.addColorStop(0, '#036');
        grad.addColorStop(1, 'black');
        GameEngine.gradients.night = grad;

        // listen for clicks
        window.addEventListener('click', function (e) {
            e.preventDefault();
            GameEngine.Input.set(e);
        }, false);

        // listen for space
        document.addEventListener('keyup', function (e) {
            e.preventDefault();
            if (e.key === 'ArrowUp' || e.key === ' ') {
                GameEngine.Input.set(e);
            }
        }, false);

        // listen for touches
        window.addEventListener('touchstart', function (e) {
            e.preventDefault();
            // the event object has an array
            // called touches, we just want
            // the first touch
            GameEngine.Input.set(e.touches[0]);
        }, false);
        window.addEventListener('touchmove', function (e) {
            // we're not interested in this
            // but prevent default behaviour
            // so the screen doesn't scroll
            // or zoom
            e.preventDefault();
        }, false);
        window.addEventListener('touchend', function (e) {
            // as above
            e.preventDefault();
        }, false);

        // we're ready to resize
        GameEngine.resize();
        GameEngine.changeState("Splash");

        GameEngine.loop();

    },

    resize: function () {

        GameEngine.currentHeight = window.innerHeight;
        // resize the width in proportion
        // to the new height
        GameEngine.currentWidth = GameEngine.currentHeight * GameEngine.RATIO;

        // this will create some extra space on the
        // page, allowing us to scroll pass
        // the address bar, and thus hide it.
        if (GameEngine.android || GameEngine.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        // set the new canvas style width & height
        // note: our canvas is still 320x480 but
        // we're essentially scaling it with CSS
        GameEngine.canvas.style.width = GameEngine.currentWidth + 'px';
        GameEngine.canvas.style.height = GameEngine.currentHeight + 'px';

        // the amount by which the css resized canvas
        // is different to the actual (480x320) size.
        GameEngine.scale = GameEngine.currentWidth / GameEngine.WIDTH;
        // position of canvas in relation to
        // the screen
        GameEngine.offset.top = GameEngine.canvas.offsetTop;
        GameEngine.offset.left = GameEngine.canvas.offsetLeft;

        // we use a timeout here as some mobile
        // browsers won't scroll if there is not
        // a small delay
        window.setTimeout(function () {
            window.scrollTo(0, 1);
        }, 1);
    },

    // this is where all entities will be moved
    // and checked for collisions etc
    update: function () {
        GameEngine.game.update();
        GameEngine.Input.tapped = false;
    },

    // this is where we draw all the entities
    render: function () {

        GameEngine.Draw.rect(0, 0, GameEngine.WIDTH, GameEngine.HEIGHT, GameEngine.gradients[GameEngine.bg_grad]);

        // cycle through all entities and render to canvas
        for (let i = 0; i < GameEngine.entities.length; i += 1) {
            GameEngine.entities[i].render();
        }

        GameEngine.game.render();

    },

    // the actual loop
    // requests animation frame
    // then proceeds to update
    // and render
    loop: function () {

        requestAnimFrame(GameEngine.loop);

        GameEngine.update();
        GameEngine.render();
    },
    changeState: function (state) {
        GameEngine.game = new window[state]();
        GameEngine.game.init();
    }
};

// abstracts letious canvas operations into
// standalone functions
GameEngine.Draw = {

    clear: function () {
        GameEngine.ctx.clearRect(0, 0, GameEngine.WIDTH, GameEngine.HEIGHT);
    },

    rect: function (x, y, w, h, col) {
        GameEngine.ctx.fillStyle = col;
        GameEngine.ctx.fillRect(x, y, w, h);
    },
    circle: function (x, y, r, col) {
        GameEngine.ctx.fillStyle = col;
        GameEngine.ctx.beginPath();
        GameEngine.ctx.arc(x + 5, y + 5, r, 0, Math.PI * 2, true);
        GameEngine.ctx.closePath();
        GameEngine.ctx.fill();
    },
    Image: function (img, x, y) {
        GameEngine.ctx.drawImage(img, x, y);
    },
    Sprite: function (img, srcX, srcY, srcW, srcH, destX, destY, destW, destH, r) {
        GameEngine.ctx.save();
        GameEngine.ctx.translate(destX, destY);
        GameEngine.ctx.rotate(r * (Math.PI / 180));
        GameEngine.ctx.translate(-(destX + destW / 2), -(destY + destH / 2));
        GameEngine.ctx.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
        GameEngine.ctx.restore();
    },
    semiCircle: function (x, y, r, col) {
        GameEngine.ctx.fillStyle = col;
        GameEngine.ctx.beginPath();
        GameEngine.ctx.arc(x, y, r, 0, Math.PI, false);
        GameEngine.ctx.closePath();
        GameEngine.ctx.fill();
    },

    text: function (string, x, y, size, col) {
        GameEngine.ctx.font = 'bold ' + size + 'px Monospace';
        GameEngine.ctx.fillStyle = col;
        GameEngine.ctx.fillText(string, x, y);
    }
};

GameEngine.Input = {
    x: 0,
    y: 0,
    tapped: false,

    set: function (data) {
        this.x = (data.pageX - GameEngine.offset.left) / GameEngine.scale;
        this.y = (data.pageY - GameEngine.offset.top) / GameEngine.scale;
        this.tapped = true;
    }
};

GameEngine.Cloud = function (x, y) {

    this.x = x;
    this.y = y;
    this.r = 30;
    this.col = 'rgba(255,255,255,1)';
    this.type = 'cloud';
    // random values so particles do no
    // travel at the same speeds
    this.vx = -0.10;

    this.remove = false;

    this.update = function () {

        // update coordinates
        this.x += this.vx;
        if (this.x < (0 - 115)) {
            this.respawn();
        }

    };


    this.render = function () {
        GameEngine.Draw.circle(this.x + this.r, (this.y + this.r), this.r, this.col);
        GameEngine.Draw.circle(this.x + 55, (this.y + this.r / 2), this.r / 0.88, this.col);
        GameEngine.Draw.circle(this.x + 55, (this.y + this.r + 15), this.r, this.col);
        GameEngine.Draw.circle(this.x + 85, (this.y + this.r), this.r, this.col);
    };

    this.respawn = function () {
        this.x = ~~(Math.random() * this.r * 2) + GameEngine.WIDTH;
        this.y = ~~(Math.random() * GameEngine.HEIGHT / 2)
    };
};

GameEngine.BottomBar = function (x, y, r) {

    this.x = x;
    this.y = y
    this.r = r;
    this.vx = -1;
    this.name = 'BottomBar';

    this.update = function () {
        // update coordinates
        this.x += this.vx;
        if (this.x < (0 - this.r)) {
            this.respawn();
        }
    };

    this.render = function () {
        GameEngine.Draw.rect(this.x, this.y, this.r, 100, '#D2691E');
        for (let i = 0; i < 10; i++) {
            GameEngine.Draw.semiCircle(this.x + i * (this.r / 9), this.y, 20, '#050');
        }
    }

    this.respawn = function () {
        this.x = GameEngine.WIDTH - 1;
    }

}

GameEngine.Tree = function (x, y) {

    this.x = x;
    this.y = y;
    this.r = 30;
    this.h = 50;
    this.w = this.r * 2;
    this.vx = -1;
    this.type = 'Tree';

    this.update = function () {
        // update coordinates
        this.x += this.vx;
        if (this.x < (0 - this.r * 2)) {
            this.respawn();
        }
    };

    this.render = function () {
        GameEngine.Draw.circle(this.x + this.r, (this.y + this.r) - 10, this.r, 'green', COLOR_GRASS);
        GameEngine.Draw.circle(this.x + (this.r / 2), (this.y + this.r) - 10, this.r / 3, 'rgba(0,0,0,0.08)');
        GameEngine.Draw.rect(this.x + this.r, this.y + this.r, 10, this.r, 'brown', '#d20');
    }

    this.respawn = function () {
        this.x = GameEngine.WIDTH + this.r;
    }
}

GameEngine.Pipe = function (x, w) {
    this.gap = 130;

    this.centerX = x;
    this.coin = true
    this.w = w;
    this.h = GameEngine.HEIGHT - 150;
    this.vx = -1;
    this.type = 'pipe';

    this.update = function () {
        // update coordinates
        this.centerX += this.vx;
        if (this.centerX === (0 - this.w)) {
            this.respawn();
        }
    };

    this.render = function () {
        // draw coin
        // if (this.coin) {
        //     GameEngine.Draw.circle(this.centerX + this.w / 2 - 5, this.centerY - 5, 5, "Gold")
        // }

        GameEngine.Draw.rect(this.centerX, 0, this.w, this.centerY - this.gap, COLOR_PIPE);
        GameEngine.Draw.rect(this.centerX, this.centerY + this.gap, this.w, this.h - this.centerY, COLOR_PIPE);
    }

    this.respawn = function () {
        this.centerY = this.randomIntFromInterval(70, 220);
        this.centerX = 320 - this.w + 160;
        this.coin = true;
    }

    this.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    this.centerY = this.randomIntFromInterval(70, 220);
}

GameEngine.Bird = function () {

    this.img = new Image();
    this.img.src = 'bird.png';
    this.gravity = 0.1;
    this.width = 34;
    this.height = 24;
    this.ix = 0;
    this.iy = 0;
    this.fr = 0;
    this.vy = 180;
    this.vx = 70;
    this.velocity = 0;
    this.play = false;
    this.jump = -2;
    this.rotation = 0;
    this.type = 'bird';
    this.update = function () {
        if (this.fr++ > 5) {
            this.fr = 0;
            if (this.iy === this.height * 3) {
                this.iy = 0
            }
            this.iy += this.height;
        }
        if (this.play) {
            this.velocity += this.gravity;
            this.vy += this.velocity;
            if (this.vy <= 0) {
                this.vy = 0;
            }
            if (this.vy >= 370) {
                this.vy = 370;
            }
            this.rotation = Math.min((this.velocity / 10) * 90, 90);
        }
        if (GameEngine.Input.tapped) {
            this.play = true;
            play_sound(soundJump);
            this.velocity = this.jump;
        }
    };

    this.render = function () {

        GameEngine.Draw.Sprite(this.img, this.ix, this.iy, this.width, this.height, this.vx, this.vy, this.width, this.height, this.rotation);
    }

}

GameEngine.Particle = function (x, y, r, col, type) {

    this.x = x;
    this.y = y;
    this.r = r;
    this.col = col;
    this.type = type || 'circle';
    this.name = 'particle';

    // determines whether particle will
    // travel to the right of left
    // 50% chance of either happening
    this.dir = (Math.random() * 2 > 1) ? 1 : -1;

    // random values so particles do no
    // travel at the same speeds
    this.vx = ~~(Math.random() * 4) * this.dir;
    this.vy = ~~(Math.random() * 7);

    this.remove = false;

    this.update = function () {

        // update coordinates
        this.x += this.vx;
        this.y -= this.vy;

        // increase velocity so particle
        // accelerates off screen
        this.vx *= 0.99;
        this.vy *= 0.99;

        // adding this negative amount to the
        // y velocity exerts an upward pull on
        // the particle, as if drawn to the
        // surface
        this.vy -= 0.25;

        // offscreen
        if (this.y > GameEngine.HEIGHT) {
            this.remove = true;
        }

    };


    this.render = function () {
        if (this.type === 'star') {
            GameEngine.Draw.star(this.x, this.y, this.col);
        } else {
            GameEngine.Draw.circle(this.x, this.y, this.r, this.col);
        }
    };

};

// checks if two entities are touching
GameEngine.Collides = function (bird, pipe) {
    // touch floor
    if (bird.vy >= 370) {
        return true;
    }

    // pass a pipe
    if (pipe.coin && bird.vx > pipe.centerX + pipe.w / 2 - 5) {
        pipe.coin = false;
        GameEngine.score.coins += 1;
        GameEngine.digits = GameEngine.score.coins.toString().split('');
        play_sound(soundScore);
    }

    let bx1 = bird.vx - bird.width / 2;
    let by1 = bird.vy - bird.height / 2;
    let bx2 = bird.vx + bird.width / 2;
    let by2 = bird.vy + bird.height / 2;

    let upx1 = pipe.centerX;
    let upy1 = 0;
    let upx2 = pipe.centerX + pipe.w;
    let upy2 = pipe.centerY - pipe.gap;


    let lpx1 = pipe.centerX;
    let lpy1 = pipe.centerY + pipe.gap;

    let lpx2 = upx2;
    let lpy2 = pipe.h;

    let c1 = !(bx1 > upx2
        || bx2 < upx1
        || by1 > upy2
        || by2 < upy1
    );
    let c2 = !(bx1 > lpx2
        || bx2 < lpx1
        || by1 > lpy2
        || by2 < lpy1
    );

    return (c1 || c2)

};

window.Splash = function () {

    this.banner = new Image();
    this.banner.src = "splash.png";

    this.init = function () {
        play_sound(soundSwoosh);
        GameEngine.distance = 0;
        GameEngine.bg_grad = "day";
        GameEngine.entities = [];
        GameEngine.score.taps = GameEngine.score.coins = 0;
        //Add entities
        GameEngine.entities.push(new GameEngine.Cloud(30, ~~(Math.random() * GameEngine.HEIGHT / 2)));
        GameEngine.entities.push(new GameEngine.Cloud(130, ~~(Math.random() * GameEngine.HEIGHT / 2)));
        GameEngine.entities.push(new GameEngine.Cloud(230, ~~(Math.random() * GameEngine.HEIGHT / 2)));
        for (let i = 0; i < 2; i += 1) {
            GameEngine.entities.push(new GameEngine.BottomBar(GameEngine.WIDTH * i, GameEngine.HEIGHT - 100, GameEngine.WIDTH));
        }
        GameEngine.entities.push(new GameEngine.Tree(~~(Math.random() * GameEngine.WIDTH), GameEngine.HEIGHT - 160));
        GameEngine.entities.push(new GameEngine.Tree(~~(Math.random() * GameEngine.WIDTH + 50), GameEngine.HEIGHT - 160));
        GameEngine.entities.push(new GameEngine.Tree(~~(Math.random() * GameEngine.WIDTH + 100), GameEngine.HEIGHT - 160));
    }

    this.update = function () {
        for (let i = 0; i < GameEngine.entities.length; i += 1) {
            GameEngine.entities[i].update();
        }
        if (GameEngine.Input.tapped) {
            GameEngine.changeState('Play');
            GameEngine.Input.tapped = false;
        }
    }

    this.render = function () {
        GameEngine.Draw.Image(this.banner, 66, 100);
    }

}

window.Play = function () {

    this.init = function () {
        GameEngine.entities.push(new GameEngine.Pipe(GameEngine.WIDTH * 2 - GameEngine.WIDTH / 2, 50));
        GameEngine.entities.push(new GameEngine.Pipe(GameEngine.WIDTH * 2, 50));
        GameEngine.entities.push(new GameEngine.Pipe(GameEngine.WIDTH * 3 - GameEngine.WIDTH / 2, 50));

        GameEngine.bird = new GameEngine.Bird();
        GameEngine.entities.push(GameEngine.bird);

        for (let n = 0; n < 10; n++) {
            let img = new Image();
            img.src = "font_small_" + n + '.png';
            GameEngine.fonts.push(img);
        }
        GameEngine.digits = ["0"];
    }

    this.update = function () {

        GameEngine.distance += 1;
        let levelUp = ((GameEngine.distance % 2048) === 0);
        if (levelUp) {
            let bg = "day";
            let gradients = ["day", "dusk", "night", "dawn"];
            for (let i = 0; i < gradients.length; i++) {
                if (GameEngine.bg_grad === gradients[i]) {
                    if (i === gradients.length - 1) {
                        bg = "day";
                    } else {
                        bg = gradients[i + 1];
                    }
                }
            }
            GameEngine.bg_grad = bg;
        }

        // if the user tapped on this game tick
        // we only need to check for a collision
        let checkCollision = false;

        // if the user has tapped the screen
        if (GameEngine.Input.tapped) {
            // keep track of taps; needed to calculate accuracy
            GameEngine.score.taps += 1;

            // set tapped back to false
            // in the next cycle

            checkCollision = true;
        }

        // cycle through all entities and update as necessary
        for (let i = 0; i < GameEngine.entities.length; i += 1) {
            GameEngine.entities[i].update();
            if (GameEngine.entities[i].type === 'pipe') {
                let hit = GameEngine.Collides(GameEngine.bird, GameEngine.entities[i]);
                if (hit) {
                    play_sound(soundHit);
                    GameEngine.changeState('GameOver');
                    break;
                }
            }
        }
    }

    this.render = function () {
        //score
        let X = (GameEngine.WIDTH / 2 - (GameEngine.digits.length * 14) / 2);
        for (let i = 0; i < GameEngine.digits.length; i++) {
            GameEngine.Draw.Image(GameEngine.fonts[Number(GameEngine.digits[i])], X + (i * 14), 10);
        }
    }
}

window.GameOver = function () {
    let base = 5;

    this.getMedal = function () {
        let score = GameEngine.score.coins;
        console.log(score);

        if (score < base)
            return "bronze";
        else if (score >= base * 2)
            return "silver";
        else if (score >= base * 3)
            return "gold";
        else
            return "platinum";
    }

    this.getHighScore = function () {
        let savedscore = getCookie("highscore");
        if (savedscore !== "") {
            let hs = parseInt(savedscore) || 0;
            if (hs < GameEngine.score.coins) {
                hs = GameEngine.score.coins
                setCookie("highscore", hs, 999);
            }
            return hs;
        } else {
            setCookie("highscore", GameEngine.score.coins, 999);
            return GameEngine.score.coins;
        }
    }

    this.init = function () {
        let that = this;
        setTimeout(function () {
            play_sound(soundDie);
            that.banner = new Image();
            that.banner.src = "scoreboard.png";
            let m = that.getMedal();
            that.medal = new Image();
            that.medal.src = 'medal_' + m + '.png';
            that.replay = new Image();
            that.replay.src = "replay.png";
            that.highscore = that.getHighScore();

            console.log(that.medal.src);
        }, 500);
    }

    this.update = function () {
        if (GameEngine.Input.tapped) {
            let x = GameEngine.Input.x;
            let y = GameEngine.Input.y;

            if ((x >= 102.5 && x <= 102.5 + 115) && (y >= 260 && y <= 260 + 70)) {
                GameEngine.changeState('Splash');
            }
            GameEngine.Input.tapped = false;
        }
        GameEngine.bird.update();
    }

    this.render = function () {
        if (this.banner) {
            GameEngine.Draw.Image(this.banner, 42, 70);
            GameEngine.Draw.Image(this.medal, 75, 183);
            GameEngine.Draw.Image(this.replay, 102.5, 260);
            GameEngine.Draw.text(GameEngine.score.coins, 220, 185, 15, 'black');
            GameEngine.Draw.text(this.highscore, 220, 225, 15, 'black');
        }
    }
}

window.addEventListener('load', GameEngine.init, false);
window.addEventListener('DOMContentLoaded', GameEngine.init, false);

window.addEventListener('resize', GameEngine.resize, false);
