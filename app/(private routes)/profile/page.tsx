import { getMe } from "@/lib/api/serverApi";
import css from "../../../styles/ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub - Profile",
  description: "View and manage your profile information on NoteHub.",

  openGraph: {
    title: "Profile | NoteHub",
    description: "Manage your account settings and view your profile data.",
    url: "https://notehub.com/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Profile",
      },
    ],
    type: "website",
  },
};
const Profile = async () => {
  const user = await getMe();

  //  перевіркa якщо користувача немає
  if (!user) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <p>Unable to load profile data. Please try logging in again.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
