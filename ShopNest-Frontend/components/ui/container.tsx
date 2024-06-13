interface ContainerProps {
    children:React.ReactNode
}
const Container:React.FC<ContainerProps> =({children}) =>{
    return (
        <div className=" mx-auto bg-white px-4 py-10 sm:px-6 lg:px-8" >{children}</div>
    )
}

export default Container