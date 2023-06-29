import React, { useEffect, useState } from 'react';
import './styles/App.css'
import { PostList } from './components/PostList';
import { PostForm } from './components/PostForm';
import { PostFilter } from './components/PostFilter';
import { MyModal } from './components/UI/MyModal/MyModal';
import { MyButton } from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePost';
import PostService from './API/PostService';

function App() {
  const [posts, setPosts] = useState([])

  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [isPostsLoading, setIsPostsLoading] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  async function fetchPosts() {
    setIsPostsLoading(true);
    setTimeout(async () => {
          const posts = await PostService.getALL();
          setPosts(posts);
          setIsPostsLoading(false);
    }, 1000)
    
  }

  const removePost = (post) => {
    setPosts(posts.filter(item => item.id !== post.id))
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
      {isPostsLoading ?
      <h1 style={{textAlign: "center"}}>Загрузка данных...</h1> :
      <PostList post={sortedAndSearchedPosts} title="Список постов JS" remove={removePost} />
      }
    </div>
  );
}

export default App;
