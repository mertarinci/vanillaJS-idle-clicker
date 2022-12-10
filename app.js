



// DATA

let gameData = {
    username: "Mert",
    lemon: {
        count: 0,
        price: 5
    },
    cucumber: {
        count: 0,
        price: 20,
        isLocked: true
    },
    carrot: {
        count: 0,
        price: 100,
        isLocked: true
    },
    olive: {
        count: 0,
        price: 300,
        isLocked: true
    },

    worker: {
        count: 0,
        price: function () { return (this.totalCount() + 1) * 35 },
        lemon: 0,
        lemonCollect: 0.5,
        totalCount: function () { return this.count + this.lemon + this.cucumber + this.carrot + this.olive },
        totalLemonProd: function () { return this.lemon * this.lemonCollect },
        cucumber: 0,
        cucumberCollect: 0.25,
        totalCucumberProd: function () { return this.cucumber * this.cucumberCollect },
        carrot: 0,
        carrotCollect: 0.10,
        totalCarrotProd: function () { return this.carrot * this.carrotCollect },
        olive: 0,
        oliveCollect: 0.05,
        totalOliveProd: function () { return this.olive * this.oliveCollect },
    },

    totalMoney: 0,
    storageLevel: 1,
    storageCapacity: function () { return Math.pow(this.storageLevel, 2) * 10 },

    storagePrice: function () { return Math.pow(this.storageLevel, 2) * 10 },

}


// let username = prompt("Please enter your name", "Mert")
// gameData.username = username.substring(0, 10)

document.querySelector(".username").innerHTML = `${gameData.username}'s Garden`






// Selectors

const storageCapacitySpan = document.querySelectorAll(".storageCapacity")
const sellButtons = document.querySelectorAll(".market-item")
const deleteWorkersButtons = document.querySelectorAll(".deleteWorker")
const addWorkersButtons = document.querySelectorAll(".addWorker")
const unlockBtn = document.querySelectorAll(".unlockBtn")
const collectButtons = document.querySelectorAll(".fa-solid")




const storageLevelSpan = document.querySelector(".storageLevel")
const lemonCountSpan = document.querySelector(".lemonCount")
const cucumberCountSpan = document.querySelector(".cucumberCount")
const carrotCountSpan = document.querySelector(".carrotCount")
const oliveCountSpan = document.querySelector(".oliveCount")
const totalMoneySpan = document.querySelector(".totalMoney")
const storagePriceSpan = document.querySelector(".storagePrice")
const workerPriceSpan = document.querySelector(".workerPrice")
const totalWorkersSpan = document.querySelector(".totalWorkers")
const upgradeStorageBtn = document.querySelector(".upgradeStorage")
const buyWorkerBtn = document.querySelector(".buyWorker")
const lemonWorkersSpan = document.querySelector(".lemonWorkers")
const lemonProductionSpan = document.querySelector(".lemonCollect")
const cucuWorkerSpan = document.querySelector(".cucuWorker")
const cucuProductionSpan = document.querySelector(".cucuCollect")
const carWorkerSpan = document.querySelector(".carWorker")
const carProductionSpan = document.querySelector(".carCollect")
const oliWorkerSpan = document.querySelector(".oliWorker")
const oliProductionSpan = document.querySelector(".oliCollect")
const hoverForInfo = document.querySelector(".popover-title")





// Event Listeners

hoverForInfo.addEventListener("mouseenter", function () {
    document.querySelector(".popover-content").style.visibility = "visible"
})

hoverForInfo.addEventListener("mouseleave", function () {
    document.querySelector(".popover-content").style.visibility = "hidden"
})

function collectButtonsListener(collectButtons) {
    for (var i = 0; i < collectButtons.length; i++) {
        collectButtons[i].addEventListener("click", collectProduct);
    }
}

function sellButtonsListener(sellButtons) {
    for (var i = 0; i < sellButtons.length; i++) {
        sellButtons[i].addEventListener("click", sellProduct);
    }
}

