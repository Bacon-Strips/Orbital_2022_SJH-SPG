import {mousePools} from './forDemo';

export function huntResult(table) {
    /**
     * For results.result, 
     * -1 : Failure to Attract
     *  0 : Failure to Catch
     *  1 : Successful hunt
     */
    let huntSummary = {cheeseUsed: table.cheeseUsed, result: null, mouse: null }

    // First determine if the cheese even attracts a mouse
    if (table.mousePool.length === 0 || Math.random() > table.AR) {
        huntSummary.result = -1;
        return huntSummary;
    }

    // Then determine the mouse attracted among the pool of mice
    let encounteredMouse = table.attractedMouse();
    huntSummary.mouse = encounteredMouse;

    // Get trap effectiveness that is needed for the catch rate calculation
    huntSummary.result = table.catchAttempt(encounteredMouse);
    return huntSummary;
}

export function huntEntry(huntSummary, table) {
    switch (huntSummary.result) {
        case -1:
            return `I sounded the Hunter's Horn, but my ${huntSummary.cheeseUsed} failed 
                    to attract a mouse.`
        case 0:
            return `I sounded the Hunter's Horn, but it appeared ${huntSummary.mouse} 
                    had eaten a piece of cheese without setting it off.`
        case 1:
            return `I sounded the Hunter's Horn and was successful in the hunt!
                    I caught a ${huntSummary.mouse} worth ${table.miceData[huntSummary.mouse].point} points and ${table.miceData[huntSummary.mouse].gold}\
                    gold.`
        default:
            return 'Error';
    }
}



/**
 * @property {Object} DataTable             An object storing data to use during simulation
 * @property {Object} DataTable.mousePool   Array of objects storing the pool of mice that can be attracted
 * @property {Object} DataTable.miceData    An Object that stores the data of each mice
 * @property {String} DataTable.cheeseUsed  The cheese used during simulation
 * @property {Number} DataTable.AR          The attraction rate of the cheese
 * @property {String} DataTable.location    The location where we are hunting at
 */
export class DataTable {
    /**
     * Generates a DataTable to be used during the simulation
     * @param {String} cheese       Cheese used throughout simulation.
     * @param {Number} power        Power value of the setup.
     * @param {Number} luck         Luck value of the setup.
     * @param {String} trapType     Trap type of the setup.
     * @param {String} location     The location where simulation takes place.
     */
    constructor(cheese, power, luck, trapType, location) {
        this.mousePool = generateMousePool(cheese, location);
        this.mousePool.sort((a,b) => {
            return b.AR - a.AR;
        })
        this.miceData = {};
        for (let mice of this.mousePool) {
            let trapEff = getTrapEff(mice.mouse, trapType);
            let stats = {};
            stats.CR = DataTable.calculatedCR(mice.mouse, power, luck, trapEff);
            stats.gold = fetchGold(mice.mouse);
            stats.point = fetchPoints(mice.mouse);
            this.miceData[mice.mouse] = stats;
        }
        this.cheeseUsed = cheese;
        this.AR = fetchCheeseAR(cheese);
        this.location = location;
    }

    // Returns attracted mouse for this hunt
    attractedMouse() {
        let val = Math.random();
        for (let mice of this.mousePool) {
            if (val <= mice.AR) {
                return mice.mouse;
            }
            val -= mice.AR;
        }   
    }

    // Returns result of a hunt attempt
    catchAttempt(mouse) {
        return Math.random() <= this.miceData[mouse].CR ? 1 : 0;
    }

    // Catch rate forumla sourced from Mousehunt community 
    static calculatedCR(mouse, power, luck, trapEff) {
        return luck >= getminLuck(mouse) ? 1 : 
            (trapEff * power + 2 * 
            Math.pow((Math.floor(Math.min(1.4, trapEff) * luck)), 2)) 
            / (trapEff * power + fetchMousePower(mouse));
    }
}

export function chooseBGColor(huntSummary) {
    switch(huntSummary.result) {
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
    return 50;
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
    return 0.7;
}

// to be implemented with database
function fetchMousePower(mouse) {
    return 10000;
}

// to implement via database
function generateMousePool(cheese, location) {
    // each element of the mousePool contains the mouse name and its attraction rate
    return mousePools[location][cheese];
}