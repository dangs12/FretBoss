/////////////////// GLOBAL VARIABLES ///////////////
let seg, min, time, noteP, inputSettings, init, tto,
withHelp, dotArray, timerLoop, timerTrigger, noteLoop, firstNote,
loopTrigger;


///////////////////// INPUTS ///////////////////////
//// Freatboard Help

// Create freatboard
let helpCheck = document.querySelector('#help-check');
helpCheck.addEventListener('click', showFreat);
function showFreat() {
    if (this.checked) {
        withHelp = true;
         let helpDiv = document.createElement('div');
         helpDiv.setAttribute("id", "help-box");
         document.querySelector('#active-box').appendChild(helpDiv);
         let freatImg = document.createElement('img');
         freatImg.setAttribute('id','freat-img');
         freatImg.setAttribute('src', 'https://i.imgur.com/VDeesRX.png')
         document.querySelector('#help-box').appendChild(freatImg);
         // Create circles and dots
        let idDot = ['E', 'A', 'D', 'G', 'B', 'e'];
        for (let i = 0; i < 6; i++) {
            let helpDot = document.createElement('span');
            helpDot.setAttribute('id', 'dot-' + idDot[i]);
            helpDot.setAttribute('class', 'dot');   
            helpDot.style.backgroundColor = 'rgba(0, 0, 0, 0)';   
            document.querySelector('#help-box').appendChild(helpDot);
        }
        let idCircle = ['one', 'two'];
        for (let i = 0; i < 2; i++) {
            let helpCircle = document.createElement('div');
            helpCircle.setAttribute('id', 'circle-' + idCircle[i]);
            helpCircle.setAttribute('class', 'circle');    
            helpCircle.style.color = 'rgba(0, 0, 0, 0)';

            document.querySelector('#help-box').appendChild(helpCircle);
        }


    } else {
        withHelp = false;
        document.querySelector('#help-box').remove();
    }
}

