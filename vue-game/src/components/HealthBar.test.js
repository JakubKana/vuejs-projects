import { mount } from "@vue/test-utils";
import HealthBar from "./HealthBar.vue";

function mountComponentWithProps(Component, propsData) {
  return mount(Component, {
    propsData
  });
}

describe("HealthBar.test.js", () => {
  let cmp;
  beforeEach(() => {
    cmp = mountComponentWithProps(HealthBar, {
      health:  100,
      isAttack: false,
      title: "HealthBar"
    });
  });

  describe("Properties", () => {
    it("title", () => {
      expect(cmp.props("title")).toEqual("HealthBar");
    });

    it("isAttack", () => {
      expect(cmp.props("isAttack")).toBeFalsy();
    });
    it("isHeal", () => {
      expect(cmp.props("isHeal")).toBeUndefined();
    });
    it("health", () => {
      expect(cmp.props("health")).toEqual(100);
    });
    it("Change health", () => {
      cmp.setProps({ health: 80 })
      expect(cmp.props("health")).toEqual(80);
    });
  });
});
