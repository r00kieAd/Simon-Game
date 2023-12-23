const colors = ["red", "blue", "green", "yellow"];
let start = true;
let inGame = false;
let genNewPattern = false;
let level = 1;
let chosenColors = [];
let clickedColors = [];

function addEvents() {
    var randomeNum = parseInt(Math.random() * 4);
    var element = '#' + colors[randomeNum];
    chosenColors.push(element);
    playAudio(element);
}

function playAudio(e) {
    $(e).fadeOut(10);
    $(e + '>audio')[0].play();
    $(e).fadeIn(10);
}

$(document).keypress(function (event) {
    if (event.key === 'A' && start) {
        $('#level-title').text(`Level: ${level}`);
        addEvents();
        start = false;
        inGame = true;
    }
})

async function validateClicks(ce) {
    if (clickedColors.length == chosenColors.length) {
        chosenColors.forEach((e, i) => {
            if (e != clickedColors[i]) {
                inGame = false;
                $('audio')[0].play();
                $('#level-title').text(`Game Over, Reloading in 3..`);
            }
        })
        if (inGame) {
            level++;
            clickedColors = [];
            chosenColors = [];
            $('#level-title').text(`Listen to new pattern...`);
            for (let i = 0; i < level; i++) {
                await new Promise(resolve => setTimeout(resolve, 900))
                    .then(() => { addEvents() });
            }
            setTimeout(() => {
                $('#level-title').text(`Level: ${level}`);
            }, 500)
        } else {
            reloadPage();

        }
    }
}

function reloadPage() {
    async function reloadCount() {
        let r = 2;
        while (r > 0) {
            await new Promise(resolve => setTimeout(resolve, 900)).then(() => {
                $('#level-title').text(`Game Over, Reloading in ${r}..`);
            });
            r--;
        }
    }
    reloadCount();
    setTimeout(() => {
        location.reload();
    }, 3000)
}

// registering clicks
$('#red').click(() => {
    if (inGame) {
        clickedColors.push('#red');
        validateClicks('#red');
        playAudio('#red');
    }
})

$('#blue').click(() => {
    if (inGame) {
        clickedColors.push('#blue');
        validateClicks('#blue');
        playAudio('#blue');
    }
})

$('#yellow').click(() => {
    if (inGame) {
        clickedColors.push('#yellow');
        validateClicks('#yellow');
        playAudio('#yellow');
    }
})

$('#green').click(() => {
    if (inGame) {
        clickedColors.push('#green');
        validateClicks('#green');
        playAudio('#green');
    }
})

