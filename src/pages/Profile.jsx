import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import UserImg from '../assets/images/user.png'
import Camera from '../components/svg/Camera'
import { storage, db, auth } from "../firebase"
import { getDoc, doc, updateDoc } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage"

const Profile = () => {

    const [img, setImg] = useState("");
    const [user, setUser] = useState();

    useEffect(() => {
        getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
          if (docSnap.exists) {
            setUser(docSnap.data());
          }
        });
    
        if (img) {
          const uploadImg = async () => {
            const imgRef = ref(
              storage,
              `avatar/${new Date().getTime()} - ${img.name}`
            );
            try {
              if (user.avatarPath) {
                await deleteObject(ref(storage, user.avatarPath));
              }
              const snap = await uploadBytes(imgRef, img);
              const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
    
              await updateDoc(doc(db, "users", auth.currentUser.uid), {
                avatar: url,
                avatarPath: snap.ref.fullPath,
              });
    
              setImg("");
            } catch (err) {
              console.log(err.message);
            }
          };
          uploadImg();
        }
      }, [img]);

  return user ? (
    <MainContainer>
        <ImgContainer>
            <Img src={user.avatar || UserImg} alt="avatar"></Img>
            <Overlay>
                <div>
                    <label htmlFor='photo'>
                        <Camera/>   
                    </label>
                    <input type="file" accept="image/*" style={{ display: "none" }} id="photo"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                </div>
            </Overlay>
        </ImgContainer>
        <TextContainer>
            <TextName>{user.name}</TextName>
            <p>{user.email}</p>
            <HorizontalRule />
            <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
        </TextContainer>
  </MainContainer>
  ): null;
}

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    width: 30vw;
    margin: auto;
    padding: 1rem;
    background-color: 'transparent';
    /* backdrop-filter: blur(5px); */
    box-shadow: 20px 20px 50px 0 rgb(0,0,0,0.5);
    border-radius: 10px;
    border: 1px solid rgb(255,255,255,0.3);
    border-right: 0;
    border-bottom: 0;
`

const Overlay = styled.div`
    transition: 0.5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    
`

const Img = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid var(--color-1);
    transition: 0.5s ease-in-out all;

`

const ImgContainer = styled.div`
    position: relative;
    margin-right: 20px;

    &:hover {
        ${Overlay}{
            opacity: 1;
        }
        ${Img}{
            opacity: 0.4;
        }
    }
`

const TextContainer = styled.div`
    flex-grow: 1;
    color: white;
`

const TextName = styled.h3`
    text-align: left;
`

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.1rem;
  border-radius: 0.8rem;
  background-color: #ebd0d0;
  margin: 0.5rem 0 0.5rem 0;
  backdrop-filter: blur(25px);
`

export default Profile