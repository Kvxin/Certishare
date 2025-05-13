"use strict";
const common_vendor = require("../../../common/vendor.js");
const components_mpHtml_parser = require("../parser.js");
const block0 = {};
function getTop(e) {
  let top;
  top = e.detail.y;
  if (top - e.currentTarget.offsetTop < 150 || top < 600) {
    top = e.currentTarget.offsetTop;
  }
  if (top < 30) {
    top += 70;
  }
  return top - 30;
}
const node = () => Promise.resolve().then(() => Rzov572R6aG1LMHjeaehC9jZXJ0aXNoYXJlX3YzL2NlcnRpc2hhcmVfdjMvY29tcG9uZW50cy9tcC1odG1sL25vZGUvbm9kZS52dWU);
const _sfc_main = {
  name: "node",
  options: {
    virtualHost: true
  },
  data() {
    return {
      ctrl: {},
      isiOS: common_vendor.index.getSystemInfoSync().system.includes("iOS")
    };
  },
  props: {
    name: String,
    attrs: {
      type: Object,
      default() {
        return {};
      }
    },
    childs: Array,
    opts: Array
  },
  components: {
    node
  },
  mounted() {
    this.$nextTick(() => {
      for (this.root = this.$parent; this.root.$options.name !== "mp-html"; this.root = this.root.$parent)
        ;
    });
  },
  beforeDestroy() {
    if (this.root && this.root._edit === this) {
      this.root._edit = void 0;
    }
  },
  methods: {
    editStart(e) {
      if (this.opts[5]) {
        const i = e.currentTarget.dataset.i;
        if (!this.ctrl["e" + i]) {
          this.$set(this.ctrl, "e" + i, 1);
          setTimeout(() => {
            this.root._mask.push(() => this.$set(this.ctrl, "e" + i, 0));
          }, 50);
          this.root._edit = this;
          this.i = i;
          this.cursor = this.childs[i].text.length;
        } else {
          this.root._mask.pop();
          this.root._maskTap();
          this.$set(this.ctrl, "e" + i, 2);
          setTimeout(() => {
            this.$set(this.ctrl, "e" + i, 3);
          }, 50);
        }
      }
    },
    editInput(e) {
      const i = e.target.dataset.i;
      const value = e.detail.value.replace(/ {2,}/, ($) => {
        let res = " ";
        for (let i2 = 1; i2 < $.length; i2++) {
          res += " ";
        }
        return res;
      });
      this.root._editVal(`${this.opts[7]}.${i}.text`, this.childs[i].text, value);
      this.cursor = e.detail.cursor;
    },
    editEnd(e) {
      const i = e.target.dataset.i;
      this.$set(this.ctrl, "e" + i, 0);
      this.root._setData(`${this.opts[7]}.${i}.text`, e.detail.value.replace(/ {2}/g, "  "));
      if (e.detail.cursor !== void 0) {
        this.cursor = e.detail.cursor;
      }
    },
    insert(node2) {
      setTimeout(() => {
        const childs = this.childs.slice(0);
        if (!childs[this.i]) {
          childs.push(node2);
        } else if (childs[this.i].text) {
          const text = childs[this.i].text;
          if (node2.type === "text") {
            if (this.cursor) {
              childs[this.i].text = text.substring(0, this.cursor) + node2.text + text.substring(this.cursor);
            } else {
              childs[this.i].text += node2.text;
            }
          } else {
            const list = [];
            if (this.cursor) {
              list.push({
                type: "text",
                text: text.substring(0, this.cursor)
              });
            }
            list.push(node2);
            if (this.cursor < text.length) {
              list.push({
                type: "text",
                text: text.substring(this.cursor)
              });
            }
            childs.splice(this.i, 1, ...list);
          }
        } else {
          childs.splice(parseInt(this.i) + 1, 0, node2);
        }
        this.root._editVal(this.opts[7], this.childs, childs, true);
        this.i = parseInt(this.i) + 1;
      }, 200);
    },
    remove(i) {
      const arr = this.childs.slice(0);
      const delEle = arr.splice(i, 1)[0];
      if (delEle.name === "img" || delEle.name === "video" || delEle.name === "audio") {
        let src = delEle.attrs.src;
        if (delEle.src) {
          src = delEle.src.length === 1 ? delEle.src[0] : delEle.src;
        }
        this.root.$emit("remove", {
          type: delEle.name,
          src
        });
      }
      this.root._edit = void 0;
      this.root._maskTap();
      this.root._editVal(this.opts[7], this.childs, arr, true);
    },
    nodeTap(e) {
      if (this.opts[5]) {
        if (this.root._lock)
          return;
        this.root._lock = true;
        setTimeout(() => {
          this.root._lock = false;
        }, 50);
        if (this.ctrl["e" + this.i] === 3)
          return;
        this.root._maskTap();
        this.root._edit = this;
        let start = this.opts[7].lastIndexOf("children.");
        if (start !== -1) {
          start += 9;
        } else {
          start = 6;
        }
        const i = parseInt(this.opts[7].substring(start, this.opts[7].lastIndexOf(".children")));
        let parent = this.$parent;
        while (parent && parent.$options.name !== "node") {
          parent = parent.$parent;
        }
        if (!parent || this.opts[7].length - parent.opts[7].length > 15)
          return;
        this.$set(this.ctrl, "root", 1);
        this.root._mask.push(() => this.$set(this.ctrl, "root", 0));
        if (this.childs.length === 1 && this.childs[0].type === "text" && !this.ctrl.e0) {
          this.$set(this.ctrl, "e0", 1);
          this.root._mask.push(() => this.$set(this.ctrl, "e0", 0));
          this.i = 0;
          this.cursor = this.childs[0].text.length;
        }
        const items = this.root._getItem(parent.childs[i], i !== 0, i !== parent.childs.length - 1);
        this.root._tooltip({
          top: getTop(e),
          items,
          success: (tapIndex) => {
            if (items[tapIndex] === "大小") {
              const style = parent.childs[i].attrs.style || "";
              let value = style.match(/;font-size:([0-9]+)px/);
              if (value) {
                value = parseInt(value[1]);
              } else {
                value = 16;
              }
              this.root._slider({
                min: 10,
                max: 30,
                value,
                top: getTop(e),
                changing: (val) => {
                  if (Math.abs(val - value) > 2) {
                    parent.changeStyle("font-size", i, val + "px", value + "px");
                    value = e.detail.value;
                  }
                },
                change: (val) => {
                  if (val !== value) {
                    parent.changeStyle("font-size", i, val + "px", value + "px");
                  }
                  this.root._editVal(`${parent.opts[7]}.${i}.attrs.style`, style, parent.childs[i].attrs.style);
                }
              });
            } else if (items[tapIndex] === "颜色") {
              const items2 = this.root._getItem("color");
              this.root._color({
                top: getTop(e),
                items: items2,
                success: (tapIndex2) => {
                  const style = parent.childs[i].attrs.style || "";
                  const value = style.match(/;color:([^;]+)/);
                  parent.changeStyle("color", i, items2[tapIndex2], value ? value[1] : void 0);
                  this.root._editVal(`${parent.opts[7]}.${i}.attrs.style`, style, parent.childs[i].attrs.style);
                }
              });
            } else if (items[tapIndex] === "上移" || items[tapIndex] === "下移") {
              const arr = parent.childs.slice(0);
              const item = arr[i];
              if (items[tapIndex] === "上移") {
                arr[i] = arr[i - 1];
                arr[i - 1] = item;
              } else {
                arr[i] = arr[i + 1];
                arr[i + 1] = item;
              }
              this.root._editVal(parent.opts[7], parent.childs, arr, true);
            } else if (items[tapIndex] === "删除") {
              parent.remove(i);
            } else {
              const style = parent.childs[i].attrs.style || "";
              let newStyle = "";
              const item = items[tapIndex];
              let name;
              let value;
              if (item === "斜体") {
                name = "font-style";
                value = "italic";
              } else if (item === "粗体") {
                name = "font-weight";
                value = "bold";
              } else if (item === "下划线") {
                name = "text-decoration";
                value = "underline";
              } else if (item === "居中") {
                name = "text-align";
                value = "center";
              } else if (item === "缩进") {
                name = "text-indent";
                value = "2em";
              }
              if (style.includes(name + ":")) {
                newStyle = style.replace(new RegExp(name + ":[^;]+"), "");
              } else {
                newStyle = style + ";" + name + ":" + value;
              }
              this.root._editVal(`${parent.opts[7]}.${i}.attrs.style`, style, newStyle, true);
            }
          }
        });
      }
    },
    mediaTap(e, index) {
      if (this.opts[5]) {
        const i = e.target.dataset.i || index;
        const node2 = this.childs[i];
        const items = this.root._getItem(node2);
        this.root._maskTap();
        this.root._edit = this;
        this.i = i;
        this.root._tooltip({
          top: e.currentTarget.offsetTop - 30,
          items,
          success: (tapIndex) => {
            switch (items[tapIndex]) {
              case "封面":
                this.root.getSrc("img", node2.attrs.poster || "").then((url) => {
                  this.root._editVal(`${this.opts[7]}.${i}.attrs.poster`, node2.attrs.poster, url instanceof Array ? url[0] : url, true);
                }).catch(() => {
                });
                break;
              case "删除":
                this.remove(i);
                break;
              case "循环":
              case "不循环":
                this.root._setData(`${this.opts[7]}.${i}.attrs.loop`, !node2.attrs.loop);
                common_vendor.index.showToast({
                  title: "成功"
                });
                break;
              case "自动播放":
              case "不自动播放":
                this.root._setData(`${this.opts[7]}.${i}.attrs.autoplay`, !node2.attrs.autoplay);
                common_vendor.index.showToast({
                  title: "成功"
                });
                break;
            }
          }
        });
        this.root._lock = true;
        setTimeout(() => {
          this.root._lock = false;
        }, 50);
      }
    },
    changeStyle(name, i, value, oldVal) {
      let style = this.childs[i].attrs.style || "";
      if (style.includes(";" + name + ":" + oldVal)) {
        style = style.replace(";" + name + ":" + oldVal, ";" + name + ":" + value);
      } else {
        style += ";" + name + ":" + value;
      }
      this.root._setData(`${this.opts[7]}.${i}.attrs.style`, style);
    },
    toJSON() {
      return this;
    },
    /**
     * @description 播放视频事件
     * @param {Event} e
     */
    play(e) {
      this.root.$emit("play");
      if (this.root.pauseVideo) {
        let flag = false;
        const id = e.target.id;
        for (let i = this.root._videos.length; i--; ) {
          if (this.root._videos[i].id === id) {
            flag = true;
          } else {
            this.root._videos[i].pause();
          }
        }
        if (!flag) {
          const ctx = common_vendor.index.createVideoContext(
            id,
            this
          );
          ctx.id = id;
          if (this.root.playbackRate) {
            ctx.playbackRate(this.root.playbackRate);
          }
          this.root._videos.push(ctx);
        }
      }
    },
    /**
     * @description 图片点击事件
     * @param {Event} e
     */
    imgTap(e) {
      if (!this.opts[5]) {
        const node2 = this.childs[e.currentTarget.dataset.i];
        if (node2.a) {
          this.linkTap(node2.a);
          return;
        }
        if (node2.attrs.ignore)
          return;
        this.root.$emit("imgtap", node2.attrs);
        if (this.root.previewImg) {
          common_vendor.index.previewImage({
            showmenu: this.root.showImgMenu,
            current: parseInt(node2.attrs.i),
            urls: this.root.imgList
          });
        }
      } else {
        const i = e.currentTarget.dataset.i;
        const node2 = this.childs[i];
        const items = this.root._getItem(node2);
        const parser = new components_mpHtml_parser.Parser(this.root);
        this.root._edit = this;
        this.i = i;
        this.root._maskTap();
        this.$set(this.ctrl, "e" + i, 1);
        this.root._mask.push(() => this.$set(this.ctrl, "e" + i, 0));
        this.root._tooltip({
          top: getTop(e),
          items,
          success: (tapIndex) => {
            if (items[tapIndex] === "换图") {
              this.root.getSrc("img", node2.attrs.src || "").then((url) => {
                this.root._editVal(this.opts[7] + "." + i + ".attrs.src", node2.attrs.src, parser.getUrl(url instanceof Array ? url[0] : url), true);
              }).catch(() => {
              });
            } else if (items[tapIndex] === "宽度") {
              const style = node2.attrs.style || "";
              let value = style.match(/max-width:([0-9]+)%/);
              if (value) {
                value = parseInt(value[1]);
              } else {
                value = 100;
              }
              this.root._slider({
                min: 0,
                max: 100,
                value,
                top: getTop(e),
                changing: (val) => {
                  if (Math.abs(val - value) > 5) {
                    this.changeStyle("max-width", i, val + "%", value + "%");
                    value = val;
                  }
                },
                change: (val) => {
                  if (val !== value) {
                    this.changeStyle("max-width", i, val + "%", value + "%");
                    value = val;
                  }
                  this.root._editVal(this.opts[7] + "." + i + ".attrs.style", style, this.childs[i].attrs.style);
                }
              });
            } else if (items[tapIndex] === "超链接") {
              this.root.getSrc("link", node2.a ? node2.a.href : "").then((url) => {
                if (node2.a) {
                  this.root._editVal(this.opts[7] + "." + i + ".a.href", node2.a.href, parser.getUrl(url), true);
                } else {
                  const link = {
                    name: "a",
                    attrs: {
                      href: parser.getUrl(url)
                    },
                    children: [node2]
                  };
                  node2.a = link.attrs;
                  this.root._editVal(this.opts[7] + "." + i, node2, link, true);
                }
                common_vendor.wx$1.showToast({
                  title: "成功"
                });
              }).catch(() => {
              });
            } else if (items[tapIndex] === "预览图") {
              this.root.getSrc("img", node2.attrs["original-src"] || "").then((url) => {
                this.root._editVal(this.opts[7] + "." + i + ".attrs.original-src", node2.attrs["original-src"], parser.getUrl(url instanceof Array ? url[0] : url), true);
                common_vendor.index.showToast({
                  title: "成功"
                });
              }).catch(() => {
              });
            } else if (items[tapIndex] === "删除") {
              this.remove(i);
            } else {
              this.root._setData(this.opts[7] + "." + i + ".attrs.ignore", !node2.attrs.ignore);
              common_vendor.index.showToast({
                title: "成功"
              });
            }
          }
        });
        this.root._lock = true;
        setTimeout(() => {
          this.root._lock = false;
        }, 50);
      }
    },
    /**
     * @description 图片长按
     */
    imgLongTap(e) {
    },
    /**
     * @description 图片加载完成事件
     * @param {Event} e
     */
    imgLoad(e) {
      if (this.opts[5])
        this.$nextTick(() => {
          const id = this.childs[i].attrs.id || "n" + i;
          common_vendor.index.createSelectorQuery().in(this).select("#" + id).boundingClientRect().exec((res) => {
            this.$set(this.ctrl, "h" + i, res[0].height);
          });
        });
      const i = e.currentTarget.dataset.i;
      if (!this.childs[i].w) {
        this.$set(this.ctrl, i, e.detail.width);
        if (this.opts[5]) {
          const path = this.opts[7] + "." + i + ".attrs.";
          if (e.detail.width < 150)
            this.root._setData(path + "ignore", "T");
          this.root._setData(path + "width", e.detail.width.toString());
        }
      } else if (this.opts[1] && !this.ctrl[i] || this.ctrl[i] === -1) {
        this.$set(this.ctrl, i, 1);
      }
      this.checkReady();
    },
    /**
     * @description 检查是否所有图片加载完毕
     */
    checkReady() {
      if (this.root && !this.root.lazyLoad) {
        this.root._unloadimgs -= 1;
        if (!this.root._unloadimgs) {
          setTimeout(() => {
            this.root.getRect().then((rect) => {
              this.root.$emit("ready", rect);
            }).catch(() => {
              this.root.$emit("ready", {});
            });
          }, 350);
        }
      }
    },
    /**
     * @description 链接点击事件
     * @param {Event} e
     */
    linkTap(e) {
      if (!this.opts[5]) {
        const node2 = e.currentTarget ? this.childs[e.currentTarget.dataset.i] : {};
        const attrs = node2.attrs || e;
        const href = attrs.href;
        this.root.$emit("linktap", Object.assign({
          innerText: this.root.getText(node2.children || [])
          // 链接内的文本内容
        }, attrs));
        if (href) {
          if (href[0] === "#") {
            this.root.navigateTo(href.substring(1)).catch(() => {
            });
          } else if (href.split("?")[0].includes("://")) {
            if (this.root.copyLink) {
              common_vendor.index.setClipboardData({
                data: href,
                success: () => common_vendor.index.showToast({
                  title: "链接已复制"
                })
              });
            }
          } else {
            common_vendor.index.navigateTo({
              url: href,
              fail() {
                common_vendor.index.switchTab({
                  url: href,
                  fail() {
                  }
                });
              }
            });
          }
        }
      } else {
        const i = e.currentTarget.dataset.i;
        const node2 = this.childs[i];
        const items = this.root._getItem(node2);
        this.root._tooltip({
          top: getTop(e),
          items,
          success: (tapIndex) => {
            if (items[tapIndex] === "更换链接") {
              this.root.getSrc("link", node2.attrs.href).then((url) => {
                this.root._editVal(this.opts[7] + "." + i + ".attrs.href", node2.attrs.href, url, true);
                common_vendor.index.showToast({
                  title: "成功"
                });
              }).catch(() => {
              });
            } else {
              this.remove(i);
            }
          }
        });
      }
    },
    /**
     * @description 错误事件
     * @param {Event} e
     */
    mediaError(e) {
      const i = e.currentTarget.dataset.i;
      const node2 = this.childs[i];
      if (node2.name === "video" || node2.name === "audio") {
        let index = (this.ctrl[i] || 0) + 1;
        if (index > node2.src.length) {
          index = 0;
        }
        if (index < node2.src.length) {
          this.$set(this.ctrl, i, index);
          return;
        }
      } else if (node2.name === "img") {
        if (this.opts[2]) {
          this.$set(this.ctrl, i, -1);
        }
        this.checkReady();
      }
      if (this.root) {
        this.root.$emit("error", {
          source: node2.name,
          attrs: node2.attrs,
          errMsg: e.detail.errMsg
        });
      }
    }
  }
};
if (!Array) {
  const _component_node = common_vendor.resolveComponent("node");
  _component_node();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.childs, (n, i, i0) => {
      return common_vendor.e({
        a: n.name === "img" && !n.t && ($props.opts[1] && !$data.ctrl[i] || $data.ctrl[i] < 0)
      }, n.name === "img" && !n.t && ($props.opts[1] && !$data.ctrl[i] || $data.ctrl[i] < 0) ? {
        b: common_vendor.s(n.attrs.style),
        c: $data.ctrl[i] < 0 ? $props.opts[2] : $props.opts[1]
      } : {}, {
        d: n.name === "img" && n.t
      }, n.name === "img" && n.t ? {
        e: common_vendor.s("display:" + n.t),
        f: [{
          attrs: {
            style: n.attrs.style || "",
            src: n.attrs.src
          },
          name: "img"
        }],
        g: i,
        h: common_vendor.o((...args) => $options.imgTap && $options.imgTap(...args), i)
      } : n.name === "img" ? {
        j: n.attrs.id || "n" + i,
        k: common_vendor.n("_img " + n.attrs.class),
        l: common_vendor.s(($data.ctrl["e" + i] ? "border:1px dashed black;padding:3px;" : "") + ($data.ctrl[i] === -1 ? "display:none;" : "") + "width:" + ($data.ctrl[i] || 1) + "px;height:" + ($data.ctrl["h" + i] || 1) + "px;" + n.attrs.style),
        m: n.attrs.src,
        n: !n.h ? "widthFix" : !n.w ? "heightFix" : n.m || "scaleToFill",
        o: $props.opts[0],
        p: n.webp,
        q: !$props.opts[5] && $props.opts[3] && !n.attrs.ignore,
        r: $props.opts[5] || !$props.opts[3] || n.attrs.ignore,
        s: i,
        t: common_vendor.o((...args) => $options.imgLoad && $options.imgLoad(...args), i),
        v: common_vendor.o((...args) => $options.mediaError && $options.mediaError(...args), i),
        w: common_vendor.o((...args) => $options.imgTap && $options.imgTap(...args), i),
        x: common_vendor.o((...args) => $options.imgLongTap && $options.imgLongTap(...args), i)
      } : n.type === "text" && !$data.ctrl["e" + i] ? common_vendor.e({
        z: common_vendor.t(n.text),
        A: !n.text
      }, !n.text ? {
        B: common_vendor.t($props.opts[6] || "请输入")
      } : {}, {
        C: i,
        D: $props.opts[4],
        E: !$props.opts[5],
        F: common_vendor.o((...args) => $options.editStart && $options.editStart(...args), i)
      }) : n.type === "text" && $data.ctrl["e" + i] === 1 ? common_vendor.e({
        H: common_vendor.t(n.text),
        I: !n.text
      }, !n.text ? {
        J: common_vendor.t($props.opts[6] || "请输入")
      } : {}, {
        K: i,
        L: common_vendor.o((...args) => $options.editStart && $options.editStart(...args), i)
      }) : n.type === "text" ? {
        N: $data.ctrl["e" + i] === 3,
        O: n.text,
        P: i,
        Q: common_vendor.o((...args) => $options.editInput && $options.editInput(...args), i),
        R: common_vendor.o((...args) => $options.editEnd && $options.editEnd(...args), i)
      } : n.name === "br" ? {} : n.name === "a" ? {
        U: "943cdbbe-0-" + i0,
        V: common_vendor.p({
          name: "span",
          childs: n.children,
          opts: [$props.opts[0], $props.opts[1], $props.opts[2], $props.opts[3], $props.opts[4], $props.opts[5], $props.opts[6], $props.opts[7] + "." + i + ".children"]
        }),
        W: n.attrs.id,
        X: common_vendor.n((n.attrs.href ? "_a " : "") + n.attrs.class),
        Y: common_vendor.s("display:inline;" + n.attrs.style),
        Z: i,
        aa: common_vendor.o((...args) => $options.linkTap && $options.linkTap(...args), i)
      } : n.name === "video" ? {
        ac: !$props.opts[5],
        ad: common_vendor.o((...args) => $options.mediaTap && $options.mediaTap(...args), i),
        ae: n.attrs.id,
        af: common_vendor.n(n.attrs.class),
        ag: common_vendor.s(n.attrs.style),
        ah: n.attrs.autoplay,
        ai: n.attrs.controls,
        aj: n.attrs.loop,
        ak: n.attrs.muted,
        al: n.attrs["object-fit"],
        am: n.attrs.poster,
        an: n.src[$data.ctrl[i] || 0],
        ao: i,
        ap: common_vendor.o((...args) => $options.play && $options.play(...args), i),
        aq: common_vendor.o((...args) => $options.mediaError && $options.mediaError(...args), i)
      } : n.name === "audio" ? {
        as: common_vendor.o((...args) => $options.mediaTap && $options.mediaTap(...args), i),
        at: n.attrs.id,
        av: common_vendor.n(n.attrs.class),
        aw: common_vendor.s(n.attrs.style),
        ax: n.attrs.author,
        ay: n.attrs.controls,
        az: n.attrs.loop,
        aA: n.attrs.name,
        aB: n.attrs.poster,
        aC: n.src[$data.ctrl[i] || 0],
        aD: i,
        aE: common_vendor.o((...args) => $options.play && $options.play(...args), i),
        aF: common_vendor.o((...args) => $options.mediaError && $options.mediaError(...args), i)
      } : n.name === "table" && (n.c || $props.opts[5]) || n.name === "li" ? common_vendor.e({
        aH: n.name === "li"
      }, n.name === "li" ? {
        aI: "943cdbbe-1-" + i0,
        aJ: common_vendor.p({
          childs: n.children,
          opts: [$props.opts[0], $props.opts[1], $props.opts[2], $props.opts[3], $props.opts[4], $props.opts[5], $props.opts[6], $props.opts[7] + "." + i + ".children"]
        })
      } : {
        aK: common_vendor.f(n.children, (tbody, x, i1) => {
          return common_vendor.e({
            a: tbody.name === "td" || tbody.name === "th"
          }, tbody.name === "td" || tbody.name === "th" ? {
            b: "943cdbbe-2-" + i0 + "-" + i1,
            c: common_vendor.p({
              childs: tbody.children,
              opts: [$props.opts[0], $props.opts[1], $props.opts[2], $props.opts[3], $props.opts[4], $props.opts[5], $props.opts[6], $props.opts[7] + "." + i + ".children." + x + ".children"]
            })
          } : {
            d: common_vendor.f(tbody.children, (tr, y, i2) => {
              return common_vendor.e({
                a: tr.name === "td" || tr.name === "th"
              }, tr.name === "td" || tr.name === "th" ? {
                b: "943cdbbe-3-" + i0 + "-" + i1 + "-" + i2,
                c: common_vendor.p({
                  childs: tr.children,
                  opts: [$props.opts[0], $props.opts[1], $props.opts[2], $props.opts[3], $props.opts[4], $props.opts[5], $props.opts[6], $props.opts[7] + "." + i + ".children." + x + ".children." + y + ".children"]
                }),
                d: common_vendor.n("_" + tr.name + " " + tr.attrs.class),
                e: common_vendor.s(tr.attrs.style)
              } : {
                f: common_vendor.f(tr.children, (td, z, i3) => {
                  return {
                    a: "943cdbbe-4-" + i0 + "-" + i1 + "-" + i2 + "-" + i3,
                    b: common_vendor.p({
                      childs: td.children,
                      opts: [$props.opts[0], $props.opts[1], $props.opts[2], $props.opts[3], $props.opts[4], $props.opts[5], $props.opts[6], $props.opts[7] + "." + i + ".children." + x + ".children." + y + ".children." + z + ".children"]
                    }),
                    c: z,
                    d: common_vendor.n("_" + td.name + " " + td.attrs.class),
                    e: common_vendor.s(td.attrs.style)
                  };
                }),
                g: common_vendor.n("_" + tr.name + " " + tr.attrs.class),
                h: common_vendor.s(tr.attrs.style)
              }, {
                i: y
              });
            })
          }, {
            e: x,
            f: common_vendor.n("_" + tbody.name + " " + tbody.attrs.class),
            g: common_vendor.s(tbody.attrs.style)
          });
        })
      }, {
        aL: n.attrs.id,
        aM: common_vendor.n("_" + n.name + " " + n.attrs.class),
        aN: common_vendor.s(n.attrs.style)
      }) : !$props.opts[5] && !n.c ? {
        aP: n.attrs.id,
        aQ: common_vendor.s("display:inline;" + n.f),
        aR: $props.opts[4],
        aS: $props.opts[4],
        aT: [n]
      } : n.c === 2 ? {
        aV: common_vendor.f(n.children, (n2, j, i1) => {
          return {
            a: j,
            b: common_vendor.s(n2.f),
            c: "943cdbbe-5-" + i0 + "-" + i1,
            d: common_vendor.p({
              name: n2.name,
              attrs: n2.attrs,
              childs: n2.children,
              opts: [$props.opts[0], $props.opts[1], $props.opts[2], $props.opts[3], $props.opts[4], $props.opts[5], $props.opts[6], $props.opts[7] + "." + i + ".children." + j + ".children"]
            })
          };
        }),
        aW: n.attrs.id,
        aX: common_vendor.n("_block _" + n.name + " " + n.attrs.class),
        aY: common_vendor.s(n.f + ";" + n.attrs.style)
      } : {
        aZ: common_vendor.s(n.f),
        ba: "943cdbbe-6-" + i0,
        bb: common_vendor.p({
          name: n.name,
          attrs: n.attrs,
          childs: n.children,
          opts: [$props.opts[0], $props.opts[1], $props.opts[2], $props.opts[3], $props.opts[4], $props.opts[5], $props.opts[6], $props.opts[7] + "." + i + ".children"]
        })
      }, {
        i: n.name === "img",
        y: n.type === "text" && !$data.ctrl["e" + i],
        G: n.type === "text" && $data.ctrl["e" + i] === 1,
        M: n.type === "text",
        S: n.name === "br",
        T: n.name === "a",
        ab: n.name === "video",
        ar: n.name === "audio",
        aG: n.name === "table" && (n.c || $props.opts[5]) || n.name === "li",
        aO: !$props.opts[5] && !n.c,
        aU: n.c === 2,
        bc: i
      });
    }),
    b: common_vendor.o((...args) => $options.nodeTap && $options.nodeTap(...args)),
    c: $props.attrs.id,
    d: common_vendor.n("_block _" + $props.name + " " + $props.attrs.class),
    e: common_vendor.s(($data.ctrl.root ? "border:1px solid black;padding:5px;display:block;" : "") + $props.attrs.style)
  };
}
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/网页/重构/certishare_v3/certishare_v3/components/mp-html/node/node.vue"]]);
wx.createComponent(Component);
const Rzov572R6aG1LMHjeaehC9jZXJ0aXNoYXJlX3YzL2NlcnRpc2hhcmVfdjMvY29tcG9uZW50cy9tcC1odG1sL25vZGUvbm9kZS52dWU = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
