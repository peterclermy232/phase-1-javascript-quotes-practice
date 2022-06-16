document.addEventListener(`DOMContentLoaded`, () => {
    fetch(`http://localhost:3000/quotes?_embed=likes`)
        .then(resp => resp.json())
        .then(data => data.forEach(makeEverything))

    const submit = document.querySelector(`.btn`).addEventListener(`click`, e => {
        e.preventDefault()
        addQuote()
    })

    function addQuote() {
        let quoted = document.getElementById(`new-quote`).value
        let authored = document.getElementById(`author`).value
        fetch(`http://localhost:3000/quotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'quote': quoted,
                'author': authored
            })
        })
            .then(resp => resp.json())
            .then(makeEverything)
    }

    function makeEverything({ quote, author, id, likes }) {
        const ul = document.getElementById(`quote-list`)
            console.log(likes)
            let li = document.createElement(`li`)
            let block = document.createElement(`blockquote`)
            let p = document.createElement(`p`)
            let foot = document.createElement(`footer`)
            let br = document.createElement(`br`)
            let like = document.createElement(`button`)
            let del = document.createElement(`button`)
            let sp = document.createElement(`span`)

            li.className = 'quote-card'
            block.className = `blockquote`
            p.className = 'mb-0'
            foot.className = 'blockquote-footer'
            like.className = 'btn-success'
            del.className = 'btn-danger'
            sp.textContent = likes.length
            del.textContent = `Delete`
            like.textContent = `Likes: `
            like.id = id
            like.addEventListener(`click`, () => {
                fetch(`http://localhost:3000/likes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        quoteId: id
                    })
                })
                    .then(resp => resp.json())
                    .then(data => {
                        fetch(`http://localhost:3000/likes?quoteId=${data.quoteId}`)
                            .then(resp => resp.json())
                            .then((data) => {

                                sp.textContent = data.length
                            })
                    })

            })
            p.textContent = quote
            foot.textContent = author
            like.appendChild(sp)
            block.append(p, foot, br, like, del)
            li.appendChild(block)
            ul.append(li)
    }
})
