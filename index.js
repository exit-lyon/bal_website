const flagObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scrolled')
        }
    })
})

const artistObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('artist-appear')
        }
    })
})


const flags = document.getElementsByClassName('thin')
const artists = document.getElementsByClassName('artist-intro')

for (flag of flags) {
    flagObserver.observe(flag)
}

for (box of artists) {
    artistObserver.observe(box)
}
