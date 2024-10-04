interface ContainerProps {
  children: React.ReactNode
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto bg-white md:py-10 md:px-10 px-5 sm:px-6 lg:px-12 lg:py-12 max-w-7xl">
      {children}
    </div>
  )
}

export default Container
