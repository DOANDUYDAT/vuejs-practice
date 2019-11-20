import { set, toggle } from '@/utils/vuex'


const state = {
  drawer: null,
  color: 'success',
  image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg'
}

const getters = {

}

const actions = {

}

const mutations = {
  setDrawer: set('drawer'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer')
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}