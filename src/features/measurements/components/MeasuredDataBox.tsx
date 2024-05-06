import {ContentInnerContainer} from "../../../components/Layout/ContentInnerContainer";
import Heading from "../../../components/Elements/Headings/Heading";
import {PresentationChartLineIcon} from "@heroicons/react/24/outline";
import {MeasuredData} from "../types";





const MeasuredDataBox = ({name, day, value, icon, colorBackground, colorText}:MeasuredData) => {
    return (

        <ContentInnerContainer className="flex-1 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 bg-white m-1">
            <div className="flex p-2">
                <div className="basis-1/3 md:basis-1/5 flex items-center md:pr-2 ">
                    <div className={colorBackground +" p-2 flex items-center justify-center rounded"}>
                        {icon}
                    </div>
                </div>
                <div className=" md:w-auto">
                    <Heading text={name} type={"heading3"}/>
                    <Heading text={day} type={"heading5"}/>
                </div>
            </div>
            <div className="w-full md:w-auto">
                <Heading text={value} type={"heading2"} className={"pl-3"}/>
            </div>
        </ContentInnerContainer>
    );
};
export default MeasuredDataBox;
