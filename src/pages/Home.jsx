import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { db, auth, storage } from "../firebase"
import { collection, query, where, onSnapshot, addDoc, 
  Timestamp, orderBy, setDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import User from "../components/User"
import MessageForm from "../components/MessageForm"
import Message from "../components/Message";


const Home = () => {

    const [users, setUsers] = useState([])
    const [chat, setChat] = useState("")
    const [text, setText] = useState("")
    const [img, setImg] = useState("")
    const [msgs, setMsgs] = useState([])

    const sender = auth.currentUser.uid

    useEffect(() => {
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("uid", "not-in", [sender]))
      const unsub = onSnapshot(q, (querySnapshot) => {
        let users = []
        querySnapshot.forEach((doc) => {
          users.push(doc.data())
        });
        setUsers(users)
      });
      return () => unsub()
    }, []);

    const selectUser = (user) => {
      setChat(user)
  
      const receiver = user.uid
      const id = sender > receiver ? `${sender + receiver}` : `${sender + receiver}`
  
      const msgsRef = collection(db, "messages", id, "chat")
      const q = query(msgsRef, orderBy("createdAt", "asc"))
  
      onSnapshot(q, (querySnapshot) => {
        let msgs = []
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data())
        })
        setMsgs(msgs)
      })
      
      console.log(msgs)
      // // get last message b/w logged in user and selected user
      // const docSnap = await getDoc(doc(db, "lastMsg", id))
      // // if last message exists and message is from selected user
      // if (docSnap.data() && docSnap.data().from !== user1) {
      //   // update last message doc, set unread to false
      //   await updateDoc(doc(db, "lastMsg", id), { unread: false })
      // }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      const receiver = chat.uid
      
      const id = sender > receiver ? `${sender + receiver}` : `${sender + receiver}`
  
      let url;
      if (img) {
        const imgRef = ref(
          storage, 
          `images/${new Date().getTime()} - ${img.name}`
        );
        const snap = await uploadBytes(imgRef, img)
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
        url = dlUrl
      }
  
      await addDoc(collection(db, "messages", id, "chat"), {
        text,
        from: sender,
        to: receiver,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
      })
  
      // await setDoc(doc(db, "lastMsg", id), {
      //   text,
      //   from: user1,
      //   to: user2,
      //   createdAt: Timestamp.fromDate(new Date()),
      //   media: url || "",
      //   unread: true,
      // })
      
      setText("")
      setImg("")
    }

  return (
    <MainContainer>
      <UserContainer>
        {users.map((user) => (
          <User key={user.uid} user={user} selectUser={selectUser}/>
        ))}
      </UserContainer>
      <MessagesContainer>
          { chat ? (
          <>
            <UserMessages>
              <h3>{chat.name}</h3>
            </UserMessages> 
            <Messages>
                {msgs.length ? msgs.map((msg, i) => (
                  <Message key={i} msg={msg} sender={sender} />
                )): null}
            </Messages>
            <MessageForm handleSubmit={handleSubmit} text={text} setText={setText} setImg={setImg}/>
          </>
          ) : 
            <NoConv>Select a User to Chat</NoConv>
          }
      </MessagesContainer>
    </MainContainer>
  )
}

const MainContainer = styled.div`
  position: relative;
  display: grid;
  background-color: var(--color-1);
  grid-template-columns: 1fr 3fr;
  overflow: hidden;
  height: calc(100vh - 70px);
  width: 100vw;
`
const UserContainer = styled.div`
  margin-top: 10px;
  border-right: 2px solid var(--color-2);
  overflow-y: auto;
`
const MessagesContainer = styled.div`
  position: relative;
  width: 100%;
`
const UserMessages = styled.div`
  padding: 10px;
  text-align: center;
  border-bottom: 2px solid var(--color-6);
`
const NoConv = styled.div`
  font-size: 20px;
  margin-top: 100px;
  color: var(--color-2);
  text-align: center;
`
const Messages = styled.div`
  height: calc(100vh - 200px);
  overflow-y: auto;
  border-bottom: 1px solid var(--color-6);
`
export default Home