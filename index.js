// JS
async function getUserData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/");
    const data = await response.json();
    return data;
}

async function getPostData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
    const data = await response.json();
    return data;
}

async function getToDoData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const data = await response.json();
    return data;
}

async function choose5() {
    firstNum = Math.floor(Math.random() * 10 + 1);
    secondNum = Math.floor(Math.random() * 10 + 1);
    thirdNum = Math.floor(Math.random() * 10 + 1);
    fourthNum = Math.floor(Math.random() * 10 + 1);
    fifthNum = Math.floor(Math.random() * 10 + 1);

    while (secondNum === firstNum) {
        secondNum = Math.floor(Math.random() * 10 + 1);
    }
    while (thirdNum === firstNum || thirdNum === secondNum) {
        thirdNum = Math.floor(Math.random() * 10 + 1);
    }
    while (fourthNum === firstNum || fourthNum === secondNum || fourthNum === thirdNum) {
        fourthNum = Math.floor(Math.random() * 10 + 1);
    }
    while (fifthNum === firstNum || fifthNum === secondNum || fifthNum === thirdNum || fifthNum === fourthNum) {
        fifthNum = Math.floor(Math.random() * 10 + 1);
    }
    console.log("1st: " + firstNum + " 2nd:" + secondNum + " 3rd:" + thirdNum + " 4th:" + fourthNum + " 5th:" + fifthNum); // test
    await displayData();
}

async function displayData() {
    const users = await getUserData();
    const posts = await getPostData();
    const todos = await getToDoData();

    let ids = [firstNum, secondNum, thirdNum, fourthNum, fifthNum];

    for (let i = 0; i < ids.length; i++) {
        const user = users[ids[i] - 1];
        const recentPostID = user.id * 10;
        const lastTodoID = user.id * 20;
        const recentPost = posts.filter(post => post.id === recentPostID)[0];
        const lastTodo = todos.filter(todo => todo.id === lastTodoID)[0];

        document.getElementById("userData").innerText += `${user.username} (${user.name}) (ID: ${user.id})\n`;
        document.getElementById("postData").innerText += `${user.username}:\n Title: ${recentPost.title}\n ----------------------------------------------------\n${recentPost.body}\n----------------------------------------------------\n\n`;
        if (lastTodo.completed){
            document.getElementById("todoData").innerText += `${user.username}'s To Do:\n----------------------------------------------------\n Title: ${lastTodo.title}\nStatus: Completed\n----------------------------------------------------\n\n`;
        }
        else{
            document.getElementById("todoData").innerText += `${user.username}'s To Do:\n----------------------------------------------------\n Title: ${lastTodo.title}\nStatus: Not Completed\n----------------------------------------------------\n\n`;
        }
    }
}
