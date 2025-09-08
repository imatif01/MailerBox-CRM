import React from 'react';

import { StyledInfoCard, Title, Value } from './InfoCard.styles';

function InfoCard({ title, value, fontbase, ...props }) {
  return (
    <StyledInfoCard {...props}>
      {title && <Title fontbase={fontbase}>{title}</Title>}
      {Array.isArray(value) &&
        value.map(item => (
          <>
            <Value>{item}</Value>
            <br />
          </>
        ))}
      {!Array.isArray(value) && <Value fontbase={fontbase}>{value}</Value>}
    </StyledInfoCard>
  );
}

export default InfoCard;
