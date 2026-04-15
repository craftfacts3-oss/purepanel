import { useState, useMemo, useRef, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300&family=Hind:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#ffffff;--bg2:#faf8f4;--bg3:#f3ede3;--bg4:#ecdcca;--bg5:#e0ccb0;
  --border:rgba(1,32,78,0.09);--border2:rgba(1,32,78,0.15);--border3:rgba(1,32,78,0.26);
  --navy:#01204e;--teal:#028391;--cream:#f6dcac;--peach:#faa968;--orange:#f85525;
  --accent:#f85525;--accent2:#028391;--accent-dim:#c7e8eb;
  --accent-g:#028391;--accent-b:#01204e;--accent-p:#faa968;
  --text:#01204e;--muted:#a0b0c8;--muted2:#6a7e9a;--muted3:#3d5475;
  --good:#028391;--warn:#faa968;--bad:#f85525;
  --fh:'Bricolage Grotesque',sans-serif;--fb:'Hind',sans-serif;--fm:'JetBrains Mono',monospace;
  --r:6px;--r2:4px;--r3:3px;
}
body{background:var(--bg);color:var(--text);font-family:var(--fb);font-size:14px;line-height:1.55;min-height:100vh}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:var(--bg2)}
::-webkit-scrollbar-track{background:var(--bg2)}
::-webkit-scrollbar-thumb{background:var(--bg4);border-radius:2px}

