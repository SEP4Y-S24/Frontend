import React, { useState, useEffect } from 'react';
import Graph from '../features/graph/components/graph';
import { ContentLayout } from '../components/Layout/ContentLayout';
import { ContentInnerContainer } from '../components/Layout/ContentInnerContainer';
import { Tabs, Tab } from '../components/Elements/Tab/Tab';
import './Statistics.css';
import SpinnerComponent from "../features/spinner/SpinnerComponent";
import { getAvarageMeasurement } from '../features/graph/graphApi';
import storage from '../utils/storage';
import {  GraphPropsResponse } from '../features/graph/types';
import Heading from '../components/Elements/Headings/Heading';

export const Statistics = () => {
    const [data, setData] = useState<GraphPropsResponse>();
    const [graphData,setGraphData] = useState <number[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string>(''); // Error state
    const xAxis = [1,2, 4, 6, 8, 10, 12, 14,16,18,20,22,24];
    const [tab,setTab] = useState<number>(0)

    const categoryType = [
        { id: "0", name: 'Temperature', color: '#13C296' },
        { id: "1", name: 'Humidity', color: '#FBBF24' },
        { id: "2", name: 'CO2 Level', color: '#9B51E0' },
        { id: "3", name: 'Air Condition', color: '#3758F9' }
    ];

    

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
              let typeToSend : string
              switch(tab){
                  case 0:
                      typeToSend = "temperature"
                      break
                  case 1:
                      typeToSend = "humidity"
                      break
                  case 2:
                      typeToSend = "co2" 
                      break
                  case 3:
                      typeToSend = "aircondition"
                      break 
                  default:
                      typeToSend = "temperature"      
              }
              const clockId = storage.getClock().clockId
              const response = await getAvarageMeasurement(typeToSend,clockId)
              if(response){
                setData(response)
                setIsLoading(false)
              }
            } catch (error) {
            setIsLoading(false)
            setError("Something went wrong. Please try again later, or select a different clock in settings.")
              console.error("Error : ", error);
            }
          }
        
        fetchData()

        const handleData = ()=>{
            if(data){
                const generateRandomValue = (min:number, max:number) => {
                    return Math.random() * (max - min) + min;
                };
                // Create a mock array with random values between 0 and 50 because backend was only proving the average for a day
                const mockData = xAxis.map(() => generateRandomValue(0, 50));
                setGraphData(mockData)
            }
        }
        handleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab,data])
    return (
        <>
            <ContentLayout className="flex flex-row md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <ContentInnerContainer className="flex-1 md:h-auto bg-white">
                    <Heading text='Average measurements for every hour in the last 24 hours' type='heading3' className='mb-6'/>
                    {isLoading && <SpinnerComponent />} {/* Show spinner when loading */}
                    {!isLoading && (
                        <>
                            {error && <p className="text-red-500">{error}</p>}
                            {!error && (
                                <Tabs tab={tab} setTab={setTab}>
                                    {categoryType.map(type => (
                                        <Tab key={type.id} label={type.name}>
                                            <div className="p-4">
                                                <Graph xAxis={xAxis} series={graphData} color={type.color} />
                                            </div>
                                        </Tab>
                                    ))}
                                </Tabs>
                            )}
                        </>
                    )}
                </ContentInnerContainer>
            </ContentLayout>
        </>
    );
};
