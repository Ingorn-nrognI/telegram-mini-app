[test_BobrUp.html](https://github.com/user-attachments/files/26309962/test_BobrUp.html)
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Beaver Run</title>
<style>
body {
    margin: 0;
    text-align: center;
    background: #87CEEB;
}
#menu {
    position: absolute;
    width: 100%;
    top: 30%;
}
button {
    padding: 15px 30px;
    font-size: 18px;
    margin: 10px;
}
canvas {
    display: none;
    margin: auto;
    background: lightgreen;
}
</style>
</head>
<body>

<div id="menu">
    <h1>🦫 Beaver Run</h1>
    <button onclick="startGame()">Играть</button>
</div>

<canvas id="game" width="400" height="600"></canvas>

<script>
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");

let beaver = { x: 180, y: 500, vy: 0 };
let gravity = 0.6;

function startGame() {
    menu.style.display = "none";
    canvas.style.display = "block";
    document.addEventListener("click", jump);
    update();
}

function jump() {
    if (beaver.y >= 500) {
        beaver.vy = -10;
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    beaver.vy += gravity;
    beaver.y += beaver.vy;

    if (beaver.y > 500) {
        beaver.y = 500;
        beaver.vy = 0;
    }

    ctx.fillStyle = "brown";
    ctx.fillRect(beaver.x, beaver.y, 40, 40);

    requestAnimationFrame(update);
}
</script>

</body>
</html>
