const ACTIVE = 'active'

/**
 * @typedef {Object} DropdownHeader
 * @property {string} title
 * @property {string[]} subheaders
 */

/**
 * @param headerIndex {number}
 * @return {DropdownHeader}
 */
function getDropdownHeaderData(headerIndex) {
    switch (headerIndex) {
        case 0:
            return {title: 'Продукты', subheaders: ['Вычисления и хранение (IaaS)', 'Бизнес-приложения (SaaS)']}
        case 1:
            return {
                title: 'Профессиональные сервисы',
                subheaders: ['Консалтинг и проектные услуги', 'Профессиональные сервисы и аутсорсинг']
            }
        default:
            throw new RangeError(`Header index ${headerIndex} is not 0 or 1`)
    }
}

/**
 * @typedef {Object} SubDropdownHeader
 * @property {string} title
 * @property {string} text
 */

/**
 * @param headerIndex {number}
 * @param subheaderIndex {number}
 * @return {SubDropdownHeader}
 */
function getSubDropdownHeaderData(headerIndex, subheaderIndex) {
    const subheaderError = new RangeError(`SubHeader index ${subheaderIndex} is not 0 or 1`);
    switch (headerIndex) {
        case 0:
            switch (subheaderIndex) {
                case 0:
                    return {
                        title: 'Вычисления и хранение (IaaS)',
                        text: 'Вычисления и хранение (IaaS)'.repeat(3)
                    }
                case 1:
                    return {
                        title: 'Бизнес-приложения (SaaS)',
                        text: 'Бизнес-приложения (SaaS)'.repeat(3)
                    }
                default:
                    throw subheaderError
            }
        case 1:
            switch (subheaderIndex) {
                case 0:
                    return {
                        title: 'Консалтинг и проектные услуги',
                        text: 'Консалтинг и проектные услуги'.repeat(3)
                    }
                case 1:
                    return {
                        title: 'Профессиональные сервисы и аутсорсинг',
                        text: 'Профессиональные сервисы и аутсорсинг'.repeat(3)
                    }
                default:
                    throw subheaderError
            }
        default:
            throw new RangeError(`Header index ${headerIndex} is not 0 or 1`)
    }
}

/**
 * @param subDropdownHeader {SubDropdownHeader}
 * @return {string}
 */
function generateSubDropdownHeaderHTML(subDropdownHeader) {
    return `<h3>${subDropdownHeader.title}</h3>
            <p>${subDropdownHeader.text}</p>`
}

/**
 * @param dropdownHeader {DropdownHeader}
 * @param content {string}
 * @return {string}
 */
function generateDropdownHeaderHTML(dropdownHeader, content) {
    const first = `<li class="active">${dropdownHeader.subheaders[0]}</li>`
    const items = dropdownHeader
        .subheaders
        .slice(1)
        .map(str => `<li>${str}</li>`)
        .join("\n")
    return `<div class="sub-nav-menu">
                <h2>${dropdownHeader.title}</h2>
                <menu>
                    ${first}
                    ${items}
                </menu>
            </div>
            <div id="nav-dropdown-content">${content}</div>`
}

/**
 * @param {number} headerIndex
 * @param {number} subheaderIndex
 * @return {string}
 */
const generateNewSubDropdownHeaderHTML = (headerIndex, subheaderIndex) => generateSubDropdownHeaderHTML(getSubDropdownHeaderData(headerIndex, subheaderIndex));

/**
 * @param headerIndex {number}
 * @return {string}
 */
const generateNewDropdownHeader = headerIndex => generateDropdownHeaderHTML(
    getDropdownHeaderData(headerIndex),
    generateNewSubDropdownHeaderHTML(headerIndex, 0)
);

const navOptions = document.querySelectorAll(`.nav-option`)

/*
<div class="sub-nav-menu">
            <h2>Продукты</h2>
            <menu>
                <li class="active">Вычисления и хранение (IaaS)</li>
                <li>Бизнес-приложения (SaaS)</li>
            </menu>
        </div>
        <div id="nav-dropdown-content">
            <h3>Вычисления и хранение (IaaS)</h3>
            <p>111111111111111111111111111111111111111111111111111111111111111111111111</p>
            <p>111111111111111111111111111111111111111111111111111111111111111111111111</p>
            <p>111111111111111111111111111111111111111111111111111111111111111111111111</p>
        </div>
*/

const header = document.querySelector('header');

/**@param headerIndex {number}*/
function enableDropdownHeader(headerIndex) {
    let navDropdown = document.getElementById('nav-dropdown');
    if (navDropdown === null) {
        navDropdown = document.createElement('div');
        navDropdown.classList.add('nav-dropdown');
        navDropdown.id = 'nav-dropdown';
        header.appendChild(navDropdown);
    }
    setDropdownHeader(navDropdown, headerIndex);
}

