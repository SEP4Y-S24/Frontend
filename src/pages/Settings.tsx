import { titleHeading } from "../components/Elements/Headings/titleHeading";
import { subTitleHeading } from "../components/Elements/Headings/subTitleHeading";
import PaginationRounded from "../components/Elements/Pagination/pagination";
export const Settings = () => {

    return (
        <div>
        <h1>Settings</h1>
        {titleHeading("Hello , world")}
        {subTitleHeading("SADasdsadasd")}
        <PaginationRounded pages={8}/>
        </div>
    );
};
