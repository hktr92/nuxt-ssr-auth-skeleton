import {UserModel} from "~/app/model/user.model";

const _ = {
  SET_USER: 'SET_USER',
  RESET_USER: 'RESET_USER'
}

export const state = () => {
  return {
    isLoggedIn: false,
    user: null
  }
}

export const mutations = {
  [_.SET_USER](state: any, payload: UserModel) {
    state.user = payload
    state.isLoggedIn = Boolean(payload)
  },

  [_.RESET_USER](state: any) {
    state.user = null
    state.isLoggedIn = false
  }
}

export const actions = {
  async nuxtServerInit({commit, state}: any, {req}: any) {
    console.log('nuxtServerInit', req.session.user)
    if (req.session.user) {
      await commit(_.SET_USER, req.session.user)
    }
  },

  login({commit}: any, payload: UserModel) {
    commit(_.SET_USER, payload)
  },

  logout({ commit }: any) {
    commit(_.RESET_USER)
  }
}
