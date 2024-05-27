document.addEventListener('DOMContentLoaded', () => {
    const img1 = document.querySelector('.img1');
    const img2 = document.querySelector('.img2');
    const img3 = document.querySelector('.img3');
    const heroText = document.querySelector('.hero-text'); // Get the hero-text element
    const firstSection = document.querySelector('.first-section'); // Select the first section
    const header = document.querySelector('header');

    const handleScroll = () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const firstSectionHeight = firstSection.offsetHeight; // Get the height of the first section
        const scrollDistance = scrollPosition / (document.documentElement.scrollHeight - window.innerHeight) * 100;

        img1.style.transform = `translate3d(0px, ${-scrollPosition * 0.1}%, 0px)`;
        img2.style.transform = `translate3d(0px, ${-scrollPosition * 0.05}%, 0px)`;
        img3.style.transform = `translate3d(0px, ${-scrollPosition * 0.03}%, 0px)`;
        heroText.style.transform = `translate(-50%, ${-50 - scrollDistance * 0.8}%)`;

        if (scrollPosition < firstSectionHeight -60) {
            heroText.style.display = 'block'

            heroText.style.opacity = 1 - (scrollPosition / firstSectionHeight);
            header.classList.remove('header-new-section');
        } else {
            header.classList.add('header-new-section');
            heroText.style.opacity = 0;
            heroText.style.display = 'none'
        }
    };

    // Trigger the handleScroll function on load to set initial positions and opacity
    handleScroll();

    window.addEventListener('scroll', handleScroll);
});
