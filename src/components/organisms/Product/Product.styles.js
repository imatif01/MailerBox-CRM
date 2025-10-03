import styled from 'styled-components';

export const StyledProduct = styled.div`
  .product-gallery-images {
    margin: 0 0 10px;

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
  }
  .upload-field-holder {
    > div {
      margin: 0 0 10px;
    }

    &.feature {
      margin: 0 0 20px;
    }
  }

  .label,
  .add-more {
    display: block;
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
  }

  .product-description,
  .feature-detail-holder {
    textarea {
      min-height: 120px;
      resize: none;
    }
  }

  .feature-detail-holder {
    .label {
      margin: 0 0 10px;
    }
  }
`;
