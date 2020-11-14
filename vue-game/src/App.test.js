import { mount } from "@vue/test-utils";
import Vue from "vue";
import App from "../src/App";


describe("App.test.js", () => {
  let comp, vm;

  beforeEach(() => {
    comp = Vue.extend(App);

    vm = new comp({
      data: function() {
        return {
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
            you: "YOU",
            monster: "MONSTER",
            startGame: "START NEW GAME"
          }
        };
      },
    }).$mount();
  });

  describe("moves", () => {
    it("attack", () => {

      vm.attack();
      expect(vm.playerHealth).toBeLessThan(100);
    });
    it("specialAttack", () => {
      vm.specialAttack();
      expect(vm.monsterHealth).toBeLessThanOrEqual(90);
    });
    it("heal", () => {
      vm.attack();
      let currHealth = vm.playerHealth;
      vm.heal();
      expect(vm.playerHealth).toBeGreaterThanOrEqual(currHealth);
    });
    it("giveUp", () => {
      vm.startGame();
      vm.giveUp();
      expect(vm.gameIsRunning).toEqual(false);
    });
  });

  describe("data", () => {
    it("equals player health to 100", () => {
      expect(vm.playerHealth).toEqual(100);
    });
    it("equals monster health to 100", () => {
      expect(vm.monsterHealth).toEqual(100);
    });
    it("equals isAttack to false", () => {
      expect(vm.isAttack).toBe(false);
    });
    it("equals isHeal to false", () => {
      expect(vm.isHeal).toBe(false);
    });
    it("equals gameIsRunning to false", () => {
      expect(vm.gameIsRunning).toBe(false);
    });
    it("turns to be empty", () => {
      expect(vm.turns).toStrictEqual([]);
    });
  });
});
