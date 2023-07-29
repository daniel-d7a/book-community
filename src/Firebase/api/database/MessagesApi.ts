import {
    collection,
    getDocs,
    query,
    doc,
    where,
    getDoc,
    addDoc,
    deleteDoc,
    setDoc,
    updateDoc,
    Timestamp,
    arrayUnion,
  } from "firebase/firestore";
  import firebase from 'firebase/app'
  import 'firebase/database'
  import { db } from "./database";
  import { SignUpData, signUpDataSchema } from "../../../Types/Auth";
  import { storage } from "./database";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import { auth } from "../auth/auth";
  

  const messagesCollectionRef = collection(db, "messages");
  /**
   * Retrieves a user by their ID from the database.
   *
   * @param {string} id - The ID of the user to retrieve.
   * @throws {Error} If the ID is empty.
   * @throws {Error} If the user does not exist.
   * @return {Promise<SignUpData>} A promise that resolves with the user data if found
   */
  export async function getMessagesById(id: string){
    if (!id) throw new Error("id cannot be empty");
  
    const messageDocRef = doc(db, "messages", id);
    const messageDoc = await getDoc(messageDocRef);
    if (messageDoc.exists()) {
      return messageDoc.data();
    } else {
      throw new Error("Error!");
    }
  }

  export async function getChatMessages(chatId: string) {

    if (!chatId) throw new Error("chatId cannot be empty");
  
    const docRef = doc(db, "chats", chatId);
    const docSnap = await getDoc(docRef);
    const messagesIds = docSnap.data()?.message_ids;
    console.log(messagesIds);
  
    const messages = await Promise.all(
      messagesIds.map(async (id: string) => {
        const messageData = (await getDoc(doc(db, "messages", id))).data();
        console.log("message data", messageData);
  
        const userData = (
          await getDoc(doc(db, "users", messageData?.sender_id))
        ).data();
        return {
          id,
          ...messageData,
          user_data: userData,
        };
      })
    );
  
    return messages.sort((a, b) => a.sent_at - b.sent_at);
  }

  export async function addMessage(
    chatId: string,
    messageText: string
  ): Promise<void> {
  
    if (!messageText) throw new Error("empty");
    if(!chatId) throw new Error("empty");
  
    //create new doc in comments collection
    const newMsgId = await addDoc(messagesCollectionRef, {
      text: messageText,
      sent_at: Timestamp.now(),
      sender_id: auth?.currentUser?.uid
    });
  
    // console.log("new comment id", newMsgId);
  
    const docRef = doc(db, "chats", chatId);
    console.log(chatId)
    return await updateDoc(docRef, {
      message_ids: arrayUnion(newMsgId.id),
    });
  }