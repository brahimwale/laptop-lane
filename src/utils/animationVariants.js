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
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 120 }
  }
}

export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 120 }
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
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', damping: 20, stiffness: 200 }
  }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring', damping: 25, stiffness: 120 }
  }
}

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring', damping: 25, stiffness: 120 }
  }
}

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.03, 
    y: -12,
    transition: { type: 'spring', damping: 15, stiffness: 300 }
  }
}

export const buttonTap = {
  rest: { scale: 1 },
  tap: { scale: 0.95 }
}