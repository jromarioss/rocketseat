export class Router {
  routes = {} //propriedade que é um obj vazio

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()
  
    window.history.pushState({}, "", event.target.href) //pega o href e coloca no historico
  
    this.handle()
  }

  handle() {
    const { pathname } = window.location // pega o path name de dentro do location
    const route = this.routes[pathname] || this.routes[404]
  
    // pegue algo e então eu executo uma função
    fetch(route)
      .then((data) => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
      })
  }
}
