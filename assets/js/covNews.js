let vaccineBody = document.querySelector('#vaccineBody');
let vaccinesNearByTitle = document.querySelector('#vaccinesNearBy-title');
let vaccinesNearByList = document.querySelector('#vaccinesNearBy-list');

let vacLoadingGif = '<img class="col-4 d-block mx-auto mt-3 p-0" style="width:200px; height:200px;" src="assets/images/vaccine-loader.gif" alt="Vaccine Loader"></img>';




async function fetchData() {

  //hello
  
    let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=3356766ce52b4fd5b64c6b15f8153dbf&q=covid';
    
    const response = await fetch(url);
      
      if(response.status === 200) {
        return response.json();  
      }
      else {
        return 0;
      }
  }

function covNews() {

    vaccinesNearByList.innerHTML = vacLoadingGif;

    fetchData().then(data => {
      
        vaccinesNearByList.innerHTML = '';
    
        if ( data != 0) {

          if ( data.status == "ok" && data.totalResults != 0 ) {

            for (var i=0; i < data.totalResults; i++) {
                
                var div = document.createElement("div");
                div.classList.add('col-md-6', 'col-lg-5');          
                div.innerHTML = `
                <div class="card mx-auto mb-4 border-primary bg-light">

                  <h5 class="card-header lead fs-5 p-3 lh-sm">${data.articles[i].title}</h5>
                    
                  <div class="card-body fs-6 px-3 lh-base"> 
                    ${data.articles[i].description !== null ? data.articles[i].description : "No Description."} <br> &nbsp; <span style="position:absolute; right:25px;"> -- <a href="${data.articles[i].url}" target="_blank">Read More</a></span>                  
                  </div>

                </div>`;
            
                vaccinesNearByList.appendChild(div);
    
    
            }
          }


          else if (data.status == "ok" && data.totalResults == 0) {
            vaccinesNearByList.innerHTML = `
              <div class="lead fs-4 text-center border border-danger p-3 lh-base col-11">
                No News headlines for today. Please try again later. Thankyou!
              </div>`;
          }

          else if (data.status == "error") {
            vaccinesNearByList.innerHTML = `
              <div class="lead fs-4 text-center border border-danger p-3 lh-base col-11">
                ${data.code} <br>${data.message}
              </div>`;
          }


        }
        else {
          vaccinesNearByList.innerHTML = `
            <div class="lead fs-4 text-center border border-danger p-3 lh-base col-11">
              Something Went Wrong! Please try again later.
            </div>`;
        }
    
      });








}  

covNews();