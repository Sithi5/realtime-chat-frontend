import './App.css';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import SendMessage from './components/SendMessage';
import { useAppDispatch, useAppSelector } from './redux_toolkit/hooks';
import LoginPage from './pages/LoginPage';
import ChatRoomPage from './pages/ChatRoomPage';

function App() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  if (user && user.logged) {
    return (
      <div>
        <ChatRoomPage />
      </div>
    );
  } else {
    return (
      <div>
        <LoginPage />;
      </div>
    );
  }
}

export default App;
