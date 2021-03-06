// Variables
var bgMusic = new Audio('/Assets/music.mp3')
var ting = new Audio('/Assets/ting.mp3')
var turn = 'X'
var isgameover = false
var turn = 'X'
var sureTxt = document.querySelector('.sureTxt')
var yesBtn = document.querySelector('.yes')
var noBtn = document.querySelector('.no')
var game = `<div class="game">
<div class="mainGame">
<div class="container">
<div class="box bt-0 bl-0"><span class="boxtext"></span></div>
<div class="box bt-0"><span class="boxtext"></span></div>
<div class="box bt-0 br-0"><span class="boxtext"></span></div>
<div class="box bl-0"><span class="boxtext"></span></div>
    <div class="box"><span class="boxtext"></span></div>
    <div class="box br-0"><span class="boxtext"></span></div>
    <div class="box bl-0 bb-0"><span class="boxtext"></span></div>
    <div class="box bb-0"><span class="boxtext"></span></div>
    <div class="box bb-0 br-0"><span class="boxtext"></span></div>
    </div>
</div>
<div class="con">
<div class="sureMsg">
<div class="msg">
    <span class="sureTxt">Are You Sure You Want To Restart The Game?</span>
    <div class="btnCls">
        <button class="yes btn">Yes!</button>
        <button class="no btn">No!</button>
    </div>
</div>
</div>
</div>
<div class="gameInfo">
<div class="extras">
        <span class="info"></span>
        <button id="reset">Restart</button>
    </div>
</div>
</div>
<div></div>
`

// Functions
// func to show that restart window
const showWin = (mainTxt ='Are You Sure You Want To Restart The Game?', btn1='Yes', btn2='No')=>{
    var cont = document.querySelector('.con')
    var con = document.querySelector('.container')
    ting.play()
    cont.style.opacity = '1'
    cont.style.visibility = 'visible'
    con.style.zIndex = '-1'
    var sureTxt = document.querySelector('.sureTxt')
    var yesBtn = document.querySelector('.yes')
    var noBtn = document.querySelector('.no')
    sureTxt.innerHTML=mainTxt
    yesBtn.innerHTML=btn1
    noBtn.innerHTML=btn2
}

// Function to play bgm
function playBGM() {
    bgMusic.loop = true
    bgMusic.play()
}
var body = document.querySelector('.body')

// Function to redirect to main page
function redirect() {
    setInterval(() => {
        window.location.reload()
    }, 3000);
}

// function to go to main game
function func1() {
    ting.play()
    var Player1 = document.getElementById('playerInput1').value
    var Player2 = document.getElementById('playerInput2').value
    sessionStorage.setItem('X', Player1)
    sessionStorage.setItem('0', Player2)
    body.innerHTML = game
    if (body.innerHTML == game) {
        setInterval(() => {
            playBGM()
        }, 1);
        runGame()

        if (!isgameover) {
            document.getElementsByClassName("info")[0].innerText = `${sessionStorage.getItem('X')}'s Turn`
        }

    }
}

// function to start game
// will get triggered onclick start game
function gameStart() {
    var Player1 = document.getElementById('playerInput1').value
    var Player2 = document.getElementById('playerInput2').value

    if (Player1 != '' && Player2 != "") {
        func1()
    }
}

// Game Logic

// function to check win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext')
    let win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    win.forEach(element => {
        if (boxtext[element[0]].innerHTML === boxtext[element[1]].innerHTML && boxtext[element[1]].innerHTML === boxtext[element[2]].innerHTML && boxtext[element[0]].innerHTML != '') {
            isgameover = true
            document.querySelector('.info').innerHTML = sessionStorage.getItem(boxtext[element[0]].innerText) + " Won!<br>Redirecting To Main Page..."
            redirect()
        }
    });
}

// all the content of game page, called in line 70
function runGame() {
    var cont = document.querySelector('.con')
    var con = document.querySelector('.container')
    var yesBtn = document.querySelector('.yes')
    var noBtn = document.querySelector('.no')
    var turnCount = -1

    // func to change turn and also for tie game
    const changeTurn = () => {
        turnCount += 1
        if (turnCount === 8 && isgameover == false) {
            showWin('Game Tied! Well Played, Guys!', 'Restart', "Play Again!")
            yesBtn.addEventListener('click', ()=>{
                ting.play()
                window.location.reload()
            })
            noBtn.addEventListener('click', ()=>{
                ting.play()
                let boxtexts=document.querySelectorAll('.boxtext')
                Array.from(boxtexts).forEach(element => {
                    element.innerHTML=''
                });
                turnCount=-1
                turn='X';
                document.getElementsByClassName("info")[0].innerText = `${sessionStorage.getItem('X')}'s Turn`
                cont.style.opacity = '0'
                cont.style.visibility = 'hidden'
                con.style.zIndex = '999'
            })
        }
        return turn === "X" ? "0" : "X"
    }

    if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText = `${sessionStorage.getItem('X')}'s Turn`
    }

    
    let boxes = document.getElementsByClassName('box');
    let arr = Array.from(boxes)
    arr.forEach(element => {
        var boxText = element.querySelector('.boxtext')

        element.addEventListener('click', () => {
            if (boxText.innerHTML === '') {
                boxText.innerText = `${turn}`
                turn = changeTurn()
                ting.play()
                checkWin()
                
                if (!isgameover) {
                    document.getElementsByClassName("info")[0].innerText = `${sessionStorage.getItem(turn)}'s Turn`;
                }
            }
        })
    })
    let reset = document.querySelector('#reset')
    reset.addEventListener('click', () => {
        showWin()
        yesBtn.addEventListener('click', () => {
            ting.play()
            isgameover = true
            document.location.reload()
        })
        noBtn.addEventListener('click', () => {
            ting.play()
            cont.style.opacity = '0'
            cont.style.visibility = 'hidden'
            con.style.zIndex = '999'
        })
        
    })
}