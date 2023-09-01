let videos;
let sortVideos = false;
let othersView = (value) => {
    let valueNum = value.split('K')[0];
    let thousand = parseInt(valueNum.split('.')[0]) * 1000 ;
    let hundred = parseInt(valueNum.split('.')[1] ) * 100;
    if( !hundred ){
        hundred = 0;
    }
    let totalViews = thousand + hundred;
    return totalViews
}

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
        <button onclick="reagain(${video?.category_id})" class="btn btn-active 
        hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring
         focus:ring-violet-300 ...">${video?.category}</button>
        `
        getButton.appendChild(cardDiv);
    });
};

async function  reagain(id){
    const res = await 
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    // console.log(data.data);
     videos = data.data;
    handleButton();
}

const handleButton = async () =>{

    
    // if(isSort){
    //     videos = videos.sort((a, b) => a-b);
    // }
    const videoContainer = document.getElementById('video-container');
        videoContainer.innerHTML ='';
        if( sortVideos ){
            let sorting = videos.sort((a,b) => {
                let num1 = othersView(a.others.views)
                let num2 = othersView(b.others.views)
    
                if( num1 > num2 ) return 1;
                else return -1;
            })
            videos = sorting.reverse();
        }
    
    if(videos.length <= 0){
        document.getElementById('not-found').classList.remove('hidden')
    }
    else{
        document.getElementById('not-found').classList.add('hidden')
    }
        
    videos.forEach(video => {
        console.log(video);

        let convertDate = video.others.posted_date;
        let hour = Math.floor(convertDate / 3600);
        let minute = Math.floor((convertDate - ( hour * 60 * 60 )) / 60);


        
        const videoDiv = document.createElement('div');
        videoDiv.classList = `card bg-base-100 shadow-xl`;
        videoDiv.innerHTML =`
        
        <figure><img class="relative h-40 w-full" src="${video.thumbnail}" alt="Shoes" />
        </figure>
        <div>${video.others.posted_date ? `
        <div id="convert" class="absolute top-32 right-3 bg-slate-50 rounded-full w-2/4">
        <h2 class="pl-2 ">${hour} hour ${minute} min ago</h2>
        </div>` : ''}</div>
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
       
       
     
};
    
const sortByView = () =>{
    sortVideos = true;
    handleButton();
}

loadData();
reagain('1000');



const blogHandleButton = () =>{
    window.location.href = 'blog.html';
}