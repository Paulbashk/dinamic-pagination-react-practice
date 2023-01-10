import axios from "axios";

export default class PostService {
    // Функция получения всех постов
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        });
        return response;

    }
    // Функция получения одного поста
    static async getById(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return response;

    }
    // Функция получения комментариев поста
    static async getCommentsPostById(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return response;

    }
}