const counters = document.querySelectorAll(".stat h4");
const reveals = document.querySelectorAll(".reveal");

id="r0o4wv"
function startCounters(){

    counters.forEach(counter => {

         animateCounter(counter);
    });

}

function animateCounter(counter){

    const target = Number(counter.dataset.target);

    let current = 0;


    const updateCounter = () => {

        if(current < target){

            current++;

            counter.textContent = current;

            requestAnimationFrame(updateCounter);

        }

    };


    updateCounter();

}

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            startCounters();

            observer.disconnect();

        }

    });

});

const statsSection = document.querySelector(".about-stats");

if(statsSection){

    observer.observe(statsSection);

}

const revealOnScroll = () => {

    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach(section => {

        const sectionTop = section.getBoundingClientRect().top;

        if(sectionTop < triggerBottom){
            section.classList.add("active");
        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();
