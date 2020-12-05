let url = 'http://localhost:8001/';
let images = {};



async function productFetcher() {

    const Images = await fetch(`${url}wp-json/wp/v2/media/`)
        .then(response => response.json())
        .then(jsonResponse => jsonResponse.forEach((data) => {
            // console.log(data)
            images[data.id] = data.guid.rendered;
            // [data.id]: [data.guid.rendered],
        }))

    const productDetails = fetch(`${url}wp-json/wp/v2/products`)
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => jsonResponse.slice().reverse().forEach(data => {
            // console.log(jsonResponse)
            $('#products').append(`
            <div class='product'>
                <div class="product-text">
                     <h3>${data.title.rendered}</h3>
                      ${data.content.rendered} 
                </div>
             <img src="${images[data.featured_media]}"
            </div>
            `)
        }))
}

function faqs() {
    fetch(`${url}wp-json/wp/v2/faqs`)
        .then(res => res.json())
        .then(jsonResponse => {
            jsonResponse.slice().reverse().forEach(q => {
                $('.allfaqs').append(`

                <div class='faq'>
                     <h4>${q.title.rendered + ' +'}</h4>
                          ${q.excerpt.rendered}

                </div>
                `)
            })
            $('.faq h4').click(function(e) {
                jQuery(this).next().slideToggle();
                const TARGET = e.target.innerHTML
                const myReg = /[-]/;
                !myReg.test(TARGET) ?
                    e.target.innerHTML = TARGET.slice(0, -1) + ' -' :
                    e.target.innerHTML = TARGET.slice(0, -1) + ' +';
            })

        })
}

export { productFetcher, faqs}