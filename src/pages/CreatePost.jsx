import { useRef, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { db, storage } from "../config/firebase"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import "../pages css/form.css"

export const CreatePost = () => {

    const { currentUser } = useAuth()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [post, setPost] = useState({
        fname: "",
        description: ""
    })

    const photoRef = useRef()
    const handleChange = (e) => {
        const {name, value} = e.target
        setPost((post) => ({
            ...post,
            [name] : value
        }))
    }
    

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        let picRef = photoRef.current.files[0]

        if (picRef && picRef.type.split("/")[0] != "image") {
            return setError('Profile pic must be a picture')
        }
        try {
            setError("")
            setLoading(true)
            const colRef = collection(db, "posts")
            const docRef = await addDoc(colRef, {
                poster : currentUser.uid,
                fullName: post["fname"],
                description: post["description"],
                photoURL: "",
                createdAt: serverTimestamp()
            })
            const imagePath = `posts/${docRef.id}.${picRef.type.split("/")[1]}`
            const imageRef = ref(storage, imagePath)
            await uploadBytes(imageRef, picRef)
            const imageLink = await getDownloadURL(imageRef)
            await updateDoc(doc(db, "posts", docRef.id), {
                photoURL : imageLink
            })

        }catch{
            setError("Error While Posting Retry")
        }
        setLoading(false)
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form__card">
                    <label className="form__label">Full Name of Missing Person:</label>
                    <br></br>
                    <input className="form__input" required onChange={handleChange} type='text' id='fname' name='fname' placeholder='Full Name'></input>
                </div>
                <div className="form__card">
                    <label className="form__label">Description of the Missing:</label>
                    <br></br>
                    <textarea className="form__input form__text" required onChange={handleChange} type='text' id='description' name='description' placeholder='description'></textarea>
                </div>
                <div className="form__card">
                    <label className="form__label">Picture of Missing Person:</label>
                    <br></br>
                    <input className="form__file" required type='file' id='photo' name='photo' ref={photoRef}></input>
                </div>
                <button className="form__submit" disabled={loading} type="submit">Post</button>
            </form>
            
        </div>
    )
}
