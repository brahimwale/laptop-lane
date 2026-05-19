export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const staggerContainerHome = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { duration: 0.4 }
  }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -5,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
}

export const buttonTap = {
  rest: { scale: 1 },
  tap: { scale: 0.98 }
}