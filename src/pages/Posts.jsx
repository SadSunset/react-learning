import React, { useEffect, useState } from 'react';
import './styles/App.css'
import { PostList } from './components/PostList';
import { PostForm } from './components/PostForm';
import { PostFilter } from './components/PostFilter';
import { MyModal } from './components/UI/MyModal/MyModal';
import { MyButton } from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePost';
import PostService from './API/PostService';
import { Loader } from './components/UI/Loader/Loader'; 
import { useFetching } from './hooks/useFetching';
import { getPageCount } from './utils/pages';
import { Pagination } from './components/UI/Pagination/Pagination';

export function Posts() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [modal, setModal] = useState(false)
    const [totalCount, setTotalCount] = useState(0)
    const [totalPages, setTotalPages] = useState(10)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)


    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getALL(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(item => item.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
    }

    return (
        <div className="App" fetchPosts={fetchPosts}>
            <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>Создать пользователя</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: "15px 0" }} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Произошла ошибка {postError}</h1>
            }
            {isPostsLoading ?
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}><Loader /> </div> :
                <PostList post={sortedAndSearchedPosts} title="Список постов JS" remove={removePost} />
            }
            <Pagination page={page} changePage={changePage} totalPages={totalPages} />
        </div>
    );
}
