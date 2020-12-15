import { useState } from 'react';
import styled from 'styled-components';
import RichText from './RichText';

const Container = styled.div``;

// const data = {
//     options: [
//         '对立统一',
//         '完全统一',
//         '必须同时具有使用价值和价值两个因素',
//         '相互排斥，二者不可兼得',
//     ],
//     solutions: [
//         '对立统一',
//         '相互排斥，二者不可兼得',
//         '必须同时具有使用价值和价值两个因素',
//     ],
// text: `商品的价值和使用价值的<ume>对立统一</ume>关系。
// <b>1. 对立性：<ume>相互排斥，二者不可兼得</ume></b>。
// <b>2. 统一性：作为商品<ume>必须同时具有使用价值和价值两个因素</ume></b>。`,
// };
const data = {
    options: [
        '对立统一',
        '相互排斥，二者可以兼得',
        '使用价值和价值',
        '商业使用价值和价值',
        '相互排斥，二者不可兼得',
    ],
    solutions: ['对立统一', '相互排斥，二者不可兼得', '使用价值和价值'],
    text: `商品的价值和使用价值的<ume>对立统一</ume>关系
    <b>1.对立性：<ume>相互排斥，二者不可兼得</ume></b>。
    <i/>①要获得商品的价值，就必须放弃商品的使用价值。
    <i/>②要得到商品的使用价值，就得不到商品的价值。
    <b>2.统一性：作为商品具有<ume>使用价值和价值</ume></b>两个因素。
    <i/>①使用价值是价值的物质承担者，价值寓于使用价值之中`,
};
const RichSelect = ({ showType }) => {
    const [answers, setAnswers] = useState([]);

    const handleOptionSelect = (index) => {
        const answer = data.options.splice(index, 1)[0];
        setAnswers([...answers, answer]);
    };

    return (
        <Container>
            <RichText data={data.text} showType={showType} answers={answers} />
            <ul>
                {data.options.map((option, index) => (
                    <li key={option} onClick={() => handleOptionSelect(index)}>
                        {option}
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default RichSelect;
