const ACTIVE_CLASS = 'active';

const navOptions = document.querySelectorAll(`.nav-option`)
const dropdowns = document.querySelectorAll(`.nav-dropdown`);

/** @param index {number}*/
function activateNavHeader(index) {
    navOptions[index].classList.add(ACTIVE_CLASS);
    dropdowns[index].classList.add(ACTIVE_CLASS);
}

/** @param index {number}*/
function deactivateNavHeader(index) {
    navOptions[index].classList.remove(ACTIVE_CLASS);
    dropdowns[index].classList.remove(ACTIVE_CLASS);
}

for (let i = 0; i < navOptions.length; i++) {
    const navOption = navOptions[i];
    navOption.addEventListener('click', () => {
        if (navOption.classList.contains(ACTIVE_CLASS)) {
            deactivateNavHeader(i);
        } else {
            for (let j = 0; j < navOptions.length; j++) {
                deactivateNavHeader(j)
            }
            activateNavHeader(i)
        }
    })
}

/** @type {NodeListOf<Element>[]}*/
const subNavMenus = []

/** @type {NodeListOf<Element>[]}*/
const subNavContents = []

for (let i = 0; i < dropdowns.length; i++) {
    const items = dropdowns[i].querySelectorAll('.sub-nav-menu menu li');
    console.log("i = ", i, " menu li ", items.length);
    subNavMenus.push(items);
    const items1 = dropdowns[i].querySelectorAll('.sub-nav-contents .sub-nav-content');
    console.log("i = ", i, " sub-nav-content ", items1.length);
    subNavContents.push(items1);
}

/**
 * @param i {number}
 * @param j {number}
 */
function activateSubNavItem(i, j) {
    subNavMenus[i][j].classList.add(ACTIVE_CLASS);
    subNavContents[i][j].classList.add(ACTIVE_CLASS);
}

/**
 * @param i {number}
 * @param j {number}
 */
function deactivateSubNavItem(i, j) {
    subNavMenus[i][j].classList.remove(ACTIVE_CLASS);
    subNavContents[i][j].classList.remove(ACTIVE_CLASS);
}

for (let i = 0; i < subNavMenus.length; i++) {
    const subNavMenu = subNavMenus[i];

    for (let j = 0; j < subNavMenu.length; j++) {
        const subNavMenuItem = subNavMenu[j];

        subNavMenuItem.addEventListener('click', () => {
            if (!subNavMenuItem.classList.contains(ACTIVE_CLASS)) {
                for (let k = 0; k < j; k++) {
                    deactivateSubNavItem(i, k);
                }
                activateSubNavItem(i, j);
                for (let k = j + 1; k < subNavMenu.length; k++) {
                    deactivateSubNavItem(i, k);
                }
            }
        })
    }
}

const mobileNavBurger = document.querySelector('.mobile-nav-burger')
const mobileNavMenu = document.querySelector('.mobile-nav-menu')
mobileNavBurger.addEventListener('click', () => {
    if (mobileNavBurger.classList.contains(ACTIVE_CLASS)) {
        mobileNavBurger.classList.remove(ACTIVE_CLASS);
        mobileNavMenu.classList.remove(ACTIVE_CLASS);
    } else {
        mobileNavBurger.classList.add(ACTIVE_CLASS);
        mobileNavMenu.classList.add(ACTIVE_CLASS);
    }
})

const selectableMobileNavItem = document.querySelectorAll('.selectable')
for (const elem of selectableMobileNavItem) {
    elem.addEventListener('click', () => {
        if (elem.classList.contains(ACTIVE_CLASS)) {
            elem.classList.remove(ACTIVE_CLASS);
        } else {
            elem.classList.add(ACTIVE_CLASS);
        }
    })
}
