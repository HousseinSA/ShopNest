'use client';

import UserInfo from '@/components/Navigation/UserInfo'

const UserInfoWrap = ({customUser}) => {
  return (
      <UserInfo  
      customUser={customUser}
      />
  );
};

export default UserInfoWrap;
