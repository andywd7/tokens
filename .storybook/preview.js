import '../tokens/typography/text-classes.scss'
import '../src/styles/styles.scss'

export const parameters = {
  layout: 'fullscreen',
  controls: { expanded: true }
  // backgrounds: {
  //   default: 'twitter',
  //   values: [
  //     { name: 'twitter', value: '#00aced' },
  //     { name: 'facebook', value: '#3b5998' }
  //   ]
  // }
}


export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light-theme',
    toolbar: {
      icon: 'paintbrush',
      items: [
          { value: 'light-theme', title: 'Light theme'},
          { value: 'dark-theme', title: 'Dark theme'}
      ]
    }
  }
}

const withTheme = (Story, context) => { 
  // console.log(context.globals.theme)
  // const { the } = context.globals.theme
  return {
    data() {
      return {
        theme: context.globals.theme
      }
    },
    template: `<div class="theme" :class="theme"><story /></div>`
  }
}

export const decorators = [
  withTheme
]
