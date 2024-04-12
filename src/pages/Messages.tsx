import Button from "../components/Elements/Button";

export const Messages = () => {
    return (
        <>
            <h1>Messages</h1>
            <Button text="Click me" onClick={() => console.log("Button clicked")} color="bg-danger" hover={"hover:bg-dangerHover"}/>
        </>

    );
};
