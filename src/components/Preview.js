import { useState } from 'react';
import styled from 'styled-components';
import RichText from './RichText';

const Container = styled.div`
    font-size: 14px;
    white-space: pre-wrap;
    width: 375px;
    height: 812px;
    overflow-y: auto;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.75);
    .richText {
        padding: 20px;
    }
`;

const Preview = ({ data }) => {
    const [maskVisible, setMaskVisible] = useState(false);

    return (
        <Container>
            <RichText
                className="richText"
                data={data}
                maskVisible={maskVisible}
            />
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <button onClick={() => setMaskVisible(!maskVisible)}>
                    点击背题
                </button>
            </div>
        </Container>
    );
};

export default Preview;
