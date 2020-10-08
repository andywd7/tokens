import Vue from "vue"
import VueRouter from "vue-router"

import Home from "../views/Home"
// import Tokens from "../views/Tokens"
import ColorContrast from "../views/ColorContrast"
import TokenCategory from "../components/TokenCategory"
import ThemeCategory from "../components/ThemeCategory"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/tokens",
    name: "Tokens",
    component: Home,
    children: [
      {
        path: ":token",
        name: "token",
        component: TokenCategory
      },
      {
        path: "color/contrast-matrix",
        name: "contrast-matrix",
        component: ColorContrast
      }
    ]
  },
  {
    path: "/themes",
    name: "Themes",
    component: Home,
    children: [
      {
        path: "theme",
        name: "theme",
        component: ThemeCategory
      }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
})

export default router
