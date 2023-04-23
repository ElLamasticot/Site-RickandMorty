<template>
  <!-- Conteneur principal -->
  <div class="text-white bg-slate-800 rounded-md p-4">
    <!-- Grille avec 2 colonnes -->
    <div class="grid grid-cols-2 gap-2 mb-4">
      <!-- Première colonne -->
      <div>
        <h2 class="mb-2 text-xl">Gender</h2>
        <div class="flex flex-col">
          <!-- Boutons pour sélectionner le genre -->
          <button
            v-for="(value, key) in genderList"
            :key="key"
            @click="updateGender(value)"
            class="btn">
            <!-- Icône et nom du genre -->
            <span><font-awesome-icon :icon="genderEmot[key]" style="color: #ffffff;"/></span>
             {{ key }}
          </button>
        </div>
      </div>
      <!-- Deuxième colonne -->
      <div>
        <h2 class="mb-2 text-xl">Status</h2>
        <div class="flex flex-col">
          <!-- Boutons pour sélectionner le statut -->
          <button
            v-for="(value, key) in statusList"
            :key="key"
            @click="updateStatus(value)"
            class="btn">
            <!-- Icône et nom du statut -->
            <span><font-awesome-icon :icon="statusEmot[key]" style="color: #ffffff;"/></span>
            {{ key }}
          </button>
        </div>
      </div>
    </div>
    <!-- Section pour sélectionner l'espèce -->
    <div class="mb-4">
      <h2 class="mb-2 text-xl">Species</h2>
      <!-- Grille avec 2 colonnes -->
      <div class="grid grid-cols-2 gap-2">
        <!-- Boutons pour sélectionner l'espèce -->
        <div v-for="(value, key, index) in speciesList" :key="key">
          <button
            @click="updateSpecies(value)"
            class="btn">
            <!-- Icône et nom de l'espèce -->
            <span><font-awesome-icon :icon="speciesEmot[key]" style="color: #ffffff;"/></span>
            {{ key }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importations des modules nécessaires
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTransgender, faMars, faVenus, faGenderless, faFaceMehBlank, faFaceSmile, faFaceDizzy,faFaceMeh ,faUsers, faUserAstronaut, faDragon, faPersonWalking, faDog, faPerson, faRobot, faDisease, faPoo, faBug } from '@fortawesome/free-solid-svg-icons';

// Listes des filtres possibles
const genderList = {
  'All': '',
  'Male': 'Male',
  'Female': 'Female',
  'Unknown': 'unknown',
};

const statusList = {
  'All': '',
  'Alive': 'Alive',
  'Dead': 'Dead',
  'Unknown': 'unknown',
};

const speciesList = {
  'All': '',
  'Alien': 'Alien',
  'Myth Creature': 'Mythological Creature',
  'Humanoid': 'Humanoid',
  'Animal': 'Animal',
  'Human': 'Human',
  'Robot': 'Robot',
  'Disease': 'Disease',
  'Poopybutthole': 'Poopybutthole',
  'Cronenberg': 'Cronenberg',
};

// Liste des emojis pour les filtres
const genderEmot ={
  'All':faGenderless,
  'Male':faMars,
  'Female':faVenus,
  'Unknown':faTransgender,
}

const statusEmot ={
  'All':faFaceMehBlank,
  'Alive':faFaceSmile,
  'Dead':faFaceDizzy,
  'Unknown':faFaceMeh,
}
const speciesEmot ={
  'All':faUsers,
  'Alien':faUserAstronaut,
  'Myth Creature':faDragon,
  'Humanoid':faPersonWalking,
  'Animal':faDog,
  'Human':faPerson,
  'Robot':faRobot,
  'Disease':faDisease,
  'Poopybutthole':faPoo,
  'Cronenberg':faBug,
}

// Déclaration des événements émis
const emits = defineEmits(['gender-changed', 'status-changed', 'species-changed']);

// Définition des filtres sélectionnés
const genderFilter = computed(() => filters.value.gender);
const statusFilter = computed(() => filters.value.status);
const speciesFilter = computed(() => filters.value.species);

// Définition des filtres en tant que valeurs réactives
const filters = computed(() => ({
  gender: '',
  status: '',
  species: '',
}));

// Fonctions de mise à jour des filtres
function updateGender(gender) {
  filters.value.gender = gender;
  emits('gender-changed', gender);
}

function updateStatus(status) {
  filters.value.status = status;
  emits('status-changed', status);
}

function updateSpecies(species) {
  filters.value.species = species;
  emits('species-changed', species);
}
</script>

<style scoped>
</style>