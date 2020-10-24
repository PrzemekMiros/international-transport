// https://caniuse.com/#search=intersectionobserver
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
class LazyLoad {
  constructor(items, options) {
    this.options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      thresholds: 0.1,
      loadedClass: 'loaded',
      throttleTime: 300,
      ...options,
    };
    this.items = [...document.querySelectorAll(items)];
    this.lazyLoadThrottle = null;
    this.notSupportedHandler = this.notSupported.bind(this);
  }

  init() {
    return 'IntersectionObserver' in window ? this.onIntersection() : this.notSupportedHandlers();
  }

  notSupportedHandlers() {
    document.addEventListener('scroll', this.notSupportedHandler);
    window.addEventListener('resize', this.notSupportedHandler);
    window.addEventListener('orientationchange', this.notSupportedHandler);
  }

  notSupported() {
    this.lazyLoadThrottle = setTimeout(() => {
      this.items
        .filter(item => !item.classList.contains(this.options.loadedClass))
        .forEach(item => {
          if (
            item.getBoundingClientRect().top <= window.innerHeight &&
            item.getBoundingClientRect().bottom >= 0 &&
            getComputedStyle(item).display !== 'none'
          ) {
            this.lazyImage(item);
            if (this.items.every(image => image.classList.contains(this.options.loadedClass))) {
              document.removeEventListener('scroll', this.notSupportedHandler);
              window.removeEventListener('resize', this.notSupportedHandler);
              window.removeEventListener('orientationchange', this.notSupportedHandler);
            }
          }
        });
    }, this.options.throttleTime);
  }

  onIntersection() {
    const imagesObserver = new IntersectionObserver((entries, self) => {
      entries
        .filter(entry => entry.isIntersecting)
        .forEach(entry => {
          this.lazyImage(entry.target);
          self.unobserve(entry.target);
        });
    }, this.options);
    this.items.forEach(image => {
      imagesObserver.observe(image);
    });
  }

  lazyImage(asset) {
    const image = asset;
    image.src = image.dataset.src;
    image.removeAttribute('data-src');
    if (image.dataset.srcset) {
      image.srcset = image.dataset.srcset;
      image.removeAttribute('data-srcset');
    }
    image.classList.add(this.options.loadedClass);
  }
}

const lazy = new LazyLoad('.lazy');

document.addEventListener('DOMContentLoaded', () => {
  lazy.init();
});