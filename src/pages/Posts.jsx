import React, {useState, useEffect, useRef} from 'react';
import PostForm from '../Components/PostForm';
import PostList from '../Components/PostList';
import PostFilter from '../Components/PostFilter';
import MyModal from '../Components/UI/MyModal/MyModal';
import MyButton from '../Components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../Components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../Components/utils/pages';
import Pagination from '../Components/UI/pagination/Pagination';
import { Outlet } from 'react-router-dom';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../Components/UI/select/MySelect';

function Posts() {

  // Массив для постов
  const [posts, setPosts]  = useState([]);

  // Состояние для select сортировки и 2-ух стороннее связывание
  const [filter, setFilter] = useState({sort: '', query: ''});

  // Состояние для отображения модального окна
  const [modal, setModal] = useState(false);

  // Состояние для максимального числа постов, полученных от сервера
  const [totalPages, setTotalPages] = useState(0);

  // Состояние для максимального числа постов на странице (пагинация)
  const [limit, setLimit] = useState(10);
  // Состояние для максимального числа страниц постов (пагинация)
  const [page, setPage] = useState(1);

  // Переменная, отлавливает элемент в конце постов, необходимый для работы динамической пагинации
  const lastElement = useRef();

  // Функция обрабатывает fetch-запрос на наличие ошибок.
  // Возвращает: функцию запроса, состояние прелоадера, и ошибку
  const [fetchPosts, isPostsPreloader, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);

    const totalCount = response.headers['x-total-count']; // Получаем из header-ов страницы данные: Макс. число постов
    setTotalPages(getPageCount(totalCount, limit)); // Получаем кол-во страниц и сохраняем это число в состояние
  });

  // Получает отфильтрованный и отсортированный массив постов из кастомного хука
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  /* Callback функция, вызывается в PostForm, возвращает созданный пост */
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  /* Callback функция, возвращает пост, который необходимо удалить */
  const removePost = (currentPost) => {
    setPosts(posts.filter(post => post.id !== currentPost.id));
  }

  // Функция подгружает нужные посты при клике пагинации
  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
  }

  /* useEffect - следит за жизненным циклом компонента на каждом этапе: mount, update, unmount */
  /* В данном случае, useEffect следит за этапом mount, и отработает при монтировании компонента (его создании), т.е. один раз */
  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]); // [limit] - следим за изменением лимита показа постов (для select) и следим за изменением page (вывод постов)

  // Динамическое обновление постов (пагинорование) при прокрутки страницы
  useObserver(lastElement, page < totalPages, isPostsPreloader, () => {
    setPage(page + 1);
  });


  // Функция сортировки
  // Если selectedSort: select сортировки не пуст, т.е. выбрана сортировка, то вернет отсортированный массив постов
  // Если selectedSort не использовался, т.е. select не выбран, то вернет массив постов
  const getSortedPosts = () => {
    return filter.sort 
      ? [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort])) 
      : posts;
  } 
  // Результат getSortedPosts. sortedPosts - вызовется в PostList->PostItem для отрисовки необходимых постов
  // const sortedPosts = getSortedPosts();

  
  return (
    <div className="paget">          
        <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
          Создать пост
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm callback={createPost}/>
        </MyModal>
        <hr style={{margin: '15px 0'}} />
        <PostFilter filter={filter} setFilter={setFilter} />
        <MySelect
          value={limit}
          callback={value => setLimit(value)}
          defaultValue="Кол-во элементов на странице"
          options={[
            {value: 5, name: '5'},
            {value: 10, name: '10'},
            {value: 25, name: '25'},
            {value: -1, name: 'Показать все'},
          ]}
        />
        <div style={{marginTop: '60px'}}></div>
        {postError && <h1>Произошла ошибка ${postError}</h1> }
        {isPostsPreloader &&
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
        }
        <PostList callback={removePost} posts={sortedAndSearchedPosts} title='Языки программирования'/>
        <div ref={lastElement} style={{height: '20px', background: 'red'}}></div>
        <Pagination
          page={page}
          changePage={changePage}
          totalPages={totalPages}
          limit={limit}
        />  
        <Outlet />       
    </div>
  );
}

export default Posts;
