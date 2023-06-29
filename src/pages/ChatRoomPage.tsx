import { useEffect, useState } from 'react';
import Topbar from '../components/TopBar';
import { useAppDispatch, useAppSelector } from '../redux_toolkit/hooks';
import { logoutUser } from '../redux_toolkit/userSlice';
import styles from './ChatRoomPage.module.css';

type Message = {
  message: string;
  senderName: string;
  date: string;
};

const ChatRoomPage = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState('');

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch(
          `http://localhost:3000/chat/getMessage/${room}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedMessages = await response.json();
        const parsedMessages = fetchedMessages.map(JSON.parse);
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    if (room && room !== '') {
      fetchMessages();
      const eventSource = new EventSource(
        'http://localhost:3000/chat/subscribe/' + room
      );

      eventSource.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, parsedData]);
      };

      eventSource.onerror = (event) => {
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
  }, [room]);

  const disconnectUser = () => {
    dispatch(logoutUser());
  };

  const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (newMessage) {
      try {
        const response = await fetch('http://localhost:3000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: newMessage,
            topic: room,
            senderName: user.email,
          }),
        });

        if (response.ok) {
          setNewMessage('');
        } else {
          console.error('Error sending message:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  if (room && room !== '') {
    return (
      <div>
        <Topbar />
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            height: '90vh',
          }}
        >
          <div
            className={styles.chatbox}
            style={{ boxShadow: '0px 0px 30px #F4AAB9' }}
          >
            <div className={styles.messages}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.senderName === user.email
                      ? styles.messageSelf
                      : styles.messageOther
                  }
                >
                  <div className={styles.messageHeader}>
                    <span className={styles.senderName}>
                      {message.senderName}
                    </span>
                    <span className={styles.date}>
                      {new Date(message.date).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className={styles.messageContent}>{message.message}</div>
                </div>
              ))}
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                onKeyDown={handleKeyDown}
                value={newMessage}
                onChange={handleNewMessageChange}
                className={styles.inputField}
                placeholder="Type your message..."
              />
              <button
                className={styles.sendButton}
                onClick={handleSendMessage}
                disabled={!newMessage}
              >
                Send
              </button>
            </div>
            <div className={styles.disconnect_button_container}>
              <button
                className={styles.disconnect_button}
                onClick={disconnectUser}
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Topbar />
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            height: '90vh',
          }}
        >
          <div className={styles.button_container}>
            <button
              className={styles.connect_button}
              onClick={() => {
                setRoom('chat-room1');
              }}
            >
              room-1
            </button>
            <button
              className={styles.connect_button}
              onClick={() => {
                setRoom('chat-room2');
              }}
            >
              room-2
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ChatRoomPage;
