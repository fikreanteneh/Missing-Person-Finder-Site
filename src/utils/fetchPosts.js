import { db } from "../config/firebase"
import { collection, query, orderBy, startAfter, limit, getDocs, where, endBefore} from "firebase/firestore"

exports.paginate = async (curr, size = 10,  pos = "lower",target = ["poster", "!=", "1"]) => {
    const position = pos == "lower" ? startAfter(curr) : endBefore(curr) 
    const docRef = collection(db, "posts")
    const fullQuery = query(docRef, orderBy("createdAt", "desc"), limit(size), position, where(target[0], target[1], target[2]))
    let currData = []
    const response = await getDocs(fullQuery)
    response.forEach(async (doc) => {
      currData.push({
        ...doc.data(), 
        id: doc.id, 
      })
    })

     return currData
  }