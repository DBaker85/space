import React, { FunctionComponent } from 'react';
import { IconProps } from '../models';
import { lighten, complimentary } from '../../shared/utils/hsl';

const PlanetIcon: FunctionComponent<IconProps> = ({
  color = '',
  inputRef,
  size = '100vh'
}) => {
  const color2 = lighten(color, 20);
  const color3 = lighten(color, 25);
  const color4 = lighten(color, 30);
  const ring = complimentary(color);
  return (
    <svg
      role="img"
      preserveAspectRatio="xMidYMid meet"
      // style={iconStyle()}
      ref={inputRef ? inputRef : null}
      viewBox="0 0 53.905926 42.071922"
      height={size}
      width={size}
    >
      <defs id="defs11492">
        <clipPath id="clipPath5578" clipPathUnits="userSpaceOnUse">
          <path
            id="path5576"
            d="m 73.193,254.61 h 33.026 V 221.584 H 73.193 Z"
          />
        </clipPath>
        <clipPath id="clipPath5562" clipPathUnits="userSpaceOnUse">
          <path
            id="path5560"
            d="m 64.3234,265.795 h 88.9496 v -88.95 H 64.3234 Z"
          />
        </clipPath>
        <clipPath id="clipPath5546" clipPathUnits="userSpaceOnUse">
          <path
            id="path5544"
            d="M 66.9891,261.282 H 132.954 V 195.318 H 66.9891 Z"
          />
        </clipPath>
        <clipPath id="clipPath5514" clipPathUnits="userSpaceOnUse">
          <path
            id="path5512"
            d="m 64.323,221.32 c 0,-24.563 19.913,-44.475 44.475,-44.475 v 0 c 24.563,0 44.476,19.912 44.476,44.475 v 0 c 0,24.563 -19.913,44.475 -44.476,44.475 v 0 c -24.562,0 -44.475,-19.912 -44.475,-44.475"
          />
        </clipPath>
        <clipPath id="clipPath5494" clipPathUnits="userSpaceOnUse">
          <path
            id="path5492"
            d="M 49.1685,280.95 H 168.428 V 161.69 H 49.1685 Z"
          />
        </clipPath>
        <clipPath id="clipPath5474" clipPathUnits="userSpaceOnUse">
          <path
            id="path5472"
            d="M 56.7697,273.349 H 160.827 V 169.291 H 56.7697 Z"
          />
        </clipPath>
      </defs>

      <g transform="translate(620.37558,-134.60094)" id="layer1">
        <g
          id="g5468"
          transform="matrix(0.35277777,0,0,-0.35277777,-631.80435,233.71361)"
        >
          <g id="g5470" />
          <g id="g5482">
            <g
              style={{ opacity: 0.05000311 }}
              id="g5480"
              clipPath="url(#clipPath5474)"
            >
              <g id="g5478" transform="translate(160.8271,221.3203)">
                <path
                  id="path5476"
                  style={{
                    fill: '#ffffff',
                    fillOpacity: 1,
                    fillRule: 'nonzero',
                    stroke: 'none'
                  }}
                  d="m 0,0 c 0,-28.735 -23.294,-52.029 -52.029,-52.029 -28.734,0 -52.029,23.294 -52.029,52.029 0,28.734 23.295,52.028 52.029,52.028 C -23.294,52.028 0,28.734 0,0"
                />
              </g>
            </g>
          </g>
        </g>
        <g
          transform="matrix(0.35277777,0,0,-0.35277777,-620.0228,157.34618)"
          id="g5484"
        >
          <path
            id="path5486"
            style={{
              fill: 'none',
              stroke: ring,
              strokeWidth: 2,
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              strokeDasharray: 'none',
              strokeOpacity: 1
            }}
            d="M 0,0 C 0,3.53 33.758,6.393 75.402,6.393 117.045,6.393 150.804,3.53 150.804,0"
          />
        </g>
        <g
          id="g5488"
          transform="matrix(0.35277777,0,0,-0.35277777,-631.80435,233.71361)"
        >
          <g id="g5490" />
          <g id="g5502">
            <g
              style={{ opacity: 0.05000311 }}
              id="g5500"
              clipPath="url(#clipPath5494)"
            >
              <g id="g5498" transform="translate(168.4282,221.3203)">
                <path
                  id="path5496"
                  style={{
                    fill: '#ffffff',
                    fillOpacity: 1,
                    fillRule: 'nonzero',
                    stroke: 'none'
                  }}
                  d="m 0,0 c 0,-32.933 -26.697,-59.63 -59.63,-59.63 -32.933,0 -59.63,26.697 -59.63,59.63 0,32.933 26.697,59.629 59.63,59.629 C -26.697,59.629 0,32.933 0,0"
                />
              </g>
            </g>
          </g>
        </g>
        <g
          transform="matrix(0.35277777,0,0,-0.35277777,-577.7329,155.63673)"
          id="g5504"
        >
          <path
            id="path5506"
            style={{
              fill: color,
              fillOpacity: 1,
              fillRule: 'nonzero',
              stroke: 'none'
            }}
            d="m 0,0 c 0,-24.563 -19.912,-44.476 -44.475,-44.476 -24.563,0 -44.475,19.913 -44.475,44.476 0,24.562 19.912,44.475 44.475,44.475 C -19.912,44.475 0,24.562 0,0"
          />
        </g>
        <g
          id="g5508"
          transform="matrix(0.35277777,0,0,-0.35277777,-631.80435,233.71361)"
        >
          <g clipPath="url(#clipPath5514)" id="g5510">
            <g transform="translate(116.0161,177.8779)" id="g5516">
              <path
                id="path5518"
                style={{
                  fill: color2,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c -0.782,-0.247 -1.545,-0.531 -2.287,-0.856 -1.885,-0.827 -3.879,-1.983 -5.866,-1.445 -0.231,0.063 -0.468,0.155 -0.618,0.342 -0.161,0.199 -0.196,0.47 -0.205,0.725 -0.09,2.549 1.852,4.818 4.159,5.908 3.212,1.517 5.477,0.777 8.639,0.543 2.444,-0.181 7.213,1.661 5.351,5.008 -0.174,0.314 -0.423,0.611 -0.442,0.969 -0.026,0.474 0.352,0.867 0.729,1.153 4.331,3.291 11.191,0.97 15.496,4.296 1.12,0.866 1.952,2.043 2.92,3.076 3.139,3.348 7.675,5.115 12.222,5.74 5.761,0.793 15.736,1.408 19.827,-3.753 1.809,-2.283 2.102,-5.528 1.221,-8.306 C 60.265,10.624 58.341,8.277 56.122,6.39 48.943,0.284 39.905,0.839 31.073,0.771 21.583,0.699 9.417,2.983 0,0"
              />
            </g>
            <g transform="translate(94.4702,185.0244)" id="g5520">
              <path
                id="path5522"
                style={{
                  fill: color3,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c 1.079,0.216 2.13,0.575 3.205,1.732 1.324,1.426 2.317,3.156 3.779,4.439 4.85,4.259 13,2.286 18.033,6.327 1.475,1.185 2.561,2.81 4.082,3.935 2.131,1.576 4.876,2.009 7.509,2.31 2.633,0.301 5.364,0.543 7.679,1.833 2.315,1.289 4.101,3.968 3.445,6.535 -0.826,-2.579 -3.962,-3.648 -6.67,-3.56 -2.708,0.088 -5.393,0.947 -8.083,0.628 C 29.701,23.789 26.82,21.695 23.548,21.258 17.797,20.487 11.461,24.842 6.513,21.812 4.691,20.697 3.534,18.785 2.019,17.28 c -2.604,-2.589 -4.754,-1.357 -7.833,-1.793 -5.611,-0.793 -10.649,-3.75 -15.52,-6.645 -0.886,-0.528 -1.803,-1.084 -2.364,-1.948 -0.587,-0.908 -0.704,-2.041 -0.668,-3.122 0.131,-3.852 2.111,-7.6 5.22,-9.879 2.794,-2.05 8.033,-3.914 10.55,-1.053 1.658,1.885 2.936,5.216 5.311,6.333 C -2.131,-0.284 -1.052,-0.211 0,0"
              />
            </g>
            <g transform="translate(125.1982,221.1201)" id="g5524">
              <path
                id="path5526"
                style={{
                  fill: color2,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c -3.707,-0.819 -7.85,0.062 -11.667,0.908 -4.924,1.093 -10.538,1.926 -14.622,-1.033 -1.727,-1.251 -3.07,-3.126 -5.093,-3.804 -1.669,-0.559 -3.485,-0.192 -5.243,-0.124 -3.784,0.147 -7.605,-1.186 -10.477,-3.655 -2.326,-2.001 -3.989,-4.653 -6.102,-6.88 -2.392,-2.52 -5.669,-3.908 -8.908,-5.031 -2.769,-0.96 -7.18,-1.345 -7.758,-4.991 0.618,4.401 -0.912,8.983 -0.799,13.388 0.108,4.243 2.859,8.568 4.529,12.505 0.844,1.989 1.713,4.02 3.168,5.616 2.237,2.457 5.604,3.591 8.902,3.996 3.299,0.405 6.641,0.178 9.956,0.41 1.251,0.087 2.514,0.244 3.676,0.714 1.401,0.567 2.582,1.56 3.892,2.314 3.686,2.124 8.465,2.21 12.225,0.221 1.946,-1.03 3.674,-2.587 5.831,-3.032 3.647,-0.751 7.057,1.876 9.778,4.419 5.264,4.921 12.663,7.024 19.901,6.861 2.848,-0.065 11.859,-1.6 8.152,-6.479 -1.279,-1.682 -3.457,-2.351 -5.23,-3.502 C 9.596,9.895 7.754,3.866 3.091,1.183 2.109,0.618 1.073,0.237 0,0"
              />
            </g>
            <g transform="translate(104.4448,250.9663)" id="g5528">
              <path
                id="path5530"
                style={{
                  fill: color4,
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none'
                }}
                d="m 0,0 c -1.911,0.158 -3.817,0.242 -5.702,-0.078 -2.151,-0.365 -4.175,-1.244 -6.175,-2.116 -3.945,-1.719 -7.889,-3.437 -11.834,-5.155 -0.07,2.135 1.067,4.158 2.568,5.679 1.5,1.521 3.352,2.636 5.122,3.833 10.92,7.394 21.66,25.077 37.354,18.953 2.008,-0.784 3.94,-1.997 5.061,-3.839 1.121,-1.841 1.239,-4.399 -0.137,-6.059 C 25.213,9.96 23.565,9.425 22.089,8.721 15.398,5.532 12.412,-0.717 4.22,-0.338 2.815,-0.273 1.406,-0.117 0,0"
              />
            </g>
          </g>
        </g>
        <g
          id="g5540"
          transform="matrix(0.35277777,0,0,-0.35277777,-631.80435,233.71361)"
        >
          <g id="g5542" />
          <g id="g5554">
            <g
              style={{ opacity: 0.14999402 }}
              id="g5552"
              clipPath="url(#clipPath5546)"
            >
              <g id="g5550" transform="translate(132.9541,228.2998)">
                <path
                  id="path5548"
                  style={{
                    fill: '#ffffff',
                    fillOpacity: 1,
                    fillRule: 'nonzero',
                    stroke: 'none'
                  }}
                  d="m 0,0 c 0,-18.216 -14.767,-32.982 -32.982,-32.982 -18.216,0 -32.983,14.766 -32.983,32.982 0,18.216 14.767,32.982 32.983,32.982 C -14.767,32.982 0,18.216 0,0"
                />
              </g>
            </g>
          </g>
        </g>
        <g
          id="g5556"
          transform="matrix(0.35277777,0,0,-0.35277777,-631.80435,233.71361)"
        >
          <g id="g5558" />
          <g id="g5570">
            <g
              style={{ opacity: 0.14999402 }}
              id="g5568"
              clipPath="url(#clipPath5562)"
            >
              <g id="g5566" transform="translate(108.7983,265.7949)">
                <path
                  id="path5564"
                  style={{
                    fill: '#231f20',
                    fillOpacity: 1,
                    fillRule: 'nonzero',
                    stroke: 'none'
                  }}
                  d="m 0,0 c -9.084,0 -17.528,-2.729 -24.567,-7.404 6.137,3.728 13.342,5.876 21.048,5.876 22.423,0 40.601,-18.178 40.601,-40.601 0,-22.423 -18.178,-40.6 -40.601,-40.6 -22.423,0 -40.6,18.177 -40.6,40.6 0,2.085 0.158,4.133 0.461,6.133 -0.53,-2.745 -0.817,-5.578 -0.817,-8.479 0,-24.563 19.913,-44.475 44.475,-44.475 24.563,0 44.475,19.912 44.475,44.475 C 44.475,-19.912 24.563,0 0,0"
                />
              </g>
            </g>
          </g>
        </g>
        <g
          id="g5572"
          transform="matrix(0.35277777,0,0,-0.35277777,-631.80435,233.71361)"
        >
          <g id="g5574" />
          <g id="g5586">
            <g
              style={{ opacity: 0.14999402 }}
              id="g5584"
              clipPath="url(#clipPath5578)"
            >
              <g id="g5582" transform="translate(106.2188,238.0967)">
                <path
                  id="path5580"
                  style={{
                    fill: '#ffffff',
                    fillOpacity: 1,
                    fillRule: 'nonzero',
                    stroke: 'none'
                  }}
                  d="m 0,0 c 0,-9.119 -7.393,-16.513 -16.513,-16.513 -9.12,0 -16.513,7.394 -16.513,16.513 0,9.12 7.393,16.513 16.513,16.513 C -7.393,16.513 0,9.12 0,0"
                />
              </g>
            </g>
          </g>
        </g>
        <g
          transform="matrix(0.35277777,0,0,-0.35277777,-566.82243,157.34618)"
          id="g5588"
        >
          <path
            id="path5590"
            style={{
              fill: 'none',
              stroke: ring,
              strokeWidth: 2,
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              strokeDasharray: 'none',
              strokeOpacity: 1
            }}
            d="m 0,0 c 0,-3.53 -33.759,-6.393 -75.402,-6.393 -41.644,0 -75.402,2.863 -75.402,6.393"
          />
        </g>
      </g>
    </svg>
  );
};

export default PlanetIcon;