// Show notes on freatboard
function dotFretFun (pos, repr) {
    dotArray = ['#dot-E', '#dot-A', '#dot-D', '#dot-G', '#dot-B', '#dot-e'];
    let dotLeft = [23, 12, 1, -13, -24, -35];

    if (repr == 'letters') {
        pos == 0 ? pos = 12 : pos;
        let fret = [pos + 5, pos, pos + 7, pos + 2, pos + 10, pos + 5];
        for (let i = 0; i < fret.length; i++) {
            fret[i] > 12 ? fret[i] -= 12 : fret[i] = fret[i];
        }
        // Dots
    
        for (let j = 0; j < 6; j++) {
            document.querySelector(dotArray[j]).style.left = (dotLeft[j] + (29 * fret[j])) + 'px';
        }
        // Circle
        if ([7, 12, 5, 10, 2].includes(pos)) {
            let fretCircle1 = -56 - ([7, 12, 5, 10, 2].indexOf(pos) * 20); 
            document.querySelector('#circle-one').style.top = fretCircle1 + 'px';
            document.querySelector('#circle-one').style.color = '#f8961e';
            if (pos == 7) {
                document.querySelector('#circle-two').style.color = '#f8961e'; 
            } else {
                document.querySelector('#circle-two').style.color = 'rgba(0, 0, 0, 0)';
            }
        } else {
            document.querySelector('#circle-one').style.color = 'rgba(0, 0, 0, 0)';
            document.querySelector('#circle-two').style.color = 'rgba(0, 0, 0, 0)';
        }
    }
    
    if (repr == 'sheet') {
        //All blank
        for (let j = 0; j < 6; j++) {
            document.querySelector(dotArray[j]).style.backgroundColor = 'rgba(0, 0, 0, 0)'; 
        }
        document.querySelector('#circle-one').style.color = 'rgba(0, 0, 0, 0)';
        document.querySelector('#circle-two').style.color = 'rgba(0, 0, 0, 0)';
        
        let refObj = {
            0: [[dotArray[0], 0]],
            1: [[dotArray[0], 1]],
            2: [[dotArray[0], 3]],
            3: [[dotArray[0], 5], [dotArray[1], 0]],
            4: [[dotArray[0], 7], [dotArray[1], 2]],
            5: [[dotArray[0], 8], [dotArray[1], 3]],
            6: [[dotArray[0], 10], [dotArray[1], 5], [dotArray[2], 0],],
            7: [[dotArray[0], 12], [dotArray[1], 7], [dotArray[2], 2],],
            8: [[dotArray[1], 8], [dotArray[2], 3], [dotArray[0], 13]],
            9: [[dotArray[1], 10], [dotArray[2], 5], [dotArray[3], 0],],
            10: [[dotArray[1], 12], [dotArray[2], 7], [dotArray[3], 2],],
            11: [[dotArray[2], 9],[dotArray[3], 4], [dotArray[4], 0]],
            12: [[dotArray[2], 10], [dotArray[3], 5], [dotArray[4], 1],],
            13: [[dotArray[2], 12], [dotArray[3], 7], [dotArray[4], 3],],
            14: [[dotArray[3], 9], [dotArray[4], 5], [dotArray[5], 0]],
            15: [[dotArray[0], 10], [dotArray[4], 6], [dotArray[5], 1]],
            16: [[dotArray[0], 12], [dotArray[4], 8], [dotArray[5], 3]],
            17: [[dotArray[4], 10], [dotArray[5], 5]],
            18: [[dotArray[4], 12], [dotArray[5], 7]],
            19: [[dotArray[5], 8], [dotArray[4], 13]], 
            20: [[dotArray[5], 10]],
            21: [[dotArray[5], 12]]
        }
 
        let local = refObj[pos[0].toString()];
        for (let i = 0; i < local.length; i++) {
            if (pos[1] == '#') {
                local[i][1] += 1;
            } else if (pos[1] == '♭') {
                local[i][1] -= 1;
            }

            if (local[i][1] == 0) {
                let fretCircle1 = -56 - (dotArray.indexOf(local[i][0]) * 20); 
                document.querySelector('#circle-one').style.top = fretCircle1 + 'px';
                document.querySelector('#circle-one').style.color = '#f8961e';
            } else if (local[i][1] > 0 && local[i][1] <= 12) { 
                document.querySelector(local[i][0]).style.left = (dotLeft[dotArray.indexOf(local[i][0])] + (29 * local[i][1])) + 'px';
                document.querySelector(local[i][0]).style.backgroundColor = '#f8961e';   
            }
          
        }
    }
}

//// Timer
// Create timer input
let timerCheck = document.querySelector('#timer-check');
timerCheck.addEventListener('change', showTimer);
function showTimer() {
    if (this.checked) {
        let timerDiv = document.createElement('div');
        timerDiv.setAttribute("id", "timer-box");

        let timerLabel = document.createElement('label');
        timerLabel.setAttribute('for', 'timer');
        timerLabel.textContent = 'Timer (in minutes):  ';

        let timerInput = document.createElement('input');
        timerInput.setAttribute('id', 'timer');
        timerInput.setAttribute('type', 'number');
        timerInput.setAttribute('min', 1)

        timerDiv.appendChild(timerLabel);
        timerDiv.appendChild(timerInput);
        document.querySelector('#sound-help-box').appendChild(timerDiv);
        
        timerInput.addEventListener('input', function() {
            seg = [0];
            min = [this.value];
            for (let j = min[0] - 1; j >= 0; j--) {
                for (let i = 1; i <= 60; i++) {
                min.push(j);
                seg.push(60 - i);
                }
            }    
        });
        } else {
        document.querySelector('#timer-box').remove();
    }
}

// Run timer
function timer() {
    if (seg[time] > 0 || min[time] > 0) {
        if(seg[time].toString().length == 1) {
            document.querySelector('#ready').textContent = min[time] + ':' + '0' + seg[time];
        } else {
            document.querySelector('#ready').textContent = min[time] + ':' + seg[time];
        } 
    } else {
        stopFun(noteLoop, firstNote, loopTrigger, timerLoop, 
            timerTrigger);
    }
    time++

}


