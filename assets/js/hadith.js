let buttonPrev = document.querySelector('#prev-button')
let buttonNext = document.querySelector('#next-button')
let namaHadith = document.querySelector('#nama-hadith')
let numHadith = document.querySelector('#num-hadith')
let arabicHadith = document.querySelector('#arabic-hadith')
let idnHadith = document.querySelector('#idn-hadith')
let nomorHadithInput = document.querySelector('#nomor-hadith')
let detailBody = document.querySelector('.detail-body')

let param = location.search.substring(1);
let splitter = param.split("|");
let hadithId = splitter[0];
let page = parseInt(splitter[1]);



// show data to page
const showHadith = async (data) => {
    try {

        namaHadith.innerHTML = data.name ?? "Tidak Diketahui"
        numHadith.innerHTML = data.num ?? 0

        if (data.found) {
            detailBody.innerHTML = `<div>
                <p id="arabic-hadith">${data.arab}</p>
                <hr>
                <p id="idn-hadith">${data.idn}</p>
            </div>`
        } else {
            const preloader = `
            <div class="preloader-data text-center" style="height: 500px">
                <div class="lottie-anim"></div>
                <H3>Hadith Nomor ${data.num} tidak ditemukan</H3>
            </div>
            `
            detailBody.innerHTML = preloader

            showPreloader('loading-failed.json')
        }
    } catch (e) {
        const preloader = `
        <div class="preloader-data text-center" style="height: 500px">
            <div class="lottie-anim"></div>
            <H3>Terjadi kesalahan. Silahkan refresh website</H3>
        </div>
        `
        detailBody.innerHTML = preloader

        showPreloader('loading-failed.json')
    }
}


// fetch data from API
const fetchHadith = async () => {
    try {
        const res = await axios.get('https://api.hadith.sutanlab.id/books/' + hadithId + "/" + page)

        if (res.data.data.contents) {
            return {
                "found": 1,
                "arab": res.data.data.contents.arab,
                "idn": res.data.data.contents.id,
                "num": res.data.data.contents.number,
                "name": res.data.data.name
            }
        }

        return {
            "found": 0,
            "name": res.data.data.name,
            "num": page
        }


    } catch (e) {
        const preloader = `
        <div class="preloader-data text-center">
            <div class="lottie-anim"></div>
            <H3>Terjadi kesalahan. Silahkan refresh website</H3>
        </div>
        `
        detailBody.innerHTML = preloader

        showPreloader('loading-failed.json')
    }
}


// next button, increase page by 1
const nextHadith = async () => {
    try {
        page += 1;
        const nextHadithContent = window.history.replaceState(null, null, "?" + hadithId + "|" + page);
        location.reload();
        return nextHadithContent
    } catch (e) {
        return e
    }
}

// get hadith by number
const getSpecificHadith = async (num) => {
    try {
        const data = window.history.replaceState(null, null, "?" + hadithId + "|" + num);
        location.reload();
        return data

    } catch (e) {
        return e
    }
}


// back button, decrease page by 1
const backHadith = async () => {
    try {
        page -= 1;
        const backHadithContent = window.history.replaceState(null, null, "?" + hadithId + "|" + page);
        location.reload();
        return backHadithContent
    } catch (e) {
        return e
    }
}



window.addEventListener('DOMContentLoaded', async () => {


    // disable back button if current page is 1
    if (page <= 1) {
        buttonPrev.disabled = true
    }

    // show user feedback to page
    const preloader = `
        <div class="preloader-data text-center">
            <div class="lottie-anim"></div>
            <H3>Memuat Data</H3>
        </div>
    `
    detailBody.innerHTML = preloader

    showPreloader('loading-data.json')
    setTimeout(async () => {
        const data = await fetchHadith()
        showHadith(data)
    }, 1000);

    // nomorHadithInput.addEventListener('change', async () => {
    //     const nomorHadith = nomorHadithInput.value
    //     const data = await getSpecificHadith(nomorHadith)

    //     showHadith(data)
    // })

    buttonNext.addEventListener('click', nextHadith)
    buttonPrev.addEventListener('click', backHadith)
})

window.addEventListener('load', () => {
    let darkModeState = localStorage.getItem('dark-mode')

    if (darkModeState == 'true') {
        turnOnDarkMode()
    } else {
        turnOffDarkMode()
    }
})