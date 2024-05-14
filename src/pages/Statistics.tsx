import React, { useState,useEffect } from 'react'
import Graph from '../features/graph/components/graph'
import { ContentLayout } from '../components/Layout/ContentLayout'
import { ContentInnerContainer } from '../components/Layout/ContentInnerContainer'
import TabComponent from '../features/graph/components/tab'
import Heading from '../components/Elements/Headings/Heading'

export const Statistics = () => {
    
    const [heading,setHeading]=useState('Temperature')
    const [tabValue, setTabValue] = useState('1')
    const [data, setData] = useState<number[]>([]);

    
    const categoryType = [
        { id: "1", name: 'Temperature' },
        { id: "2", name: 'Humidity' },
        { id: "3", name: 'CO2 Level' },
        { id: "4", name: 'Air Condition' }
    ]

    let tabComponentValue = categoryType[0].id

    console.log(tabComponentValue)
    useEffect(() => {
        const fetchData = [2, 5.5, 2, 8.5, 1.5, 5];
        setData(fetchData);
    }, []);
    const xAxis = [1, 2, 3, 5, 8, 10,30];

    return (
        <>
            <ContentLayout className="flex flex-row md:flex-row space-y-4 md:space-y-0 md:space-x-4"> 
            <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
            <TabComponent ></TabComponent>
            </ContentInnerContainer>
            </ContentLayout>

            <ContentLayout className="flex flex-row md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
            <Heading text={heading} className='pl-10 pt-6' type='heading1'/>
            <Graph xAxis={xAxis} series={data}></Graph>
            </ContentInnerContainer>
            </ContentLayout>
        </>
    );
}