///////////////// FUNCTIONS ///////////////// 
// Postion of notes on sheet
let qnotObj = {
    top: [],
    transform: []
} 

let linesObj = {
    top: [],
    transform: [],
    display: []
} 

let accObj = {
    top_sharp: [],
    top_flat:[]
} 

for (let i = 0; i <= 21; i++) {
    //Accidents
    if (i >= 6 && i < 17) {
        accObj['top_sharp'].push(-101 - (9 * i) + 'px');
        accObj['top_flat'].push(-111 - (9 * i) + 'px');
    } else {
        accObj['top_sharp'].push(-155 - (9 * i) + 'px');
        accObj['top_flat'].push(-165 - (9 * i) + 'px');
    }

    if(i <= 5) {
        qnotObj['top'].push(-126 - (9 * i) + 'px');
        qnotObj['transform'].push('rotate(0deg)');
    } else if (i <= 8) {
        qnotObj['top'].push (-73 - (9 * i) + 'px');
        qnotObj['transform'].push('rotate(0deg)')
    } else if (i <= 16) {
        qnotObj['top'].push(-28 - (9 * i) + 'px');
        qnotObj['transform'].push('rotate(180deg)');
    } else if (i <= 21) {
        qnotObj['top'].push(-82 - (9 * i) + 'px');
        qnotObj['transform'].push('rotate(180deg)');
    } 
    // Lines
    if (i >= 0 && i <= 5 || i >= 17 && i <= 21) {
        linesObj['display'].push('inline');
        if (i == 0 || i == 2 || i == 4) {
            linesObj['top'].push(-80 - (9 * i) + 'px');

        } else if (i == 17 || i == 19 || i == 21) {
            linesObj['top'].push(-35 - (9 * i) + 'px');
    } else {
        linesObj['top'].push(linesObj['top'][i - 1]);
    }
        if (i >= 0 && i <= 5) {
            linesObj['transform'].push('rotate(180deg)');
        } else {
            linesObj['transform'].push('rotate(0deg)');
        }
    } else {
        linesObj['top'].push('0px');
        linesObj['display'].push('none');
        linesObj['transform'].push('rotate(0deg)');
    }
}


// Display notes on sheet 
function displayQNote(arrayArg) {
    let i = arrayArg[0];
    //Qnote
    document.querySelector('#qnote').style.top = qnotObj['top'][i];
    document.querySelector('#qnote').style.transform = qnotObj['transform'][i]; 
    document.querySelector('#qnote').style.display = 'inline'; 

    //Lines
    document.querySelector('#lines').style.top = linesObj['top'][i];
    document.querySelector('#lines').style.top.transform = linesObj['transform'][i];
    document.querySelector('#lines').style.display = linesObj['display'][i];
    
    //Accidents
    if (arrayArg[1] == '♭') {
        document.querySelector('#flat-img').style.top = accObj['top_flat'][i];  
        document.querySelector('#flat-img').style.display = 'inline';
        document.querySelector('#sharp-img').style.display = 'none';
        
    } else if (arrayArg[1] == '#') {
        document.querySelector('#sharp-img').style.top = accObj['top_sharp'][i];
        document.querySelector('#sharp-img').style.display = 'inline';
        document.querySelector('#flat-img').style.display = 'none';

    } else {
        document.querySelector('#sharp-img').style.display = 'none';
        document.querySelector('#flat-img').style.display = 'none';
    }
}    

// Display letter note
function displayNote(noteArg) {        
    if(noteP) {
        noteP.remove();
    }
    noteP = document.createElement('p');
    noteP.textContent = noteArg;
    document.querySelector('#notes-box').appendChild(noteP);
}

// Random number generator
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

// Getting random note
let notes = {
    eng_sharp: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
    eng_flat: ['A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭'],
    latin_sharp: ['Lá', 'Lá#', 'Si', 'Dó', 'Dó#', 'Ré', 'Ré#', 'Mi', 'Fá', 'Fá#', 'Sol', 'Sol#'],
    latin_flat: ['Lá', 'Si♭', 'Si', 'Dó', 'Ré♭', 'Ré', 'Mi♭', 'Mi', 'Fá', 'Sol♭', 'Sol', 'Lá♭'],
}

