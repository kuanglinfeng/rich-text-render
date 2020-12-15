import Preview from './components/Preview';
import styled from 'styled-components';
import { useState } from 'react';
import { message } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import RichSelect from './components/RichSelect';

const Container = styled.div`
    font-size: 16px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const EditorWrapper = styled.div`
    margin-right: 10vw;
    position: relative;
`;

const CopyButton = styled.button`
    outline: none;
    position: absolute;
    width: 4em;
    height: 2em;
    font-size: 12px;
    top: 2px;
    right: 2px;
    color: #8c8c8c;
    transition: color 0.1s;
    cursor: pointer;
`;

const Editor = styled.textarea`
    height: 800px;
    padding: 40px 20px;
    overflow: auto;
    outline: none;
    box-shadow: none;
    resize: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
        'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
    font-size: 16px;
`;

// 知识点记忆
const text1 = `<b>商品的价值和使用价值的<ume>对立统一</ume>关系。</b>
<b>(1) 对立性：<ume>相互排斥，二者不可兼得。</ume></b>
<i/>①要获得商品的价值，就必须放弃商品的使用价值。
<i/>② 要得到商品的使用价值，就得不到商品的价值。
<b>(2) 统一性：作为商品<ume>必须同时具有使用价值和价值两个因素。</ume></b>
<i />使用价值是价值的物质承担者，价值寓于使用价值之中。
`;

// 带tab的知识点记忆
const text2 = `商品的价值和使用价值的<ume>对立统一</ume>关系。
<t>
table_1 物质与运动
运动：是<b><ume>物质的根本属性</ume></b>。世界是物质的，而物质是运动的。
关系：不可分割
(1) <b><ume>物质是运动的物质</ume></b>，没有不运动的物质。
(2) <b><ume>运动是物质的运动</ume></b>。物质是一切运动变化和发展过程的实在基础和承担者，世界上没有离开物质的运动。

table_2 运用与静止
运动：是<b><ume>物质的根本属性</ume></b>。世界是物质的，而物质是运动的。
关系：不可分割

table_3 时间与空间
运动：是<b><ume>物质的根本属性</ume></b>。世界是物质的，而物质是运动的。
关系：不可分割
(1) <b><ume>物质是运动的物质</ume></b>，没有不运动的物质。
</t>
`;

function App() {
    const [text, setText] = useState(text2);

    const handleTextChange = (e) => {
        e.preventDefault();
        setText(e.target.value);
    };

    const handleCopy = () => {
        const input = document.createElement('textarea');
        document.body.appendChild(input);
        input.value = text;
        input.focus();
        input.select();
        if (document.execCommand('copy')) {
            document.execCommand('copy');
        }
        input.blur();
        message.success('复制成功');
        document.body.removeChild(input);
    };

    return (
        // <Container>
        //     <div>
        //         <h3>编辑：</h3>
        //         <EditorWrapper>
        //             <CopyButton onClick={handleCopy}>复制</CopyButton>
        //             <Editor
        //                 cols={80}
        //                 value={text}
        //                 onChange={handleTextChange}
        //             />
        //         </EditorWrapper>
        //     </div>
        //     <div>
        //         <h3>预览：</h3>
        //         <Preview data={text} />
        //     </div>
        // </Container>
        <RichSelect showType="filling" />
    );
}

export default App;