function deleteWorkerListener(deleteWorkersButtons) {
    for (var i = 0; i < deleteWorkersButtons.length; i++) {
        deleteWorkersButtons[i].addEventListener("click", deleteWorker);
    }
}

function addWorkerListener(addWorkersButtons) {
    for (var i = 0; i < addWorkersButtons.length; i++) {
        addWorkersButtons[i].addEventListener("click", addWorker);
    }
}

function unlockButtonsListener(unlockBtn) {
    for (var i = 0; i < unlockBtn.length; i++) {
        unlockBtn[i].addEventListener("click", unlockZone);
    }
}


upgradeStorageBtn.addEventListener("click", upgradeStorage)
buyWorkerBtn.addEventListener("click", buyWorker)

// Functions 


function collectProduct(e) {

    let product = e.target.dataset.product


    switch (product) {
        case "lemon":
            if (gameData.lemon.count < gameData.storageCapacity()) {
                gameData.lemon.count += 1
                updateUI()
            } else {
                break;
            }
            break;
        case "cucumber":
            if (gameData.cucumber.count < gameData.storageCapacity()) {
                gameData.cucumber.count += Math.round(0.5 * 100) / 100
                updateUI()
            } else {
                break;
            }
            break;
        case "carrot":
            if (gameData.carrot.count < gameData.storageCapacity()) {
                gameData.carrot.count += 0.2
                updateUI()
            } else {
                break;
            }
            break;
        case "olive":
            if (gameData.olive.count < gameData.storageCapacity()) {
                gameData.olive.count += 0.1
                updateUI()
            } else {
                break;
            }
            break;
        default:
            break;
    }
}

function sellProduct(e) {
    let product = e.target.dataset.product
    switch (product) {
        case "lemon":
            if (gameData.lemon.count > 0) {
                gameData.totalMoney += (gameData.lemon.price * gameData.lemon.count)
                gameData.lemon.count = 0
                updateUI();
            } else {
                break;
            }
            break;
        case "cucumber":
            if (gameData.cucumber.count > 0) {
                gameData.totalMoney += (gameData.cucumber.price * gameData.cucumber.count)
                gameData.cucumber.count = 0
                updateUI();
            } else {
                break;
            }
            break;
        case "carrot":
            if (gameData.carrot.count > 0) {
                gameData.totalMoney += (gameData.carrot.price * gameData.carrot.count)
                gameData.carrot.count = 0
                updateUI();
            } else {
                break;
            }
            break;
        case "olive":
            if (gameData.olive.count > 0) {
                gameData.totalMoney += (gameData.olive.price * gameData.olive.count)
                gameData.olive.count = 0
                updateUI();
            } else {
                break;
            }
            break;
        default:
            break;
    }

}

function upgradeStorage() {
    if (gameData.totalMoney >= gameData.storagePrice()) {
        gameData.totalMoney = gameData.totalMoney - gameData.storagePrice()
        gameData.storageLevel += 1
        updateUI()
    } else {
        return;
    }
}

function buyWorker() {
    if (gameData.totalMoney >= gameData.worker.price()) {
        gameData.totalMoney -= gameData.worker.price();
        gameData.worker.count += 1;
        updateUI();
    }
}

function addWorker(e) {

    let product = e.target.dataset.product


    switch (product) {
        case "lemon":

            if (gameData.worker.count > 0) {
                gameData.worker.lemon += 1
                gameData.worker.count -= 1
                updateUI()
            }

            break;

        case "cucumber":

            if (gameData.worker.count > 0) {
                gameData.worker.cucumber += 1
                gameData.worker.count -= 1
                updateUI()
            }

            break;

        case "carrot":

            if (gameData.worker.count > 0) {
                gameData.worker.carrot += 1
                gameData.worker.count -= 1
                updateUI()
            }

            break;

        case "olive":

            if (gameData.worker.count > 0) {
                gameData.worker.olive += 1
                gameData.worker.count -= 1
                updateUI()
            }

            break;

        default:
            break;
    }


}

