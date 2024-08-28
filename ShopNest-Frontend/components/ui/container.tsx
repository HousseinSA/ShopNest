interface ContainerProps {
    children:React.ReactNode
}
const Container:React.FC<ContainerProps> =({children}) =>{
    return (
        <div className=" mx-auto bg-white  py-10 sm:px-6 lg:px-8 min-h-screen" >{children}</div>
    )
}

export default Container