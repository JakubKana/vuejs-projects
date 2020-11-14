import { mount } from "@vue/test-utils";
import Button from "./Button.vue";

function mountComponentWithProps(Component, propsData) {
  return mount(Component, {
    attrs: { id: "idButton" },
    propsData
  });
}

describe("Button.test.js", () => {
  let cmp;
  let mockfn;
  beforeEach(() => {
    mockfn = jest.fn(_ => true);
    cmp = mountComponentWithProps(Button, {
      label: "ClickMe",
      callback: mockfn
    });
  });

  describe("Properties", () => {
    it("label", () => {
      expect(cmp.find("#idButton").text()).toBe("ClickMe");
    });
    it("callback", () => {
      expect(cmp.props('callback')).toBe(mockfn);
    });

    it("click", () => {
      cmp.find("#idButton").trigger("click");
      expect(mockfn.mock.calls.length).toBe(1);
    });
  });
});