function deleteWorker(e) {
    let product = e.target.dataset.product

    switch (product) {
        case "lemon":

            if (gameData.worker.lemon > 0) {
                gameData.worker.lemon -= 1
                gameData.worker.count += 1
                updateUI()
            }

            break;

        case "cucumber":

            if (gameData.worker.cucumber > 0) {
                gameData.worker.cucumber -= 1
                gameData.worker.count += 1
                updateUI()
            }

            break;

        case "carrot":

            if (gameData.worker.carrot > 0) {
                gameData.worker.carrot -= 1
                gameData.worker.count += 1
                updateUI()
            }

            break;
        case "olive":

            if (gameData.worker.olive > 0) {
                gameData.worker.olive -= 1
                gameData.worker.count += 1
                updateUI()
            }

            break;

        default:
            break;
    }

}

function workersWork() {
    setInterval(function () {
        if (gameData.worker.lemon > 0) {
            if (gameData.storageCapacity() === gameData.lemon.count) {
                return;
            } else {

                if (gameData.worker.totalLemonProd() <= (gameData.storageCapacity() - gameData.lemon.count)) {
                    gameData.lemon.count += gameData.worker.totalLemonProd()
                    updateUI()
                } else {
                    gameData.lemon.count = gameData.storageCapacity()
                    updateUI()
                }


            }
        }

        if (gameData.worker.cucumber > 0) {
            if (gameData.storageCapacity() === gameData.cucumber.count) {
                return;
            } else {

                if (gameData.worker.totalCucumberProd() <= (gameData.storageCapacity() - gameData.cucumber.count)) {
                    gameData.cucumber.count += gameData.worker.totalCucumberProd()
                    updateUI()
                } else {
                    gameData.cucumber.count = gameData.storageCapacity()
                    updateUI()
                }


            }
        }

        if (gameData.worker.carrot > 0) {
            if (gameData.storageCapacity() === gameData.carrot.count) {
                return;
            } else {

                if (gameData.worker.totalCarrotProd() <= (gameData.storageCapacity() - gameData.carrot.count)) {
                    gameData.carrot.count += gameData.worker.totalCarrotProd()
                    updateUI()
                } else {
                    gameData.carrot.count = gameData.storageCapacity()
                    updateUI()
                }


            }
        }

        if (gameData.worker.olive > 0) {
            if (gameData.storageCapacity() === gameData.olive.count) {
                return;
            } else {

                if (gameData.worker.totalOliveProd() <= (gameData.storageCapacity() - gameData.olive.count)) {
                    gameData.olive.count += gameData.worker.totalOliveProd()
                    updateUI()
                } else {
                    gameData.olive.count = gameData.storageCapacity()
                    updateUI()
                }


            }
        }
    }, 1000)
}






// UNLOCK ZONES

const cucumberHTML = document.querySelector(".cucumber")
const carrotHTML = document.querySelector(".carrot")
const oliveHTML = document.querySelector(".olive")


function isLocked() {


    if (!gameData.cucumber.isLocked) {

        document.querySelectorAll(".cucuHidden").forEach(item => { item.style.visibility = "visible" })

        document.querySelector(".cucuLocked").style.visibility = "hidden"
    }

    if (!gameData.carrot.isLocked) {

        document.querySelectorAll(".carHidden").forEach(item => { item.style.visibility = "visible" })

        document.querySelector(".carLocked").style.visibility = "hidden"

    }

    if (!gameData.olive.isLocked) {

        document.querySelectorAll(".oliHidden").forEach(item => { item.style.visibility = "visible" })

        document.querySelector(".oliLocked").style.visibility = "hidden"

    }

}





// GAME SAVE

function autoSave() {
    setInterval(function () {

        localStorage.setItem("gameData", JSON.stringify(gameData))

    }, 10000)
}

