document.addEventListener('DOMContentLoaded', () => {
    const img1 = document.querySelector('.img1');
    const img2 = document.querySelector('.img2');
    const img3 = document.querySelector('.img3');
    const heroText = document.querySelector('.hero-text'); // Get the hero-text element

    const handleScroll = () => {
        const scrollDistance = (window.pageYOffset || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - window.innerHeight) * 100;

        img1.style.transform = `translate3d(0px, ${-scrollDistance * 0.8}%, 0px)`;
        img2.style.transform = `translate3d(0px, ${-scrollDistance * 0.3}%, 0px)`;
        img3.style.transform = `translate3d(0px, ${-scrollDistance * 0.2}%, 0px)`;
        heroText.style.transform = `translate(-50%, ${-50 - scrollDistance * 0.8}%)`; // Adjust -0.1 as needed to control speed of movement
        // Decrease opacity as scrolling progresses
        heroText.style.opacity = 1 - scrollDistance * 0.009; // Adjust 0.01 to control rate of opacity reduction


    };

    window.addEventListener('scroll', handleScroll);
});
