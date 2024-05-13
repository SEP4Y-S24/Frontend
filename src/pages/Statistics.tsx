import React, { useState,useEffect } from 'react'
import Graph from '../features/graph/components/graph'
import { ContentLayout } from '../components/Layout/ContentLayout'
import { ContentInnerContainer } from '../components/Layout/ContentInnerContainer'
import TabComponent from '../features/graph/components/tab'

export const Statistics = () => {

    const [data, setData] = useState<number[]>([]);
    const xAxis = [1, 2, 3, 5, 8, 10,30];

    useEffect(() => {
        // Fetching data here or setting initial data
        const fetchData = [2, 5.5, 2, 8.5, 1.5, 5];
        setData(fetchData);
    }, []); 

    return (
        <>
            <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"> 
            <TabComponent value='value'></TabComponent>
                <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
                    <Graph xAxis={xAxis} series={data}></Graph>
                </ContentInnerContainer>
            </ContentLayout>

           
        </>
    );
}
