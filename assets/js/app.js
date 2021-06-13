
let bodyHadith = document.querySelector('.body-hadith')
let darkModeButton = document.querySelector('#dark-mode-switcher')
let body = document.querySelector('body')
let cardHadith = ''

async function getData() {
    const res = await fetch('https://api.hadith.sutanlab.id/books/')
    return await res.json()
}


document.addEventListener('DOMContentLoaded', async () => {

    // show loading data feedback
    bodyHadith.innerHTML = `
        <div class="text-center align-self-center">
            <h1>Sedang memuat data...</>
        </div>
    `
    await getData().then(res => {
        let card = ''
            res.data.forEach((data) => {
                card += `
            
                <div class="col-3 text-center my-3">
                <a href="./detail.html?id=${data.id}|page=1">
                    <div class="card-hadith">
                        <i data-feather="book-open"></i>
                        <h5>${data.name}</h5>
                        <p>${data.available} data</p>
                    </div>
                    
            </a>
                </div>
            `
            })

            bodyHadith.innerHTML = card

            cardHadith = document.querySelectorAll('.card-hadith')

            // replace i data to feather icon
            feather.replace()
    }).catch(e => {
        bodyHadith.innerHTML = `
            <div class="text-center align-self-center">
                <h1>Gagal mengambil data. Silahkan refresh website</>
            </div>
        `
    })

    darkModeButton.addEventListener('click', () => {
        if (darkModeButton.checked) {
            localStorage.setItem('dark-mode', true)
    
            body.classList.add('dark-mode')
            bodyHadith.classList.add('dark-mode')
            cardHadith.forEach(card => card.classList.add('dark-mode'))
    
        } else {
            localStorage.setItem('dark-mode', false)
    
            body.classList.remove('dark-mode')
            bodyHadith.classList.remove('dark-mode')
            cardHadith.forEach(card => card.classList.remove('dark-mode'))
        }
    })
})


window.addEventListener("load", async function () {
    let darkModeState = localStorage.getItem('dark-mode');

    if (darkModeState == 'true') {
        darkModeButton.checked = true

        body.classList.add('dark-mode')
        bodyHadith.classList.add('dark-mode')

        
        await getData().then(res => cardHadith.forEach(card => card.classList.add('dark-mode'))) 
    } else {
        $('body, .body-hadith, .card-hadith').removeClass('dark-mode')
        darkModeButton.checked = false
    }

    console.log(darkModeState)
})
