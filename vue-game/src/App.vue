<template>
  <div>
    <section class="row">
      <div class="small-6 columns">
        <h1 class="text-center">YOU</h1>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            :class="[{ highlight: isAttack }, { heal: isHeal}]"
            :style="{ width: playerHealth + '%' }"
            style="background-color: green; margin: 0; color: white"
          >
            {{ playerHealth }}
          </div>
        </div>
      </div>
      <div class="small-6 columns">
        <h1 class="text-center">UGLY MONSTER</h1>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            :class="{ highlight: isAttack}"
            :style="{ width: monsterHealth + '%' }"
            style="background-color: green; margin: 0; color: white"
          >
            {{ monsterHealth }}
          </div>
        </div>
      </div>
    </section>
    <section class="row controls" v-if="!gameIsRunning">
      <div class="small-12 columns">
        <button id="start-game" @click="startGame">START NEW GAME</button>
      </div>
    </section>
    <section class="row controls" v-else>
      <div class="small-12 columns">
        <button-item
          id="attack"
          :callback="attack"
          v-bind:label="labels.attack"
        />
        <button-item
          id="special-attack"
          :callback="specialAttack"
          v-bind:label="labels.specialAttack"
        />
        <button-item
          id="heal"
          :callback="heal"
          v-bind:label="labels.heal"
        />
        <button-item
          id="give-up"
          :callback="giveUp"
          v-bind:label="labels.giveUp"
        />
      </div>
    </section>
    <section class="row log" v-if="turns.length > 0">
      <div class="small-12 columns">
        <ul>
          <li
            :key="turn"
            v-for="turn in turns"
            :class="{
              'player-turn': turn.isPlayer,
              'monster-turn': !turn.isPlayer,
            }"
          >
            {{ turn.text }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import Button from "./components/Button.vue";
export default {
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    isAttack: false,
    isHeal: false,
    gameIsRunning: false,
    turns: [],
    labels: {
      attack: "ATTACK",
      specialAttack: "SPECIAL ATTACK",
      heal: "HEAL",
      giveUp: "GIVE UP",
    },
  },
  components: {
    "button-item": Button,
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = new Array();
    },
    attack: function () {
      var vm = this;
      this.setAttack();
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster for ${damage}`,
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    specialAttack: function () {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
       this.setAttack();
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster hard for ${damage}`,
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.setHeal();;
      this.turns.unshift({
        isPlayer: true,
        text: `Player heals for ${10}`,
      });
      this.monsterAttacks();
    },
    giveUp: function () {
      this.gameIsRunning = false;
        this.turns.unshift({
        isPlayer: true,
        text: `Player gave up! Game over!`,
      });
    },
    monsterAttacks: function () {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${damage}`,
      });
    },
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
    setAttack: function() {
       var vm = this;
      this.isAttack = true;

      setTimeout(function () {
        vm.isAttack = false;
      }, 1000);
    },
     setHeal: function() {
        var vm = this;
      this.isHeal = true;

      setTimeout(function () {
        vm.isHeal = false;
      }, 1000);
    }
  },
};
</script>

<style lang="scss">
</style>
