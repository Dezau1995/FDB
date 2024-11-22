import axios from "axios";
import { User } from "../types/User";
import { ActionContext } from 'vuex';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  email: string;
  password: string;
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
    SET_ACCESS_TOKEN(state: AuthState, accessToken: string) {
      state.accessToken = accessToken;
    },
    LOGOUT(state: AuthState) {
      state.user = null;
      state.accessToken = null;
    },
  },
  actions: {
    async fetchLoggedUser ({ commit, state }: ActionContextWithState, { email, password }: AuthState) {
      try {
        const response = await axios.post(`http://localhost:3001/users/login`, { email, password },
          {
            headers: {
              Authorization: `Bearer ${state.accessToken}`
            },
          }
        );
        const { user, accessToken } = response.data;
        commit('SET_USER', user);
        commit('SET_ACCESS_TOKEN', accessToken)
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    }
  }
};