
export const BackDrop = ({image}) => {
    return (
        <img 
            src= {image}
            style = {{
                width: "100%",
                height: "100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                zIndex: "-5",
                position: "fixed"
            }}
        />
    );
};