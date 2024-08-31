interface ContainerProps {
  children: React.ReactNode
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto bg-white md:py-10 px-5 sm:px-6 lg:px-8 min-h-screen overflow-auto ">
      {children}
    </div>
  )
}

export default Container
