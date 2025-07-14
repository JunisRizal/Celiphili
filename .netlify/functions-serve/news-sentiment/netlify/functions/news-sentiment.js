var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/.pnpm/fast-xml-parser@5.2.5/node_modules/fast-xml-parser/lib/fxp.cjs
var require_fxp = __commonJS({
  "node_modules/.pnpm/fast-xml-parser@5.2.5/node_modules/fast-xml-parser/lib/fxp.cjs"(exports2, module2) {
    (() => {
      "use strict";
      var t = { d: (e2, n2) => {
        for (var i2 in n2) t.o(n2, i2) && !t.o(e2, i2) && Object.defineProperty(e2, i2, { enumerable: true, get: n2[i2] });
      }, o: (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), r: (t2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      } }, e = {};
      t.r(e), t.d(e, { XMLBuilder: () => ft, XMLParser: () => st, XMLValidator: () => mt });
      const n = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", i = new RegExp("^[" + n + "][" + n + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$");
      function s(t2, e2) {
        const n2 = [];
        let i2 = e2.exec(t2);
        for (; i2; ) {
          const s2 = [];
          s2.startIndex = e2.lastIndex - i2[0].length;
          const r2 = i2.length;
          for (let t3 = 0; t3 < r2; t3++) s2.push(i2[t3]);
          n2.push(s2), i2 = e2.exec(t2);
        }
        return n2;
      }
      const r = function(t2) {
        return !(null == i.exec(t2));
      }, o = { allowBooleanAttributes: false, unpairedTags: [] };
      function a(t2, e2) {
        e2 = Object.assign({}, o, e2);
        const n2 = [];
        let i2 = false, s2 = false;
        "\uFEFF" === t2[0] && (t2 = t2.substr(1));
        for (let o2 = 0; o2 < t2.length; o2++) if ("<" === t2[o2] && "?" === t2[o2 + 1]) {
          if (o2 += 2, o2 = u(t2, o2), o2.err) return o2;
        } else {
          if ("<" !== t2[o2]) {
            if (l(t2[o2])) continue;
            return x("InvalidChar", "char '" + t2[o2] + "' is not expected.", N(t2, o2));
          }
          {
            let a2 = o2;
            if (o2++, "!" === t2[o2]) {
              o2 = h(t2, o2);
              continue;
            }
            {
              let d2 = false;
              "/" === t2[o2] && (d2 = true, o2++);
              let f2 = "";
              for (; o2 < t2.length && ">" !== t2[o2] && " " !== t2[o2] && "	" !== t2[o2] && "\n" !== t2[o2] && "\r" !== t2[o2]; o2++) f2 += t2[o2];
              if (f2 = f2.trim(), "/" === f2[f2.length - 1] && (f2 = f2.substring(0, f2.length - 1), o2--), !r(f2)) {
                let e3;
                return e3 = 0 === f2.trim().length ? "Invalid space after '<'." : "Tag '" + f2 + "' is an invalid name.", x("InvalidTag", e3, N(t2, o2));
              }
              const p2 = c(t2, o2);
              if (false === p2) return x("InvalidAttr", "Attributes for '" + f2 + "' have open quote.", N(t2, o2));
              let b2 = p2.value;
              if (o2 = p2.index, "/" === b2[b2.length - 1]) {
                const n3 = o2 - b2.length;
                b2 = b2.substring(0, b2.length - 1);
                const s3 = g(b2, e2);
                if (true !== s3) return x(s3.err.code, s3.err.msg, N(t2, n3 + s3.err.line));
                i2 = true;
              } else if (d2) {
                if (!p2.tagClosed) return x("InvalidTag", "Closing tag '" + f2 + "' doesn't have proper closing.", N(t2, o2));
                if (b2.trim().length > 0) return x("InvalidTag", "Closing tag '" + f2 + "' can't have attributes or invalid starting.", N(t2, a2));
                if (0 === n2.length) return x("InvalidTag", "Closing tag '" + f2 + "' has not been opened.", N(t2, a2));
                {
                  const e3 = n2.pop();
                  if (f2 !== e3.tagName) {
                    let n3 = N(t2, e3.tagStartPos);
                    return x("InvalidTag", "Expected closing tag '" + e3.tagName + "' (opened in line " + n3.line + ", col " + n3.col + ") instead of closing tag '" + f2 + "'.", N(t2, a2));
                  }
                  0 == n2.length && (s2 = true);
                }
              } else {
                const r2 = g(b2, e2);
                if (true !== r2) return x(r2.err.code, r2.err.msg, N(t2, o2 - b2.length + r2.err.line));
                if (true === s2) return x("InvalidXml", "Multiple possible root nodes found.", N(t2, o2));
                -1 !== e2.unpairedTags.indexOf(f2) || n2.push({ tagName: f2, tagStartPos: a2 }), i2 = true;
              }
              for (o2++; o2 < t2.length; o2++) if ("<" === t2[o2]) {
                if ("!" === t2[o2 + 1]) {
                  o2++, o2 = h(t2, o2);
                  continue;
                }
                if ("?" !== t2[o2 + 1]) break;
                if (o2 = u(t2, ++o2), o2.err) return o2;
              } else if ("&" === t2[o2]) {
                const e3 = m(t2, o2);
                if (-1 == e3) return x("InvalidChar", "char '&' is not expected.", N(t2, o2));
                o2 = e3;
              } else if (true === s2 && !l(t2[o2])) return x("InvalidXml", "Extra text at the end", N(t2, o2));
              "<" === t2[o2] && o2--;
            }
          }
        }
        return i2 ? 1 == n2.length ? x("InvalidTag", "Unclosed tag '" + n2[0].tagName + "'.", N(t2, n2[0].tagStartPos)) : !(n2.length > 0) || x("InvalidXml", "Invalid '" + JSON.stringify(n2.map((t3) => t3.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 }) : x("InvalidXml", "Start tag expected.", 1);
      }
      function l(t2) {
        return " " === t2 || "	" === t2 || "\n" === t2 || "\r" === t2;
      }
      function u(t2, e2) {
        const n2 = e2;
        for (; e2 < t2.length; e2++) if ("?" != t2[e2] && " " != t2[e2]) ;
        else {
          const i2 = t2.substr(n2, e2 - n2);
          if (e2 > 5 && "xml" === i2) return x("InvalidXml", "XML declaration allowed only at the start of the document.", N(t2, e2));
          if ("?" == t2[e2] && ">" == t2[e2 + 1]) {
            e2++;
            break;
          }
        }
        return e2;
      }
      function h(t2, e2) {
        if (t2.length > e2 + 5 && "-" === t2[e2 + 1] && "-" === t2[e2 + 2]) {
          for (e2 += 3; e2 < t2.length; e2++) if ("-" === t2[e2] && "-" === t2[e2 + 1] && ">" === t2[e2 + 2]) {
            e2 += 2;
            break;
          }
        } else if (t2.length > e2 + 8 && "D" === t2[e2 + 1] && "O" === t2[e2 + 2] && "C" === t2[e2 + 3] && "T" === t2[e2 + 4] && "Y" === t2[e2 + 5] && "P" === t2[e2 + 6] && "E" === t2[e2 + 7]) {
          let n2 = 1;
          for (e2 += 8; e2 < t2.length; e2++) if ("<" === t2[e2]) n2++;
          else if (">" === t2[e2] && (n2--, 0 === n2)) break;
        } else if (t2.length > e2 + 9 && "[" === t2[e2 + 1] && "C" === t2[e2 + 2] && "D" === t2[e2 + 3] && "A" === t2[e2 + 4] && "T" === t2[e2 + 5] && "A" === t2[e2 + 6] && "[" === t2[e2 + 7]) {
          for (e2 += 8; e2 < t2.length; e2++) if ("]" === t2[e2] && "]" === t2[e2 + 1] && ">" === t2[e2 + 2]) {
            e2 += 2;
            break;
          }
        }
        return e2;
      }
      const d = '"', f = "'";
      function c(t2, e2) {
        let n2 = "", i2 = "", s2 = false;
        for (; e2 < t2.length; e2++) {
          if (t2[e2] === d || t2[e2] === f) "" === i2 ? i2 = t2[e2] : i2 !== t2[e2] || (i2 = "");
          else if (">" === t2[e2] && "" === i2) {
            s2 = true;
            break;
          }
          n2 += t2[e2];
        }
        return "" === i2 && { value: n2, index: e2, tagClosed: s2 };
      }
      const p = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
      function g(t2, e2) {
        const n2 = s(t2, p), i2 = {};
        for (let t3 = 0; t3 < n2.length; t3++) {
          if (0 === n2[t3][1].length) return x("InvalidAttr", "Attribute '" + n2[t3][2] + "' has no space in starting.", E(n2[t3]));
          if (void 0 !== n2[t3][3] && void 0 === n2[t3][4]) return x("InvalidAttr", "Attribute '" + n2[t3][2] + "' is without value.", E(n2[t3]));
          if (void 0 === n2[t3][3] && !e2.allowBooleanAttributes) return x("InvalidAttr", "boolean attribute '" + n2[t3][2] + "' is not allowed.", E(n2[t3]));
          const s2 = n2[t3][2];
          if (!b(s2)) return x("InvalidAttr", "Attribute '" + s2 + "' is an invalid name.", E(n2[t3]));
          if (i2.hasOwnProperty(s2)) return x("InvalidAttr", "Attribute '" + s2 + "' is repeated.", E(n2[t3]));
          i2[s2] = 1;
        }
        return true;
      }
      function m(t2, e2) {
        if (";" === t2[++e2]) return -1;
        if ("#" === t2[e2]) return function(t3, e3) {
          let n3 = /\d/;
          for ("x" === t3[e3] && (e3++, n3 = /[\da-fA-F]/); e3 < t3.length; e3++) {
            if (";" === t3[e3]) return e3;
            if (!t3[e3].match(n3)) break;
          }
          return -1;
        }(t2, ++e2);
        let n2 = 0;
        for (; e2 < t2.length; e2++, n2++) if (!(t2[e2].match(/\w/) && n2 < 20)) {
          if (";" === t2[e2]) break;
          return -1;
        }
        return e2;
      }
      function x(t2, e2, n2) {
        return { err: { code: t2, msg: e2, line: n2.line || n2, col: n2.col } };
      }
      function b(t2) {
        return r(t2);
      }
      function N(t2, e2) {
        const n2 = t2.substring(0, e2).split(/\r?\n/);
        return { line: n2.length, col: n2[n2.length - 1].length + 1 };
      }
      function E(t2) {
        return t2.startIndex + t2[1].length;
      }
      const v = { preserveOrder: false, attributeNamePrefix: "@_", attributesGroupName: false, textNodeName: "#text", ignoreAttributes: true, removeNSPrefix: false, allowBooleanAttributes: false, parseTagValue: true, parseAttributeValue: false, trimValues: true, cdataPropName: false, numberParseOptions: { hex: true, leadingZeros: true, eNotation: true }, tagValueProcessor: function(t2, e2) {
        return e2;
      }, attributeValueProcessor: function(t2, e2) {
        return e2;
      }, stopNodes: [], alwaysCreateTextNode: false, isArray: () => false, commentPropName: false, unpairedTags: [], processEntities: true, htmlEntities: false, ignoreDeclaration: false, ignorePiTags: false, transformTagName: false, transformAttributeName: false, updateTag: function(t2, e2, n2) {
        return t2;
      }, captureMetaData: false };
      let y;
      y = "function" != typeof Symbol ? "@@xmlMetadata" : Symbol("XML Node Metadata");
      class T {
        constructor(t2) {
          this.tagname = t2, this.child = [], this[":@"] = {};
        }
        add(t2, e2) {
          "__proto__" === t2 && (t2 = "#__proto__"), this.child.push({ [t2]: e2 });
        }
        addChild(t2, e2) {
          "__proto__" === t2.tagname && (t2.tagname = "#__proto__"), t2[":@"] && Object.keys(t2[":@"]).length > 0 ? this.child.push({ [t2.tagname]: t2.child, ":@": t2[":@"] }) : this.child.push({ [t2.tagname]: t2.child }), void 0 !== e2 && (this.child[this.child.length - 1][y] = { startIndex: e2 });
        }
        static getMetaDataSymbol() {
          return y;
        }
      }
      function w(t2, e2) {
        const n2 = {};
        if ("O" !== t2[e2 + 3] || "C" !== t2[e2 + 4] || "T" !== t2[e2 + 5] || "Y" !== t2[e2 + 6] || "P" !== t2[e2 + 7] || "E" !== t2[e2 + 8]) throw new Error("Invalid Tag instead of DOCTYPE");
        {
          e2 += 9;
          let i2 = 1, s2 = false, r2 = false, o2 = "";
          for (; e2 < t2.length; e2++) if ("<" !== t2[e2] || r2) if (">" === t2[e2]) {
            if (r2 ? "-" === t2[e2 - 1] && "-" === t2[e2 - 2] && (r2 = false, i2--) : i2--, 0 === i2) break;
          } else "[" === t2[e2] ? s2 = true : o2 += t2[e2];
          else {
            if (s2 && C(t2, "!ENTITY", e2)) {
              let i3, s3;
              e2 += 7, [i3, s3, e2] = O(t2, e2 + 1), -1 === s3.indexOf("&") && (n2[i3] = { regx: RegExp(`&${i3};`, "g"), val: s3 });
            } else if (s2 && C(t2, "!ELEMENT", e2)) {
              e2 += 8;
              const { index: n3 } = S(t2, e2 + 1);
              e2 = n3;
            } else if (s2 && C(t2, "!ATTLIST", e2)) e2 += 8;
            else if (s2 && C(t2, "!NOTATION", e2)) {
              e2 += 9;
              const { index: n3 } = A(t2, e2 + 1);
              e2 = n3;
            } else {
              if (!C(t2, "!--", e2)) throw new Error("Invalid DOCTYPE");
              r2 = true;
            }
            i2++, o2 = "";
          }
          if (0 !== i2) throw new Error("Unclosed DOCTYPE");
        }
        return { entities: n2, i: e2 };
      }
      const P = (t2, e2) => {
        for (; e2 < t2.length && /\s/.test(t2[e2]); ) e2++;
        return e2;
      };
      function O(t2, e2) {
        e2 = P(t2, e2);
        let n2 = "";
        for (; e2 < t2.length && !/\s/.test(t2[e2]) && '"' !== t2[e2] && "'" !== t2[e2]; ) n2 += t2[e2], e2++;
        if ($(n2), e2 = P(t2, e2), "SYSTEM" === t2.substring(e2, e2 + 6).toUpperCase()) throw new Error("External entities are not supported");
        if ("%" === t2[e2]) throw new Error("Parameter entities are not supported");
        let i2 = "";
        return [e2, i2] = I(t2, e2, "entity"), [n2, i2, --e2];
      }
      function A(t2, e2) {
        e2 = P(t2, e2);
        let n2 = "";
        for (; e2 < t2.length && !/\s/.test(t2[e2]); ) n2 += t2[e2], e2++;
        $(n2), e2 = P(t2, e2);
        const i2 = t2.substring(e2, e2 + 6).toUpperCase();
        if ("SYSTEM" !== i2 && "PUBLIC" !== i2) throw new Error(`Expected SYSTEM or PUBLIC, found "${i2}"`);
        e2 += i2.length, e2 = P(t2, e2);
        let s2 = null, r2 = null;
        if ("PUBLIC" === i2) [e2, s2] = I(t2, e2, "publicIdentifier"), '"' !== t2[e2 = P(t2, e2)] && "'" !== t2[e2] || ([e2, r2] = I(t2, e2, "systemIdentifier"));
        else if ("SYSTEM" === i2 && ([e2, r2] = I(t2, e2, "systemIdentifier"), !r2)) throw new Error("Missing mandatory system identifier for SYSTEM notation");
        return { notationName: n2, publicIdentifier: s2, systemIdentifier: r2, index: --e2 };
      }
      function I(t2, e2, n2) {
        let i2 = "";
        const s2 = t2[e2];
        if ('"' !== s2 && "'" !== s2) throw new Error(`Expected quoted string, found "${s2}"`);
        for (e2++; e2 < t2.length && t2[e2] !== s2; ) i2 += t2[e2], e2++;
        if (t2[e2] !== s2) throw new Error(`Unterminated ${n2} value`);
        return [++e2, i2];
      }
      function S(t2, e2) {
        e2 = P(t2, e2);
        let n2 = "";
        for (; e2 < t2.length && !/\s/.test(t2[e2]); ) n2 += t2[e2], e2++;
        if (!$(n2)) throw new Error(`Invalid element name: "${n2}"`);
        let i2 = "";
        if ("E" === t2[e2 = P(t2, e2)] && C(t2, "MPTY", e2)) e2 += 4;
        else if ("A" === t2[e2] && C(t2, "NY", e2)) e2 += 2;
        else {
          if ("(" !== t2[e2]) throw new Error(`Invalid Element Expression, found "${t2[e2]}"`);
          for (e2++; e2 < t2.length && ")" !== t2[e2]; ) i2 += t2[e2], e2++;
          if (")" !== t2[e2]) throw new Error("Unterminated content model");
        }
        return { elementName: n2, contentModel: i2.trim(), index: e2 };
      }
      function C(t2, e2, n2) {
        for (let i2 = 0; i2 < e2.length; i2++) if (e2[i2] !== t2[n2 + i2 + 1]) return false;
        return true;
      }
      function $(t2) {
        if (r(t2)) return t2;
        throw new Error(`Invalid entity name ${t2}`);
      }
      const j = /^[-+]?0x[a-fA-F0-9]+$/, D = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/, V = { hex: true, leadingZeros: true, decimalPoint: ".", eNotation: true };
      const M = /^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;
      function _(t2) {
        return "function" == typeof t2 ? t2 : Array.isArray(t2) ? (e2) => {
          for (const n2 of t2) {
            if ("string" == typeof n2 && e2 === n2) return true;
            if (n2 instanceof RegExp && n2.test(e2)) return true;
          }
        } : () => false;
      }
      class k {
        constructor(t2) {
          this.options = t2, this.currentNode = null, this.tagsNodeStack = [], this.docTypeEntities = {}, this.lastEntities = { apos: { regex: /&(apos|#39|#x27);/g, val: "'" }, gt: { regex: /&(gt|#62|#x3E);/g, val: ">" }, lt: { regex: /&(lt|#60|#x3C);/g, val: "<" }, quot: { regex: /&(quot|#34|#x22);/g, val: '"' } }, this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" }, this.htmlEntities = { space: { regex: /&(nbsp|#160);/g, val: " " }, cent: { regex: /&(cent|#162);/g, val: "\xA2" }, pound: { regex: /&(pound|#163);/g, val: "\xA3" }, yen: { regex: /&(yen|#165);/g, val: "\xA5" }, euro: { regex: /&(euro|#8364);/g, val: "\u20AC" }, copyright: { regex: /&(copy|#169);/g, val: "\xA9" }, reg: { regex: /&(reg|#174);/g, val: "\xAE" }, inr: { regex: /&(inr|#8377);/g, val: "\u20B9" }, num_dec: { regex: /&#([0-9]{1,7});/g, val: (t3, e2) => String.fromCodePoint(Number.parseInt(e2, 10)) }, num_hex: { regex: /&#x([0-9a-fA-F]{1,6});/g, val: (t3, e2) => String.fromCodePoint(Number.parseInt(e2, 16)) } }, this.addExternalEntities = F, this.parseXml = X, this.parseTextData = L, this.resolveNameSpace = B, this.buildAttributesMap = G, this.isItStopNode = Z, this.replaceEntitiesValue = R, this.readStopNodeData = J, this.saveTextToParentTag = q, this.addChild = Y, this.ignoreAttributesFn = _(this.options.ignoreAttributes);
        }
      }
      function F(t2) {
        const e2 = Object.keys(t2);
        for (let n2 = 0; n2 < e2.length; n2++) {
          const i2 = e2[n2];
          this.lastEntities[i2] = { regex: new RegExp("&" + i2 + ";", "g"), val: t2[i2] };
        }
      }
      function L(t2, e2, n2, i2, s2, r2, o2) {
        if (void 0 !== t2 && (this.options.trimValues && !i2 && (t2 = t2.trim()), t2.length > 0)) {
          o2 || (t2 = this.replaceEntitiesValue(t2));
          const i3 = this.options.tagValueProcessor(e2, t2, n2, s2, r2);
          return null == i3 ? t2 : typeof i3 != typeof t2 || i3 !== t2 ? i3 : this.options.trimValues || t2.trim() === t2 ? H(t2, this.options.parseTagValue, this.options.numberParseOptions) : t2;
        }
      }
      function B(t2) {
        if (this.options.removeNSPrefix) {
          const e2 = t2.split(":"), n2 = "/" === t2.charAt(0) ? "/" : "";
          if ("xmlns" === e2[0]) return "";
          2 === e2.length && (t2 = n2 + e2[1]);
        }
        return t2;
      }
      const U = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
      function G(t2, e2, n2) {
        if (true !== this.options.ignoreAttributes && "string" == typeof t2) {
          const n3 = s(t2, U), i2 = n3.length, r2 = {};
          for (let t3 = 0; t3 < i2; t3++) {
            const i3 = this.resolveNameSpace(n3[t3][1]);
            if (this.ignoreAttributesFn(i3, e2)) continue;
            let s2 = n3[t3][4], o2 = this.options.attributeNamePrefix + i3;
            if (i3.length) if (this.options.transformAttributeName && (o2 = this.options.transformAttributeName(o2)), "__proto__" === o2 && (o2 = "#__proto__"), void 0 !== s2) {
              this.options.trimValues && (s2 = s2.trim()), s2 = this.replaceEntitiesValue(s2);
              const t4 = this.options.attributeValueProcessor(i3, s2, e2);
              r2[o2] = null == t4 ? s2 : typeof t4 != typeof s2 || t4 !== s2 ? t4 : H(s2, this.options.parseAttributeValue, this.options.numberParseOptions);
            } else this.options.allowBooleanAttributes && (r2[o2] = true);
          }
          if (!Object.keys(r2).length) return;
          if (this.options.attributesGroupName) {
            const t3 = {};
            return t3[this.options.attributesGroupName] = r2, t3;
          }
          return r2;
        }
      }
      const X = function(t2) {
        t2 = t2.replace(/\r\n?/g, "\n");
        const e2 = new T("!xml");
        let n2 = e2, i2 = "", s2 = "";
        for (let r2 = 0; r2 < t2.length; r2++) if ("<" === t2[r2]) if ("/" === t2[r2 + 1]) {
          const e3 = W(t2, ">", r2, "Closing Tag is not closed.");
          let o2 = t2.substring(r2 + 2, e3).trim();
          if (this.options.removeNSPrefix) {
            const t3 = o2.indexOf(":");
            -1 !== t3 && (o2 = o2.substr(t3 + 1));
          }
          this.options.transformTagName && (o2 = this.options.transformTagName(o2)), n2 && (i2 = this.saveTextToParentTag(i2, n2, s2));
          const a2 = s2.substring(s2.lastIndexOf(".") + 1);
          if (o2 && -1 !== this.options.unpairedTags.indexOf(o2)) throw new Error(`Unpaired tag can not be used as closing tag: </${o2}>`);
          let l2 = 0;
          a2 && -1 !== this.options.unpairedTags.indexOf(a2) ? (l2 = s2.lastIndexOf(".", s2.lastIndexOf(".") - 1), this.tagsNodeStack.pop()) : l2 = s2.lastIndexOf("."), s2 = s2.substring(0, l2), n2 = this.tagsNodeStack.pop(), i2 = "", r2 = e3;
        } else if ("?" === t2[r2 + 1]) {
          let e3 = z(t2, r2, false, "?>");
          if (!e3) throw new Error("Pi Tag is not closed.");
          if (i2 = this.saveTextToParentTag(i2, n2, s2), this.options.ignoreDeclaration && "?xml" === e3.tagName || this.options.ignorePiTags) ;
          else {
            const t3 = new T(e3.tagName);
            t3.add(this.options.textNodeName, ""), e3.tagName !== e3.tagExp && e3.attrExpPresent && (t3[":@"] = this.buildAttributesMap(e3.tagExp, s2, e3.tagName)), this.addChild(n2, t3, s2, r2);
          }
          r2 = e3.closeIndex + 1;
        } else if ("!--" === t2.substr(r2 + 1, 3)) {
          const e3 = W(t2, "-->", r2 + 4, "Comment is not closed.");
          if (this.options.commentPropName) {
            const o2 = t2.substring(r2 + 4, e3 - 2);
            i2 = this.saveTextToParentTag(i2, n2, s2), n2.add(this.options.commentPropName, [{ [this.options.textNodeName]: o2 }]);
          }
          r2 = e3;
        } else if ("!D" === t2.substr(r2 + 1, 2)) {
          const e3 = w(t2, r2);
          this.docTypeEntities = e3.entities, r2 = e3.i;
        } else if ("![" === t2.substr(r2 + 1, 2)) {
          const e3 = W(t2, "]]>", r2, "CDATA is not closed.") - 2, o2 = t2.substring(r2 + 9, e3);
          i2 = this.saveTextToParentTag(i2, n2, s2);
          let a2 = this.parseTextData(o2, n2.tagname, s2, true, false, true, true);
          null == a2 && (a2 = ""), this.options.cdataPropName ? n2.add(this.options.cdataPropName, [{ [this.options.textNodeName]: o2 }]) : n2.add(this.options.textNodeName, a2), r2 = e3 + 2;
        } else {
          let o2 = z(t2, r2, this.options.removeNSPrefix), a2 = o2.tagName;
          const l2 = o2.rawTagName;
          let u2 = o2.tagExp, h2 = o2.attrExpPresent, d2 = o2.closeIndex;
          this.options.transformTagName && (a2 = this.options.transformTagName(a2)), n2 && i2 && "!xml" !== n2.tagname && (i2 = this.saveTextToParentTag(i2, n2, s2, false));
          const f2 = n2;
          f2 && -1 !== this.options.unpairedTags.indexOf(f2.tagname) && (n2 = this.tagsNodeStack.pop(), s2 = s2.substring(0, s2.lastIndexOf("."))), a2 !== e2.tagname && (s2 += s2 ? "." + a2 : a2);
          const c2 = r2;
          if (this.isItStopNode(this.options.stopNodes, s2, a2)) {
            let e3 = "";
            if (u2.length > 0 && u2.lastIndexOf("/") === u2.length - 1) "/" === a2[a2.length - 1] ? (a2 = a2.substr(0, a2.length - 1), s2 = s2.substr(0, s2.length - 1), u2 = a2) : u2 = u2.substr(0, u2.length - 1), r2 = o2.closeIndex;
            else if (-1 !== this.options.unpairedTags.indexOf(a2)) r2 = o2.closeIndex;
            else {
              const n3 = this.readStopNodeData(t2, l2, d2 + 1);
              if (!n3) throw new Error(`Unexpected end of ${l2}`);
              r2 = n3.i, e3 = n3.tagContent;
            }
            const i3 = new T(a2);
            a2 !== u2 && h2 && (i3[":@"] = this.buildAttributesMap(u2, s2, a2)), e3 && (e3 = this.parseTextData(e3, a2, s2, true, h2, true, true)), s2 = s2.substr(0, s2.lastIndexOf(".")), i3.add(this.options.textNodeName, e3), this.addChild(n2, i3, s2, c2);
          } else {
            if (u2.length > 0 && u2.lastIndexOf("/") === u2.length - 1) {
              "/" === a2[a2.length - 1] ? (a2 = a2.substr(0, a2.length - 1), s2 = s2.substr(0, s2.length - 1), u2 = a2) : u2 = u2.substr(0, u2.length - 1), this.options.transformTagName && (a2 = this.options.transformTagName(a2));
              const t3 = new T(a2);
              a2 !== u2 && h2 && (t3[":@"] = this.buildAttributesMap(u2, s2, a2)), this.addChild(n2, t3, s2, c2), s2 = s2.substr(0, s2.lastIndexOf("."));
            } else {
              const t3 = new T(a2);
              this.tagsNodeStack.push(n2), a2 !== u2 && h2 && (t3[":@"] = this.buildAttributesMap(u2, s2, a2)), this.addChild(n2, t3, s2, c2), n2 = t3;
            }
            i2 = "", r2 = d2;
          }
        }
        else i2 += t2[r2];
        return e2.child;
      };
      function Y(t2, e2, n2, i2) {
        this.options.captureMetaData || (i2 = void 0);
        const s2 = this.options.updateTag(e2.tagname, n2, e2[":@"]);
        false === s2 || ("string" == typeof s2 ? (e2.tagname = s2, t2.addChild(e2, i2)) : t2.addChild(e2, i2));
      }
      const R = function(t2) {
        if (this.options.processEntities) {
          for (let e2 in this.docTypeEntities) {
            const n2 = this.docTypeEntities[e2];
            t2 = t2.replace(n2.regx, n2.val);
          }
          for (let e2 in this.lastEntities) {
            const n2 = this.lastEntities[e2];
            t2 = t2.replace(n2.regex, n2.val);
          }
          if (this.options.htmlEntities) for (let e2 in this.htmlEntities) {
            const n2 = this.htmlEntities[e2];
            t2 = t2.replace(n2.regex, n2.val);
          }
          t2 = t2.replace(this.ampEntity.regex, this.ampEntity.val);
        }
        return t2;
      };
      function q(t2, e2, n2, i2) {
        return t2 && (void 0 === i2 && (i2 = 0 === e2.child.length), void 0 !== (t2 = this.parseTextData(t2, e2.tagname, n2, false, !!e2[":@"] && 0 !== Object.keys(e2[":@"]).length, i2)) && "" !== t2 && e2.add(this.options.textNodeName, t2), t2 = ""), t2;
      }
      function Z(t2, e2, n2) {
        const i2 = "*." + n2;
        for (const n3 in t2) {
          const s2 = t2[n3];
          if (i2 === s2 || e2 === s2) return true;
        }
        return false;
      }
      function W(t2, e2, n2, i2) {
        const s2 = t2.indexOf(e2, n2);
        if (-1 === s2) throw new Error(i2);
        return s2 + e2.length - 1;
      }
      function z(t2, e2, n2, i2 = ">") {
        const s2 = function(t3, e3, n3 = ">") {
          let i3, s3 = "";
          for (let r3 = e3; r3 < t3.length; r3++) {
            let e4 = t3[r3];
            if (i3) e4 === i3 && (i3 = "");
            else if ('"' === e4 || "'" === e4) i3 = e4;
            else if (e4 === n3[0]) {
              if (!n3[1]) return { data: s3, index: r3 };
              if (t3[r3 + 1] === n3[1]) return { data: s3, index: r3 };
            } else "	" === e4 && (e4 = " ");
            s3 += e4;
          }
        }(t2, e2 + 1, i2);
        if (!s2) return;
        let r2 = s2.data;
        const o2 = s2.index, a2 = r2.search(/\s/);
        let l2 = r2, u2 = true;
        -1 !== a2 && (l2 = r2.substring(0, a2), r2 = r2.substring(a2 + 1).trimStart());
        const h2 = l2;
        if (n2) {
          const t3 = l2.indexOf(":");
          -1 !== t3 && (l2 = l2.substr(t3 + 1), u2 = l2 !== s2.data.substr(t3 + 1));
        }
        return { tagName: l2, tagExp: r2, closeIndex: o2, attrExpPresent: u2, rawTagName: h2 };
      }
      function J(t2, e2, n2) {
        const i2 = n2;
        let s2 = 1;
        for (; n2 < t2.length; n2++) if ("<" === t2[n2]) if ("/" === t2[n2 + 1]) {
          const r2 = W(t2, ">", n2, `${e2} is not closed`);
          if (t2.substring(n2 + 2, r2).trim() === e2 && (s2--, 0 === s2)) return { tagContent: t2.substring(i2, n2), i: r2 };
          n2 = r2;
        } else if ("?" === t2[n2 + 1]) n2 = W(t2, "?>", n2 + 1, "StopNode is not closed.");
        else if ("!--" === t2.substr(n2 + 1, 3)) n2 = W(t2, "-->", n2 + 3, "StopNode is not closed.");
        else if ("![" === t2.substr(n2 + 1, 2)) n2 = W(t2, "]]>", n2, "StopNode is not closed.") - 2;
        else {
          const i3 = z(t2, n2, ">");
          i3 && ((i3 && i3.tagName) === e2 && "/" !== i3.tagExp[i3.tagExp.length - 1] && s2++, n2 = i3.closeIndex);
        }
      }
      function H(t2, e2, n2) {
        if (e2 && "string" == typeof t2) {
          const e3 = t2.trim();
          return "true" === e3 || "false" !== e3 && function(t3, e4 = {}) {
            if (e4 = Object.assign({}, V, e4), !t3 || "string" != typeof t3) return t3;
            let n3 = t3.trim();
            if (void 0 !== e4.skipLike && e4.skipLike.test(n3)) return t3;
            if ("0" === t3) return 0;
            if (e4.hex && j.test(n3)) return function(t4) {
              if (parseInt) return parseInt(t4, 16);
              if (Number.parseInt) return Number.parseInt(t4, 16);
              if (window && window.parseInt) return window.parseInt(t4, 16);
              throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
            }(n3);
            if (-1 !== n3.search(/.+[eE].+/)) return function(t4, e5, n4) {
              if (!n4.eNotation) return t4;
              const i3 = e5.match(M);
              if (i3) {
                let s2 = i3[1] || "";
                const r2 = -1 === i3[3].indexOf("e") ? "E" : "e", o2 = i3[2], a2 = s2 ? t4[o2.length + 1] === r2 : t4[o2.length] === r2;
                return o2.length > 1 && a2 ? t4 : 1 !== o2.length || !i3[3].startsWith(`.${r2}`) && i3[3][0] !== r2 ? n4.leadingZeros && !a2 ? (e5 = (i3[1] || "") + i3[3], Number(e5)) : t4 : Number(e5);
              }
              return t4;
            }(t3, n3, e4);
            {
              const s2 = D.exec(n3);
              if (s2) {
                const r2 = s2[1] || "", o2 = s2[2];
                let a2 = (i2 = s2[3]) && -1 !== i2.indexOf(".") ? ("." === (i2 = i2.replace(/0+$/, "")) ? i2 = "0" : "." === i2[0] ? i2 = "0" + i2 : "." === i2[i2.length - 1] && (i2 = i2.substring(0, i2.length - 1)), i2) : i2;
                const l2 = r2 ? "." === t3[o2.length + 1] : "." === t3[o2.length];
                if (!e4.leadingZeros && (o2.length > 1 || 1 === o2.length && !l2)) return t3;
                {
                  const i3 = Number(n3), s3 = String(i3);
                  if (0 === i3 || -0 === i3) return i3;
                  if (-1 !== s3.search(/[eE]/)) return e4.eNotation ? i3 : t3;
                  if (-1 !== n3.indexOf(".")) return "0" === s3 || s3 === a2 || s3 === `${r2}${a2}` ? i3 : t3;
                  let l3 = o2 ? a2 : n3;
                  return o2 ? l3 === s3 || r2 + l3 === s3 ? i3 : t3 : l3 === s3 || l3 === r2 + s3 ? i3 : t3;
                }
              }
              return t3;
            }
            var i2;
          }(t2, n2);
        }
        return void 0 !== t2 ? t2 : "";
      }
      const K = T.getMetaDataSymbol();
      function Q(t2, e2) {
        return tt(t2, e2);
      }
      function tt(t2, e2, n2) {
        let i2;
        const s2 = {};
        for (let r2 = 0; r2 < t2.length; r2++) {
          const o2 = t2[r2], a2 = et(o2);
          let l2 = "";
          if (l2 = void 0 === n2 ? a2 : n2 + "." + a2, a2 === e2.textNodeName) void 0 === i2 ? i2 = o2[a2] : i2 += "" + o2[a2];
          else {
            if (void 0 === a2) continue;
            if (o2[a2]) {
              let t3 = tt(o2[a2], e2, l2);
              const n3 = it(t3, e2);
              void 0 !== o2[K] && (t3[K] = o2[K]), o2[":@"] ? nt(t3, o2[":@"], l2, e2) : 1 !== Object.keys(t3).length || void 0 === t3[e2.textNodeName] || e2.alwaysCreateTextNode ? 0 === Object.keys(t3).length && (e2.alwaysCreateTextNode ? t3[e2.textNodeName] = "" : t3 = "") : t3 = t3[e2.textNodeName], void 0 !== s2[a2] && s2.hasOwnProperty(a2) ? (Array.isArray(s2[a2]) || (s2[a2] = [s2[a2]]), s2[a2].push(t3)) : e2.isArray(a2, l2, n3) ? s2[a2] = [t3] : s2[a2] = t3;
            }
          }
        }
        return "string" == typeof i2 ? i2.length > 0 && (s2[e2.textNodeName] = i2) : void 0 !== i2 && (s2[e2.textNodeName] = i2), s2;
      }
      function et(t2) {
        const e2 = Object.keys(t2);
        for (let t3 = 0; t3 < e2.length; t3++) {
          const n2 = e2[t3];
          if (":@" !== n2) return n2;
        }
      }
      function nt(t2, e2, n2, i2) {
        if (e2) {
          const s2 = Object.keys(e2), r2 = s2.length;
          for (let o2 = 0; o2 < r2; o2++) {
            const r3 = s2[o2];
            i2.isArray(r3, n2 + "." + r3, true, true) ? t2[r3] = [e2[r3]] : t2[r3] = e2[r3];
          }
        }
      }
      function it(t2, e2) {
        const { textNodeName: n2 } = e2, i2 = Object.keys(t2).length;
        return 0 === i2 || !(1 !== i2 || !t2[n2] && "boolean" != typeof t2[n2] && 0 !== t2[n2]);
      }
      class st {
        constructor(t2) {
          this.externalEntities = {}, this.options = function(t3) {
            return Object.assign({}, v, t3);
          }(t2);
        }
        parse(t2, e2) {
          if ("string" == typeof t2) ;
          else {
            if (!t2.toString) throw new Error("XML data is accepted in String or Bytes[] form.");
            t2 = t2.toString();
          }
          if (e2) {
            true === e2 && (e2 = {});
            const n3 = a(t2, e2);
            if (true !== n3) throw Error(`${n3.err.msg}:${n3.err.line}:${n3.err.col}`);
          }
          const n2 = new k(this.options);
          n2.addExternalEntities(this.externalEntities);
          const i2 = n2.parseXml(t2);
          return this.options.preserveOrder || void 0 === i2 ? i2 : Q(i2, this.options);
        }
        addEntity(t2, e2) {
          if (-1 !== e2.indexOf("&")) throw new Error("Entity value can't have '&'");
          if (-1 !== t2.indexOf("&") || -1 !== t2.indexOf(";")) throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
          if ("&" === e2) throw new Error("An entity with value '&' is not permitted");
          this.externalEntities[t2] = e2;
        }
        static getMetaDataSymbol() {
          return T.getMetaDataSymbol();
        }
      }
      function rt(t2, e2) {
        let n2 = "";
        return e2.format && e2.indentBy.length > 0 && (n2 = "\n"), ot(t2, e2, "", n2);
      }
      function ot(t2, e2, n2, i2) {
        let s2 = "", r2 = false;
        for (let o2 = 0; o2 < t2.length; o2++) {
          const a2 = t2[o2], l2 = at(a2);
          if (void 0 === l2) continue;
          let u2 = "";
          if (u2 = 0 === n2.length ? l2 : `${n2}.${l2}`, l2 === e2.textNodeName) {
            let t3 = a2[l2];
            ut(u2, e2) || (t3 = e2.tagValueProcessor(l2, t3), t3 = ht(t3, e2)), r2 && (s2 += i2), s2 += t3, r2 = false;
            continue;
          }
          if (l2 === e2.cdataPropName) {
            r2 && (s2 += i2), s2 += `<![CDATA[${a2[l2][0][e2.textNodeName]}]]>`, r2 = false;
            continue;
          }
          if (l2 === e2.commentPropName) {
            s2 += i2 + `<!--${a2[l2][0][e2.textNodeName]}-->`, r2 = true;
            continue;
          }
          if ("?" === l2[0]) {
            const t3 = lt(a2[":@"], e2), n3 = "?xml" === l2 ? "" : i2;
            let o3 = a2[l2][0][e2.textNodeName];
            o3 = 0 !== o3.length ? " " + o3 : "", s2 += n3 + `<${l2}${o3}${t3}?>`, r2 = true;
            continue;
          }
          let h2 = i2;
          "" !== h2 && (h2 += e2.indentBy);
          const d2 = i2 + `<${l2}${lt(a2[":@"], e2)}`, f2 = ot(a2[l2], e2, u2, h2);
          -1 !== e2.unpairedTags.indexOf(l2) ? e2.suppressUnpairedNode ? s2 += d2 + ">" : s2 += d2 + "/>" : f2 && 0 !== f2.length || !e2.suppressEmptyNode ? f2 && f2.endsWith(">") ? s2 += d2 + `>${f2}${i2}</${l2}>` : (s2 += d2 + ">", f2 && "" !== i2 && (f2.includes("/>") || f2.includes("</")) ? s2 += i2 + e2.indentBy + f2 + i2 : s2 += f2, s2 += `</${l2}>`) : s2 += d2 + "/>", r2 = true;
        }
        return s2;
      }
      function at(t2) {
        const e2 = Object.keys(t2);
        for (let n2 = 0; n2 < e2.length; n2++) {
          const i2 = e2[n2];
          if (t2.hasOwnProperty(i2) && ":@" !== i2) return i2;
        }
      }
      function lt(t2, e2) {
        let n2 = "";
        if (t2 && !e2.ignoreAttributes) for (let i2 in t2) {
          if (!t2.hasOwnProperty(i2)) continue;
          let s2 = e2.attributeValueProcessor(i2, t2[i2]);
          s2 = ht(s2, e2), true === s2 && e2.suppressBooleanAttributes ? n2 += ` ${i2.substr(e2.attributeNamePrefix.length)}` : n2 += ` ${i2.substr(e2.attributeNamePrefix.length)}="${s2}"`;
        }
        return n2;
      }
      function ut(t2, e2) {
        let n2 = (t2 = t2.substr(0, t2.length - e2.textNodeName.length - 1)).substr(t2.lastIndexOf(".") + 1);
        for (let i2 in e2.stopNodes) if (e2.stopNodes[i2] === t2 || e2.stopNodes[i2] === "*." + n2) return true;
        return false;
      }
      function ht(t2, e2) {
        if (t2 && t2.length > 0 && e2.processEntities) for (let n2 = 0; n2 < e2.entities.length; n2++) {
          const i2 = e2.entities[n2];
          t2 = t2.replace(i2.regex, i2.val);
        }
        return t2;
      }
      const dt = { attributeNamePrefix: "@_", attributesGroupName: false, textNodeName: "#text", ignoreAttributes: true, cdataPropName: false, format: false, indentBy: "  ", suppressEmptyNode: false, suppressUnpairedNode: true, suppressBooleanAttributes: true, tagValueProcessor: function(t2, e2) {
        return e2;
      }, attributeValueProcessor: function(t2, e2) {
        return e2;
      }, preserveOrder: false, commentPropName: false, unpairedTags: [], entities: [{ regex: new RegExp("&", "g"), val: "&amp;" }, { regex: new RegExp(">", "g"), val: "&gt;" }, { regex: new RegExp("<", "g"), val: "&lt;" }, { regex: new RegExp("'", "g"), val: "&apos;" }, { regex: new RegExp('"', "g"), val: "&quot;" }], processEntities: true, stopNodes: [], oneListGroup: false };
      function ft(t2) {
        this.options = Object.assign({}, dt, t2), true === this.options.ignoreAttributes || this.options.attributesGroupName ? this.isAttribute = function() {
          return false;
        } : (this.ignoreAttributesFn = _(this.options.ignoreAttributes), this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = gt), this.processTextOrObjNode = ct, this.options.format ? (this.indentate = pt, this.tagEndChar = ">\n", this.newLine = "\n") : (this.indentate = function() {
          return "";
        }, this.tagEndChar = ">", this.newLine = "");
      }
      function ct(t2, e2, n2, i2) {
        const s2 = this.j2x(t2, n2 + 1, i2.concat(e2));
        return void 0 !== t2[this.options.textNodeName] && 1 === Object.keys(t2).length ? this.buildTextValNode(t2[this.options.textNodeName], e2, s2.attrStr, n2) : this.buildObjectNode(s2.val, e2, s2.attrStr, n2);
      }
      function pt(t2) {
        return this.options.indentBy.repeat(t2);
      }
      function gt(t2) {
        return !(!t2.startsWith(this.options.attributeNamePrefix) || t2 === this.options.textNodeName) && t2.substr(this.attrPrefixLen);
      }
      ft.prototype.build = function(t2) {
        return this.options.preserveOrder ? rt(t2, this.options) : (Array.isArray(t2) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (t2 = { [this.options.arrayNodeName]: t2 }), this.j2x(t2, 0, []).val);
      }, ft.prototype.j2x = function(t2, e2, n2) {
        let i2 = "", s2 = "";
        const r2 = n2.join(".");
        for (let o2 in t2) if (Object.prototype.hasOwnProperty.call(t2, o2)) if (void 0 === t2[o2]) this.isAttribute(o2) && (s2 += "");
        else if (null === t2[o2]) this.isAttribute(o2) || o2 === this.options.cdataPropName ? s2 += "" : "?" === o2[0] ? s2 += this.indentate(e2) + "<" + o2 + "?" + this.tagEndChar : s2 += this.indentate(e2) + "<" + o2 + "/" + this.tagEndChar;
        else if (t2[o2] instanceof Date) s2 += this.buildTextValNode(t2[o2], o2, "", e2);
        else if ("object" != typeof t2[o2]) {
          const n3 = this.isAttribute(o2);
          if (n3 && !this.ignoreAttributesFn(n3, r2)) i2 += this.buildAttrPairStr(n3, "" + t2[o2]);
          else if (!n3) if (o2 === this.options.textNodeName) {
            let e3 = this.options.tagValueProcessor(o2, "" + t2[o2]);
            s2 += this.replaceEntitiesValue(e3);
          } else s2 += this.buildTextValNode(t2[o2], o2, "", e2);
        } else if (Array.isArray(t2[o2])) {
          const i3 = t2[o2].length;
          let r3 = "", a2 = "";
          for (let l2 = 0; l2 < i3; l2++) {
            const i4 = t2[o2][l2];
            if (void 0 === i4) ;
            else if (null === i4) "?" === o2[0] ? s2 += this.indentate(e2) + "<" + o2 + "?" + this.tagEndChar : s2 += this.indentate(e2) + "<" + o2 + "/" + this.tagEndChar;
            else if ("object" == typeof i4) if (this.options.oneListGroup) {
              const t3 = this.j2x(i4, e2 + 1, n2.concat(o2));
              r3 += t3.val, this.options.attributesGroupName && i4.hasOwnProperty(this.options.attributesGroupName) && (a2 += t3.attrStr);
            } else r3 += this.processTextOrObjNode(i4, o2, e2, n2);
            else if (this.options.oneListGroup) {
              let t3 = this.options.tagValueProcessor(o2, i4);
              t3 = this.replaceEntitiesValue(t3), r3 += t3;
            } else r3 += this.buildTextValNode(i4, o2, "", e2);
          }
          this.options.oneListGroup && (r3 = this.buildObjectNode(r3, o2, a2, e2)), s2 += r3;
        } else if (this.options.attributesGroupName && o2 === this.options.attributesGroupName) {
          const e3 = Object.keys(t2[o2]), n3 = e3.length;
          for (let s3 = 0; s3 < n3; s3++) i2 += this.buildAttrPairStr(e3[s3], "" + t2[o2][e3[s3]]);
        } else s2 += this.processTextOrObjNode(t2[o2], o2, e2, n2);
        return { attrStr: i2, val: s2 };
      }, ft.prototype.buildAttrPairStr = function(t2, e2) {
        return e2 = this.options.attributeValueProcessor(t2, "" + e2), e2 = this.replaceEntitiesValue(e2), this.options.suppressBooleanAttributes && "true" === e2 ? " " + t2 : " " + t2 + '="' + e2 + '"';
      }, ft.prototype.buildObjectNode = function(t2, e2, n2, i2) {
        if ("" === t2) return "?" === e2[0] ? this.indentate(i2) + "<" + e2 + n2 + "?" + this.tagEndChar : this.indentate(i2) + "<" + e2 + n2 + this.closeTag(e2) + this.tagEndChar;
        {
          let s2 = "</" + e2 + this.tagEndChar, r2 = "";
          return "?" === e2[0] && (r2 = "?", s2 = ""), !n2 && "" !== n2 || -1 !== t2.indexOf("<") ? false !== this.options.commentPropName && e2 === this.options.commentPropName && 0 === r2.length ? this.indentate(i2) + `<!--${t2}-->` + this.newLine : this.indentate(i2) + "<" + e2 + n2 + r2 + this.tagEndChar + t2 + this.indentate(i2) + s2 : this.indentate(i2) + "<" + e2 + n2 + r2 + ">" + t2 + s2;
        }
      }, ft.prototype.closeTag = function(t2) {
        let e2 = "";
        return -1 !== this.options.unpairedTags.indexOf(t2) ? this.options.suppressUnpairedNode || (e2 = "/") : e2 = this.options.suppressEmptyNode ? "/" : `></${t2}`, e2;
      }, ft.prototype.buildTextValNode = function(t2, e2, n2, i2) {
        if (false !== this.options.cdataPropName && e2 === this.options.cdataPropName) return this.indentate(i2) + `<![CDATA[${t2}]]>` + this.newLine;
        if (false !== this.options.commentPropName && e2 === this.options.commentPropName) return this.indentate(i2) + `<!--${t2}-->` + this.newLine;
        if ("?" === e2[0]) return this.indentate(i2) + "<" + e2 + n2 + "?" + this.tagEndChar;
        {
          let s2 = this.options.tagValueProcessor(e2, t2);
          return s2 = this.replaceEntitiesValue(s2), "" === s2 ? this.indentate(i2) + "<" + e2 + n2 + this.closeTag(e2) + this.tagEndChar : this.indentate(i2) + "<" + e2 + n2 + ">" + s2 + "</" + e2 + this.tagEndChar;
        }
      }, ft.prototype.replaceEntitiesValue = function(t2) {
        if (t2 && t2.length > 0 && this.options.processEntities) for (let e2 = 0; e2 < this.options.entities.length; e2++) {
          const n2 = this.options.entities[e2];
          t2 = t2.replace(n2.regex, n2.val);
        }
        return t2;
      };
      const mt = { validate: a };
      module2.exports = e;
    })();
  }
});

// netlify/functions/news-sentiment.js
var https = require("https");
var { XMLParser } = require_fxp();
var NewsAnalyzer = class {
  constructor() {
    this.cryptoPanicToken = process.env.CRYPTO_PANIC_TOKEN || "7083f0b648d1ee43914adf361bae4ca03e7595cd";
    this.sentimentApiKey = process.env.SENTIMENT_API_KEY || "3n7escjguf7qr2lt_qay7inuhnqzxjkdo";
    this.xmlParser = new XMLParser();
  }
  async fetchCryptoPanicNews() {
    const currencies = ["BTC", "ETH", "SOL"];
    const filters = ["rising", "hot", "important"];
    const newsItems = [];
    for (const currency of currencies) {
      for (const filter of filters) {
        try {
          const url = `https://cryptopanic.com/api/developer/v2/posts/?auth_token=${this.cryptoPanicToken}&currencies=${currency}&filter=${filter}&public=true&format=json`;
          const data = await this.fetchUrl(url);
          if (data && data.results) {
            newsItems.push(...data.results.slice(0, 5).map((item) => ({
              id: item.id,
              title: item.title,
              currency,
              filter,
              url: item.url,
              created_at: item.created_at,
              votes: item.votes,
              kind: item.kind,
              source: "CryptoPanic"
            })));
          }
        } catch (error) {
          console.error(`Error fetching ${currency} ${filter} news:`, error);
        }
      }
    }
    return newsItems;
  }
  async fetchTagesschauRSS() {
    try {
      const rssData = await this.fetchUrl("https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml", "text");
      const parsed = this.xmlParser.parse(rssData);
      const items = parsed.rss?.channel?.item || [];
      return items.slice(0, 10).map((item, index) => ({
        id: `tagesschau_${index}`,
        title: item.title,
        description: item.description,
        link: item.link,
        pubDate: item.pubDate,
        category: item.category || "General",
        source: "Tagesschau"
      }));
    } catch (error) {
      console.error("Error fetching Tagesschau RSS:", error);
      return [];
    }
  }
  async analyzeSentiment(text) {
    try {
      const response = await fetch("https://api.app.sentiment.net/v1/analyze", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.sentimentApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text,
          language: "en"
        })
      });
      if (response.ok) {
        const result = await response.json();
        return {
          sentiment: result.sentiment,
          // positive, negative, neutral
          confidence: result.confidence,
          score: result.score
        };
      }
    } catch (error) {
      console.error("Sentiment analysis error:", error);
    }
    return this.simpleSentimentAnalysis(text);
  }
  simpleSentimentAnalysis(text) {
    const positiveWords = ["bullish", "moon", "pump", "rise", "gain", "profit", "buy", "bull", "up", "surge", "rally"];
    const negativeWords = ["bearish", "dump", "crash", "fall", "loss", "sell", "bear", "down", "drop", "decline"];
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter((word) => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter((word) => lowerText.includes(word)).length;
    if (positiveCount > negativeCount) {
      return { sentiment: "positive", confidence: 0.6, score: 0.3 };
    } else if (negativeCount > positiveCount) {
      return { sentiment: "negative", confidence: 0.6, score: -0.3 };
    }
    return { sentiment: "neutral", confidence: 0.5, score: 0 };
  }
  filterImportantNews(newsItems) {
    const impactKeywords = {
      high: ["fed", "federal reserve", "interest rate", "inflation", "trump", "musk", "tesla", "war", "regulation", "sec", "etf"],
      medium: ["whale", "adoption", "partnership", "launch", "update", "earnings", "cpi", "gdp"],
      low: ["tweet", "comment", "minor", "speculation"]
    };
    return newsItems.map((item) => {
      const text = (item.title + " " + (item.description || "")).toLowerCase();
      let impact = "low";
      if (impactKeywords.high.some((keyword) => text.includes(keyword))) {
        impact = "high";
      } else if (impactKeywords.medium.some((keyword) => text.includes(keyword))) {
        impact = "medium";
      }
      return {
        ...item,
        impact,
        relevanceScore: this.calculateRelevanceScore(item)
      };
    }).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
  calculateRelevanceScore(item) {
    let score = 0;
    const ageHours = (Date.now() - new Date(item.created_at || item.pubDate).getTime()) / (1e3 * 60 * 60);
    score += Math.max(0, 24 - ageHours) / 24 * 50;
    if (item.votes) {
      score += Math.min(item.votes.positive - item.votes.negative, 50);
    }
    if (item.source === "Tagesschau") score += 20;
    if (item.source === "CryptoPanic" && item.kind === "news") score += 15;
    return score;
  }
  fetchUrl(url, responseType = "json") {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => data += chunk);
        res.on("end", () => {
          try {
            if (responseType === "json") {
              resolve(JSON.parse(data));
            } else {
              resolve(data);
            }
          } catch (error) {
            reject(error);
          }
        });
      }).on("error", reject);
    });
  }
  async processNews() {
    try {
      const [cryptoNews, germanNews] = await Promise.all([
        this.fetchCryptoPanicNews(),
        this.fetchTagesschauRSS()
      ]);
      const allNews = [...cryptoNews, ...germanNews];
      const filteredNews = this.filterImportantNews(allNews);
      const topNews = filteredNews.slice(0, 15);
      const newsWithSentiment = await Promise.all(
        topNews.map(async (item) => {
          const sentiment = await this.analyzeSentiment(item.title + " " + (item.description || ""));
          return { ...item, sentiment };
        })
      );
      return {
        news: newsWithSentiment,
        summary: {
          total: allNews.length,
          high_impact: newsWithSentiment.filter((n) => n.impact === "high").length,
          positive_sentiment: newsWithSentiment.filter((n) => n.sentiment.sentiment === "positive").length,
          negative_sentiment: newsWithSentiment.filter((n) => n.sentiment.sentiment === "negative").length
        }
      };
    } catch (error) {
      console.error("News processing error:", error);
      return { news: [], summary: { error: error.message } };
    }
  }
};
exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  };
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }
  const analyzer = new NewsAnalyzer();
  try {
    const result = await analyzer.processNews();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: result,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      })
    };
  } catch (error) {
    console.error("News sentiment function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
//# sourceMappingURL=news-sentiment.js.map
