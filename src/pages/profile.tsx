import Link from "next/link"

const ProfilePage = () => {
  return <div>ProfilePage - Protected! as
    <Link href='/signup'>go to signup</Link>
    <Link href='/signin'>go to signin</Link>
  </div>
}

export default ProfilePage
