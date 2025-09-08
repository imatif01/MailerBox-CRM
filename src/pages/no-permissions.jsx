import React from 'react';
import NoPermissionsIllustration from 'assets/images/no-permission-illustration.svg';
import styledComponents from 'styled-components/macro';

const NoPermissionHolder = styledComponents.div`
  text-align: center;
  padding: 20px;
  margin-top: 20px;
  background: var(--white);
  border-radius: 10px;
  img{
    display: block;
    margin: 0 auto 30px;
    max-width: 350px;
  }
  span{
    font-size: var(--font-size-xl);
    line-height: calc(var(--font-size-xl) + 5px);
    color: var(--secondary-text-color);
  }
`;

export default function NoPermissions() {
  return (
    <NoPermissionHolder>
      <img src={NoPermissionsIllustration} alt="no permission" />
      <span>You Dont Have Permission To Access This , Kindly contact Houdiny Admin for more details</span>
    </NoPermissionHolder>
  );
}
