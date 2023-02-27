const inputValue = document.querySelector('.user-name')

async function getUsername(userName) {
    const username = await fetch(`https://api.github.com/users/${userName}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then (response => {
        if (response.ok) {
            window.location.replace('src/pages/profile.html')
        } else {
            window.location.replace('src/pages/error.html')
        }

        return response.json()
    })
    .catch (err => console.log(err))

    return username
}

async function getRepos(userName) {
    const repos = await fetch(`https://api.github.com/users/${userName}/repos`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then (response => {
        if (response.ok) {
            return response.json()
        } else {
            console.log(`Repositório não encontrado.`)
        }
    })
    .catch (err => console.log(err))

    return repos
}

const searchButton = document.querySelector('.search-button')

searchButton.addEventListener(`click`, async (e) => {
    e.preventDefault()
    const receivedRepos = await getRepos(inputValue.value)
    const receivedValue = await getUsername(inputValue.value)
    localStorage.setItem('userCollected', JSON.stringify(receivedValue))
    localStorage.setItem('reposCollected', JSON.stringify(receivedRepos))
    return receivedValue
})