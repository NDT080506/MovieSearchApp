const userCardTemplate = document.querySelector("[data-user-template]");
const container = document.querySelector("[data-user-cards-container]");
const searchBar = document.querySelector("[data-search]");
const filter = document.querySelector("[filter-dropdown");
const sorter = document.querySelector("[sorter-dropdown]");
const pagination = document.querySelector(".pagination");

let users = [];

let currentPage = 1;
const moviesPerPage = 20;

async function loadMovies(){
    try{
        const res = await fetch("../movies.json");
        const data = await res.json();
        
       users = data.map(user => {
        const cardClone = userCardTemplate.content.cloneNode(true); 
        const poster = cardClone.querySelector("[data-header-poster]"); 
        const title = cardClone.querySelector("[data-body-title]"); 
        const genre = cardClone.querySelector("[data-body-genre]"); 
        const year = cardClone.querySelector("[data-body-year]"); 
        const rating = cardClone.querySelector("[data-body-rating]"); 

        poster.src = user.poster; 
        title.textContent = user.title; 
        genre.textContent = "Genre: " + user.genre; 
        year.textContent = "Year: " + user.year; 
        rating.textContent = "Rating: " + user.rating; 
        const card = cardClone.querySelector(".card"); 

        return {
            title: user.title,
            genre: user.genre,
            year: user.year,
            rating: user.rating,
            poster: user.poster,
            element: card 
        }});

        renderPage(currentPage);
        
    }catch(error){
        console.log(error);
    }
}

function renderPage(page) {
    container.innerHTML = "";
    const start = (page - 1) * moviesPerPage;
    const end = start + moviesPerPage;

    const movies = users.slice(start, end);

    
    movies.forEach(movie => {
        container.append(movie.element);
    });
}

function updateActiveButton(idx){
    for (let i = 1; i < pagination.children.length; ++i) {
        pagination.children[i].classList.remove("active");
    }

    pagination.children[idx].classList.add("active");
}

searchBar.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    users.forEach(user => {
        const isVisible = user.title.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);
    })
});


//filter section
filter.children[0].addEventListener("click",() => {
    users.forEach(user => {
        user.element.classList.toggle("hide", false);
    })
});

filter.children[1].addEventListener("click", () => {
    const value = "action";
    users.forEach(user => {
        const isVisible = user.genre.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);
    })
})

filter.children[2].addEventListener("click", () => {
    const value = "animation";
    users.forEach(user => {
        const isVisible = user.genre.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);
    })
})

filter.children[3].addEventListener("click", () => {
    const value = "drama";
    users.forEach(user => {
        const isVisible = user.genre.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);
    })
})


filter.children[4].addEventListener("click", () => {
    const value = "sci-fi";
    users.forEach(user => {
        const isVisible = user.genre.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);
    })
})


filter.children[5].addEventListener("click", () => {
    const value = "romance";
    users.forEach(user => {
        const isVisible = user.genre.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);
    })
})


filter.children[6].addEventListener("click", () => {
    const value = "crime";
    users.forEach(user => {
        const isVisible = user.genre.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);
    })
})


filter.children[7].addEventListener("click", () => {
    const value = "fantasy";
    users.forEach(user => {
        const isVisible = user.genre.toLowerCase().includes(value);
        user.element.classList.toggle("hide", !isVisible);
    })
})

//sorter section
sorter.children[0].addEventListener("click", () => {
    users.sort((a, b) => a.title.localeCompare(b.title));
    console.log(users);
    renderPage(currentPage);
})

sorter.children[1].addEventListener("click", () => {
    users.sort((a, b) => b.title.localeCompare(a.title));
    renderPage(currentPage);
})

sorter.children[2].addEventListener("click", () => {
    users.sort((a, b) => b.rating - a.rating);
    renderPage(currentPage);
})

sorter.children[3].addEventListener("click", () => {
    users.sort((a, b) => a.rating - b.rating);
    renderPage(currentPage);
})

sorter.children[4].addEventListener("click", () => {
    users.sort((a, b) => b.year - a.year);
    renderPage(currentPage);
})

sorter.children[5].addEventListener("click", () => {
    users.sort((a, b) => a.year - b.year);
    renderPage(currentPage);
})


//page transition
pagination.children[0].addEventListener("click", (e) => {
    if (currentPage > 1) --currentPage;
    updateActiveButton(currentPage);
    renderPage(currentPage);
});

pagination.children[1].addEventListener("click", (e) => {
    currentPage = 1;
    updateActiveButton(currentPage);
    renderPage(currentPage);
});


pagination.children[2].addEventListener("click", (e) => {
    currentPage = 2;
    updateActiveButton(currentPage);
    renderPage(currentPage);
});


pagination.children[3].addEventListener("click", (e) => {
    currentPage = 3;
    updateActiveButton(currentPage);
    renderPage(currentPage);
});

pagination.children[4].addEventListener("click", (e) => {
    currentPage = 4;
    updateActiveButton(currentPage);
    renderPage(currentPage);
});

pagination.children[5].addEventListener("click", (e) => {
    const totalPages = Math.ceil(users.length / moviesPerPage);
    if (currentPage < totalPages) ++currentPage;
    updateActiveButton(currentPage);
    renderPage(currentPage);
})

loadMovies();

