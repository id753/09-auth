import css from "../../../styles/ProfilePage.module.css";
/*//!!*Додайте на сторінку профілю усі небхідні meta-теги.
Для коректної роботи з віддаленими зображеннями у Next.js (аватар профілю) потрібно в next.config.ts додати розділ images з масивом remotePatterns, який обов’язково містить hostname: 'ac.goit.global'.
 */

const page = () => {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a src="" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <img
            src="Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
};

export default page;
