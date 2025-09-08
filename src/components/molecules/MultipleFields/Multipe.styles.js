import styled from "styled-components";

export const MultipleFieldWrap = styled.div`
    margin-bottom: 1.625rem;
    .label{
        font-size: var(--font-size-sm);
    }
    .input-container{
        border: 1px solid var(--light);
        background: var(--white);
        outline: none;
        height: 60px;
        width: 100%;
        transition: border var(--animation-speed) ease-in-out;
        color: var(--secondary-text-color);
        font-size: var(--font-size-sm);
        border-radius: 12px;
        position: relative;
        input{
            height: 60px;
            width: 100%;
            border: 1px solid var(--light);
            padding: var(--form-element-padding);
            border-radius: 12px;
            transition: border var(--animation-speed) ease-in-out;
            &:focus{
                border-color: var(--primary);
            }
            &:focus-visible{
                 outline: none;
            }
        }
        .listWrap{
            position: absolute;
            left: 0;
            top: 5px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding-left: 1rem;
            .item{
                background-color: var(--primary);
                color: var(--white);
                font-size: 0.70rem;
                border-radius: 6px;
                margin-right: 3px;
                padding: 0.1rem 0.3rem;
            }
        }
    }
`