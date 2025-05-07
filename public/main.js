let dbtn = document.querySelectorAll('.delete-btn');
let posts = document.querySelectorAll('.post');
let add = document.querySelector('.add');

dbtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        posts[index].style.display = 'none';
    });
});

add.addEventListener('click',()=>{
    window.location.href = "http://localhost:3000/nposts";
})