import React from 'react';
import { IUserInfo } from '@/types';
import { Avatar, Overlay, Menu, Icon } from '@alifd/next';
import { removeToken } from '@/utils/auth';
import styles from './index.module.scss';

const { Item } = Menu;
const { Popup } = Overlay;

const UserProfile = ({ userName = '', avatar = '', mail = '' }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <Avatar src={avatar} alt="用户头像" />
      </div>
      <div className={styles.content}>
        <h4>{userName}</h4>
        <span>{mail}</span>
      </div>
    </div>
  );
};

const HeaderAvatar = (props: IUserInfo) => {
  const { userName, avatar } = props;

  const logOut = () => {
    removeToken();
    window.location.reload();
  };
  return (
    <Popup
      trigger={
        <div className={styles.headerAvatar}>
          <Avatar size="small" src={avatar} alt="用户头像" />
          <span style={{ marginLeft: 10 }}>{userName}</span>
        </div>
      }
      triggerType="click"
    >
      <div className={styles.avatarPopup}>
        <UserProfile {...props} />
        <Menu className={styles.menu}>
          <Item>
            <Icon size="small" type="account" />
            个人设置
          </Item>
          <Item>
            <Icon size="small" type="set" />
            系统设置
          </Item>
          <Item onClick={logOut}>
            <Icon size="small" type="exit" />
            退出
          </Item>
        </Menu>
      </div>
    </Popup>
  );
};

HeaderAvatar.defaultProps = {
  userName: 'MyName',
  mail: 'name@gmail.com',
  avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
};

export default HeaderAvatar;
