
// console.log("Connected");


//  Button toiri hoye jekhane dekhabe
const btnContainer = document.getElementById('btn-container');

// Video Gula jekhane thakbe
const cardContainer = document.getElementById('card-container');

// Data na pawa gale
const errorElement = document.getElementById('error-element');


// sort Button a click korle view ar upor base kore contaient asbe 
const sortBtn = document.getElementById('sort-btn');


let selectedCategory = 1000;
let sortByView = false;

sortBtn.addEventListener('click',()=>{
    sortByView = true;
    fetchDataByCategory(selectedCategory, sortByView)
})

// datar catagorir upor base kore button toiri hobe 

const fetchCategories = ()=>{
    const url = 'https://openapi.programming-hero.com/api/videos/categories'
    fetch(url)

        .then((res) => res.json())
        .then(({data}) => {

            data.forEach((card) => {
                // console.log(card)

                const newBtn = document.createElement('button');
                newBtn.className = 'category-btn btn glass  text-lg'
                newBtn.innerText = card.category
                
                // oi button a click korle abr onno kichu hobe 

                newBtn.addEventListener('click',() => {
                    
                    fetchDataByCategory(card.category_id)
                    const allBtn = document.querySelectorAll('.category-btn')
                    for( const btn of allBtn ){
                        btn.classList.remove('bg-red-500')
                    }
                    newBtn.classList.add('bg-red-500')
                })
                btnContainer.appendChild(newBtn)
            })

        })
}

// Button a click korle oi related Data dekhabe
const fetchDataByCategory = (categoryID, sortByView) =>{

    selectedCategory = categoryID

    // console.log(categoryID);

    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryID}`
    fetch(url)

        .then((res) => res.json())
        .then(({data}) => {
            if(sortByView){
                data.sort((a,b) => {
                    const totalViewsStarFirst = a.others?.views;
                    
                    const totalViewsStarSecond = b.others?.views;
                    const totalViewFirstNumber = parseFloat(totalViewsStarFirst.replace("k",'')) || 0;
                    const totalViewSecondNumber = parseFloat(totalViewsStarSecond.replace("k",'')) || 0;
                    
                    return totalViewSecondNumber - totalViewFirstNumber;
                    
                })
            }
            if(data.length === 0){
                errorElement.classList.remove('hidden')
            }
            else{
                errorElement.classList.add('hidden')
            }
            // Porer button a click korle ager gula nai kore dibe
            cardContainer.innerHTML = ''
            data.forEach((video) => {
                // Authore Verified hoile batch dekhabe
                let verifiedBatch = ''
                if (video.authors[0].verified){
                    verifiedBatch = `<i class=" text-sky-600 fa-solid fa-circle-check"></i>`
                }
                 console.log(video)
                const newCard = document.createElement('div');

                newCard.innerHTML = `
                
                <div class=" card w-full p-2 rounded-lg shadow-xl">
                    <figure class="overflow-hidden h-72">
                        <img class="w-full rounded-lg" src="${video.thumbnail}" alt="">
                        <p class="position-absolute text-white bg-dark p-1" style="bottom: 0; right: 0; font-size: smaller; border-radius: 5px">
                        ${video.others.posted_date ? `${getTime(video.others.posted_date).hours}hr ${getTime(video.others.posted_date).minutes}min ago` : ''}
                    </p>
                    </figure>
                    <div class="card-body">

                        <div class="flex space-x-4 justify-start items-start">

                            <div class="">
                                <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" alt="">
                            </div>
                            <div class="">
                                <h2 class="card-title">${video.title}</h2>
                                <div class="flex items-center gap-2 mt-3">
                                    <p class="">${video.authors[0].profile_name}</p>
                                    ${verifiedBatch}
                                </div>
                                <p class="mt-3">${video.others.views}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `
                cardContainer.appendChild(newCard)

                // oi button a click korle abr onno kichu hobe 

                newCard.addEventListener('click',() => fetchDataByCategory(card.category_id))
            })
            
        })


}
 
const getTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const remaining = seconds % 3600;
    const minutes = Math.floor(remaining / 60);
    return { hours, minutes };
};

fetchCategories()

fetchDataByCategory(selectedCategory, sortByView) 