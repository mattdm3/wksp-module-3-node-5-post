// listen to add button 

const addBtn = document.querySelector(".add-btn");

const deleteBtns = document.getElementsByClassName("deleteBtn");
const listItems = document.getElementsByClassName('list-item')

const deleteButton = () => {
    let deletedItem = event.target.previousElementSibling.innerText;

    window.location.href = `/delete${deletedItem}`

}


// const deleteItem = (e) => {
    // console.log(e.target.previousElementSibling.innerText);

    // event.target.parentElement.style.display = "none";
    // event.target.parentElement.remove();

// }

// deleteBtns.forEach((button) => {
//     button.addEventListener("click", function (e) {
//         console.log(e.target)
//     })
// })

// addEventListener("click", deleteItem);


// addBtn.addEventListener("click", function () {
//     event.preventDefault();
//     for (i = 0; i < deleteBtns.length; i++) {
//         deleteBtns[i].addEventListener("click", function () {
//             deleteBtns[i].parentElement.remove();
//         })
//     }
// })


//not working correctly... must remove from inputs array maybe. Try importing inputs array
