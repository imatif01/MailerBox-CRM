import styled from 'styled-components';

export const StyledProduct = styled.div`
  .product-gallery-images {
    .head,
    .add-more {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .head {
      margin: 0 0 10px;

      .add-more {
        background: var(--primary);
        color: var(--white);
        padding: 6px 12px;
        border-radius: 60px;
      }
    }

    .label,
    .add-more {
      font-size: 14px;
      line-height: 18px;
      font-weight: 600;
    }
  }

  .product-description{
    textarea{
        min-height: 120px;
        resize: none;
    }
  }
`;
