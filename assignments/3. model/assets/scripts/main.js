let ul = document.querySelector(".model_list_wrapper");

//  Data Array

    let data = [
        {
            image:
            "http://data.mavo.io/portfolio/images/pasted-image-1494464667397.png",
            name: "Carwash",
            category: "Painting"
        },
        {
            image:
            "http://data.mavo.io/portfolio/images/pasted-image-1494528264937.png",
            name: "Muck Mouth",
            category: "Painting"
        },
        {
            image:
            "http://data.mavo.io/portfolio/images/pasted-image-1494528646446.png",
            name: "Fishwall",
            category: "Painting"
        },
        {
            image: "http://data.mavo.io/portfolio/images/web-coffe-marilyn.jpg",
            name: "Web Coffe Marilyn",
            category: "Painting"
        },
        {
            image:
            "http://data.mavo.io/portfolio/images/pasted-image-1494903924970.png",
            name: "Web 3 Jules",
            category: "Painting"
        },
        {
            image: "http://data.mavo.io/portfolio/images/web-electric3.jpg",
            name: "Web electric3",
            category: "Painting"
        }
    ];


    // ----------------------------------------------------------------------------------------

    function createImageList(data) {
        
        data.forEach( (el, index) => {
            let li = document.createElement('li');
            li.setAttribute("data-id",index);
            li.classList.add("image_list");

            let img = document.createElement('img');
            img.setAttribute("src", el.image);
            // console.log(el.image);
            img.classList.add("image");
            img.style.flexBasis = `${100 / data.length + 3}%`

            let btn = document.createElement('button');
            btn.classList.add("btn");
            btn.textContent = "Details"

            li.appendChild(img);
            li.appendChild(btn);

            ul.appendChild(li);

            btn.addEventListener('click', displayItem);
        })
        
    }

    function displayItem(event) {
        let id = event.target.parentNode.dataset.id;
        let allLists = Array.from(ul.children);

        data.forEach( (el, index) => {
            
            if(index == id) {
                
                document.querySelector(".category").innerHTML = el.category;
                document.querySelector(".name").innerHTML = el.name;
                document.querySelector(".desired_image").setAttribute("src", el.image);
                console.log("index",index,"id",id);    
            }
        }) 

    }

    createImageList(data);
