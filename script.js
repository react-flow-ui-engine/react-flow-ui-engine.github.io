const copyButtons = document.querySelectorAll('[data-copy]')
copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const text = button.getAttribute('data-copy') || ''
    try {
      await navigator.clipboard.writeText(text)
      const original = button.textContent
      button.textContent = 'Copied'
      setTimeout(() => (button.textContent = original), 1400)
    } catch {
      button.textContent = 'Copy failed'
    }
  })
})

const menuButton = document.querySelector('.menu-button')
const topNav = document.querySelector('.top-nav')
menuButton?.addEventListener('click', () => topNav?.classList.toggle('open'))

const sections = [...document.querySelectorAll('.doc-section')]
const links = [...document.querySelectorAll('.side-nav a')]
const byId = new Map(links.map((link) => [link.getAttribute('href')?.slice(1), link]))

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
    if (!visible) return
    links.forEach((link) => link.classList.remove('active'))
    byId.get(visible.target.id)?.classList.add('active')
  },
  { rootMargin: '-20% 0px -65% 0px', threshold: [0.1, 0.25, 0.5] }
)
sections.forEach((section) => observer.observe(section))
