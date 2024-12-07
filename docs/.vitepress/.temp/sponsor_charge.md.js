import { defineComponent, ref, resolveComponent, unref, withCtx, openBlock, createBlock, createVNode, createTextVNode, toDisplayString, createCommentVNode, withDirectives, vShow, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { WechatOutlined, AlipayOutlined, HeartFilled } from "@ant-design/icons-vue";
import { v as v0 } from "./vue-amazing-ui.Df5pEiN_.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
import "@vueuse/core";
import "@vuepic/vue-datepicker";
import "@vueuse/integrations/useQRCode";
import "swiper/vue";
import "swiper/modules";
const WeChat = "/vue-amazing-ui/wechat.jpg";
const Alipay = "/vue-amazing-ui/alipay.jpg";
const __pageData = JSON.parse('{"title":"✨ 成为赞助者","description":"","frontmatter":{},"headers":[],"relativePath":"sponsor/charge.md","filePath":"sponsor/charge.md","lastUpdated":1732352065000}');
const __default__ = { name: "sponsor/charge.md" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  __ssrInlineRender: true,
  setup(__props) {
    const { match: isMobile } = v0("(max-width: 768px)");
    const sponsorText = {
      title: "如果您觉得 Vue Amazing UI 有用，可以请作者喝杯茶表示支持，非常感谢 ❤️🙏❤️"
    };
    const sponsorOptions = ["WeChat", "Alipay"];
    const sponsorType = ref("WeChat");
    const QRCodes = [
      {
        src: WeChat,
        // src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.8/wechat.jpg',
        name: "WeChat"
      },
      {
        src: Alipay,
        // src: 'https://cdn.jsdelivr.net/gh/themusecatcher/resources@0.0.8/alipay.jpg',
        name: "Alipay"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_GlobalElement = resolveComponent("GlobalElement");
      const _component_TextScroll = resolveComponent("TextScroll");
      const _component_Segmented = resolveComponent("Segmented");
      const _component_Card = resolveComponent("Card");
      const _component_Tag = resolveComponent("Tag");
      const _component_Image = resolveComponent("Image");
      const _component_Alert = resolveComponent("Alert");
      const _component_Space = resolveComponent("Space");
      const _component_Tooltip = resolveComponent("Tooltip");
      const _component_Avatar = resolveComponent("Avatar");
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-b97484b7><h1 id="✨-成为赞助者" tabindex="-1" data-v-b97484b7>✨ 成为赞助者 <a class="header-anchor" href="#✨-成为赞助者" aria-label="Permalink to &quot;✨ 成为赞助者&quot;" data-v-b97484b7>​</a></h1>`);
      _push(ssrRenderComponent(_component_GlobalElement, { "hide-sponsor": "" }, null, _parent));
      _push(`<p data-v-b97484b7><em data-v-b97484b7><code data-v-b97484b7>Vue Amazing UI</code> 所有开发工作均由作者一人完成，开发迭代过程实属不易...</em></p><p data-v-b97484b7><em data-v-b97484b7>组件库的成长与可持续发展，离不开您的支持与赞助，非常感谢 ❤️🙏❤️</em></p><h2 id="sponsor" tabindex="-1" data-v-b97484b7>Sponsor <a class="header-anchor" href="#sponsor" aria-label="Permalink to &quot;Sponsor&quot;" data-v-b97484b7>​</a></h2>`);
      _push(ssrRenderComponent(_component_TextScroll, {
        scrollText: sponsorText,
        single: "",
        height: 54,
        gap: 10,
        "board-style": { backgroundColor: "#e6f4ff" },
        "text-style": { fontSize: "20px", fontWeight: 500, color: "rgba(0, 0, 0, 0.88)" }
      }, null, _parent));
      _push(`<br data-v-b97484b7>`);
      if (unref(isMobile)) {
        _push(`<div data-v-b97484b7>`);
        _push(ssrRenderComponent(_component_Segmented, {
          size: "large",
          block: "",
          style: { "padding": "4px", "margin": "0 auto" },
          value: sponsorType.value,
          "onUpdate:value": ($event) => sponsorType.value = $event,
          options: sponsorOptions
        }, {
          label: withCtx(({ label }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (label === "WeChat") {
                _push2(`<span style="${ssrRenderStyle({ "font-weight": "500", "color": "#07c160" })}" data-v-b97484b7${_scopeId}>`);
                _push2(ssrRenderComponent(unref(WechatOutlined), { style: { "fill": "currentColor" } }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(label)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (label === "Alipay") {
                _push2(`<span style="${ssrRenderStyle({ "font-weight": "500", "color": "#1677ff" })}" data-v-b97484b7${_scopeId}>`);
                _push2(ssrRenderComponent(unref(AlipayOutlined), { style: { "fill": "currentColor" } }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(label)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                label === "WeChat" ? (openBlock(), createBlock("span", {
                  key: 0,
                  style: { "font-weight": "500", "color": "#07c160" }
                }, [
                  createVNode(unref(WechatOutlined), { style: { "fill": "currentColor" } }),
                  createTextVNode(" " + toDisplayString(label), 1)
                ])) : createCommentVNode("", true),
                label === "Alipay" ? (openBlock(), createBlock("span", {
                  key: 1,
                  style: { "font-weight": "500", "color": "#1677ff" }
                }, [
                  createVNode(unref(AlipayOutlined), { style: { "fill": "currentColor" } }),
                  createTextVNode(" " + toDisplayString(label), 1)
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_Card, {
          width: 248,
          style: { "background": "transparent", "margin": "24px auto 32px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img style="${ssrRenderStyle(sponsorType.value === "WeChat" ? null : { display: "none" })}" class="qrcode-image"${ssrRenderAttr("src", unref(WeChat))} data-v-b97484b7${_scopeId}><img style="${ssrRenderStyle(sponsorType.value === "Alipay" ? null : { display: "none" })}" class="qrcode-image"${ssrRenderAttr("src", unref(Alipay))} data-v-b97484b7${_scopeId}>`);
            } else {
              return [
                withDirectives(createVNode("img", {
                  class: "qrcode-image",
                  src: unref(WeChat)
                }, null, 8, ["src"]), [
                  [vShow, sponsorType.value === "WeChat"]
                ]),
                withDirectives(createVNode("img", {
                  class: "qrcode-image",
                  src: unref(Alipay)
                }, null, 8, ["src"]), [
                  [vShow, sponsorType.value === "Alipay"]
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_Card, {
          "body-style": { position: "relative" },
          style: { "background": "transparent", "margin-bottom": "32px" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Tag, {
                class: "wechat-tag",
                color: "#07c160",
                size: "large",
                bordered: false
              }, {
                icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(WechatOutlined), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(WechatOutlined))
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` WeChat `);
                  } else {
                    return [
                      createTextVNode(" WeChat ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Tag, {
                class: "alipay-tag",
                color: "#1677ff",
                size: "large",
                bordered: false
              }, {
                icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(AlipayOutlined), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(AlipayOutlined))
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Alipay `);
                  } else {
                    return [
                      createTextVNode(" Alipay ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_Image, {
                class: "sponsor-image",
                src: QRCodes,
                loop: "",
                width: 240,
                height: 240,
                bordered: false,
                "space-props": {
                  style: {
                    display: "flex",
                    justifyContent: "space-between"
                  }
                }
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Tag, {
                  class: "wechat-tag",
                  color: "#07c160",
                  size: "large",
                  bordered: false
                }, {
                  icon: withCtx(() => [
                    createVNode(unref(WechatOutlined))
                  ]),
                  default: withCtx(() => [
                    createTextVNode(" WeChat ")
                  ]),
                  _: 1
                }),
                createVNode(_component_Tag, {
                  class: "alipay-tag",
                  color: "#1677ff",
                  size: "large",
                  bordered: false
                }, {
                  icon: withCtx(() => [
                    createVNode(unref(AlipayOutlined))
                  ]),
                  default: withCtx(() => [
                    createTextVNode(" Alipay ")
                  ]),
                  _: 1
                }),
                createVNode(_component_Image, {
                  class: "sponsor-image",
                  src: QRCodes,
                  loop: "",
                  width: 240,
                  height: 240,
                  bordered: false,
                  "space-props": {
                    style: {
                      display: "flex",
                      justifyContent: "space-between"
                    }
                  }
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(ssrRenderComponent(_component_Alert, {
        type: "info",
        bordered: false,
        "show-icon": ""
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(HeartFilled), { style: { "font-size": "32px", "color": "#cf1322" } }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(HeartFilled), { style: { "font-size": "32px", "color": "#cf1322" } })
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span style="${ssrRenderStyle({ "font-size": "16px" })}" data-v-b97484b7${_scopeId}> • 您的支持和赞助对我来说至关重要！ <br data-v-b97484b7${_scopeId}> • 真诚感谢每一位现有的和未来的支持者和赞助者！ <br data-v-b97484b7${_scopeId}> • 生命不息，迭代不止！未来，我将继续努力！ </span>`);
          } else {
            return [
              createVNode("span", { style: { "font-size": "16px" } }, [
                createTextVNode(" • 您的支持和赞助对我来说至关重要！ "),
                createVNode("br"),
                createTextVNode(" • 真诚感谢每一位现有的和未来的支持者和赞助者！ "),
                createVNode("br"),
                createTextVNode(" • 生命不息，迭代不止！未来，我将继续努力！ ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span style="${ssrRenderStyle({ "font-size": "20px", "font-weight": "600" })}" data-v-b97484b7${_scopeId}>Vue Amazing UI to YOU ：</span>`);
          } else {
            return [
              createVNode("span", { style: { "font-size": "20px", "font-weight": "600" } }, "Vue Amazing UI to YOU ：")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h2 id="赞助者-🫡" tabindex="-1" data-v-b97484b7>赞助者 🫡 <a class="header-anchor" href="#赞助者-🫡" aria-label="Permalink to &quot;赞助者 🫡&quot;" data-v-b97484b7>​</a></h2><p data-v-b97484b7><em data-v-b97484b7>所有赞助者都将出现在此处，感谢你们的支持与赞助！❤️❤️</em></p><br data-v-b97484b7>`);
      _push(ssrRenderComponent(_component_Space, { gap: "small" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Tooltip, null, {
              tooltip: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div style="${ssrRenderStyle({ "text-align": "center" })}" data-v-b97484b7${_scopeId2}> GitHub <br data-v-b97484b7${_scopeId2}> themusecatcher </div>`);
                } else {
                  return [
                    createVNode("div", { style: { "text-align": "center" } }, [
                      createTextVNode(" GitHub "),
                      createVNode("br"),
                      createTextVNode(" themusecatcher ")
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Avatar, {
                    size: 36,
                    src: "https://github.com/themusecatcher.png",
                    href: "https://github.com/themusecatcher",
                    target: "_blank"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Avatar, {
                      size: 36,
                      src: "https://github.com/themusecatcher.png",
                      href: "https://github.com/themusecatcher",
                      target: "_blank"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Tooltip, null, {
                tooltip: withCtx(() => [
                  createVNode("div", { style: { "text-align": "center" } }, [
                    createTextVNode(" GitHub "),
                    createVNode("br"),
                    createTextVNode(" themusecatcher ")
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(_component_Avatar, {
                    size: 36,
                    src: "https://github.com/themusecatcher.png",
                    href: "https://github.com/themusecatcher",
                    target: "_blank"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("sponsor/charge.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const charge = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b97484b7"]]);
export {
  __pageData,
  charge as default
};
