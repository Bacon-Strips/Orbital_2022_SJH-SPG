function huntResult(table) {
    /**
     * For results.result, 
     * -1 : Failure to Attract
     *  0 : Failure to Catch
     *  1 : Successful hunt
     */
    let mousePool = table.mousePool;
    let results = {cheeseUsed: table.cheeseUsed, result: null, mouse: null }

    // First determine if the cheese even attracts a mouse
    if (mousePool.length === 0 || Math.random() > table.cheeseUsed.AR) {
        results.result = -1;
        return results;
    }

    // Then determine the mouse attracted among the pool of mice
    let mouse = attractedMouse(mousePool);
    results.mouse = mouse;

    // Get trap effectiveness that is needed for the catch rate calculation
    if (Math.random() <= table.miceRates[mouse].CR) {
        results.result = 1;
    } else {
        results.result = 0;
    }
    return results;
}

function huntEntry(results, table) {
    switch (results.result) {
        case -1:
            return `I sounded the Hunter\'s Horn, but my ${table.cheeseUsed} failed \
                    to attract a mouse.`
        case 0:
            return `I sounded the Hunter\'s Horn, but it appeared ${results.mouse} \
                    had eaten a piece of cheese without setting it off.`
        case 1:
            return `I sounded the Hunter\'s Horn and was successful in the hunt!\
                    I caught a ${results.mouse} worth ${table.miceRates[results.mouse].point} points and ${table.miceRates[results.mouse].gold}\
                    gold.`
        default:
            return 'Error';
    }
}

function attractedMouse(mousePool) {
    // First sort pool by attraction rates of each mice in descending order
    mousePool.sort((a,b) => {
        return b.AR - a.AR;
    })
    let val = Math.random();
    for (let mice in mousePool) {
        if (val <= mice.AR) {
            return mice.mouse;
        }
        val -= mice.AR;
    }
}

// Catch rate forumla sourced from Mousehunt community 
function calculatedCR(mouse, power, luck, trapEff) {
    // to be implemented with database
    function fetchMousePower(mouse) {
        return 0;
    }
    return luck >= getminLuck(mouse) ? 1 : 
        (trapEff * power + 2 * 
        Math.pow((Math.floor(Math.min(1.4, trapEff) * luck)), 2)) 
        / (trapEff * power + fetchMousePower(mouse));
}

function generateTable(cheese, power, luck, trapType) {
    /**
     * Generate table to be used in simulation at the start
     * mousePool : The pool of mice and their Attraction Rates
     * miceRates : contains the catch rates, gold and points and minimum luck of each mice
     */ 
    let table = {cheeseUsed: {cheese: cheese, AR: fetchCheeseAR(cheese)}, mousePool: [], miceRates:{}};
    table.mousePool = generateMousePool(cheese);
    // mousePool sorted in descending order by their attraction rates
    table.mousePool.sort((a,b) => {
        return b.AR - a.AR;
    })
    // stats of the mouse, including Catch Rate (CR), gold and points. The data can be fetched
    // using the name of the mouse in question.
    for (let mice in table.mousePool) {
        let trapEff = getTrapEff(mice.mouse, trapType);
        let stats = {};
        stats.CR = calculatedCR(mice.mouse, power, luck, trapEff);
        stats.gold = fetchGold(mice.mouse);
        stats.point = fetchPoints(mice.mouse);
        table.miceRates[mice.mouse] = stats;
    }
    return table;
}

function chooseBGColor(results) {
    switch(results.result) {
        case -1:
            return 'unSuccessfulHunt';
        case 0:
            return 'unSuccessfulHunt';
        case 1:
            return 'successfulHunt';
        default:
            return 'Error';
    }
}

//Database functions

// to be implemented with database
function getTrapEff(mouse, trapType) {
    return 2;
}

// to be implemented with database
function getminLuck(mouse) {
    return 2;
}

// to implement via database
function fetchPoints(mouse) {
    return 0;
}

// to implement via database
function fetchGold(mouse) {
    return 0;
}

// to implement via database
function fetchCheeseAR(cheese) {
    return 0.5;
}

// to implement via database
function generateMousePool(cheese) {
    // each element of the mousePool contains the mouse name and its attraction rate
    return [{mouse: 'mouseName1', AR: 0.2}, 
            {mouse: 'mouseName2', AR: 0.2},
            {mouse: 'mouseName3', AR: 0.2}, 
            {mouse: 'mouseName4', AR: 0.2}, 
            {mouse: 'mouseName5', AR: 0.2}]
}