function randomNote() {
    let rndNumNote, rndSett, rndNote, hasAcc, octv, acc;
    
    
    if (inputSettings['repr'] == 'letters') {
        rndNumNote = randomNumber(0, 12);
        if (inputSettings['notation'] == 'english' ) {
            if (inputSettings['accidents'] == 'sharp') {
                rndNote = notes['eng_sharp'][rndNumNote];
            } else if (inputSettings['accidents'] == 'flat') {
                rndNote = notes['eng_flat'][rndNumNote];
            } else if (inputSettings['accidents'] == 'both') {
                rndSett = Object.keys(notes)[randomNumber(0, 2)];
                rndNote = notes[rndSett][rndNumNote];
            }
        } else if (inputSettings['notation'] == 'latin') {
            if (inputSettings['accidents'] == 'sharp') {
                rndNote = notes['latin_sharp'][rndNumNote];
            } else if (inputSettings['accidents'] == 'flat') {
                rndNote = notes['latin_flat'][rndNumNote];
            } else if (inputSettings['accidents'] == 'both') {
                rndSett = Object.keys(notes)[randomNumber(2, 4)];
                rndNote = notes[rndSett][rndNumNote];
            }
        } else if (inputSettings['notation'] == 'mixed') {
            if (inputSettings['accidents'] == 'sharp') {
                rndSett = Object.keys(notes)[[0, 2][randomNumber(0, 2)]];
                rndNote = notes[rndSett][rndNumNote];
            } else if (inputSettings['accidents'] == 'flat') {
                rndSett = Object.keys(notes)[[1, 3][randomNumber(0, 2)]];
                rndNote = notes[rndSett][rndNumNote];
            } else if (inputSettings['accidents'] == 'both') {
                rndSett = Object.keys(notes)[[0, 1, 2, 3][randomNumber(0, 4)]];
                rndNote = notes[rndSett][rndNumNote];
            }
        }
        displayNote(rndNote);
        if (withHelp) {
            dotFretFun(rndNumNote, inputSettings['repr']);
        }
                
    } else if (inputSettings['repr'] == 'sheet') {
        rndNumNote = randomNumber(0, 7);
        octv = randomNumber(0, 3);
        hasAcc = [true, false][randomNumber(0, 2)];
        if (hasAcc) {
            switch (inputSettings['accidents']) {
                case 'sharp': 
                    acc = '#';
                    break;
                case 'flat':
                    acc = '♭';
                    break;
                case 'both':
                    acc = ['#', '♭'][randomNumber(0, 2)]
                    break; 
            }
        }
        // Removing E0 flat e D2 sharp
        while (rndNumNote + (octv * 7) == 0 && acc == '♭' ||
        rndNumNote + (octv * 7) == 21 && acc == '#') {
            rndNumNote = randomNumber(0, 7);
            octv = randomNumber(0, 3);
        }

        rndNote = [rndNumNote + (octv * 7), acc];
        displayQNote(rndNote);
        if (withHelp) {
            dotFretFun(rndNote, inputSettings['repr']);
        }
    }

}


// Create 3..2..1
function ttoFun() {
    if (init > 0) {
        document.querySelector('#ready').textContent = init;;
        init--;
    } else {
        clearInterval(tto);
        document.querySelector('#ready').textContent = '';
        init = 3;
    }
 }

//////////////////// ACTION //////////////////////////
document.querySelector('#go-button').addEventListener('click', action);
let loop, first;

