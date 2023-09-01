const loadData = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    // console.log(data.data);
    const videos = data.data;
    // console.log(videos)
    
    const getButton = document.getElementById('button-active');
    videos.forEach(video => {
        // console.log(video.length)
        const cardDiv = document.createElement('div');
        cardDiv.classList = `ml-3 `
        cardDiv.innerHTML = `
        <button onclick="handleButton(${video?.category_id})" class="btn btn-active 
        hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring
         focus:ring-violet-300 ...">${video?.category}</button>
        `
        getButton.appendChild(cardDiv);
    });
};

const handleButton = async (id) =>{
const res = await 
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    // console.log(data.data);
    const videos = data.data;
    
    // if(isSort){
    //     videos = videos.sort((a, b) => a-b);
    // }
    const videoContainer = document.getElementById('video-container');
        videoContainer.textContent ='';
    if(videos.length > 0){
        
    videos.forEach(video => {
        console.log(video);
        const time = video.others.posted_date;
        const videoDiv = document.createElement('div');
        videoDiv.classList = `card bg-base-100 shadow-xl`;
        videoDiv.innerHTML =`
        
        <figure><img class="relative h-40 w-full" src="${video.thumbnail}" alt="Shoes" />
        <div>${video.others.posted_date ? `
        
        <div id="convert" class="absolute top-32 right-3 bg-slate-50 rounded-full w-2/4">
        <h2 class="pl-2 ">5 hour 30 min ago </h2>
        </div>
        ` : ''}</div>
        
        </figure>
                    <div class="card-body">
                    <div class="flex justify-start gap-3">
                    <img class="rounded-full h-10 w-10" src="${video.authors[0].profile_picture}" alt="Shoes" />
                    <h2 class="text-xl  font-bold">${video.title}</h2>
                    </div>
                      <h2 class="card-title font-normal">
                      ${video.authors[0].profile_name}
                        <p>${video.authors[0]?.verified ? '<i class="fa-solid fa-circle-check" style="color: #ec182d;"></i>' : ''}</p>
                            
                        
                        
                      </h2>
                      
                      <p>${video.others.views} <span>views</span></p>
                      
                    </div>
        `;
        videoContainer.appendChild(videoDiv);
       
        
    });
       } 
       else{
        // console.log('not found')

        const notFound = document.getElementById('not-found');
        notFound.textContent = '';
        const createFound = document.createElement('div');
        createFound.innerHTML = `
        <img class="mx-auto my-20" src="images/icon.png" alt="Shoes" />
        <h3 class="text-center my-20 font-bold text-5xl text-red-600">There is no data !!</h3>
        `
        notFound.appendChild(createFound);
       }
     
};
    
// const sortByView = () =>{
//     handleButton(true);
// }

loadData();




const blogHandleButton = () =>{
    window.location.href = 'blog.html';
}