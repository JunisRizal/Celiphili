var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/trustlogiq-system.js
var trustlogiq_system_exports = {};
var TrustLogiQ, AlertSystem, TradingBot;
var init_trustlogiq_system = __esm({
  "netlify/functions/trustlogiq-system.js"() {
    TrustLogiQ = class {
      constructor() {
        this.apiKey = process.env.COINGLASS_API_KEY || "b301b0371fd140c6800a1d11863bcf23";
        this.baseUrl = "https://open-api.coinglass.com/public/v2";
        this.confidenceThreshold = 0.75;
        this.minTradeConfidence = 0.6;
        this.penaltyDecay = 0.95;
        this.adaptationRate = 0.02;
        this.penaltyPoints = {
          liquidations: 0,
          fundingRate: 0,
          longShortRatio: 0,
          openInterest: 0
        };
      }
      async fetchCoinglass(endpoint, params = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
          "CG-API-KEY": this.apiKey,
          "Content-Type": "application/json"
        };
        try {
          const response = await fetch(url, { headers });
          return await response.json();
        } catch (error) {
          console.error(`API Error: ${error}`);
          return null;
        }
      }
      async getMarketData(symbol) {
        const [liquidations, funding, ratio, oi] = await Promise.all([
          this.fetchCoinglass("/liquidation/chart", { symbol, time: "1h" }),
          this.fetchCoinglass("/funding_rate", { symbol }),
          this.fetchCoinglass("/global_long_short", { symbol }),
          this.fetchCoinglass("/open_interest/chart", { symbol, time: "4h" })
        ]);
        return {
          liquidations: this.parseLiquidations(liquidations),
          fundingRate: funding?.data?.[0]?.rate || 0,
          longShortRatio: ratio?.data?.longShortRatio || 1,
          openInterest: this.calculateOIChange(oi)
        };
      }
      parseLiquidations(data) {
        if (!data?.data) return 0;
        const recent = data.data.slice(-1)[0];
        return (recent?.buyVol || 0) - (recent?.sellVol || 0);
      }
      calculateOIChange(data) {
        if (!data?.data || data.data.length < 2) return 0;
        const current = data.data[data.data.length - 1]?.value || 0;
        const previous = data.data[data.data.length - 2]?.value || 1;
        return (current - previous) / previous * 100;
      }
      normalizeToSignal(value, key) {
        const thresholds = {
          liquidations: { bull: 5e7, bear: -5e7 },
          fundingRate: { bull: -0.03, bear: 0.05 },
          longShortRatio: { bull: 0.85, bear: 1.15 },
          openInterest: { bull: 10, bear: -10 }
        };
        const t = thresholds[key];
        if (!t) return 0;
        switch (key) {
          case "liquidations":
            return value > t.bull ? 1 : value < t.bear ? -1 : value / t.bull;
          case "fundingRate":
            return value < t.bull ? 1 : value > t.bear ? -1 : -value / t.bear;
          case "longShortRatio":
            return value < t.bull ? 1 : value > t.bear ? -1 : (1 - value) * 5;
          case "openInterest":
            return value > t.bull ? 1 : value < t.bear ? -1 : value / t.bull;
          default:
            return 0;
        }
      }
      calculateConfidence(inputs) {
        let weightedScore = 0;
        let totalWeight = 0;
        Object.entries(inputs).forEach(([key, value]) => {
          const weight = Math.max(0.1, 1 - this.penaltyPoints[key]);
          const signal = this.normalizeToSignal(value, key);
          weightedScore += signal * weight;
          totalWeight += weight;
        });
        return totalWeight > 0 ? weightedScore / totalWeight : 0;
      }
      getRecommendation(confidence) {
        if (Math.abs(confidence) >= this.confidenceThreshold) {
          return { action: confidence > 0 ? "LONG" : "SHORT", execute: true };
        }
        if (Math.abs(confidence) >= this.minTradeConfidence) {
          return { action: confidence > 0 ? "LONG" : "SHORT", execute: false };
        }
        return { action: "HOLD", execute: false };
      }
      adaptSystem(correct, inputs) {
        Object.keys(inputs).forEach((key) => {
          if (correct) {
            this.penaltyPoints[key] *= this.penaltyDecay;
          } else {
            this.penaltyPoints[key] += 0.05;
          }
        });
      }
      async analyze(symbol) {
        const marketData = await this.getMarketData(symbol);
        const confidence = this.calculateConfidence(marketData);
        const recommendation = this.getRecommendation(confidence);
        return {
          symbol,
          confidence: Math.round(confidence * 100),
          recommendation,
          data: marketData,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        };
      }
    };
    AlertSystem = class {
      constructor(botToken, chatId) {
        this.botToken = botToken;
        this.chatId = chatId;
        this.telegramUrl = `https://api.telegram.org/bot${botToken}`;
      }
      async sendAlert(message) {
        console.log(`ALERT: ${message}`);
      }
    };
    TradingBot = class {
      constructor() {
        this.trustlogiq = new TrustLogiQ();
        this.symbols = ["BTC", "ETH", "SOL"];
        this.alerts = new AlertSystem(
          process.env.TELEGRAM_BOT_TOKEN || "YOUR_BOT_TOKEN",
          process.env.TELEGRAM_CHAT_ID || "YOUR_CHAT_ID"
        );
        this.tradeHistory = [];
      }
      async run() {
        console.log(`[${(/* @__PURE__ */ new Date()).toISOString()}] Running analysis...`);
        const results = [];
        for (const symbol of this.symbols) {
          try {
            const analysis = await this.trustlogiq.analyze(symbol);
            if (analysis.recommendation.execute) {
              const alert = `\u{1F6A8} ${symbol} SIGNAL
Action: ${analysis.recommendation.action}
Confidence: ${analysis.confidence}%
Liquidations: $${(analysis.data.liquidations / 1e6).toFixed(2)}M
Funding: ${(analysis.data.fundingRate * 100).toFixed(3)}%
L/S Ratio: ${analysis.data.longShortRatio.toFixed(3)}
OI Change: ${analysis.data.openInterest.toFixed(2)}%`;
              await this.alerts.sendAlert(alert);
              this.tradeHistory.push(analysis);
            }
            console.log(`${symbol}: ${analysis.recommendation.action} (${analysis.confidence}%)`);
            results.push(analysis);
          } catch (error) {
            console.error(`Error analyzing ${symbol}:`, error);
          }
        }
        return results;
      }
    };
    module.exports = { TrustLogiQ, TradingBot };
  }
});

// netlify/functions/trading-bot.js
var { TrustLogiQ: TrustLogiQ2, TradingBot: TradingBot2 } = (init_trustlogiq_system(), __toCommonJS(trustlogiq_system_exports));
exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  };
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }
  const bot = new TradingBot2();
  try {
    const results = await bot.run();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Analysis complete",
        data: results,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      })
    };
  } catch (error) {
    console.error("Bot error:", error);
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
//# sourceMappingURL=trading-bot.js.map
