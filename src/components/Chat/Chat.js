import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import Message from "../Message/Message";
import ChatInput from "../ChatInput/ChatInput";
import db from "../../firebase";

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [noMessages, setNoMessages] = useState(false);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setRoomMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  useEffect(() => {
    if (!roomMessages.length) setNoMessages(true);
    else setNoMessages(false);
  }, [roomMessages]);

  const chatMessages = noMessages ? (
    <Message noMessages={noMessages} />
  ) : (
    roomMessages.map(({ message, timestamp, user, userImage }) => (
      <Message
        message={message}
        timestamp={timestamp}
        user={user}
        userImage={userImage}
        key={timestamp}
      />
    ))
  );

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <span># {roomDetails?.name}</span>
          </h4>
        </div>
        <div className="chat__headerRight"></div>
      </div>
      <div className="chat__messages">{chatMessages}</div>
      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  );
}

export default Chat;
