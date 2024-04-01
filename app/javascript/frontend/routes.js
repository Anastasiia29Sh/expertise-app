import PageIndex from './views/pages/index.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    components: {
      default: PageIndex,
    },
  }
]

export default routes;