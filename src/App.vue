<template>
  <!-- Le conteneur principal de la page est défini avec une couleur de fond gris foncé. -->
  <div class="bg-gray-900">
    <!-- Le logo "Rick et Morty" est centré en haut de la page. -->
    <div class="flex justify-center">
      <img src="/RandM.svg" alt="">
    </div>
    <!-- Le titre "Characters" est affiché en blanc, en gras et en taille 4xl avec un espacement de 3 après. -->
    <div class="w-4/5 mx-auto my-4">
      <h1 class="text-white text-4xl font-bold my-3">Characters</h1>
      <!-- Les filtres sont importés depuis un composant externe "filtres" et écoutent les événements "gender-changed", "species-changed", et "status-changed". -->
      <filtres
        @gender-changed="updateGender"
        @species-changed="updateSpecies"
        @status-changed="updateStatus"></filtres>
    </div>
    <!-- Le composant "affichage" est importé pour afficher les résultats de la recherche. Il prend en entrée les filtres appliqués. -->
    <div class="w-4/5 mx-auto my-4">
      <affichage :filters="filters"></affichage>
    </div>
  </div>
</template>

<script setup>
import Filtres from "./components/Filtres.vue";
import Affichage from "./components/Affichage.vue";
import { computed, ref } from "vue";

// Création d'un objet de filtres
const filters = ref({
  gender: "",
  species: "",
  status: "",
});

// Création de propriétés calculées pour accéder aux filtres individuellement
const genderFilter = computed(() => filters.value.gender);
const speciesFilter = computed(() => filters.value.species);
const statusFilter = computed(() => filters.value.status);

// Fonctions pour mettre à jour les filtres
function updateGender(gender) {
  filters.value.gender = gender;
}

function updateSpecies(species) {
  filters.value.species = species;
}

function updateStatus(status) {
  filters.value.status = status;
}
</script>

<style scoped>
</style>
