import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './Message.css';
import { UserContext } from '../userContext/UserContext';

function Message() {
  const { userName } = useParams();
  const [otherUserName, setOtherUserName] = useState('');
  const [messageCreated, setMessageCreated] = useState('');
  const [friendInput, setFriendInput] = useState('');
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const intervalRef = useRef(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && Array.isArray(user.friends)) {
      setFriends([...user.friends]);
    } else {
      setFriends([]);
    }
  }, [user]);

  const handleAddFriend = () => {
    const trimmedFriend = friendInput.trim();
    if (trimmedFriend && !friends.includes(trimmedFriend)) {
      setFriends([...friends, trimmedFriend]);
      setFriendInput('');
    }
  };

  const handleRemoveFriend = () => {
    setFriends(friends.filter(friend => friend !== friendInput.trim()));
    setFriendInput('');
  };

  const fetchMessages = useCallback(async (userName, page) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('No access token found. Please log in.');
      return;
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const response = await fetch(`/api/v1/users/${userName}/message/${page}`, options);
      if (response.ok) {
        const responseData = await response.json();
        setMessages(prevMessages => [...responseData.data].reverse() || []);
      } else {
        const errorData = await response.json();
        alert(`Fetching messages failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching messages. Please try again.');
    }
  }, []);

  useEffect(() => {
    clearInterval(intervalRef.current);
    setMessages([]);
    if (otherUserName === '') {
      return;
    }
    intervalRef.current = setInterval(() => {
      fetchMessages(otherUserName, page);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [otherUserName, page, fetchMessages]);

  const handleOpenMessages = (event) => {
    const selectedUserName = event.target.value;
    setOtherUserName(selectedUserName);
    setPage(1);
  };

  const handleMessageSend = async () => {
    const trimmedMessage = messageCreated.trim();
    if (trimmedMessage) {
      const messageData = {
        messToUserName: otherUserName,
        messContent: trimmedMessage
      };

      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('No access token found. Please log in.');
        return;
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(messageData)
      };

      try {
        const response = await fetch(`/api/v1/users/${otherUserName}/message/send`, options);
        if (response.ok) {
          setPage(1);
          await fetchMessages(otherUserName, page);
          setMessageCreated('');
        } else {
          const errorData = await response.json();
          alert(`Sending message failed: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending the message. Please try again.');
      }
    }
  };

  const handleLoadOlderMessages = () => {
    setPage(prev => prev + 1);
  };

  const handleLoadNewerMessages = () => {
    setPage(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className='message-container'>
      {/* <h1>Welcome {userName}</h1> */}
      <div className='add-friend'>
        <input
          value={friendInput}
          onChange={(e) => setFriendInput(e.target.value)}
          placeholder='Friend to Add or Remove'
        />
        <button onClick={handleAddFriend} type='button'>Add Friend</button>
        <button onClick={handleRemoveFriend} type='button'>Remove Friend</button>
      </div>
      <div className='message-box'>
        <div className='talk-with'>
          <select value={otherUserName} onChange={handleOpenMessages} required>
            <option value=''>Select Other's userName</option>
            {friends.map((friend, index) => (
              <option key={index} value={friend}>{friend}</option>
            ))}
          </select>
          <input value={userName} readOnly />
        </div>
        
        {/* <div className='page-info'>Page: {page}</div> */}
        <button type='button' onClick={handleLoadOlderMessages}>Load Older Messages</button>
        <button type='button' onClick={handleLoadNewerMessages}>Load Newer Messages</button>
        <div className='messages'>
        <div className='page-info'>Page: {page}</div>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className='message'>
                <div className='message-date'>{message.createdAt}</div>
                <div className='message-content'>
                  <div className='message-sender'>{message.senderUserName}:</div>
                  <div className='actual-message'>{message.messContent}</div>
                </div>
              </div>
            ))
          ) : (
            
            <p>No messages to display.</p>
          )}
        </div>
      
        <div className='create-message'>
          <input
            value={messageCreated}
            onChange={(e) => setMessageCreated(e.target.value)}
            placeholder='Type your message...'
          />
          <button onClick={handleMessageSend} type='button' className='send-message-btn'>Send ></button>
        </div>
      </div>
    </div>
  );
}

export default Message;
