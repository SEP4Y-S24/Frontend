import React, { useState,useEffect } from 'react'
import Graph from '../features/graph/components/graph'
import { ContentLayout } from '../components/Layout/ContentLayout'
import { ContentInnerContainer } from '../components/Layout/ContentInnerContainer'
import { Tabs,Tab } from '../components/Elements/Tab/Tab'



export const Statistics = () => {
    
    const [data, setData] = useState<number[]>([]);

    
    const categoryType = [
        { id: "1", name: 'Temperature', color : '#13C296' },
        { id: "2", name: 'Humidity', color :'#FBBF24' },
        { id: "3", name: 'CO2 Level', color:'#9B51E0' },
        { id: "4", name: 'Air Condition',color: '#3758F9' }
    ]

    let tabComponentValue = categoryType[0].id

    console.log(tabComponentValue)
    useEffect(() => {
        const fetchData = [2, 5.5, 2, 8.5, 1.5, 5];
        setData(fetchData);
    }, []);
    const xAxis = [1,5,10,15,20,25,30];

    return (
        <>
          <ContentLayout className="flex flex-row md:flex-row space-y-4 md:space-y-0 md:space-x-4"> 
            <ContentInnerContainer className="flex-1 md:h-auto bg-white">
              <Tabs>
                {categoryType.map(type => (
                  <Tab key={type.id} label={type.name}>
                    <div className="p-4"><Graph xAxis={xAxis} series={data} color={type.color} /> </div>
                  </Tab>
                ))}
              </Tabs>
            </ContentInnerContainer>
          </ContentLayout>
        </>
      );
      
}
