import { db } from 'data/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { IUserData } from 'types/auth'

const getUsername = async (
  uid: string
): Promise<{
  name: string
}> => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)

  const { name } = docSnap.data() as IUserData

  if (name) return { name }
  else return { name: '' }
}

export { getUsername }
