if (window.innerWidth > 760) {

const scroller = document.querySelector('.smooth-scroll')

function scrollPosition () {
  return window.scrollY || document.documentElement.scrollTop
}

let scrollPos = scrollPosition()
let scrollSpeed = 0
let offset = 0

window.addEventListener('scroll', () => {
  scrollSpeed = scrollPosition() - scrollPos
  scrollPos = scrollPosition()
  
  console.log(scrollSpeed)
  
  offset += scrollSpeed * .7
})

function update () {
  requestAnimationFrame(update)
 
  offset *= .9
  if (Math.abs(offset) > .1) {
    scroller.style.transform = `translate3d(0, ${offset}px, 0) skew(0, ${offset * .015}deg)`
  } else {
    scroller.style.transform = ``
  }
}
update()
}
