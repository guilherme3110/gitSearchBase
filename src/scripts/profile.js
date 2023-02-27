const userInformations = [JSON.parse(localStorage.getItem('userCollected'))]
const userRepos = JSON.parse(localStorage.getItem('reposCollected'))


async function renderUserAndCard(userInfo, userRepos) {
    const mainPart = document.querySelector(`.main-part`)
    const cardSection = document.querySelector(`.card-section`)

    mainPart.innerHTML = ``;

    userInfo.forEach(async userInfo => {
        const infos = await createUserpage(userInfo);
        mainPart.appendChild(infos)
    });

    userRepos.forEach(async userRepo => {
        const cards = await createCardrepos(userRepo);
        cardSection.appendChild(cards)
        mainPart.appendChild(cardSection)
    });

    return mainPart
}

async function createUserpage(userInfo) {
    const section = document.createElement(`section`)
    section.classList.add(`user-section`)

    const divPictureUsername = document.createElement(`div`)
    divPictureUsername.classList.add(`picture-and-username`)

    const divUserAndButton = document.createElement(`div`)
    divUserAndButton.classList.add(`user-and-button`)

    const userPicture = document.createElement(`img`)
    userPicture.src = `${userInfo.avatar_url}`
    userPicture.alt = `User Image`
    userPicture.classList.add(`user-picture`)

    const userName = document.createElement(`h2`)
    if (userInfo.name === null) {
        userName.innerText = `${userInfo.login}`
    } else {
        userName.innerText = `${userInfo.name}`
    }

    const changeUserButton = document.createElement(`button`)
    changeUserButton.innerText = `Trocar de usuário`
    changeUserButton.classList.add(`change-user-button`)

    changeUserButton.addEventListener(`click`, () => {
        window.location.replace(`../../index.html`)
    })

    section.append(divUserAndButton)
    divUserAndButton.append(divPictureUsername, changeUserButton)
    divPictureUsername.append(userPicture, userName)

    return section
}

async function createCardrepos(userRepo) {
    const cardUL = document.createElement(`ul`)
    cardUL.classList.add(`card-unsorted-list`)

    const cardlist = document.createElement(`li`)
    cardlist.classList.add(`elements-list`)

    const repoName = document.createElement(`h3`)
    if (userRepo.name.length > 40) {
        repoName.innerText = userRepo.name.slice(0, 38) + `...`;
    } else {
        repoName.innerText = `${userRepo.name}`
    }

    const repoDescription = document.createElement(`span`)
    if (userRepo.description === null) {
        repoDescription.innerText = `Não há descrição neste repositório.`
    } else {
        repoDescription.innerText = `${userRepo.description}`
    }
    repoDescription.classList.add(`repo-description`)

    const repoButton = document.createElement(`button`)
    repoButton.innerText = `Repositório`
    repoButton.classList.add(`repo-button`)

    repoButton.addEventListener(`click`, () => {
        window.location = `${userRepo.html_url}`
    })

    cardUL.appendChild(cardlist)
    cardlist.append(repoName, repoDescription, repoButton)

    return cardUL
}

await renderUserAndCard(userInformations, userRepos)