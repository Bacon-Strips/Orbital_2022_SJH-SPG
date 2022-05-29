const resultPanel = document.querySelector('#results');

//Mock values for debugging and design use
//These are user inputs from the webpage
let mockCheese = 'Superbrie+';
let mockLocation = 'Floating Islands';

//These are values to be retrieved from database from backend
let mockMouse = 'White Mouse';
let mockCatchRate = 0.5;
let mockAttractRate = 0.9;
let mockPoint = 100;
let mockGold = 100;

function simulate() {
    if (resultPanel.textContent != '') {
        clearEntries();
    }
    for (let i = 1; i <= 10; i++) {
        let entry = document.createElement('div');
        let huntResult = result(mockAttractRate, mockCatchRate);
        entry.innerHTML += `<p>Hunt #${i} - ${mockLocation}</p>`
        entry.innerHTML += `<p>${huntEntry(huntResult)}</p>`;
        entry.className = `${chooseBGColor(huntResult)} entries`;
        resultPanel.appendChild(entry);
        /**
        let succ = document.createElement('p');
        succ.textContent = huntResult.toString();
        succ.style.backgroundColor = huntResult ? 'LightGoldenRodYellow' : 'LightPink';
        resultPanel.appendChild(succ);

        let lineBreak = document.createElement('hr');
        lineBreak.className = 'lineBreak';
        resultPanel.appendChild(lineBreak);
        */
    }
}

function clearEntries() {
    resultPanel.textContent = '';
}



function result(attractRate, catchRate) {
    /**
     * -1 : Failure to Attract
     *  0 : Failure to Catch
     *  1 : Successful hunt
     */
    return Math.random() > attractRate ? -1 : (Math.random() <= catchRate ? 1 : 0);
}

function huntEntry(result) {
    switch (result) {
        case -1:
            return `I sounded the Hunter\'s Horn, but my ${mockCheese} failed \
                    to attract a mouse.`
            break;
        case 0:
            return `I sounded the Hunter\'s Horn, but it appeared ${mockMouse} \
                    had eaten a piece of cheese without setting it off.`
            break;
        case 1:
            return `I sounded the Hunter\'s Horn and was successful in the hunt!\
                    I caught a ${mockMouse} worth ${mockPoint} points and ${mockGold}\
                    gold.`
            break;
        default:
            return 'Error';
            break;
    }
}

function chooseBGColor(result) {
    switch(result) {
        case -1:
            return 'unSuccessfulHunt';
            break;
        case 0:
            return 'unSuccessfulHunt';
            break;
        case 1:
            return 'successfulHunt';
    }
}