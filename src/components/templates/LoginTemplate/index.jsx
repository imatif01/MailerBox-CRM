import React from 'react';

import { TemplateHolder, Content, ContentHolder } from './LoginTemplate.styles';

function LoginTemplate({ children }) {
  return (
    <TemplateHolder>
      <Content>
        <ContentHolder>{children}</ContentHolder>
      </Content>
    </TemplateHolder>
  );
}

export default LoginTemplate;
