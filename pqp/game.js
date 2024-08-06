let food = 0;


let scoreing = document.querySelector("#score");
scoreing.textContent = food;
let can = document.querySelector('#jirung');
let ji = can.getContext('2d');

can.width = window.innerWidth - 100;
can.height = window.innerHeight - 100;
let buger = new Image();
buger.src = 'buger.png';
let fish = new Image();
fish.src = '물고기.png';
let apple = new Image();
apple.src = '사과.png';
let mango = new Image();
mango.src = '망고.png';
let pizza = new Image();
pizza.src = '피자.png';


let jirungeface = new Image();


let jirunge = {
    body: [{ x: 700, y: 300 }],
    width : 50,  
    height : 50,
    draw() {
        ji.fillStyle = 'brown';
        for (let i = 1; i < this.body.length; i++) {
            ji.fillRect(this.body[i].x, this.body[i].y, this.width, this.height);
        }
        ji.drawImage(jirungeface, this.body[0].x, this.body[0].y, this.width, this.height);
    },
    move(x, y) {
        const head = { x: this.body[0].x + x, y: this.body[0].y + y };
        this.body.unshift(head);
        this.body.pop();
    },
    grow() {
        const tail = this.body[this.body.length - 1];
        this.body.push({ x: tail.x+tail.x, y: tail.y+tail.y });
    }
};

jirunge.draw();

let fn = Math.floor((Math.random() * 5));

class handicap {
    constructor () {
        this.width = 50;
        this.height = 50;

        this.x = Math.random() * (can.width - this.width);
        this.y = Math.random() * (can.height - this.height);
    }
    draw() {
        switch (fn) {
            case 0 : 
                ji.drawImage(buger, this.x, this.y, 50, 50);
                break;
            case 1 :
                ji.drawImage(apple, this.x, this.y, 50, 50);
                break;
            case 2 : 
                ji.drawImage(mango, this.x, this.y, 50, 50);
                break;
            case 3 : 
                ji.drawImage(fish, this.x, this.y, 50, 50);
                break;
            case 4 :
                ji.drawImage(pizza, this.x, this.y, 50, 50);
                break;
        }
        
        
    }
}

let wkddo = new handicap();
wkddo.draw();

let x = 0;
let y = 0;

function fooding(wkddo, jirunge) {
    let breakx = Math.abs(wkddo.x - jirunge.body[0].x);
    let breaky = Math.abs(wkddo.y - jirunge.body[0].y);
    if (breakx <= jirunge.width && breaky <= jirunge.height) {
        ++food;
        scoreing.textContent = food;
        if (food == 20) location.replace("clear.html");
        fn = Math.floor(Math.random() * 5);
        wkddo.x = Math.random() * (can.width - wkddo.width);
        wkddo.y = Math.random() * (can.height - wkddo.height);
        return true;
    }
    return false;
}

let cooltime = true;
let time = document.querySelector("#time");
let realtime = new Date().getMilliseconds;

document.addEventListener("keydown", controler);
document.addEventListener("keypress",space);

function space (btn) {
    if (cooltime) {
        if (btn.code === 'Space') {
            if (x === 0) {
                if (y < 0) {
                    y = -20 - food;
                    setTimeout(function () {
                        y = -3 - food - 1;
                    }, 1000);
                }
                else {
                    y = 20 + food;
                    setTimeout(function () {
                        y = 3 + food + 1;
                    }, 1000);
                }
                
            } 
            if (y === 0) {
                if (x < 0) {
                    x = -20 - food;
                    setTimeout(function () {
                        x = -3 - food - 1;
                    }, 1000);
                }
                else {
                    x = 20 + food;
                    setTimeout(function () {
                        x = -3 - food - 1;
                    }, 1000);
                }
            }
        }

        cooltime  = false;
        time.textContent = "사용불가 . .";
        setTimeout(function(){
            cooltime = true;
            time.textContent = "사용가능";
        }, 10000);
    }
}


function controler(btn) {
    if (btn.code === 'ArrowRight' && x == 0) {
        x = 3 + food + 1;
        y = 0;
    } else if (btn.code === 'ArrowLeft' && x == 0) {
        x = -3 - food - 1;
        y = 0;
    } else if (btn.code === 'ArrowUp' && y == 0) {
        x = 0;
        y = -3 - food - 1;
    } else if (btn.code === 'ArrowDown' && y == 0) {
        x = 0;
        y = 3 + food + 1;
    }
}

    


function frame() {
    requestAnimationFrame(frame);
    ji.clearRect(0, 0, can.width, can.height);
    wkddo.draw();
    jirunge.draw();
    jirunge.move(x, y); 
    if (fooding(wkddo, jirunge)) {
        jirunge.grow();
    }
    breaking(jirunge);
}
frame();

function breaking(jirunge) {
    let head = jirunge.body[0];
    if (head.x < 0 || head.y < 0 || head.x + jirunge.width > can.width || head.y + jirunge.height > can.height) {
        location.replace("die.html");
    }
    for(let i = 1; i < this.body.length; ++i) {
        if(this.body[0].x === this.body[i].x && this.body[0].y === this.body.y[i])
            location.replace("die.html");
    }
}



