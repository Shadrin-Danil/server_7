// Переменная для списка записей
const recordList = document.querySelector('.posts_list');
// Переменная для кнопки с выводом всех записей
const allBtn = document.querySelector('.show_all_btn');
// Переменная для поля ввода
const creator = document.querySelector('.creator');
// Переменная для кнокпи с выводом записи 1 автора
const avtorBtn = document.querySelector('.post-avtor');

const state = {
    posts: []
};

// Создание записи
const createPost = (post) => `
  <div class="post">
    <div class="post__wrapper">
      <h1 class="wrapper__user">${post.userId}</h1>
      <h2 class="wrapper__title">${post.title}</h2>
      <div class="wrapper__body">${post.body}</div>
    </div>
  </div>
`;

// Событие для кнопки, которая выводи все записи 
allBtn.addEventListener('click', async() => {
    recordList.innerHTML = "";
    await allPosts();
    await fillPostsList(state.posts);
});

// Событие для кнопки, которая выводит записи 1 автора
avtorBtn.addEventListener('click', async() => {
    const userId = creator.value;
    if (userId) {
        recordList.innerHTML = "";

        const filteredPosts = await filterAvtor(userId);
        if (filteredPosts && filteredPosts.length > 0) {
            filteredPosts.forEach((post) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = createPost(post);
                recordList.appendChild(postElement);
            });
        } else {
            recordList.innerHTML = '<div class="post">Такого автора нет</div>';
        }
    }
    }
);

// Запрос на получение всех записей
function allPosts() {
    return fetch('https://jsonplaceholder.typicode.com/posts?_limit=100', {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.json())
        .then((posts) => {
            state.posts = posts;
        });
}

// Запрос с фильтрацией по автору
function filterAvtor(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return null;
            }
        });
}

// Заполнение списка записей
const fillPostsList = (posts) => {
    recordList.innerHTML = "";

    if (posts.length) {
        posts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = createPost(post);
            recordList.appendChild(postElement);
        });
    } else {
        recordList.innerHTML = '<div class="post">Посты не найдены</div>';
    }
};