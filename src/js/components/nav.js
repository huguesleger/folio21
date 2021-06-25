export const navImg = function() {
    const items = document.querySelectorAll('.main-item[data-img]');
    
    items.forEach((el) => {
        el.addEventListener('mouseenter', (e)=> {
            e.preventDefault();
            const imgData = e.target.getAttribute('data-img');
            const bgImg = document.querySelector(".bg-img .item-img[data-img="+imgData+"]");
            const siblings = bgImg.parentElement.children;
            for(let sib of siblings) {
                sib.classList.remove('active')
                }
            bgImg.classList.add('active');    
        });
    });
}

export const navOpen = function() {
    const btn = document.querySelector('.btn-main');
    const main = document.querySelector('.main');
    btn.addEventListener('click', navToggle.bind(this));

     function navToggle(e) {
        e.preventDefault();
        btn.classList.toggle('is-open');
        main.classList.toggle('is-open');
    }
}