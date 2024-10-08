const loadPetsByCategory = (category) => {
    const apiUrl = `https://openapi.programming-hero.com/api/peddy/category/${category.toLowerCase()}`;

    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            showPetsByCategory(data.data);
        })
        .catch((error) => console.log(error));
};

const showPetsByCategory = (pets) => {
    handleLoading(pets);
    const petContainer = document.getElementById("pet-deals");
    petContainer.innerHTML = "";

    if (!pets || pets.length === 0) {
        petContainer.classList.remove("grid");
        petContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
          <img src="images/error.webp"/> 
          <h2 class="text-center text-xl font-bold">No Information Available</h2>
        </div>
            <p class="text-gray-500 text-center text-sm sm:text-base md: text-lg">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br> its layout. The point of using Lorem Ipsum is that it has a.
            </p>`;
    }
    else {
        petContainer.classList.add("grid");

        pets.forEach((pet) => {
            const Viewpet = document.createElement("div");
            Viewpet.innerHTML = `
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-out min-w-full">
            <img src="${pet.image}" alt="${pet.pet_name}" class="rounded-lg mb-4">
            <h3 class="text-xl font-semibold mb-2 ">${pet.pet_name}</h3>
            <p class="text-gray-600 text-sm mb-2">Breed: ${pet.breed || "N/A"}</p>
            <p class="text-gray-600 text-sm mb-2">Birth: ${pet.date_of_birth || "N/A"}</p>
            <p class="text-gray-600 text-sm mb-2">Gender: ${pet.gender}</p>
            <p class="text-gray-600 text-sm mb-2">Price: $${pet.price || "N/A"}</p>
            <div class="flex justify-around">
              <button id="" class="like-btn bg-gray-200 px-4 py-2 rounded-md"><i class="fa-regular fa-thumbs-up"></i></button>
              <button onclick= "adoptPet('${pet.petId}', this)" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Adopt</button>
              <button onclick="loadDetails('${pet.petId}')" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Details</button>
            </div>
            </div>
          </div>`;
          

          const likeButton = Viewpet.querySelector('.like-btn')
          likeButton.addEventListener('click', () => {
              LikedImages.push(pet.image)
              displayLikedImages();
          });

            petContainer.append(Viewpet);
        });
    }
    
};

const loadLikedPhotos =(image) =>
    {
      fetch(`https://openapi.programming-hero.com/api/peddy/${pets.image}`)
        .then((res) => res.json())
        .then((data) => displayPets(data.pets))
        .catch((error) => console.log(error));
    }

    const adoptPet = (petId, button) => {
        
        const adoptContent = document.querySelector(".adopt-content");
        const modalBackdrop = document.getElementById("modalBackdrop");


    modalBackdrop.classList.remove("hidden");

    adoptContent.innerHTML = `
    <div class="flex flex-col text-center ">
        <img class="w-28 mx-auto" src="https://img.icons8.com/?size=48&id=ZDURYTlMxCmV&format=png" alt="">
        <p class="text-4xl font-bold">Congratulations!</p>
        <p class="text-2xl text-gray-700">Adoption process is starting for your pet.</p>
        <div id="countdown" class=" font-bold text-7xl"></div>
    </div>
        
    `;
        const adoptModal = document.getElementById("adoptModal");
        adoptModal.showModal();
    
        let countdown = 3;
        const countdownDiv = document.getElementById("countdown");
        countdownDiv.innerHTML = countdown;
    
        const interval = setInterval(() => {
            countdown--;
            countdownDiv.innerHTML = countdown;
    
            if (countdown < 0) {
                clearInterval(interval);
                button.disable = true;
                button.textContent = "Adopted";
                setTimeout(() => {
                    adoptModal.close();
                    modalBackdrop.classList.add("hidden");
                });
            }
        }, 1000);
    };

    const handleLoading = (pets) => {
        const petContainer = document.getElementById("pet-deals");
        const spinner = document.getElementById("spinner");
        const likedPictureContainer = document.getElementById("Liked-Picture");
    
        spinner.style.display = "flex";
        petContainer.style.display = "none";
        likedPictureContainer.style.display = "none";
    
        setTimeout(() => {
            
            if (!pets || pets.length === 0) {
                petContainer.classList.remove("grid");
                spinner.style.display = "none";
                petContainer.style.display = "block";
                likedPictureContainer.style.display = "grid";

            } else {
                petContainer.classList.add("grid");
                spinner.style.display = "none";
                petContainer.style.display = "grid";
                likedPictureContainer.style.display = "grid";
            }
        }, 2000);
    };

    const setActiveButton = (activeBtnId) => {
        const buttons = document.querySelectorAll('.category-btn');
        buttons.forEach((button) => {
            if(button.id === activeBtnId)
            {
                button.classList.add('bg-teal-300', 'text-black');
            }
            else{
                button.classList.remove('bg-teal-300', 'text-black');
            }
        });
    }
    
    

document.getElementById("dogs-btn").addEventListener("click", () => {
    document.getElementById("spinner").style.display = "flex";
    loadPetsByCategory("dog");
    setActiveButton("dogs-btn");
});
document.getElementById("cats-btn").addEventListener("click", () => {
    document.getElementById("spinner").style.display = "flex";
    loadPetsByCategory("cat");
    setActiveButton("cats-btn");
});
document.getElementById("rabbits-btn").addEventListener("click", () => {
    document.getElementById("spinner").style.display = "flex";
    loadPetsByCategory("rabbit");
    setActiveButton("rabbits-btn");
});
document.getElementById("birds-btn").addEventListener("click", () => {
    document.getElementById("spinner").style.display = "flex";
    loadPetsByCategory("bird");
    setActiveButton("birds-btn");
});
document.getElementById("Like-btn").addEventListener("click", () => loadLikedPhotos("Liked-Picture"));
