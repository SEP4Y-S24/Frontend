import React, { useState, useEffect, useCallback } from 'react';
import Graph from '../features/graph/components/graph';
import { ContentLayout } from '../components/Layout/ContentLayout';
import { ContentInnerContainer } from '../components/Layout/ContentInnerContainer';
import { Tabs, Tab } from '../components/Elements/Tab/Tab';
import './Statistics.css';
import SpinnerComponent from "../features/spinner/SpinnerComponent";
import { getAvarageMeasurement } from '../features/graph/graphApi';
import storage from '../utils/storage';
import {  GraphPropsResponse } from '../features/graph/types';

export const Statistics = () => {
    const [data, setData] = useState<GraphPropsResponse>();
    const [graphData,setGraphData] = useState <number[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string>(''); // Error state
    const [tabComponentValue,setTabComponentValue] = useState<string>("Temperature")

    const categoryType = [
        { id: "1", name: 'Temperature', color: '#13C296' },
        { id: "2", name: 'Humidity', color: '#FBBF24' },
        { id: "3", name: 'CO2 Level', color: '#9B51E0' },
        { id: "4", name: 'Air Condition', color: '#3758F9' }
    ];

    const handleData = ()=>{
        // if(data){
        //     // const tempData = data.map((item) => {
        //     //     return item.value
        //     })
        //     setGraphData(tempData)
        }


    const fetchData = useCallback(async () => {
        setIsLoading(true)
        try {
          let typeToSend : string
          switch(tabComponentValue){
              case "Temperature":
                  typeToSend = "temperature"
                  break
              case "Humidity":
                  typeToSend = "humidity"
                  break
              case "CO2 Level":
                  typeToSend = "co2" 
                  break
              case "Air Condition":
                  typeToSend = "aircondition"
                  break 
              default:
                  typeToSend = "temperature"      
          }
          const response = await getAvarageMeasurement(typeToSend,storage.getClock().clockId)
          if(response){
            console.log(response)
            setData(response)
            setIsLoading(false)
          }
        } catch (error) {
        setIsLoading(false)
          setError("Error fetching data, please try again later")
          console.error("Error : ", error);
        }
      },[tabComponentValue]) ;

    const handleTabChange = (label: string) => {
        setTabComponentValue(label)
        fetchData();
        
    };
    


    useEffect(() => {
        setIsLoading(false)
        fetchData();// DONE CHECK IF IT WORKS
      }, [fetchData]);

    const xAxis = [1,2, 4, 6, 8, 10, 12, 14,16,18,20,22,24];

    return (
        <>
            <ContentLayout className="flex flex-row md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <ContentInnerContainer className="flex-1 md:h-auto bg-white">
                    {isLoading && <SpinnerComponent />} {/* Show spinner when loading */}
                    {!isLoading && (
                        <>
                            {error && <p className="text-red-500">{error}</p>}
                            {!error && (
                                <Tabs  onTabChange={handleTabChange}>
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
