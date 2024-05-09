import Heading from "../components/Elements/Headings/Heading";
import { ContentInnerContainer } from "../components/Layout/ContentInnerContainer";
import { ContentLayout } from "../components/Layout/ContentLayout";
import PaginationRounded from "../components/Elements/Pagination/pagination";
import InputField from "../components/Form/InputField";
import Button from "../components/Elements/Button";
import { useState } from "react";
import * as z from "zod";
import { HexColorPicker } from "react-colorful";
import * as React from "react";
import {Form} from "react-router-dom";


export const Categories = () => {
    const [color, setColor] = useState("#aabbcc");
    const schema = z.object({
        category: z.string().min(1, 'You can not add empty category.').max(20, 'Category name is too long. Max 20 characters.).')
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCategory(value);
        setErrors({...errors, [name]: ''});
    };
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [category, setCategory] = useState("");
    const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            schema.parse(category);
            console.log('Form register submitted:', category);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: { [key: string]: string } = {};
                error.errors.forEach(err => {
                    const path = err.path.join('.');
                    fieldErrors[path] = err.message;
                });
                setErrors(fieldErrors);
            }
        }
    };

    return (
        <>
            <ContentLayout className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <ContentInnerContainer className="flex-1 h-16 md:h-auto bg-white">
                    <Heading text={"Categories"} type={"heading1"} />
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
                        error={errors.category}
                    />
                        <HexColorPicker color={color} onChange={setColor} />
                    <Button text={"Register"} styleType={"info"} className={"w-full justify-center"}
                            type="submit"/>
                    </Form>
                </ContentInnerContainer>
            </ContentLayout>
        </>
    );
};
