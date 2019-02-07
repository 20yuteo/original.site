// Based on: https://twitter.com/jn3008_/status/1070806655514959872
// Fork of: https://codepen.io/Alca/pen/KbZqYM

let points = [];
let weights = [];
let size = 600;

function setup() {
  let weightCount = 5;
  for (let i = 0; i < weightCount; i++) {
    weights.push(createVector(size * 0.3, 0).rotate(i / weightCount * TAU));
  }
  let count = 17 * 3;
  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      let p = createVector(x, y);
      if (x % 2 === 1) {
        p.addY(0.5);
      }
      if (p.y > count - 1) {
        continue;
      }
      p.div(count - 1).sub(0.5).mult(size);
      p._mag = p.mag();
      if (p._mag > size * 0.5) {
        continue;
      }
      points.push(p);
      p.extraRot = p._mag / size * TAU * 2;
      p.closestWeight = {
        p,
        dist: Infinity
      };
      for (let w of weights) {
        let d = p.dist(w);
        if (d < p.closestWeight.dist) {
          p.closestWeight = {
            w,
            dist: d
          };
        }
      }
      p.closestWeight.dist_ = p.closestWeight.dist * 0.01;
      // p.v = createVector(p.closestWeight.dist * 0.075, 0);
      p.v = createVector(ease.cubic.out(p.closestWeight.dist, 10, size * 0.075 - 10, size), 0);
      p.ease = ease.circ.in(size - p.closestWeight.dist, 1, -2, size) * TAU * 2;
    }
  }
}

function draw(e) {
  let time = e * 0.008;
  let time_ = -time * 0.3;
  beginPath();
  points.forEach(p => {
    let v = p.v._.mult(sin(time_ + p.closestWeight.dist_ + p.extraRot))
      .rotate(p.ease + time)
      .add(p);
    circle(v.x, v.y, 1);
  });
  fill();
}


7
8
9
10
$(function() {	

  //マウスを乗せたら発動
  $('.jumbotron-heading').hover(function() {

    window.location.href = "homework01.html#";

  });
});
