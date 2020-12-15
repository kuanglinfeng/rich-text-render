import PropTypes from 'prop-types';
import styled from 'styled-components';
import richTextParser from '../utils/richTextParser';
import { RICH_TEXT_TYPE } from '../constants';
import RichTabs from './RichTabs';

const Container = styled.div``;

const Line = styled.div`
    margin: 5px 0;
    font-size: 15px;
    color: #2f2b2b;
    &.indent {
        margin: 0 0 0 1em;
        color: #666;
        border-left: 3px solid #f5f5f5;
        padding: 0 0 0 10px;
        > span {
            padding: 5px 0;
        }
    }
    span.bold {
        font-weight: 600;
        color: #333;
    }
    span.underline-mask-empty {
        /* underline */
        border-bottom: 1px dashed
            ${(props) => (props.maskActive ? '#ccc' : '#91c854')};
        /* border-bottom: 1px dashed #91c854; */
        /* mask */
        /* height: ${(props) => (props.maskActive ? '140%' : '100%')}; */
        background: ${(props) => (props.maskActive ? '#ebf6df' : '#fff')};
        background-clip: content-box;
        /* border-radius: ${(props) => (props.isEmpty ? '0' : '3px')}; */
        color: ${(props) => (props.maskActive ? '#ebf6df' : 'inherit')};
        user-select: ${(props) => (props.maskActive ? 'none' : 'auto')};
    }
    span.empty {
        display: inline-block;
        width: 4em;
    }
`;

const Block = styled.span`
    padding: 2px 0;
`;

const EmptyBlock = styled(Block)`
    &#empty {
        border-bottom: 1px solid #000;
        color: ${(props) => (props.isEmpty ? '#fff' : 'inherit')};
        user-select: ${(props) => (props.isEmpty ? 'none' : 'auto')};
    }
`;

const BlankLine = styled.div`
    height: 1em;
`;

const TEXT_TAG_MAP = {
    b: 'bold',
    i: 'indent',
    ume: 'underline-mask-empty',
};

function buildBlockClassName(tags) {
    if (!tags.length) return '';
    return tags.map((tag) => TEXT_TAG_MAP[tag]).join(' ');
}

function blockRender(type, tags, content, idx, showType, isEmpty) {
    const umeTag = tags && tags.find((tag) => tag === 'ume');
    const props = {
        isEmpty,
        key: idx,
        className: type === RICH_TEXT_TYPE.Tag ? buildBlockClassName(tags) : '',
    };
    if (!content) return null;
    if (showType === 'filling' && umeTag)
        return (
            <EmptyBlock id="empty" {...props}>
                {content}
            </EmptyBlock>
        );
    return <Block {...props}>{content}</Block>;
}

function lineRender(blocks, idx, className, maskVisible, showType) {
    if (!blocks.length) return <BlankLine key={idx} />;
    console.log(blocks);
    return (
        <Line className={className} key={idx} maskActive={maskVisible}>
            {blocks.map(({ type, tags, content, isEmpty }, blockIdx) => {
                // console.log(tags);
                // if (tags && tags.find(tag => tag === 'ume')) {

                // }
                return blockRender(
                    type,
                    tags,
                    content,
                    blockIdx,
                    showType,
                    isEmpty
                );
            })}
        </Line>
    );
}

function contentRender(text, className, maskVisible, showType, answers) {
    const renderArr = [];
    const lines = text.split('\n');
    let isMatchingTabs = false;
    let matchTabsValue = '';
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.indexOf('<t>') !== -1) {
            isMatchingTabs = true;
            matchTabsValue = '<t>\n';
            continue;
        }
        if (isMatchingTabs) {
            matchTabsValue += line + '\n';
            if (line.indexOf('</t>') !== -1) {
                isMatchingTabs = false;
                renderArr.push({ type: 'tabs', value: matchTabsValue });
                matchTabsValue = '';
            }
            continue;
        }
        if (!isMatchingTabs) {
            renderArr.push({ type: 'line', value: line });
            continue;
        }
    }
    // console.log(renderArr);
    renderArr.forEach((item, index) => {
        item.parsedValues = richTextParser(item.value.trim());
    });
    // 如果富文本是填空类型
    // 那么parsedValue中的被ume包裹的内容将是动态的
    if (showType === 'filling') {
        let umeRenderBlocks = renderArr.map((item) => {
            if (item.parsedValues.length !== 0) {
                return item.parsedValues.find((parsedValue) => {
                    if (
                        parsedValue.tags &&
                        parsedValue.tags.find((tag) => tag === 'ume')
                    ) {
                        return parsedValue;
                    }
                    return null;
                });
            }
            return null;
        });
        // console.log(umeRenderBlocks);
        umeRenderBlocks = umeRenderBlocks.filter((block) => block !== null);
        // console.log(umeRenderBlocks);
        // umeRenderBlocks[0].content = '9999999';
        umeRenderBlocks.forEach((item, index) => {
            const answer = answers[index];
            if (!answer) {
                umeRenderBlocks[index].content = '填写选项';
                umeRenderBlocks[index].isEmpty = true;
            } else {
                umeRenderBlocks[index].content = answer;
                umeRenderBlocks[index].isEmpty = false;
            }
        });
    }
    // console.log(renderArr);
    return renderArr.map((item, idx) => {
        if (item.type === 'line') {
            if (
                item.value.indexOf('<i/>') !== -1 ||
                item.value.indexOf('<i />') !== -1
            ) {
                return lineRender(
                    item.parsedValues,
                    idx,
                    'indent ' + className,
                    maskVisible,
                    showType
                );
            }
            return lineRender(
                item.parsedValues,
                idx,
                className,
                maskVisible,
                showType
            );
        }
        if (item.type === 'tabs') {
            return (
                <RichTabs
                    key={idx}
                    text={item.value}
                    maskVisible={maskVisible}
                />
            );
        }
        return null;
    });
}

function RichText({
    className,
    data,
    textClassName,
    maskVisible,
    showType,
    answers,
}) {
    if (!data) return null;

    return (
        <Container className={className}>
            {contentRender(data, textClassName, maskVisible, showType, answers)}
        </Container>
    );
}

RichText.propTypes = {
    className: PropTypes.string,
    textClassName: PropTypes.string,
    data: PropTypes.string.isRequired,
    maskVisible: PropTypes.bool,
    showType: PropTypes.string,
    answers: PropTypes.array,
};

RichText.defaultProps = {
    className: '',
    textClassName: '',
    maskVisible: false,
    showType: '',
    answers: [],
};

export default RichText;