function action() {
    // Getting settings
    inputSettings = {
        repr: document.querySelector('input[name=representation]:checked').value,
        notation:document.querySelector('input[name=notation]:checked').value,
        accidents: document.querySelector('input[name=flatsharp]:checked').value,
        speed: parseInt(document.querySelector('#speed').value) * 1000
    }
    
    // Show sheet imgs
    if (inputSettings['repr'] == 'sheet') {
        //////SIMPLIFICAR!!!!!//////////////////////////////////////////////
        // Show  and load sheet imgs
        let sheetImg = document.createElement('img');
        sheetImg.setAttribute('src', 'https://i.imgur.com/tUD11rA.png');
        sheetImg.setAttribute('id', 'sheet');
        document.querySelector('#notes-box').appendChild(sheetImg);
        
        let linesImg = document.createElement('img');
        linesImg.setAttribute('src', 'https://i.imgur.com/06sEaIk.png');
        linesImg.setAttribute('id', 'lines');
        document.querySelector('#notes-box').appendChild(linesImg);  
        
        let qnoteImg = document.createElement('img');
        qnoteImg.setAttribute('src', 'https://i.imgur.com/PvUnoRB.png');
        qnoteImg.setAttribute('id', 'qnote');
        document.querySelector('#notes-box').appendChild(qnoteImg);
        
        let flatImg = document.createElement('img');
        flatImg.setAttribute('src', 'https://i.imgur.com/sSOpfdy.png');
        flatImg.setAttribute('id', 'flat-img');
        document.querySelector('#notes-box').appendChild(flatImg);
        
        let sharpImg = document.createElement('img');
        sharpImg.setAttribute('src', 'https://i.imgur.com/2obBrUq.png');
        sharpImg.setAttribute('id', 'sharp-img');
        document.querySelector('#notes-box').appendChild(sharpImg);
    }
    
    // Remove ready
    document.querySelector('#ready').textContent = '';

    // Start 3..2..1
    init = 3;
    ttoFun();
    tto = setInterval(ttoFun, 1000);

    // Start timer
    if (document.querySelector('#timer-box')) {
        time = 0;
        timerTriggerFun = function(){
            timerLoop = setInterval(timer, 1000);
        }
        setTimeout(timer, 3000);
        timerTrigger = setTimeout(timerTriggerFun, 3000);
    }
    
      // Start notes
    let noteTriggerFun = function() {
        noteLoop = setInterval(randomNote, inputSettings['speed']);
    }
    firstNote = setTimeout(randomNote, 3000);
    loopTrigger = setTimeout(noteTriggerFun, 3000);

     // Create button stop and exclude go
     stopButton = document.createElement('button');
     stopButton.setAttribute('class', 'buttons');
     stopButton.setAttribute('id', 'stop-button');
     stopButton.textContent = 'Stop';
     document.querySelector('#button-box').appendChild(stopButton);
     document.querySelector('#stop-button').addEventListener('click',
     function(){
         stopFun(noteLoop, firstNote, loopTrigger, timerLoop, 
             timerTrigger);
     });
     document.querySelector('#go-button').remove();
}

// Stop Button
function stopFun(argLoop, argFirst, argLoopTrigger,
     argLoopTimer, argTimerTigger) {
    init = 3
    clearInterval(argLoop);
    clearTimeout(argFirst);
    clearTimeout(argLoopTrigger);
    
    clearInterval(argLoopTimer);
    clearTimeout(argTimerTigger);
    
    clearInterval(tto);

    document.querySelector('#ready').textContent = 'Ready?';
    let notesBox = document.querySelector('#notes-box');
    while (notesBox.firstChild) {
        notesBox.firstChild.remove();
    }
        document.querySelector('#stop-button').remove();
        goButton = document.createElement('button');
        goButton.setAttribute('class', 'buttons');
        goButton.setAttribute('id', 'go-button');
        goButton.textContent = 'Play';
        document.querySelector('#button-box').appendChild(goButton);
        document.querySelector('#go-button').addEventListener('click',
         action);
    
    if (document.querySelector('#help-box')) {
        for (let j = 0; j < 6; j++) {
            document.querySelector(dotArray[j]).style.backgroundColor = 'rgba(0, 0, 0, 0)'; 
        }
        document.querySelector('#circle-one').style.color = 'rgba(0, 0, 0, 0)';
        document.querySelector('#circle-two').style.color = 'rgba(0, 0, 0, 0)';
        
    }
}


