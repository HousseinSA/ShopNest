'use client';

import UserInfo from '@/components/Navigation/user-state/UserInfo'

const UserInfoWrap = ({customUser}) => {
  return (
      <UserInfo  
      customUser={customUser}
      />
  );
};

export default UserInfoWrap;
