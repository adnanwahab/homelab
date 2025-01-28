
const wgslVertex = `
struct Uniforms {
    iResolution : vec2<f32>,
    iTime       : f32,
    iMouse      : vec4<f32>,
};

@group(0) @binding(0) var<uniform> uniforms : Uniforms;

struct VertexInput {
    @location(0) position : vec3<f32>,
    @location(1) uv       : vec2<f32>,
};

struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) vUV : vec2<f32>,
};

@vertex
fn vert_main(input: VertexInput) -> VertexOutput {
    var out : VertexOutput;
    out.Position = vec4<f32>(input.position, 1.0);
    out.vUV = input.uv;
    return out;
}
`;

    const wgslFragment = `
// ... Paste the frag_main WGSL code from above ...
// Make sure to match the layout with your Uniforms struct or remove any mismatch.
@group(0) @binding(0)
var<uniform> uniforms : Uniforms;

let PI    : f32 = 3.1415926535;
let TAU   : f32 = 6.2831853070;
let SCALE : f32 = 1.0;

fn gm(
    rgb    : vec3<f32>,
    param  : f32,
    t      : f32,
    w      : f32,
    d      : f32,
    invert : bool
) -> vec3<f32> {
    // Placeholder
    return vec3<f32>(0.0);
}

fn ds(
    uv     : vec2<f32>,
    se     : f32,
    t      : f32,
    px     : f32,
    param4 : f32,
    param5 : f32
) -> f32 {
    // Placeholder
    return 0.0;
}

struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) vUV : vec2<f32>,
};

@fragment
fn frag_main(in: VertexOutput) -> @location(0) vec4<f32> {
    let R       = uniforms.iResolution;
    let iTime   = uniforms.iTime;
    var m       = uniforms.iMouse;
    let XY      = in.vUV * R;

    var t = iTime / PI * 2.0;

    // Remap mouse if needed
    if (R.x > 0.0 && R.y > 0.0) {
        m.x = (m.x * 2.0 / R.x) - 1.0;
        m.y = (m.y * 2.0 / R.y) - 1.0;
    }

    if (m.z > 0.0) {
        t = t + m.y * SCALE;
    }

    let z = if (m.z > 0.0) {
        pow(1.0 - abs(m.y), sign(m.y))
    } else {
        1.0
    };

    let e = if (m.z > 0.0) {
        pow(1.0 - abs(m.x), -sign(m.x))
    } else {
        1.0
    };

    let se = if (m.z > 0.0) {
        e * -sign(m.y)
    } else {
        1.0
    };

    var bg = vec3<f32>(0.0);

    let aa = 3.0;
    for (var j = 0; j < 3; j = j + 1) {
        for (var k = 0; k < 3; k = k + 1) {
            var c = vec3<f32>(0.0);
            let o = vec2<f32>(f32(j), f32(k)) / aa;
            var uv = (XY - 0.5 * R + o) / R.y * SCALE * z;

            if (m.z > 0.0) {
                let signUV = sign(uv);
                let absUV  = abs(uv);
                let logUV  = log(absUV);
                let mulUV  = logUV * e;
                uv = exp(mulUV) * signUV;
            }

            let fw = abs(dpdx(uv)) + abs(dpdy(uv));
            let px = length(fw);

            let x = uv.x;
            let y = uv.y;
            let l = length(uv);

            let mc = (x*x + y*y - 1.0) / y;
            let g  = min(abs(mc), 1.0 / abs(mc));
            let gold = vec3<f32>(1.0, 0.6, 0.0) * g * l;
            let blue = vec3<f32>(0.3, 0.5, 0.9) * (1.0 - g);
            let rgb  = max(gold, blue);

            let w = 0.1;
            let d = 0.4;
            c = max(c, gm(rgb, mc, -t, w, d, false));
            c = max(c, gm(rgb, abs(y/x)*sign(y), -t, w, d, false));
            c = max(c, gm(rgb, (x*x)/(y*y)*sign(y), -t, w, d, false));
            c = max(c, gm(rgb, (x*x) + (y*y), t, w, d, true));

            c = c + rgb * ds(uv, se, t/TAU, px*2.0, 2.0, 0.0);
            c = c + rgb * ds(uv, se, t/TAU, px*2.0, 2.0, PI);
            c = c + rgb * ds(uv, -se, t/TAU, px*2.0, 2.0, 0.0);
            c = c + rgb * ds(uv, -se, t/TAU, px*2.0, 2.0, PI);
            c = max(c, vec3<f32>(0.0));

            c = c + pow(max(1.0 - l, 0.0), 3.0 / z);

            if (m.z > 0.0) {
                let xyg  = abs(fract(uv + 0.5) - 0.5) / px;
                let grid = 1.0 - min(min(xyg.x, xyg.y), 1.0);
                c.g = c.g + 0.2 * grid;
                c.b = c.b + 0.2 * grid;
            }

            bg = bg + c;
        }
    }

    bg = bg / (aa * aa);
    bg = bg * sqrt(bg) * 1.5;

    return vec4<f32>(bg, 1.0);
}
`;