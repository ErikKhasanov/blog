import React from 'react';
import styles from './UserInfo.module.scss';

function UserInfo({ avatarUrl, fullName, additionalText }) {
  const formatter = new Intl.DateTimeFormat('ru', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{formatter.format(new Date(additionalText))}</span>
      </div>
    </div>
  );
}

export default UserInfo;
