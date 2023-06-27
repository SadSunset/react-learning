import React, { useMemo, useState } from 'react';
import './styles/App.css'
import { PostList } from './components/PostList';
import { PostForm } from './components/PostForm';
import { PostFilter } from './components/PostFilter';
import { MyModal } from './components/UI/MyModal/MyModal';

function App() {
  const [posts, setPosts] = useState(
    [
      { id: 1, title: 'JavaScript', body: "Description" },
      { id: 2, title: 'Python', body: "Dascription" },
      { id: 3, title: 'C++', body: "Description" }
    ]
  )

    const [filter, setFilter] = useState({sort: '', query: ''})

  const sortedPosts = useMemo(() => {
      if (filter.sort)
        return ([...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort])));
      else
        return (posts);
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
      return (sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query)))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
      setPosts([...posts, newPost]);
  }

  const removePost = (post) => {
      setPosts(posts.filter(item => item.id !== post.id))
  }

  return (
    <div className="App">
      <MyModal visible={true}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{margin: "15px 0"}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <PostList post={sortedAndSearchedPosts} title="Список постов JS" remove={removePost}/>
    </div>
  );
}

export default App;