function loadSavedGame() {


    let savedGame = JSON.parse(localStorage.getItem("gameData"))

    if (savedGame) {

        gameData.lemon = savedGame.lemon
        gameData.totalMoney = savedGame.totalMoney
        gameData.worker.lemon = savedGame.worker.lemon
        gameData.worker.count = savedGame.worker.count
        gameData.storageLevel = savedGame.storageLevel
        gameData.cucumber.count = savedGame.cucumber.count
        gameData.cucumber.isLocked = savedGame.cucumber.isLocked
        gameData.carrot.count = savedGame.carrot.count
        gameData.carrot.isLocked = savedGame.carrot.isLocked
        gameData.olive.count = savedGame.olive.count
        gameData.olive.isLocked = savedGame.olive.isLocked
        gameData.username = savedGame.username

        updateUI()

    }


}


// STARTERS


function updateUI() {
    storageLevelSpan.innerHTML = gameData.storageLevel;
    lemonCountSpan.innerHTML = gameData.lemon.count;
    cucumberCountSpan.innerHTML = Math.floor(gameData.cucumber.count)
    carrotCountSpan.innerHTML = Math.floor(gameData.carrot.count)
    oliveCountSpan.innerHTML = Math.floor(gameData.olive.count)
    totalMoneySpan.innerHTML = `Money: ${Math.floor(gameData.totalMoney)}$`;
    totalWorkersSpan.innerHTML = `Idle Workers: ${gameData.worker.count}`;
    workerPriceSpan.innerHTML = `${gameData.worker.price()}$`;
    storagePriceSpan.innerHTML = `${gameData.storagePrice()}$`
    lemonWorkersSpan.innerHTML = gameData.worker.lemon;
    lemonProductionSpan.innerHTML = `${gameData.worker.totalLemonProd()}`;
    cucuWorkerSpan.innerHTML = gameData.worker.cucumber;
    cucuProductionSpan.innerHTML = `${gameData.worker.totalCucumberProd()}`
    carWorkerSpan.innerHTML = gameData.worker.carrot;
    carProductionSpan.innerHTML = `${Math.floor(gameData.worker.totalCarrotProd() * 100) / 100}`
    oliWorkerSpan.innerHTML = gameData.worker.olive;
    oliProductionSpan.innerHTML = `${Math.floor(gameData.worker.totalOliveProd() * 100) / 100}`




    storageCapacitySpan.forEach(item => {
        item.innerHTML = gameData.storageCapacity()
    })

    isLocked()
}





function unlockZone(e) {

    let product = e.target.dataset.product;

    console.log(product);

    switch (product) {
        case "cucumber":

            if (gameData.lemon.count >= 250) {
                gameData.cucumber.isLocked = false;
                gameData.lemon.count -= 250;
                updateUI()
            } else {
                console.log("Not enough lemons")
            }

            break;

        case "carrot":

            if (gameData.cucumber.count >= 2560) {
                gameData.carrot.isLocked = false;
                gameData.cucumber.count -= 2560;
                updateUI()
            } else {
                console.log("Not enough cucumbers")
            }



            break;

        case "olive":

            if (gameData.carrot.count >= 4000) {
                gameData.olive.isLocked = false;
                gameData.carrot.count -= 4000;
                updateUI()
            } else {
                console.log("Not enough carrots")
            }


            break;


        default:
            break;
    }

}

function cheater() {

    gameData.storageLevel = 999

    gameData.lemon.count = 999
    gameData.cucumber.count = 999
    gameData.carrot.count = 999
    gameData.olive.count = 999
    gameData.worker.count = 999
}




function documentStarter() {

    autoSave();
    workersWork();
    updateUI();
    loadSavedGame();

    unlockButtonsListener(unlockBtn);
    collectButtonsListener(collectButtons);
    sellButtonsListener(sellButtons);
    addWorkerListener(addWorkersButtons);
    deleteWorkerListener(deleteWorkersButtons);

}

documentStarter();




