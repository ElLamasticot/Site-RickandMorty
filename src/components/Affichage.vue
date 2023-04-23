<template>
  <!-- Conteneur principal -->
  <div class="text-white">
    <!-- Affiche les personnages -->
    <ul v-if="!loading" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <li v-for="p in perso" :key="p.id" class="rounded-md overflow-hidden bg-slate-800 p-4">
        <div class="flex justify-center items-center h-32 w-32 rounded-full mx-auto my-4">
          <img :src="p.image" alt="Portrait de {{ p.name }}" class="h-full w-full object-cover rounded-full">
        </div>
        <h2 class="text-center font-bold text-lg">{{ p.name }}</h2>
        <div class="p-4">
          <!-- Affiche les informations sur le genre, l'espèce et le statut du personnage -->
          <p class="text-center"><span
              class="info">{{
                p.gender }}</span> <span
              class="info">{{
                p.species }}</span> <span
              class="info">{{
                p.status }}</span>
          </p>
        </div>
      </li>
    </ul>
    <!-- Affiche un message de chargement si les données sont en train d'être récupérées -->
    <div v-else class="text-white bg-slate-800 rounded-md p-4">
      <p>loading
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
      </p>
    </div>
    <!-- Affiche un bouton "Fetch More" pour charger plus de données -->
    <button v-if="!loading && hasNextPage" @click="loadMore"
      class="my-4 mx-auto px-4 py-2 text-cyan-300 text-center bg-blue-400 bg-opacity-20 border border-solid border-blue-400 border-opacity-20 rounded-md hover:bg-blue-500 transition-colors duration-300 flex justify-center">
      Fetch More
    </button>
  </div>
</template>

<script setup>
  // Import des modules nécessaires
  import { useQuery } from "@vue/apollo-composable";
  import { computed, ref, watch } from "vue";
  import GET_CHARACTERS from "../graphQL/requete.gql";

  // Définition de la props "filters"
  const props = defineProps({ filters: Object });
  // Initialisation de la variable "page" à 1 et appel de la requête GraphQL avec "useQuery"
  const page = ref(1);
  const { result, loading, fetchMore } = useQuery(GET_CHARACTERS, { filters: props.filters, page: page.value });
  // Récupération des personnages et des informations de pagination depuis la réponse de la requête GraphQL
  const perso = computed(() => result.value?.characters?.results ?? []);
  const pageInfo = computed(() => result.value?.characters?.info?.next);

  // Fonction pour charger plus de résultats
  const loadMore = async () => {
    const { data } = await fetchMore({
      variables: {
        page: pageInfo.value + 1
      },
      // Mise à jour de la réponse de la requête en ajoutant les nouveaux résultats à la liste existante
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        return {
          characters: {
            ...fetchMoreResult.characters,
            results: [
              ...previousResult.characters.results,
              ...fetchMoreResult.characters.results
            ]
          }
        };
      }
    });
  };

  // Détermine s'il y a plus de résultats à charger
  const hasNextPage = computed(() => !!pageInfo.value);

  // Réinitialise le numéro de page lorsque les filtres changent
  watch(props, () => {
    page.value = 1;
  });
</script>

<style scoped>
</style>
