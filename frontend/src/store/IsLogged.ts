import axios from "axios";
import { User } from "../types/User";
import { ActionContext } from 'vuex';

interface AuthState {
  user: User | null;
  accessToken: string | null;
}

type ActionContextWithState = ActionContext<AuthState, any>;

export default {
  namespaced: true,
  state: { 
    user: null,
    accessToken: null,
   },
  mutations: {
    SET_USER(state: AuthState, user: User) {
      state.user = user;
    },
    SET_ACCESS_TOKEN(state: AuthState, token: string) {
      state.accessToken = token;
    },
    LOGOUT(state: AuthState) {
      state.user = null;
      state.accessToken = null;
    },
  },
  actions: {
    async fetchLoggedUser ({ commit, state }: ActionContextWithState, userId: string) {
      try {
        const response = await axios.get(`http://localhost:3001/users/${userId}`, {
          headers: { 
            'Authorization': `Bearer ${state.accessToken}`
          }
        });
        const user = response.data;
        commit('SET_USER', user)
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    }
  }
};