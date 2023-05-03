import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Container from '@mui/material/Container';
import Header from './components/Header';

// Pages
import Home from './pages/Home';
import Registration from './pages/Registration';
import FullPost from './pages/FullPost';
import AddPost from './pages/AddPost';
import Login from './pages/Login';

function App() {
  // const dispatch = useDispatch();
  // const isAuth = useSelector(selectIsAuth);

  // useEffect(() => {
  //   dispatch(getUserDataMe());
  // }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
