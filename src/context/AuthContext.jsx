import { useContext, useState, createContext, useEffect } from "react"
import Cookies from "universal-cookie";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth"
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { auth, db, storage } from '../config/firebase'
import { Form } from "react-router-dom";

// Aut Context created and used in the provider function
const AuthContext = createContext()

// function for simplifiying recieved contexts but can use useContext in other components without using this
export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    // State we want to share
    const cookies = new Cookies();

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


    // any change in sign in and sign up

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    // Signup fnction return user data and we want to set it current user
    const signup = async (email, password, fullname, gender, birth, phone, address, photo) => {
        await createUserWithEmailAndPassword(auth, email, password)
            //adding info in database
            .then(async (result) => {

                const colRef = doc(db, "users", result.user.uid)
                await setDoc(colRef, {
                    firstName: fname,
                    lastName: lname,
                    surName: sname,
                    gender: gender,
                    birthDate: birth,
                    phoneNumber: phone,
                    address: address,
                })
                return result
            })
            .then(async (result) => {
                let photoUrl = ""
                if (photo) {
                    const imagePath = `profile/${result.user.uid}.${photo.type.split("/")[1]}`
                    const imageRef = ref(storage, imagePath)
                    await uploadBytes(imageRef, photo)
                    await updateProfile(result.user, { photoURL: imagePath })
                }
                cookieSetter(fname, lname, sname, address, phone, gender, birth, result.user.email, photoUrl, result.user.uid)
            })
    }

    const login = async ( {email, password}) => {
        console.log(email, password)
        const userCred = await signInWithEmailAndPassword(auth, email, password)
        // Fetching user info from db
        const colRef = doc(db, "users", userCred.user.uid)
        const docRef = (await getDoc(colRef)).data()
        const { firstName, lastName, surName, phoneNumber, address, gender, birthDate } = docRef
        cookieSetter(firstName, lastName, surName, address, phoneNumber, gender, birthDate, userCred.user.email, userCred.user.photoURL, userCred.user.uid)
    }

    const logout = async () => {
        await signOut(auth)
        cookieSetter()
    }

    const updateProfilePic = async (photo) => {
        let photoUrl = ""
        if (currentUser.photoURL) {
            await deleteObject(ref(storage, currentUser.photoURL))
        }
        if (photo) {
            photoUrl = `profile/${currentUser.uid}.${photo.type.split("/")[1]}`
            const imageRef = ref(storage, photoUrl )
            await uploadBytes(imageRef, photo)
        }
        await updateProfile(currentUser, { photoURL: photoUrl })
    }
    const updateEmailAddress = async (email) => {
        updateEmail(auth.currentUser, email)
            .then(()=>{
                alert("Email Updated")
            })
    }
    const updatePass = async (password) => {
        updatePassword(auth.currentUser, password)
            .then(() => {
                alert("Password Updated")
            })
    }
    const updateDetail = async ( values ) => {
        console.log(values)
        await updateDoc(doc(db, "users", currentUser.uid), {
            firstName: values["fname"],
            lastName: values["lname"],
            surName: values["sname"],
            gender: values["gender"],
            birthDate: values["birthDate"],
            phoneNumber: values["phone"],
            address: values["address"],
        })
        console.log(currentUser.uid)

        cookieSetter(values["fname"], values["lname"], values["sname"], values["address"], values["phone"], values["gender"], values["birth"])
    }


    const cookieSetter = (fname = "", lname = "", sname = "", address = "", phone = "", gender = "", birth = "", email = "", photoUrl = "", uid = "") => {
        cookies.set("firstName", fname)
        cookies.set("lastName", lname)
        cookies.set("surName", sname)
        cookies.set("address", address)
        cookies.set("phoneNumber", phone)
        cookies.set("gender", gender)
        cookies.set("birthDate", birth)
        // cookies.set("email", email)
        // cookies.set("photoUrl", photoUrl)
        // cookies.set("uid", uid)

    }

    // the value that is going to be shared is current user
    const value = { currentUser, signup, login, logout, updateProfilePic, updateEmailAddress, updatePass, updateDetail, updateProfilePic, cookies }

    return (
        // Every component surrounded by this will have the value

        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
