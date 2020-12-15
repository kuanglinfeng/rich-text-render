import { useState, useEffect } from 'react';
import styled from 'styled-components';
import RichText from './RichText';
import getTabsDataByText from '../utils/getTabsDataByText';

const Container = styled.div`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
`;

const Tabs = styled.ul`
    margin: 15px 0;
    list-style: none;
    display: flex;
    background: #f5f5f5;
    border-radius: 13px;
`;

const Tab = styled.li`
    font-size: 13px;
    font-weight: bold;
    border-radius: 13px;
    text-align: center;
    padding: 4px 8px;
    flex-grow: 1;
    color: ${(props) => (props.isActive ? '#fff' : '#666')};
    background: ${(props) => (props.isActive ? '#91c854' : '#f5f5f5')};
    cursor: pointer;
`;

const Content = styled.div``;

const RichTabs = ({ text, maskVisible }) => {
    const [titles, setTitles] = useState([]);
    const [tabsData, setTabsData] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        setTabsData(getTabsDataByText(text));
    }, [text]);

    useEffect(() => {
        if (tabsData) {
            setTitles(tabsData.map((item) => item.title));
            setSelectedTitle(tabsData[0].title);
            setContent(tabsData[0].content);
        }
    }, [tabsData]);

    const handleTitleClick = (title) => {
        const content = tabsData.find((item) => item.title === title).content;
        setSelectedTitle(title);
        setContent(content);
    };

    return (
        <Container>
            <Tabs>
                {titles.map((title) => (
                    <Tab
                        isActive={title === selectedTitle}
                        onClick={() => handleTitleClick(title)}
                        key={title}
                    >
                        {title}
                    </Tab>
                ))}
            </Tabs>
            <Content>
                <RichText data={content} maskVisible={maskVisible} />
            </Content>
        </Container>
    );
};

export default RichTabs;