.nav{display:flex;align-items:center;padding:0 32px;height:56px;background:#fff;border-bottom:1px solid var(--border2);position:sticky;top:0;z-index:200;gap:0;box-shadow:0 1px 3px rgba(1,32,78,0.06)}
.logo{font-family:var(--fh);font-weight:800;font-size:17px;color:var(--navy);display:flex;align-items:center;gap:10px;white-space:nowrap;flex-shrink:0;cursor:pointer;margin-right:36px}
.logo-mark{font-family:var(--fm);font-size:11px;font-weight:700;color:#fff;background:var(--navy);padding:3px 7px;border-radius:3px;letter-spacing:.5px}
.logo-bio{color:var(--teal)}
.logo-hub{color:var(--muted2);font-weight:400}
.nav-links{display:flex;gap:0;flex:1;overflow-x:auto}
.nl{padding:0 16px;height:56px;display:flex;align-items:center;font-size:13px;font-weight:500;cursor:pointer;border:none;background:none;color:var(--muted2);transition:all .12s;font-family:var(--fh);position:relative;white-space:nowrap;flex-shrink:0;border-bottom:2px solid transparent}
.nl.on{color:var(--teal);border-bottom-color:var(--teal);font-weight:700}
.nl:hover:not(.on){color:var(--navy)}
.nl .nb{position:absolute;top:8px;right:4px;background:var(--orange);color:#fff;font-size:9px;font-weight:700;padding:1px 4px;border-radius:3px;font-family:var(--fm)}
.nav-r{display:flex;align-items:center;gap:8px;margin-left:auto;flex-shrink:0}
.btn{padding:7px 16px;border-radius:var(--r);font-size:12px;font-weight:600;cursor:pointer;border:none;transition:all .12s;font-family:var(--fh);display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.btn-cyan{background:var(--teal);color:#fff;font-weight:700}.btn-cyan:hover{background:#02a0af}
.btn-green{background:var(--teal);color:#fff}.btn-green:hover{background:#02a0af}
.btn-ghost{background:none;border:1px solid var(--border2);color:var(--muted2)}.btn-ghost:hover{border-color:var(--teal);color:var(--teal)}
.btn-sm{padding:5px 12px;font-size:11px}
.btn-xs{padding:3px 9px;font-size:10px;border-radius:var(--r2)}
.btn-danger{background:var(--orange);color:#fff;border:none}.btn-danger:hover{opacity:.85}
.btn-warn{background:rgba(248,85,37,0.1);color:var(--orange);border:1px solid rgba(248,85,37,0.3)}
.page{max-width:1560px;margin:0 auto;padding:24px 32px}
.page-title{font-family:var(--fh);font-weight:800;font-size:24px;letter-spacing:-.5px;margin-bottom:4px;color:var(--navy)}
.page-sub{color:var(--muted2);font-size:13px;margin-bottom:22px}
.hero{padding:48px 64px 36px;border-bottom:none;background:var(--navy);display:flex;align-items:center;gap:48px;flex-wrap:wrap}
.hero-left{flex:1;min-width:300px}
.hero-eyebrow{font-family:var(--fm);font-size:10px;font-weight:500;color:var(--peach);letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.hero-eyebrow::after{content:'';flex:0 0 32px;height:1px;background:rgba(250,169,104,0.4)}
.hero h1{font-family:var(--fh);font-weight:800;font-size:44px;letter-spacing:-2px;color:#fff;margin-bottom:14px;line-height:1.0}
.hero h1 em{font-style:normal;color:var(--peach)}
.hero-sub{color:rgba(255,255,255,0.6);font-size:14px;max-width:420px;margin-bottom:24px;line-height:1.7}
.hero-search{position:relative;max-width:460px}
.hero-search input{width:100%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-top:2px solid var(--peach);border-radius:0 0 var(--r) var(--r);padding:12px 16px 12px 40px;color:#fff;font-size:14px;font-family:var(--fb);outline:none;transition:border .12s}
.hero-search input:focus{border-top-color:var(--peach)}
.hero-search input::placeholder{color:rgba(255,255,255,0.35)}
.hs-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:rgba(255,255,255,0.5);font-size:14px;pointer-events:none}
.hero-right{display:flex;flex-direction:column;gap:8px;min-width:200px}
.hero-stat-pill{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:12px;padding:12px 18px;display:flex;align-items:center;gap:10px}
.hsp-val{font-family:var(--fm);font-weight:700;font-size:20px;color:var(--peach)}
.hsp-lbl{font-size:11px;color:rgba(255,255,255,0.55)}
.deal-ticker{background:var(--teal);border-bottom:none;padding:10px 0;display:flex;align-items:center;gap:0;overflow:hidden;border-radius:0}
.dt-tag{font-family:var(--fm);font-size:9px;font-weight:700;color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:20px;padding:4px 12px;flex-shrink:0;letter-spacing:.8px;background:rgba(255,255,255,0.15);margin:0 16px 0 20px;white-space:nowrap}
.dt-track{display:flex;gap:0;animation:ticker 28s linear infinite;white-space:nowrap;will-change:transform}
.dt-track:hover{animation-play-state:paused}
.dt-deal{color:#fff;font-weight:600;font-family:var(--fm);font-size:12px;padding:0 36px;white-space:nowrap;opacity:.95;display:inline-flex;align-items:center;gap:8px}
.dt-deal::before{content:'·';opacity:.4;margin-right:0}
@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
/* VENDOR LOGO */
.vlogo{border-radius:10px;display:flex;align-items:center;justify-content:center;overflow:hidden;border:1.5px solid var(--border2);flex-shrink:0}
.vlogo-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:var(--fh);font-weight:800;letter-spacing:-.5px;line-height:1}
/* VENDOR ROW — cleaner card style matching reference */
.vr-row{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--border);transition:background .12s;position:relative;background:#fff}
.vr-row:last-of-type{border-bottom:none}
.vr-row:hover{background:rgba(2,131,145,0.02)}
.vr-row-left{display:flex;align-items:center;gap:10px;flex:1;min-width:0}
.vr-row-info{flex:1;min-width:0}
.vr-row-name{font-family:var(--fh);font-size:13px;font-weight:700;color:var(--navy);display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.vr-row-sub{display:flex;align-items:center;gap:8px;margin-top:3px;flex-wrap:wrap}
.vr-row-right{display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0}
.vr-row-price-top{display:flex;align-items:center;gap:5px}
.vr-big-price{font-family:var(--fh);font-weight:800;font-size:22px;color:var(--teal)}

.cat-bar{display:flex;gap:0;padding:0;background:transparent;border-bottom:none;overflow-x:auto}
.cc{padding:5px 14px;height:auto;display:inline-flex;align-items:center;font-size:12px;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,0.1);border-radius:20px;background:rgba(255,255,255,0.07);color:rgba(255,255,255,0.65);transition:all .14s;font-family:var(--fh);white-space:nowrap;margin:0 3px}
.cc.on{color:#fff;background:var(--teal);border-color:var(--teal);font-weight:700}
.cc:hover:not(.on){color:var(--navy)}
.filter-panel{background:var(--bg2);border-bottom:1px solid var(--border2);padding:10px 32px;display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap}
.fp-group{display:flex;flex-direction:column;gap:5px}
.fp-label{font-family:var(--fm);font-size:9px;font-weight:600;color:var(--muted2);text-transform:uppercase;letter-spacing:1px}
.fp-chips{display:flex;gap:4px;flex-wrap:wrap}
.fchip{padding:4px 11px;border-radius:var(--r);font-size:11px;font-weight:600;cursor:pointer;border:1px solid var(--border2);background:#fff;color:var(--muted2);transition:all .12s;font-family:var(--fh);white-space:nowrap}
.fchip.on{background:rgba(2,131,145,0.08);border-color:rgba(2,131,145,0.35);color:var(--teal)}
.fchip:hover:not(.on){border-color:var(--border3);color:var(--navy)}
.fchip.g.on{background:rgba(2,131,145,0.08);border-color:rgba(2,131,145,0.35);color:var(--teal)}
.fchip.w.on{background:rgba(250,169,104,0.1);border-color:rgba(250,169,104,0.4);color:#b86a10}
.fchip.r.on{background:rgba(248,85,37,0.08);border-color:rgba(248,85,37,0.3);color:var(--orange)}
.toolbar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:9px 24px;border-bottom:1px solid var(--border2);background:#fff}
.sort-btn{padding:5px 12px;border-radius:var(--r2);font-size:11px;font-weight:600;cursor:pointer;border:1px solid var(--border2);background:#fff;color:var(--muted2);font-family:var(--fh);transition:all .12s}
.sort-btn.on{background:var(--teal);border-color:var(--teal);color:#fff;font-weight:700}
.sort-btn:hover:not(.on){border-color:var(--teal);color:var(--teal)}
.view-btns{display:flex;gap:2px;background:var(--bg3);border-radius:var(--r2);padding:3px;margin-left:auto;border:1px solid var(--border2)}
.vbtn{width:30px;height:26px;border-radius:var(--r2);cursor:pointer;border:none;background:none;color:var(--muted2);font-size:13px;transition:all .12s;display:flex;align-items:center;justify-content:center}
.vbtn.on{background:var(--teal);color:#fff}
.vbtn:hover:not(.on){color:var(--navy)}
.stats-row{display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin-bottom:20px;border:1px solid var(--border2);border-radius:var(--r);overflow:hidden}
.stat{background:#fff;padding:14px 16px;border-right:1px solid var(--border2)}
.stat:last-child{border-right:none}
.stat-l{font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:1px;font-family:var(--fm);margin-bottom:5px}
.stat-v{font-family:var(--fh);font-weight:800;font-size:22px;color:var(--navy)}
.stat-v.g{color:var(--teal)}.stat-v.b{color:var(--navy)}.stat-v.o{color:#b86a10}
.pg{background:#fff;border:1px solid var(--border2);border-radius:var(--r);overflow:visible;margin-bottom:10px;box-shadow:0 1px 3px rgba(1,32,78,0.05)}
.pg-hdr{padding:12px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .12s;border-radius:var(--r) var(--r) 0 0;border-left:3px solid var(--cream)}
.pg-hdr:hover{background:rgba(2,131,145,0.02);border-left-color:var(--teal)}
.pg-name{font-family:var(--fh);font-weight:800;font-size:16px;letter-spacing:-.4px;flex-shrink:0;color:var(--navy)}
.pg-doses{display:flex;gap:3px;flex-wrap:wrap;flex:1;justify-content:center}
.dtab{padding:3px 10px;border-radius:var(--r2);font-size:11px;font-weight:600;cursor:pointer;border:1px solid var(--border2);background:#fff;color:var(--muted2);font-family:var(--fh);transition:all .12s;white-space:nowrap}
.dtab.on{background:var(--teal);border-color:var(--teal);color:#fff;font-weight:700}
.pg-chev{color:var(--muted);font-size:10px;flex-shrink:0;font-family:var(--fm)}
.vr-grid{display:flex;flex-direction:column}
.vr-cell{border-right:1px solid var(--border);border-bottom:1px solid var(--border);padding:12px 15px;transition:background .12s;position:relative;background:#fff}
.vr-cell:nth-child(3n){border-right:none}
.vr-cell:hover{background:rgba(2,131,145,0.02)}
.vr-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:7px;gap:5px}
.vr-rank{font-family:var(--fm);font-size:9px;font-weight:600;color:var(--muted2);background:var(--bg3);border:1px solid var(--border2);border-radius:var(--r2);padding:2px 6px}
.vr-rank.gold{background:rgba(250,169,104,0.15);color:#b86a10;border-color:rgba(250,169,104,0.4)}
.test-badge{display:inline-flex;align-items:center;gap:3px;border-radius:var(--r2);padding:2px 7px;font-size:10px;font-weight:700;font-family:var(--fm);cursor:pointer;transition:all .12s;border:1px solid}
.tb-hi{background:rgba(2,131,145,0.08);border-color:rgba(2,131,145,0.3);color:var(--teal)}
.tb-md{background:rgba(250,169,104,0.1);border-color:rgba(250,169,104,0.4);color:#b86a10}
.tb-lo{background:rgba(248,85,37,0.08);border-color:rgba(248,85,37,0.25);color:var(--orange)}
.vr-name{font-family:var(--fh);font-size:13px;font-weight:700;color:var(--navy);margin-bottom:3px}
.vr-meta{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:8px}
.vm{font-size:10px;color:var(--muted2);font-family:var(--fm)}
.vm.ok{color:var(--teal)}.vm.lw{color:#b86a10}.vm.bd{color:var(--orange)}
.pay-chips{display:flex;gap:3px;flex-wrap:wrap;margin-bottom:8px}
.pay-chip{font-family:var(--fm);font-size:9px;padding:2px 6px;border-radius:var(--r2);background:var(--bg2);border:1px solid var(--border2);color:var(--muted2);font-weight:600}
.pay-chip.card{border-color:rgba(2,131,145,0.35);color:var(--teal);background:rgba(2,131,145,0.05)}
.pay-chip.crypto{border-color:rgba(250,169,104,0.4);color:#b86a10;background:rgba(250,169,104,0.07)}
.pay-chip.venmo{border-color:rgba(1,32,78,0.3);color:var(--navy);background:rgba(1,32,78,0.04)}
.pay-chip.paypal{border-color:rgba(2,131,145,0.3);color:var(--teal);background:rgba(2,131,145,0.04)}
.pay-chip.wire{border-color:rgba(248,85,37,0.3);color:var(--orange);background:rgba(248,85,37,0.05)}
.price-block{margin-bottom:9px}
.pb-before{display:flex;align-items:center;gap:5px;margin-bottom:2px}
.pb-orig{font-family:var(--fm);font-size:11px;color:var(--muted);text-decoration:line-through}
.pb-pct{font-family:var(--fm);font-size:9px;font-weight:700;color:var(--orange);background:rgba(248,85,37,0.08);border:1px solid rgba(248,85,37,0.2);border-radius:var(--r2);padding:1px 5px}
.pb-after{display:flex;align-items:baseline;gap:6px}
.pb-price{font-family:var(--fh);font-weight:800;font-size:22px;color:var(--navy)}
.pb-save{font-family:var(--fm);font-size:10px;color:var(--teal);font-weight:700}
.pb-ppm{font-family:var(--fm);font-size:10px;color:var(--teal);margin-top:2px}
.vr-coupon{display:inline-flex;align-items:center;gap:5px;background:rgba(248,85,37,0.05);border:1px dashed rgba(248,85,37,0.35);border-radius:var(--r);padding:4px 9px;font-family:var(--fm);font-size:10px;color:var(--orange);cursor:pointer;transition:all .12s;margin-bottom:8px;width:100%}
.vr-coupon:hover{border-color:var(--orange);background:rgba(248,85,37,0.1)}
.vr-actions{display:flex;gap:5px}
.bv-bar{background:rgba(2,131,145,0.05);border-top:1px solid rgba(2,131,145,0.18);padding:9px 16px;display:flex;align-items:center;gap:8px}
.bv-lbl{font-family:var(--fh);font-size:11px;color:var(--teal);font-weight:700}
.bv-val{font-family:var(--fm);font-size:11px;color:var(--teal)}
.low-bar{background:rgba(250,169,104,0.07);border-top:1px solid rgba(250,169,104,0.25);padding:7px 16px;display:flex;align-items:center;gap:7px;cursor:pointer}
.low-bar-txt{font-family:var(--fm);font-size:10px;color:#b86a10}
.test-popup{position:absolute;z-index:350;background:#fff;border:1px solid var(--border3);border-radius:var(--r);padding:14px;width:224px;box-shadow:0 8px 32px rgba(1,32,78,0.12)}
.tp-hdr{font-family:var(--fh);font-size:12px;font-weight:700;color:var(--navy);margin-bottom:9px;display:flex;align-items:center;justify-content:space-between}
.tp-item{display:flex;align-items:center;gap:7px;padding:3px 0;font-family:var(--fm);font-size:11px}
.tp-item.pass{color:var(--teal)}.tp-item.fail{color:var(--orange)}
.tp-labs{margin-top:8px;padding-top:8px;border-top:1px solid var(--border)}
.tp-lab-t{font-size:9px;color:var(--muted);font-family:var(--fm);text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px}
.tp-note{font-size:10px;color:var(--muted2);font-style:italic;margin-top:6px;line-height:1.5}
.ph-modal{background:#fff;border:1px solid var(--border3);border-radius:var(--r);padding:22px;max-width:640px;width:100%;max-height:80vh;overflow-y:auto}
.ph-title{font-family:var(--fh);font-weight:800;font-size:16px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;color:var(--navy)}
.ph-toggle{display:flex;gap:2px;background:var(--bg3);border-radius:var(--r2);padding:2px;border:1px solid var(--border2)}
.ph-tbtn{padding:4px 12px;border-radius:var(--r2);font-size:11px;font-weight:700;cursor:pointer;border:none;background:none;color:var(--muted2);transition:all .12s;font-family:var(--fh)}
.ph-tbtn.on{background:var(--teal);color:#fff}
.chart-area{width:100%;height:180px;position:relative;margin:16px 0 8px}
.chart-svg{width:100%;height:100%}
.chart-legend{display:flex;gap:12px;flex-wrap:wrap;margin-top:8px}
.cl-item{display:flex;align-items:center;gap:5px;font-family:var(--fm);font-size:10px;color:var(--muted2)}
.cl-dot{width:8px;height:8px;border-radius:50%}
.price-table{width:100%;border-collapse:collapse;margin-top:12px}
.price-table th{font-family:var(--fm);font-size:9px;text-transform:uppercase;letter-spacing:.8px;color:var(--muted2);padding:6px 8px;border-bottom:1px solid var(--border);text-align:left}
.price-table td{font-family:var(--fm);font-size:11px;padding:7px 8px;border-bottom:1px solid var(--border);color:var(--navy)}
.alert-modal{background:#fff;border:1px solid var(--border3);border-radius:var(--r);padding:24px;max-width:400px;width:100%}
.am-title{font-family:var(--fh);font-weight:800;font-size:16px;margin-bottom:6px;color:var(--navy)}
.am-sub{font-size:13px;color:var(--muted2);margin-bottom:16px;line-height:1.6}
.am-input{width:100%;background:var(--bg2);border:1px solid var(--border2);border-top:2px solid var(--teal);border-radius:0 0 var(--r) var(--r);padding:10px 12px;color:var(--navy);font-size:13px;font-family:var(--fb);outline:none}
.am-input:focus{border-top-color:var(--teal)}
.am-input::placeholder{color:var(--muted)}
.am-note{font-size:10px;color:var(--muted2);margin-top:8px;font-family:var(--fm);line-height:1.5}
.featured-deal{background:var(--navy);border-radius:14px;padding:18px 24px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.fd-tag{font-family:var(--fm);font-size:9px;font-weight:700;color:var(--cream);border:1px solid rgba(246,220,172,0.3);border-radius:var(--r2);padding:2px 7px;letter-spacing:.5px;background:rgba(246,220,172,0.1);margin-bottom:5px;display:inline-block}
.fd-name{font-family:var(--fh);font-weight:800;font-size:15px;color:#fff}
.fd-detail{font-size:12px;color:rgba(255,255,255,0.55);margin-top:2px}
.fd-price-col{text-align:right;flex-shrink:0}
.fd-orig{font-family:var(--fm);font-size:11px;color:rgba(255,255,255,0.4);text-decoration:line-through}
.fd-price{font-family:var(--fh);font-weight:800;font-size:22px;color:var(--peach)}
.fd-save{font-family:var(--fm);font-size:10px;color:var(--cream);font-weight:700}
.vi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media(max-width:900px){.vi-grid{grid-template-columns:repeat(2,1fr)}}
.vi-card{background:#fff;border:1px solid var(--border2);border-radius:var(--r);overflow:hidden;transition:border-color .12s,transform .12s,box-shadow .12s;box-shadow:0 1px 4px rgba(1,32,78,0.07)}
.vi-card:hover{border-color:var(--teal);transform:translateY(-2px);box-shadow:0 6px 20px rgba(1,32,78,0.1)}
.vi-hdr{padding:18px;display:flex;align-items:center;gap:12px}
.vi-logo{width:48px;height:48px;background:rgba(246,220,172,0.35);border:1px solid rgba(246,220,172,0.5);border-radius:var(--r);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.vi-hdr-name{font-family:var(--fh);font-weight:800;font-size:15px;color:#fff}
.vi-hdr-cat{font-size:11px;color:rgba(255,255,255,0.6);margin-top:2px}
.vi-body{padding:14px}
.vi-desc{font-size:12px;color:var(--muted2);line-height:1.6;margin-bottom:12px}
.vi-row{display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);font-size:12px}
.vi-row:last-of-type{border-bottom:none}
.vi-row-lbl{color:var(--muted2);display:flex;align-items:center;gap:5px}
.vi-row-val{font-family:var(--fm);font-size:11px;font-weight:700;color:var(--navy)}
.vi-row-val.g{color:var(--teal)}.vi-row-val.o{color:#b86a10}.vi-row-val.b{color:var(--navy)}
.vi-link{display:block;text-align:center;padding:10px;border-top:1px solid var(--border);font-family:var(--fh);font-size:12px;font-weight:600;color:var(--teal);cursor:pointer;transition:background .12s}
.vi-link:hover{background:rgba(2,131,145,0.05)}
.grad-a{background:linear-gradient(135deg,var(--navy),#02387a)}
.grad-b{background:linear-gradient(135deg,#015a6a,var(--teal))}
.grad-c{background:linear-gradient(135deg,#02607a,#028391)}
.grad-d{background:linear-gradient(135deg,#01204e,#024a8a)}
.grad-e{background:linear-gradient(135deg,#b03d08,var(--orange))}
.grad-f{background:linear-gradient(135deg,var(--navy),var(--teal))}
.rev-layout{display:grid;grid-template-columns:1fr 340px;gap:20px;align-items:start}
@media(max-width:900px){.rev-layout{grid-template-columns:1fr}}
.rev-summary{background:#fff;border:1px solid var(--border2);border-radius:var(--r);padding:18px;margin-bottom:12px}
.rev-score{font-family:var(--fh);font-weight:800;font-size:50px;color:var(--navy);line-height:1}
.rev-bar-row{display:flex;align-items:center;gap:7px;margin-bottom:4px}
.rev-bar-lbl{font-family:var(--fm);font-size:10px;color:var(--muted2);width:10px;text-align:right}
.rev-bar-track{flex:1;height:5px;background:var(--bg3);border-radius:2px;overflow:hidden}
.rev-bar-fill{height:100%;background:var(--peach);border-radius:2px}
.rev-bar-n{font-family:var(--fm);font-size:10px;color:var(--muted2);width:18px}
.rev-card{background:#fff;border:1px solid var(--border2);border-radius:var(--r);padding:14px;margin-bottom:9px;transition:border-color .12s}
.rev-card:hover{border-color:var(--teal)}
.rev-card-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:7px;gap:8px}
.rev-card-name{font-family:var(--fh);font-size:13px;font-weight:700;color:var(--navy)}
.rev-card-vendor{font-size:11px;color:var(--teal);font-family:var(--fm);margin-top:2px}
.rev-text{font-size:13px;color:var(--muted2);line-height:1.6}
.rev-date{font-size:10px;color:var(--muted);font-family:var(--fm)}
.rev-tags{display:flex;gap:5px;flex-wrap:wrap;margin-top:7px}
.rev-tag{font-size:10px;font-family:var(--fh);font-weight:600;padding:2px 8px;border-radius:var(--r2);background:var(--bg2);border:1px solid var(--border2);color:var(--muted2)}
.rev-badge{font-family:var(--fm);font-size:9px;font-weight:700;padding:2px 7px;border-radius:var(--r2);letter-spacing:.4px}
.rev-pending{background:rgba(250,169,104,0.1);color:#b86a10;border:1px solid rgba(250,169,104,0.3)}
.rev-approved{background:rgba(2,131,145,0.08);color:var(--teal);border:1px solid rgba(2,131,145,0.2)}
.rev-form{background:#fff;border:1px solid var(--border2);border-radius:var(--r);padding:18px;position:sticky;top:68px}
.rf-star{font-size:22px;cursor:pointer;transition:transform .1s;color:var(--muted)}
.rf-star.on{color:var(--peach)}
.rf-star:hover{transform:scale(1.15)}
.calc-tabs{display:flex;background:var(--bg2);border-radius:var(--r);overflow:hidden;border:1px solid var(--border2);margin-bottom:20px}
.ctab{flex:1;padding:10px 8px;font-size:12px;font-weight:700;cursor:pointer;border:none;background:none;color:var(--muted2);transition:all .12s;font-family:var(--fh);text-align:center;border-right:1px solid var(--border)}
.ctab:last-child{border-right:none}
.ctab.on{background:var(--teal);color:#fff}
.ctab:hover:not(.on){color:var(--navy);background:rgba(2,131,145,0.04)}
.calc-card{background:#fff;border:1px solid var(--border2);border-radius:var(--r);padding:24px;max-width:700px;margin:0 auto;box-shadow:0 1px 4px rgba(1,32,78,0.06)}
.cs-title{font-size:9px;font-weight:700;color:var(--teal);text-transform:uppercase;letter-spacing:1px;font-family:var(--fm);margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.fg{margin-bottom:13px}
.fl{display:flex;gap:8px}
.flabel{font-size:11px;color:var(--muted2);font-weight:600;margin-bottom:5px;display:block;font-family:var(--fh)}
.fi{width:100%;background:var(--bg2);border:1px solid var(--border2);border-top:2px solid var(--border2);border-radius:0 0 var(--r) var(--r);padding:9px 12px;color:var(--navy);font-size:13px;font-family:var(--fb);outline:none;transition:border .12s}
.fi:focus{border-top-color:var(--teal)}
.fi::placeholder{color:var(--muted)}
.fsel{width:100%;background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r);padding:9px 12px;color:var(--navy);font-size:13px;font-family:var(--fb);outline:none;cursor:pointer}
.ut{display:flex;background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r);overflow:hidden}
.ut-btn{flex:1;padding:9px 6px;font-size:11px;font-weight:700;cursor:pointer;border:none;background:none;color:var(--muted2);transition:all .12s;font-family:var(--fm)}
.ut-btn.on{background:var(--teal);color:#fff}
.syr-btns{display:grid;grid-template-columns:repeat(4,1fr);background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r);overflow:hidden}
.syr-btn{padding:10px 6px;text-align:center;cursor:pointer;border:none;background:none;color:var(--muted2);transition:all .12s;font-family:var(--fh);border-right:1px solid var(--border);font-weight:600}
.syr-btn:last-child{border-right:none}
.syr-btn.on{background:var(--teal);color:#fff}
.syr-main{font-size:12px;font-weight:700}
.syr-sub{font-size:9px;margin-top:1px;opacity:.65;font-family:var(--fm)}
.type-toggle{display:flex;background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r);overflow:hidden;margin-bottom:14px}
.tt-btn{flex:1;padding:10px 12px;font-size:12px;font-weight:700;cursor:pointer;border:none;background:none;color:var(--muted2);transition:all .12s;font-family:var(--fh);display:flex;align-items:center;justify-content:center;gap:5px;border-right:1px solid var(--border)}
.tt-btn:last-child{border-right:none}
.tt-btn.on{background:var(--teal);color:#fff}
.calc-res{background:var(--bg2);border-radius:var(--r);padding:16px;border:1px solid rgba(2,131,145,0.2);margin-top:8px}
.cr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.cr-lbl{font-size:9px;color:var(--muted2);text-transform:uppercase;letter-spacing:.8px;font-family:var(--fm);margin-bottom:3px}
.cr-val{font-family:var(--fh);font-weight:800;font-size:20px;color:var(--navy)}
.cr-unit{font-size:10px;color:var(--muted2);font-family:var(--fm);margin-top:1px}
.calc-note{background:var(--bg2);border-radius:var(--r);padding:13px 15px;margin-top:13px;border:1px solid var(--border2)}
.calc-note-t{font-size:11px;font-weight:700;color:var(--navy);margin-bottom:7px;font-family:var(--fh)}
.calc-note ul{padding-left:14px}.calc-note li{font-size:11px;color:var(--muted2);margin-bottom:3px}
.res-warn{font-size:11px;color:var(--orange);margin-top:8px;font-weight:700;font-family:var(--fm);letter-spacing:.2px}
.cart-wrap{max-width:820px;margin:0 auto}
.a-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-bottom:18px;border:1px solid var(--border2);border-radius:var(--r);overflow:hidden}
.as{background:#fff;padding:16px;display:flex;align-items:center;gap:12px;border-right:1px solid var(--border2)}
.as:last-child{border-right:none}
.as-icon{width:36px;height:36px;border-radius:var(--r);display:flex;align-items:center;justify-content:center;font-size:16px}
.as-num{font-family:var(--fh);font-weight:800;font-size:22px}
.as-lbl{font-size:11px;color:var(--muted2);margin-top:1px}
.sb{background:#fff;border:1px solid var(--border2);border-radius:var(--r);overflow:hidden;margin-bottom:12px}
.sb-hdr{padding:12px 16px;border-bottom:1px solid var(--border2);display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;background:var(--bg2)}
.sb-title{font-family:var(--fh);font-weight:800;font-size:14px;letter-spacing:-.2px;color:var(--navy)}
.tbl{width:100%;border-collapse:collapse}
.tbl th{background:var(--bg2);padding:9px 12px;text-align:left;font-size:9px;text-transform:uppercase;letter-spacing:1px;color:var(--muted2);font-family:var(--fm);border-bottom:1px solid var(--border2);font-weight:700}
.tbl td{padding:10px 12px;border-bottom:1px solid var(--border);font-size:12px;vertical-align:middle;color:var(--navy)}
.tbl tr:hover td{background:rgba(2,131,145,0.02)}
.tbl-wrap{overflow-x:auto}
.sp{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:var(--r2);font-size:10px;font-weight:700;font-family:var(--fm)}
.sp-dot{width:4px;height:4px;border-radius:50%;background:currentColor}
.sp-pending{background:rgba(250,169,104,0.12);color:#b86a10}
.sp-approved{background:rgba(2,131,145,0.08);color:var(--teal)}
.sp-rejected{background:rgba(248,85,37,0.08);color:var(--orange)}
.overlay{position:fixed;inset:0;background:rgba(1,32,78,0.55);z-index:400;display:flex;align-items:center;justify-content:center;padding:20px}
.modal{background:#fff;border:1px solid var(--border3);border-radius:var(--r);padding:26px;max-width:560px;width:100%;max-height:84vh;overflow-y:auto;box-shadow:0 16px 48px rgba(1,32,78,0.18)}
.modal-title{font-family:var(--fh);font-weight:800;font-size:18px;margin-bottom:18px;letter-spacing:-.3px;color:var(--navy)}
.modal-actions{display:flex;gap:8px;margin-top:20px;justify-content:flex-end}
.fs-title{font-size:9px;font-weight:700;color:var(--teal);text-transform:uppercase;letter-spacing:1px;font-family:var(--fm);margin-bottom:9px;padding-bottom:7px;border-bottom:1px solid var(--border)}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.toast{position:fixed;bottom:22px;right:22px;background:#fff;border:1px solid var(--border3);border-left:3px solid var(--teal);border-radius:var(--r);padding:10px 16px;font-size:12px;color:var(--navy);font-weight:700;z-index:500;animation:su .15s ease;pointer-events:none;font-family:var(--fh);box-shadow:0 4px 16px rgba(1,32,78,0.12)}
@keyframes su{from{transform:translateY(6px);opacity:0}to{transform:translateY(0);opacity:1}}
.empty{text-align:center;padding:60px 20px;color:var(--muted2);font-family:var(--fh)}
`;

// ── DATA ─────────────────────────────────────────────────────────────────────
const CATS=["All","Peptides","Capsules","Liquids","Nasal Sprays","Topicals","Supplies","Dissolvable Strips"];
const TEST_STANDARDS=["Identification","Net Purity","Net Quantity","Endotoxins","Sterility","Heavy Metals","Conformity"];
const PAYMENT_OPTS=["Card","Crypto","Venmo","PayPal","Wire"];

const LABS_DATA=[
  {id:"afi",name:"AFI",fullName:"Analytical Formulations Lab",website:"analyticalformulations.com",location:"USA",iso:false,badge:"AFI",desc:"Provides supplement analysis in the USA. Confirm analytical scope and contact information directly on their site.",services:["Supplement analysis"],tags:[]},
  {id:"chromate",name:"Chromate",fullName:"Chromate",website:"chromate.org",location:"USA",iso:false,badge:"CHR",desc:"Offers supplement analysis in the USA using literature-based methods. Publishes results through a public 'Verify' portal — COAs can be looked up directly.",services:["Supplement analysis","Verify portal"],tags:["Verify Portal"]},
  {id:"eagle",name:"Eagle Analytics",fullName:"Eagle Analytical",website:"eagleanalytical.com",location:"USA",iso:false,badge:"EAG",desc:"Analytical chemistry and microbiological testing, consulting, calibration, certification, and compliance for FDA-regulated and related industries.",services:["Analytical chemistry","Microbiology","FDA compliance"],tags:["FDA Regulated"]},
  {id:"ethos",name:"Ethos Analytics",fullName:"Ethos Analytics",website:"ethosanalytics.io",location:"Phoenix, AZ",iso:true,badge:"ETH",desc:"ISO 17025 accredited laboratory offering peptide purity and quantitation, nutraceutical and supplement testing, food and beverage, OTC, cosmetics, shelf-life and stability, Amazon compliance, and consulting.",services:["Peptide purity","Peptide quantitation","Supplement testing","Stability","Amazon compliance"],tags:["ISO 17025","Peptide Specialist"]},
  {id:"freedom",name:"Freedom Diagnostics",fullName:"Freedom Diagnostics Testing",website:"freedomdiagnosticstesting.com",location:"USA",iso:false,badge:"FDT",desc:"Provides high-precision purity testing for research-use-only peptides with online COA lookup. Research-use-only disclaimer applies to all reports.",services:["Purity testing","Online COA lookup"],tags:["Research Use Only","COA Lookup"]},
  {id:"ils",name:"ILS Labs",fullName:"ILS Laboratories",website:"ilslabs.com",location:"San Diego, CA",iso:true,badge:"ILS",desc:"ISO 17025 accredited. Chemistry and microbiology for supplements and research peptides. Full peptide QC panels including HPLC purity, USP 85-style endotoxin testing, sterility screening, and ICP-MS metals. QR-verified COAs. Typical 3–5 business day turnaround.",services:["HPLC purity","Endotoxins (USP 85)","Sterility screening","ICP-MS heavy metals","QR-verified COAs"],tags:["ISO 17025","QR Verified","3–5 Day TAT"]},
  {id:"janoshik",name:"Janoshik",fullName:"Janoshik",website:"janoshik.com",location:"International",iso:false,badge:"JAN",desc:"Chemical analysis for peptides, steroids, and pharmaceutical compounds. Digital reporting with account-based access to results. Widely used in the research peptide community.",services:["Peptide analysis","Steroid analysis","Digital COA reporting"],tags:["Widely Used"]},
  {id:"kovera",name:"Kovera Labs",fullName:"Kovera Labs",website:"koveralabs.com",location:"USA",iso:false,badge:"KOV",desc:"Compound testing and COA verification services. Confirm current service offerings directly on their website.",services:["Compound testing","COA verification"],tags:[]},
  {id:"mzbio",name:"MZ Biolabs",fullName:"MZ Biolabs",website:"mzbiolabs.com",location:"Tucson, AZ",iso:false,badge:"MZB",desc:"Specialty testing and discovery using mass spectrometry for research, medical, and veterinary markets. Based in Tucson, AZ.",services:["Mass spectrometry","Research peptides","Veterinary testing"],tags:["Mass Spectrometry"]},
  {id:"vanguard",name:"Vanguard",fullName:"Vanguard Laboratory",website:"vanguardlaboratory.com",location:"USA",iso:true,badge:"VAN",desc:"ISO/IEC 17025 certified. Peptide and research-chemical testing including HPLC purity, quantity, endotoxin, sterility, ICP-MS metals, identity testing, and COA reporting.",services:["HPLC purity","Quantity testing","Endotoxins","Sterility","ICP-MS metals","Identity testing","COA reporting"],tags:["ISO 17025","Full Panel"]},
];
const TESTING_OPTS=["7/7 Full","6/7+","3/7+","Any"];
const PAY_CLASS={Card:"card",Crypto:"crypto",Venmo:"venmo",PayPal:"paypal",Wire:"wire"};
const CHART_COLORS=["#028391","#faa968","#01204e","#f85525","#f6dcac"];
const MONTHS=["Nov","Dec","Jan","Feb","Mar","Apr"];

const VENDORS_INFO=[
  {id:1,name:"PureRawz",emoji:"⚗",initials:"PR",logoBg:"#01204e",logoFg:"#028391",cat:"Research Peptides & Compounds",desc:"PureRawz provides research-use-only peptides and compounds with a focus on quality, innovation, and transparency. Multiple third-party testing programs.",shipping:"$9.99",freeAt:"$100",testing:"4/7",products:47,payment:["Card","Crypto"],website:"pureraws.com",grad:"grad-a"},
  {id:2,name:"Peptide Sciences",emoji:"🧬",initials:"PS",logoBg:"#028391",logoFg:"#fff",cat:"Research-Grade Peptides",desc:"Peptide Sciences offers pharmaceutical-grade research peptides with rigorous quality controls, full COA transparency, and industry-leading purity standards.",shipping:"$15.00",freeAt:"$200",testing:"7/7",products:89,payment:["Card","PayPal"],website:"peptidesciences.com",grad:"grad-b"},
  {id:3,name:"Swisschems",emoji:"🔬",initials:"SC",logoBg:"#f6dcac",logoFg:"#01204e",cat:"Research Compounds & SARMs",desc:"Swisschems specializes in high-purity research compounds with EU warehouse options and competitive pricing on a wide range of peptides and SARMs.",shipping:"$10.00",freeAt:"$150",testing:"3/7",products:62,payment:["Card","Crypto","Wire"],website:"swisschems.is",grad:"grad-c"},
  {id:4,name:"Limitless Life",emoji:"💊",initials:"LL",logoBg:"#faa968",logoFg:"#01204e",cat:"Peptides & Nootropics",desc:"Limitless Life Nootropics focuses on research peptides and nootropic compounds. Good value pricing with BOGO deals. Partial COA coverage.",shipping:"$7.99",freeAt:"$75",testing:"3/7",products:31,payment:["Card","Venmo","Crypto"],website:"limitlesslife.co",grad:"grad-d"},
  {id:5,name:"FelixChem",emoji:"⚗",initials:"FC",logoBg:"#f85525",logoFg:"#fff",cat:"Chemical Research Compounds",desc:"FelixChem offers a broad range of research chemicals and peptides. Uses multiple third-party testing labs — COA availability varies by batch.",shipping:"$12.00",freeAt:"$120",testing:"3/7",products:23,payment:["Crypto","Wire"],website:"felixchem.com",grad:"grad-e"},
  {id:6,name:"Ion Peptide",emoji:"🧪",initials:"IP",logoBg:"#01204e",logoFg:"#f6dcac",cat:"Research Peptides",desc:"Ion Peptide provides competitively priced research peptides with batch testing through Chromate labs. Fast domestic shipping.",shipping:"$8.00",freeAt:"$100",testing:"6/7",products:41,payment:["Card","Crypto","Venmo"],website:"ionpeptide.com",grad:"grad-f"},
];

// Price history: 6 months of weekly data per vendor
const makeHistory=(base,vendors)=>vendors.map((v,vi)=>{
  const pts=MONTHS.map((m,i)=>{const noise=(Math.random()-.5)*base*.12;return Math.max(base*.7,+(base+noise+(i===5?-base*.05:0)+(vi===0?-base*.02:0)).toFixed(2));});
  return{vendor:v,points:pts};
});

const PEPTIDES_DATA=[
  {id:1,name:"5-AMINO-1MQ",category:"Peptides",
   doses:["5mg","10mg","20mg","30mg","50mg","60mg","50mg Trio","50mg Half Kit","50mg Kit"],defaultDose:"5mg",
   vendors:[
     {id:1,name:"FelixChem",stock:"In Stock",price:31.49,origPrice:34.99,disc:10,ppm:6.30,coupon:"derek",couponDesc:"10% off",shipping:"2–4 days",payment:["Crypto","Wire"],tests:{pass:["Identification","Net Purity","Net Quantity"],fail:["Endotoxins","Sterility","Heavy Metals","Conformity"],labs:["Chromate","Freedom Diagnostics"],note:"Multiple labs — COA depends on batch."}},
     {id:2,name:"Ion Peptide",stock:"In Stock",price:31.50,origPrice:35.00,disc:10,ppm:6.30,coupon:"peptideprice",couponDesc:"10% off",shipping:"1–3 days",payment:["Card","Crypto","Venmo"],tests:{pass:["Identification","Net Purity","Net Quantity","Endotoxins","Sterility","Heavy Metals"],fail:["Conformity"],labs:["Chromate"],note:"Batch-tested on most products."}},
     {id:3,name:"AMC Essentials",stock:"In Stock",price:42.49,origPrice:49.99,disc:15,ppm:8.50,coupon:"peptideprice",couponDesc:"15% off",shipping:"3–5 days",payment:["Card"],tests:{pass:["Identification","Net Purity"],fail:["Net Quantity","Endotoxins","Sterility","Heavy Metals","Conformity"],labs:[],note:"Limited COA data available."}},
   ],
   bestValuePpm:6.30,bestValueVendor:"FelixChem",has30DayLow:true,
   history:makeHistory(33,["FelixChem","Ion Peptide","AMC Essentials"])},
  {id:2,name:"BPC-157",category:"Peptides",
   doses:["2mg","5mg","10mg"],defaultDose:"5mg",
   vendors:[
     {id:4,name:"PureRawz",stock:"In Stock",price:38.99,origPrice:54.99,disc:29,ppm:7.80,coupon:"RESEARCH15",couponDesc:"15% off",shipping:"2–3 days",payment:["Card","Crypto"],tests:{pass:["Identification","Net Purity","Net Quantity","Endotoxins"],fail:["Sterility","Heavy Metals","Conformity"],labs:["Janoshik"],note:"Standard 4-point panel."}},
     {id:5,name:"Peptide Sciences",stock:"In Stock",price:44.50,origPrice:null,disc:0,ppm:8.90,coupon:null,couponDesc:null,shipping:"1–2 days",payment:["Card","PayPal"],tests:{pass:["Identification","Net Purity","Net Quantity","Endotoxins","Sterility","Heavy Metals","Conformity"],fail:[],labs:["Janoshik","Core Labs"],note:"Full panel on every batch."}},
     {id:6,name:"Swisschems",stock:"Low Stock",price:49.00,origPrice:62.00,disc:21,ppm:9.80,coupon:"SWISS10",couponDesc:"10% off",shipping:"3–5 days",payment:["Card","Crypto","Wire"],tests:{pass:["Identification","Net Purity","Net Quantity"],fail:["Endotoxins","Sterility","Heavy Metals","Conformity"],labs:["Chromate"],note:""}},
   ],
   bestValuePpm:7.80,bestValueVendor:"PureRawz",has30DayLow:false,
   history:makeHistory(44,["PureRawz","Peptide Sciences","Swisschems"])},
  {id:3,name:"TB-500",category:"Peptides",
   doses:["2mg","5mg","10mg"],defaultDose:"5mg",
   vendors:[
     {id:7,name:"Limitless Life",stock:"In Stock",price:21.99,origPrice:null,disc:0,ppm:11.00,coupon:"LL20",couponDesc:"BOGO 50%",shipping:"3–5 days",payment:["Card","Venmo","Crypto"],tests:{pass:["Identification","Net Purity","Net Quantity"],fail:["Endotoxins","Sterility","Heavy Metals","Conformity"],labs:[],note:""}},
     {id:8,name:"Peptide Sciences",stock:"In Stock",price:58.00,origPrice:null,disc:0,ppm:11.60,coupon:null,couponDesc:null,shipping:"1–2 days",payment:["Card","PayPal"],tests:{pass:["Identification","Net Purity","Net Quantity","Endotoxins","Sterility","Heavy Metals","Conformity"],fail:[],labs:["Janoshik","Core Labs"],note:"Full panel."}},
   ],
   bestValuePpm:11.00,bestValueVendor:"Limitless Life",has30DayLow:true,
   history:makeHistory(40,["Limitless Life","Peptide Sciences"])},
  {id:4,name:"Ipamorelin",category:"Peptides",
   doses:["2mg","5mg"],defaultDose:"2mg",
   vendors:[
     {id:9,name:"PureRawz",stock:"In Stock",price:27.99,origPrice:34.99,disc:20,ppm:14.00,coupon:"RESEARCH15",couponDesc:"15% off",shipping:"2–3 days",payment:["Card","Crypto"],tests:{pass:["Identification","Net Purity","Net Quantity","Endotoxins"],fail:["Sterility","Heavy Metals","Conformity"],labs:["Janoshik"],note:""}},
     {id:10,name:"Swisschems",stock:"In Stock",price:29.00,origPrice:null,disc:0,ppm:14.50,coupon:"SWISS10",couponDesc:"10% off",shipping:"3–5 days",payment:["Card","Crypto","Wire"],tests:{pass:["Identification","Net Purity"],fail:["Net Quantity","Endotoxins","Sterility","Heavy Metals","Conformity"],labs:["Chromate"],note:""}},
   ],
   bestValuePpm:14.00,bestValueVendor:"PureRawz",has30DayLow:false,
   history:makeHistory(28,["PureRawz","Swisschems"])},
  {id:5,name:"Semax",category:"Nasal Sprays",
   doses:["30ml","60ml"],defaultDose:"30ml",
   vendors:[
     {id:12,name:"Cosmic Nootropic",stock:"In Stock",price:39.00,origPrice:null,disc:5,ppm:null,coupon:"COSMIC5",couponDesc:"5% off",shipping:"7–14 days",payment:["Card","Crypto"],tests:{pass:["Identification"],fail:["Net Purity","Net Quantity","Endotoxins","Sterility","Heavy Metals","Conformity"],labs:[],note:""}},
     {id:11,name:"Cosmos Peptides",stock:"Out of Stock",price:49.00,origPrice:null,disc:0,ppm:null,coupon:null,couponDesc:null,shipping:"5–7 days",payment:["Card"],tests:{pass:["Identification","Net Purity"],fail:["Net Quantity","Endotoxins","Sterility","Heavy Metals","Conformity"],labs:[],note:""}},
   ],
   bestValuePpm:null,bestValueVendor:"Cosmic Nootropic",has30DayLow:true,
   history:makeHistory(40,["Cosmic Nootropic","Cosmos Peptides"])},
];

const ADMIN_VENDORS=[
  {id:1,name:"PureRawz",website:"pureraws.com",email:"info@pureraws.com",status:"approved",applied:"2024-01-15",products:47,notes:""},
  {id:2,name:"Peptide Sciences",website:"peptidesciences.com",email:"contact@peptidesciences.com",status:"approved",applied:"2024-01-20",products:89,notes:""},
  {id:3,name:"Swisschems",website:"swisschems.is",email:"support@swisschems.is",status:"approved",applied:"2024-02-01",products:62,notes:""},
  {id:4,name:"Limitless Life",website:"limitlesslife.co",email:"admin@limitlesslife.co",status:"approved",applied:"2024-02-10",products:31,notes:""},
  {id:5,name:"FelixChem",website:"felixchem.com",email:"info@felixchem.com",status:"approved",applied:"2024-02-15",products:23,notes:""},
  {id:6,name:"Ion Peptide",website:"ionpeptide.com",email:"contact@ionpeptide.com",status:"approved",applied:"2024-02-18",products:41,notes:""},
  {id:7,name:"Cosmos Peptides",website:"cosmospeptides.com",email:"hello@cosmospeptides.com",status:"pending",applied:"2024-04-02",products:0,notes:""},
  {id:8,name:"RCD.bio",website:"rcd.bio",email:"sales@rcd.bio",status:"pending",applied:"2024-04-05",products:0,notes:""},
  {id:9,name:"Biotech Peptides",website:"biotechpeptides.com",email:"info@biotechpeptides.com",status:"rejected",applied:"2024-03-18",products:0,notes:"No COAs, complaints."},
];

const INIT_REVIEWS=[
  {id:1,vendor:"PureRawz",peptide:"BPC-157",author:"ResearcherJ",rating:5,text:"Consistently high quality, fast shipping, and the COAs match the label claims. Been ordering for 2 years.",tags:["Fast Shipping","Good QC"],date:"2024-03-15",status:"approved"},
  {id:2,vendor:"Peptide Sciences",peptide:"TB-500",author:"LabTech_M",rating:5,text:"Full 7/7 testing panel is a major differentiator. Product arrived well-packaged and on time. COAs are detailed.",tags:["Full Testing","Professional"],date:"2024-03-20",status:"approved"},
  {id:3,vendor:"Swisschems",peptide:"BPC-157",author:"AnonymousR",rating:3,text:"Price is competitive but COA only covers 3/7 standards. Customer service was responsive.",tags:["Competitive Price","Partial Testing"],date:"2024-04-01",status:"approved"},
  {id:4,vendor:"Limitless Life",peptide:"TB-500",author:"FieldResearch",rating:4,text:"Good value overall. Coupon code worked great. Packaging could be improved.",tags:["Good Value","Coupon"],date:"2024-04-05",status:"approved"},
];

// ── HELPERS ──────────────────────────────────────────────────────────────────
function useToast(){const[m,setM]=useState(null);const show=(s)=>{setM(s);setTimeout(()=>setM(null),2200);};return[m,show];}

function TestPopup({vendor,onClose}){
  const ref=useRef();
  useEffect(()=>{
    const h=(e)=>{if(ref.current&&!ref.current.contains(e.target))onClose();};
    document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);
  },[]);
  const score=vendor.tests.pass.length;
  return(
    <div className="test-popup" ref={ref} onClick={e=>e.stopPropagation()}>
      <div className="tp-hdr"><span>Testing: {score}/7</span><button onClick={onClose} style={{background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:13,fontFamily:"var(--fm)"}}>✕</button></div>
      {TEST_STANDARDS.map(s=>{const p=vendor.tests.pass.includes(s);return <div key={s} className={`tp-item ${p?"pass":"fail"}`}><span>{p?"✓":"✗"}</span><span>{s}</span></div>;})}
      {vendor.tests.labs.length>0&&<div className="tp-labs"><div className="tp-lab-t">Labs:</div>{vendor.tests.labs.map(l=><div key={l} style={{fontSize:10,color:"var(--accent)",fontFamily:"var(--fm)",marginBottom:2}}>• {l}</div>)}</div>}
      {vendor.tests.note&&<div className="tp-note">{vendor.tests.note}</div>}
    </div>
  );
}

// ── PRICE HISTORY MODAL ──────────────────────────────────────────────────────
function PriceHistoryModal({peptide,onClose}){
  const[activeTab,setActiveTab]=useState("chart");
  const[viewMode,setViewMode]=useState("total"); // total | perm
  const[withCodes,setWithCodes]=useState(false);
  const[activeDose,setActiveDose]=useState(peptide.defaultDose||peptide.doses?.[0]||"");
  const[activeVendors,setActiveVendors]=useState(()=>new Set(peptide.history.map(h=>h.vendor)));
  const[animated,setAnimated]=useState(false);

  useEffect(()=>{setTimeout(()=>setAnimated(true),80);},[]);

  const CHART_COLORS_VIVID=["#00d4ff","#00ff9d","#ffd166","#b388ff","#ff6b35","#ff4df5","#69ff47","#ffa07a","#00bfff","#ffec00"];
  const visibleHistory=peptide.history.filter(h=>activeVendors.has(h.vendor));
  const allPrices=visibleHistory.flatMap(h=>h.points);
  const minP=allPrices.length?Math.min(...allPrices)*.94:0;
  const maxP=allPrices.length?Math.max(...allPrices)*1.06:100;
  const lowestPrice=allPrices.length?Math.min(...allPrices):0;
  const highestPrice=allPrices.length?Math.max(...allPrices):0;
  const avgPrice=allPrices.length?(allPrices.reduce((a,b)=>a+b,0)/allPrices.length):0;

  const W=700,H=260,pad={t:20,r:20,b:36,l:52};
  const cW=W-pad.l-pad.r, cH=H-pad.t-pad.b;
  const xScale=(i)=>pad.l+(i/(MONTHS.length-1))*cW;
  const yScale=(v)=>pad.t+cH-(((v-minP)/(maxP-minP||1))*cH);
  const avgPoints=MONTHS.map((_,mi)=>{
    const vals=visibleHistory.map(h=>h.points[mi]).filter(Boolean);
    return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:0;
  });

  const toggleVendor=(v)=>setActiveVendors(prev=>{
    const n=new Set(prev);
    n.has(v)?n.delete(v):n.add(v);
    return n;
  });

  return(
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:"#0d1b2e",border:"1px solid rgba(255,255,255,0.1)",borderRadius:16,padding:"22px 24px",maxWidth:780,width:"100%",maxHeight:"88vh",overflowY:"auto",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"}}>

        {/* Header */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <span style={{color:"var(--teal)",fontSize:14}}>📈</span>
              <span style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:18,color:"#fff"}}>{peptide.name}</span>
            </div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",fontFamily:"var(--fm)"}}>{activeDose} · Price History · <span style={{color:"var(--teal)",cursor:"pointer"}} onClick={()=>setWithCodes(w=>!w)}>{withCodes?"With Codes ✓":"Show Codes"}</span></div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:16,width:32,height:32,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>

        {/* Tab bar */}
        <div style={{display:"flex",gap:4,marginBottom:16,flexWrap:"wrap"}}>
          {[["chart","📊 Chart"],["table","☰ Row Data"]].map(([k,l])=>(
            <button key={k} onClick={()=>setActiveTab(k)} style={{padding:"5px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"var(--fh)",background:activeTab===k?"var(--teal)":"rgba(255,255,255,0.07)",color:activeTab===k?"#fff":"rgba(255,255,255,0.55)",border:activeTab===k?"1px solid var(--teal)":"1px solid rgba(255,255,255,0.1)",transition:"all .12s"}}>{l}</button>
          ))}
          <button onClick={()=>setViewMode(v=>v==="total"?"perm":"total")} style={{padding:"5px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"var(--fh)",background:viewMode==="perm"?"rgba(250,169,104,0.2)":"rgba(255,255,255,0.07)",color:viewMode==="perm"?"var(--peach)":"rgba(255,255,255,0.55)",border:"1px solid rgba(255,255,255,0.1)"}}>💲{viewMode==="perm"?"Per mg":"Total"}</button>
          <button onClick={()=>setWithCodes(w=>!w)} style={{padding:"5px 14px",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"var(--fh)",background:withCodes?"rgba(0,212,255,0.15)":"rgba(255,255,255,0.07)",color:withCodes?"#00d4ff":"rgba(255,255,255,0.55)",border:"1px solid rgba(255,255,255,0.1)"}}>🏷 With Codes</button>
        </div>

        {/* Dose tabs */}
        {peptide.doses&&(
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:16}}>
            {peptide.doses.map(d=>(
              <button key={d} onClick={()=>setActiveDose(d)} style={{padding:"4px 12px",borderRadius:6,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"var(--fm)",background:activeDose===d?"var(--navy)":"rgba(255,255,255,0.06)",color:activeDose===d?"#fff":"rgba(255,255,255,0.5)",border:activeDose===d?"1px solid var(--teal)":"1px solid rgba(255,255,255,0.08)"}}>{d}</button>
            ))}
          </div>
        )}

        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
          {[["Lowest",`$${lowestPrice.toFixed(2)}`,`rgba(0,255,157,0.08)`,`rgba(0,255,157,0.3)`,"#00ff9d"],["Average",`$${avgPrice.toFixed(2)}`,`rgba(0,212,255,0.08)`,`rgba(0,212,255,0.3)`,"#00d4ff"],["Highest",`$${highestPrice.toFixed(2)}`,`rgba(255,100,100,0.08)`,`rgba(255,100,100,0.3)`,"#ff6464"],["Retailers",peptide.history.length,`rgba(255,255,255,0.05)`,`rgba(255,255,255,0.12)`,"rgba(255,255,255,0.7)"]].map(([label,val,bg,bdr,clr])=>(
            <div key={label} style={{background:bg,border:`1px solid ${bdr}`,borderRadius:10,padding:"10px 14px"}}>
              <div style={{fontSize:10,fontFamily:"var(--fm)",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:.8,marginBottom:4}}>{label}</div>
              <div style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:20,color:clr}}>{val}</div>
            </div>
          ))}
        </div>

        {activeTab==="chart"&&(
          <div style={{background:"rgba(0,0,0,0.2)",borderRadius:12,padding:"12px 8px 4px",marginBottom:12,border:"1px solid rgba(255,255,255,0.06)"}}>
            <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{overflow:"visible"}}>
              {/* Grid lines */}
              {[0,.25,.5,.75,1].map(t=>{
                const y=pad.t+t*cH;
                const val=(maxP-(t*(maxP-minP))).toFixed(0);
                return(
                  <g key={t}>
                    <line x1={pad.l} y1={y} x2={W-pad.r} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray={t===0||t===1?"0":"4 3"}/>
                    <text x={pad.l-6} y={y+4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="JetBrains Mono,monospace">${val}</text>
                  </g>
                );
              })}
              {/* Month labels */}
              {MONTHS.map((m,i)=>(
                <text key={m} x={xScale(i)} y={H-6} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="JetBrains Mono,monospace">{m}</text>
              ))}
              {/* Average dashed line */}
              <polyline points={avgPoints.map((p,i)=>`${xScale(i)},${yScale(p)}`).join(" ")} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="6 3"/>

              {/* Vendor lines — animated */}
              {visibleHistory.map((h,vi)=>{
                const col=CHART_COLORS_VIVID[vi%CHART_COLORS_VIVID.length];
                const pts=h.points.map((p,i)=>`${xScale(i)},${yScale(p)}`).join(" ");
                const totalLen=h.points.reduce((acc,_,i)=>i===0?0:acc+Math.sqrt(Math.pow(xScale(i)-xScale(i-1),2)+Math.pow(yScale(h.points[i])-yScale(h.points[i-1]),2)),0)*1.2+200;
                return(
                  <g key={vi}>
                    <polyline points={pts} fill="none" stroke={col} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
                      style={{strokeDasharray:totalLen,strokeDashoffset:animated?0:totalLen,transition:`stroke-dashoffset ${0.8+vi*0.15}s cubic-bezier(.4,0,.2,1)`}}/>
                    {h.points.map((p,i)=>(
                      <circle key={i} cx={xScale(i)} cy={yScale(p)} r="3.5" fill={col} stroke="#0d1b2e" strokeWidth="2"
                        style={{opacity:animated?1:0,transition:`opacity .3s ${0.8+vi*0.15}s`}}/>
                    ))}
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        {activeTab==="table"&&(
          <div style={{background:"rgba(0,0,0,0.2)",borderRadius:12,overflow:"hidden",marginBottom:12,border:"1px solid rgba(255,255,255,0.06)"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr style={{background:"rgba(255,255,255,0.04)"}}>
                  <th style={{fontFamily:"var(--fm)",fontSize:10,color:"rgba(255,255,255,0.4)",padding:"8px 12px",textAlign:"left",textTransform:"uppercase",letterSpacing:.8}}>Vendor</th>
                  {MONTHS.map(m=><th key={m} style={{fontFamily:"var(--fm)",fontSize:10,color:"rgba(255,255,255,0.4)",padding:"8px 8px",textAlign:"center",textTransform:"uppercase",letterSpacing:.8}}>{m}</th>)}
                  <th style={{fontFamily:"var(--fm)",fontSize:10,color:"rgba(255,255,255,0.4)",padding:"8px 12px",textAlign:"right",textTransform:"uppercase",letterSpacing:.8}}>Avg</th>
                  <th style={{fontFamily:"var(--fm)",fontSize:10,color:"rgba(255,255,255,0.4)",padding:"8px 12px",textAlign:"right",textTransform:"uppercase",letterSpacing:.8}}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {peptide.history.map((h,vi)=>{
                  const first=h.points[0],last=h.points[h.points.length-1];
                  const chg=((last-first)/first*100).toFixed(1);
                  const avg=(h.points.reduce((a,b)=>a+b,0)/h.points.length).toFixed(2);
                  const col=CHART_COLORS_VIVID[vi%CHART_COLORS_VIVID.length];
                  return(
                    <tr key={vi} style={{borderTop:"1px solid rgba(255,255,255,0.05)"}}>
                      <td style={{padding:"8px 12px",display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:10,height:10,borderRadius:"50%",background:col,flexShrink:0}}/>
                        <span style={{fontFamily:"var(--fh)",fontWeight:700,fontSize:12,color:"#fff"}}>{h.vendor}</span>
                      </td>
                      {h.points.map((p,i)=><td key={i} style={{fontFamily:"var(--fm)",fontSize:11,padding:"8px 8px",textAlign:"center",color:"rgba(255,255,255,0.65)"}}>${p.toFixed(2)}</td>)}
                      <td style={{fontFamily:"var(--fm)",fontSize:11,padding:"8px 12px",textAlign:"right",color:"rgba(255,255,255,0.5)"}}>${avg}</td>
                      <td style={{fontFamily:"var(--fm)",fontSize:11,padding:"8px 12px",textAlign:"right",fontWeight:700,color:parseFloat(chg)<0?"#00ff9d":"#ff6464"}}>{chg>0?"+":""}{chg}%</td>
                    </tr>
                  );
                })}
                <tr style={{borderTop:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.02)"}}>
                  <td style={{padding:"8px 12px",fontFamily:"var(--fm)",fontSize:11,color:"rgba(255,255,255,0.35)",fontStyle:"italic"}}>Average</td>
                  {avgPoints.map((p,i)=><td key={i} style={{fontFamily:"var(--fm)",fontSize:11,padding:"8px 8px",textAlign:"center",color:"rgba(255,255,255,0.35)"}}>${p.toFixed(2)}</td>)}
                  <td style={{fontFamily:"var(--fm)",fontSize:11,padding:"8px 12px",textAlign:"right",color:"rgba(255,255,255,0.35)"}}>${(avgPoints.reduce((a,b)=>a+b,0)/avgPoints.length).toFixed(2)}</td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Vendor toggle chips */}
        <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
          <button onClick={()=>setActiveVendors(activeVendors.size===peptide.history.length?new Set():new Set(peptide.history.map(h=>h.vendor)))}
            style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"var(--fh)",background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.6)",border:"1px solid rgba(255,255,255,0.12)"}}>
            {activeVendors.size===peptide.history.length?"Deselect All":"Select All"}
          </button>
          <div style={{width:1,height:16,background:"rgba(255,255,255,0.1)"}}/>
          {peptide.history.map((h,vi)=>{
            const col=CHART_COLORS_VIVID[vi%CHART_COLORS_VIVID.length];
            const on=activeVendors.has(h.vendor);
            return(
              <button key={vi} onClick={()=>toggleVendor(h.vendor)}
                style={{padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"var(--fh)",display:"flex",alignItems:"center",gap:5,background:on?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.2)",color:on?"rgba(255,255,255,0.8)":"rgba(255,255,255,0.25)",border:`1px solid ${on?col:"rgba(255,255,255,0.06)"}`,transition:"all .12s"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:on?col:"rgba(255,255,255,0.2)"}}/>
                {h.vendor}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── ALERT MODAL ──────────────────────────────────────────────────────────────
function AlertModal({peptide,onClose}){
  const[email,setEmail]=useState("");
  const[sent,setSent]=useState(false);
  const submit=()=>{if(!email||!email.includes("@")){alert("Please enter a valid email.");return;}setSent(true);};
  return(
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="alert-modal">
        {!sent?(
          <>
            <div className="am-title">🔔 30-Day Low Price Alert</div>
            <div className="am-sub">Get notified when <strong>{peptide?.name||"any peptide"}</strong> hits a 30-day low price. We'll send one email — no spam.</div>
            <input className="am-input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" type="email"/>
            <div className="am-note">One email per alert. Unsubscribe any time.<br/>We never share your email with vendors.</div>
            <div style={{display:"flex",gap:8,marginTop:14,justifyContent:"flex-end"}}>
              <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
              <button className="btn btn-cyan btn-sm" onClick={submit}>Set Alert</button>
            </div>
          </>
        ):(
          <div style={{textAlign:"center",padding:"10px 0"}}>
            <div style={{fontSize:36,marginBottom:10}}>✅</div>
            <div style={{fontFamily:"var(--fm)",fontWeight:700,fontSize:14,marginBottom:6}}>Alert set!</div>
            <div style={{fontSize:12,color:"var(--muted3)",marginBottom:14}}>We'll email {email} when {peptide?.name} hits a 30-day low.</div>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── VENDOR LOGO ───────────────────────────────────────────────────────────────
function VendorLogo({name,size=36}){
  const info=VENDORS_INFO.find(v=>v.name===name);
  const bg=info?.logoBg||"#1a2535";
  const fg=info?.logoFg||"#fff";
  const initials=info?.initials||(name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase());
  return(
    <div className="vlogo" style={{width:size,height:size,minWidth:size}}>
      <div className="vlogo-fallback" style={{background:bg,color:fg,fontSize:size*0.35}}>
        {initials}
      </div>
    </div>
  );
}

// ── VENDOR CELL ──────────────────────────────────────────────────────────────
function VendorCell({v,rank,onAddCart,showToast,isGridView,peptideName}){
  const[tOpen,setTOpen]=useState(false);
  const score=v.tests.pass.length;
  const tc=score>=6?"tb-hi":score>=3?"tb-md":"tb-lo";
  const copy=(c)=>{navigator.clipboard?.writeText(c);showToast("Copied: "+c);};
  const stockCls=v.stock==="In Stock"?"ok":v.stock==="Low Stock"?"lw":"bd";

  const inner=(
    <div className="vr-row">
      {/* Rank badge */}
      <div style={{position:"absolute",top:10,left:8,zIndex:1}}>
        <span className={`vr-rank${rank===1?" gold":""}`}>#{rank}</span>
      </div>

      <div className="vr-row-left" style={{paddingLeft:28}}>
        {/* Logo */}
        <VendorLogo name={v.name} size={38}/>

        {/* Info */}
        <div className="vr-row-info">
          <div className="vr-row-name">
            <span>{v.name}</span>
            <span style={{position:"relative"}}>
              <button className={`test-badge ${tc}`} onClick={e=>{e.stopPropagation();setTOpen(o=>!o);}}>
                {score}/7 {tOpen?"▲":"▼"}
              </button>
              {tOpen&&<div style={{position:"absolute",top:"calc(100% + 4px)",left:0,zIndex:350}}><TestPopup vendor={v} onClose={()=>setTOpen(false)}/></div>}
            </span>
          </div>
          <div className="vr-row-sub">
            <span className={`vm ${stockCls}`}>{v.stock}</span>
            <span className="vm">·</span>
            <span className="vm">{v.shipping}</span>
          </div>
          {v.coupon&&(
            <div className="vr-coupon" style={{marginTop:6,marginBottom:0,width:"auto",display:"inline-flex"}}
              onClick={e=>{e.stopPropagation();copy(v.coupon);}}>
              ◇ {v.coupon}
              <span style={{opacity:.5,fontSize:9}}>— {v.couponDesc} · copy</span>
            </div>
          )}
        </div>
      </div>

      {/* Price + actions */}
      <div className="vr-row-right">
        <div className="vr-row-price-top">
          {v.origPrice&&<span className="pb-orig">${v.origPrice.toFixed(2)}</span>}
          {v.disc>0&&<span className="pb-pct">-{v.disc}%</span>}
        </div>
        <div className="vr-big-price">${v.price.toFixed(2)}</div>
        {v.ppm&&<div style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--muted2)"}}>${v.ppm.toFixed(2)}/mg</div>}
        <div style={{display:"flex",gap:5,marginTop:4}}>
          <button className="btn btn-ghost btn-xs" style={{padding:"4px 8px"}}
            onClick={e=>{e.stopPropagation();onAddCart(v);showToast(v.name+" added");}}>+</button>
          <button className="btn btn-cyan btn-xs" style={{padding:"4px 10px"}}
            onClick={e=>{e.stopPropagation();alert("Visiting "+v.name);}}>🛒 Shop</button>
        </div>
      </div>
    </div>
  );

  if(isGridView) return inner;
  return inner;
}

// ── GRID VENDOR ROW ───────────────────────────────────────────────────────────
function GridVendorRow({v,rank,onAddCart,showToast}){
  const[tOpen,setTOpen]=useState(false);
  const score=v.tests.pass.length;
  const tc=score>=6?"tb-hi":score>=3?"tb-md":"tb-lo";
  const stockCls=v.stock==="In Stock"?"ok":v.stock==="Low Stock"?"lw":"bd";
  const copy=(c)=>{navigator.clipboard?.writeText(c);showToast("Copied: "+c);};
  return(
    <div className="vr-row" style={{padding:"11px 14px"}}>
      <div style={{position:"absolute",top:9,left:8}}><span className={`vr-rank${rank===1?" gold":""}`}>#{rank}</span></div>
      <div className="vr-row-left" style={{paddingLeft:28}}>
        <VendorLogo name={v.name} size={34}/>
        <div className="vr-row-info">
          <div className="vr-row-name" style={{fontSize:12}}>
            <span>{v.name}</span>
            <span style={{position:"relative"}}>
              <button className={`test-badge ${tc}`} onClick={e=>{e.stopPropagation();setTOpen(o=>!o);}}>
                {score}/7 {tOpen?"▲":"▼"}
              </button>
              {tOpen&&<div style={{position:"absolute",top:"calc(100% + 4px)",left:0,zIndex:350}}><TestPopup vendor={v} onClose={()=>setTOpen(false)}/></div>}
            </span>
          </div>
          <div className="vr-row-sub">
            <span className={`vm ${stockCls}`}>{v.stock}</span>
            <span className="vm">·</span>
            <span className="vm">{v.shipping}</span>
          </div>
          {v.coupon&&<div className="vr-coupon" style={{marginTop:5,marginBottom:0,width:"auto",display:"inline-flex"}} onClick={()=>copy(v.coupon)}>◇ {v.coupon} <span style={{opacity:.5,fontSize:9}}>· copy</span></div>}
        </div>
      </div>
      <div className="vr-row-right">
        <div className="vr-row-price-top">
          {v.origPrice&&<span className="pb-orig">${v.origPrice.toFixed(2)}</span>}
          {v.disc>0&&<span className="pb-pct">-{v.disc}%</span>}
        </div>
        <div className="vr-big-price" style={{fontSize:18}}>${v.price.toFixed(2)}</div>
        {v.ppm&&<div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--muted2)"}}>${v.ppm.toFixed(2)}/mg</div>}
        <div style={{display:"flex",gap:4,marginTop:4}}>
          <button className="btn btn-ghost btn-xs" style={{padding:"3px 7px"}} onClick={()=>{onAddCart(v);showToast(v.name+" added");}}>+</button>
          <button className="btn btn-cyan btn-xs" onClick={()=>alert("Visiting "+v.name)}>🛒 Shop</button>
        </div>
      </div>
    </div>
  );
}

// ── PEPTIDE GROUP (list view) ─────────────────────────────────────────────────
function PeptideGroup({p,onAddCart,showToast,isGridView}){
  const[open,setOpen]=useState(true);
  const[dose,setDose]=useState(p.defaultDose);
  const[showHistory,setShowHistory]=useState(false);
  const[showAlert,setShowAlert]=useState(false);
  const sorted=[...p.vendors].sort((a,b)=>a.price-b.price);

  if(isGridView){
    return(
      <>
        {showHistory&&<PriceHistoryModal peptide={p} onClose={()=>setShowHistory(false)}/>}
        {showAlert&&<AlertModal peptide={p} onClose={()=>setShowAlert(false)}/>}
        <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"var(--r)",overflow:"hidden",display:"flex",flexDirection:"column"}}>
          {/* Card header: name + action icons */}
          <div style={{padding:"12px 14px 8px",borderBottom:"1px solid var(--border)"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,gap:6}}>
              <div style={{fontFamily:"var(--fm)",fontWeight:700,fontSize:15,letterSpacing:"-.3px"}}>{p.name}</div>
              <div style={{display:"flex",gap:6,flexShrink:0}}>
                <button onClick={()=>setShowHistory(true)} style={{background:"none",border:"none",cursor:"pointer",color:"var(--muted3)",fontSize:13,padding:2,transition:"color .12s"}} title="Price history">📈</button>
                <button onClick={()=>setShowAlert(true)} style={{background:"none",border:"none",cursor:"pointer",color:"var(--muted3)",fontSize:13,padding:2,transition:"color .12s"}} title="Price alert">🔔</button>
              </div>
            </div>
            {/* Dose tabs */}
            <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
              {p.doses.map(d=>{
                const isBest=d===p.doses[0]&&p.bestValuePpm;
                return(
                  <button key={d} className={`dtab${dose===d?" on":""}`} onClick={()=>setDose(d)} style={{position:"relative",paddingRight:isBest?26:undefined}}>
                    {d.replace("★","")}
                    {isBest&&<span style={{position:"absolute",top:-4,right:-4,background:"var(--teal)",color:"#fff",fontSize:8,fontFamily:"var(--fm)",fontWeight:700,padding:"1px 4px",borderRadius:4,letterSpacing:.3,lineHeight:1.4}}>BEST</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vendor rows */}
          <div style={{flex:1}}>
            {sorted.map((v,i)=>(
              <GridVendorRow key={v.id} v={v} rank={i+1} onAddCart={onAddCart} showToast={showToast}/>
            ))}
          </div>

          {/* Best Value bar */}
          <div className="bv-bar">
            <span style={{fontSize:12}}>🏆</span>
            <span className="bv-lbl">Best Value Overall:</span>
            <span className="bv-val">{p.bestValuePpm?`$${p.bestValuePpm.toFixed(2)}/mg`:"—"}</span>
            <span style={{fontSize:9,color:"var(--muted3)",fontFamily:"var(--fm)"}}>{dose}</span>
            <button className="btn btn-ghost btn-xs" style={{marginLeft:"auto",borderColor:"rgba(0,255,157,0.3)",color:"var(--good)"}}>View</button>
          </div>
          {p.has30DayLow&&(
            <div className="low-bar" onClick={()=>setShowAlert(true)}>
              <span style={{fontSize:12}}>🔔</span>
              <span className="low-bar-txt">30-Day Low Alert</span>
              <span style={{marginLeft:"auto",fontSize:10,color:"var(--accent)",fontFamily:"var(--fm)"}}>Set →</span>
            </div>
          )}
        </div>
      </>
    );
  }

  return(
    <>
      {showHistory&&<PriceHistoryModal peptide={p} onClose={()=>setShowHistory(false)}/>}
      {showAlert&&<AlertModal peptide={p} onClose={()=>setShowAlert(false)}/>}
      <div className="pg">
        <div className="pg-hdr" onClick={()=>setOpen(o=>!o)}>
          <div className="pg-name">{p.name}</div>
          <div className="pg-doses" onClick={e=>e.stopPropagation()}>
            {p.doses.map(d=>{
              const isBest=d===p.doses[0]&&p.bestValuePpm;
              return(
                <button key={d} className={`dtab${dose===d?" on":""}`} onClick={()=>setDose(d)} style={{position:"relative",paddingRight:isBest?26:undefined}}>
                  {d.replace("★","")}
                  {isBest&&<span style={{position:"absolute",top:-4,right:-4,background:"var(--teal)",color:"#fff",fontSize:8,fontFamily:"var(--fm)",fontWeight:700,padding:"1px 4px",borderRadius:4,letterSpacing:.3,lineHeight:1.4}}>BEST</span>}
                </button>
              );
            })}
          </div>
          <button className="btn btn-ghost btn-xs" style={{marginLeft:4}} onClick={e=>{e.stopPropagation();setShowHistory(true);}}>📈 History</button>
          <div className="pg-chev">{open?"▲":"▼"}</div>
        </div>
        {open&&(
          <>
            <div className="vr-grid">
              {sorted.map((v,i)=><VendorCell key={v.id} v={v} rank={i+1} onAddCart={(vd)=>onAddCart(p,vd,dose)} showToast={showToast} isGridView={false}/>)}
            </div>
            <div className="bv-bar">
              <span>🏆</span>
              <span className="bv-lbl">Best Value Overall:</span>
              <span className="bv-val">{p.bestValuePpm?`$${p.bestValuePpm.toFixed(2)}/mg`:"—"}</span>
              <span style={{fontSize:10,color:"var(--muted3)",fontFamily:"var(--fm)"}}>{dose}</span>
              <button className="btn btn-ghost btn-xs" style={{marginLeft:"auto",borderColor:"rgba(0,255,157,0.3)",color:"var(--good)"}}>View</button>
            </div>
            {p.has30DayLow&&(
              <div className="low-bar" onClick={()=>setShowAlert(true)}>
                <span style={{fontSize:13}}>🔔</span>
                <span className="low-bar-txt">Get 30-Day Low Price Alerts — click to set up</span>
                <span style={{marginLeft:"auto",fontSize:10,color:"var(--accent)",fontFamily:"var(--fm)"}}>Set Alert →</span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

// ── CALCULATOR ────────────────────────────────────────────────────────────────
function Calculator(){
  const[tab,setTab]=useState("stupid");
  const[pType,setPType]=useState("single");
  const[vAmt,setVAmt]=useState("");const[vUnit,setVUnit]=useState("mg");
  const[dAmt,setDAmt]=useState("");const[dUnit,setDUnit]=useState("mcg");
  const[bac,setBac]=useState("");const[syr,setSyr]=useState("1");
  const[pName,setPName]=useState("");
  const[qConc,setQConc]=useState("");const[qDose,setQDose]=useState("");const[qUnit,setQUnit]=useState("mcg");
  const vMcg=vUnit==="mg"?parseFloat(vAmt)*1000:parseFloat(vAmt);
  const dMcg=dUnit==="mg"?parseFloat(dAmt)*1000:parseFloat(dAmt);
  const inj=vMcg/dMcg;
  const conc=(parseFloat(vAmt)*(vUnit==="mcg"?.001:1))/parseFloat(bac);
  const ml=parseFloat(bac)/inj;
  const su={"0.3":30,"0.5":50,"1":100,"3":300};
  const uInj=isFinite(inj)?Math.round((su[syr]||100)/inj):0;
  const qr=qConc&&qDose?((parseFloat(qDose)*(qUnit==="mg"?1000:1))/parseFloat(qConc)/10).toFixed(2):"—";
  const ok=(v)=>!isNaN(v)&&isFinite(v);
  const R=({label,val,unit,c})=><div><div className="cr-lbl">{label}</div><div className="cr-val" style={{color:c||"var(--accent)"}}>{val}</div><div className="cr-unit">{unit}</div></div>;
  return(
    <div>
      <div className="calc-tabs">
        {[["stupid","Simple"],["single","Single Peptide"],["blend","Peptide Blend"],["quick","Quick Solve"]].map(([k,l])=>(
          <button key={k} className={`ctab${tab===k?" on":""}`} onClick={()=>setTab(k)}>{l}</button>
        ))}
      </div>
      {tab==="stupid"&&(
        <div className="calc-card">
          <div style={{textAlign:"center",marginBottom:18}}>
            <div style={{fontSize:38,marginBottom:7}}>💉</div>
            <div style={{fontFamily:"var(--fm)",fontWeight:700,fontSize:15,marginBottom:3}}>What peptide do you have?</div>
            <div style={{fontSize:12,color:"var(--muted3)"}}>Check the label or COA for net content.</div>
          </div>
          <div className="type-toggle">
            <button className={`tt-btn${pType==="single"?" on":""}`} onClick={()=>setPType("single")}>⚗ Single Peptide</button>
            <button className={`tt-btn${pType==="blend"?" on":""}`} onClick={()=>setPType("blend")}>🧪 Blend</button>
          </div>
          <div className="fg"><label className="flabel">Peptide name (optional)</label><input className="fi" value={pName} onChange={e=>setPName(e.target.value)} placeholder="e.g. BPC-157"/></div>
          <div className="fg"><label className="flabel">How much is in the vial? *</label>
            <div className="fl"><input className="fi" style={{flex:2}} value={vAmt} onChange={e=>setVAmt(e.target.value)} placeholder="e.g. 5" type="number"/>
            <div className="ut" style={{flex:1}}>{["mg","mcg","IU"].map(u=><button key={u} className={`ut-btn${vUnit===u?" on":""}`} onClick={()=>setVUnit(u)}>{u}</button>)}</div></div>
          </div>
          <div className="fg"><label className="flabel">BAC water to add (mL)</label><input className="fi" value={bac} onChange={e=>setBac(e.target.value)} placeholder="e.g. 2" type="number"/></div>
          <div className="fg"><label className="flabel">Your dose</label>
            <div className="fl"><input className="fi" style={{flex:2}} value={dAmt} onChange={e=>setDAmt(e.target.value)} placeholder="e.g. 250" type="number"/>
            <div className="ut" style={{flex:1}}>{["mcg","mg","IU"].map(u=><button key={u} className={`ut-btn${dUnit===u?" on":""}`} onClick={()=>setDUnit(u)}>{u}</button>)}</div></div>
          </div>
          {vAmt&&bac&&dAmt&&<div className="calc-res"><div className="cr-grid"><R label="Concentration" val={ok(conc)?conc.toFixed(2):"—"} unit="mg/mL" c="var(--accent)"/><R label="Injections/vial" val={ok(inj)?Math.floor(inj):"—"} unit="doses" c="var(--good)"/><R label="Volume/dose" val={ok(ml)?ml.toFixed(3):"—"} unit="mL" c="var(--accent-p)"/></div><div className="res-warn" style={{textAlign:"center",marginTop:8}}>FOR RESEARCH PURPOSES ONLY</div></div>}
          <div className="calc-note" style={{marginTop:11}}><div className="calc-note-t">Standard syringe volumes:</div><ul><li>3.0 mL = 300 units</li><li>1.0 mL = 100 units</li><li>0.5 mL = 50 units</li><li>0.3 mL = 30 units</li></ul><div className="res-warn">For research purposes only.</div></div>
        </div>
      )}
      {tab==="single"&&(
        <div className="calc-card">
          <div className="fg"><div className="cs-title">Peptide Name</div><input className="fi" value={pName} onChange={e=>setPName(e.target.value)} placeholder="e.g., BPC-157, GHK-Cu"/></div>
          <div className="fg"><div className="cs-title">Vial Contents</div>
            <select className="fsel" style={{marginBottom:7}}><option>Powder — total in vial (reconstitute)</option><option>Premixed liquid — concentration × volume</option></select>
            <div className="fl"><input className="fi" style={{flex:2}} value={vAmt} onChange={e=>setVAmt(e.target.value)} placeholder="e.g., 5000" type="number"/><div className="ut" style={{flex:1}}>{["mg","mcg","IU"].map(u=><button key={u} className={`ut-btn${vUnit===u?" on":""}`} onClick={()=>setVUnit(u)}>{u}</button>)}</div></div>
          </div>
          <div className="fg"><div className="cs-title">Desired Dose per Administration</div>
            <div className="fl"><input className="fi" style={{flex:2}} value={dAmt} onChange={e=>setDAmt(e.target.value)} placeholder="e.g., 250" type="number"/><div className="ut" style={{flex:1}}>{["mcg","mg","IU"].map(u=><button key={u} className={`ut-btn${dUnit===u?" on":""}`} onClick={()=>setDUnit(u)}>{u}</button>)}</div></div>
          </div>
          <div className="fg"><div className="cs-title">Bacteriostatic Water (mL)</div><input className="fi" value={bac} onChange={e=>setBac(e.target.value)} placeholder="e.g., 2" type="number"/></div>
          <div className="fg"><div className="cs-title">Syringe Size</div>
            <div className="syr-btns">{[["0.3","30u"],["0.5","50u"],["1","100u"],["3","300u"]].map(([v,u])=>(
              <button key={v} className={`syr-btn${syr===v?" on":""}`} onClick={()=>setSyr(v)}><div className="syr-main">{v} mL</div><div className="syr-sub">{u}</div></button>
            ))}</div>
          </div>
          {vAmt&&bac&&dAmt&&<div className="calc-res"><div className="cr-grid"><R label="Concentration" val={ok(conc)?conc.toFixed(2):"—"} unit="mg/mL" c="var(--accent)"/><R label="Injections/vial" val={ok(inj)?Math.floor(inj):"—"} unit="doses" c="var(--good)"/><R label="Volume/dose" val={ok(ml)?ml.toFixed(3):"—"} unit="mL" c="var(--accent-p)"/><R label="Units/dose" val={ok(uInj)?uInj:"—"} unit={`units (${syr}mL)`} c="var(--warn)"/></div><div className="res-warn" style={{textAlign:"center",marginTop:8}}>FOR RESEARCH PURPOSES ONLY</div></div>}
        </div>
      )}
      {tab==="blend"&&(
        <div className="calc-card">
          <div style={{fontSize:12,color:"var(--muted3)",marginBottom:14}}>For peptide blends, enter each component. BAC water applies to the entire vial.</div>
          {[1,2,3].map(i=>(
            <div key={i} style={{background:"var(--bg3)",borderRadius:"var(--r2)",padding:12,marginBottom:9,border:"1px solid var(--border)"}}>
              <div style={{fontSize:9,color:"var(--accent)",fontFamily:"var(--fm)",textTransform:"uppercase",letterSpacing:1,marginBottom:7}}>Component {i}</div>
              <div className="fl"><div style={{flex:2}}><label className="flabel">Peptide</label><input className="fi" placeholder="BPC-157"/></div><div style={{flex:1}}><label className="flabel">Amount</label><input className="fi" placeholder="5" type="number"/></div><div style={{flex:1}}><label className="flabel">Unit</label><select className="fsel"><option>mg</option><option>mcg</option><option>IU</option></select></div></div>
            </div>
          ))}
          <div className="fg"><label className="flabel">Total BAC water (mL)</label><input className="fi" placeholder="e.g. 3" type="number"/></div>
          <div className="calc-note"><div className="res-warn">For research purposes only.</div></div>
        </div>
      )}
      {tab==="quick"&&(
        <div className="calc-card">
          <div style={{fontSize:12,color:"var(--muted3)",marginBottom:14}}>Already reconstituted? Enter concentration and dose to get your exact draw volume.</div>
          <div className="fg"><label className="flabel">Concentration (mcg/mL)</label><input className="fi" value={qConc} onChange={e=>setQConc(e.target.value)} placeholder="e.g. 2500" type="number"/></div>
          <div className="fg"><label className="flabel">Desired dose</label>
            <div className="fl"><input className="fi" style={{flex:2}} value={qDose} onChange={e=>setQDose(e.target.value)} placeholder="e.g. 250" type="number"/><div className="ut" style={{flex:1}}>{["mcg","mg"].map(u=><button key={u} className={`ut-btn${qUnit===u?" on":""}`} onClick={()=>setQUnit(u)}>{u}</button>)}</div></div>
          </div>
          <div className="calc-res">
            <div className="cr-lbl">Draw volume</div>
            <div style={{fontFamily:"var(--fm)",fontWeight:700,fontSize:34,color:"var(--accent)",marginTop:4}}>{qr} <span style={{fontSize:14,color:"var(--muted3)",fontWeight:400}}>mL</span></div>
            {qr!=="—"&&<div style={{fontSize:11,color:"var(--muted3)",marginTop:4,fontFamily:"var(--fm)"}}>≈ {(parseFloat(qr)*100).toFixed(0)} units on a 1mL syringe</div>}
          </div>
          <div className="res-warn" style={{marginTop:10}}>FOR RESEARCH PURPOSES ONLY</div>
        </div>
      )}
    </div>
  );
}

// ── VENDOR INFO PAGE ──────────────────────────────────────────────────────────
function VendorInfoPage({vendors}){
  const list=vendors||VENDORS_INFO;
  return(
    <div>
      <div className="page-title">Retailer Information</div>
      <div className="page-sub">Detailed information about our trusted peptide retailers, including shipping, payment methods, and company details.</div>
      <div className="vi-grid">
        {list.map((v,i)=>(
          <div key={v.id} className="vi-card">
            <div className={`vi-hdr ${v.grad}`}>
              <div className="vi-logo">{["⚗","🧬","🔬","💊","⚗","🧪"][i%6]}</div>
              <div><div className="vi-hdr-name">{v.name}</div><div className="vi-hdr-cat">{v.cat}</div></div>
            </div>
            <div className="vi-body">
              <div className="vi-desc">{v.desc}</div>
              <div className="vi-row"><span className="vi-row-lbl">📦 Shipping</span><span className="vi-row-val">{v.shipping} <span style={{color:"var(--good)",fontSize:10}}>(Free ${v.freeAt}+)</span></span></div>
              <div className="vi-row"><span className="vi-row-lbl">✔ Testing</span><span className={`vi-row-val ${parseInt(v.testing)>=6?"g":parseInt(v.testing)>=3?"o":"bd"}`}>{v.testing}</span></div>
              <div className="vi-row"><span className="vi-row-lbl">📦 Products</span><span className="vi-row-val b">{v.products}</span></div>
              <div className="vi-row"><span className="vi-row-lbl">💳 Payment</span><span style={{display:"flex",gap:3,flexWrap:"wrap",justifyContent:"flex-end"}}>{v.payment.map(p=><span key={p} className={`pay-chip ${PAY_CLASS[p]||""}`}>{p}</span>)}</span></div>
            </div>
            <div className="vi-link" onClick={()=>alert("Opening "+v.website)}>View Full Details ↗</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── REVIEWS ───────────────────────────────────────────────────────────────────
function ReviewsPage(){
  const[reviews,setReviews]=useState(INIT_REVIEWS);
  const[filterV,setFilterV]=useState("All");
  const[hoverStar,setHoverStar]=useState(0);
  const[form,setForm]=useState({vendor:"",peptide:"",author:"",rating:0,text:"",tags:""});
  const sf=(k,v)=>setForm(p=>({...p,[k]:v}));
  const submit=()=>{
    if(!form.vendor||!form.rating||!form.text){alert("Please fill in vendor, rating, and review text.");return;}
    setReviews(r=>[{id:Date.now(),vendor:form.vendor,peptide:form.peptide,author:form.author||"Anonymous",rating:form.rating,text:form.text,tags:form.tags?form.tags.split(",").map(t=>t.trim()).filter(Boolean):[],date:new Date().toISOString().split("T")[0],status:"pending"},...r]);
    setForm({vendor:"",peptide:"",author:"",rating:0,text:"",tags:""});
    alert("Submitted for review! Will appear after moderation.");
  };
  const approve=(id)=>setReviews(r=>r.map(x=>x.id===id?{...x,status:"approved"}:x));
  const reject=(id)=>setReviews(r=>r.filter(x=>x.id!==id));
  const approved=reviews.filter(r=>r.status==="approved");
  const visible=filterV==="All"?approved:approved.filter(r=>r.vendor===filterV);
  const avg=approved.length?approved.reduce((s,r)=>s+r.rating,0)/approved.length:0;
  const vendors=["All",...new Set(approved.map(r=>r.vendor))];
  return(
    <div>
      <div className="page-title">Vendor Reviews</div>
      <div className="page-sub">Community reviews — moderated before publishing.</div>
      <div className="rev-layout">
        <div>
          <div className="rev-summary">
            <div style={{display:"flex",gap:18,alignItems:"flex-start",marginBottom:12}}>
              <div><div className="rev-score">{avg.toFixed(1)}</div><div style={{fontSize:18,color:"var(--warn)",margin:"5px 0 3px"}}>{[...Array(5)].map((_,i)=><span key={i}>{i<Math.round(avg)?"★":"☆"}</span>)}</div><div style={{fontSize:11,color:"var(--muted3)",fontFamily:"var(--fm)"}}>{approved.length} reviews</div></div>
              <div style={{flex:1}}>{[5,4,3,2,1].map(n=>{const cnt=approved.filter(r=>r.rating===n).length;return(<div key={n} className="rev-bar-row"><span className="rev-bar-lbl">{n}</span><div className="rev-bar-track"><div className="rev-bar-fill" style={{width:`${approved.length?(cnt/approved.length)*100:0}%`}}/></div><span className="rev-bar-n">{cnt}</span></div>);})}</div>
            </div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{vendors.map(v=><button key={v} className={`fchip${filterV===v?" on":""}`} onClick={()=>setFilterV(v)}>{v}</button>)}</div>
          </div>
          {visible.length===0&&<div className="empty"><div style={{fontSize:30,marginBottom:8}}>💬</div><div>No reviews yet.</div></div>}
          {visible.map(r=>(
            <div key={r.id} className="rev-card">
              <div className="rev-card-top">
                <div><div className="rev-card-name">{r.author}</div><div className="rev-card-vendor">{r.vendor}{r.peptide&&` · ${r.peptide}`}</div></div>
                <span className={`rev-badge ${r.status==="pending"?"rev-pending":"rev-approved"}`}>{r.status.toUpperCase()}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                <span style={{fontSize:13,color:"var(--warn)"}}>{[...Array(5)].map((_,i)=><span key={i}>{i<r.rating?"★":"☆"}</span>)}</span>
                <span className="rev-date">{r.date}</span>
              </div>
              <div className="rev-text">{r.text}</div>
              {r.tags?.length>0&&<div className="rev-tags">{r.tags.map(t=><span key={t} className="rev-tag">{t}</span>)}</div>}
            </div>
          ))}
          {reviews.filter(r=>r.status==="pending").length>0&&(
            <div style={{marginTop:20}}>
              <div style={{fontFamily:"var(--fm)",fontSize:12,fontWeight:700,color:"var(--warn)",marginBottom:9}}>⏳ PENDING MODERATION ({reviews.filter(r=>r.status==="pending").length})</div>
              {reviews.filter(r=>r.status==="pending").map(r=>(
                <div key={r.id} className="rev-card" style={{borderColor:"rgba(245,166,35,0.2)"}}>
                  <div className="rev-card-top">
                    <div><div className="rev-card-name">{r.author}</div><div className="rev-card-vendor">{r.vendor}{r.peptide&&` · ${r.peptide}`}</div></div>
                    <div style={{display:"flex",gap:5}}>
                      <button className="btn btn-xs" style={{background:"rgba(0,255,157,0.12)",color:"var(--good)",border:"1px solid rgba(0,255,157,0.3)"}} onClick={()=>approve(r.id)}>Approve</button>
                      <button className="btn btn-xs btn-danger" onClick={()=>reject(r.id)}>Reject</button>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span style={{fontSize:12,color:"var(--warn)"}}>{[...Array(5)].map((_,i)=><span key={i}>{i<r.rating?"★":"☆"}</span>)}</span><span className="rev-date">{r.date}</span></div>
                  <div className="rev-text">{r.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="rev-form">
          <div style={{fontFamily:"var(--fm)",fontWeight:700,fontSize:13,marginBottom:14}}>Submit a Review</div>
          <div className="fg"><label className="flabel">Vendor *</label><select className="fsel" value={form.vendor} onChange={e=>sf("vendor",e.target.value)}><option value="">Select vendor...</option>{VENDORS_INFO.map(v=><option key={v.id}>{v.name}</option>)}</select></div>
          <div className="fg"><label className="flabel">Peptide (optional)</label><input className="fi" value={form.peptide} onChange={e=>sf("peptide",e.target.value)} placeholder="e.g. BPC-157"/></div>
          <div className="fg"><label className="flabel">Your name (optional)</label><input className="fi" value={form.author} onChange={e=>sf("author",e.target.value)} placeholder="Anonymous"/></div>
          <div className="fg"><label className="flabel">Rating *</label><div style={{display:"flex",gap:3}}>{[1,2,3,4,5].map(n=><span key={n} className={`rf-star${(hoverStar||form.rating)>=n?" on":""}`} onClick={()=>sf("rating",n)} onMouseEnter={()=>setHoverStar(n)} onMouseLeave={()=>setHoverStar(0)}>★</span>)}</div></div>
          <div className="fg"><label className="flabel">Review *</label><textarea className="fi" rows={4} value={form.text} onChange={e=>sf("text",e.target.value)} placeholder="Share your experience..."/></div>
          <div className="fg"><label className="flabel">Tags (comma-separated)</label><input className="fi" value={form.tags} onChange={e=>sf("tags",e.target.value)} placeholder="Fast Shipping, Good QC"/></div>
          <button className="btn btn-green" style={{width:"100%",justifyContent:"center"}} onClick={submit}>Submit for Review</button>
          <div style={{fontSize:10,color:"var(--muted)",textAlign:"center",marginTop:7,fontFamily:"var(--fm)"}}>Reviews are moderated before publishing.</div>
        </div>
      </div>
    </div>
  );
}

// ── CART ──────────────────────────────────────────────────────────────────────
function Cart({items,setItems}){
  const upd=(idx,delta)=>setItems(prev=>{
    const next=[...prev];
    next[idx]={...next[idx],qty:Math.max(1,next[idx].qty+delta)};
    return next;
  });
  const rem=(idx)=>setItems(prev=>prev.filter((_,i)=>i!==idx));
  const sub=items.reduce((s,item)=>s+(item.price*item.qty),0);
  const sav=items.reduce((s,item)=>s+(item.origPrice?((item.origPrice-item.price)*item.qty):0),0);
  const byVendor=items.reduce((acc,item)=>{
    if(!acc[item.vendor])acc[item.vendor]=[];
    acc[item.vendor].push(item);
    return acc;
  },{});

  if(!items.length) return(
    <div style={{textAlign:"center",padding:"80px 20px"}}>
      <div style={{fontSize:52,marginBottom:14}}>🧪</div>
      <div style={{fontFamily:"var(--fm)",fontWeight:700,fontSize:16,marginBottom:6,color:"var(--text)"}}>Research cart is empty</div>
      <div style={{fontSize:13,color:"var(--muted3)",marginBottom:18}}>Add products from the Compare tab to estimate your research costs.</div>
      <div style={{fontSize:11,color:"var(--muted)",fontFamily:"var(--fm)",background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"var(--r2)",padding:"10px 16px",display:"inline-block"}}>
        ℹ Biosafe Hub does not sell products — this is a price estimation tool only.
      </div>
    </div>
  );

  return(
    <div className="cart-wrap">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div>
          <div className="page-title">Research Cart</div>
          <div className="page-sub">{items.reduce((s,i)=>s+i.qty,0)} item{items.reduce((s,i)=>s+i.qty,0)!==1?"s":""} across {Object.keys(byVendor).length} vendor{Object.keys(byVendor).length!==1?"s":""} · Estimated costs only.</div>
        </div>
        <button className="btn btn-ghost btn-sm" style={{color:"var(--bad)",borderColor:"rgba(240,79,90,0.25)"}} onClick={()=>setItems([])}>Clear all</button>
      </div>

      {/* Group by vendor */}
      {Object.entries(byVendor).map(([vendorName,vendorItems])=>{
        const vendorTotal=vendorItems.reduce((s,i)=>s+(i.price*i.qty),0);
        const vendorSavings=vendorItems.reduce((s,i)=>s+(i.origPrice?((i.origPrice-i.price)*i.qty):0),0);
        return(
          <div key={vendorName} style={{marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 14px",background:"var(--bg3)",borderRadius:"var(--r2) var(--r2) 0 0",border:"1px solid var(--border2)",borderBottom:"none"}}>
              <span style={{fontFamily:"var(--fm)",fontSize:12,fontWeight:700,color:"var(--accent)"}}>{vendorName}</span>
              <span style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--muted3)"}}>Subtotal: <span style={{color:"var(--text)",fontWeight:700}}>${vendorTotal.toFixed(2)}</span>{vendorSavings>0&&<span style={{color:"var(--good)",marginLeft:6}}>−${vendorSavings.toFixed(2)} saved</span>}</span>
            </div>
            <div style={{border:"1px solid var(--border2)",borderRadius:"0 0 var(--r2) var(--r2)",overflow:"hidden"}}>
              {vendorItems.map((item)=>{
                const idx=items.findIndex(x=>x===item);
                return(
                  <div key={idx} style={{display:"grid",gridTemplateColumns:"1fr auto auto auto",gap:10,alignItems:"center",padding:"12px 14px",borderBottom:"1px solid var(--border)",background:"var(--bg2)"}}>
                    <div>
                      <div style={{fontFamily:"var(--fm)",fontWeight:700,fontSize:13,color:"var(--text)"}}>{item.peptide}</div>
                      <div style={{fontSize:11,color:"var(--muted3)",marginTop:2}}>{item.dose}</div>
                      {item.coupon&&<div style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(245,166,35,0.08)",border:"1px solid rgba(245,166,35,0.2)",borderRadius:3,padding:"2px 6px",fontSize:10,color:"var(--warn)",fontFamily:"var(--fm)",marginTop:4}}>◇ {item.coupon} — {item.couponDesc}</div>}
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6,background:"var(--bg3)",border:"1px solid var(--border2)",borderRadius:"var(--r2)",padding:3}}>
                      <button style={{width:24,height:24,borderRadius:3,border:"none",background:"var(--bg4)",color:"var(--text)",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fm)"}} onClick={()=>upd(idx,-1)}>−</button>
                      <span style={{fontFamily:"var(--fm)",fontSize:13,minWidth:20,textAlign:"center"}}>{item.qty}</span>
                      <button style={{width:24,height:24,borderRadius:3,border:"none",background:"var(--bg4)",color:"var(--text)",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--fm)"}} onClick={()=>upd(idx,+1)}>+</button>
                    </div>
                    <div style={{textAlign:"right",minWidth:80}}>
                      {item.origPrice&&<div style={{fontSize:10,color:"var(--muted)",textDecoration:"line-through",fontFamily:"var(--fm)"}}>${(item.origPrice*item.qty).toFixed(2)}</div>}
                      <div style={{fontFamily:"var(--fm)",fontWeight:700,fontSize:15,color:"var(--text)"}}>${(item.price*item.qty).toFixed(2)}</div>
                      {item.origPrice&&<div style={{fontSize:10,color:"var(--good)",fontFamily:"var(--fm)",fontWeight:700}}>−${((item.origPrice-item.price)*item.qty).toFixed(2)}</div>}
                    </div>
                    <button className="btn btn-ghost btn-xs" style={{color:"var(--bad)",borderColor:"rgba(240,79,90,0.2)"}} onClick={()=>rem(idx)}>✕</button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div style={{background:"var(--bg2)",border:"1px solid var(--border2)",borderRadius:"var(--r)",padding:18,marginTop:6}}>
        {sav>0&&<div style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12,fontFamily:"var(--fm)",color:"var(--good)"}}><span>Total savings</span><span>−${sav.toFixed(2)}</span></div>}
        <div style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12,fontFamily:"var(--fm)"}}><span style={{color:"var(--muted3)"}}>Subtotal ({items.reduce((s,i)=>s+i.qty,0)} items)</span><span>${sub.toFixed(2)}</span></div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12,fontFamily:"var(--fm)"}}><span style={{color:"var(--muted3)"}}>Shipping</span><span style={{color:"var(--muted)"}}>Varies by vendor</span></div>
        <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0 5px",fontSize:17,fontFamily:"var(--fm)",fontWeight:700,borderTop:"1px solid var(--border)",marginTop:8,color:"var(--accent)"}}><span>Estimated Total</span><span>${sub.toFixed(2)}</span></div>
        <div style={{fontSize:10,color:"var(--muted)",textAlign:"center",marginTop:12,lineHeight:1.6,fontFamily:"var(--fb)"}}>
          Biosafe Hub does not sell products. Visit each vendor's website to complete your purchase.<br/>
          Prices shown are estimates and may not reflect current vendor promotions.
        </div>
        <div style={{display:"flex",gap:8,marginTop:14,justifyContent:"center",flexWrap:"wrap"}}>
          {Object.keys(byVendor).map(v=>(
            <button key={v} className="btn btn-green btn-sm" onClick={()=>alert("Opening "+v+" website")}>
              Shop {v} →
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── RESEARCH PAGE ─────────────────────────────────────────────────────────────
const RESEARCH_DATA=[
  {id:1,name:"Retatrutide",fullName:"Retatrutide — GLP-1/GIP/Glucagon Triple Agonist (RETA / GLP-3)",category:"GLP Agonists",tags:["GLP-3","Weight Loss","Metabolic","Liver Fat"],summary:"The most potent incretin-based peptide in research. Activates three receptors simultaneously — GLP-1, GIP, and glucagon. Phase 2 NEJM trial showed up to 24.2% body weight reduction at 48 weeks. Phase 3 (TRIUMPH) data shows up to ~71 lbs mean weight loss at 48 weeks.",mechanism:"Activates GLP-1R (appetite suppression), GIPR (insulin synergy, adipose remodeling), and GCGR (energy expenditure, hepatic fat oxidation). Triple agonism produces dramatic liver fat reduction — up to 82% in MASLD patients (Nature Medicine, 2024).",startingDose:{amount:"2",unit:"mg",frequency:"Once weekly SubQ",form:"Subcutaneous injection — same day each week"},commonDoses:["2 mg/week × 4 wks (start)","4 mg/week × 4 wks","8 mg/week × 4 wks","12 mg/week (max studied)"],cycleLength:"Continuous — Phase 2 ran 48 weeks; no weight plateau reached",titration:"2→4→8→12 mg holding each 4 weeks. Do NOT rush escalation.",halfLife:"~6 days — once-weekly dosing",storage:"Lyophilized: −20°C or 2–8°C up to 90 days. Reconstituted: refrigerate, use within 28 days.",benefits:["Highest weight loss of any pharmacological agent (~24% at 48 wks)","82% liver fat reduction in MASLD at 12 mg (Nature Medicine 2024)","Improves HbA1c, blood pressure, lipids, insulin resistance","Likely superior to semaglutide and tirzepatide for weight loss"],risks:["GI side effects — nausea/vomiting primary dose-limiter","Not FDA-approved — Phase 3 ongoing","Contraindicated: MTC history or MEN2","Pancreatitis risk (class effect)"],avoidWith:["Semaglutide","Tirzepatide","Cagrilintide","Any other GLP-1 agonist","Insulin secretagogues without dose reduction"],sideEffects:["Nausea","Vomiting","Diarrhea","Decreased appetite","Injection site reactions"],note:"For research purposes only. Not FDA-approved. Not medical advice.",icon:"⚗"},
  {id:2,name:"Tirzepatide",fullName:"Tirzepatide — Dual GIP/GLP-1 Agonist (TIRZ / GLP-2T)",category:"GLP Agonists",tags:["GLP-1","GIP","Weight Loss","Diabetes"],summary:"FDA-approved (Mounjaro for T2D, Zepbound for weight/sleep apnea). First dual GIP/GLP-1 agonist. SURMOUNT-5 head-to-head showed 35% greater weight loss vs semaglutide (−20.2% vs −13.7%) at 72 weeks.",mechanism:"39-amino acid peptide activating both GIPR (pancreatic beta cells, adipose tissue) and GLP-1R (hypothalamus, GI tract). Dual action amplifies insulin secretion, suppresses glucagon, slows gastric emptying, and reduces food reward signaling beyond GLP-1 alone. Half-life ~5 days.",startingDose:{amount:"2.5",unit:"mg",frequency:"Once weekly SubQ",form:"Subcutaneous injection — same day each week"},commonDoses:["2.5 mg/week × 4 wks (start — tolerance only)","5 mg/week (first therapeutic)","7.5–10 mg/week (moderate maintenance)","12.5–15 mg/week (max — FDA ceiling)"],cycleLength:"Continuous; re-titrate if off >3 weeks.",titration:"2.5→5→7.5→10→12.5→15 mg every 4 weeks. The 4-week hold is mandatory. Many find maintenance at 5–10 mg.",halfLife:"~5 days",storage:"Lyophilized: freeze at −20°C. Reconstituted: refrigerate, use within 28 days.",benefits:["Superior weight loss vs semaglutide in head-to-head","FDA-approved for T2D and obesity","Improves HbA1c, blood pressure, sleep apnea, lipids","GIP component improves insulin sensitivity in adipose tissue"],risks:["GI side effects","Pancreatitis","Cholelithiasis from rapid weight loss","Contraindicated: MTC/MEN2 history","Oral contraceptive efficacy reduced — use barrier method 4 weeks post-initiation"],avoidWith:["Semaglutide or any other GLP-1 agonist","Insulin without dose reduction","Sulfonylureas without dose reduction"],sideEffects:["Nausea","Vomiting","Diarrhea","Constipation","Injection site reactions","Hypoglycemia with insulin/sulfonylurea"],note:"For research purposes only. Prescription medication. Not medical advice.",icon:"💊"},
  {id:3,name:"Semaglutide",fullName:"Semaglutide — GLP-1 Receptor Agonist (SEMA / GLP-1)",category:"GLP Agonists",tags:["GLP-1","Weight Loss","Diabetes","Cardiovascular"],summary:"Most widely studied GLP-1 agonist. FDA-approved as Ozempic (T2D), Wegovy (weight management, CV risk, MASH 2025). SELECT trial: 20% reduction in major cardiovascular events. STEP trials: 10–15% mean body weight reduction.",mechanism:"Modified GLP-1 peptide resistant to DPP-4 with C18 fatty acid enabling albumin binding — extends half-life to ~7 days. Activates GLP-1R in hypothalamus (appetite suppression), GI tract (slows gastric emptying), and pancreas (insulin/glucagon). Effects are dose-dependent.",startingDose:{amount:"0.25",unit:"mg",frequency:"Once weekly SubQ",form:"Subcutaneous injection — same day each week"},commonDoses:["0.25 mg/week × 4 wks (start — tolerance only)","0.5 mg × 4 wks","1.0 mg × 4 wks","1.7 mg × 4 wks","2.4 mg/week (Wegovy max)"],cycleLength:"Continuous for weight management.",titration:"0.25→0.5→1.0→1.7→2.4 mg every 4 weeks. Slower 6–8 week steps reduce GI burden.",halfLife:"~7 days",storage:"Lyophilized: 2–8°C (do not freeze). Reconstituted: refrigerate, use within 30 days.",benefits:["Largest evidence base of any weight loss peptide","Cardiovascular protection (SELECT trial)","FDA-approved for MASH 2025","Renal disease progression reduction (FLOW 2026)"],risks:["GI side effects","Thyroid C-cell tumor risk (boxed warning — contraindicated in MTC/MEN2)","Pancreatitis","Gallbladder disease"],avoidWith:["Other GLP-1 agonists","Insulin without dose reduction","Oral medications (delayed absorption)"],sideEffects:["Nausea","Vomiting","Diarrhea","Fatigue","Headache","Injection site reactions"],note:"For research purposes only. Prescription medication. Not medical advice.",icon:"💉"},
  {id:4,name:"5-Amino-1MQ",fullName:"5-Amino-1-methylquinolinium",category:"Peptides",tags:["NNMT Inhibitor","Fat Loss","Metabolism","NAD+"],summary:"NNMT inhibitor that increases intracellular NAD+ availability by blocking the enzyme that depletes NAD+ precursors. Preclinical models show reduced adipogenesis and improved insulin sensitivity without dietary change.",mechanism:"Blocks NNMT, preventing nicotinamide methylation and NAD+ precursor depletion. Increases NAD+, activates SIRT1, enhances mitochondrial function and fat oxidation. Targets the upstream regulatory enzyme unlike direct NAD+ supplementation.",startingDose:{amount:"50",unit:"mg",frequency:"Once daily",form:"Oral capsule or injection"},commonDoses:["50 mg/day oral (start)","100 mg/day oral (moderate)","50 mg injection daily (higher bioavailability)"],cycleLength:"8 weeks on, 4 weeks off",halfLife:"Not well established",storage:"Capsules: room temperature, sealed. Injectable: refrigerate after reconstitution.",benefits:["Reduces fat cell differentiation","Increases NAD+ without direct supplementation","Complements GLP-1 protocols","No GH stimulation or hormonal disruption"],risks:["Very limited human data","GI discomfort at higher doses","No established long-term safety profile"],avoidWith:["High-dose NMN or NR (excessive NAD+ elevation)"],sideEffects:["GI discomfort","Nausea (rare)"],note:"For research purposes only. Not medical advice.",icon:"🔬"},
  {id:5,name:"Adamax",fullName:"Adamax — Dihexa + Methylene Blue Blend",category:"Peptides",tags:["Nootropic","Cognitive","Neuroprotection"],summary:"A cognitive-enhancement blend combining Dihexa (potent HGF/MET pathway activator — estimated 10 million times more potent than BDNF in synaptic formation assays) with methylene blue (mitochondrial electron carrier, MAOI activity).",mechanism:"Dihexa activates HGF/MET receptor pathway promoting synaptogenesis. Methylene blue improves mitochondrial respiration and weakly inhibits MAO — enhancing dopaminergic and serotonergic tone.",startingDose:{amount:"1",unit:"mg",frequency:"Once daily (Dihexa component)",form:"Oral or sublingual"},commonDoses:["1–3 mg Dihexa daily","Methylene blue 0.5–4 mg/kg"],cycleLength:"2–4 weeks on, equal time off",halfLife:"Dihexa: days (albumin binding). Methylene blue: ~5 hours.",storage:"Away from light and moisture. Methylene blue is photosensitive.",benefits:["Potentially powerful synaptic formation support","May help with cognitive decline models","Methylene blue improves cellular energy"],risks:["Dihexa is extremely potent — small dose errors matter","Methylene blue MAOI activity — dangerous with serotonergic drugs","Very limited human trials for Dihexa"],avoidWith:["SSRIs/SNRIs (serotonin syndrome from methylene blue)","MAOIs","High-dose serotonergic peptides"],sideEffects:["Overstimulation","Headache","Insomnia at higher doses","Serotonin syndrome risk with serotonergic agents"],note:"For research purposes only. Extreme caution warranted. Not medical advice.",icon:"🧠"},
  {id:6,name:"AICAR",fullName:"AICAR (5-Aminoimidazole-4-carboxamide ribonucleoside)",category:"Peptides",tags:["AMPK Activator","Endurance","Metabolism"],summary:"Cell-permeable nucleoside that converts intracellularly to ZMP, a potent AMPK activator. Increases glucose uptake, fat oxidation, and mitochondrial biogenesis. Animal studies showed significant endurance improvement without training.",mechanism:"ZMP mimics AMP activating AMPK — master energy sensor. Increases glucose uptake, stimulates fatty acid oxidation, promotes mitochondrial biogenesis via PGC-1α, inhibits anabolic energy-consuming pathways.",startingDose:{amount:"10",unit:"mg",frequency:"Daily fasted",form:"Subcutaneous injection"},commonDoses:["10 mg/day (low/start)","50 mg/day (research moderate)","500 mg/day (clinical trial dose — WADA banned)"],cycleLength:"4–8 weeks",halfLife:"2–4 hours",storage:"Refrigerate. Reconstituted: use within 2 weeks.",benefits:["AMPK activation mimics exercise adaptations","Improves insulin sensitivity","Promotes fat oxidation","Mitochondrial biogenesis"],risks:["Banned by WADA","Limited human safety data","AMPK has broad cellular effects","Potential lactic acidosis at high doses"],avoidWith:["Metformin (additive AMPK — hypoglycemia)","Insulin"],sideEffects:["Hypoglycemia risk","Injection site irritation","Fatigue at higher doses"],note:"For research purposes only. WADA banned. Not medical advice.",icon:"⚡"},
  {id:7,name:"AOD-9604",fullName:"AOD-9604 — HGH Fragment 176-191",category:"Peptides",tags:["Fat Loss","Lipolysis","GH Fragment"],summary:"Modified fragment of human GH (hGH 176-191) retaining fat-burning properties without growth-promoting or insulin-desensitizing effects. Over 300,000 subjects in human studies with no adverse effects — extensive safety record.",mechanism:"Stimulates lipolysis and inhibits lipogenesis via fat cell receptors, mimicking the lipolytic tail of HGH without activating the IGF-1 axis. Does not increase blood sugar or cause IGF-1-related side effects.",startingDose:{amount:"300",unit:"mcg",frequency:"Once daily fasted",form:"Subcutaneous injection"},commonDoses:["300 mcg/day (standard)","500 mcg/day (higher protocol)","5 days on, 2 days off"],cycleLength:"8 weeks on, 8 weeks off",halfLife:"~30 minutes",storage:"Lyophilized: refrigerate. Reconstituted: refrigerate, use within 2 weeks.",benefits:["Targeted fat loss without GH side effects","Extensive human safety data","Does not affect insulin, blood glucose, or IGF-1","No desensitization risk"],risks:["Requires fasting for optimal effect","Moderate effect size — adjunctive not primary","No FDA approval"],avoidWith:["Multiple lipolytic agents simultaneously — monitor"],sideEffects:["Generally very well-tolerated","Mild injection site reactions","Rarely: headache or fatigue"],note:"For research purposes only. Not medical advice.",icon:"🔥"},
  {id:8,name:"ARA-290",fullName:"ARA-290 (Cibinetide) — EPO Tissue-Protective Analog",category:"Peptides",tags:["Neuropathy","Anti-inflammatory","EPO Analog"],summary:"Non-hematopoietic EPO analog designed to activate tissue-protective EPO receptors without increasing red blood cell production. Studied for small fiber neuropathy, sarcoidosis-related neuropathy, and inflammatory conditions.",mechanism:"Binds tissue-protective EPO receptor (EPOR heterodimer) activating anti-apoptotic, anti-inflammatory, and neuroprotective pathways without erythropoietic effects or thrombotic risks.",startingDose:{amount:"1",unit:"mg",frequency:"Once daily",form:"Subcutaneous injection"},commonDoses:["1 mg/day","2 mg/day","4 mg/day in clinical trials"],cycleLength:"4–12 weeks",halfLife:"~4 hours",storage:"Refrigerate. Protect from light.",benefits:["Potential nerve regeneration in neuropathy","Anti-inflammatory without steroids","No erythropoietic effects","Has clinical trial data (sarcoidosis neuropathy)"],risks:["Limited large-scale human trials","Not commercially available in most markets"],avoidWith:["EPO or erythropoiesis-stimulating agents (theoretical redundancy)"],sideEffects:["Generally well-tolerated","Mild injection site reactions"],note:"For research purposes only. Not FDA-approved. Not medical advice.",icon:"🔬"},
  {id:9,name:"Acetic Acid",fullName:"Acetic Acid 0.6% — Reconstitution Solvent",category:"Supplies",tags:["Reconstitution","Solvent"],summary:"Dilute acetic acid (0.6%) used as reconstitution solvent for peptides not readily soluble in BAC water — particularly IGF-1 LR3 and some growth factors. Creates mildly acidic environment aiding dissolution.",mechanism:"N/A — Solvent only. Provides mildly acidic environment for dissolution of peptides with poor water solubility at neutral pH.",startingDose:{amount:"0.6",unit:"%",frequency:"N/A",form:"Reconstitution — 1–2 mL per vial; always dilute after dissolving"},commonDoses:["Use 0.6% solution for initial dissolving","Dilute reconstituted solution with sterile saline or BAC water before injection"],cycleLength:"N/A",halfLife:"N/A",storage:"Room temperature. Keep sealed.",benefits:["Necessary for IGF-1 LR3","Low cost","Widely available"],risks:["Do NOT inject undiluted","Always dilute to physiological pH before injection","Not for systemic use alone"],avoidWith:["Do not use as sole injection solvent"],sideEffects:["Injection site irritation if not diluted"],note:"For research use only. Always dilute before injection.",icon:"🧪"},
  {id:10,name:"BAC Water",fullName:"Bacteriostatic Water — Standard Reconstitution Fluid",category:"Supplies",tags:["Reconstitution","Sterile Water"],summary:"Sterile water containing 0.9% benzyl alcohol as preservative. Standard reconstitution fluid for most research peptides. Benzyl alcohol allows multi-use vials for up to 28 days after reconstitution.",mechanism:"N/A — carrier fluid. Benzyl alcohol acts as bacteriostatic agent preventing microbial growth in reconstituted solutions.",startingDose:{amount:"1–3",unit:"mL",frequency:"Per reconstitution",form:"Added to lyophilized peptide vial"},commonDoses:["1–2 mL for most peptides","3 mL for large vials (10–30 mg)"],cycleLength:"N/A",halfLife:"N/A",storage:"Room temperature before opening. Refrigerate after opening. Use within 28 days.",benefits:["Allows multi-use up to 28 days","Compatible with most peptides","Standard in research"],risks:["Benzyl alcohol contraindicated in neonates","Ensure not contaminated before adding to peptide"],avoidWith:["Do not use for peptides requiring acetic acid"],sideEffects:["Injection site discomfort if contaminated","Benzyl alcohol hypersensitivity (rare)"],note:"For research purposes only.",icon:"💧"},
  {id:11,name:"B-12",fullName:"Vitamin B12 Injectable (Methylcobalamin/Cyanocobalamin)",category:"Peptides",tags:["Energy","Neurological","Injection"],summary:"Injectable Vitamin B12 (methylcobalamin = active form preferred). Essential for DNA synthesis, red blood cell formation, myelin sheath maintenance, and methylation. Intramuscular or SubQ injection bypasses GI absorption issues.",mechanism:"Cofactor for DNA synthesis, RBC formation, myelin maintenance, and methyl group donation. Deficiency causes megaloblastic anemia, neuropathy, and cognitive impairment. Injection achieves higher plasma levels than oral forms.",startingDose:{amount:"1",unit:"mg",frequency:"Weekly",form:"IM or SubQ injection"},commonDoses:["1 mg/week IM (standard)","0.5–1 mg SubQ 2–3x/week","1 mg/day × 7 days (loading in deficiency)"],cycleLength:"Ongoing maintenance or cycled",halfLife:"~6 days",storage:"Protect from light. Refrigerate.",benefits:["Corrects deficiency","Improves energy and reduces fatigue","Neuroprotective","Supports methylation and homocysteine reduction","Very safe"],risks:["Cyanocobalamin contains small cyanide moiety — methylcobalamin preferred","Acne flares at high doses","Hypokalemia in severe deficiency treatment"],avoidWith:["Chloramphenicol (reduces B12 effectiveness)"],sideEffects:["Injection site discomfort","Rare: acne","Very rarely: anaphylaxis"],note:"Consult physician for deficiency management.",icon:"⚡"},
  {id:12,name:"BPC-157",fullName:"Body Protection Compound-157",category:"Peptides",tags:["Gut Health","Joint Repair","Recovery","Anti-inflammatory"],summary:"15-amino acid synthetic peptide from human gastric juice. 500+ preclinical studies. Tissue repair across muscle, tendon, ligament, bone, gut, and neural tissue. No lethal dose identified in tested species. FDA Category 2. WADA banned.",mechanism:"Upregulates VEGFR2 (angiogenesis), enhances NO synthesis, activates STAT3/MAPK cell survival pathways, promotes fibroblast/collagen synthesis. Gastroprotective. Short half-life <30 min — systemic effects through rapid receptor activation.",startingDose:{amount:"250",unit:"mcg",frequency:"Once daily",form:"SubQ injection (systemic) or oral (gut-focused)"},commonDoses:["250 mcg/day SubQ (start)","500 mcg/day SubQ (standard)","500 mcg split AM/PM for injury","250–500 mcg oral for gut issues"],cycleLength:"4–12 weeks; 8 weeks on / 8 weeks off recommended",halfLife:"<30 minutes",storage:"Lyophilized: refrigerate. Reconstituted: refrigerate, use within 28 days.",benefits:["Tissue repair: tendon, ligament, muscle, bone, gut","Anti-inflammatory without immunosuppression","Neuroprotective","Gastroprotective — IBD, ulcers, leaky gut","Compatible with most stacks"],risks:["FDA Category 2 bulk substance — high risk classification","WADA banned","Promotes angiogenesis — concern with existing malignancy","No long-term human safety data","NSAIDs may counteract effects"],avoidWith:["NSAIDs (counteract mechanism)","Active malignancy — angiogenesis concern"],sideEffects:["Generally well-tolerated","Nausea at higher doses","Mild fatigue initially"],note:"For research purposes only. FDA Category 2. WADA banned. Not medical advice.",icon:"🧬"},
  {id:13,name:"Cagrilintide",fullName:"Cagrilintide — Long-Acting Amylin Analog",category:"GLP Agonists",tags:["Amylin","Weight Loss","Satiety"],summary:"Long-acting synthetic amylin analog. Studied in combination with semaglutide (CagriSema). REDEFINE trials showed CagriSema produced ~25% body weight reduction vs ~15% for semaglutide alone — showing additive benefit through distinct satiety pathway.",mechanism:"Activates amylin receptors in the area postrema (brain), complementing GLP-1 agonism via a different satiety pathway. Reduces postprandial glucagon, slows gastric emptying synergistically with GLP-1, and activates distinct hypothalamic satiety circuits.",startingDose:{amount:"0.3",unit:"mg",frequency:"Once weekly SubQ",form:"Subcutaneous injection"},commonDoses:["0.3 mg/week (start)","0.6 → 1.2 → 2.4 mg/week (titration)"],cycleLength:"Continuous — studied 68 weeks",halfLife:"~7–10 days",storage:"Refrigerate. Do not freeze.",benefits:["Distinct satiety mechanism — additive to GLP-1","CagriSema combination shows ~25% weight loss","Reduces postprandial glucose"],risks:["Only studied with semaglutide — limited other combination data","GI side effects","Not FDA-approved"],avoidWith:["Pramlintide (additive amylin toxicity)","Multiple GLP agonists without physician supervision"],sideEffects:["Nausea","Vomiting","Injection site reactions"],note:"For research purposes only. Not FDA-approved. Not medical advice.",icon:"⚗"},
  {id:14,name:"Cerebrolysin",fullName:"Cerebrolysin — Porcine Brain Neuropeptide Mixture",category:"Peptides",tags:["Nootropic","Neuroprotection","Neurogenesis","Cognitive"],summary:"Standardized mixture of low-molecular-weight neuropeptides from porcine brain proteins. Widely used in Eastern Europe/Asia for stroke, TBI, and dementia. Multiple clinical trials showing cognitive benefits.",mechanism:"Contains BDNF-like, NGF-like, and CNTF-like neuropeptides that cross the blood-brain barrier. Stimulates neurogenesis, reduces tau and amyloid pathology, activates MAPK/ERK survival pathways, reduces neuroinflammation.",startingDose:{amount:"5",unit:"mL",frequency:"Daily or 5 days/week",form:"IM or IV infusion"},commonDoses:["5 mL/day IM for 20-day course","10–30 mL IV drip (clinical)","20-day cycles 1–3x per year"],cycleLength:"20 consecutive days, repeated quarterly or biannually",halfLife:"Variable — active peptides",storage:"Refrigerate 2–8°C. Do not freeze. Use within 24 hours of opening.",benefits:["Clinically studied in stroke, TBI, Alzheimer's","Promotes neurogenesis and synaptic plasticity","Anti-apoptotic in neural tissue"],risks:["Animal-derived — allergy risk","IV requires clinical setting","Rare anaphylaxis","MAOI interactions"],avoidWith:["MAOIs","Antidepressants with monoamine effects"],sideEffects:["Dizziness","Restlessness","Rare: anaphylaxis"],note:"For research purposes only. IV use requires clinical supervision. Not medical advice.",icon:"🧠"},
  {id:15,name:"CJC-1295",fullName:"CJC-1295 No DAC — Modified GRF(1-29)",category:"Peptides",tags:["GHRH","GH Release","Body Composition"],summary:"Modified GHRH analog. No-DAC version has ~30 min half-life enabling pulsatile GH release mimicking natural physiology. Most commonly paired with ipamorelin. Phase I/II human data available.",mechanism:"Binds GHRH receptors in anterior pituitary stimulating GH and IGF-1. No-DAC produces one GH pulse per injection. Paired with ipamorelin activates two complementary GH pathways simultaneously.",startingDose:{amount:"100",unit:"mcg",frequency:"Once daily before sleep",form:"Subcutaneous injection"},commonDoses:["100 mcg/night (start)","200–300 mcg/night (standard)","100 mcg CJC + 200 mcg Ipamorelin (classic blend)"],cycleLength:"8–16 weeks, 5 days on/2 days off",halfLife:"~30 minutes",storage:"Lyophilized: freeze at −20°C. Reconstituted: refrigerate, use within 28 days.",benefits:["Natural pulsatile GH stimulation","No cortisol or prolactin elevation","Improved sleep, recovery, body composition","Synergistic with ipamorelin"],risks:["Not FDA-approved","GH side effects at high doses","Contraindicated in active malignancy","WADA banned"],avoidWith:["Active cancer","CJC DAC version (receptor saturation)"],sideEffects:["Water retention","Tingling/numbness","Injection site reactions","Hunger increase"],note:"For research purposes only. Not FDA-approved. WADA banned. Not medical advice.",icon:"⚗"},
  {id:16,name:"Deionized Water",fullName:"Deionized Water — Reconstitution Solvent",category:"Supplies",tags:["Reconstitution"],summary:"Water with mineral ions removed. Less common than BAC water for reconstitution (lacks preservative). Used for single-dose preparations or where benzyl alcohol is contraindicated.",mechanism:"N/A — solvent. pH-neutral aqueous carrier for peptide dissolution.",startingDose:{amount:"1–2",unit:"mL",frequency:"Per reconstitution",form:"Added to lyophilized peptide"},commonDoses:["1–2 mL per vial (single-dose use)"],cycleLength:"N/A",halfLife:"N/A",storage:"Sterile, sealed. Use immediately upon opening.",benefits:["No preservative — suitable where benzyl alcohol contraindicated","Clean pH-neutral"],risks:["No bacteriostatic agent — use within 24–48 hours","Higher contamination risk for multi-use"],avoidWith:["Long-term storage of reconstituted peptides"],sideEffects:["N/A — contamination risk if not handled properly"],note:"For research purposes only.",icon:"💧"},
  {id:17,name:"DSIP",fullName:"Delta Sleep-Inducing Peptide",category:"Peptides",tags:["Sleep","Stress","Cortisol"],summary:"Nonapeptide naturally found in brain. Modulates delta-wave sleep architecture, reduces cortisol and ACTH stress responses, and has mild analgesic properties. Originally isolated from rabbit brain during slow-wave sleep.",mechanism:"May modulate delta-wave sleep through limbic system activity. Shown to reduce cortisol and ACTH responses and normalize stress hormone rhythms.",startingDose:{amount:"100",unit:"mcg",frequency:"Before bed",form:"Subcutaneous injection"},commonDoses:["100–500 mcg before sleep","600 mcg for 5–7 nights (some protocols)"],cycleLength:"2–4 weeks",halfLife:"~30–45 minutes",storage:"Refrigerate. Reconstituted: use within 2 weeks.",benefits:["May improve sleep onset and delta-wave quality","Stress axis normalization","Low toxicity"],risks:["Limited human evidence","Inconsistent results","Mechanism partially unknown"],avoidWith:["Sedative medications (additive CNS depression)"],sideEffects:["Drowsiness","Mild headache"],note:"For research purposes only. Not medical advice.",icon:"🌙"},
  {id:18,name:"Epitalon",fullName:"Epitalon — Pineal Tetrapeptide (Telomerase Activator)",category:"Peptides",tags:["Longevity","Telomeres","Anti-aging","Pineal"],summary:"Synthetic tetrapeptide (Ala-Glu-Asp-Gly) based on naturally occurring pineal peptide epithalamin. Activates telomerase, restores telomere length, regulates melatonin, antioxidant properties. Khavinson 30+ years research.",mechanism:"Activates telomerase maintaining telomere length in somatic cells. Regulates melatonin and circadian rhythms. Antioxidant properties. Lifespan extension in multiple animal models.",startingDose:{amount:"5",unit:"mg",frequency:"Daily for 20 consecutive days",form:"Subcutaneous injection"},commonDoses:["5–10 mg/day × 20 days","2 mg/day × 20 days (conservative)","20-day courses 2–3x per year"],cycleLength:"20 consecutive days, repeated 2–3x yearly",halfLife:"Very short",storage:"Lyophilized: refrigerate. Reconstituted: refrigerate, use within 28 days.",benefits:["Telomerase activation — telomere length restoration","Anti-aging research leader — 30+ years of evidence","Improves sleep and melatonin regulation","Antioxidant activity"],risks:["Telomerase activation — theoretical cancer concern","Limited independent RCTs","Most research from single group (Khavinson)"],avoidWith:["Active or recent cancer — theoretical telomerase concern"],sideEffects:["Generally very well-tolerated","Mild injection site reactions","Occasionally vivid dreams"],note:"For research purposes only. Not FDA-approved. Not medical advice.",icon:"🔬"},
  {id:19,name:"FOX04-DRI",fullName:"FOX04-DRI — Senolytic Peptide",category:"Peptides",tags:["Senolytic","Anti-aging","Cellular Clearance"],summary:"D-amino acid retro-inverso peptide that selectively triggers apoptosis in senescent cells ('zombie cells') by disrupting FOXO4-p53 interaction. Spares healthy cells. Animal studies show improved exercise tolerance, hair regrowth, kidney function.",mechanism:"Competitive decoy binding FOXO4 prevents it from inhibiting p53, restoring p53-dependent apoptosis specifically in senescent cells. Healthy cells express minimal FOXO4 and are spared.",startingDose:{amount:"5",unit:"mg",frequency:"3 days on, extended rest (pulse dosing)",form:"Subcutaneous injection"},commonDoses:["Pulse dosing: 3 consecutive days per month or quarter","Human dose equivalent not well-established"],cycleLength:"Pulse cycles — 3 days on, extended off-period",halfLife:"Not well characterized",storage:"Refrigerate.",benefits:["Targeted senescent cell removal","Improved exercise tolerance in aged models","Novel anti-aging mechanism","Hair regrowth in animal studies"],risks:["Removing senescent cells aggressively may impair wound healing","No published human trials","Unknown optimal human dosing"],avoidWith:["Chemotherapy or other apoptosis-inducing agents"],sideEffects:["Unknown in humans — preclinical mild and transient"],note:"For research purposes only. No human trials published. Extreme caution warranted. Not medical advice.",icon:"🔬"},
  {id:20,name:"GHK-Cu",fullName:"GHK-Cu — Copper Peptide",category:"Peptides",tags:["Skin","Wound Healing","Collagen","Anti-aging"],summary:"Naturally occurring copper-binding tripeptide (Gly-His-Lys) found in human plasma and tissues. Declines with age. Stimulates collagen/elastin, angiogenesis, antioxidant enzymes, and activates ~30 genes associated with tissue repair. Extensive safety record.",mechanism:"Copper complex activates multiple healing pathways: stimulates collagen and elastin synthesis, activates decorin, promotes angiogenesis, reduces TNF-α inflammation, activates SOD and catalase antioxidants.",startingDose:{amount:"1",unit:"mg",frequency:"Once daily",form:"SubQ injection or topical"},commonDoses:["1 mg/day SubQ × 15 days, then 2 mg/day × 15 days (30-day cycle)","1.7 mg/day (cheat sheet protocol)","Topical: 0.05–2% concentration"],cycleLength:"8 weeks on, 8 weeks off (injectable); topical can be continuous",halfLife:"~2 hours",storage:"Lyophilized: refrigerate. Reconstituted: refrigerate, use within 28 days.",benefits:["Collagen synthesis and skin rejuvenation","Wound healing acceleration","Anti-inflammatory and antioxidant","May reduce hair loss","Extensive safety record","Compatible with most stacks"],risks:["Copper toxicity at very high doses (theoretical at research doses)","Avoid in Wilson's disease"],avoidWith:["Wilson's disease or copper metabolism disorders"],sideEffects:["Generally very well-tolerated","Mild injection site reactions","Topical: occasional skin sensitivity"],note:"For research purposes only. Not medical advice.",icon:"✨"},
  {id:21,name:"GHRP-6",fullName:"GHRP-6 — Growth Hormone Releasing Peptide 6",category:"Peptides",tags:["GH Release","Hunger","Body Composition"],summary:"Original GHRP hexapeptide. Produces strong GH pulse but also significantly increases cortisol, prolactin, and ghrelin (causing pronounced hunger). Less preferred than ipamorelin due to non-selectivity. Still used in cachexia research for appetite stimulation.",mechanism:"Binds ghrelin receptor (GHS-R1a) — non-selective unlike ipamorelin. Also stimulates ACTH/cortisol and prolactin. Strong ghrelin effect causes significant hunger.",startingDose:{amount:"100",unit:"mcg",frequency:"2–3 times daily fasted",form:"Subcutaneous injection"},commonDoses:["100–150 mcg 2–3x/day fasted","200 mcg single dose (stronger GH pulse)"],cycleLength:"8 weeks on, 8 weeks off",halfLife:"~15–60 minutes",storage:"Lyophilized: refrigerate. Reconstituted: use within 28 days.",benefits:["Strong GH pulse","Appetite stimulation (cachexia research)","Established research base"],risks:["Significant cortisol increase","Prolactin elevation — sexual dysfunction risk","Strong hunger — undermines fat loss","Less selective — less preferred than ipamorelin","WADA banned"],avoidWith:["Ipamorelin (receptor saturation)","Somatostatin analogs"],sideEffects:["Strong hunger","Cortisol increase","Prolactin increase","Water retention","Tingling","Injection site reactions"],note:"For research purposes only. WADA banned. Not medical advice.",icon:"💉"},
  {id:22,name:"GLOW",fullName:"GLOW — Glutathione/L-Carnitine/Vitamin C/B-Vitamin Blend",category:"Peptides",tags:["Antioxidant","Skin","Energy","Aesthetic"],summary:"Aesthetic and wellness injection blend combining glutathione (antioxidant/skin brightening), L-carnitine (fat transport), vitamin C, and B-vitamins. Popular in med-spa settings. Good tolerance record.",mechanism:"Glutathione: master antioxidant, inhibits melanin synthesis. L-carnitine: fatty acid mitochondrial transport. Vitamin C: collagen synthesis cofactor. B-vitamins: energy metabolism cofactors.",startingDose:{amount:"Per blend concentration",unit:"mL",frequency:"1–3x weekly",form:"IM or IV push"},commonDoses:["1–2 mL IM 2–3x/week","IV push in clinical settings"],cycleLength:"4–8 week courses or ongoing",halfLife:"Variable by component",storage:"Refrigerate.",benefits:["Skin brightening","Energy and metabolic support","Antioxidant protection","Wide tolerance record"],risks:["Standardization varies by pharmacy","Glutathione may reduce chemotherapy efficacy"],avoidWith:["Chemotherapy (glutathione may reduce drug efficacy)"],sideEffects:["Injection site bruising","Mild flushing","Rare: allergic reaction"],note:"For research purposes only. Not medical advice.",icon:"✨"},
  {id:23,name:"Glutathione",fullName:"Glutathione — Master Antioxidant (Injectable)",category:"Peptides",tags:["Antioxidant","Detox","Skin","Liver"],summary:"Body's master antioxidant tripeptide (glutamate-cysteine-glycine). Injectable bypasses GI degradation. Liver protection, skin brightening (tyrosinase inhibition), immune support, heavy metal chelation.",mechanism:"Neutralizes ROS directly. Conjugates with toxins for hepatic excretion (phase II). Regenerates vitamins C and E. Inhibits tyrosinase leading to skin brightening with consistent use.",startingDose:{amount:"200",unit:"mg",frequency:"2–3x weekly",form:"IV push or IM injection"},commonDoses:["200–400 mg IM 2–3x/week","600–1200 mg IV (liver or detox protocols)"],cycleLength:"4–12 weeks or ongoing",halfLife:"Very short systemically — cumulative effects",storage:"Refrigerate. Light-sensitive. Prepare fresh for IV.",benefits:["Liver protection and detoxification","Skin brightening","Immune support","Antioxidant protection","Compatible with most stacks"],risks:["IV requires clinical administration","Oral has low bioavailability","May interfere with chemotherapy efficacy"],avoidWith:["Chemotherapy (reduces efficacy)"],sideEffects:["Generally safe","Injection site reactions","Rare: allergic reaction"],note:"For research purposes only. Not medical advice.",icon:"🌿"},
  {id:24,name:"IGF-1 LR3",fullName:"IGF-1 LR3 — Long R3 Insulin-Like Growth Factor",category:"Peptides",tags:["Muscle Growth","IGF-1","Recovery","Anabolic"],summary:"Modified IGF-1 analog with 13-amino acid N-terminal extension and Arg substitution at position 3. Reduces binding to IGF-binding proteins, dramatically extending half-life. Acts downstream of GH. Requires careful reconstitution in 0.6% acetic acid.",mechanism:"Binds IGF-1 receptors stimulating cell proliferation, protein synthesis, glucose uptake. LR3 extension bypasses binding proteins for 20–30 hour activity vs minutes for native IGF-1.",startingDose:{amount:"20",unit:"mcg",frequency:"Once daily post-workout",form:"SubQ injection (reconstitute in 0.6% acetic acid first, then dilute)"},commonDoses:["20–40 mcg/day (start)","50–100 mcg/day (research moderate)"],cycleLength:"4 weeks maximum (prevent receptor downregulation)",halfLife:"~20–30 hours",storage:"Reconstitute in 0.6% acetic acid. Lyophilized: refrigerate. Reconstituted: use within 2 weeks.",benefits:["Potent anabolic and muscle-sparing","Promotes satellite cell activation","Accelerates recovery","Synergy with GH peptides"],risks:["Hypoglycemia risk — monitor blood sugar","Growth in all cells including potentially cancerous","Acromegaly symptoms with prolonged high use","WADA banned","Requires careful reconstitution"],avoidWith:["Insulin (severe hypoglycemia)","Active cancer","Do not combine with GH without monitoring"],sideEffects:["Hypoglycemia","Joint pain","Organ growth risk with prolonged use","Headache"],note:"For research purposes only. High hypoglycemia risk. Reconstitution requires acetic acid. WADA banned. Not medical advice.",icon:"💪"},
  {id:25,name:"IPA/CJC Blend",fullName:"Ipamorelin + CJC-1295 No DAC — GH Peptide Blend",category:"Peptides",tags:["GH Blend","Recovery","Body Composition","Sleep"],summary:"Most popular GH peptide combination. Pairs GHRH pathway (CJC-1295) with ghrelin pathway (Ipamorelin) for synergistic amplified GH pulse. No cortisol/prolactin issues. Classic ratio: 100 mcg CJC + 200 mcg Ipamorelin.",mechanism:"CJC-1295 binds GHRH receptors priming pituitary; Ipamorelin simultaneously activates ghrelin receptors. Two complementary GH release pathways produce a stronger pulse than either alone.",startingDose:{amount:"100+200",unit:"mcg",frequency:"Once nightly before sleep",form:"Combined SubQ injection"},commonDoses:["100 mcg CJC + 200 mcg Ipa nightly","200 mcg CJC + 300 mcg Ipa (advanced)","5 days on / 2 days off"],cycleLength:"8–16 weeks, 5 days on/2 days off",halfLife:"CJC: ~30 min. Ipa: ~2 hrs.",storage:"Reconstitute separately or blend vial. Refrigerate. Use within 28 days.",benefits:["Synergistic GH release > either alone","No cortisol or prolactin elevation","Improved sleep, recovery, body composition","Most evidence-supported GH combination"],risks:["Not FDA-approved","GH side effects at high doses","Active cancer contraindication","WADA banned"],avoidWith:["GHRP-6 (receptor saturation)","Active malignancy"],sideEffects:["Water retention","Tingling","Mild hunger","Injection site reactions"],note:"For research purposes only. Not medical advice.",icon:"⚗"},
  {id:26,name:"Ipamorelin",fullName:"Ipamorelin — Selective GH Secretagogue",category:"Peptides",tags:["GH Release","Sleep","Recovery","Clean GH"],summary:"Pentapeptide GH secretagogue activating ghrelin receptors with high selectivity. No cortisol, no prolactin, minimal hunger effect. Gold standard starting point for GH peptide research.",mechanism:"Binds GHS-R1a with high selectivity triggering clean pulsatile GH release. Unlike GHRP-2/GHRP-6, does not stimulate ACTH/cortisol or prolactin. Short half-life produces discrete GH pulse.",startingDose:{amount:"100",unit:"mcg",frequency:"Once nightly before sleep",form:"Subcutaneous injection"},commonDoses:["100 mcg/night (start)","200–300 mcg/night (standard)","300 mcg 3x daily fasted (fat loss)"],cycleLength:"8–12 weeks on, 4–8 weeks off",halfLife:"~2 hours",storage:"Lyophilized: refrigerate. Reconstituted: use within 28 days.",benefits:["Selective GH release without hormonal disruption","Improved deep sleep","Fat loss, lean muscle preservation","No cortisol or prolactin effects","Stacks well with CJC-1295"],risks:["Not FDA-approved","GH side effects at high doses","WADA banned","Contraindicated in active malignancy"],avoidWith:["GHRP-6 (receptor saturation)","Active cancer"],sideEffects:["Mild water retention","Numbness/tingling at high doses","Mild hunger","Injection site reactions"],note:"For research purposes only. WADA banned. Not medical advice.",icon:"⚗"},
  {id:27,name:"Kisspeptin",fullName:"Kisspeptin-10 — Upstream HPG Axis Regulator",category:"Peptides",tags:["Hormonal","Fertility","LH","Testosterone"],summary:"Neuropeptide that is the key upstream regulator of the HPG axis. Activates GnRH neurons to stimulate LH and FSH release. Studied for fertility, HRT support, and hormone axis restoration post-TRT.",mechanism:"Binds KISS1R (GPR54) on GnRH neurons triggering pulsatile GnRH → LH/FSH cascade → gonadal sex hormone production.",startingDose:{amount:"50",unit:"mcg",frequency:"Once daily or pulsed",form:"Subcutaneous injection"},commonDoses:["50–100 mcg daily","Pulse: 50 mcg every 6–12 hours","2–4 week cycles"],cycleLength:"2–4 weeks, rest, repeat",halfLife:"~28 minutes",storage:"Refrigerate. Reconstituted: use within 2 weeks.",benefits:["Stimulates natural LH/FSH without suppression","Fertility support (men and women)","Post-TRT axis restoration","Mood and libido via sex hormone stimulation"],risks:["Desensitization with continuous use — pulse protocol essential","Limited human data","WADA banned"],avoidWith:["GnRH analogs or antagonists","During TRT/AAS cycles"],sideEffects:["Nausea at higher doses","Injection site reactions","Transient hormonal fluctuations"],note:"For research purposes only. Not medical advice.",icon:"🔬"},
  {id:28,name:"KLOW",fullName:"KLOW — KPV + LL-37 + BPC-157 Blend",category:"Peptides",tags:["Wound Healing","Anti-inflammatory","Antimicrobial","Blend"],summary:"Compound blend targeting infection, inflammation, and healing simultaneously. KPV: anti-inflammatory α-MSH fragment. LL-37: antimicrobial peptide. BPC-157: tissue repair.",mechanism:"KPV activates MC1R/MC3R suppressing NF-κB. LL-37 disrupts bacterial membranes and modulates innate immunity. BPC-157 promotes angiogenesis and tissue repair. Synergistic multi-mechanism approach.",startingDose:{amount:"Per blend formulation",unit:"",frequency:"Daily",form:"Injection or topical"},commonDoses:["Usually 1–2 mg total blend daily — per vendor specifications"],cycleLength:"4–8 weeks",halfLife:"Variable by component",storage:"Refrigerate. Use within 28 days of reconstitution.",benefits:["Multi-mechanism wound healing","Antimicrobial + anti-inflammatory + repair simultaneously","May reduce healing time"],risks:["Blend standardization varies","LL-37 at high doses may be pro-inflammatory"],avoidWith:["NSAIDs (counteract BPC-157)"],sideEffects:["Injection site reactions","Occasional GI discomfort"],note:"For research purposes only. Not medical advice.",icon:"🧬"},
  {id:29,name:"KPV",fullName:"KPV — α-MSH C-Terminal Tripeptide",category:"Peptides",tags:["Anti-inflammatory","IBD","Gut","Immune"],summary:"C-terminal tripeptide of α-MSH (Lys-Pro-Val). Potent anti-inflammatory through melanocortin receptors. Studied for IBD, colitis, skin inflammation. Can be administered orally for gut-targeted effect.",mechanism:"Activates MC1R and MC3R suppressing NF-κB and reducing TNF-α, IL-1β, IL-6. Reduces mucosal inflammation and maintains intestinal epithelial barrier integrity.",startingDose:{amount:"500",unit:"mcg",frequency:"Once or twice daily",form:"SubQ injection or oral"},commonDoses:["500 mcg – 1 mg/day injection","1–2 mg orally (gut targeting)"],cycleLength:"4–8 weeks",halfLife:"Short — minutes systemically",storage:"Refrigerate. Use reconstituted within 2 weeks.",benefits:["Anti-inflammatory without immunosuppression","Gut-targeted for IBD and colitis","Synergistic with BPC-157","Low side effect profile"],risks:["Limited large-scale human trials","Short half-life limits sustained systemic effect"],avoidWith:["Immunosuppressants (may mask inflammation signals)"],sideEffects:["Generally well-tolerated","Mild injection site reactions"],note:"For research purposes only. Not medical advice.",icon:"🌿"},
  {id:30,name:"L-Carnitine",fullName:"L-Carnitine Injectable",category:"Peptides",tags:["Fat Loss","Energy","Metabolic"],summary:"Amino acid derivative essential for transport of long-chain fatty acids into mitochondria. Injectable form produces higher plasma levels than oral. Common in metabolic research stacks alongside GLP-1 agonists.",mechanism:"CPT-1 uses L-carnitine to shuttle fatty acids across inner mitochondrial membrane. Without sufficient carnitine, fat oxidation is limited regardless of caloric deficit.",startingDose:{amount:"500",unit:"mg",frequency:"2–3x weekly",form:"IM or IV injection"},commonDoses:["500 mg – 1 g IM 2–3x/week","Often stacked with tirzepatide or semaglutide"],cycleLength:"Ongoing or 8–12 week courses",halfLife:"~17 hours",storage:"Room temperature. Protect from light.",benefits:["Enhances fat oxidation","Improves insulin sensitivity","Cardiac protection evidence","Compatible with GLP-1 protocols"],risks:["TMAO production from carnitine — potential cardiovascular concern at very high doses"],avoidWith:["Warfarin (may increase anticoagulant effect)"],sideEffects:["Nausea","Fishy body odor (oral primarily)","Injection site reactions"],note:"For research purposes only. Not medical advice.",icon:"🔥"},
  {id:31,name:"Lipo-C",fullName:"Lipo-C — Lipotropic Injection Blend",category:"Peptides",tags:["Fat Loss","Liver","Metabolism"],summary:"Lipotropic injection blend with methionine, inositol, choline, and often B12 and L-carnitine. Supports liver fat metabolism, fat mobilization, and NAFLD prevention. Often combined with GLP-1 protocols.",mechanism:"Methionine: methyl donor for liver methylation. Inositol: lipid second messenger, insulin sensitizer. Choline: phospholipid precursor, supports hepatic fat transport, NAFLD prevention. Combined B12/carnitine for energy.",startingDose:{amount:"1",unit:"mL",frequency:"2–3x weekly",form:"IM injection"},commonDoses:["1–2 mL IM 2–3x/week"],cycleLength:"Ongoing or 8–12 week courses",halfLife:"Variable",storage:"Refrigerate.",benefits:["Liver fat metabolism support","Fat mobilization","NAFLD prevention (choline)","Complements GLP-1 protocols"],risks:["Individual component reactions vary"],avoidWith:["No significant contraindications at standard doses"],sideEffects:["Injection site soreness","Mild GI discomfort","Urine odor change"],note:"For research purposes only. Not medical advice.",icon:"💉"},
  {id:32,name:"LL-37",fullName:"LL-37 — Human Cathelicidin Antimicrobial Peptide",category:"Peptides",tags:["Antimicrobial","Immune","Wound Healing"],summary:"Only cathelicidin peptide expressed in humans. Kills bacteria, fungi, and viruses. Activates toll-like receptors, stimulates angiogenesis, promotes wound healing. Studied for antibiotic-resistant infections.",mechanism:"Disrupts bacterial membranes via electrostatic interaction. Activates TLRs, stimulates angiogenesis, promotes healing. Both pro- and anti-inflammatory depending on context and dose.",startingDose:{amount:"125",unit:"mcg",frequency:"Daily for 50 consecutive days",form:"SubQ injection"},commonDoses:["125 mcg/day × 50 days on, 4 weeks off"],cycleLength:"50 consecutive days, then 4 weeks off",halfLife:"Short",storage:"Lyophilized: refrigerate. Reconstituted: use within 2 weeks.",benefits:["Broad antimicrobial activity","Wound healing and angiogenesis","Immunomodulatory","Effective against superbugs"],risks:["Pro-inflammatory at high doses","Limited human trial data","Associated with inflammatory skin conditions at excessive levels"],avoidWith:["Autoimmune conditions on immunosuppressive therapy","High-dose with other pro-inflammatory agents"],sideEffects:["Injection site reactions","Potential systemic inflammation at high doses"],note:"For research purposes only. Not medical advice.",icon:"🛡"},
  {id:33,name:"Melanotan II",fullName:"Melanotan II (MT-2) — Melanocortin Agonist",category:"Peptides",tags:["Tanning","Libido","Appetite","Melanocortin"],summary:"Synthetic melanocortin analog. Activates MC1R (tanning), MC3R/MC4R (appetite suppression, sexual arousal). High potency — strong nausea at onset is almost universal. Requires mole check before use.",mechanism:"MC1R activation → melanin synthesis/tanning. MC4R activation → spontaneous erections and appetite suppression. One of the most active melanocortin agonists studied.",startingDose:{amount:"50",unit:"mcg",frequency:"Once daily",form:"SubQ injection"},commonDoses:["50 mcg/day (ultra-conservative start)","100–250 mcg/day (standard)","2–4 weeks loading; maintenance 1–2x/week"],cycleLength:"2–4 weeks loading, then maintenance",halfLife:"~1–2 hours",storage:"Lyophilized: refrigerate. Light-sensitive.",benefits:["Skin darkening without UV","Libido enhancement","Appetite suppression"],risks:["Nausea at onset — often severe","Spontaneous erections","May darken/change moles — melanoma screening REQUIRED before use","Blood pressure changes","Absolute contraindication in existing melanoma/dysplastic nevi"],avoidWith:["Existing melanoma or dysplastic nevi — ABSOLUTE CONTRAINDICATION","ED medications (severe hypotension)"],sideEffects:["Nausea (severe at onset)","Flushing","Spontaneous erections","Mole darkening","Fatigue","Yawning"],note:"For research purposes only. Mole/skin check REQUIRED before use. Not medical advice.",icon:"☀"},
  {id:34,name:"MOTS-C",fullName:"MOTS-C — Mitochondrial Derived Peptide",category:"Peptides",tags:["Mitochondria","Metabolic","AMPK","Longevity"],summary:"Mitochondrial-derived peptide encoded within 12S rRNA. Translocates to nucleus under metabolic stress regulating gene expression. Activates AMPK, enhances insulin sensitivity, mimics exercise-induced metabolic adaptations.",mechanism:"Activates AMPK via purine intermediate limitation. Translocates to nucleus regulating anti-inflammatory and metabolic gene expression. Enhances insulin sensitivity and muscle glucose uptake.",startingDose:{amount:"5",unit:"mg",frequency:"5 days on, 2 days off",form:"SubQ injection"},commonDoses:["5–10 mg/day","1 mg/day (longevity protocols)","20 mg every other day"],cycleLength:"8 weeks on, 8 weeks off",halfLife:"Short",storage:"Lyophilized: refrigerate or freeze. Reconstituted: use within 14 days.",benefits:["Metabolic regulation","Insulin sensitization","Exercise-mimicking adaptations","Longevity effects in mouse models"],risks:["Very limited human data","Broad nuclear gene regulation — long-term unknown"],avoidWith:["High-dose AICAR (overlapping AMPK activation)"],sideEffects:["Generally well-tolerated","Mild injection site reactions","Occasional fatigue"],note:"For research purposes only. Limited human data. Not medical advice.",icon:"⚡"},
  {id:35,name:"NAD+",fullName:"NAD+ — Nicotinamide Adenine Dinucleotide",category:"Peptides",tags:["Longevity","Energy","Anti-aging","DNA Repair"],summary:"Essential coenzyme in every cell. Declines ~50% between ages 20–50. IV infusions studied for energy, cognition, addiction treatment, and aging. Activates sirtuins and PARP-1 DNA repair.",mechanism:"Primary electron carrier in cellular respiration. Substrate for sirtuins (SIRT1–7, longevity enzymes), PARP-1 (DNA repair), and CD38. IV raises plasma and intracellular NAD+ rapidly.",startingDose:{amount:"250",unit:"mg",frequency:"Daily or weekly",form:"IV infusion or IM/SubQ injection"},commonDoses:["250–500 mg IV drip (clinical)","100–250 mg IM 3–5x/week","50–100 mg SubQ"],cycleLength:"3–10 day loading IV then weekly maintenance",halfLife:"Short intravascularly — converts to NADH in cells",storage:"Protect from light. Refrigerate. Prepare fresh for IV.",benefits:["Rapid energy enhancement","DNA repair","Sirtuin activation","Addiction treatment/withdrawal support","Cognitive clarity","Compatible with most stacks"],risks:["IV side effects — nausea, flushing, racing heart (dose-rate dependent)","High cost","Supraphysiological levels may feed rapidly dividing cells (theoretical)"],avoidWith:["Alcohol (NAD+ consumed in ethanol metabolism)","CD38 inhibitors"],sideEffects:["Flushing (IV)","Nausea during infusion","Racing heart at fast IV rates"],note:"For research purposes only. IV requires clinical supervision. Not medical advice.",icon:"⚡"},
  {id:36,name:"Oxytocin",fullName:"Oxytocin — Bonding/Trust Neuropeptide",category:"Peptides",tags:["Social Bonding","Anxiety","Trust","Hormonal"],summary:"Hypothalamic neuropeptide. 'Bonding hormone.' Reduces amygdala reactivity, increases prosocial behavior, reduces cortisol, analgesic effects. Intranasal delivery crosses BBB. Primary CNS research route.",mechanism:"Binds OT receptors in amygdala, hypothalamus, cortex. Reduces threat responses, increases prosocial behavior, reduces cortisol. Peripherally: uterine contractions and milk letdown.",startingDose:{amount:"10",unit:"IU",frequency:"As needed or daily",form:"Intranasal spray or IM injection"},commonDoses:["10–40 IU intranasal (social/anxiety research)","5–10 IU IM (clinical obstetric)"],cycleLength:"As needed; 4–8 week research cycles",halfLife:"~1–2 min IV; longer intranasal CNS effect",storage:"Refrigerate. Protect from light.",benefits:["Reduces social anxiety","Enhances trust and social bonding","Reduces cortisol","Analgesic","Wound healing enhancement"],risks:["Receptor desensitization with chronic use","May paradoxically increase anxiety in some","Causes uterine contractions — CONTRAINDICATED in pregnancy outside clinical setting"],avoidWith:["Pregnancy — absolute contraindication without medical supervision"],sideEffects:["Nasal irritation","Headache","Nausea","Water retention at high doses","Paradoxically increased anxiety in some"],note:"For research purposes only. Contraindicated in pregnancy. Not medical advice.",icon:"💙"},
  {id:37,name:"PE-22-28",fullName:"PE-22-28 — PACAP Derived Antidepressant Fragment",category:"Peptides",tags:["Antidepressant","Cognitive","Neuroprotection","PACAP"],summary:"Synthetic 7-amino acid peptide from PACAP. Preclinical studies show rapid-onset antidepressant effects comparable to ketamine in some models within 24 hours. Activates PAC1 receptors, stimulates BDNF and synaptic plasticity.",mechanism:"Activates PACAP receptors (PAC1) stimulating cAMP and downstream BDNF expression in prefrontal cortex and hippocampus. May enhance synaptic plasticity faster than traditional antidepressants.",startingDose:{amount:"100",unit:"mcg",frequency:"Once daily or as needed",form:"Intranasal or SubQ injection"},commonDoses:["100–300 mcg/day injection","500 mcg intranasal"],cycleLength:"2–4 weeks on, equal rest",halfLife:"Short",storage:"Refrigerate. Use within 2 weeks.",benefits:["Rapid-onset antidepressant in preclinical models","BDNF upregulation","Potential treatment-resistant depression research"],risks:["Preclinical only — no Phase II/III human trials","Very limited human data"],avoidWith:["Concurrent antidepressants without medical supervision"],sideEffects:["Unknown in humans — animal models well-tolerated"],note:"For research purposes only. Preclinical only — extreme caution. Not medical advice.",icon:"🧠"},
  {id:38,name:"Pinealon",fullName:"Pinealon — EDR Pineal Tripeptide (Khavinson)",category:"Peptides",tags:["Longevity","Pineal","Neuroprotection","Sleep"],summary:"Synthetic tripeptide (Glu-Asp-Arg) from Khavinson's pineal research. Neuroprotective, circadian rhythm regulatory, cognitive aging prevention. Part of Khavinson's longevity peptide library.",mechanism:"Gene expression regulator in pineal and CNS cells. Influences melatonin rhythms, protects against oxidative neuronal damage. Promotes transcription of longevity and cognitive maintenance genes.",startingDose:{amount:"1",unit:"mg",frequency:"Daily for 10–20 days",form:"SubQ injection or intranasal"},commonDoses:["1–2 mg/day × 10–20 days","10-day courses 1–3x per year"],cycleLength:"10–20 consecutive days, repeated quarterly",halfLife:"Short",storage:"Refrigerate. Use within 2 weeks.",benefits:["Neuroprotective","Sleep and circadian support","Cognitive aging protection","Khavinson longevity research"],risks:["Limited independent replication","No large-scale human RCTs"],avoidWith:["No significant known interactions"],sideEffects:["Generally well-tolerated","Mild drowsiness"],note:"For research purposes only. Not FDA-approved. Not medical advice.",icon:"🌙"},
  {id:39,name:"PT-141",fullName:"PT-141 (Bremelanotide) — Melanocortin Sexual Function",category:"Peptides",tags:["Libido","Sexual Function","Arousal","FDA-Approved"],summary:"Synthetic melanocortin agonist. FDA-approved as Vyleesi for HSDD in premenopausal women. Works centrally through CNS rather than on blood flow. Effective in both sexes.",mechanism:"Activates MC3R and MC4R in hypothalamus triggering CNS sexual arousal signaling independent of hormonal status. Different from PDE5 inhibitors — central rather than vascular mechanism.",startingDose:{amount:"500",unit:"mcg",frequency:"45–90 minutes before activity",form:"SubQ injection or intranasal"},commonDoses:["500 mcg SubQ (conservative)","1 mg SubQ (standard)","1.75 mg SubQ (FDA-approved Vyleesi dose)"],cycleLength:"As needed. Maximum once per 24 hours.",halfLife:"~2–3 hours",storage:"Refrigerate. Use within 28 days.",benefits:["FDA-approved for HSDD (women)","Works in both sexes","Central mechanism — effective when hormonal approaches fail"],risks:["Nausea — most common, can be severe","Transient blood pressure increase","Hyperpigmentation with repeated use","Not for daily use"],avoidWith:["High antihypertensive doses","PDE5 inhibitors — monitor cardiovascular effects","Melanotan II — overlapping receptor"],sideEffects:["Nausea (up to 40% at 1.75 mg)","Flushing","Headache","Blood pressure changes","Fatigue"],note:"For research purposes only. FDA-approved Vyleesi requires prescription. Not medical advice.",icon:"❤"},
  {id:40,name:"Selank",fullName:"Selank — Tuftsin Analog Anxiolytic",category:"Nasal Sprays",tags:["Anxiolytic","Nootropic","BDNF","Anti-anxiety"],summary:"Synthetic heptapeptide analog of tuftsin. Approved pharmaceutical in Russia for anxiety. Anxiolytic without sedation or dependence. Increases BDNF, modulates GABA and enkephalin, immune modulation.",mechanism:"Modulates GABA receptor function, increases BDNF, modulates enkephalin metabolism. Reduces anxiety without causing dependence or sedation. Immunomodulatory via tuftsin pathway.",startingDose:{amount:"250",unit:"mcg",frequency:"Once or twice daily intranasal",form:"Nasal spray"},commonDoses:["250–500 mcg intranasal 1–2x/day","500 mcg 3x/day (some protocols)"],cycleLength:"2–4 weeks on, equal rest",halfLife:"Minutes plasma — CNS retention longer",storage:"Refrigerate.",benefits:["Anxiolytic without sedation or dependence","BDNF increase — cognitive benefit","No withdrawal on discontinuation","Stacks with Semax for cognitive effect"],risks:["Limited Western RCT data","Intranasal dosing variability"],avoidWith:["CNS depressants (additive sedation at high doses)"],sideEffects:["Generally well-tolerated","Mild nasal irritation","Drowsiness at high doses"],note:"For research purposes only. Not FDA-approved. Not medical advice.",icon:"🧠"},
  {id:41,name:"Semax",fullName:"Semax — ACTH(4-10) Cognitive/Neuroprotective Peptide",category:"Nasal Sprays",tags:["Nootropic","BDNF","Neuroprotection","Focus"],summary:"Synthetic heptapeptide from ACTH(4-10). Approved pharmaceutical in Russia. Strong BDNF-stimulating properties, focus and memory enhancement, neuroprotective in ischemia models, dopamine and serotonin modulation.",mechanism:"Stimulates BDNF and NGF synthesis, activates dopamine and serotonin systems, reduces oxidative stress, neuroprotective in ischemia. Effects include improved focus, memory, and stress resilience.",startingDose:{amount:"300",unit:"mcg",frequency:"Once daily intranasal",form:"Nasal spray"},commonDoses:["300 mcg/day (start)","600 mcg/day split (standard)","1000 mcg/day (advanced)"],cycleLength:"2–4 weeks on, 2 weeks off",halfLife:"Minutes blood — CNS effects persist 6–24 hours",storage:"Refrigerate. Use within manufacturer window.",benefits:["Strong BDNF stimulation","Focus, memory, learning improvement","Neuroprotective in CNS injury models","Anti-inflammatory in CNS","Stacks with Selank"],risks:["High doses may cause anxiety/overstimulation","Tolerance with continuous use","Dopaminergic — caution in mania history"],avoidWith:["High-dose stimulants","Adamax (methylene blue MAOI — serotonin risk)"],sideEffects:["Mild anxiety or irritability","Vivid dreams","Nasal irritation","Headache"],note:"For research purposes only. Not FDA-approved. Not medical advice.",icon:"🧠"},
  {id:42,name:"Sermorelin",fullName:"Sermorelin — GHRH(1-29) Pituitary Peptide",category:"Peptides",tags:["GHRH","GH Release","Anti-aging"],summary:"Synthetic analog of first 29 amino acids of endogenous GHRH. Previously FDA-approved (GEREF). Self-limiting via somatostatin feedback — hard to over-stimulate GH axis. Original, milder GHRH analog — good starting point before CJC-1295.",mechanism:"Binds GHRH receptors stimulating GH release. Shorter half-life (10–20 min) than CJC-1295. Self-limiting via negative feedback. Also maintains pituitary tissue health preventing age-related atrophy.",startingDose:{amount:"100",unit:"mcg",frequency:"Once daily before sleep",form:"SubQ injection"},commonDoses:["100–300 mcg nightly","200 mcg/night (standard clinical)"],cycleLength:"6–12 months clinical; 8 weeks on/off research cycling",halfLife:"~10–20 minutes",storage:"Lyophilized: refrigerate. Reconstituted: use within 28 days.",benefits:["Previously FDA-approved — best safety profile of GHRH analogs","Physiological self-limiting GH stimulation","Pituitary maintenance","Milder side effects than CJC blends","Good entry point for GHRH therapy"],risks:["Shorter half-life = less potent than CJC-1295","Not FDA-approved for adults currently","WADA banned","Fluid retention"],avoidWith:["Active malignancy","Concurrent exogenous GH"],sideEffects:["Injection site reactions","Water retention","Headache"],note:"For research purposes only. Not medical advice.",icon:"⚗"},
  {id:43,name:"SNAP-8",fullName:"SNAP-8 — Acetyl Octapeptide Anti-Wrinkle Topical",category:"Peptides",tags:["Anti-wrinkle","Topical","Skin"],summary:"8-amino acid peptide (acetyl octapeptide-3) mimicking N-terminal SNAP-25. Applied topically to partially inhibit muscle contraction signals — 'topical Botox.' Reversible, no systemic absorption at standard concentrations.",mechanism:"Interferes with SNARE complex assembly reducing acetylcholine exocytosis at neuromuscular junction — mildly reduces muscle contraction in targeted areas. Local and reversible.",startingDose:{amount:"0.5",unit:"%",frequency:"Twice daily",form:"Topical cream or serum (0.5–10%)"},commonDoses:["0.5–2% topical (standard cosmetic)","10% in research/clinical formulations"],cycleLength:"Continuous topical; visible results 4–12 weeks",halfLife:"N/A — topical",storage:"Room temperature. Away from light.",benefits:["Non-injectable anti-wrinkle","Forehead and periocular lines","Reversible and safe","Combines with other topical peptides"],risks:["Limited vs Botox","Standardization varies","Not for injection"],avoidWith:["Injectable Botox in same area (redundant)"],sideEffects:["Generally well-tolerated","Rare: skin irritation"],note:"Topical research only. Not for injection. Not medical advice.",icon:"✨"},
  {id:44,name:"SS-31",fullName:"SS-31 / Elamipretide — Mitochondrial Cardiolipin Protector",category:"Peptides",tags:["Mitochondria","Cardioprotective","Longevity","Energy"],summary:"Tetrapeptide that penetrates inner mitochondrial membrane and interacts with cardiolipin. In Phase II human trials for Barth syndrome and heart failure. Stabilizes cristae, preserves ETC efficiency, reduces mitochondrial ROS.",mechanism:"Binds cardiolipin on inner mitochondrial membrane, stabilizing cristae architecture, preserving ETC efficiency, reducing mitochondrial ROS, improving ATP generation, preventing cytochrome c release.",startingDose:{amount:"0.1",unit:"mg/kg",frequency:"Daily SubQ or IV",form:"SubQ injection"},commonDoses:["0.1 mg/kg/day SubQ","0.25 mg/kg/day","Clinical trials: 0.05–4 mg/kg IV"],cycleLength:"4–12 weeks; longer in human trials",halfLife:"~1–2 hours",storage:"Lyophilized: refrigerate or −20°C. Reconstituted: use within 24–48 hours.",benefits:["Potent mitochondrial protection","Cardioprotective in heart failure models","Anti-aging via mitochondrial quality","Phase II human trials — strongest clinical evidence of longevity peptides","Reduces oxidative stress throughout tissues"],risks:["Very expensive","IV requires clinical setting","Reconstituted unstable — use promptly"],avoidWith:["No significant known interactions at research doses"],sideEffects:["IV: injection site, occasional flushing","Generally very well-tolerated"],note:"For research purposes only. Phase II human trials ongoing. Not medical advice.",icon:"⚡"},
  {id:45,name:"Survodutide",fullName:"Survodutide — Glucagon/GLP-1 Dual Agonist",category:"GLP Agonists",tags:["MASH","Weight Loss","Liver","Metabolic"],summary:"Dual glucagon/GLP-1 receptor agonist (no GIP component). Boehringer Ingelheim. Phase IIb MASH trial: 83% MASH resolution at 6 mg — remarkable liver data. Strong hepatic fat reduction from glucagon component.",mechanism:"GLP-1R activation (appetite, gastric emptying) + glucagon receptor (thermogenesis, hepatic fat oxidation). Strong hepatic effects without GIP. Different metabolic profile vs tirzepatide/retatrutide.",startingDose:{amount:"0.3",unit:"mg",frequency:"Once weekly SubQ",form:"SubQ injection"},commonDoses:["0.3→0.6→1.2→2.4→4.8 mg titration","Up to 6 mg in Phase IIb trials"],cycleLength:"Continuous — studied 46+ weeks",halfLife:"~6–7 days",storage:"Refrigerate. Do not freeze.",benefits:["83% MASH resolution in Phase IIb at 6 mg","~15% weight loss at 6 mg","Potent hepatic fat reduction","Different mechanism from GLP-1 mono-agonists"],risks:["GI side effects","Not FDA-approved","Pancreatitis risk","Cardiovascular monitoring"],avoidWith:["Other incretin agonists","Insulin without dose reduction"],sideEffects:["Nausea","Vomiting","Diarrhea","Injection site reactions"],note:"For research purposes only. Not FDA-approved. Not medical advice.",icon:"💊"},
  {id:46,name:"TB-500",fullName:"TB-500 — Thymosin Beta-4 Synthetic Fragment",category:"Peptides",tags:["Recovery","Anti-inflammatory","Systemic Healing"],summary:"Synthetic Thymosin Beta-4 fragment. Systemic healing peptide (vs BPC-157's more localized effect). Works on connective tissue, muscle, blood vessels. Classic combination with BPC-157 ('Wolverine/Phoenix stack').",mechanism:"Binds actin monomers regulating G-actin sequestration and cell migration. Promotes angiogenesis, reduces inflammation, facilitates progenitor cell migration to injury sites. Acts systemically throughout body.",startingDose:{amount:"2",unit:"mg",frequency:"Twice weekly",form:"SubQ injection"},commonDoses:["2 mg 2x/week loading (4–6 weeks)","2 mg/week maintenance","500 mcg – 1 mg/day protocols"],cycleLength:"4–6 weeks loading, then maintenance or cycle off",halfLife:"Short",storage:"Lyophilized: refrigerate. Reconstituted: use within 28 days.",benefits:["Systemic tissue repair — muscle, tendon, ligament, heart","Anti-inflammatory","Progenitor cell mobilization","Synergistic with BPC-157","Cardiac muscle protection evidence"],risks:["Angiogenesis promotion — theoretical cancer concern","Limited human trials","WADA banned"],avoidWith:["Active malignancy","NSAIDs"],sideEffects:["Fatigue at onset","Mild nausea","Head rush","Injection site reactions"],note:"For research purposes only. WADA banned. Not medical advice.",icon:"💉"},
  {id:47,name:"Tesamorelin",fullName:"Tesamorelin — FDA-Approved GHRH Analog (Egrifta)",category:"Peptides",tags:["GHRH","Visceral Fat","GH","FDA-Approved"],summary:"FDA-approved GHRH analog (Egrifta) for HIV lipodystrophy. Best regulatory standing of GHRH analogs. NIH-funded studies show visceral fat reduction AND cognitive protection in older adults. Superior regulatory status to CJC-1295.",mechanism:"Binds GHRH receptors stimulating GH and IGF-1 release. Longer half-life than sermorelin. Maintains pulsatile physiological GH. HIV trials: ~15% visceral fat reduction. Cognitive studies: protection in older adults.",startingDose:{amount:"1",unit:"mg",frequency:"Once daily SubQ",form:"SubQ injection"},commonDoses:["1 mg/day SubQ (FDA-approved dose)","2 mg/day (some research)","5 days on, 2 days off"],cycleLength:"3–6 months clinical; 8 weeks on/off research",halfLife:"~26 minutes",storage:"Lyophilized: refrigerate. Reconstituted: use within 28 days.",benefits:["FDA-approved — best regulatory standing","Proven visceral fat reduction","Cognitive protection in older adults (NIH studies)","Well-tolerated long-term data from HIV trials"],risks:["GH side effects at high doses","Active cancer contraindication","WADA banned","May worsen glucose tolerance"],avoidWith:["Active malignancy","Concurrent exogenous GH"],sideEffects:["Injection site reactions","Joint pain","Fluid retention","Glucose elevation"],note:"For research purposes only. FDA-approved version requires prescription. Not medical advice.",icon:"⚗"},
  {id:48,name:"Thymalin",fullName:"Thymalin — Thymic Polypeptide (Longevity)",category:"Peptides",tags:["Immunity","Longevity","Thymus"],summary:"Thymus gland polypeptide. Khavinson longevity library. Restores T-cell differentiation and thymic function. Counters age-related immunosenescence. Russian research shows lifespan extension in aged animals.",mechanism:"Restores thymic function and T-cell maturation. Promotes IL-2 production and T-helper cell development. Counters age-related thymus atrophy causing immunosenescence.",startingDose:{amount:"10",unit:"mg",frequency:"Daily for 20 consecutive days",form:"SubQ injection"},commonDoses:["10 mg/day × 20 days (Khavinson)","2 mg/day × 20 days (conservative)","Quarterly courses"],cycleLength:"20 consecutive days, 2–3x yearly",halfLife:"Variable",storage:"Lyophilized: refrigerate. Use reconstituted within 24–48 hours.",benefits:["Immune restoration","Lifespan extension in animal models","Complements Epitalon","Low side effect profile"],risks:["Animal-derived — allergy possible","Limited large-scale RCTs","Primarily Khavinson research"],avoidWith:["Immunosuppressants (counteract mechanism)"],sideEffects:["Generally well-tolerated","Injection site reactions","Mild immune activation"],note:"For research purposes only. Not medical advice.",icon:"🛡"},
  {id:49,name:"Thymosin Alpha 1",fullName:"Thymosin Alpha-1 (Tα1 / Zadaxin) — Immune Modulator",category:"Peptides",tags:["Immunity","Antiviral","Cancer Adjunct","Zadaxin"],summary:"28-amino acid thymic peptide. FDA-approved in 35+ countries as Zadaxin for hepatitis B/C, cancer adjunct, and immune restoration. Activates T-cells, NK cells, interferon production, dendritic cells. Most evidence-backed immune peptide.",mechanism:"Activates T-cell proliferation and maturation, enhances NK cell activity, stimulates type I interferon, activates dendritic cells, upregulates Toll-like receptors. Broad immune priming without autoimmune risk.",startingDose:{amount:"1.6",unit:"mg",frequency:"2x weekly SubQ",form:"SubQ injection"},commonDoses:["1.6 mg SubQ 2x/week (Zadaxin clinical dose)","1.5 mg 5 days on/2 days off","Up to 3.2 mg/day cancer adjunct"],cycleLength:"6–12 months clinical; 8 weeks on/off research",halfLife:"~2 hours",storage:"Lyophilized: refrigerate. Reconstituted: use within 28 days.",benefits:["Approved in 35+ countries — best human safety data of immune peptides","Antiviral (hepatitis B/C, COVID-19 studied)","Cancer treatment adjuvant","Immune restoration post-chemo","Safe for long-term use"],risks:["May be contraindicated in active autoimmune disease","Not FDA-approved in the US"],avoidWith:["Systemic immunosuppressants","Active autoimmune flares"],sideEffects:["Injection site reactions","Mild fever/flu-like (immune activation)","Fatigue"],note:"For research purposes only. Approved in 35+ countries but not the US. Not medical advice.",icon:"🛡"},
  {id:50,name:"VIP",fullName:"VIP — Vasoactive Intestinal Peptide",category:"Peptides",tags:["Inflammation","CIRS","Neurological","Gut"],summary:"28-amino acid neuropeptide. Studied for CIRS (Chronic Inflammatory Response Syndrome), post-COVID inflammation, mold illness, and autoimmune conditions. Potent anti-inflammatory and neuromodulatory. Shoemaker protocol cornerstone.",mechanism:"Activates VPAC1/VPAC2 receptors reducing NF-κB. Profound anti-inflammatory via IL-10 upregulation and TNF-α suppression. Regulates gut motility, vasodilation, neuroprotection. MUST follow Shoemaker sequencing in CIRS (biotoxin removal first).",startingDose:{amount:"50",unit:"mcg",frequency:"4x daily intranasal",form:"Intranasal spray"},commonDoses:["50 mcg intranasal 4x/day (Shoemaker CIRS protocol)","100–200 mcg/day total"],cycleLength:"4–12 weeks",halfLife:"~2 min IV; longer effective window intranasal",storage:"Refrigerate. Light-sensitive.",benefits:["Strong anti-inflammatory — CIRS and post-COVID","Gut and nervous system support","Shoemaker protocol evidence for mold/biotoxin recovery"],risks:["Vasodilation — hypotension or headache","MUST use only after biotoxin removal in CIRS (using before causes worsening)","Frequent dosing required (short half-life)"],avoidWith:["CIRS: use before completing biotoxin removal protocol","Hypotension medications"],sideEffects:["Facial flushing","Headache","Nasal irritation","Hypotension at high doses"],note:"For research purposes only. In CIRS protocols follow Shoemaker sequencing. Not medical advice.",icon:"🧠"},
  {id:51,name:"BAM15 Capsules",fullName:"BAM15 — Mitochondrial Uncoupler (Oral)",category:"Capsules",tags:["Fat Loss","Mitochondria","Thermogenesis"],summary:"Protonophore mitochondrial uncoupler dissipating proton gradient across inner mitochondrial membrane, causing energy to release as heat. Fat loss in mouse models without hyperthermia, appetite suppression, or cardiovascular stress. Mitochondria-specific unlike DNP.",mechanism:"Selectively uncouples mitochondrial proton gradient in adipose and metabolic tissue. Self-limiting. Mice showed significant fat loss without calorie restriction, cardiac effects, or hyperthermia.",startingDose:{amount:"1",unit:"capsule",frequency:"Once daily",form:"Oral capsule"},commonDoses:["Low dose daily per vendor capsule concentration","Often stacked with SLU-PP-332 or 5-Amino-1MQ"],cycleLength:"4–8 weeks on, 4 weeks off",halfLife:"Not fully characterized",storage:"Room temperature, sealed.",benefits:["Fat loss without appetite suppression","Mitochondria-specific — safer than DNP","May improve insulin sensitivity","No hyperthermia in preclinical models"],risks:["Very limited human data","Mitochondrial uncoupling has broad cellular effects","Do not confuse with DNP — different compound"],avoidWith:["DNP — ABSOLUTE: severe hyperthermia risk","Other mitochondrial uncouplers"],sideEffects:["Unknown in humans","Theoretical GI discomfort"],note:"For research purposes only. Very limited human data. Not medical advice.",icon:"🔥"},
  {id:52,name:"Methylene Blue",fullName:"Methylene Blue — Low-Dose Nootropic",category:"Capsules",tags:["Nootropic","Mitochondria","Cognitive","MAOI"],summary:"Phenothiazine dye with remarkable low-dose pharmacological properties. Acts as alternative electron carrier in mitochondrial ETC, MAOI activity, memory enhancement. Used medically for methemoglobinemia. MAOI activity requires strict drug interactions.",mechanism:"Low doses: alternative ETC electron carrier improving ATP production. Inhibits MAO increasing dopamine, serotonin, norepinephrine. May activate SIRT1. HIGH doses: pro-oxidant and dangerous.",startingDose:{amount:"0.5",unit:"mg/kg",frequency:"Once daily",form:"Oral capsule or sublingual"},commonDoses:["5–10 mg/day nootropic use","4 mg/kg for mitochondrial/memory protocols"],cycleLength:"2–4 weeks on, break",halfLife:"~5 hours",storage:"Room temperature. Light-sensitive — dark container.",benefits:["Mitochondrial efficiency","Memory consolidation","Cognitive performance at low doses","Neuroprotective properties"],risks:["MAOI activity — ABSOLUTE CONTRAINDICATION with serotonergic drugs","Serotonin syndrome risk","Blue urine/skin at higher doses","Hemolytic anemia in G6PD deficiency"],avoidWith:["SSRIs/SNRIs/MAOIs/tramadol/triptans — SEROTONIN SYNDROME RISK","G6PD deficiency","Chlorpromazine"],sideEffects:["Blue urine/stool","Skin tinting","Nausea at high doses"],note:"For research purposes only. MAOI — serotonin syndrome risk with serotonergic medications. Not medical advice.",icon:"💙"},
  {id:53,name:"SLU-PP-332",fullName:"SLU-PP-332 — ERR Agonist Exercise Mimetic",category:"Capsules",tags:["Exercise Mimetic","Endurance","Metabolic","ERR"],summary:"First-in-class ERRα/β/γ agonist. Activates gene programs for exercise-induced mitochondrial biogenesis and oxidative metabolism. Animal studies: significant endurance improvement, visceral fat reduction, metabolic improvement without physical activity.",mechanism:"Activates estrogen-related receptors regulating mitochondrial biogenesis, fatty acid oxidation, and oxidative phosphorylation. Mimics transcriptional changes induced by exercise.",startingDose:{amount:"Per capsule formulation",unit:"",frequency:"Once daily",form:"Oral capsule"},commonDoses:["Vendor-specific — often 10–50 mg capsules","Human dose equivalent from animal studies not established"],cycleLength:"4–8 weeks on, 4 weeks off",halfLife:"~6 hours",storage:"Room temperature, sealed.",benefits:["Exercise-mimetic metabolic adaptations","Mitochondrial biogenesis","Visceral fat reduction in animal models","Synergistic with BAM15"],risks:["Very limited human safety data","ERR agonism has broad transcriptional effects","May affect steroidogenic pathways"],avoidWith:["Estrogen receptor modulators (theoretical ERR/ER interaction)"],sideEffects:["Unknown in humans — animal: well-tolerated"],note:"For research purposes only. Very limited human data. Not medical advice.",icon:"⚡"},
  {id:54,name:"Tesofensine Capsules",fullName:"Tesofensine — Triple Monoamine Reuptake Inhibitor",category:"Capsules",tags:["Weight Loss","Appetite Suppression","CNS"],summary:"Triple monoamine reuptake inhibitor (serotonin, NE, dopamine). Phase III for obesity. ~10–13% body weight reduction at 0.5 mg. Oral convenience. Very long half-life (~130 hours) — slow buildup requires caution.",mechanism:"Blocks reuptake of serotonin, norepinephrine, and dopamine. Appetite suppression via combined CNS reward and satiety pathways. Mild cholinesterase inhibitory activity.",startingDose:{amount:"0.25",unit:"mg",frequency:"Once daily",form:"Oral capsule"},commonDoses:["0.25 mg/day (start)","0.5 mg/day (standard — best efficacy/tolerability)","1 mg/day (higher side effects)"],cycleLength:"12–24 weeks; cardiovascular monitoring required",halfLife:"~130 hours (very long — errors compound slowly but persist)",benefits:["Strong appetite suppression","10–13% weight loss at 0.5 mg","Triple monoamine mechanism","Oral — no injection"],risks:["Cardiovascular: increased HR and blood pressure","Insomnia","Long half-life — slow error correction","Contraindicated in cardiovascular disease","Abuse potential caution"],avoidWith:["MAOIs (serotonin syndrome)","Other stimulants","Antidepressants","Cardiovascular disease"],sideEffects:["Elevated heart rate","Blood pressure increase","Dry mouth","Insomnia","Nausea","Dizziness"],note:"For research purposes only. Cardiovascular monitoring required. Not medical advice.",icon:"💊"},
  {id:55,name:"Shredtira",fullName:"Shredtira — Tirzepatide + Fat-Burning Compound Blend",category:"Amino Blends",tags:["GLP-1","Weight Loss","Blend","Fat Loss"],summary:"Vendor-specific research blend combining tirzepatide with complementary fat-burning agents (AOD-9604, L-carnitine, or MOTS-C depending on formulation). Designed for enhanced weight and fat loss beyond tirzepatide alone.",mechanism:"Tirzepatide: GIP/GLP-1 dual agonism for appetite suppression. Additional components target complementary pathways: AOD-9604 (lipolysis), L-carnitine (fatty acid oxidation), MOTS-C (AMPK activation).",startingDose:{amount:"Per blend formulation",unit:"",frequency:"Weekly (tirzepatide component)",form:"SubQ injection"},commonDoses:["Start at tirzepatide component equivalent of 2.5 mg — per vendor protocol"],cycleLength:"Continuous per tirzepatide protocol",halfLife:"Tirzepatide component (~5 days) dominates",storage:"Refrigerate per vendor instructions.",benefits:["Synergistic multi-mechanism weight loss","Convenience of combination","Tirzepatide backbone with complementary agents"],risks:["Blend standardization varies by vendor","Complex titration","Always obtain COA covering all components","GI side effects from tirzepatide component"],avoidWith:["Other GLP-1 agonists","Insulin without dose reduction"],sideEffects:["Per tirzepatide: nausea, GI effects primary"],note:"For research purposes only. Blend composition varies by vendor — always obtain COA. Not medical advice.",icon:"⚡"},
];

function ResearchPage(){
  const[sel,setSel]=useState(null);
  const[search,setSearch]=useState("");
  const[catF,setCatF]=useState("All");
  const cats=["All",...new Set(RESEARCH_DATA.map(r=>r.category))];
  const catColor={"GLP Agonists":"var(--teal)","Peptides":"var(--navy)","Nasal Sprays":"var(--peach)","Capsules":"var(--orange)","Supplies":"var(--muted2)","Amino Blends":"var(--teal)"};
  const filtered=RESEARCH_DATA.filter(r=>{
    if(search&&!r.name.toLowerCase().includes(search.toLowerCase())&&!r.tags.join(" ").toLowerCase().includes(search.toLowerCase())&&!(r.fullName||"").toLowerCase().includes(search.toLowerCase()))return false;
    if(catF!=="All"&&r.category!==catF)return false;
    return true;
  });

  if(sel){
    const r=sel;
    return(
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <button className="btn btn-ghost btn-sm" style={{marginBottom:16}} onClick={()=>setSel(null)}>← Back to Research Library</button>
        <div style={{background:"#fff",border:"1px solid var(--border2)",borderRadius:"var(--r)",overflow:"hidden",boxShadow:"0 2px 12px rgba(1,32,78,0.07)"}}>
          {/* Header */}
          <div style={{padding:"22px 26px 20px",background:"var(--navy)",borderBottom:"1px solid var(--border)"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:16}}>
              <div style={{fontSize:42,flexShrink:0}}>{r.icon}</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
                  {r.tags.map(t=><span key={t} style={{fontFamily:"var(--fm)",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:3,background:"rgba(246,220,172,0.15)",border:"1px solid rgba(246,220,172,0.25)",color:"var(--cream)",letterSpacing:.5}}>{t}</span>)}
                  <span style={{fontFamily:"var(--fm)",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:3,background:"rgba(2,131,145,0.2)",border:"1px solid rgba(2,131,145,0.35)",color:"#6ee7ef",letterSpacing:.5,marginLeft:"auto"}}>{r.category}</span>
                </div>
                <div style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:24,letterSpacing:"-.5px",marginBottom:4,color:"#fff"}}>{r.name}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.55)"}}>{r.fullName}</div>
              </div>
            </div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.72)",lineHeight:1.75,marginTop:14,borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:14}}>{r.summary}</div>
          </div>
          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderBottom:"1px solid var(--border)"}}>
            {[["Starting Dose",<div key="sd"><div style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:17,color:"var(--navy)"}}>{r.startingDose.amount} <span style={{fontSize:12,fontWeight:600}}>{r.startingDose.unit}</span></div><div style={{fontSize:11,color:"var(--muted2)",marginTop:2}}>{r.startingDose.frequency}</div><div style={{fontSize:10,color:"var(--muted)",marginTop:1,fontStyle:"italic"}}>{r.startingDose.form}</div></div>,"#e8f6f4"],["Half-Life",<div key="hl" style={{fontFamily:"var(--fm)",fontSize:13,fontWeight:700,color:"var(--teal)"}}>{r.halfLife}</div>,"#f0fafa"],["Cycle",<div key="cy" style={{fontSize:12,color:"var(--navy)",fontFamily:"var(--fm)",lineHeight:1.5}}>{r.cycleLength}</div>,"#f5f8fe"],["Storage",<div key="st" style={{fontSize:11,color:"var(--muted2)",lineHeight:1.5}}>{r.storage}</div>,"#fafaf8"]].map(([label,content,bg])=>(
              <div key={label} style={{padding:"14px 16px",borderRight:"1px solid var(--border)",background:bg}}>
                <div style={{fontSize:9,fontFamily:"var(--fm)",fontWeight:700,color:"var(--muted2)",textTransform:"uppercase",letterSpacing:1,marginBottom:7}}>{label}</div>
                {content}
              </div>
            ))}
          </div>
          {/* Titration */}
          {r.titration&&<div style={{padding:"13px 20px",borderBottom:"1px solid var(--border)",background:"rgba(2,131,145,0.04)"}}>
            <div style={{fontSize:9,fontFamily:"var(--fm)",fontWeight:700,color:"var(--teal)",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Titration Schedule</div>
            <div style={{fontSize:13,color:"var(--navy)",fontFamily:"var(--fm)",fontWeight:600}}>{r.titration}</div>
          </div>}
          {/* Common doses */}
          <div style={{padding:"14px 20px",borderBottom:"1px solid var(--border)"}}>
            <div style={{fontSize:9,fontFamily:"var(--fm)",fontWeight:700,color:"var(--muted2)",textTransform:"uppercase",letterSpacing:1,marginBottom:9}}>Common Dose Ranges (Research)</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {r.commonDoses.map((d,i)=><div key={i} style={{background:i===0?"rgba(2,131,145,0.06)":"var(--bg2)",border:`1px solid ${i===0?"rgba(2,131,145,0.25)":"var(--border2)"}`,borderRadius:"var(--r)",padding:"7px 12px",fontSize:12,fontFamily:"var(--fm)",color:i===0?"var(--teal)":"var(--muted2)"}}>{d}{i===0&&<span style={{marginLeft:8,fontSize:9,color:"var(--teal)",fontWeight:700,background:"rgba(2,131,145,0.1)",padding:"1px 6px",borderRadius:3}}>← START HERE</span>}</div>)}
            </div>
          </div>
          {/* Mechanism */}
          <div style={{padding:"14px 20px",borderBottom:"1px solid var(--border)"}}>
            <div style={{fontSize:9,fontFamily:"var(--fm)",fontWeight:700,color:"var(--muted2)",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Mechanism of Action</div>
            <div style={{fontSize:13,color:"var(--muted2)",lineHeight:1.75}}>{r.mechanism}</div>
          </div>
          {/* Benefits + Risks */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderBottom:"1px solid var(--border)"}}>
            <div style={{padding:"14px 18px",borderRight:"1px solid var(--border)",background:"rgba(2,131,145,0.02)"}}>
              <div style={{fontSize:9,fontFamily:"var(--fm)",fontWeight:700,color:"var(--teal)",textTransform:"uppercase",letterSpacing:1,marginBottom:9}}>Benefits / Research Findings</div>
              {(r.benefits||r.sideEffects).map((b,i)=><div key={i} style={{display:"flex",gap:8,fontSize:12,color:"var(--navy)",marginBottom:6}}><span style={{color:"var(--teal)",flexShrink:0,fontFamily:"var(--fm)"}}>✓</span>{b}</div>)}
            </div>
            <div style={{padding:"14px 18px",background:"rgba(248,85,37,0.02)"}}>
              <div style={{fontSize:9,fontFamily:"var(--fm)",fontWeight:700,color:"var(--orange)",textTransform:"uppercase",letterSpacing:1,marginBottom:9}}>Risks & Side Effects</div>
              {(r.risks||r.sideEffects).map((s,i)=><div key={i} style={{display:"flex",gap:8,fontSize:12,color:"var(--muted2)",marginBottom:6}}><span style={{color:"var(--orange)",flexShrink:0,fontFamily:"var(--fm)"}}>⚠</span>{s}</div>)}
            </div>
          </div>
          {/* Avoid With */}
          {r.avoidWith&&r.avoidWith.length>0&&<div style={{padding:"14px 20px",borderBottom:"1px solid var(--border)",background:"rgba(248,85,37,0.03)"}}>
            <div style={{fontSize:9,fontFamily:"var(--fm)",fontWeight:700,color:"var(--bad)",textTransform:"uppercase",letterSpacing:1,marginBottom:9}}>⚠ Do Not Combine With</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {r.avoidWith.map((a,i)=><span key={i} style={{background:"rgba(248,85,37,0.08)",border:"1px solid rgba(248,85,37,0.25)",borderRadius:"var(--r2)",padding:"4px 10px",fontSize:11,color:"var(--bad)",fontFamily:"var(--fm)",fontWeight:600}}>{a}</span>)}
            </div>
          </div>}
          {/* Disclaimer */}
          <div style={{padding:"12px 20px",background:"rgba(1,32,78,0.04)"}}>
            <div style={{fontSize:11,color:"var(--navy)",fontFamily:"var(--fm)",fontWeight:700,opacity:.65}}>⚠ {r.note}</div>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16,marginBottom:18,flexWrap:"wrap"}}>
        <div>
          <div className="page-title">Research Library</div>
          <div className="page-sub">Mechanisms, protocols, benefits, risks, and contraindications. For research purposes only — not medical advice.</div>
        </div>
        <div style={{position:"relative",minWidth:260}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"var(--muted2)",fontSize:14,pointerEvents:"none"}}>⌕</span>
          <input style={{background:"#fff",border:"1px solid var(--border2)",borderRadius:"var(--r)",padding:"9px 12px 9px 34px",color:"var(--navy)",fontSize:13,fontFamily:"var(--fb)",outline:"none",width:"100%"}} placeholder="Search by name, category, or tag..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
      </div>
      <div style={{display:"flex",gap:0,marginBottom:18,borderBottom:"1px solid var(--border2)",flexWrap:"wrap"}}>
        {cats.map(c=><button key={c} className={`cc${catF===c?" on":""}`} onClick={()=>setCatF(c)}>{c} <span style={{fontFamily:"var(--fm)",fontSize:9,opacity:.55,marginLeft:2}}>({RESEARCH_DATA.filter(r=>c==="All"||r.category===c).length})</span></button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {filtered.map(r=>(
          <div key={r.id} style={{background:"#fff",border:"1px solid var(--border2)",borderRadius:"var(--r)",overflow:"hidden",cursor:"pointer",transition:"all .14s",boxShadow:"0 1px 3px rgba(1,32,78,0.05)"}}
            onClick={()=>setSel(r)}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--teal)";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 4px 16px rgba(1,32,78,0.1)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="";e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
            <div style={{padding:"13px 15px",borderBottom:"1px solid var(--border)",background:"var(--navy)",display:"flex",gap:11,alignItems:"flex-start"}}>
              <span style={{fontSize:24,flexShrink:0}}>{r.icon}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:14,color:"#fff",marginBottom:1}}>{r.name}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,0.45)",marginBottom:5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.fullName}</div>
                <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
                  {r.tags.slice(0,3).map(t=><span key={t} style={{fontFamily:"var(--fm)",fontSize:8,fontWeight:700,padding:"1px 5px",borderRadius:2,background:"rgba(246,220,172,0.12)",border:"1px solid rgba(246,220,172,0.2)",color:"var(--cream)"}}>{t}</span>)}
                </div>
              </div>
            </div>
            <div style={{padding:"11px 13px"}}>
              <div style={{fontSize:11,color:"var(--muted2)",lineHeight:1.6,marginBottom:10,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{r.summary}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:9}}>
                <div style={{background:"var(--bg2)",borderRadius:"var(--r2)",padding:"6px 9px",border:"1px solid var(--border)"}}>
                  <div style={{fontSize:8,fontFamily:"var(--fm)",color:"var(--muted)",textTransform:"uppercase",letterSpacing:.8,marginBottom:2}}>Start dose</div>
                  <div style={{fontFamily:"var(--fh)",fontWeight:700,fontSize:12,color:"var(--teal)"}}>{r.startingDose.amount} <span style={{fontSize:10}}>{r.startingDose.unit}</span></div>
                  <div style={{fontSize:9,color:"var(--muted2)"}}>{r.startingDose.frequency}</div>
                </div>
                <div style={{background:"var(--bg2)",borderRadius:"var(--r2)",padding:"6px 9px",border:"1px solid var(--border)"}}>
                  <div style={{fontSize:8,fontFamily:"var(--fm)",color:"var(--muted)",textTransform:"uppercase",letterSpacing:.8,marginBottom:2}}>Cycle</div>
                  <div style={{fontFamily:"var(--fm)",fontWeight:700,fontSize:10,color:"var(--navy)",lineHeight:1.4}}>{r.cycleLength.split(",")[0].split("(")[0].trim().substring(0,36)}</div>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:9,fontFamily:"var(--fm)",color:catColor[r.category]||"var(--teal)",fontWeight:700,background:"rgba(2,131,145,0.06)",padding:"2px 7px",borderRadius:3,border:"1px solid rgba(2,131,145,0.15)"}}>{r.category}</span>
                <span style={{fontSize:11,color:"var(--teal)",fontFamily:"var(--fh)",fontWeight:700}}>Full guide →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:20,padding:"12px 16px",background:"rgba(248,85,37,0.04)",border:"1px solid rgba(248,85,37,0.15)",borderRadius:"var(--r2)",fontSize:12,color:"var(--bad)",fontFamily:"var(--fm)",fontWeight:600}}>
        ⚠ All content is for informational and research purposes only — not medical advice. Consult a qualified healthcare professional before beginning any research protocol.
      </div>
    </div>
  );
}

// ── STANDARDS PAGE DATA ───────────────────────────────────────────────────────
const INIT_STAGES=[
  {id:1,label:"Stage 1: Research",sub:"Price Tracking",icon:"⌕",accentFrom:"#01204e",accentTo:"#023a7a",
   points:["Track pricing across research peptide vendors","Centralize comparison data in one platform","Save you time finding the best value"]},
  {id:2,label:"Stage 2: Verification",sub:"COA Review",icon:"✦",accentFrom:"#015f6a",accentTo:"#028391",
   points:["Review each vendor's Certificates of Analysis","Check when products were last tested","Flag outdated or missing test results"]},
  {id:3,label:"Stage 3: Standards",sub:"6-Month Policy",icon:"⚖",accentFrom:"#7a3500",accentTo:"#b86a10",
   points:["All COAs must be under 6 months old to be listed","Old batches require fresh testing or clearance pricing","Enforcement begins when vendor signs agreement"]},
  {id:4,label:"Stage 4: Communication",sub:"Vendor Accountability",icon:"📡",accentFrom:"#014a52",accentTo:"#028391",
   points:["Notify vendors of policy requirements","Provide clear compliance timeline","Set expectations for platform participation"]},
  {id:5,label:"Stage 5: Enforcement",sub:"Platform Integrity",icon:"🛡",accentFrom:"#7a1a00",accentTo:"#c23000",
   points:["Remove non-compliant vendors from listings","Maintain quality standards over vendor quantity","Protect researcher trust through consistent enforcement"]},
];

const INIT_RESULT={
  title:"THE RESULT:",
  body:"Every vendor on Biosafe Hub meets verified testing standards — not just competitive pricing.",
  sub:"Current testing. Real accountability. Better decisions.",
};

const TEST_STANDARDS_LIST=[
  {id:1,name:"Identification",icon:"🔍",level:"Required",desc:"Confirms the product is what it claims to be via HPLC or mass spectrometry.",why:"Without identification testing you cannot confirm you have the correct compound.",badge:"BASELINE"},
  {id:2,name:"Net Purity",icon:"✦",level:"Required",desc:"Measures what percentage of the product is the stated peptide vs impurities. High-quality vendors show ≥98%.",why:"Impurities alter research outcomes and affect dosing accuracy.",badge:"BASELINE"},
  {id:3,name:"Net Quantity",icon:"⚖",level:"Required",desc:"Verifies the stated amount is actually present in the vial.",why:"A vial labeled 5mg containing 3mg means every dose in your research is wrong.",badge:"BASELINE"},
  {id:4,name:"Endotoxins",icon:"🦠",level:"Important",desc:"Tests for bacterial endotoxins that cause inflammatory reactions.",why:"Endotoxin contamination can cause fever and systemic inflammation.",badge:"IMPORTANT"},
  {id:5,name:"Sterility",icon:"🧫",level:"Important",desc:"Confirms the product is free from bacteria, fungi, and spores.",why:"Microbial contamination in injectable compounds is a serious research risk.",badge:"IMPORTANT"},
  {id:6,name:"Heavy Metals",icon:"⚗",level:"Advanced",desc:"Screens for lead, arsenic, cadmium, and mercury contamination.",why:"Heavy metals accumulate and indicate manufacturing quality.",badge:"ADVANCED"},
  {id:7,name:"Conformity",icon:"📋",level:"Advanced",desc:"Verifies solubility, pH, appearance, and reconstitution behavior.",why:"Full conformity confirms the product performs as specified under all parameters.",badge:"ADVANCED"},
];

function VendorStandardsPage(){
  const badgeColor={BASELINE:"rgba(2,131,145,0.08)",IMPORTANT:"rgba(250,169,104,0.1)",ADVANCED:"rgba(1,32,78,0.06)"};
  const badgeBorder={BASELINE:"rgba(2,131,145,0.3)",IMPORTANT:"rgba(250,169,104,0.35)",ADVANCED:"rgba(1,32,78,0.2)"};
  const badgeText={BASELINE:"var(--teal)",IMPORTANT:"#b86a10",ADVANCED:"var(--navy)"};
  const levelColor={Required:"var(--teal)",Important:"#b86a10",Advanced:"var(--navy)"};

  return(
    <div>
      <div className="page-title">Testing Standards</div>
      <div className="page-sub">How we evaluate and score every vendor on the platform. All vendors are measured against the same 7-point testing framework.</div>

      {/* Stats strip */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:0,marginBottom:24,border:"1px solid var(--border2)",borderRadius:"var(--r)",overflow:"hidden"}}>
        {[
          ["7/7 Vendors",VENDORS_INFO.filter(v=>v.testing==="7/7").length,"Full panel tested","var(--teal)"],
          ["Avg Score",(VENDORS_INFO.reduce((s,v)=>s+parseInt(v.testing),0)/VENDORS_INFO.length).toFixed(1)+"/7","Across all listed vendors","var(--navy)"],
          ["Meet Baseline (3+)",VENDORS_INFO.filter(v=>parseInt(v.testing)>=3).length,"Pass minimum standard","#b86a10"],
        ].map(([l,n,sub,c])=>(
          <div key={l} style={{background:"#fff",padding:"16px 20px",borderRight:"1px solid var(--border2)"}}>
            <div style={{fontSize:9,fontFamily:"var(--fm)",fontWeight:700,color:"var(--muted2)",textTransform:"uppercase",letterSpacing:1,marginBottom:5}}>{l}</div>
            <div style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:26,color:c,marginBottom:2}}>{n}</div>
            <div style={{fontSize:11,color:"var(--muted2)"}}>{sub}</div>
          </div>
        ))}
      </div>

      {/* 7-standard explanation list */}
      <div style={{background:"#fff",border:"1px solid var(--border2)",borderRadius:"var(--r)",overflow:"hidden",marginBottom:20}}>
        <div style={{padding:"13px 18px",borderBottom:"1px solid var(--border2)",background:"var(--bg2)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:14,color:"var(--navy)"}}>7-Point Testing Framework</span>
          <span style={{fontSize:11,color:"var(--muted2)",fontFamily:"var(--fm)"}}>What each standard means and why it matters</span>
        </div>
        {TEST_STANDARDS_LIST.map((s,i)=>(
          <div key={s.id} style={{display:"flex",alignItems:"stretch",borderBottom:i<TEST_STANDARDS_LIST.length-1?"1px solid var(--border)":"none"}}>
            {/* Number + icon column */}
            <div style={{width:48,background:badgeColor[s.badge],borderRight:"1px solid "+badgeBorder[s.badge],display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,padding:"12px 0",flexShrink:0}}>
              <span style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:14,color:badgeText[s.badge]}}>{i+1}</span>
              <span style={{fontSize:15}}>{s.icon}</span>
            </div>
            {/* Description */}
            <div style={{flex:1,padding:"12px 18px",borderRight:"1px solid var(--border)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                <span style={{fontFamily:"var(--fh)",fontWeight:700,fontSize:13,color:"var(--navy)"}}>{s.name}</span>
                <span style={{fontFamily:"var(--fm)",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:3,background:badgeColor[s.badge],border:"1px solid "+badgeBorder[s.badge],color:badgeText[s.badge],letterSpacing:.5}}>{s.badge}</span>
                <span style={{fontSize:10,color:levelColor[s.level],fontFamily:"var(--fh)",fontWeight:700,marginLeft:"auto"}}>{s.level}</span>
              </div>
              <div style={{fontSize:12,color:"var(--muted2)",lineHeight:1.6}}>{s.desc}</div>
            </div>
            {/* Why it matters */}
            <div style={{width:240,padding:"12px 16px",flexShrink:0,background:"var(--bg2)"}}>
              <div style={{fontSize:9,fontFamily:"var(--fm)",fontWeight:700,color:"var(--muted2)",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Why it matters</div>
              <div style={{fontSize:12,color:"var(--muted2)",lineHeight:1.6}}>{s.why}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Labs Directory */}
      <div style={{background:"#fff",border:"1px solid var(--border2)",borderRadius:"var(--r)",overflow:"hidden",marginBottom:20}}>
        <div style={{padding:"13px 18px",borderBottom:"1px solid var(--border2)",background:"var(--bg2)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:14,color:"var(--navy)"}}>Third-Party Testing Laboratories</span>
          <span style={{fontSize:11,color:"var(--muted2)",fontFamily:"var(--fm)"}}>Labs that appear in vendor COA documentation · ✓ = ISO 17025 accredited</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:0}}>
          {LABS_DATA.map((lab,i)=>(
            <div key={lab.id} style={{padding:"14px 18px",borderBottom:i<LABS_DATA.length-2?"1px solid var(--border)":"none",borderRight:i%2===0?"1px solid var(--border)":"none",display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{width:36,height:36,borderRadius:8,background:"var(--navy)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontFamily:"var(--fm)",fontWeight:700,fontSize:10,color:"#fff",letterSpacing:.3}}>{lab.badge}</span>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                  <span style={{fontFamily:"var(--fh)",fontWeight:700,fontSize:13,color:"var(--navy)"}}>{lab.fullName}</span>
                  {lab.iso&&<span style={{fontSize:9,fontFamily:"var(--fm)",fontWeight:700,padding:"1px 6px",borderRadius:3,background:"rgba(2,131,145,0.08)",border:"1px solid rgba(2,131,145,0.2)",color:"var(--teal)"}}>ISO 17025</span>}
                </div>
                <div style={{fontSize:11,color:"var(--muted2)",marginBottom:4,lineHeight:1.5}}>{lab.desc}</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
                  <span style={{fontSize:10,color:"var(--muted2)",fontFamily:"var(--fm)"}}>{lab.location}</span>
                  {lab.tags.map(t=><span key={t} style={{fontSize:9,fontFamily:"var(--fm)",fontWeight:600,padding:"1px 5px",borderRadius:2,background:"rgba(1,32,78,0.05)",color:"var(--navy)"}}>{t}</span>)}
                  <a href={`https://${lab.website}`} target="_blank" rel="noopener noreferrer" style={{fontSize:10,color:"var(--teal)",fontFamily:"var(--fm)",textDecoration:"none",marginLeft:"auto"}}>{lab.website} ↗</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vendor scorecard table */}
      <div style={{background:"#fff",border:"1px solid var(--border2)",borderRadius:"var(--r)",overflow:"hidden"}}>
        <div style={{padding:"13px 18px",borderBottom:"1px solid var(--border2)",background:"var(--bg2)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:14,color:"var(--navy)"}}>Vendor Scorecard</span>
          <span style={{fontSize:11,color:"var(--muted2)",fontFamily:"var(--fm)"}}>Based on vendor-submitted COA documentation</span>
        </div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Vendor</th>
                {TEST_STANDARDS_LIST.map(s=>(
                  <th key={s.id} style={{textAlign:"center",minWidth:36}} title={s.name}>{s.icon} <span style={{fontFamily:"var(--fm)",fontSize:8}}>{s.name.split(" ")[0]}</span></th>
                ))}
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {VENDORS_INFO.map(v=>{
                const score=parseInt(v.testing);
                return(
                  <tr key={v.id}>
                    <td>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <VendorLogo name={v.name} size={26}/>
                        <strong style={{fontFamily:"var(--fh)",fontSize:12,color:"var(--navy)"}}>{v.name}</strong>
                      </div>
                    </td>
                    {TEST_STANDARDS_LIST.map((_,si)=>(
                      <td key={si} style={{textAlign:"center"}}>
                        {si<score
                          ?<span style={{color:"var(--teal)",fontFamily:"var(--fm)",fontSize:13,fontWeight:700}}>✓</span>
                          :<span style={{color:"rgba(248,85,37,0.35)",fontFamily:"var(--fm)",fontSize:13}}>✗</span>
                        }
                      </td>
                    ))}
                    <td>
                      <span style={{fontFamily:"var(--fm)",fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:"var(--r2)",color:score>=6?"var(--teal)":score>=3?"#b86a10":"var(--bad)",background:score>=6?"rgba(2,131,145,0.08)":score>=3?"rgba(250,169,104,0.1)":"rgba(248,85,37,0.08)",border:`1px solid ${score>=6?"rgba(2,131,145,0.25)":score>=3?"rgba(250,169,104,0.3)":"rgba(248,85,37,0.2)"}`}}>{v.testing}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── FILTER DROPDOWN COMPONENT ────────────────────────────────────────────────
function FilterDropdown({filterTest,setFilterTest,filterPay,togglePay,filterStock,setFilterStock,filterDiscount,setFilterDiscount,filterShipping,setFilterShipping,filterLab,setFilterLab,activeFilters}){
  const[open,setOpen]=useState(false);
  const ref=useRef();
  useEffect(()=>{
    const h=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);
  const clearAll=()=>{setFilterTest("Any");setFilterPay&&setFilterPay([]);setFilterStock(false);if(setFilterDiscount)setFilterDiscount(0);if(setFilterShipping)setFilterShipping("Any");if(setFilterLab)setFilterLab("Any");setOpen(false);};
  return(
    <div style={{position:"relative"}} ref={ref}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{display:"flex",alignItems:"center",gap:7,padding:"6px 14px",borderRadius:20,border:"1px solid rgba(255,255,255,0.15)",background:activeFilters>0?"rgba(2,131,145,0.3)":"rgba(255,255,255,0.1)",cursor:"pointer",fontFamily:"var(--fh)",fontSize:12,fontWeight:600,color:activeFilters>0?"#fff":"rgba(255,255,255,0.7)",transition:"all .12s",whiteSpace:"nowrap"}}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        Filters
        {activeFilters>0&&<span style={{background:"var(--teal)",color:"#fff",borderRadius:"20px",padding:"1px 7px",fontSize:10,fontFamily:"var(--fm)",fontWeight:700}}>{activeFilters}</span>}
        <span style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginLeft:2}}>{open?"▲":"▼"}</span>
      </button>
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 8px)",left:0,zIndex:500,background:"#fff",border:"1px solid var(--border2)",borderRadius:12,padding:"18px 20px",boxShadow:"0 12px 40px rgba(1,32,78,0.18)",minWidth:580,display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px 28px"}}>
          <div>
            <div className="fp-label">Testing Standard</div>
            <div className="fp-chips">
              {["Any","3/7+","6/7+","7/7 Full"].map(t=>(
                <button key={t} className={`fchip${filterTest===t?" on":""}`} onClick={()=>setFilterTest(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="fp-label">Payment Method</div>
            <div className="fp-chips">
              {PAYMENT_OPTS.map(p=>(
                <button key={p} className={`fchip${filterPay.includes(p)?" on":""}`} onClick={()=>togglePay(p)}>{p}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="fp-label">Availability</div>
            <div className="fp-chips">
              <button className={`fchip${filterStock?" on":""}`} onClick={()=>setFilterStock(s=>!s)}>In Stock Only</button>
              <button className={`fchip${filterShipping==="HasCoupon"?" on":""}`} onClick={()=>setFilterShipping&&setFilterShipping(s=>s==="HasCoupon"?"Any":"HasCoupon")}>Has Coupon</button>
              <button className={`fchip${filterShipping==="Discounted"?" on":""}`} onClick={()=>setFilterShipping&&setFilterShipping(s=>s==="Discounted"?"Any":"Discounted")}>On Sale</button>
              <button className={`fchip${filterShipping==="Free"?" on":""}`} onClick={()=>setFilterShipping&&setFilterShipping(s=>s==="Free"?"Any":"Free")}>Free Shipping</button>
            </div>
          </div>
          <div>
            <div className="fp-label">Minimum Discount</div>
            <div className="fp-chips">
              {[[0,"Any"],[5,"5%+"],[10,"10%+"],[20,"20%+"],[30,"30%+"]].map(([val,label])=>(
                <button key={val} className={`fchip${filterDiscount===val&&val>0?" on":val===0&&filterDiscount===0?" on":""}`} onClick={()=>setFilterDiscount&&setFilterDiscount(filterDiscount===val&&val>0?0:val)}>{label}</button>
              ))}
            </div>
          </div>
          <div style={{gridColumn:"1/-1"}}>
            <div className="fp-label">Tested By Lab <span style={{fontSize:9,color:"var(--muted2)",fontWeight:400,marginLeft:4}}>— ✓ = ISO 17025 accredited</span></div>
            <div className="fp-chips">
              <button className={`fchip${!filterLab||filterLab==="Any"?" on":""}`} onClick={()=>setFilterLab&&setFilterLab("Any")}>Any Lab</button>
              {LABS_DATA.map(lab=>(
                <button key={lab.id} className={`fchip${filterLab===lab.name?" on":""}`}
                  onClick={()=>setFilterLab&&setFilterLab(filterLab===lab.name?"Any":lab.name)}
                  title={`${lab.fullName} — ${lab.location}`}>
                  {lab.iso&&<span style={{color:"var(--teal)",fontSize:9,marginRight:2}}>✓</span>}{lab.name}
                </button>
              ))}
            </div>
          </div>
          {activeFilters>0&&(
            <div style={{gridColumn:"1/-1",borderTop:"1px solid var(--border)",paddingTop:10,marginTop:2}}>
              <button className="btn btn-ghost btn-sm" style={{color:"var(--orange)",borderColor:"rgba(248,85,37,0.25)"}} onClick={clearAll}>
                ✕ Clear all filters ({activeFilters})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── VENDOR APP MODAL ──────────────────────────────────────────────────────────
function VendorAppModal({onClose}){
  const[f,setF]=useState({name:"",website:"",email:"",phone:"",products:"",tested:"",coa:"",shipping:"",coupon:"",api:"",labs:""});
  const s=(k,v)=>setF(p=>({...p,[k]:v}));
  return(
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="modal-title">Vendor Application</div>
        <div style={{marginBottom:14}}><div className="fs-title">Company Info</div>
          <div className="form-row" style={{marginBottom:9}}><div><label className="flabel">Company name *</label><input className="fi" value={f.name} onChange={e=>s("name",e.target.value)} placeholder="Acme Peptides"/></div><div><label className="flabel">Website *</label><input className="fi" value={f.website} onChange={e=>s("website",e.target.value)} placeholder="https://..."/></div></div>
          <div className="form-row"><div><label className="flabel">Email *</label><input className="fi" value={f.email} onChange={e=>s("email",e.target.value)} placeholder="contact@..."/></div><div><label className="flabel">Phone</label><input className="fi" value={f.phone} onChange={e=>s("phone",e.target.value)} placeholder="+1..."/></div></div>
        </div>
        <div style={{marginBottom:14}}><div className="fs-title">Products & Quality</div>
          <div className="fg"><label className="flabel">Products offered</label><textarea className="fi" rows={2} value={f.products} onChange={e=>s("products",e.target.value)} placeholder="BPC-157, TB-500..."/></div>
          <div className="form-row" style={{marginBottom:9}}><div><label className="flabel">3rd-party tested?</label><select className="fsel" value={f.tested} onChange={e=>s("tested",e.target.value)}><option value="">Select...</option><option>Yes — all products</option><option>Yes — some products</option><option>No</option></select></div><div><label className="flabel">COAs available?</label><select className="fsel" value={f.coa} onChange={e=>s("coa",e.target.value)}><option value="">Select...</option><option>Yes — public</option><option>On request</option><option>No</option></select></div></div>
          <div className="fg"><label className="flabel">Testing labs</label><input className="fi" value={f.labs} onChange={e=>s("labs",e.target.value)} placeholder="Janoshik, Chromate, Core Labs..."/></div>
        </div>
        <div><div className="fs-title">Logistics & Payment</div>
          <div className="form-row" style={{marginBottom:9}}><div><label className="flabel">Shipping speed</label><input className="fi" value={f.shipping} onChange={e=>s("shipping",e.target.value)} placeholder="2–3 days"/></div><div><label className="flabel">Active coupon</label><input className="fi" value={f.coupon} onChange={e=>s("coupon",e.target.value)} placeholder="CODE15 — 15% off"/></div></div>
          <div className="fg"><label className="flabel">Payment methods accepted</label>
            <select className="fsel" value={f.api} onChange={e=>s("api",e.target.value)}><option value="">Select all that apply...</option><option>Card only</option><option>Card + Crypto</option><option>Card + Crypto + Venmo</option><option>Crypto only</option><option>Wire + Crypto</option></select>
          </div>
        </div>
        <div className="modal-actions"><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-cyan" onClick={()=>{alert("Application submitted! We'll review within 3–5 business days.");onClose();}}>Submit Application</button></div>
      </div>
    </div>
  );
}

// ── ADMIN ─────────────────────────────────────────────────────────────────────
function Admin(){
  const[vendors,setVendors]=useState(ADMIN_VENDORS);
  const[filter,setFilter]=useState("all");
  const[sel,setSel]=useState(null);
  const[notes,setNotes]=useState({});
  const upd=(id,st)=>setVendors(v=>v.map(x=>x.id===id?{...x,status:st}:x));
  const cnt={all:vendors.length,pending:vendors.filter(v=>v.status==="pending").length,approved:vendors.filter(v=>v.status==="approved").length,rejected:vendors.filter(v=>v.status==="rejected").length};
  const list=filter==="all"?vendors:vendors.filter(v=>v.status===filter);
  return(
    <div>
      <div className="a-stats">{[["🏪","Total",cnt.all,"var(--accent)","rgba(44,255,179,0.08)"],["⏳","Pending",cnt.pending,"var(--warn)","rgba(245,166,35,0.08)"],["✓","Approved",cnt.approved,"var(--good)","rgba(0,255,157,0.08)"],["✗","Rejected",cnt.rejected,"var(--bad)","rgba(240,79,90,0.08)"]].map(([icon,l,n,c,bg])=>(
        <div key={l} className="as"><div className="as-icon" style={{background:bg,color:c}}>{icon}</div><div><div className="as-num" style={{color:c}}>{n}</div><div className="as-lbl">{l} Vendors</div></div></div>
      ))}</div>
      <div className="sb">
        <div className="sb-hdr"><div className="sb-title">Vendor Applications</div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{["all","pending","approved","rejected"].map(s=><button key={s} className={`fchip${filter===s?" on":""}`} onClick={()=>setFilter(s)}>{s.charAt(0).toUpperCase()+s.slice(1)} ({cnt[s]})</button>)}</div></div>
        <div className="tbl-wrap"><table className="tbl">
          <thead><tr><th>Vendor</th><th>Website</th><th>Email</th><th>Applied</th><th>Status</th><th>Products</th><th>Actions</th></tr></thead>
          <tbody>{list.map(v=>(
            <tr key={v.id}>
              <td><strong style={{fontFamily:"var(--fm)"}}>{v.name}</strong></td>
              <td><span style={{color:"var(--accent)",fontSize:11,fontFamily:"var(--fm)"}}>{v.website}</span></td>
              <td style={{color:"var(--muted3)",fontSize:11}}>{v.email}</td>
              <td style={{color:"var(--muted)",fontSize:11,fontFamily:"var(--fm)"}}>{v.applied}</td>
              <td><span className={`sp sp-${v.status}`}><span className="sp-dot"/>{v.status.charAt(0).toUpperCase()+v.status.slice(1)}</span></td>
              <td style={{fontFamily:"var(--fm)",fontSize:11}}>{v.products||"—"}</td>
              <td><div style={{display:"flex",gap:4}}>
                <button className="btn btn-ghost btn-xs" onClick={()=>setSel(v)}>Review</button>
                {v.status!=="approved"&&<button className="btn btn-xs" style={{background:"rgba(0,255,157,0.12)",color:"var(--good)",border:"1px solid rgba(0,255,157,0.3)"}} onClick={()=>upd(v.id,"approved")}>Approve</button>}
                {v.status!=="rejected"&&<button className="btn btn-xs btn-danger" onClick={()=>upd(v.id,"rejected")}>Reject</button>}
              </div></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
      {sel&&<div className="overlay" onClick={e=>e.target===e.currentTarget&&setSel(null)}><div className="modal">
        <div className="modal-title">{sel.name}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>{[["Website",sel.website],["Email",sel.email],["Applied",sel.applied],["Products",sel.products||"Pending"]].map(([l,v])=><div key={l}><div style={{fontSize:9,color:"var(--muted)",fontFamily:"var(--fm)",textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>{l}</div><div style={{fontSize:12,fontFamily:"var(--fm)"}}>{v}</div></div>)}</div>
        {sel.notes&&<div style={{background:"var(--bg3)",borderRadius:"var(--r2)",padding:10,fontSize:12,color:"var(--muted3)",marginBottom:11}}>{sel.notes}</div>}
        <div className="fg"><label className="flabel">Admin notes</label><textarea className="fi" rows={3} value={notes[sel.id]||""} onChange={e=>setNotes(n=>({...n,[sel.id]:e.target.value}))} placeholder="Internal notes..."/></div>
        <div className="modal-actions"><button className="btn btn-ghost" onClick={()=>setSel(null)}>Close</button>{sel.status!=="approved"&&<button className="btn btn-cyan" onClick={()=>{upd(sel.id,"approved");setSel(null);}}>Approve</button>}{sel.status!=="rejected"&&<button className="btn btn-danger" onClick={()=>{upd(sel.id,"rejected");setSel(null);}}>Reject</button>}</div>
      </div></div>}
    </div>
  );
}

// ── RESEARCH CMS ──────────────────────────────────────────────────────────────
function ResearchCMS(){
  const[entries,setEntries]=useState(RESEARCH_DATA);
  const[search,setSearch]=useState("");
  const[catF,setCatF]=useState("All");
  const[editing,setEditing]=useState(null);
  const cats=["All",...new Set(RESEARCH_DATA.map(r=>r.category))];
  const filtered=entries.filter(r=>{
    if(catF!=="All"&&r.category!==catF)return false;
    if(search&&!r.name.toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  });
  const emptyEntry=()=>({id:Date.now(),name:"",fullName:"",category:"Peptides",tags:[],summary:"",mechanism:"",startingDose:{amount:"",unit:"mcg",frequency:"Once daily",form:"Subcutaneous injection"},commonDoses:[""],cycleLength:"",titration:"",halfLife:"",storage:"",benefits:[""],risks:[""],avoidWith:[""],sideEffects:[""],note:"For research purposes only. Not medical advice.",icon:"🔬"});
  const save=(entry)=>{setEntries(prev=>prev.find(x=>x.id===entry.id)?prev.map(x=>x.id===entry.id?entry:x):[...prev,entry]);setEditing(null);};
  const del=(id)=>{if(window.confirm("Delete this entry?"))setEntries(prev=>prev.filter(x=>x.id!==id));};

  if(editing){
    const isNew=editing==="new";
    const EditForm=()=>{
      const[f,setF]=useState(isNew?emptyEntry():editing);
      const sf=(k,v)=>setF(p=>({...p,[k]:v}));
      const sfDose=(k,v)=>setF(p=>({...p,startingDose:{...p.startingDose,[k]:v}}));
      const arrSet=(k,i,v)=>setF(p=>({...p,[k]:p[k].map((x,xi)=>xi===i?v:x)}));
      const arrAdd=(k)=>setF(p=>({...p,[k]:[...p[k],""]}));
      const arrDel=(k,i)=>setF(p=>({...p,[k]:p[k].filter((_,xi)=>xi!==i)}));
      return(
        <div>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
            <button className="btn btn-ghost btn-sm" onClick={()=>setEditing(null)}>← Back to List</button>
            <div className="page-title" style={{margin:0}}>{isNew?"New Research Entry":`Editing: ${f.name||"Untitled"}`}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div><label className="flabel">Name *</label><input className="fi" value={f.name} onChange={e=>sf("name",e.target.value)} placeholder="BPC-157"/></div>
            <div><label className="flabel">Full Name</label><input className="fi" value={f.fullName} onChange={e=>sf("fullName",e.target.value)} placeholder="Body Protection Compound-157"/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:12}}>
            <div><label className="flabel">Category</label>
              <select className="fsel" value={f.category} onChange={e=>sf("category",e.target.value)}>
                {["GLP Agonists","Peptides","Nasal Sprays","Capsules","Supplies","Amino Blends"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="flabel">Icon</label><input className="fi" value={f.icon} onChange={e=>sf("icon",e.target.value)} placeholder="🔬"/></div>
            <div><label className="flabel">Tags (comma separated)</label><input className="fi" value={f.tags.join(", ")} onChange={e=>sf("tags",e.target.value.split(",").map(x=>x.trim()).filter(Boolean))} placeholder="Recovery, Anti-inflammatory"/></div>
          </div>
          <div style={{marginBottom:12}}><label className="flabel">Summary *</label><textarea className="fi" rows={3} value={f.summary} onChange={e=>sf("summary",e.target.value)} placeholder="Brief overview..."/></div>
          <div style={{marginBottom:12}}><label className="flabel">Mechanism of Action</label><textarea className="fi" rows={3} value={f.mechanism} onChange={e=>sf("mechanism",e.target.value)} placeholder="How it works..."/></div>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:12,marginBottom:12}}>
            <div className="fs-title">Starting Dose</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              <div><label className="flabel">Amount</label><input className="fi" value={f.startingDose.amount} onChange={e=>sfDose("amount",e.target.value)} placeholder="250"/></div>
              <div><label className="flabel">Unit</label><input className="fi" value={f.startingDose.unit} onChange={e=>sfDose("unit",e.target.value)} placeholder="mcg"/></div>
              <div><label className="flabel">Frequency</label><input className="fi" value={f.startingDose.frequency} onChange={e=>sfDose("frequency",e.target.value)} placeholder="Once daily"/></div>
              <div><label className="flabel">Form</label><input className="fi" value={f.startingDose.form} onChange={e=>sfDose("form",e.target.value)} placeholder="SubQ injection"/></div>
            </div>
          </div>
          {[["commonDoses","Common Dose Ranges","250 mcg/day (conservative)"],["benefits","Benefits / Research Findings","Tissue repair"],["risks","Risks","Not FDA-approved"],["avoidWith","Do Not Combine With","NSAIDs"],["sideEffects","Side Effects","Nausea at higher doses"]].map(([key,label,ph])=>(
            <div key={key} style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"var(--r)",padding:12,marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                <div className="fs-title" style={{marginBottom:0}}>{label}</div>
                <button className="btn btn-ghost btn-xs" onClick={()=>arrAdd(key)}>+ Add</button>
              </div>
              {f[key].map((item,i)=>(
                <div key={i} style={{display:"flex",gap:6,marginBottom:5}}>
                  <input className="fi" style={{flex:1}} value={item} onChange={e=>arrSet(key,i,e.target.value)} placeholder={ph}/>
                  <button className="btn btn-ghost btn-xs" style={{color:"var(--bad)"}} onClick={()=>arrDel(key,i)}>✕</button>
                </div>
              ))}
            </div>
          ))}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div><label className="flabel">Cycle Length</label><input className="fi" value={f.cycleLength} onChange={e=>sf("cycleLength",e.target.value)} placeholder="4–12 weeks"/></div>
            <div><label className="flabel">Half-Life</label><input className="fi" value={f.halfLife} onChange={e=>sf("halfLife",e.target.value)} placeholder="~2 hours"/></div>
            <div><label className="flabel">Titration (optional)</label><input className="fi" value={f.titration||""} onChange={e=>sf("titration",e.target.value)} placeholder="Start low, increase every 4 weeks"/></div>
            <div><label className="flabel">Storage</label><input className="fi" value={f.storage} onChange={e=>sf("storage",e.target.value)} placeholder="Refrigerate. Use within 28 days."/></div>
          </div>
          <div style={{marginBottom:20}}><label className="flabel">Research Note / Disclaimer</label><input className="fi" value={f.note} onChange={e=>sf("note",e.target.value)}/></div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
            <button className="btn btn-ghost" onClick={()=>setEditing(null)}>Cancel</button>
            <button className="btn btn-cyan" onClick={()=>{if(!f.name){alert("Name required.");return;}save(f);}}>Save Entry</button>
          </div>
        </div>
      );
    };
    return <EditForm/>;
  }

  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:12}}>
        <div>
          <div className="page-title">Research Library</div>
          <div className="page-sub">Add, edit, or remove entries from the public Research page. {entries.length} total entries.</div>
        </div>
        <button className="btn btn-cyan" onClick={()=>setEditing("new")}>+ Add Entry</button>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
        <input className="fi" style={{maxWidth:260}} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name..."/>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {cats.map(c=><button key={c} className={`fchip${catF===c?" on":""}`} onClick={()=>setCatF(c)}>{c}</button>)}
        </div>
      </div>
      <div style={{background:"#fff",border:"1px solid var(--border2)",borderRadius:"var(--r)",overflow:"hidden"}}>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Icon</th><th>Name</th><th>Category</th><th>Tags</th><th>Start Dose</th><th>Cycle</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r.id}>
                  <td style={{fontSize:20,textAlign:"center"}}>{r.icon}</td>
                  <td>
                    <div style={{fontFamily:"var(--fh)",fontWeight:700,fontSize:13,color:"var(--navy)"}}>{r.name}</div>
                    <div style={{fontSize:10,color:"var(--muted2)",marginTop:1}}>{r.fullName}</div>
                  </td>
                  <td><span style={{fontSize:10,fontFamily:"var(--fm)",fontWeight:700,padding:"2px 7px",borderRadius:3,background:"rgba(2,131,145,0.07)",color:"var(--teal)"}}>{r.category}</span></td>
                  <td><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{r.tags.slice(0,3).map(t=><span key={t} style={{fontSize:9,fontFamily:"var(--fm)",fontWeight:700,padding:"1px 5px",borderRadius:2,background:"rgba(1,32,78,0.06)",color:"var(--navy)"}}>{t}</span>)}</div></td>
                  <td style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--teal)",fontWeight:700}}>{r.startingDose.amount} {r.startingDose.unit}</td>
                  <td style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--muted2)"}}>{r.cycleLength?.split(",")[0]?.trim()?.substring(0,30)}</td>
                  <td><div style={{display:"flex",gap:4}}>
                    <button className="btn btn-ghost btn-xs" onClick={()=>setEditing(r)}>Edit</button>
                    <button className="btn btn-xs btn-danger" onClick={()=>del(r.id)}>Delete</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── CMS ADMIN ─────────────────────────────────────────────────────────────────
function CMS({vendors,setVendors,peptides,setPeptides,tickerDeals,setTickerDeals,onExit}){
  const[cmsTab,setCmsTab]=useState("dashboard");
  const[toast,showToast]=useToast();

  // ── Vendor CMS ──
  const[editV,setEditV]=useState(null);
  const[newV,setNewV]=useState(false);
  const emptyVendor=()=>({id:Date.now(),name:"",website:"",email:"",shipping:"",freeAt:"",testing:"0/7",products:0,payment:[],status:"approved",applied:new Date().toISOString().split("T")[0],notes:"",cat:"Research Peptides",desc:"",grad:"grad-a",emoji:"⚗"});
  const saveVendor=(v)=>{
    if(!v.name){alert("Vendor name required.");return;}
    setVendors(prev=>prev.find(x=>x.id===v.id)?prev.map(x=>x.id===v.id?v:x):[...prev,v]);
    setEditV(null);setNewV(false);showToast("Vendor saved: "+v.name);
  };
  const deleteVendor=(id)=>{if(!window.confirm("Delete this vendor?"))return;setVendors(p=>p.filter(x=>x.id!==id));showToast("Vendor deleted.");};

  // ── Peptide CMS ──
  const[editP,setEditP]=useState(null);
  const[editVendorRow,setEditVendorRow]=useState(null); // {peptideId, vendorIndex}
  const emptyPeptide=()=>({id:Date.now(),name:"",category:"Peptides",doses:["5mg"],defaultDose:"5mg",vendors:[],bestValuePpm:null,bestValueVendor:"",has30DayLow:false,history:[]});
  const emptyVendorRow=()=>({id:Date.now(),name:"",stock:"In Stock",price:0,origPrice:null,disc:0,ppm:null,coupon:"",couponDesc:"",shipping:"",payment:["Card"],tests:{pass:[],fail:[...TEST_STANDARDS],labs:[],note:""}});
  const savePeptide=(p)=>{
    if(!p.name){alert("Peptide name required.");return;}
    const recalc={...p,bestValuePpm:p.vendors.length?Math.min(...p.vendors.map(v=>v.ppm||Infinity)):null};
    setPeptides(prev=>prev.find(x=>x.id===p.id)?prev.map(x=>x.id===p.id?recalc:x):[...prev,recalc]);
    setEditP(null);showToast("Peptide saved: "+p.name);
  };
  const deletePeptide=(id)=>{if(!window.confirm("Delete this peptide?"))return;setPeptides(p=>p.filter(x=>x.id!==id));showToast("Peptide deleted.");};
  const saveVendorRow=(pid,vIdx,vRow)=>{
    setPeptides(prev=>prev.map(p=>{
      if(p.id!==pid)return p;
      const vs=vIdx===-1?[...p.vendors,vRow]:p.vendors.map((v,i)=>i===vIdx?vRow:v);
      const bestPpm=Math.min(...vs.map(v=>v.ppm||Infinity));
      return{...p,vendors:vs,bestValuePpm:isFinite(bestPpm)?bestPpm:null};
    }));
    setEditVendorRow(null);showToast("Vendor row saved.");
  };
  const deleteVendorRow=(pid,vIdx)=>{
    setPeptides(prev=>prev.map(p=>{
      if(p.id!==pid)return p;
      const vs=p.vendors.filter((_,i)=>i!==vIdx);
      const bestPpm=vs.length?Math.min(...vs.map(v=>v.ppm||Infinity)):null;
      return{...p,vendors:vs,bestValuePpm:isFinite(bestPpm)?bestPpm:null};
    }));
    showToast("Vendor row deleted.");
  };

  const VendorForm=({v,onSave,onCancel})=>{
    const[f,setF]=useState({...v});
    const sf=(k,val)=>setF(p=>({...p,[k]:val}));
    const togglePay=(pm)=>setF(p=>({...p,payment:p.payment.includes(pm)?p.payment.filter(x=>x!==pm):[...p.payment,pm]}));
    return(
      <div style={{background:"var(--bg3)",border:"1px solid var(--border2)",borderRadius:"var(--r)",padding:18,marginBottom:12}}>
        <div style={{fontFamily:"var(--fm)",fontSize:11,fontWeight:700,color:"var(--accent)",marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>{f.id===v.id&&v.name?"Edit Vendor":"New Vendor"}</div>
        <div className="form-row" style={{marginBottom:9}}>
          <div><label className="flabel">Name *</label><input className="fi" value={f.name} onChange={e=>sf("name",e.target.value)} placeholder="Vendor name"/></div>
          <div><label className="flabel">Website</label><input className="fi" value={f.website} onChange={e=>sf("website",e.target.value)} placeholder="vendor.com"/></div>
        </div>
        <div className="form-row" style={{marginBottom:9}}>
          <div><label className="flabel">Email</label><input className="fi" value={f.email} onChange={e=>sf("email",e.target.value)} placeholder="contact@..."/></div>
          <div><label className="flabel">Category</label><input className="fi" value={f.cat} onChange={e=>sf("cat",e.target.value)} placeholder="Research Peptides"/></div>
        </div>
        <div className="form-row" style={{marginBottom:9}}>
          <div><label className="flabel">Shipping cost</label><input className="fi" value={f.shipping} onChange={e=>sf("shipping",e.target.value)} placeholder="$9.99"/></div>
          <div><label className="flabel">Free shipping at ($)</label><input className="fi" value={f.freeAt} onChange={e=>sf("freeAt",e.target.value)} placeholder="100"/></div>
        </div>
        <div className="form-row" style={{marginBottom:9}}>
          <div><label className="flabel">Testing score</label>
            <select className="fsel" value={f.testing} onChange={e=>sf("testing",e.target.value)}>
              {["0/7","1/7","2/7","3/7","4/7","5/7","6/7","7/7"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div><label className="flabel">Status</label>
            <select className="fsel" value={f.status} onChange={e=>sf("status",e.target.value)}>
              <option>approved</option><option>pending</option><option>rejected</option>
            </select>
          </div>
        </div>
        <div style={{marginBottom:9}}>
          <label className="flabel">Payment methods</label>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {PAYMENT_OPTS.map(pm=>(
              <button key={pm} className={`fchip${f.payment.includes(pm)?" on":""}`} onClick={()=>togglePay(pm)}>{pm}</button>
            ))}
          </div>
        </div>
        <div style={{marginBottom:9}}><label className="flabel">Description</label><textarea className="fi" rows={2} value={f.desc} onChange={e=>sf("desc",e.target.value)} placeholder="Short vendor description..."/></div>
        <div style={{marginBottom:9}}><label className="flabel">Admin notes</label><textarea className="fi" rows={2} value={f.notes} onChange={e=>sf("notes",e.target.value)} placeholder="Internal notes..."/></div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button className="btn btn-ghost btn-sm" onClick={onCancel}>Cancel</button>
          <button className="btn btn-cyan btn-sm" onClick={()=>onSave(f)}>Save Vendor</button>
        </div>
      </div>
    );
  };

  const VendorRowForm=({vRow,onSave,onCancel})=>{
    const[f,setF]=useState({...vRow,tests:{...vRow.tests,pass:[...vRow.tests.pass],fail:[...vRow.tests.fail],labs:[...(vRow.tests.labs||[])]}});
    const sf=(k,val)=>setF(p=>({...p,[k]:val}));
    const toggleTest=(s)=>{
      const passing=f.tests.pass.includes(s);
      setF(p=>({...p,tests:{...p.tests,pass:passing?p.tests.pass.filter(x=>x!==s):[...p.tests.pass,s],fail:passing?[...p.tests.fail,s]:p.tests.fail.filter(x=>x!==s)}}));
    };
    const togglePay=(pm)=>setF(p=>({...p,payment:p.payment.includes(pm)?p.payment.filter(x=>x!==pm):[...p.payment,pm]}));
    return(
      <div style={{background:"var(--bg3)",border:"1px solid var(--border2)",borderRadius:"var(--r)",padding:16,marginTop:8}}>
        <div className="form-row" style={{marginBottom:9}}>
          <div><label className="flabel">Vendor name *</label>
            <select className="fsel" value={f.name} onChange={e=>sf("name",e.target.value)}>
              <option value="">Select vendor...</option>
              {VENDORS_INFO.map(v=><option key={v.id}>{v.name}</option>)}
            </select>
          </div>
          <div><label className="flabel">Stock status</label>
            <select className="fsel" value={f.stock} onChange={e=>sf("stock",e.target.value)}>
              <option>In Stock</option><option>Low Stock</option><option>Out of Stock</option>
            </select>
          </div>
        </div>
        <div className="form-row" style={{marginBottom:9}}>
          <div><label className="flabel">Current price ($)</label><input className="fi" value={f.price} onChange={e=>sf("price",parseFloat(e.target.value)||0)} type="number" step="0.01"/></div>
          <div><label className="flabel">Original price ($, leave blank if no discount)</label><input className="fi" value={f.origPrice||""} onChange={e=>sf("origPrice",e.target.value?parseFloat(e.target.value):null)} type="number" step="0.01"/></div>
        </div>
        <div className="form-row" style={{marginBottom:9}}>
          <div><label className="flabel">Discount % (0 = none)</label><input className="fi" value={f.disc} onChange={e=>sf("disc",parseInt(e.target.value)||0)} type="number"/></div>
          <div><label className="flabel">Price per mg ($/mg)</label><input className="fi" value={f.ppm||""} onChange={e=>sf("ppm",e.target.value?parseFloat(e.target.value):null)} type="number" step="0.01"/></div>
        </div>
        <div className="form-row" style={{marginBottom:9}}>
          <div><label className="flabel">Coupon code</label><input className="fi" value={f.coupon} onChange={e=>sf("coupon",e.target.value)} placeholder="CODE15"/></div>
          <div><label className="flabel">Coupon description</label><input className="fi" value={f.couponDesc} onChange={e=>sf("couponDesc",e.target.value)} placeholder="15% off sitewide"/></div>
        </div>
        <div style={{marginBottom:9}}><label className="flabel">Shipping speed</label><input className="fi" value={f.shipping} onChange={e=>sf("shipping",e.target.value)} placeholder="2–3 days"/></div>
        <div style={{marginBottom:9}}>
          <label className="flabel">Payment methods</label>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {PAYMENT_OPTS.map(pm=><button key={pm} className={`fchip${f.payment.includes(pm)?" on":""}`} onClick={()=>togglePay(pm)}>{pm}</button>)}
          </div>
        </div>
        <div style={{marginBottom:9}}>
          <label className="flabel">Testing standards passed</label>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {TEST_STANDARDS.map(s=>(
              <button key={s} className={`fchip${f.tests.pass.includes(s)?" on g":""}`} onClick={()=>toggleTest(s)}>{f.tests.pass.includes(s)?"✓ ":""}{s}</button>
            ))}
          </div>
        </div>
        <div style={{marginBottom:9}}><label className="flabel">Testing labs (comma separated)</label><input className="fi" value={f.tests.labs.join(", ")} onChange={e=>setF(p=>({...p,tests:{...p.tests,labs:e.target.value.split(",").map(x=>x.trim()).filter(Boolean)}}))} placeholder="Janoshik, Chromate"/></div>
        <div style={{marginBottom:9}}><label className="flabel">Testing note</label><input className="fi" value={f.tests.note} onChange={e=>setF(p=>({...p,tests:{...p.tests,note:e.target.value}}))} placeholder="e.g. Batch tested on most products"/></div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <button className="btn btn-ghost btn-sm" onClick={onCancel}>Cancel</button>
          <button className="btn btn-cyan btn-sm" onClick={()=>onSave(f)}>Save</button>
        </div>
      </div>
    );
  };

  return(
    <div style={{minHeight:"100vh",background:"var(--bg)"}}>
      <style>{css}</style>
      {toast&&<div className="toast">{toast}</div>}
      {/* CMS nav */}
      <div style={{background:"var(--bg2)",borderBottom:"1px solid var(--border2)",padding:"0 24px",height:54,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div className="logo"><svg width="32" height="32" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="18" fill="#01204e"/><ellipse cx="50" cy="50" rx="34" ry="13" fill="none" stroke="#028391" strokeWidth="2" opacity="0.9"/><ellipse cx="50" cy="50" rx="34" ry="13" fill="none" stroke="#028391" strokeWidth="2" opacity="0.9" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="34" ry="13" fill="none" stroke="#028391" strokeWidth="2" opacity="0.9" transform="rotate(120 50 50)"/><circle cx="50" cy="50" r="8" fill="#028391"/><circle cx="50" cy="50" r="4.5" fill="#f6dcac"/><circle cx="84" cy="50" r="4.5" fill="#faa968"/><circle cx="33" cy="21" r="4.5" fill="#faa968"/><circle cx="33" cy="79" r="4.5" fill="#faa968"/></svg><span style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:17,letterSpacing:"-.4px"}}><span className="logo-bio">Biosafe</span><span className="logo-hub"> Hub</span></span><span style={{fontSize:11,color:"var(--bad)",fontFamily:"var(--fm)",fontWeight:700,marginLeft:6}}>ADMIN</span></div>
        </div>
        <div style={{display:"flex",gap:2,background:"rgba(255,255,255,0.04)",border:"1px solid var(--border)",borderRadius:"var(--r2)",padding:3}}>
          {[["dashboard","🏠 Dashboard"],["vendors","Vendors"],["peptides","Peptides & Prices"],["promos","Promotions"],["standards","Testing Page"],["research","Research Library"],["apps","Applications"]].map(([k,l])=>(
            <button key={k} className={`nl${cmsTab===k?" on":""}`} onClick={()=>setCmsTab(k)}>{l}</button>
          ))}
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onExit}>← Back to Site</button>
      </div>

      <div className="page">
        {/* ── DASHBOARD TAB ── */}
        {cmsTab==="dashboard"&&(
          <div>
            {/* Welcome header */}
            <div style={{background:"var(--navy)",borderRadius:"var(--r)",padding:"24px 28px",marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
              <div>
                <div style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:22,color:"#fff",marginBottom:4}}>Welcome back 👋</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.5)"}}>Biosafe Hub Admin Dashboard — manage your entire platform from here.</div>
              </div>
              <button className="btn btn-cyan" onClick={onExit}>← View Live Site</button>
            </div>

            {/* Stats grid */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
              {[
                ["🧬","Peptides Listed",peptides.length,"var(--teal)","rgba(2,131,145,0.08)"],
                ["🏪","Active Vendors",vendors.filter(v=>v.status==="approved").length,"var(--navy)","rgba(1,32,78,0.06)"],
                ["🏷","Active Coupons",peptides.flatMap(p=>p.vendors).filter(v=>v.coupon).length,"#b86a10","rgba(250,169,104,0.08)"],
                ["⏳","Pending Applications",ADMIN_VENDORS.filter(v=>v.status==="pending").length,"var(--orange)","rgba(248,85,37,0.06)"],
              ].map(([icon,label,val,color,bg])=>(
                <div key={label} style={{background:"#fff",border:"1px solid var(--border2)",borderRadius:"var(--r)",padding:"18px 20px",boxShadow:"0 1px 4px rgba(1,32,78,0.06)"}}>
                  <div style={{fontSize:24,marginBottom:8}}>{icon}</div>
                  <div style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:28,color,marginBottom:4}}>{val}</div>
                  <div style={{fontSize:12,color:"var(--muted2)",fontFamily:"var(--fm)"}}>{label}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{marginBottom:20}}>
              <div style={{fontFamily:"var(--fh)",fontWeight:700,fontSize:14,color:"var(--navy)",marginBottom:12}}>Quick Actions</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                {[
                  ["➕","Add New Peptide","Add a peptide and vendor listings","vendors",()=>setCmsTab("peptides")],
                  ["🏪","Manage Vendors","Edit vendor info, testing scores, and shipping","vendors",()=>setCmsTab("vendors")],
                  ["🏷","Edit Deal Ticker","Update the live promotions carousel","promos",()=>setCmsTab("promos")],
                  ["📊","View Promotions","See all active coupons at a glance","promos",()=>setCmsTab("promos")],
                  ["🧪","Testing Page","Update the 7-point testing standards","standards",()=>setCmsTab("standards")],
                  ["📋","Applications","Review vendor applications","apps",()=>setCmsTab("apps")],
                ].map(([icon,title,desc,,action])=>(
                  <div key={title} onClick={action} style={{background:"#fff",border:"1px solid var(--border2)",borderRadius:"var(--r)",padding:"16px 18px",cursor:"pointer",transition:"all .14s",boxShadow:"0 1px 4px rgba(1,32,78,0.05)"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--teal)";e.currentTarget.style.transform="translateY(-1px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="";e.currentTarget.style.transform="";}}>
                    <div style={{fontSize:22,marginBottom:8}}>{icon}</div>
                    <div style={{fontFamily:"var(--fh)",fontWeight:700,fontSize:13,color:"var(--navy)",marginBottom:4}}>{title}</div>
                    <div style={{fontSize:11,color:"var(--muted2)",lineHeight:1.5}}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Peptide overview table */}
            <div style={{background:"#fff",border:"1px solid var(--border2)",borderRadius:"var(--r)",overflow:"hidden",marginBottom:20}}>
              <div style={{padding:"12px 18px",borderBottom:"1px solid var(--border2)",background:"var(--bg2)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:14,color:"var(--navy)"}}>Peptide Overview</span>
                <button className="btn btn-cyan btn-sm" onClick={()=>setCmsTab("peptides")}>Manage All →</button>
              </div>
              <div className="tbl-wrap">
                <table className="tbl">
                  <thead><tr><th>Peptide</th><th>Category</th><th>Vendors</th><th>Best $/mg</th><th>30-Day Low</th><th>Coupons</th></tr></thead>
                  <tbody>{peptides.map(p=>(
                    <tr key={p.id}>
                      <td><strong style={{fontFamily:"var(--fh)",fontSize:13,color:"var(--navy)"}}>{p.name}</strong></td>
                      <td><span style={{fontSize:10,fontFamily:"var(--fm)",fontWeight:700,padding:"2px 7px",borderRadius:3,background:"rgba(2,131,145,0.07)",color:"var(--teal)"}}>{p.category}</span></td>
                      <td style={{fontFamily:"var(--fm)",fontSize:12}}>{p.vendors.length}</td>
                      <td style={{fontFamily:"var(--fm)",fontSize:12,color:"var(--teal)",fontWeight:700}}>{p.bestValuePpm?`$${p.bestValuePpm.toFixed(2)}`:"—"}</td>
                      <td>{p.has30DayLow?<span style={{fontSize:10,fontFamily:"var(--fm)",fontWeight:700,color:"var(--teal)",background:"rgba(2,131,145,0.08)",padding:"2px 7px",borderRadius:3}}>Active</span>:<span style={{fontSize:10,color:"var(--muted2)"}}>—</span>}</td>
                      <td style={{fontFamily:"var(--fm)",fontSize:12}}>{p.vendors.filter(v=>v.coupon).length}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>

            {/* Pending applications alert */}
            {ADMIN_VENDORS.filter(v=>v.status==="pending").length>0&&(
              <div style={{background:"rgba(248,85,37,0.05)",border:"1px solid rgba(248,85,37,0.2)",borderRadius:"var(--r)",padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <span style={{fontSize:20}}>⏳</span>
                  <div>
                    <div style={{fontFamily:"var(--fh)",fontWeight:700,fontSize:13,color:"var(--bad)"}}>Pending Applications</div>
                    <div style={{fontSize:12,color:"var(--muted2)"}}>{ADMIN_VENDORS.filter(v=>v.status==="pending").length} vendor application{ADMIN_VENDORS.filter(v=>v.status==="pending").length>1?"s":""} waiting for review</div>
                  </div>
                </div>
                <button className="btn btn-sm" style={{background:"var(--bad)",color:"#fff",border:"none"}} onClick={()=>setCmsTab("apps")}>Review Now →</button>
              </div>
            )}
          </div>
        )}

        {/* ── VENDORS TAB ── */}
        {cmsTab==="vendors"&&(
          <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
              <div><div className="page-title">Manage Vendors</div><div className="page-sub">Add, edit, or remove vendors from the platform.</div></div>
              <button className="btn btn-cyan" onClick={()=>{setNewV(true);setEditV(null);}}>+ Add Vendor</button>
            </div>
            {newV&&<VendorForm v={emptyVendor()} onSave={saveVendor} onCancel={()=>setNewV(false)}/>}
            {editV&&<VendorForm v={editV} onSave={saveVendor} onCancel={()=>setEditV(null)}/>}
            <div className="sb">
              <div className="sb-hdr"><div className="sb-title">All Vendors ({vendors.length})</div></div>
              <div className="tbl-wrap"><table className="tbl">
                <thead><tr><th>Name</th><th>Website</th><th>Status</th><th>Testing</th><th>Products</th><th>Payment</th><th>Shipping</th><th>Actions</th></tr></thead>
                <tbody>{vendors.map(v=>(
                  <tr key={v.id}>
                    <td><strong style={{fontFamily:"var(--fm)"}}>{v.name}</strong><div style={{fontSize:10,color:"var(--muted3)"}}>{v.email}</div></td>
                    <td style={{fontSize:11,color:"var(--accent)",fontFamily:"var(--fm)"}}>{v.website}</td>
                    <td><span className={`sp sp-${v.status}`}><span className="sp-dot"/>{v.status}</span></td>
                    <td style={{fontFamily:"var(--fm)",fontSize:11,color:v.testing==="7/7"?"var(--good)":parseInt(v.testing)>=3?"var(--warn)":"var(--bad)"}}>{v.testing}</td>
                    <td style={{fontFamily:"var(--fm)",fontSize:11}}>{v.products}</td>
                    <td><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{(v.payment||[]).map(p=><span key={p} className={`pay-chip ${PAY_CLASS[p]||""}`}>{p}</span>)}</div></td>
                    <td style={{fontSize:11,color:"var(--muted3)"}}>{v.shipping} {v.freeAt&&<span style={{color:"var(--good)",fontSize:10}}>(Free ${v.freeAt}+)</span>}</td>
                    <td><div style={{display:"flex",gap:5}}>
                      <button className="btn btn-ghost btn-xs" onClick={()=>{setEditV(v);setNewV(false);}}>Edit</button>
                      <button className="btn btn-xs btn-danger" onClick={()=>deleteVendor(v.id)}>Delete</button>
                    </div></td>
                  </tr>
                ))}</tbody>
              </table></div>
            </div>
          </div>
        )}

        {/* ── PEPTIDES & PRICES TAB ── */}
        {cmsTab==="peptides"&&(
          <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
              <div><div className="page-title">Manage Peptides & Prices</div><div className="page-sub">Add peptides, manage vendor listings, update prices, coupons, and stock status.</div></div>
              <button className="btn btn-cyan" onClick={()=>savePeptide(emptyPeptide())}>+ Add Peptide</button>
            </div>
            {peptides.map(p=>(
              <div key={p.id} className="sb" style={{marginBottom:14}}>
                <div className="sb-hdr">
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    {editP?.id===p.id
                      ? <input className="fi" style={{width:200}} value={editP.name} onChange={e=>setEditP(x=>({...x,name:e.target.value}))}/>
                      : <div className="sb-title">{p.name}</div>
                    }
                    <span style={{fontSize:10,color:"var(--muted3)",fontFamily:"var(--fm)",background:"var(--bg4)",border:"1px solid var(--border)",borderRadius:3,padding:"2px 7px"}}>{p.category}</span>
                    <span style={{fontSize:10,color:"var(--muted3)",fontFamily:"var(--fm)"}}>{p.vendors.length} vendor{p.vendors.length!==1?"s":""}</span>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    {editP?.id===p.id
                      ? <>
                          <div style={{display:"flex",gap:5,alignItems:"center"}}>
                            <label className="flabel" style={{margin:0}}>Category:</label>
                            <select className="fsel" style={{width:160}} value={editP.category} onChange={e=>setEditP(x=>({...x,category:e.target.value}))}>
                              {CATS.filter(c=>c!=="All").map(c=><option key={c}>{c}</option>)}
                            </select>
                          </div>
                          <button className="btn btn-cyan btn-xs" onClick={()=>savePeptide(editP)}>Save Name</button>
                          <button className="btn btn-ghost btn-xs" onClick={()=>setEditP(null)}>Cancel</button>
                        </>
                      : <button className="btn btn-ghost btn-xs" onClick={()=>setEditP({...p})}>Edit Name</button>
                    }
                    <button className="btn btn-xs btn-danger" onClick={()=>deletePeptide(p.id)}>Delete Peptide</button>
                  </div>
                </div>

                {/* Dose tabs editor */}
                <div style={{padding:"8px 15px",borderBottom:"1px solid var(--border)",background:"var(--bg3)",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:9,color:"var(--muted)",fontFamily:"var(--fm)",textTransform:"uppercase",letterSpacing:1}}>Dose options:</span>
                  {p.doses.map((d,di)=>(
                    <span key={di} style={{display:"flex",alignItems:"center",gap:3}}>
                      <span className="dtab on" style={{cursor:"default"}}>{d}</span>
                      <button onClick={()=>setPeptides(prev=>prev.map(x=>x.id===p.id?{...x,doses:x.doses.filter((_,i)=>i!==di)}:x))} style={{background:"none",border:"none",color:"var(--bad)",cursor:"pointer",fontSize:12,lineHeight:1,fontFamily:"var(--fm)"}}>✕</button>
                    </span>
                  ))}
                  <button className="btn btn-ghost btn-xs" onClick={()=>{const d=prompt("New dose option (e.g. 10mg):");if(d)setPeptides(prev=>prev.map(x=>x.id===p.id?{...x,doses:[...x.doses,d]}:x));}}>+ Dose</button>
                  <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:9,color:"var(--muted)",fontFamily:"var(--fm)"}}>30-DAY LOW:</span>
                    <button className={`fchip${p.has30DayLow?" on g":""}`} onClick={()=>setPeptides(prev=>prev.map(x=>x.id===p.id?{...x,has30DayLow:!x.has30DayLow}:x))}>{p.has30DayLow?"Active":"Inactive"}</button>
                  </div>
                </div>

                {/* Vendor rows */}
                <div>
                  {p.vendors.map((v,vi)=>(
                    <div key={v.id}>
                      {editVendorRow?.peptideId===p.id&&editVendorRow?.vIdx===vi
                        ? <div style={{padding:"0 15px 12px"}}><VendorRowForm vRow={v} onSave={(vr)=>saveVendorRow(p.id,vi,vr)} onCancel={()=>setEditVendorRow(null)}/></div>
                        : <div style={{padding:"10px 15px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                            <span className={`vr-rank${vi===0?" gold":""}`}>#{vi+1}</span>
                            <span style={{fontFamily:"var(--fm)",fontSize:12,fontWeight:700,minWidth:130}}>{v.name}</span>
                            <div style={{display:"flex",gap:4}}>
                              <span style={{fontFamily:"var(--fm)",fontSize:12,fontWeight:700,color:"var(--text)"}}>${v.price.toFixed(2)}</span>
                              {v.origPrice&&<span style={{fontSize:11,color:"var(--muted)",textDecoration:"line-through",fontFamily:"var(--fm)"}}>${v.origPrice.toFixed(2)}</span>}
                              {v.disc>0&&<span className="pb-pct">-{v.disc}%</span>}
                              {v.ppm&&<span style={{fontSize:10,color:"var(--accent)",fontFamily:"var(--fm)"}}>${v.ppm}/mg</span>}
                            </div>
                            {v.coupon&&<span className="vr-coupon" style={{margin:0,width:"auto"}}>◇ {v.coupon}</span>}
                            <span className={`vm ${v.stock==="In Stock"?"ok":v.stock==="Low Stock"?"lw":"bd"}`}>{v.stock}</span>
                            <div style={{display:"flex",gap:3}}>{v.payment.map(pm=><span key={pm} className={`pay-chip ${PAY_CLASS[pm]||""}`}>{pm}</span>)}</div>
                            <span style={{fontSize:10,color:"var(--good)",fontFamily:"var(--fm)"}}>{v.tests.pass.length}/7 tested</span>
                            <div style={{marginLeft:"auto",display:"flex",gap:5}}>
                              <button className="btn btn-ghost btn-xs" onClick={()=>setEditVendorRow({peptideId:p.id,vIdx:vi})}>Edit</button>
                              <button className="btn btn-xs btn-danger" onClick={()=>deleteVendorRow(p.id,vi)}>Remove</button>
                            </div>
                          </div>
                      }
                    </div>
                  ))}
                  {editVendorRow?.peptideId===p.id&&editVendorRow?.vIdx===-1
                    ? <div style={{padding:"0 15px 12px"}}><VendorRowForm vRow={emptyVendorRow()} onSave={(vr)=>saveVendorRow(p.id,-1,vr)} onCancel={()=>setEditVendorRow(null)}/></div>
                    : <div style={{padding:"10px 15px"}}>
                        <button className="btn btn-ghost btn-xs" onClick={()=>setEditVendorRow({peptideId:p.id,vIdx:-1})}>+ Add Vendor to {p.name}</button>
                      </div>
                  }
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── PROMOTIONS TAB ── */}
        {cmsTab==="promos"&&(
          <div>
            <div className="page-title">Promotions & Coupons</div>
            <div className="page-sub">Edit the live deal ticker and manage active coupons across vendors.</div>

            {/* TICKER EDITOR */}
            <div style={{background:"#fff",border:"1px solid var(--border2)",borderRadius:"var(--r)",overflow:"hidden",marginBottom:20}}>
              <div style={{padding:"12px 18px",borderBottom:"1px solid var(--border2)",background:"var(--bg2)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:14,color:"var(--navy)"}}>Live Deal Ticker</span>
                <button className="btn btn-cyan btn-sm" onClick={()=>setTickerDeals(p=>[...p,"New deal text here"])}>+ Add Deal</button>
              </div>
              <div style={{padding:"14px 18px",display:"flex",flexDirection:"column",gap:8}}>
                {tickerDeals.map((d,i)=>(
                  <div key={i} style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--muted2)",minWidth:20}}>#{i+1}</span>
                    <input className="fi" style={{flex:1}} value={d} onChange={e=>setTickerDeals(p=>p.map((x,xi)=>xi===i?e.target.value:x))}/>
                    <button className="btn btn-ghost btn-sm" style={{color:"var(--bad)",flexShrink:0}} onClick={()=>setTickerDeals(p=>p.filter((_,xi)=>xi!==i))}>✕</button>
                  </div>
                ))}
                {tickerDeals.length===0&&<div style={{fontSize:12,color:"var(--muted2)",padding:"8px 0"}}>No deals — click + Add Deal to get started.</div>}
              </div>
            </div>
            <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"var(--r)",overflow:"hidden",marginBottom:16}}>
              <div className="sb-hdr"><div className="sb-title">Active Coupons</div></div>
              <div className="tbl-wrap"><table className="tbl">
                <thead><tr><th>Peptide</th><th>Vendor</th><th>Coupon Code</th><th>Description</th><th>Discount</th><th>Current Price</th><th>Original Price</th></tr></thead>
                <tbody>{peptides.flatMap(p=>p.vendors.filter(v=>v.coupon).map(v=>(
                  <tr key={`${p.id}-${v.id}`}>
                    <td style={{fontFamily:"var(--fm)",fontWeight:700,fontSize:12}}>{p.name}</td>
                    <td style={{fontSize:12}}>{v.name}</td>
                    <td><span className="vr-coupon" style={{display:"inline-flex",margin:0,width:"auto"}}>◇ {v.coupon}</span></td>
                    <td style={{fontSize:11,color:"var(--muted3)"}}>{v.couponDesc}</td>
                    <td><span className="pb-pct">-{v.disc}%</span></td>
                    <td style={{fontFamily:"var(--fm)",fontWeight:700}}>${v.price.toFixed(2)}</td>
                    <td style={{fontFamily:"var(--fm)",color:"var(--muted)",textDecoration:"line-through"}}>{v.origPrice?`$${v.origPrice.toFixed(2)}`:"—"}</td>
                  </tr>
                )))}</tbody>
              </table></div>
            </div>
            <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"var(--r)",overflow:"hidden"}}>
              <div className="sb-hdr"><div className="sb-title">30-Day Low Active</div></div>
              <div className="tbl-wrap"><table className="tbl">
                <thead><tr><th>Peptide</th><th>30-Day Low Active</th><th>Toggle</th></tr></thead>
                <tbody>{peptides.map(p=>(
                  <tr key={p.id}>
                    <td style={{fontFamily:"var(--fm)",fontWeight:700,fontSize:12}}>{p.name}</td>
                    <td><span style={{fontSize:12,color:p.has30DayLow?"var(--good)":"var(--muted3)",fontFamily:"var(--fm)",fontWeight:700}}>{p.has30DayLow?"✓ Active":"Inactive"}</span></td>
                    <td><button className={`fchip${p.has30DayLow?" on g":""}`} onClick={()=>setPeptides(prev=>prev.map(x=>x.id===p.id?{...x,has30DayLow:!x.has30DayLow}:x))}>{p.has30DayLow?"Deactivate":"Activate"}</button></td>
                  </tr>
                ))}</tbody>
              </table></div>
            </div>
          </div>
        )}

        {/* ── APPLICATIONS TAB ── */}
        {cmsTab==="apps"&&<Admin/>}

        {/* ── STANDARDS CMS TAB ── */}
        {cmsTab==="standards"&&(
          <div style={{maxWidth:560,margin:"0 auto",paddingTop:40,textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:16}}>🧪</div>
            <div className="page-title" style={{marginBottom:8}}>Testing Page</div>
            <div className="page-sub" style={{marginBottom:24}}>The Testing page content is managed directly on the live site — no CMS editing needed here.</div>
            <div style={{background:"rgba(2,131,145,0.05)",border:"1px solid rgba(2,131,145,0.2)",borderRadius:"var(--r)",padding:"20px 24px",textAlign:"left"}}>
              <div style={{fontFamily:"var(--fh)",fontWeight:700,fontSize:13,color:"var(--navy)",marginBottom:12}}>What's on the Testing page:</div>
              {["7-point testing framework with descriptions","Vendor scorecard table with ✓/✗ for each standard","Stats showing average scores across all vendors"].map((item,i)=>(
                <div key={i} style={{display:"flex",gap:10,fontSize:13,color:"var(--muted2)",marginBottom:8}}>
                  <span style={{color:"var(--teal)",fontFamily:"var(--fm)"}}>✓</span>{item}
                </div>
              ))}
            </div>
            <div style={{marginTop:20,padding:"14px 18px",background:"rgba(250,169,104,0.08)",border:"1px solid rgba(250,169,104,0.25)",borderRadius:"var(--r)",fontSize:13,color:"var(--navy)"}}>
              💡 To update vendor test scores, go to the <strong>Vendors tab</strong> and edit the Testing score field for each vendor.
            </div>
            <button className="btn btn-cyan" style={{marginTop:24}} onClick={onExit}>← Go to Testing Page</button>
          </div>
        )}

        {/* ── RESEARCH LIBRARY TAB ── */}
        {cmsTab==="research"&&<ResearchCMS/>}
      </div>
    </div>
  );
}

// ── DEAL CAROUSEL ─────────────────────────────────────────────────────────────
function DealCarousel({deals}){
  const[idx,setIdx]=useState(0);
  if(!deals||!deals.length)return null;
  const prev=()=>setIdx(i=>(i-1+deals.length)%deals.length);
  const next=()=>setIdx(i=>(i+1)%deals.length);
  return(
    <div style={{marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
      <button onClick={prev} style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.7)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,transition:"all .12s"}}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.2)"}
        onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}>‹</button>
      <div style={{flex:1,background:"linear-gradient(135deg,rgba(2,131,145,0.6),rgba(1,32,78,0.8))",border:"1px solid rgba(2,131,145,0.4)",borderRadius:12,padding:"14px 24px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 20% 50%,rgba(250,169,104,0.08),transparent 60%)",pointerEvents:"none"}}/>
        <div style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:15,color:"#fff",letterSpacing:.3}}>{deals[idx]}</div>
        <div style={{display:"flex",justifyContent:"center",gap:5,marginTop:8}}>
          {deals.map((_,i)=>(
            <div key={i} onClick={()=>setIdx(i)} style={{width:i===idx?16:6,height:6,borderRadius:3,background:i===idx?"var(--peach)":"rgba(255,255,255,0.25)",cursor:"pointer",transition:"all .2s"}}/>
          ))}
        </div>
      </div>
      <button onClick={next} style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.7)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0,transition:"all .12s"}}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.2)"}
        onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}>›</button>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App(){
  // Secret admin route — access via ?admin in the URL
  const isAdminRoute=typeof window!=="undefined"&&window.location.search.includes("admin");
  const[adminMode,setAdminMode]=useState(isAdminRoute);

  // Shared state so CMS edits reflect on public site
  const[vendors,setVendors]=useState(VENDORS_INFO);
  const[peptides,setPeptides]=useState(PEPTIDES_DATA);

  const[tab,setTab]=useState("compare");
  const[search,setSearch]=useState("");
  const[cat,setCat]=useState("All");
  const[sort,setSort]=useState("name");
  const[viewMode,setViewMode]=useState("list");
  const[filterTest,setFilterTest]=useState("Any");
  const[filterPay,setFilterPay]=useState([]);
  const[filterStock,setFilterStock]=useState(false);
  const[filterDiscount,setFilterDiscount]=useState(0); // minimum discount %
  const[filterShipping,setFilterShipping]=useState("Any");
  const[filterLab,setFilterLab]=useState("Any");
  const[showApp,setShowApp]=useState(false);
  const[showGlobalAlert,setShowGlobalAlert]=useState(false);
  const[cartItems,setCartItems]=useState([]);
  const[toast,showToast]=useToast();
  const[tickerDeals,setTickerDeals]=useState(["🌸 SPRING SALE — 28% OFF","RESEARCH15 — 15% off PureRawz","SWISS10 — 10% off Swisschems","derek — 10% off FelixChem","peptideprice — 10% off Ion Peptide","LL20 — BOGO 50% Limitless Life"]);

  const togglePay=(p)=>setFilterPay(prev=>prev.includes(p)?prev.filter(x=>x!==p):[...prev,p]);

  const addToCart=(peptide,vendor,dose)=>{
    setCartItems(prev=>[...prev,{peptide:peptide.name,vendor:vendor.name,dose,price:vendor.price,origPrice:vendor.origPrice,coupon:vendor.coupon,couponDesc:vendor.couponDesc,qty:1}]);
  };

  const filtered=useMemo(()=>{
    let out=[...peptides];
    if(search)out=out.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()));
    if(cat!=="All")out=out.filter(p=>p.category===cat);
    // Apply filters to vendors within each peptide
    out=out.map(p=>({...p,vendors:p.vendors.filter(v=>{
      // Testing filter
      const score=v.tests.pass.length;
      if(filterTest==="7/7 Full"&&score<7)return false;
      if(filterTest==="6/7+"&&score<6)return false;
      if(filterTest==="3/7+"&&score<3)return false;
      // Payment filter
      if(filterPay.length>0&&!filterPay.every(fp=>v.payment.includes(fp)))return false;
      // Stock filter
      if(filterStock&&v.stock==="Out of Stock")return false;
      // Discount filter
      if(filterDiscount>0&&(v.disc||0)<filterDiscount)return false;
      // Shipping filter
      if(filterShipping==="Free"&&!v.shipping?.toLowerCase().includes("free"))return false;
      if(filterShipping==="HasCoupon"&&!v.coupon)return false;
      if(filterShipping==="Discounted"&&!(v.disc>0))return false;
      // Lab filter
      if(filterLab!=="Any"&&!(v.tests?.labs||[]).some(l=>l.toLowerCase().includes(filterLab.toLowerCase())))return false;
      return true;
    })})).filter(p=>p.vendors.length>0);
    if(sort==="name")out.sort((a,b)=>a.name.localeCompare(b.name));
    else if(sort==="name-z")out.sort((a,b)=>b.name.localeCompare(a.name));
    else if(sort==="discount")out.sort((a,b)=>Math.max(...b.vendors.map(v=>v.disc))-Math.max(...a.vendors.map(v=>v.disc)));
    return out;
  },[search,cat,sort,filterTest,filterPay,filterStock]);

  const pending=ADMIN_VENDORS.filter(v=>v.status==="pending").length;
  const cartQty=cartItems.reduce((s,i)=>s+i.qty,0);
  const totalDeals=peptides.reduce((s,p)=>s+p.vendors.filter(v=>v.coupon).length,0);
  const activeFilters=(filterTest!=="Any"?1:0)+filterPay.length+(filterStock?1:0)+(filterDiscount>0?1:0)+(filterShipping!=="Any"?1:0)+(filterLab!=="Any"?1:0);

  // Featured deal — best discount across all peptides
  const allVendors=peptides.flatMap(p=>p.vendors.map(v=>({...v,peptideName:p.name})));
  const featuredVendor=allVendors.reduce((best,v)=>v.disc>=(best?.disc||0)?v:best,null);

  // Show CMS if in admin mode — placed after all hooks
  if(adminMode) return <CMS vendors={vendors} setVendors={setVendors} peptides={peptides} setPeptides={setPeptides} tickerDeals={tickerDeals} setTickerDeals={setTickerDeals} onExit={()=>setAdminMode(false)}/>;

  return(
    <div>
      <style>{css}</style>
      {toast&&<div className="toast">{toast}</div>}
      {showApp&&<VendorAppModal onClose={()=>setShowApp(false)}/>}
      {showGlobalAlert&&<AlertModal peptide={null} onClose={()=>setShowGlobalAlert(false)}/>}

      <nav className="nav">
        <div className="logo" onClick={()=>{if(window._ppClickCount===undefined)window._ppClickCount=0;window._ppClickCount++;if(window._ppClickCount>=5){window._ppClickCount=0;setAdminMode(true);}setTimeout(()=>{if(window._ppClickCount<5)window._ppClickCount=0;},3000);}}>
          {/* Biosafe Hub Logo — atom/molecule mark */}
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="18" fill="#01204e"/>
            <ellipse cx="50" cy="50" rx="34" ry="13" fill="none" stroke="#028391" strokeWidth="2" opacity="0.9"/>
            <ellipse cx="50" cy="50" rx="34" ry="13" fill="none" stroke="#028391" strokeWidth="2" opacity="0.9" transform="rotate(60 50 50)"/>
            <ellipse cx="50" cy="50" rx="34" ry="13" fill="none" stroke="#028391" strokeWidth="2" opacity="0.9" transform="rotate(120 50 50)"/>
            <circle cx="50" cy="50" r="8" fill="#028391"/>
            <circle cx="50" cy="50" r="4.5" fill="#f6dcac"/>
            <circle cx="84" cy="50" r="4.5" fill="#faa968"/>
            <circle cx="33" cy="21" r="4.5" fill="#faa968"/>
            <circle cx="33" cy="79" r="4.5" fill="#faa968"/>
          </svg>
          <span style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:17,letterSpacing:"-.4px"}}>
            <span className="logo-bio">Biosafe</span><span className="logo-hub"> Hub</span>
          </span>
        </div>
        <div className="nav-links">
          {[["compare","Compare"],["vendors","Retailers"],["standards","Testing"],["research","Research"],["reviews","Reviews"],["calculator","Calculator"],["cart","Cart"]].map(([k,l])=>(
            <button key={k} className={`nl${tab===k?" on":""}`} onClick={()=>setTab(k)}>
              {l}
              {k==="cart"&&cartQty>0&&<span className="nb">{cartQty}</span>}
            </button>
          ))}
        </div>
        <div className="nav-r">
          <button className="btn btn-ghost btn-sm" onClick={()=>setShowApp(true)}>+ List Vendor</button>
          <button className="btn btn-cyan btn-sm" style={{position:"relative"}} onClick={()=>setTab("cart")}>
            🛒{cartQty>0&&<span style={{position:"absolute",top:-6,right:-6,background:"var(--bad)",color:"#fff",fontSize:9,fontWeight:700,padding:"1px 5px",borderRadius:3,fontFamily:"var(--fm)"}}>{cartQty}</span>}
          </button>
        </div>
      </nav>

      {tab==="compare"&&(
        <div style={{background:"var(--navy)",minHeight:"100vh",paddingBottom:40}}>

          {/* HERO — transparent on navy bg */}
          <div className="hero" style={{background:"transparent",border:"none",flexDirection:"column",alignItems:"center",textAlign:"center",gap:20,paddingBottom:28}}>
            <div style={{width:"100%",maxWidth:700}}>
              <div className="hero-eyebrow" style={{justifyContent:"center"}}>Research · Compare · Verify</div>
              <h1 style={{textAlign:"center"}}>Verified prices.<br/><em>Verified vendors.</em></h1>
              <div className="hero-sub" style={{textAlign:"center",maxWidth:"100%",margin:"0 auto 20px"}}>Aggregate research peptide prices from verified vendors. Testing scores, live pricing, coupon codes — all in one place. We don't sell anything.</div>

              {/* Large centered search */}
              <div style={{position:"relative",maxWidth:600,margin:"0 auto 20px"}}>
                <span style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,0.4)",fontSize:16,pointerEvents:"none"}}>⌕</span>
                <input value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="Search peptides (BPC-157, TB-500, Semax...)..."
                  style={{width:"100%",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,padding:"14px 16px 14px 44px",color:"#fff",fontSize:15,fontFamily:"var(--fb)",outline:"none",boxSizing:"border-box",transition:"all .15s"}}
                  onFocus={e=>e.target.style.border="1px solid rgba(2,131,145,0.6)"}
                  onBlur={e=>e.target.style.border="1px solid rgba(255,255,255,0.15)"}/>
              </div>
            </div>

            {/* Hero stat pills — now below the content */}
            <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
              {[[peptides.length.toString(),"Peptides listed"],[ADMIN_VENDORS.filter(v=>v.status==="approved").length.toString(),"Verified vendors"],[totalDeals.toString(),"Active coupons"],[peptides.filter(p=>p.has30DayLow).length.toString(),"30-day lows"]].map(([v,l])=>(
                <div key={l} className="hero-stat-pill" style={{flexDirection:"row"}}>
                  <span className="hsp-val">{v}</span>
                  <span className="hsp-lbl">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DEAL CAROUSEL + FILTER BAR — same width as content */}
          <div style={{maxWidth:1560,margin:"0 auto",padding:"0 24px"}}>
            <DealCarousel deals={tickerDeals}/>

            {/* FILTER + CATEGORY + VIEW — dark floating card — overflow visible so dropdown isn't cut */}
            <div style={{marginBottom:8,borderRadius:12,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 2px 12px rgba(1,32,78,0.18)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px 20px",gap:6,flexWrap:"wrap",borderRadius:"12px 12px 0 0"}}>
                {/* Filters button */}
                <div style={{flexShrink:0}}>
                  <FilterDropdown
                    filterTest={filterTest} setFilterTest={setFilterTest}
                    filterPay={filterPay} togglePay={togglePay}
                    filterStock={filterStock} setFilterStock={setFilterStock}
                    filterDiscount={filterDiscount} setFilterDiscount={setFilterDiscount}
                    filterShipping={filterShipping} setFilterShipping={setFilterShipping}
                    filterLab={filterLab} setFilterLab={setFilterLab}
                    activeFilters={activeFilters}
                  />
                </div>
                {/* Divider */}
                <div style={{width:1,height:20,background:"rgba(255,255,255,0.15)",margin:"0 4px"}}/>
                {/* Category pills — centered */}
                {CATS.map(c=>(
                  <button key={c} className={`cc${cat===c?" on":""}`} onClick={()=>setCat(c)}>{c}</button>
                ))}
                {/* Divider */}
                <div style={{width:1,height:20,background:"rgba(255,255,255,0.15)",margin:"0 4px"}}/>
                {/* View toggle */}
                <div style={{display:"flex",gap:3,flexShrink:0}}>
                  <button className={`vbtn${viewMode==="list"?" on":""}`} style={{background:viewMode==="list"?"var(--teal)":"rgba(255,255,255,0.1)",color:viewMode==="list"?"#fff":"rgba(255,255,255,0.5)",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)"}} onClick={()=>setViewMode("list")}>☰</button>
                  <button className={`vbtn${viewMode==="grid"?" on":""}`} style={{background:viewMode==="grid"?"var(--teal)":"rgba(255,255,255,0.1)",color:viewMode==="grid"?"#fff":"rgba(255,255,255,0.5)",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)"}} onClick={()=>setViewMode("grid")}>⊞</button>
                </div>
              </div>
              {/* Sort row — centered */}
              <div style={{borderTop:"1px solid rgba(255,255,255,0.08)",padding:"7px 20px",display:"flex",gap:6,alignItems:"center",justifyContent:"center",flexWrap:"wrap",borderRadius:"0 0 12px 12px"}}>
                <span style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontFamily:"var(--fm)",fontWeight:700,letterSpacing:.5}}>SORT:</span>
                {[["name","Name A–Z"],["name-z","Name Z–A"],["discount","Best Discount"]].map(([k,l])=>(
                  <button key={k} onClick={()=>setSort(k)} style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"var(--fh)",transition:"all .12s",background:sort===k?"var(--teal)":"rgba(255,255,255,0.07)",color:sort===k?"#fff":"rgba(255,255,255,0.6)",border:sort===k?"1px solid var(--teal)":"1px solid rgba(255,255,255,0.1)"}}>{l}</button>
                ))}
                <button className="btn btn-ghost btn-sm" style={{marginLeft:4,color:"rgba(255,255,255,0.6)",borderColor:"rgba(255,255,255,0.15)"}} onClick={()=>setShowGlobalAlert(true)}>🔔 Price Alerts</button>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT — padded container on navy */}
          <div style={{maxWidth:1560,margin:"0 auto",padding:"0 24px"}}>

            {/* STATS ROW — floating white card */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:0,marginBottom:16,border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 12px rgba(1,32,78,0.2)"}}>
              {[["Peptides Listed",peptides.length,"b"],["Active Vendors",ADMIN_VENDORS.filter(v=>v.status==="approved").length,""],["Active Coupons",totalDeals,"o"],["30-Day Lows",peptides.filter(p=>p.has30DayLow).length,"g"],["Full 7/7 Tested",peptides.reduce((s,p)=>s+p.vendors.filter(v=>v.tests.pass.length===7).length,0),"g"]].map(([label,val,cls],i,arr)=>(
                <div key={label} style={{background:"rgba(255,255,255,0.06)",padding:"14px 18px",borderRight:i<arr.length-1?"1px solid rgba(255,255,255,0.08)":"none"}}>
                  <div style={{fontSize:9,fontFamily:"var(--fm)",fontWeight:700,color:"rgba(255,255,255,0.45)",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{label}</div>
                  <div style={{fontFamily:"var(--fh)",fontWeight:800,fontSize:26,color:cls==="b"?"var(--teal)":cls==="o"?"var(--peach)":cls==="g"?"var(--teal)":"#fff"}}>{val}</div>
                </div>
              ))}
            </div>

            {/* FEATURED DEAL — glowing card on navy */}
            {featuredVendor&&(
              <div style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(2,131,145,0.4)",borderRadius:14,padding:"18px 24px",marginBottom:16,display:"flex",alignItems:"center",gap:16,backdropFilter:"blur(2px)"}}>
                {/* Left — deal info */}
                <div style={{flex:1,minWidth:0}}>
                  <div className="fd-tag">⭐ BEST DEAL OF THE DAY</div>
                  <div className="fd-name" style={{color:"#fff"}}>{featuredVendor.peptideName} — {featuredVendor.name}</div>
                  <div className="fd-detail">{featuredVendor.coupon&&`Use code: ${featuredVendor.coupon} · `}{featuredVendor.ppm&&`$${featuredVendor.ppm.toFixed(2)}/mg · `}{featuredVendor.shipping}</div>
                </div>
                {/* Right — price */}
                <div style={{textAlign:"right",flexShrink:0,marginLeft:"auto"}}>
                  {featuredVendor.origPrice&&<div className="fd-orig">${featuredVendor.origPrice.toFixed(2)}</div>}
                  <div className="fd-price">${featuredVendor.price.toFixed(2)}</div>
                  <div className="fd-save">−{featuredVendor.disc}% · save ${(featuredVendor.origPrice-featuredVendor.price).toFixed(2)}</div>
                </div>
                <button className="btn btn-green btn-sm" style={{flexShrink:0}} onClick={()=>alert("Visiting "+featuredVendor.name)}>Shop Now →</button>
              </div>
            )}

            {/* PEPTIDE LISTINGS */}
            {filtered.length===0
              ?<div style={{textAlign:"center",padding:"60px 20px",color:"rgba(255,255,255,0.5)",fontFamily:"var(--fh)"}}>
                <div style={{fontSize:34,marginBottom:10}}>🔬</div>
                <div>No results match your filters.</div>
                <button className="btn btn-ghost btn-sm" style={{marginTop:10,borderColor:"rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.7)"}} onClick={()=>{setFilterTest("Any");setFilterPay([]);setFilterStock(false);setFilterDiscount(0);setFilterShipping("Any");setSearch("");}}>Clear all filters</button>
              </div>
              : viewMode==="grid"
                ? <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(380px,1fr))",gap:12,alignItems:"start"}}>
                    {filtered.map(p=><PeptideGroup key={p.id} p={p} onAddCart={addToCart} showToast={showToast} isGridView={true}/>)}
                  </div>
                : filtered.map(p=><PeptideGroup key={p.id} p={p} onAddCart={addToCart} showToast={showToast} isGridView={false}/>)
            }
          </div>
        </div>
      )}

      {tab==="vendors"&&<div className="page"><VendorInfoPage vendors={vendors}/></div>}
      {tab==="standards"&&<div className="page"><VendorStandardsPage/></div>}
      {tab==="research"&&<div className="page"><ResearchPage/></div>}
      {tab==="reviews"&&<div className="page"><ReviewsPage/></div>}
      {tab==="calculator"&&<div className="page"><div className="page-title">Peptide Calculator</div><div className="page-sub">Reconstitution, dosing, and draw volume calculations. For accurate research preparation only.</div><Calculator/></div>}
      {tab==="cart"&&<div className="page"><Cart items={cartItems} setItems={setCartItems}/></div>}
    </div>
  );
}
