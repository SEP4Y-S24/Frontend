import React, { useState, useEffect } from 'react';
import Graph from '../features/graph/components/graph';
import { ContentLayout } from '../components/Layout/ContentLayout';
import { ContentInnerContainer } from '../components/Layout/ContentInnerContainer';
import { Tabs, Tab } from '../components/Elements/Tab/Tab';
import './Statistics.css';
import SpinnerComponent from "../features/spinner/SpinnerComponent";
import {SimpleClockProps} from "../features/clockSettings/types";

export const Statistics = () => {
    const [data, setData] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
    const [clockList, setClockList] = useState<SimpleClockProps[]>([]); // Clock list state
    const [error, setError] = useState<string>(''); // Error state

    const categoryType = [
        { id: "1", name: 'Temperature', color: '#13C296' },
        { id: "2", name: 'Humidity', color: '#FBBF24' },
        { id: "3", name: 'CO2 Level', color: '#9B51E0' },
        { id: "4", name: 'Air Condition', color: '#3758F9' }
    ];

    let tabComponentValue = categoryType[0].id;

    console.log(tabComponentValue);

    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            const fetchData = [2, 5.5, 2, 8.5, 1.5, 5];
            setData(fetchData);
            setIsLoading(false); // Set loading to false after data is fetched
        }, 2000); // Simulate a 2-second fetch delay

        const clocks: SimpleClockProps[] = [
            { id: "f656d97d-63b7-451a-91ee-0e620e652c9e", name: "Alexa" },
            { id: "f656d97d-63b7-451a-91ee-0e620e652c99", name: "Ricardo clock" }
        ];

        // Simulate fetching clock list
        setTimeout(() => {
            const fetchedClockList = clocks; // Replace with actual data fetching logic
            setClockList(fetchedClockList);
            if (fetchedClockList.length === 0) {
                setError('No clock connected');
            }
        }, 2000); // Simulate a 2-second fetch delay
    }, []);

    const xAxis = [1, 5, 10, 15, 20, 25, 30];

    return (
        <>
            <ContentLayout className="flex flex-row md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <ContentInnerContainer className="flex-1 md:h-auto bg-white">
                    {isLoading && <SpinnerComponent />} {/* Show spinner when loading */}
                    {!isLoading && (
                        <>
                            {error && <p className="text-red-500">{error}</p>} {/* Show error if no clock connected */}
                            {!error && (
                                <Tabs>
                                    {categoryType.map(type => (
                                        <Tab key={type.id} label={type.name}>
                                            <div className="p-4">
                                                <Graph xAxis={xAxis} series={data} color={type.color} />
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
