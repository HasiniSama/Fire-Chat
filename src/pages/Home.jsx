import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { db, auth, storage } from "../firebase"
import { collection, query, where, onSnapshot, addDoc, 
  Timestamp, orderBy, setDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import User from "../components/User"
import MessageForm from "../components/MessageForm"
import Message from "../components/Message"
import NavBar from '../components/Navbar'
import Icon from "../components/Icon"
import { FaSearch } from "react-icons/fa"

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

    const selectUser = async (user) => {
      setChat(user)
  
      const receiver = user.uid
      const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`
  
      const msgsRef = collection(db, "messages", id, "chat")
      const q = query(msgsRef, orderBy("createdAt", "asc"))
  
      onSnapshot(q, (querySnapshot) => {
        let msgs = []
        querySnapshot.forEach((doc) => {
          msgs.push(doc.data())
        })
        setMsgs(msgs)
      })
      
      // get last message between logged in user and selected user
      const docSnap = await getDoc(doc(db, "lastMsg", id))
      // if last message exists and message is from selected user
      if (docSnap.data() && docSnap.data().from !== sender) {
        // update last message doc, set unread to false
        await updateDoc(doc(db, "lastMsg", id), { unread: false })
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      const receiver = chat.uid
      
      const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`
  
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
  
      await setDoc(doc(db, "lastMsg", id), {
        text,
        from: sender,
        to: receiver,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
        unread: true,
      })
      
      setText("")
      setImg("")
    }

  return (
    <>
      <NavBar/>
      <MainContainer>
        <UsersContainer>
          <SearchBar> 
            {/* <Icon>
              <FaSearch/>
            </Icon> */}
          </SearchBar>  
          <Users>
            {users.map((user) => (
              <User key={user.uid} user={user} selectUser={selectUser} sender={sender} chat={chat}/>
            ))}
          </Users>
        </UsersContainer>
        <MessagesContainer>
            { chat ? (
            <>
              <UserMessages>
                <h3>{chat.name}</h3>
              </UserMessages> 
              <Messages>
                  {msgs.length ? msgs.map((msg, i) => (
                      <Message key={i} msg={msg} sender={sender} />
                    )) : null}
              </Messages>
              <MessageForm handleSubmit={handleSubmit} text={text} setText={setText} setImg={setImg}/>
            </>
            ) : 
              <NoConv>Select a User to Chat</NoConv>
            }
        </MessagesContainer>
      </MainContainer>
    </>
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

  @media screen and (max-width: 767px) {
    grid-template-columns: 2fr 3fr;
  }

  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr 5fr;
  }
`
const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgb(255,255,255,0.2);
`

const Users = styled.div`
  margin-top: 10px;
  overflow-y: auto;
`
const SearchBar = styled.div`
  height: 30px;
  margin: 5px 30px 5px 30px;
  /* background-color: rgb(255,255,255,0.1);
  backdrop-filter: "blur(10px)"; 
  border-radius: 25px; */
`
const MessagesContainer = styled.div`
  position: relative;
  width: 100%;
`
const UserMessages = styled.div`
  padding: 10px;
  text-align: center;
  background-image:linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0));
  backdrop-filter: "blur(10px)"; 
  box-shadow: 10px 10px 10px rgba(30,30,30,0.5);
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