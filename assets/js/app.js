
let cardHadith = ''
let bodyHadith = document.querySelector('.body-hadith')

const showHadithsList = async (data) => {
    try {
        let card = ''
        data.forEach(data => {
            card += `
            <div class="col-12 col-md-3 text-center my-3">
                <a href="./hadith.html?${data.id}|1">
                    <div class="card-hadith">
                        <span id="icon-book"></span>
                        <h5>${data.name}</h5>
                        <p>${data.available} data</p>
                    </div>
                </a>
            </div>
            `
        });


        bodyHadith.innerHTML = card
        cardHadith = document.querySelectorAll('.card-hadith')
    } catch (error) {
        bodyHadith.innerHTML = `
            <h4 class="text-center align-self-center">Terjadi Kesalahan. Silahkan Refresh halaman</h4>
        `
    }
}

const fetchHadithList = async () => {
    try {
        const res = await axios.get('https://api.hadith.sutanlab.id/books/').catch(err => { throw new Error(err) })
        return res.data.data
    } catch (error) {
        bodyHadith.innerHTML = `
            <h4 class="text-center align-self-center">Terjadi Kesalahan. Silahkan Refresh halaman</h4>
        `
    }
}

window.addEventListener('load', async () => {
    const preloader = `
        <div class="preloader-data text-center">
            <div class="lottie-anim"></div>
            <H3>Memuat Data</H3>
        </div>
    `
    bodyHadith.innerHTML = preloader

    lottie.loadAnimation({
        container: document.querySelector('.lottie-anim'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './assets/json/loading-data.json'
    })

    setTimeout(() => {
        fetchHadithList()
            .then(async res => {
                showHadithsList(res)
            })
            .catch(e => console.log(e))
    }, 1000);

    let darkModeState = localStorage.getItem('dark-mode')

    if (darkModeState == 'true') {
        turnOnDarkMode()
        darkModeSwitch.checked = true
    } else {
        turnOffDarkMode()
        darkModeSwitch.checked = false
    }
})

let darkModeSwitch = document.querySelector('#dark-mode-switch')

darkModeSwitch.addEventListener('click', () => {
    if (darkModeSwitch.checked) {
        turnOnDarkMode()
        localStorage.setItem('dark-mode', true)
    } else {
        turnOffDarkMode()
        localStorage.setItem('dark-mode', false)
    }
})

