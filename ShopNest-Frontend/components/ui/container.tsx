interface ContainerProps {
  children: React.ReactNode
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto bg-white md:py-10 px-4 md:px-10  sm:px-6 lg:px-12 lg:py-12 max-w-7xl">
      {children}
    </div>
  )
}

export default Container
