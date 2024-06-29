import gsap from 'gsap'


export const triggerAnimation  = (imgRef:React.RefObject<HTMLDivElement>) => {
    if (imgRef.current) {
      const cartIcon = document.getElementById('cart-icon')
      const imgRect = imgRef.current.getBoundingClientRect()
      const cartRect = cartIcon?.getBoundingClientRect()

      if (cartRect) {
        const clonedImage = imgRef.current.cloneNode(true) as HTMLImageElement
        clonedImage.style.position = 'absolute'
        clonedImage.style.top = `${imgRect.top + window.scrollY - 35}px` // Adjusted top position
        clonedImage.style.left = `${imgRect.left + window.scrollX}px`
        clonedImage.style.width = `${imgRect.width}px`
        clonedImage.style.height = `${imgRect.height}px`
        clonedImage.style.zIndex = '10000' // Ensure it's above other elements
        document.body.appendChild(clonedImage)
  
        gsap.to(clonedImage, {
          duration: 1,
          x: cartRect.left + (cartRect.width / 2) - imgRect.left - (imgRect.width / 2), // Centered x position
          y: cartRect.top + (cartRect.height / 2) - imgRect.top - (imgRect.height / 2), // Centered y position
          scale: 0.1,
          opacity: 0,
          ease: 'easeInOut',
          onComplete: () => {
            document.body.removeChild(clonedImage)
          }
        })
      }
    }
  }