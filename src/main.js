/* imports pour vue et vue-apollo */
import { createApp, provide, h} from 'vue'
import App from './App.vue'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { DefaultApolloClient } from '@vue/apollo-composable'
import './style.css'


/* imports pour fontawsome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* Ajouts des icônes à la librairie */
library.add(faUserSecret)

// connection HTTP à l'API GraphQL
const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
})

// Implémentation du cache
const cache = new InMemoryCache()

// Création du client Apollo
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

// Création de l'application Vue
const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App),
})
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
