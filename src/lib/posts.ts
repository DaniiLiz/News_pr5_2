export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
}

export interface Comment {
    id: string;
    postId: string;
    text: string;
    author: string;
}
const initialPosts: Post[] = [
    {
        id: "1",
        title: "ИИ научился предсказывать землетрясения с 80% точностью",
        content: "Новая система искусственного интеллекта, разработанная в Калифорнийском технологическом институте, может предсказывать землетрясения за несколько дней до их начала с точностью до 80%.",
        author: "Научный корреспондент",
    },
    {
        id: "2",
        title: "Квантовый компьютер совершил прорыв в медицине",
        content: "Ученые использовали квантовый компьютер для моделирования сложных молекул, что ускорит разработку новых лекарств в 100 раз.",
        author: "Технологический обозреватель",
    },
    {
        id: "3",
        title: "В Европе запустили первую линию гиперлупа",
        content: "Первая коммерческая линия гиперлупа между Амстердамом и Парижем сократит время пути с 3 часов до 30 минут.",
        author: "Транспортный аналитик",
    },
    {
        id: "4",
        title: "NASA объявило о новой миссии на Марс",
        content: "Агентство планирует отправить экипаж из 4 астронавтов на Красную планету уже в 2031 году.",
        author: "Космический репортер",
    },
    {
        id: "5",
        title: "Ученые нашли способ замедлить старение",
        content: "Новый метод генной терапии показал эффективность в обращении вспять клеточного старения в доклинических испытаниях.",
        author: "Медицинский журналист",
    },
];
const initialComments: Comment[] = [
    { id: "1", postId: "1", text: "ничегосибе", author: "AI" },
    { id: "2", postId: "2", text: "что творится ну и ну", author: "Гончий пес" },
];

let posts = [...initialPosts];
let comments = [...initialComments];

export const getPosts = async () => posts;
export const getPostById = async (id: string) => posts.find(post => post.id === id);
export const getCommentsByPostId = async (postId: string) =>
    comments.filter(comment => comment.postId === postId);

export const addComment = async (postId: string, text: string, author: string) => {
    const newComment = {
        id: Date.now().toString(),
        postId,
        text,
        author
    };
    comments = [...comments, newComment];
    return newComment;
};

export const _resetData = () => {
    posts = [...initialPosts];
    comments = [...initialComments];
};


export const addPost = async (newPost: Post): Promise<Post> => {
    posts = [newPost, ...posts]
    return newPost
}

export const deletePost = async (id: string) => {
    posts = posts.filter(post => post.id !== id)
    return true
}

export const _resetPosts = () => {
    posts = [...initialPosts]
}