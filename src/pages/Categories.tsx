import Heading from "../components/Elements/Headings/Heading";
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import { ContentLayout } from "../components/Layout/ContentLayout";
import InputField from "../components/Form/InputField";
import Button from "../components/Elements/Button";
import {useEffect, useState} from "react";
import * as z from "zod";
import { HexColorPicker } from "react-colorful";
import * as React from "react";
import {Form} from "react-router-dom";
import {CategoriesType} from "../features/calendar/types";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {getTextColor} from "../features/calendar/types/categoryColorLogic";
import storage from "../utils/storage";
import {createCategory, deleteCategory, getAllCategories} from "../features/calendar/api/categoryApi";
import {TagRequest, TagResponse} from "../features/calendar/types/category";
import SpinnerComponent from "../features/spinner/SpinnerComponent";


export const Categories = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [change, setChange] = useState<boolean>(false);
    const [categories, setCategories] = useState<TagResponse[]>([]);
    const [color, setColor] = useState("#aabbcc");
    const schema = z.object({
        category: z.string().min(1, 'You can not add empty category.ts.').max(20, 'Category name is too long. Max 20 characters.')
    });
    const handleTaskDelete = async (catToDelete: TagResponse) => {
        await deleteCategory(catToDelete.id);
        setChange(!change);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setCategory(value);
        setErrorsCat("")
    };
    const [errorCat, setErrorsCat] = useState("");
    const [category, setCategory] = useState("");
    const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            schema.parse({ category });
            const cat: TagRequest = {
                name: category,
                colour: color || "#aabbcc",
                userId: storage.getUser().userId
            };
            await createCategory(cat);
            setChange(!change);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldError = error.errors.map(err => err.message).join(', ');
                setErrorsCat(fieldError);
            }
        }
    };
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await getAllCategories(storage.getUser().userId);
                const updatedTags = response.tags.map(tag => {
                    if (!tag.colour) {
                        return { ...tag, color: "#aabbcc" };
                    } else {
                        return tag;
                    }
                });
                setCategories(updatedTags);
            } catch (error) {
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [change]);


    return (
        <>
            <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
                    <Heading text={"Add a category"} type={"heading1"} />
                    <Heading
                        text={"Create categories for your events and tasks!"}
                        type={"heading4"}
                        className={"pb-3"}
                    />
                    <Form onSubmit={handleAddCategory}>
                    <InputField
                        labelText="Category Name"
                        placeholder="School"
                        className="mb-4"
                        value={category}
                        onChange={handleChange}
                        error={errorCat}
                    />
                        <Heading text={"Select color for a category"} type={"heading4"} className={"mb-3"}/>
                        <HexColorPicker color={color} onChange={setColor}  className={"mb-3 w-fit"}/>
                    <Button text={"Add category"} styleType={"info"} className={" justify-center"}
                            type="submit"/>
                    </Form>
                </ContentInnerContainer>
                <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
                    {loading ? <SpinnerComponent/>:<>
                        <Heading text={"Categories"} type={"heading1"} />
                    {categories.length > 0
                        ? categories
                        .map((cat, index) => (
                        <Category
                        key={index}
                        name={cat.name}
                        color={cat.colour}
                        onClick={() => handleTaskDelete(cat)}
                        />
                        ))
                        : <p>No categories</p>
                    }
                    </>
                    }
                </ContentInnerContainer>
            </ContentLayout>
        </>
    );
};
const Category: React.FC<CategoriesType> = ({
                                       name,
                                       onClick,
                                                color
                                   }) => {
    return (
        <div style={{ backgroundColor: color}} className="flex items-center justify-between space-x-3 px-3 py-1 my-2 rounded">
            <div>
                <Heading style={{color: `${getTextColor(color)}`}} text={name} type={"heading3"} />
            </div>
            <div className="flex items-center space-x-2">
                <div>
                    <XMarkIcon style={{color: `${getTextColor(color)}`}} className="text-dark h-5 w-5" onClick={onClick} />
                </div>
            </div>
        </div>
    );
};
