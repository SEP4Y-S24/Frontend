import React, { useState,useEffect } from 'react'
import Graph from '../features/graph/components/graph'
import { ContentLayout } from '../components/Layout/ContentLayout'
import { ContentInnerContainer } from '../components/Layout/ContentInnerContainer'
import Heading from '../components/Elements/Headings/Heading'
import { Tabs,Tab } from '../components/Elements/Tab/Tab'
import { dA } from '@fullcalendar/core/internal-common'

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
            <ContentInnerContainer className="flex-1 md:h-auto bg-white">
              <Tabs>
                {categoryType.map(type => (
                  <Tab key={type.id} label={type.name}>
                    <div className="p-4"><Graph xAxis={xAxis} series={data} /> </div>
                  </Tab>
                ))}
              </Tabs>
            </ContentInnerContainer>
          </ContentLayout>
        </>
      );
      
}
