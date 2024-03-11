document.addEventListener('DOMContentLoaded', () => {
    const imgLayout = document.querySelector('.img-layout');
    const img1 = document.querySelector('.img1');
    const img2 = document.querySelector('.img2');
    const img3 = document.querySelector('.img3');

    const handleScroll = () => {
        const scrollDistance = (window.pageYOffset || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - window.innerHeight) * 100;

        // Apply a different percentage of the scroll distance for each image
        // Note: These values are illustrative. Adjust them according to your desired effect
        imgLayout.style.transform = `translate3d(0px, ${-scrollDistance }%, 0px)`;
        img1.style.transform = `translate3d(0px, ${-scrollDistance * 0.4}%, 0px)`;
        img2.style.transform = `translate3d(0px, ${-scrollDistance * 0.1}%, 0px)`;
        img3.style.transform = `translate3d(0px, ${-scrollDistance * 0.2}%, 0px)`;
    };

    window.addEventListener('scroll', handleScroll);
});
