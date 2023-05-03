import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../api/axios';

import Post from '../components/Post';
import AddComment from '../components/AddComment';
import CommentsBlock from '../components/CommentsBlock';

function FullPost() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    Axios.get(`/posts/${id}`).then((res) => {
      setData(res.data);
      setIsLoading(false);
    }).catch((error) => {
      console.warn(error);
      alert('Ошибка получения статьи');
    });
  }, []);

  if (isLoading) return <Post isFullPost isLoading={isLoading} />;
  return (
    <>
      <Post
        id={data.od}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.author}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>
          {data.text}
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <AddComment />
      </CommentsBlock>
    </>
  );
}

export default FullPost;
