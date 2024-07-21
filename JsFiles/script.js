// Populate the trending items list
const trendingItems = [
    'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING',
    'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING',
    'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING',
    'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING',
    'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING',
    'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING',
    'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING',
    'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING', 'TRENDING'
];

const trendingList = document.getElementById('trendingList');

function populateTrendingList(items) {
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        trendingList.appendChild(li);
    });
}

populateTrendingList(trendingItems);

// Initialize carousels
let carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    let currentIndex = 0;
    const slides = carousel.querySelectorAll('.carousel-item');
    const inner = carousel.querySelector('.carousel-inner');
    const prevButton = carousel.querySelector('.carousel-control-prev');
    const nextButton = carousel.querySelector('.carousel-control-next');

    function showSlide(index) {
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }
        const offset = -currentIndex * 100;
        inner.style.transform = `translateX(${offset}%)`; // Corrected the template literal syntax
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    showSlide(currentIndex);
});

// Navigation for watches section
document.addEventListener("DOMContentLoaded", function() {
    const watchesLink = document.getElementById('watches-link');
    const watchesSection = document.getElementById('watches-section');

    watchesLink.addEventListener('click', function(event) {
        event.preventDefault();
        const allSections = document.querySelectorAll('main > section');
        allSections.forEach(section => section.style.display = 'none');

        watchesSection.style.display = 'block';
    });
});

// Logo click event
let LogoFast = document.getElementById("LogoFast");
LogoFast.style.cursor = "pointer";
LogoFast.addEventListener("click", function() {
    location.reload();
});

// Modal functionality
const showModalKey = 'showModal'; // Define the key for sessionStorage

function showModal() {
    document.getElementById('modal').style.display = 'block';
    fetch('./htmlfiles/loginfile.html') 
        .then(response => response.text())
        .then(data => {
            document.getElementById('login-form-container').innerHTML = data;
        });
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    sessionStorage.setItem(showModalKey, 'closed'); // Set to prevent showing the modal again
}

// Check if the modal should be shown
function checkModalDisplay() {
    const showModalStatus = sessionStorage.getItem(showModalKey);
    const userIcon = document.getElementById('user-icon');

    if (showModalStatus === null && (!userIcon || !userIcon.classList.contains('circle'))) {
        setTimeout(showModal, 5000); // Show modal after 5 seconds if 'circle' class is not present
    }
}

// Ensure modal check is run on page load
checkModalDisplay();

// User icon logic
const userIcon = document.getElementById('user-icon');
if (userIcon && sessionStorage.getItem('showMeIcon') === 'true') {
    userIcon.innerHTML = '<div class="circle">You</div>';
}

// Dropdown functionality for country codes
async function loadCountryData() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const dropdownContent = document.getElementById("dropdown-content");

        const defaultOption = document.createElement("div");
        defaultOption.innerHTML = `<img src="https://flagcdn.com/w320/in.png" alt="India" width="20" height="15"> +91`;
        defaultOption.onclick = () =>
            selectCountry("+91", "https://flagcdn.com/w320/in.png");
        dropdownContent.appendChild(defaultOption);

        const countries = data.slice(0, 10);

        countries.forEach((country) => {
            const callingCode = `${country.idd.root}${
                country.idd.suffixes ? country.idd.suffixes[0] : ""
            }`;
            const option = document.createElement("div");
            option.classList.add("custom-option");
            option.innerHTML = `<img src="${country.flags.png}" alt="${country.name.common}" width="20" height="15"> ${callingCode}`;
            option.onclick = () =>
                selectCountry(callingCode, country.flags.png);
            dropdownContent.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching country data:", error);
    }
}

function toggleDropdown() {
    document.getElementById("dropdown-content").classList.toggle("show");
}

function selectCountry(code, flag) {
    document.querySelector(
        ".dropbtn"
    ).innerHTML = `<img src="${flag}" alt="Flag" width="20" height="15"> ${code}`;
    document.getElementById("Mob-Number").value = code + " ";
    toggleDropdown();
    validateMobileNumber();
}

function closeLogin() {
    document.querySelector(".whole-login-container").style.display = "none";
}

function validateMobileNumber() {
    const mobNumber = document.getElementById("Mob-Number").value;
    const continueBtn = document.getElementById("continue-btn");
    const isValid = mobNumber.replace(/\D/g, "").length >= 10;
    if (isValid) {
        continueBtn.classList.add("active");
        continueBtn.style.cursor = "pointer";
    } else {
        continueBtn.classList.remove("active");
        continueBtn.style.cursor = "not-allowed";
    }
}

function navigateToNext() {
    const continueBtn = document.getElementById("continue-btn");
    if (continueBtn.classList.contains("active")) {
        window.location.href = "../htmlfiles/nestedloginFile.html";
    }
}

window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};

loadCountryData();

// Navigation for nested menus
document.querySelectorAll('.nav-links > li').forEach(item => {
    item.addEventListener('mouseover', () => {
        const nestedMenus = item.querySelectorAll('.nested-menus');
        nestedMenus.forEach(menu => {
            menu.style.display = 'block';
        });
    });

    item.addEventListener('mouseleave', () => {
        const nestedMenus = item.querySelectorAll('.nested-menus');
        nestedMenus.forEach(menu => {
            menu.style.display = 'none';
        });
    });
});
