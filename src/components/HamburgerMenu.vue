<script setup>
import '../assets/css/hamburgerMenu.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { useUserStore } from '@/stores/UserStore.js'
import { ref } from 'vue'

const store = useUserStore();
const menuRef = ref(null);

/**
 * Handles the click event on the burger icon to toggle the visibility of the menu.
 * Moves the menu to the left or right based on its current position.
 */
const onBurgerClicked = () => {
  const menu = menuRef.value;
  if (parseInt(getComputedStyle(menu).getPropertyValue('right')) < 0) {
    menu.style.setProperty('right', 0);
    return;
  }
  menu.style.setProperty('right', '-222px');
}

</script>

<template>
  <div class="hamburger-container">
    <i data-cy="burger-menu-link" class="fas fa-bars fa-2x" @click="onBurgerClicked"></i>
  </div>
  <div class="hamburger-menu" ref="menuRef">
    <ul>
      <li data-cy="hamburger-profile-link" v-if="store.isActive"><RouterLink class="hamburger-menu-link" to="/profile">Profile settings</RouterLink></li>
      <li data-cy="hamburger-logout.link" v-if="store.isActive"><RouterLink class="hamburger-menu-link" to="/" @click="store.resetAll()">Log out</RouterLink></li>
      <li data-cy="hamburger-discover-link" v-if="store.isActive"><RouterLink class="hamburger-menu-link" to="/discover">Discover</RouterLink></li>
      <li data-cy="hamburger-login-link" v-if="!store.isActive"><RouterLink class="hamburger-menu-link" to="/login">Login</RouterLink></li>
      <li data-cy="hamburger-sign-up-link" v-if="!store.isActive"><RouterLink class="hamburger-menu-link" to="/sign-up">Sign up</RouterLink></li>
    </ul>
  </div>
</template>