function disableDropdownHeader() {
    document.getElementById('nav-dropdown').remove();
}

/**
 * @param navDropdown {HTMLElement}
 * @param headerIndex {number}
 */
function setDropdownHeader(navDropdown, headerIndex) {
    navDropdown.innerHTML = generateNewDropdownHeader(headerIndex);
    const subNavOptions = navDropdown.querySelectorAll('.sub-nav-menu menu li');
    const content = document.getElementById('nav-dropdown-content');
    for (let subHeaderIndex = 0; subHeaderIndex < subNavOptions.length; subHeaderIndex++) {
        const subNavOption = subNavOptions[subHeaderIndex];

        subNavOption.addEventListener('click', () => {
            if (!subNavOption.classList.contains(ACTIVE)) {
                for (let i = 0; i < subHeaderIndex; i++) {
                    subNavOptions[i].classList.remove(ACTIVE);
                }
                subNavOption.classList.add(ACTIVE);
                for (let i = subHeaderIndex + 1; i < subNavOptions.length; i++) {
                    subNavOptions[i].classList.remove(ACTIVE);
                }

                content.innerHTML = generateNewSubDropdownHeaderHTML(headerIndex, subHeaderIndex);
            }
        });
    }
}

for (let headerIndex = 0; headerIndex < navOptions.length; headerIndex++) {
    const navOption = navOptions[headerIndex];
    navOption.addEventListener("click", () => {
        console.log(`header ${headerIndex} clicked`);
        if (navOption.classList.contains(ACTIVE)) {
            disableDropdownHeader(headerIndex);
            navOption.classList.remove(ACTIVE);
        } else {
            enableDropdownHeader(headerIndex);
            for (let i = 0; i < headerIndex; i++) {
                navOptions[i].classList.remove(ACTIVE);
            }
            navOption.classList.add(ACTIVE);
            for (let i = headerIndex + 1; i < navOptions.length; i++) {
                navOptions[i].classList.remove(ACTIVE);
            }
        }
    })
}

/**
 * @param headerIndex {number}
 * @param subheaderIndex {number}
 * @return {string}
 */
function generateMobileText(headerIndex, subheaderIndex) {
    const text = getSubDropdownHeaderData(headerIndex, subheaderIndex).text;
    return `<p>${text}</p>`
}


/**
 * @param headerIndex {number}
 * @return {string}
 */
const generateMobileDropdown = headerIndex => getDropdownHeaderData(headerIndex)
    .subheaders
    .map(title => `<li>
             <h3 class="selectable">${title}</h3>
             <div class="mobile-nav-content"></div>
         </li>`).join('\n');

function enableMobileMenu() {
    const mobileNav = document.createElement('div');
    mobileNav.classList.add('mobile-nav-menu');
    mobileNav.id = 'mobile-nav-menu';
    mobileNav.innerHTML = `<ul>
            <li>
                <h2 class="selectable">Продукты</h2>
                <ul></ul>
            </li>
            <li>
                <h2 class="selectable">Профессиональные сервисы</h2>
                <ul></ul>
            </li>
        </ul>`;
    const options = mobileNav.querySelectorAll('.selectable');
    const slots = mobileNav.querySelectorAll('ul > li > ul');
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const slot = slots[i];

        option.addEventListener('click', () => {
            if (option.classList.contains(ACTIVE)) {
                option.classList.remove(ACTIVE);
                slot.innerHTML = '';
            } else {
                option.classList.add(ACTIVE);
                console.log(`header ${i} activated`);

                const it = generateMobileDropdown(i);
                console.log(`it = ${it}`);
                slot.innerHTML = it;
                const subOptions = slot.querySelectorAll('.selectable');
                const subSlots = slot.querySelectorAll('.mobile-nav-content');
                for (let j = 0; j < subOptions.length; j++) {
                    const subOption = subOptions[j];
                    const subSlot = subSlots[j];

                    subOption.addEventListener('click', () => {
                        if (subOption.classList.contains(ACTIVE)) {
                            subOption.classList.remove(ACTIVE);

                            subSlot.innerHTML = '';
                        } else {
                            subOption.classList.add(ACTIVE);

                            subSlot.innerHTML = generateMobileText(i, j);
                        }
                    });
                }
            }
        });
    }
    header.appendChild(mobileNav);
    mobileNav.classList.add(ACTIVE);
}

function disableMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav-menu');
    mobileNav.classList.remove(ACTIVE);
    mobileNav.remove();
}

const mobileBurger = document.getElementById('mobile-nav-burger');

mobileBurger.addEventListener('click', () => {
    if (mobileBurger.classList.contains(ACTIVE)) {
        mobileBurger.classList.remove(ACTIVE);
        disableMobileMenu();
    } else {
        mobileBurger.classList.add(ACTIVE);
        enableMobileMenu();
    }
});

