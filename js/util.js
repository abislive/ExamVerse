'use strict';

/* ============================================================
   Deterministic RNG + numeric helpers
============================================================ */
function mulberry32(a){
  return function(){
    a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

var RNG = mulberry32(Date.now() & 0xffffffff);
function seedRNG(seed){ RNG = mulberry32(seed >>> 0); }
function rnd(){ return RNG(); }
function R(a, b){ return a + Math.floor(rnd() * (b - a + 1)); }
function P(arr){ return arr[Math.floor(rnd() * arr.length)]; }

function fmt(n){
  if(!Number.isFinite(n)) return String(n);
  return String(Math.round(n * 1000) / 1000);
}

function shuffle(a){
  for(var i = a.length - 1; i > 0; i--){
    var j = Math.floor(rnd() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function pickN(arr, n){
  var c = arr.slice();
  shuffle(c);
  return c.slice(0, n);
}

function gcd(a, b){ while(b){ var t = a % b; a = b; b = t; } return a; }

/* ============================================================
   Global safety net — never show a blank page
============================================================ */
window.addEventListener('error', function(e){
  var f = document.getElementById('fatal');
  if(f){
    f.style.display = 'block';
    f.textContent = 'Runtime error: ' + (e.message || e) +
                    '\n' + (e.filename || '') + ':' + (e.lineno || '');
  }
});